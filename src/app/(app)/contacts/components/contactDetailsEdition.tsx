import React, {useState} from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const ContactDetailsEdition: React.FC = () => {
    const { register, setValue, getValues } = useFormContext();
    const [selectedContactMedium, setSelectedContactMedium] = useState<string | undefined>(getValues("contact_medium"));

    const handleSelectChange = (name: string, value: string) => {
        setValue(name, value); // Actualiza el valor en React Hook Form
        if (name === "contact_medium") setSelectedContactMedium(value);
    };

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
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Contact Medium</label>
                    <Select
                        onValueChange={(value) => handleSelectChange("contact_medium", value)}
                        value={selectedContactMedium}
                    >
                        <SelectTrigger className="w-full border p-1 rounded">
                            <SelectValue placeholder="Select Contact Medium"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("contact_medium")} />
                </div>
            </div>
        </div>
    );
}

export default ContactDetailsEdition;
