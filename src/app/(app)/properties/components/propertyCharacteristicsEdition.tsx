import React, {useEffect, useState} from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const PropertyCharacteristicsEdition = () => {
    const { register, setValue, getValues, formState: { errors } } = useFormContext();
    const [selectedType, setSelectedType] = useState(getValues("type")); // Estado local para el valor del select
    const [selectedState, setSelectedState] = useState(getValues("type")); // Estado local para el valor del select


    // Manejar cambios de valor en el select
    const handleSelectChange = (name: string, value: string) => {
        setValue(name, value); // Actualiza el valor en React Hook Form
        if (name === "type") setSelectedType(value);
        if (name === "state") setSelectedState(value);
    };

    return (
        <div className="border p-4 text-sm rounded-md shadow">
            <h3 className="text-sm font-bold mb-6">Property Characteristics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Reference:
                    </label>
                    <Input
                        type="text"
                        className="border p-1 rounded w-full"
                        {...register("reference")}
                    />
                    {errors.reference && (
                        <p className="mt-1 text-sm text-red-600">
                            {`${errors.reference.message}`}
                        </p>
                    )}
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        State:
                    </label>
                    <Input
                        type="text"
                        className="border p-1 rounded w-full"
                        {...register("state")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2 relative">
                    <label className="mb-2 text-slate-500">
                        Type of Property:
                    </label>
                    <Select
                        onValueChange={(value: string) => handleSelectChange("type", value)}
                        value={selectedType}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Property Type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="flat">Flat</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                            <SelectItem value="room">Room</SelectItem>
                            <SelectItem value="garage">Garage</SelectItem>
                            <SelectItem value="country_house">Country House</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Campo hidden para registrar con react-hook-form */}
                    <Input type="text" className="hidden" {...register("type")} />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Bedrooms:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("bedrooms")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Bathrooms:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("bathrooms")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Toilets:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("toilets")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Garage Spaces:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("garage_spaces")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Constructed Area (m²):
                    </label>
                    <Input
                        type="number" step="any"
                        className="border p-1 rounded"
                        {...register("constructed_area")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Usable Area (m²):
                    </label>
                    <Input
                        type="number" step="any"
                        className="border p-1 rounded"
                        {...register("usable_area")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Plot Area (m²):
                    </label>
                    <Input
                        type="number" step="any"
                        className="border p-1 rounded"
                        {...register("plot_area")}
                    />
                </div>
                <div className="flex flex-col sm:mr-10 mb-2">
                    <label className="mb-2 flex items-center text-slate-500">
                        Terrace Area (m²):
                    </label>
                    <Input
                        type="number" step="any"
                        className="border p-1 rounded"
                        {...register("terrace_area")}
                    />
                </div>
            </div>
        </div>
    );
}

export default PropertyCharacteristicsEdition;
