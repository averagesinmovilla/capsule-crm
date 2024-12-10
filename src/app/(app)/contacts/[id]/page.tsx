'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Contact } from '@/types/contact.types';
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from '@/app/(app)/contacts/components/skeleton';
import ContactView from "@/app/(app)/contacts/components/contactView";
import ContactEdition from "@/app/(app)/contacts/components/contactEdition";
import { ContactService } from '@/services/contact.service';

const ContactComponent = () => {
    const { id } = useParams();
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const fetchContact = async () => {
            if (id) {
                try {
                    const contactService = new ContactService();

                    const data: Contact = await contactService.getContact(Number(id));
                    setContact(data);
                    setFormData({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        phone: data.phone || '',
                        email: data.email || ''
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchContact();
    }, [id]);


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
    if (error || !contact) return <div>Error al cargar contacto</div>;

    return (
        <div className="flex flex-1 w-full h-full">
            {isEditing ? (
                <ContactEdition editFunction={setIsEditing} data={contact} />
            ) : (
                <ContactView editFunction={setIsEditing} data={contact}/>
            )}
        </div>
    );
};

export default ContactComponent;
