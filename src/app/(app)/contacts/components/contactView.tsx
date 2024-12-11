'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEdit } from "react-icons/fa";
import TabContact from "@/app/(app)/contacts/components/tab";
import { Contact } from "@/types/contact.types";
import React from "react";
import {Button} from "@/components/ui/button";

interface ContactViewProps {
    editFunction: (isEditing: boolean) => void;
    data: Contact;
}

const ContactView: React.FC<ContactViewProps> = ({ editFunction, data }) => {
    const setIsEditing = (param: boolean) => {
        editFunction(param);
    }

    return (
        <div className="flex flex-col flex-1 w-full h-full">
            <div className="flex justify-between items-center mb-5 p-4">
                <Breadcrumbs/>
                <div className="flex justify-end items-center">
                    <Button
                        onClick={() => setIsEditing(true)}
                    >
                        <FaEdit className="mr-2"/> Edit
                    </Button>
                </div>
            </div>
            <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-4 flex-grow overflow-hidden">
                <div className="row-span-2 col-span-1">
                    <div className='flex h-[250px] justify-center items-center'>
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
                    </div>
                </div>
                <div className="row-span-2 col-span-3">
                    <TabContact contact={data}/>
                </div>
            </div>

        </div>
    );
}

export default ContactView;
