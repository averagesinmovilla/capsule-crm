'use client'

import ContactEdition from "@/app/(app)/contacts/components/contactEdition";
import {useState} from "react";
import {Contact} from "@/types/contact.types";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import {SkeletonCard} from "@/app/(app)/contacts/components/skeleton";
import {useAuth} from "@/hooks/auth";

export default function Create() {
    const {user} = useAuth();
    const [contact, setContact] = useState<Contact | null>({
        id: 0,
        user_id: user.id,
        first_name: '',
        last_name: '',
        email: '',
        contact_medium: 'email',
        gender: 'other',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    if (loading) {
        return (
            <div>
                <div className='mb-2'>
                    <Breadcrumbs/>
                </div>
                <SkeletonCard/>
            </div>
        );
    }
    if (error || !contact) return <div>Error loading contact</div>;

    return (
        <div className="flex flex-1 w-full h-full">
            <ContactEdition editFunction={setIsEditing} data={contact} isNew={true}/>
        </div>
    );
}