'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaSave, FaTimes} from "react-icons/fa";
import {Contact, getDefaultValues, contactSchema} from "@/types/contact.types";
import {useForm, FormProvider, useFormContext} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect} from "react";
import {Form} from "@/components/ui/form";
import * as z from "zod";
import {useToast} from "@/hooks/use-toast";
import {ContactService} from "@/services/contact.service";
import {useRouter} from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import ContactDetailsEdition from "@/app/(app)/contacts/components/contactDetailsEdition";
import PersonalInformationEdit from "@/app/(app)/contacts/components/personalInformationEdit";
import ProfessionEdit from "@/app/(app)/contacts/components/professionEdit";
import NotesEdit from "@/app/(app)/contacts/components/notesEdit";
import RgpdEdit from "@/app/(app)/contacts/components/rgdpEdit";
import AlertDialog from "@/components/shared/alertDialog";

interface ContactEditionProps {
    editFunction: (isEditing: boolean) => void;
    data: Contact;
    isNew?: boolean;
    rechargeFunction?: (contactData: Contact) => void;
}

const formSchema = contactSchema;

const ContactEdition: React.FC<ContactEditionProps> = ({editFunction, data, isNew = false, rechargeFunction}) => {
    const {toast} = useToast();
    const router = useRouter();
    const contactService = new ContactService();

    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(data),
    });

    useEffect(() => {
        methods.reset(getDefaultValues(data));
    }, [data]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const updatedContact: Contact = {
                id: data.id,
                user_id: data.user_id,
                ...values,
            };

            if (isNew) {
                const {id, ...updatedContactWithoutId} = updatedContact;
                const contactService = new ContactService();
                const {contact} = await contactService.save(updatedContactWithoutId)

                router.push(`/contacts/${contact.id}`);

                return;
            } else {
                const {contact} = await contactService.update(data.id, updatedContact)
                router.push(`/contacts/${contact.id}`);
                if (typeof(rechargeFunction) == "function") {
                    rechargeFunction(contact);
                }
            }

            toast({
                title: "Successfully",
                description: "Contact successfully updated",
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error" + error,
            });
        }
    };

    const setIsEditing = (param: boolean) => {
        editFunction(param);
    };

    const handleDelete = async () => {
        try {

            const { status } = await contactService.delete(data.id);

            if(status == 200) {
                toast({
                    title: 'Successfully',
                    description: 'Contact successfully deleted',
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
        }

    };

    const contactMediumOptions = [
        {value: "other", label: "Otro"},
        {value: "email", label: "Email"},
        {value: "phone", label: "Teléfono"},
        {value: "sms", label: "SMS"},
    ];

    const genderOptions = [
        {value: "other", label: "Otro"},
        {value: "male", label: "Masculino"},
        {value: "female", label: "Femenino"},
    ];

    const languageOptions = [
        {value: "english", label: "English"},
        {value: "spanish", label: "Spanish"},
        {value: "french", label: "French"},
        {value: "other", label: "Other"},
    ];


    return (
        <div className="flex flex-col flex-1 w-full">
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)}>
                        <div className="flex justify-between items-center mb-5 p-4">
                            <Breadcrumbs/>
                            <div className="flex justify-end items-center w-1/3 gap-4">
                                <Button
                                    type="submit"
                                    className="mr-5"
                                >
                                    <FaSave className="mr-2"/> Save
                                </Button>
                                <AlertDialog
                                    title="Do you want to delete this property?"
                                    description="If you delete, you will lose any unsaved changes."
                                    triggerText="Delete"
                                    variantButtonTrigger = "destructive"
                                    onAccept={() => {
                                        const result = handleDelete();
                                        setIsEditing(false);
                                        router.push('/contacts');
                                    }}
                                />
                                <AlertDialog
                                    title="Do you want to cancel?"
                                    description="If you cancel, you will lose any unsaved changes."
                                    triggerText="Cancel"
                                    variantButtonTrigger = "outline"
                                    onAccept={() => {
                                        if (isNew) {
                                            router.push('/contacts');
                                        } else {
                                            setIsEditing(false);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-4 flex-grow">
                            <div className="row-span-2 col-span-1">
                                <div className='flex flex-col gap-5 h-[250px] justify-center items-center'>
                                    <div className='flex'>
                                    <Avatar className="h-[80px] w-[80px]">
                                            <AvatarImage src={data.avatar_url}/>
                                            <AvatarFallback>{data.first_name[0]}{data.last_name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-5">
                                            <p className='text-xl font-bold'>{data.first_name} {data.last_name}</p>
                                            <p>{data.email}</p>
                                            <p>{data.phone}</p>
                                        </div>
                                    </div>
                                    { !isNew &&
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="rounded-full shadow" variant="outline">
                                                    Upload Avatar
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
                                                    <ImageUpload resourceId={data.id} fileUploaderService={contactService}/>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    }
                                </div>
                            </div>
                            <div className="row-span-2 col-span-3 p-5">
                                <div className="grid grid-cols-1 gap-4 overflow-auto h-[calc(100vh-200px)] pr-5">
                                    <ContactDetailsEdition />
                                    <PersonalInformationEdit />
                                    <ProfessionEdit />
                                    <NotesEdit />
                                    <RgpdEdit />
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    );
}

export default ContactEdition;
