import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BannerCarrousel from '@/components/ui/BannerCarrousel'
import InfiniteCarousel from '@/components/ui/InfiniteCarrousel';

export default async function Products() {

    return (
        <>
            <BannerCarrousel />
            <h2
                className='text-white font-bold lg:text-2xl bg-gradient-to-r from-sky-950 to-teal-600 p-2 inline-block mt-8 shadow-2xl'
            >Todas nuestras marcas</h2>
            <InfiniteCarousel />
            
            <div className='mt-10 w-fullborder border-gray-900 flex flex-col md:grid md:grid-cols-2 gap-1 md:gap-2'>
                <Link href={'/products/Palas'}>
                    <div className='relative w-full h-[100px] md:h-[150px] border-2 hover:border-lime-500 cursor-pointer transition-all'>
                        <Image
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            src={'/Seccion_Palas.jpg'}
                            alt='Imagen hacia Palas' />
                    </div>
                </Link>
                <Link href={'/products/Zapatillas'}>
                    <div className='relative w-full h-[100px] md:h-[150px] border-2 hover:border-lime-500 cursor-pointer transition-all'>
                        <Image
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            src={'/Seccion_Zapatillas.jpg'}
                            alt='Imagen hacia Zapatillas' />
                    </div>
                </Link>
                <Link href={'/products/Pelotas'}>
                    <div className='relative w-full h-[100px] md:h-[150px] border-2 hover:border-lime-500 cursor-pointer transition-all'>
                        <Image
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            src={'/Seccion_Pelotas.jpg'}
                            alt='Imagen hacia Pelotas' />
                    </div>
                </Link>
                <Link href={'/products/Accesorios'}>
                    <div className='relative w-full h-[100px] md:h-[150px] border-2 hover:border-lime-500 cursor-pointer transition-all'>
                        <Image
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            src={'/Seccion_Accesorios.jpg'}
                            alt='Imagen hacia Accesorios' />
                    </div>
                </Link>

            </div>

        </>
    );
}
