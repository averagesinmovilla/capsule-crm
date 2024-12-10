import React from 'react';
import { useFormContext } from "react-hook-form";

const NotesEdit: React.FC = () => {
    const { register } = useFormContext();

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-blue-600">Notes</h3>
            <div className="grid grid-cols-1 gap-4 p-5">
                <div className="flex flex-col">
                    <label className="mb-2 text-slate-500">Notes</label>
                    <textarea
                        placeholder="Write your notes here..."
                        className="border p-2 rounded resize-none h-32"
                        {...register("notes")}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotesEdit;
