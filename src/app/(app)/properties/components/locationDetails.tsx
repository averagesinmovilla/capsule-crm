import React from 'react';
import {RiMapPinLine} from "react-icons/ri";
import {Property} from "@/types/property.types";


interface PropertyDetailsProps {
    data: Property;
}

const LocationDetails: React.FC<PropertyDetailsProps> = ({ data }) => {

    const array = [data.street, data.street_number, data.door, data.floor, data.city];
    const arrayDirection = array.filter(item => item != null && item !== '');
    const direction = arrayDirection.join(", ");

    return (
        <div className="flex flex-col">
            <span className="flex items-center">
                <RiMapPinLine />
                <span className="text-lg ml-2 font-bold">{direction ?? "-"}</span>
            </span>
        </div>
    );
}

export default LocationDetails;
