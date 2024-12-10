'use client';

import PropertyEdition from "@/app/(app)/properties/components/propertyEdition";
import React, { useState, useEffect } from "react";
import { Property } from "@/types/property.types";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from "@/app/(app)/properties/components/skeleton";
import { useAuth } from "@/hooks/auth";
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Button from "@/components/Button";

export default function Create() {
    const { user } = useAuth();
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>({
        id: 0,
        reference: '',
        type: "house",
        status: "available",
        contact_id: 0,
        user_id: user.id,
        latitude: 0,
        longitude: 0,
        image: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Abrir el diálogo automáticamente si no está editando
    useEffect(() => {
        if (!isEditing) {
            setIsDialogOpen(true);
        }
    }, [isEditing]);

    if (loading) {
        return (
            <div>
                <div className='mb-2'>
                    <Breadcrumbs />
                </div>
                <SkeletonCard />
            </div>
        );
    }
    if (error || !property) return <div>Error loading property</div>;

    if (!isEditing) {
        return (
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
                    <AlertDialogTitle className="text-lg font-bold">
                        Do you want to cancel the current record?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-sm text-gray-600">
                        If you cancel, you will lose any unsaved changes.
                    </AlertDialogDescription>
                    <div className="flex justify-end mt-4 space-x-2">
                        <AlertDialogCancel asChild>
                            <Button variant="outline" className="" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant="destructive"
                                className=""
                                onClick={() => router.push('/properties')}
                            >
                                Accept
                            </Button>
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    return (
        <div className="flex flex-1 w-full h-full">
            <PropertyEdition editFunction={setIsEditing} data={property} isNew={true} />
        </div>
    );
}
