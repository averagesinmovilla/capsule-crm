// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Property} from "@/types/property.types";
import {Image} from "@/types/image.types";
import React from "react";
import '../styles/mySwiper.css';
import GallerySwiper from "@/app/(app)/properties/components/gallerySwiper";

interface PropertyProps {
    property: Property
}


const GalleryPhotos: React.FC<PropertyProps> = ({ property }) => {

    const arrFotos = property.image ? property.image.map((image: Image) => image.image_name) : [];
    const foto1 = arrFotos[1] ? arrFotos[1] : "../images/sin-foto-propiedad.jpg";
    const foto2 =  arrFotos[2] ? arrFotos[2] : "../images/sin-foto-propiedad.jpg";
    const numfotos = arrFotos.length > 3 ? arrFotos.length-3 : 0;
    const classCarrusel = arrFotos.length > 1 ? "md:col-span-3" : "md:col-span-5";


    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={classCarrusel}>
                <div className="h-[450px]">
                    <GallerySwiper property={property}/>
                </div>
            </div>
            <div className="md:flex flex-col justify-between md:col-span-1 hidden">
                {arrFotos.length > 1 && (
                <div className="relative w-full h-[220px] rounded-md">
                    <img className="rounded-md w-full h-full object-cover" alt="Imagen"
                         src={foto1}/>
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-md"></div>
                </div>
                )}
                {arrFotos.length > 2 && (
                <div className="relative w-full h-[220px] rounded-md">
                    <img className="rounded-md w-full h-full object-cover" alt="Imagen"
                         src={foto2}/>
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-md"></div>
                    {numfotos > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <span
                            className="bg-white bg-opacity-80 text-gray-800 rounded-lg px-4 py-2 text-sm font-medium">
                            +{numfotos} Photos
                        </span>
                    </div>
                    )}
                </div>
                )}
            </div>
        </div>
    );
};

export default GalleryPhotos;
