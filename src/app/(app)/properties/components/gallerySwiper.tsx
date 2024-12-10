// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {EffectFade, Navigation, Pagination} from "swiper/modules";
import { Property } from "@/types/property.types";
import { Image } from "@/types/image.types";
import React from "react";
import '../styles/mySwiper.css';

interface PropertyProps {
    property: Property
}


const GallerySwiper: React.FC<PropertyProps> = ({ property }) => {

    let existPhotos = false;
    let datosFotos = new Array();
    let classFotoPrincipal = "";
    if(property.image) {
        existPhotos = property.image.length > 0 ? true : false;
        datosFotos =  property.image.map((image: Image) => image.image_name);
    }

    if(!existPhotos) {
        datosFotos = new Array("../images/foto-principal-propiedad.jpg");
        classFotoPrincipal = "brightness-75 saturate-50";
    }

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, EffectFade]}
            spaceBetween={30}
            effect={'fade'}
            slidesPerView={1}
            navigation
            pagination={pagination}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className="mySwiper"
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            } as React.CSSProperties}
        >

            {datosFotos.map((foto, index) => (
                <SwiperSlide key={index}>
                    <img src={foto} className={classFotoPrincipal} alt={`Foto ${index + 1}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GallerySwiper;

