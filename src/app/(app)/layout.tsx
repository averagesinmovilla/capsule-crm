'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/components/shared/loading';
import React from 'react';
import CrmLayout from '@/components/crm-layout/crm-layout';

type DashboardType = {
    children?: React.ReactNode;
    header?: React.ReactNode;
}

const AppLayout = ({ children, header }: DashboardType) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading/>
    }

    return (
        <CrmLayout user={user}>{children}</CrmLayout>
    )
}

export default AppLayout
