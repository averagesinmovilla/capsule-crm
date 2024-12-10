import { DataTable } from '@/components/shared/data-table/data-table';
import { contactColumns } from '@/app/(app)/contacts/components/contacts-table/data/contact-columns';
import { useEffect, useState } from 'react';
import { Contact } from '@/app/(app)/contacts/components/contacts-table/data/schema';
import { Contact as ApiContact } from '@/types/contact.types';
import { DataTableToolbar } from '@/app/(app)/contacts/components/contacts-table/data-table-toolbar';
import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';
import { ApiParamsContactType, ContactService } from '@/services/contact.service';
import SkeletonTable from "@/components/skeletonTable";

function parseContactData(data: ApiContact[]) {
    return data.map(c => {
        return {
            id: c.id,
            name: `${c.first_name} ${c.last_name}`.trim(),
            email: c.email,
            phone: c.phone,
            avatar_url: c.avatar_url,
        }
    })
}
type props = {
    setSelectedRowsChange ?: any
};

export function ContactsTable({setSelectedRowsChange}:props) {
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );

    const fetchContact = async () => {
        const contactService = new ContactService();
        const params: ApiParamsContactType = {
            page: pagination.pageIndex + 1,
            perPage: pagination.pageSize
        }

        if (columnFilters?.length) {
            columnFilters.forEach((el: ColumnFilter) => {
                if (typeof el.value === "string") {
                    params[el.id] = el.value;
                }
            })
        }

        const response = await contactService.getContacts(params)

        const data = parseContactData(response.data)
        setContacts(data)
        setTotal(response.total)
        setIsLoading(false)
    }

    useEffect( () => {
        void fetchContact()
    },[pagination])

    useEffect( () => {
        const timer =  setTimeout(() => {
            void fetchContact()
            // TODO: Bad implementation
            document?.querySelector<HTMLButtonElement>('.table--paginate--go-to-first-page')?.click();
        }, 1000);

        return () => clearTimeout(timer);
    },[columnFilters])

    if (isLoading) {
        return <SkeletonTable/>
    }

    return (
        <DataTable
            data={contacts}
            columns={contactColumns}
            pagination={pagination}
            total={total}
            setPagination={setPagination}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            setSelectedRowsChange={setSelectedRowsChange}
        >
            <DataTableToolbar></DataTableToolbar>
        </DataTable>
    )
}
