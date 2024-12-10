'use client'

import { DataTable } from '@/components/shared/data-table/data-table';
import { useEffect, useState } from 'react';
import { Property as ApiProperty } from '@/types/property.types';
import { DataTableToolbar } from '@/app/(app)/properties/components/properties-table/data-table-toolbar';
import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';
import { ApiParamsPropertyType, PropertyService } from '@/services/property.service';
import { propertiesColumns } from '@/app/(app)/properties/components/properties-table/data/properties-columns';
import SkeletonTable from "@/components/skeletonTable";

export type propertyTableType = {
    id: number,
    reference: string,
    status: string,
    title?: string,
    bedrooms?: number,
    bathrooms?: number,
    toilets?: number,
    photo?: string,
    type?: string,
}

function parsePropertyData(data: ApiProperty[]): propertyTableType[] {
    return data.map(p => {
        return {
            id: p.id,
            reference: p.reference  ,
            title: p.title,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            toilets: p.toilets,
            type: p.type,
            status: p.status,
            photo: p?.image?.[0]?.image_name ?? '/images/foto-principal-propiedad.jpg'
        }
    })
}

export function PropertiesTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [properties, setProperties] = useState<propertyTableType[]>([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );

    const fetchProperties = async () => {
        const propertyService = new PropertyService();
        const params: ApiParamsPropertyType = {
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

        params.includes = 'image';

        const response = await propertyService.getProperties(params)

        const data = parsePropertyData(response.data)
        setProperties(data)
        setTotal(response.total)
        setIsLoading(false)
    }

    useEffect( () => {
        void fetchProperties()
    },[pagination])

    useEffect( () => {
        const timer =  setTimeout(() => {
            void fetchProperties()
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
            data={properties}
            columns={propertiesColumns}
            pagination={pagination}
            total={total}
            setPagination={setPagination}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
        >
            <DataTableToolbar></DataTableToolbar>
        </DataTable>
    )
}
