import * as z from "zod";
import {Property} from "@/types/property.types";

export const contactSchema = z.object({
    first_name: z.string().nonempty({ message: "El nombre no puede estar vacío" }),
    last_name: z.string().nonempty({ message: "Los apellidos no pueden estar vacíos" }),
    email: z.string().email({ message: "Email inválido" }),
    nif: z.string().optional(),
    alternate_email: z.string().optional(),
    phone: z.string().optional(),
    mobile: z.string().optional(),
    avatar_url: z.string().optional(),
    birthday: z.string().optional(),
    contact_medium: z.enum(["email", "phone", "social_media", "other"]),
    language: z.enum(['english', 'spanish', 'french', 'other']).optional(),
    notes: z.string().optional(),
    rgpd: z.string().optional(),
    profession: z.string().optional(),
    company: z.string().optional(),
    gender: z.enum(["male", "female", "other"]),
});

export const getDefaultValues = (data: Contact) => ({
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    nif: data.nif || "",
    email: data.email || "",
    alternate_email: data.alternate_email || "",
    phone: data.phone || "",
    mobile: data.mobile || "",
    avatar_url: data.avatar_url || "",
    birthday: data.birthday || "",
    contact_medium: data.contact_medium || "other",
    language: data.language || "other",
    notes: data.notes || "",
    rgpd: data.rgpd || "",
    profession: data.profession || "",
    company: data.company || "",
    gender: data.gender || "other",
    properties: data.properties || [],
});

export type Contact = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    nif?: string;
    email: string;
    alternate_email?: string;
    phone?: string;
    mobile?: string;
    avatar_url?: string;
    birthday?: string;
    contact_medium: 'email' | 'phone' | 'social_media' | 'other';
    language?: 'english' | 'spanish' | 'french' | 'other';
    notes?: string;
    rgpd?: string;
    profession?: string;
    company?: string;
    gender: 'male' | 'female' | 'other';
    properties?:Property[];
};

export type ApiResponseContact = {
    message: string;
    contact: Contact;
    status: number;
};

export type ApiResponseContactStatus = {
    message: string;
    status: number;
};



/*
import * as z from "zod";

export const contactSchema = z.object({
    first_name: z.string().nonempty({ message: "El nombre no puede estar vacío" }),
    last_name: z.string().nonempty({ message: "Los apellidos no pueden estar vacíos" }),
    email: z.string().email({ message: "Email inválido" }),
    nif: z.string().optional(),
    alternate_email: z.string().optional(),
    phone: z.string().optional(),
    mobile: z.string().optional(),
    avatar_url: z.string().optional(),
    birthday: z.string().optional(),
    contact_medium: z.enum(["email", "phone", "sms", "other"]),
    language: z.string().optional(),
    notes: z.string().optional(),
    rgpd: z.string().optional(),
    profession: z.string().optional(),
    company: z.string().optional(),
    gender: z.enum(["male", "female", "other"]),
    user_id: z.number(),
    id: z.number(),
});

export type Contact = z.infer<typeof contactSchema>;

export const getDefaultValues = (data: Contact) => ({
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    nif: data.nif || "",
    email: data.email || "",
    alternate_email: data.alternate_email || "",
    phone: data.phone || "",
    mobile: data.mobile || "",
    avatar_url: data.avatar_url || "",
    birthday: data.birthday || "",
    contact_medium: data.contact_medium || "other",
    language: data.language || "",
    notes: data.notes || "",
    rgpd: data.rgpd || "",
    profession: data.profession || "",
    company: data.company || "",
    gender: data.gender || "other",
    user_id: data.user_id || 0,
    id: data.id || 0,
});


export type ApiResponseContact = {
    message: string;
    contact: Contact;
    status: number;
};
 */