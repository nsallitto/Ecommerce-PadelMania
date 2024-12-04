"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Rutas a las imágenes
const images = [
    "/bannerImages/bannerGeneral.webp",
    "/bannerImages/bannerBullpadel.webp",
    "/bannerImages/bannerSiux.webp",
    "/bannerImages/bannerHead.webp",
    "/bannerImages/bannerBullpadel2.webp",
    
];

const Carousel = () => {
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay:3000 }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img src={image} alt={`Slide ${index}`} className="w-full h-500 object-cover" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
