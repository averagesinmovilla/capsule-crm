import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";

const PersonalInformationEdition: React.FC = () => {
    const { register, setValue, getValues } = useFormContext();

    const [selectedContactMedium, setSelectedContactMedium] = useState<string | undefined>(getValues("contact_medium"));
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(getValues("language"));
    const [selectedGender, setSelectedGender] = useState<string | undefined>(getValues("gender"));

    const handleSelectChange = (name: string, value: string) => {
        setValue(name, value); // Actualiza el valor en React Hook Form
        if (name === "contact_medium") setSelectedContactMedium(value);
        if (name === "language") setSelectedLanguage(value);
        if (name === "gender") setSelectedGender(value);
    };

    return (
        <div className="p-4 border rounded shadow">
            <h3 className="font-bold">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">NIF</label>
                    <Input type="text" placeholder="NIF" {...register("nif")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Avatar URL</label>
                    <Input type="text" placeholder="Avatar URL" {...register("avatar_url")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Date of Birth</label>
                    <Input type="date" placeholder="Date of Birth" {...register("birthday")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Contact Medium</label>
                    <Select
                        onValueChange={(value) => handleSelectChange("contact_medium", value)}
                        value={selectedContactMedium}
                    >
                        <SelectTrigger className="w-full border p-1 rounded">
                            <SelectValue placeholder="Select Contact Medium" />
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
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Language</label>
                    <Select
                        onValueChange={(value) => handleSelectChange("language", value)}
                        value={selectedLanguage}
                    >
                        <SelectTrigger className="w-full border p-1 rounded">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("language")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Gender</label>
                    <Select
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        value={selectedGender}
                    >
                        <SelectTrigger className="w-full border p-1 rounded">
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("gender")} />
                </div>
            </div>
        </div>
    );
};

export default PersonalInformationEdition;
