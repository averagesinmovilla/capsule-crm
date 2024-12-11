import React from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const ContactDetailsEdition: React.FC = () => {
    const { register } = useFormContext();
    return (
        <div className="p-4 border rounded shadow">
            <h3 className="font-bold">Contact Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">First Name</label>
                    <Input type="text" placeholder="First Name" {...register("first_name")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Last Name</label>
                    <Input type="text" placeholder="Last Name" {...register("last_name")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Email</label>
                    <Input type="email" placeholder="Email" {...register("email")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Alternate Email</label>
                    <Input type="email" placeholder="Alternate Email" {...register("alternate_email")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Phone</label>
                    <Input type="text" placeholder="Phone" {...register("phone")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Mobile</label>
                    <Input type="text" placeholder="Mobile" {...register("mobile")} />
                </div>
            </div>
        </div>
    );
}

export default ContactDetailsEdition;
