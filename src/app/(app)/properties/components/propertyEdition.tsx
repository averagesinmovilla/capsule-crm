'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaSave, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/breadCrumbs';
import { Property, getDefaultValues, propertySchema } from '@/types/property.types';
import { useToast } from '@/hooks/use-toast';
import GalleryPhotos from '@/app/(app)/properties/components/galleryPhotos';
import AgentEdition from './agentEdition';
import PricesEdition from './pricesEdition';
import PropertyCharacteristicsEdition from './propertyCharacteristicsEdition';
import PropertyDescriptionsEdition from './propertyDescriptionsEdition';
import ImageUpload from '@/components/ImageUpload';
import { PropertyService } from '@/services/property.service';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { uploadedFileType } from '@/types/image-upload.types';
import {useRouter} from "next/navigation";
import AlertDialog from "@/components/shared/alertDialog";
import PropertyContactEdit from "@/app/(app)/properties/components/propertyContactEdit";
import LocationEdition from "@/app/(app)/properties/components/locationEdition";


interface PropertyEditionProps {
    editFunction: (isEditing: boolean) => void;
    data: Property;
    rechargeFunctionProperty?: (propertyData: Property) => void;
    isNew?: boolean;
}

const formSchema = propertySchema;

const PropertyEdition: React.FC<PropertyEditionProps> = ({ editFunction, data, rechargeFunctionProperty, isNew }) => {
    const { toast } = useToast();
    const router = useRouter();
    const propertyService = new PropertyService();
    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(data)
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        methods.reset(getDefaultValues(data));
    }, [data]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const { image, ...valuesWithoutPhotos} = values;
            if (isNew) {
                const {property} = await propertyService.save(valuesWithoutPhotos);
                router.push(`/properties/${property.id}`);
                return;
            } else {
                const updatedProperty: Property = {
                    id: data.id,
                    ...valuesWithoutPhotos
                }
                const {property} = await propertyService.update(data.id, updatedProperty);
                property.image = data.image;
                if (typeof(rechargeFunctionProperty) == "function") {
                    rechargeFunctionProperty(property);
                }
            }

            toast({
                title: 'Successfully',
                description: 'Property successfully updated',
            });
            setIsSubmitting(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occurred while saving: ' + error,
            });
            setIsSubmitting(false);
        }
    };

    const handleUploadedFiles = useCallback((files: uploadedFileType[]) => {
        // Lógica para manejar archivos subidos
        console.log(files); // Elimina esto en producción
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement | HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el submit cuando usamos el botón enter sobre el formulario
        }
    };

    const handleDelete = async () => {
        try {

            const { status }  = await propertyService.delete(data.id);

            if(status == 200) {
                toast({
                    title: 'Successfully',
                    description: 'Property successfully deleted',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Error delete property',
                });
            }


            return status;

        }  catch (error) {
            console.error('Error deleting data:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Error: ' + error,
            });
            setIsSubmitting(false);
        }

    };

    const setIsEditing = (param: boolean) => {
        editFunction(param);
    };

    return (
        <div className="flex flex-col flex-1 w-full">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(handleSubmit)}
                    onKeyDown={handleKeyDown}
                    className="h-full w-full"
                >
                    <div className="flex justify-between items-center gap-2 p-4 mb-4">
                        <Breadcrumbs/>
                        <div className="flex justify-end items-center w-1/3 gap-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <FaSave/>
                                <span className="ml-2">Save</span>
                            </Button>
                            <AlertDialog
                                title="Do you want to delete this property?"
                                description="If you delete, you will lose any unsaved changes."
                                triggerText="Delete"
                                variantButtonTrigger = "destructive"
                                onAccept={() => {
                                    const result = handleDelete();
                                    setIsEditing(false);
                                    router.push('/properties');
                                }}
                            />
                            <AlertDialog
                                title="Do you want to cancel?"
                                description="If you cancel, you will lose any unsaved changes."
                                triggerText="Cancel"
                                variantButtonTrigger = "outline"
                                onAccept={() => {
                                    if (isNew) {
                                        router.push('/properties');
                                    } else {
                                        setIsEditing(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-6 box-border p-5 h-[calc(100vh-150px)] overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 gap-4">
                            <div className="md:col-span-5 border p-5 shadow rounded-md">
                                <GalleryPhotos property={data}/>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="mt-5" variant="outline">
                                            Upload Photos
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-center">
                                                Upload your files
                                            </DialogTitle>
                                            <DialogDescription className="text-center">
                                                The only file upload you will ever need
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <ImageUpload
                                                maxFiles={10}
                                                resourceId={data.id}
                                                fileUploaderService={propertyService}
                                                onUploadedFiles={handleUploadedFiles}
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="md:col-span-2 flex flex-col justify-between gap-4">
                                <AgentEdition/>
                                <PricesEdition/>
                            </div>
                        </div>
                        <LocationEdition/>
                        <PropertyCharacteristicsEdition/>
                        <PropertyDescriptionsEdition/>
                        <PropertyContactEdit/>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default PropertyEdition;
