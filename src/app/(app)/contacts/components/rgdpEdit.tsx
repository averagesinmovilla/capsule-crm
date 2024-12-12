import React from 'react';
import { useFormContext } from "react-hook-form";

const RgpdEdit: React.FC = () => {
    const { register } = useFormContext();

    return (
        <div className="p-4 border rounded shadow">
            <h3 className="font-bold">RGPD</h3>
            <div className="grid grid-cols-1 gap-4 p-5">
                <div className="flex flex-col">
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
