import React from 'react';
import { useFormContext } from "react-hook-form";

const RgpdEdit: React.FC = () => {
    const { register } = useFormContext();

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">RGPD</h3>
            <div className="grid grid-cols-1 gap-4 p-5">
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">RGPD</label>
                    <textarea
                        placeholder="Enter RGPD information..."
                        className="border p-2 rounded resize-none h-32"
                        {...register("rgpd")}
                    />
                </div>
            </div>
        </div>
    );
};

export default RgpdEdit;
