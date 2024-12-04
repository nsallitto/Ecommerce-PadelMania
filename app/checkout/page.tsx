"use client"
import { useEffect } from "react"
import { useCartStore } from "@/src/cartStore"
import { formatCurrency } from "@/src/utils"
import { useRouter } from "next/navigation"
import ResumeProduct from "@/components/checkout/ResumeProduct"
import LoginFormCheckout from "@/components/checkout/LoginFormCheckout"
import ShippingForm from "@/components/checkout/ShippingForm"
import PaymentForm from "@/components/checkout/PaymentForm"
import ToastNotification from "@/components/ui/ToastNotification"
import { useCheckoutStore } from "@/src/checkoutStore"

//suponemos cualquier monto de prueba
const gastoEnvio = 30

export default function Checkout() {
    const router = useRouter()
    const cart = useCartStore((state) => state.cart)
    const step = useCheckoutStore((state) => state.step)
    const setStep = useCheckoutStore((state) => state.setStep)
    
    const handleNextStep = () => {
        setStep(step + 1)
    }

    useEffect(() => {
        if (!cart.length) {
            router.push("/products")
        }
    }, [cart, router])

    if (!cart.length) {
        return null // Renderiza nada mientras redirige
    }
    return (
        <>
            <h1 className="text-3xl text-center text-sky-900 font-bold mt-10">Finalizar compra</h1>

            <div className="mt-10  flex flex-col w-full md:flex-row gap-5">
                <div className="w-2/3 bg-white"> 
                    {step === 1 && <LoginFormCheckout onNext={handleNextStep} />} {/*--> pasamos por props onNext  */}
                    {step === 2 && <ShippingForm onNext={handleNextStep} />}
                    {step === 3 && <PaymentForm />}
                </div>
                <div className=" md:w-1/3 space-y-2">
                    <h2 className="font-semibold text-lg">Resumen del pedido</h2>
                    <div>
                        <div className="bg-white flex flex-col gap-2 px-1 mb-2">
                            <div className="flex justify-between font-semibold">
                                <p>Subtotal:</p>
                                <p>{formatCurrency(cart.reduce((total, monto) => total + monto.subtotal, 0))}</p>
                            </div>
                            <div className="flex justify-between text-sky-500 font-semibold">
                                <p>Gasto de envío</p>
                                <p>{formatCurrency(gastoEnvio)}</p>
                            </div>
                            <div className="flex justify-between font-bold border-y border-gray-200 py-2">
                                <p>Total a pagar:</p>
                                <p>{formatCurrency(cart.reduce((total, monto) => total + monto.subtotal, 0) + gastoEnvio)}</p>
                            </div>
                        </div>
                        <div>
                            {cart.map(product => (
                                <ResumeProduct
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastNotification />
        </>
    )
}
