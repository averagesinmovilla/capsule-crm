"use client"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import React from 'react';
import {useRouter} from "next/navigation";
import {ChevronRight} from "lucide-react";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({ row, }: DataTableRowActionsProps<TData>) {
    const router = useRouter();
    const id = row.getValue('id');
    return (
        <Button variant="outline" size="icon" onClick={() => router.push(`/contacts/${id}`)}>
            <ChevronRight />
        </Button>

    // <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //         <Button
    //             variant="ghost"
    //             className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
    //         >
    //             <DotsHorizontalIcon className="h-4 w-4" />
    //             <span className="sr-only">Open menu</span>
    //         </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent align="end" className="w-[160px]">
    //         <Link href={`/contacts/${row.getValue('id')}`}>
    //             <DropdownMenuItem>
    //                 View
    //             </DropdownMenuItem>
    //         </Link>
    //         <DropdownMenuItem>
    //             Delete
    //             <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    //         </DropdownMenuItem>
    //     </DropdownMenuContent>
    // </DropdownMenu>
    )
}
