'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ApiErrors } from '@/types/auth.types';
import { Loader, LoaderCircle } from 'lucide-react';
import AuthLayout from '@/app/(auth)/components/auth-layout';

const Login = () => {
    const router: AppRouterInstance = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [shouldRemember, setShouldRemember] = useState<boolean>(false)
    const [errors, setErrors] = useState<ApiErrors>({})
    const [status, setStatus] = useState<string | null>(null)

    /*useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })*/

    const submitForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
            setLoading,
        })
    }

    return (
        <AuthLayout>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
            </div>
            <form className="grid gap-4" onSubmit={submitForm}>
                <div className="grid gap-2">
                    <Label className htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-2"/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label className htmlFor="password">Password</Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"/>
                    <InputError messages={errors.password} className="mt-2"/>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    Login
                    {loading && <LoaderCircle className="animate-spin"/>}
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline" prefetch={false}>
                    Sign up
                </Link>
            </div>
        </AuthLayout>
    )
}

export default Login
