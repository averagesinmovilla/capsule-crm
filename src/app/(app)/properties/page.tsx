'use client';

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { PropertiesTable } from '@/app/(app)/properties/components/properties-table/properties-table';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Home, Plus, Upload} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import ImageUpload from "@/components/ImageUpload";
import {ImportPropertyService} from "@/services/importProperty.service";

const Propiedades = () => {
    const importService = new ImportPropertyService()

    return (
        <div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='mb-5'>
                <Breadcrumbs/>
            </div>
            <div className='flex flex-col w-full gap-5'>
                <div className="flex justify-end gap-5">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="" variant="ghost">
                                <Upload />
                                Import
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-center">
                                    Import
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    The only file upload you will ever need
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <ImageUpload
                                    fileKey="file"
                                    accept="csv"
                                    fileUploaderService={importService}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button asChild className="" variant="outline">
                        <Link href="/properties/create">
                            <Plus/>
                            New
                        </Link>
                    </Button>
                </div>
                <PropertiesTable/>
            </div>
        </div>
    );
};

export default Propiedades;
