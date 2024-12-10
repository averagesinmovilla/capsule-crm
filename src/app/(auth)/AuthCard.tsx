import React, { FunctionComponent } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type AuthCardProps = {
    logo: React.ReactNode;
    children: React.ReactNode;
}

const AuthCard: FunctionComponent<AuthCardProps> = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <Card>
            <CardHeader>
                <div className="flex justify-center">{logo}</div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </div>
)

export default AuthCard
