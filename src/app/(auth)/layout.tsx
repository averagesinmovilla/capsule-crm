import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import React from 'react';
import { Pill } from 'lucide-react';

export const metadata = {
    title: 'Capsule CRM - Login',
}

const Layout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div>
            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
        </div>
    )
}

export default Layout
