import React from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from '@/components/ui/input';

const PropertyDescriptionsEdition = () => {
    const { register } = useFormContext();

    return (
        <div className="border p-4 text-sm shadow rounded-md">
            <h3 className="text-sm font-bold mb-6">Property Descriptions</h3>
            <div className="flex items-start flex-wrap">
                <div className="flex flex-col w-full mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Title:
                    </label>
                    <Input
                        type="text"
                        className="border p-1 rounded w-full"
                        {...register("title")}
                    />
                </div>
                <div className="flex flex-col w-full mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Description:
                    </label>
                    <textarea
                        className="border p-1 rounded w-full"
                        rows={5}
                        {...register("description")}
                    />
                </div>
            </div>
        </div>
    );
}

export default PropertyDescriptionsEdition;
