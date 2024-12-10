import React from 'react';
import {Property} from "@/types/property.types";
import {IoBedOutline, IoPricetagOutline} from 'react-icons/io5';
import { PiBathtubLight, PiPolygonDuotone } from 'react-icons/pi';
import { MdBalcony } from 'react-icons/md';
import {RiMoneyEuroCircleLine, RiPriceTag2Line} from "react-icons/ri";

interface PropertyDetailsProps {
    property: Property;
}

const PropertyPrices: React.FC<PropertyDetailsProps> = ({ property }) => {

    const price = property.sale_price != 0 ? property.sale_price + '€' : (property.rent_price != 0 ? property.rent_price + '€/month' : '');

    return (
        <div className="md:col-span-5 border rounded shadow p-5">
            <div className="flex flex-wrap ml-5 justify-between items-end">
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <RiPriceTag2Line className="mr-1 font-bold"/>Operation:
                    </span>
                    <span className="font-bold">{property.operation ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/> Sale price:
                    </span>
                    <span className="font-bold">{property.sale_price ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>Rent price:
                    </span>
                    <span className="font-bold">{property.rent_price ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>Transfer price:
                    </span>
                    <span className="font-bold">{property.transfer_price ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <PiPolygonDuotone className="mr-1 font-bold"/>Plot area:
                    </span>
                    <span className="font-bold">{property.plot_area ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <PiPolygonDuotone className="mr-1 font-bold"/>Usable area:
                    </span>
                    <span className="font-bold">{property.usable_area ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <MdBalcony className="mr-1 font-bold"/>Terrace area:
                    </span>
                    <span className="font-bold">{property.terrace_area ?? "-"}</span>
                </div>
            </div>
        </div>
    );
}

export default PropertyPrices;
