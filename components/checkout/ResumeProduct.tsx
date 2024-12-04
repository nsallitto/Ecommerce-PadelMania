import { CartProduct } from '@/src/types'
import Image from 'next/image'
import { formatCurrency } from '@/src/utils'

type ResumeProductProps = {
    product: CartProduct
}
// flex justify-between p-3 items-center space-x-5
export default function ResumeProduct({product}: ResumeProductProps) {
    return (
        <div className="border-b border-gray-200 bg-white">
                <div className=" flex flex-col md:flex-row justify-center md:justify-between md:px-1 items-center space-x-2">
                    <Image
                        alt={`Imagen del producto ${product.name}`}
                        src={`/products/${product.image}`}
                        width={70}
                        height={70}
                    />
                    <p className="text-slate-700 text-lg">{product.name}</p>
                    <p className="font-bold  text-slate-800">{formatCurrency(product.price * product.quantity)}</p>
                </div>
                <p className='text-sm text-gray-600 text-start pl-3'>Cantidad: {product.quantity}</p>
            </div>
    )
}
