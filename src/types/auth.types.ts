export type UseAuthOptions = {
    middleware?: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
};

export type RegisterLoginProps = {
    name?: string;
    email: string;
    password: string;
    password_confirmation?: string;
    remember?: boolean;
    setLoading: (status: boolean) => void
} & SettersAuthTypes;

export type SettersAuthTypes = {
    setErrors: (errors: ApiErrors) => void;
    setStatus: (status: string | null) => void;
}

export type ForgotPasswordProps = {
    email: string;
} & SettersAuthTypes;


export type ResetPasswordProps = {
    email: string;
    password: string;
    password_confirmation: string;
} & SettersAuthTypes;

export type ResendEmailVerificationProps = {
    setStatus: (status: string) => void;
};

export type FieldErrorMessages = string[];

export type ApiErrors = {
    [field: string]: FieldErrorMessages;
};
