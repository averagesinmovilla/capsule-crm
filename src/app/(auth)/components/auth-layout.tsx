import React, { ReactNode } from 'react';

export default function AuthLayout ({children} : { children: ReactNode}) {
    return (
        <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center shadow-inner-custom p-4 py-12 border border-gray-300  rounded">
                <div className="mx-auto grid w-[350px] gap-6">
                    {children}
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    src="/images/login.png"
                    alt="Image"
                    className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
