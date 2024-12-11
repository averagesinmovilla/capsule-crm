import React from 'react';
import {Property} from "@/types/property.types";
import {IoBedOutline, IoPricetagOutline} from 'react-icons/io5';
import {BiSolidCarGarage} from "react-icons/bi";
import { PiBathtubLight, PiPolygonDuotone } from 'react-icons/pi';
import { MdBalcony } from 'react-icons/md';
import {RiMoneyEuroCircleLine, RiPriceTag2Line} from "react-icons/ri";
import LocationDetails from "@/app/(app)/properties/components/locationDetails";

interface PropertyDetailsProps {
    property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {

    const price = property.sale_price != 0 ? property.sale_price + '€' : (property.rent_price != 0 ? property.rent_price + '€/month' : '');

    return (
        <div className="flex flex-col md:col-span-2">
            <div className="flex w-full justify-between mt-5 mb-3">
                <span className="text-2xl font-bold">{property.reference}</span>
                <span className="flex items-center text-xl font-bold"><RiMoneyEuroCircleLine
                    className="mr-1"/>{price}</span>
            </div>
            <LocationDetails data={property}/>
            <div className="flex mt-4 mb-4 text-sm text-slate-500">
                <div className="flex items-center mr-4 text-lg">
                    <IoBedOutline className="ml-2 mr-1 text-green-500"/>
                    <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center mr-4 text-lg">
                    <PiBathtubLight className="ml-2 mr-1 text-green-500"/>
                    <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center mr-4 text-lg">
                    <BiSolidCarGarage className="ml-2 mr-1 text-green-500"/>
                    <span>{property.garage_spaces} Parks</span>
                </div>
            </div>
            <span className="border border-b-0 mb-6"></span>
            <div className="mb-4">
                <h2 className="text-lg font-bold">{property.title}</h2>
                <p className="text-sm mt-2">{property.description}</p>
            </div>
        </div>
    );
}

export default PropertyDetails;
