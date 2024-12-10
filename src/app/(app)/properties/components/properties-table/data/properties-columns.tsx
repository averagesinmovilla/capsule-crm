"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./../data-table-column-header"
import { DataTableRowActions } from "./../data-table-row-actions"
import { propertyTableType } from '@/app/(app)/properties/components/properties-table/properties-table';

export const propertiesColumns: ColumnDef<propertyTableType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "avatar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="" />
        ),
        cell: ({ row }) => {
            return (
                <span className="relative flex shrink-0 overflow-hidden h-20 w-20">
                    <img className="h-full w-full" alt="Avatar" src={row.original.photo}/>
                </span>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => <div className="w-[80px] capitalize">{row.getValue<string>("status").replace('_', ' ') }</div>,
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "reference",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reference" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("reference")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => <div className="w-[80px] capitalize">{row.getValue<string>("type").replace('_', ' ') }</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
        enableSorting: false,
    },
    {
        accessorKey: "bedrooms",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bedrooms" />
        ),
        cell: ({ row }) => <div className="w-auto">{row.getValue("bedrooms")}</div>,
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "bathrooms",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bathrooms" />
        ),
        cell: ({ row }) => <div className="w-auto">{row.getValue("bathrooms")}</div>,
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "toilets",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Toilets" />
        ),
        cell: ({ row }) => <div className="w-auto">{row.getValue("toilets")}</div>,
        enableSorting: false,
        enableHiding: true,
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
