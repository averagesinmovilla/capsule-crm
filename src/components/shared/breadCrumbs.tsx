'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import React from "react";
import { Slash } from "lucide-react";
import Link from 'next/link'

const Breadcrumbs = () => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter((part) => part);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard">Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathParts.map((part, index) => {
                    const path = `/${pathParts.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathParts.length - 1;
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator>
                                <Slash/>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={isLast ? '' : path}>{part}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default Breadcrumbs;
