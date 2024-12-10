import useSWR from 'swr'
import axios from '@/lib/axios'
import { useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ApiErrors, ForgotPasswordProps, RegisterLoginProps, ResendEmailVerificationProps, ResetPasswordProps, UseAuthOptions } from '@/types/auth.types';

export const useAuth = ({ middleware, redirectIfAuthenticated } : UseAuthOptions = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async (
        { setErrors, ...props }: Omit<RegisterLoginProps, 'setStatus'>
    ): Promise<void> => {
        await csrf()

        setErrors({})

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, setLoading, ...props }: RegisterLoginProps) => {
        try {
            setLoading(true)

            await csrf()
            setErrors({})
            setStatus && setStatus(null);

            await axios.post('/login', props)
            await mutate()
        } catch (error: any) {
            if (error?.response?.status !== 422) throw error

            setErrors(error?.response?.data?.errors)
        } finally {
            setLoading(false)
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: ResetPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            // @ts-ignore
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }: ResendEmailVerificationProps) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = useCallback(async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate());
        }

        window.location.pathname = '/login';
    }, [error, mutate]);

    const handleRedirects = useCallback(async () => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
            return;
        }

        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated || '');
            return;
        }

        if (middleware === 'auth' && error) {
            await logout();
        }
    }, [user, error, middleware, redirectIfAuthenticated, router, logout]);

    useEffect(() => {
        handleRedirects().catch(console.error);
    }, [handleRedirects])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
