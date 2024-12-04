"use client"
import { useModalStore } from "@/src/modalStore"
import { useCartStore } from "@/src/cartStore"
import ProductCart from "./ProductCart"
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartModal() {
    const router = useRouter()
    const { isOpen, closeModal } = useModalStore()
    const { cart } = useCartStore()
    //calculamos e total a pagar
    const total = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    const disabledPayButton = () => cart.length === 0
    
    const checkOut = () => {
        router.push('/checkout')
        closeModal()
    }

    if (!isOpen) return null
    return (
        <>
            <div className="fixed inset-0 flex items-end justify-end z-50">
                <div onClick={closeModal} className="bg-gray-500 bg-opacity-60 absolute inset-0"></div>
                <div className="bg-white w-full h-full sm:w-96 right-0 relative shadow-xl z-50 overflow-y-auto">
                    <div className="flex flex-col justify-between">
                        <div className="mb-2 bg-lime-100 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-1">
                                <ShoppingBagIcon width={20} className="text-sky-900 mt-1" />
                                <h2 className="text-2xl text-sky-900 font-bold">Carrito <span className="text-m">({cart.length})</span></h2>
                            </div>
                            <button onClick={closeModal}>
                                <XMarkIcon width={25} className="text-sky-800 cursor-pointer" />
                            </button>
                        </div>

                        {cart.length ? (
                            cart.map(product => (
                                <ProductCart
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : <p className="text-center mt-5">El carrito esta vacio</p>
                        }
                    </div>

                    <div className="bg-gray-100 p-5 sticky bottom-0">
                        <p className="font-bold text-2xl text-sky-900">Total a Pagar: {formatCurrency(total)}</p>
                        <button
                            disabled={disabledPayButton()}
                            onClick={checkOut}
                            className="disabled:opacity-50 w-full p-2 block text-center bg-lime-200 mt-2 text-xl font-semibold text-sky-900"
                        >
                            Pagar
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
