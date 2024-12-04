
import { formatCurrency, getImagePath } from '@/src/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ProductCardProps = {
    product: Product,
    category: String
}
export default function ProductCard({ product, category }: ProductCardProps) {
    
    return (
        
        <div className='bg-white border flex flex-col items-center hover:shadow-2xl transition-all rounded-lg'>
            <Image 
                width={200} 
                height={200}
                src={getImagePath(product.image)}
                alt={`Imagen del producto ${product.name}`}
            />
            
            <div className='flex flex-col p-2 gap-1 justify-between items-center mb-2'>
                <h3 className='uppercase font-light'>{product.name}</h3>
                <p className='text-xl font-semibold'>{formatCurrency(product.price)}</p>
            </div>

            <Link 
                href={`${category}/${product.id}`}
                className='px-4 py-1 mb-4 text-white font-bold bg-sky-900 rounded border-2 border-sky-900 hover:bg-white hover:text-sky-900 transition-all'
            >Ver Mas</Link>
        </div>
    )
}
