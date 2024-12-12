'use client';

import React, { useEffect, useState } from 'react';
import { Property } from "@/types/property.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact } from "@/types/contact.types";

interface PropertyDetailsProps {
    property: Property;
}

const ClientPropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
    const [contact, setContact] = useState<Contact | undefined>(property.contact || undefined);
    const [fullName, setFullName] = useState('');
    const [contactMedium, setContactMedium] = useState('');
    const [iniciales, setIniciales] = useState('');

    useEffect(() => {
        setContact(property.contact);
    }, [property]);

    useEffect(() => {
        if (contact) {
            setFullName(`${contact.first_name} ${contact.last_name}`);
            if (contact.contact_medium) {
                const formattedMedium = contact.contact_medium
                    .replace("_", " ")
                    .toLowerCase();
                setContactMedium(
                    formattedMedium.charAt(0).toUpperCase() + formattedMedium.slice(1)
                );
            }
            const initials =
                contact.first_name.charAt(0) +
                (contact.last_name?.charAt(0) || contact.first_name.charAt(1));
            setIniciales(initials.toUpperCase());
        }
    }, [contact]);

    return (
        <div className="md:col-span-5 border rounded shadow p-5">
            <div className="flex">
                {/* Avatar Section */}
                <div className="flex col-span-full md:col-span-1 ml-5 mr-10">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={contact?.avatar_url ?? ''} />
                        <AvatarFallback>{iniciales}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col gap-4">
                    {/* Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 col-span-full">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Full Name:</span>
                            <span className="font-semibold truncate">{fullName ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">NIF:</span>
                            <span className="font-semibold">{contact?.nif ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Email:</span>
                            <span className="font-semibold truncate">{contact?.email ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Alternate Email:</span>
                            <span className="font-semibold truncate">{contact?.alternate_email ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Phone:</span>
                            <span className="font-semibold">{contact?.phone ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Mobile:</span>
                            <span className="font-semibold">{contact?.mobile ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Birthday:</span>
                            <span className="font-semibold">{contact?.birthday ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Preferred Contact Medium:</span>
                            <span className="font-semibold">{contactMedium ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Language:</span>
                            <span className="font-semibold">{contact?.language ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">RGPD Consent:</span>
                            <span className="font-semibold">{contact?.rgpd ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Profession:</span>
                            <span className="font-semibold">{contact?.profession ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Company:</span>
                            <span className="font-semibold">{contact?.company ?? '-'}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col md:col-span-1">
                            <span className="text-gray-500 font-medium">Gender:</span>
                            <span className="font-semibold">{contact?.gender ?? '-'}</span>
                        </div>
                        <div className="flex flex-col md:col-span-3">
                            <span className="text-gray-500 font-medium">Notes:</span>
                            <span className="font-semibold">{contact?.notes ?? '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPropertyDetails;
