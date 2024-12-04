"use client"
import { Product } from '@prisma/client'
import { useCartStore } from '@/src/cartStore'
import { toast } from 'react-toastify'

type AddToCartButtonProps = {
    product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart) //-->traemos la fn addToCart para poder usarla

    const  handleAddToCart = () => {
        addToCart(product)
        toast.success("Producto agregado al carrito", {pauseOnHover:false})
    }

    return (
        <div className="mx-4 md:mx-0">
            <button
                type='button'
                onClick={handleAddToCart}
                className="bg-lime-400 text-sky-800 font-semiboldbold rounded-3xl p-2 w-full "
            >
                Agregar Al Carrito
            </button>
        </div>
    )
}
