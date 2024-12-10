import React, {useState} from 'react';
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { Input } from '@/components/ui/input';


//Esto es útil para componentes que dependen de objetos o propiedades disponibles solo en el navegador, como window o document, que no existen en el entorno de servidor.
//porl o que con la siguiente intruccion le decimos que cargue el componente mapa de forma dinamica y le indicamos con el ssr false que no lo haga en el lado del servidor.
const MapDetails = dynamic(() => import('./map/mapDetails'), {
    ssr: false
});

const LocationDetails: React.FC = () => {
    const { register, watch, setValue, getValues, formState: { errors } } = useFormContext();
    const [search, setSearch] = useState("");

    const handleBlur = () => {
        const values = getValues();
        const street = values.street || "";
        const streetNumber = values.street_number || "";
        const city = values.city || "";

        let constructedAddress = `${street} ${streetNumber}, ${city}`;
        constructedAddress = street === "" && city !== "" ? city : constructedAddress;
        constructedAddress = street === "" && city === "" ? "" : constructedAddress;
        setSearch(constructedAddress);
    };

    const handleCoordinatesChange = (newLat: number, newLon: number) => {
        // Actualiza los valores del formulario directamente
        setValue("latitude", newLat);
        setValue("longitude", newLon);
    };

    // Capturar valores del formulario
    const latitude = watch("latitude");
    const longitude = watch("longitude");

    return (
        <div className="border p-4 text-sm rounded-md mb-4 shadow">
            <h3 className="text-sm font-bold mb-6">Location Details</h3>
            <div className="flex flex-col md:flex-row">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            City:
                        </label>
                        <Input
                            type="text"
                            className={`border p-1 rounded w-full ${
                                errors.city ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            {...register("city")}
                            onBlur={handleBlur}
                        />
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-600">
                                {`${errors.city.message}`}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Street:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("street")}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Street Number:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("street_number")}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Floor:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("floor")}
                        />
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Door:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("door")}
                        />
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Country ID:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("country_id")}
                        />
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Zip Code:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("zip_code")}
                        />
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Zone:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("zone")}
                        />
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5 hidden">
                        <label className="mb-2 flex items-center text-slate-500">
                            Latitude:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            value={latitude}
                            readOnly
                        />
                        {/*{errors.longitude && <span className="text-red-500 text-sm">{errors.longitude.message}</span>} /!* Mostrar el mensaje de error *!/*/}
                    </div>
                    <div className="flex flex-col md:mr-10 mb-5 hidden">
                        <label className="mb-2 flex items-center text-slate-500">
                            Longitude:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            value={longitude}
                            readOnly
                        />
                        {/*{errors.longitude && <span className="text-red-500 text-sm">{errors.longitude.message}</span>} /!* Mostrar el mensaje de error *!/*/}
                    </div>
                </div>
                <MapDetails latitude={latitude} longitude={longitude} search={search} onCoordinatesChange={handleCoordinatesChange}/>
            </div>
        </div>
    );
}

export default LocationDetails;
