import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import {Label} from "@/components/ui/label";
import Button from "@/components/Button";
import {ContactsTable} from "@/app/(app)/contacts/components/contacts-table/contacts-table";
import '../styles/modal.css';
import {RowSelectionState} from "@tanstack/table-core";


const PropertyContactEdit = () => {
    const { register, setValue, getValues } = useFormContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelection, setSelectedRowsChange] = useState<RowSelectionState>({});

    const handlerSelectContact = () => {
        // Cierra el modal al seleccionar el contacto
        setIsModalOpen(false);
    }

    useEffect(() => {
        if(Object.keys(rowSelection).length > 0){
            // @ts-ignore
            setValue("full_name", rowSelection[0].name);
            // @ts-ignore
            setValue("email", rowSelection[0].email);
            // @ts-ignore
            setValue("phone", rowSelection[0].phone);
            // @ts-ignore
            setValue("id", rowSelection[0].id);
            setIsModalOpen(false);
        }
    }, [rowSelection]);

    return (
        <div className="border p-4 text-sm rounded-md mb-4 shadow">
            <h3 className="text-sm font-bold mb-6">Contact Details
                <Sheet open={isModalOpen}  onOpenChange={setIsModalOpen}>
                    <SheetTrigger asChild>
                        <Button className="ml-5" type="button" onClick={() => setIsModalOpen(true)}>Search</Button>
                    </SheetTrigger>
                    <SheetContent className="modal-sheet-contacts">
                        <SheetHeader>
                            <SheetTitle>Select Contact</SheetTitle>
                        </SheetHeader>
                        <ContactsTable setSelectedRowsChange={setSelectedRowsChange} />
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button className="mt-5 hidden js-button-close" type="button">Accept</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </h3>
            <Input type="hidden" {...register("id")}></Input>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col mb-2">
                    <label className="mb-2 text-slate-500">Full Name:</label>
                    <Input
                        type="text"
                        className="border p-1 rounded"
                        {...register("full_name")}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="mb-2 text-slate-500">Email:</label>
                    <Input
                        type="email"
                        className="border p-1 rounded"
                        {...register("email")}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="mb-2 text-slate-500">Phone:</label>
                    <Input
                        type="tel"
                        className="border p-1 rounded"
                        {...register("phone")}
                    />
                </div>

            </div>
        </div>
    );
};

export default PropertyContactEdit;
