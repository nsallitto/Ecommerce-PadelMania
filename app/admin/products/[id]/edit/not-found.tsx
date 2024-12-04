import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className='text-center'>
            <h1 className="text-3xl text-center text-sky-900 font-bold mt-10 mb-10">Producto no encontrado</h1>
            <Link
                href='/admin/products'
                className='text-lime-400 px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto'
            >Volver a productos</Link>
        </div>
    )
}
