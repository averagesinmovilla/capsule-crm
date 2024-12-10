'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { ContactsTable } from '@/app/(app)/contacts/components/contacts-table/contacts-table';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";

const Contactos = () => {
    return (
        <div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='mb-5'>
                <Breadcrumbs/>
            </div>
            <div className='flex flex-col w-full gap-5'>
                <Button asChild className="ml-auto" variant="outline">
                    <Link href="/contacts/create">
                        <Plus />
                        New
                    </Link>
                </Button>
                <ContactsTable/>
            </div>
        </div>
    );
};

export default Contactos;
