import * as z from "zod";
import { Image } from "@/types/image.types";
import {Contact, contactSchema} from "@/types/contact.types";

export const propertySchema = z.object({
    reference: z.string().nonempty({ message: "The reference cannot be empty" }),
    type: z.enum(["flat", "house", "duplex", "room", "garage", "country_house", "other"]),
    title: z.string().optional(),
    description: z.string().optional(),
    street: z.string().optional(),
    street_number: z.string().optional(),
    floor: z.string().optional(),
    door: z.string().optional(),
    city: z.string().nonempty({ message: "The city cannot be empty" }),
    country_id: z.string().nonempty({ message: "The country cannot be empty" }),
    state: z.enum(['under_construction', 'new', 'reformated', 'semi_renovated', 'second_hand', 'to_renovate']),
    zip_code: z.string().optional(),
    zone: z.string().optional(),
    latitude: z.coerce.number().min(-90).max(90, "Invalid latitude"),
    longitude: z.coerce.number().min(-180).max(180, "Invalid longitude"),
    sale_price: z.coerce.number().optional(),
    rent_price: z.coerce.number().optional(),
    transfer_price: z.coerce.number().optional(),
    operation: z.string().optional(),
    constructed_area: z.coerce.number().optional(),
    usable_area: z.coerce.number().optional(),
    plot_area: z.coerce.number().optional(),
    terrace_area: z.coerce.number().optional(),
    bedrooms: z.coerce.number().optional(),
    bathrooms: z.coerce.number().optional(),
    toilets: z.coerce.number().optional(),
    garage_spaces: z.coerce.number().optional(),
    is_available: z.boolean(),
    status: z.enum(["sold", "rented", "available", "off_market", "pending"]),
    contact_id: z.coerce.number(),
    user_id: z.coerce.number(),
});

export const getDefaultValues = (data: Property) => ({
    reference: data.reference || "",
    type: data.type || "other",
    title: data.title || "",
    description: data.description || "",
    street: data.street || "",
    street_number: data.street_number || "",
    floor: data.floor || "",
    door: data.door || "",
    city: data.city || "",
    state: data.state || "",
    country_id: data.country_id || "",
    zip_code: data.zip_code || "",
    zone: data.zone || "",
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
    sale_price: data.sale_price || 0,
    rent_price: data.rent_price || 0,
    transfer_price: data.transfer_price || 0,
    operation: data.operation || "",
    constructed_area: data.constructed_area || 0,
    usable_area: data.usable_area || 0,
    plot_area: data.plot_area || 0,
    terrace_area: data.terrace_area || 0,
    bedrooms: data.bedrooms || 0,
    bathrooms: data.bathrooms || 0,
    toilets: data.toilets || 0,
    garage_spaces: data.garage_spaces || 0,
    is_available: data.is_available || false,
    status: data.status || "pending",
    contact_id: data.contact_id || 0,
    user_id: data.user_id || 0,
    contact: data.contact || null,
    image: data.image || [],
});


export type Property = {
    id: number;
    reference: string;
    type: "flat" | "house" | "duplex" | "room" | "garage" | "country_house" | "other";
    title?: string;
    description?: string;
    street?: string;
    street_number?: string;
    floor?: string;
    door?: string;
    city?: string;
    state: "under_construction" | "new" | "reformated" | "semi_renovated" | "second_hand" | "to_renovate";
    country_id?: string;
    zip_code?: string;
    zone?: string;
    latitude?: number;
    longitude?: number;
    sale_price?: number;
    rent_price?: number;
    transfer_price?: number;
    operation?: string;
    constructed_area?: number;
    usable_area?: number;
    plot_area?: number;
    terrace_area?: number;
    bedrooms?: number;
    bathrooms?: number;
    toilets?: number;
    garage_spaces?: number;
    is_available?: boolean;
    status: "sold" | "rented" | "available" | "off_market" | "pending";
    contact_id: number;
    user_id: number;
    image?: Image[];
    contact?: Contact;
};

export type ApiResponseProperty = {
    message: string;
    property: Property;
    status: number;
};

export type ApiResponsePropertyStatus = {
    message: string;
    status: number;
};
