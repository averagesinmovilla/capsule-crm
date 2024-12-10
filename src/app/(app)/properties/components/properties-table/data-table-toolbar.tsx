"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from '@/components/shared/data-table/data-table-view-options';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { propertySchema } from '@/types/property.types';
import { IoBed } from "react-icons/io5";
import { PiBathtubBold, PiToiletLight } from "react-icons/pi";
import { Euro, Type } from 'lucide-react';

interface DataTableToolbarProps<TData> {
    table?: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    if (!table) {
        return null
    }

    const types: string[] = propertySchema.shape.type.options
    const status: string[] = propertySchema.shape.status.options;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center flex-wrap gap-5">
                <Select
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value)
                    }
                >
                    <SelectTrigger className="w-[180px] capitalize">
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem className="capitalize" value=" ">All</SelectItem>
                            {status?.map((item, index) => (
                                <SelectItem className="capitalize" value={item} key={index}>
                                    {item.replace('_', ' ')}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="relative">
                    <Type
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Filter reference..."
                        value={(table.getColumn("reference")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("reference")?.setFilterValue(event.target.value)
                        }
                        className="pl-8"
                    />
                </div>

                <Select
                    onValueChange={(value) =>
                        table.getColumn("type")?.setFilterValue(value)
                    }
                >
                    <SelectTrigger className="w-[180px] capitalize">
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem className="capitalize" value=" ">All</SelectItem>
                            {types?.map((item, index) => (
                                <SelectItem className="capitalize" value={item} key={index}>
                                    {item.replace('_', ' ')}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="relative">
                    <IoBed
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Bedrooms" className="pl-8" type='number'
                        onChange={(event) =>
                            table.getColumn("bedrooms")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className="relative">
                    <PiBathtubBold
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Bathrooms" className="pl-8" type='number'
                        onChange={(event) =>
                            table.getColumn("bathrooms")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className="relative">
                    <PiToiletLight
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Toilets" className="pl-8" type='number'
                        onChange={(event) =>
                            table.getColumn("toilets")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Euro
                            className="absolute left-2 h-4 w-4 text-muted-foreground"
                            style={{ top: '13px' }}
                        />
                        <Input
                            placeholder="Price from" className="pl-8" type='number'
                            onChange={(event) =>
                                table.getColumn("price_over")?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                    <div className="relative">
                        <Euro
                            className="absolute left-2 h-4 w-4 text-muted-foreground"
                            style={{ top: '13px' }}
                        />
                        <Input
                            placeholder="Price to" className="pl-8" type='number'
                            onChange={(event) =>
                                table.getColumn("price_under")?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
