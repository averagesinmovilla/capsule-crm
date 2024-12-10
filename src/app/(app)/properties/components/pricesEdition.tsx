// PricesEdition.tsx
import React, {useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { RiPriceTag2Line } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const PricesEdition: React.FC = () => {
    const { register, setValue, getValues } = useFormContext();
    const [selectedStatus, setSelectedStatus] = useState(getValues("status")); // Estado local para el valor del select
    const [isAvailable, setIsAvailable] = useState(getValues("is_available")); // Estado local para el valor del select


    // Manejar cambios de valor en el select
    const handleSelectChange = (value:string) => {
        setSelectedStatus(value);  // Actualizar el estado local
        setValue("status", value); // Actualizar el valor en el hook form

        let disponible =  true;
        if (value != "available") {
            disponible = false;
        }
        setIsAvailable(disponible);
        setValue("is_available", disponible); // Actualizar el valor en el hook form
    };

    return (
        <div className="border p-4 rounded h-full shadow">
            <h3 className="text-sm font-bold mb-6">Prices and Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full text-sm">
                <div className="flex flex-col mr-4">
                    <label className="mb-2 flex items-center text-slate-500">
                        <RiPriceTag2Line className="mr-1 font-bold"/>
                        Property Status:
                    </label>
                    <Select
                        onValueChange={handleSelectChange}
                        value={selectedStatus} // Estado controlado
                    >
                        <SelectTrigger className="w-full border p-1 rounded">
                            <SelectValue placeholder="Select Property Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="off_market">Off Market</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("is_available")} />

                    {/* Se registra el campo para usarlo con react-hook-form */}
                    <input type="hidden" {...register("status")} />
                </div>
                <div className="flex flex-col mr-4">
                    <label className="mb-2 flex items-center text-slate-500">
                        <RiPriceTag2Line className="mr-1 font-bold"/>
                        Operation:
                    </label>
                    <Input
                        type="text" className="border p-1 rounded" {...register("operation")}
                    />
                </div>
                <div className="flex flex-col mr-4">
                    <label className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>
                        Sale price:
                    </label>
                    <Input
                        type="number" step="any"
                        className="border p-1 rounded" {...register("sale_price", {valueAsNumber: true})}
                    />
                </div>
                <div className="flex flex-col mr-4">
                    <label className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>
                        Rent price:
                    </label>
                    <Input
                        type="number" step="any" className="border p-1 rounded" {...register("rent_price", { valueAsNumber: true })}
                    />
                </div>
                <div className="flex flex-col mr-4">
                    <label className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>
                        Transfer price:
                    </label>
                    <Input
                        type="number" step="any" className="border p-1 rounded" {...register("transfer_price", { valueAsNumber: true })}
                    />
                </div>
            </div>
        </div>
    );
}

export default PricesEdition;
