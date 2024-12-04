"use client"
import { useCartStore } from "@/src/cartStore"
import Link from "next/link";


export default function page() {
    const clearCart = useCartStore((state) => state.clearCart)

    setTimeout(() => {
        clearCart()
    }, 1000);

    return (
        <>
            <h1 className="text-3xl text-center text-sky-900 font-bold mt-10 mb-5">Gracias por tu compra</h1>
            <p className="text-md text-center text-slate-600 mb-5">Te enviamos un e-mail para que realices el seguimiento de tu pedido</p>
            <Link
                className="block text-center mt-24 font-black text-lime-500 text-2xl"
                href={'/products'}
            >Volver a la pagina rincipal</Link>
        </>
    )
}
