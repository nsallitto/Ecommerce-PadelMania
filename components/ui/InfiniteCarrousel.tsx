"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const brands = [
    "/Logo_Adidas.svg",
    "/Logo_Asics.svg",
    "/Logo_Babolat.svg",
    "/Logo_BlackCrown.svg",
    "/Logo_Bullpadel.svg",
    "/Logo_Head.svg",
    "/Logo_NOX.svg",
    "/Logo_Siux.svg",
    "/Logo_Starvie.svg",
];

const InfiniteCarousel = () => {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={"auto"}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
            }}
            speed={5000}
            loop={true} // Esta línea habilita el loop infinito
            freeMode={{ enabled: true, momentum: false }}
            modules={[Autoplay]}
        >
            {brands.map((brand, index) => (
                <SwiperSlide key={index} className="!w-auto flex items-center justify-center mt-6">
                    <img src={brand} alt={`Brand ${index}`} className="h-14 md:h-20 object-contain mx-4" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default InfiniteCarousel