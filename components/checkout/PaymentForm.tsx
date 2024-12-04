import { createOrderAction } from '@/actions/create-order-action'
import { useCartStore } from '@/src/cartStore'
import { useCheckoutStore } from '@/src/checkoutStore'
import { CartProduct } from '@/src/types'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function PaymentForm() {
    const router = useRouter()
    const cart: CartProduct[] = useCartStore((state) => state.cart)
    const total = cart.reduce((total, monto) => total + monto.subtotal, 0) + 30

    const handlePagar = async () => {
        const data = {
            cart,
            total,
        }
        const response = await createOrderAction(data)
        if (response?.success) { //-->si todo esta ok y se crea la orden
            toast.success(response.success)
            router.push('/checkout/success')
        }
    }


    const prevStep = useCheckoutStore((state) => state.prevStep)
    return (
        <div className="">
            <div className="bg-gradient-to-r from-sky-900 to-sky-800 p-2 text-white font-bold flex justify-between items-center">
                <h2>
                    2. Pago
                </h2>
                <button 
                    onClick={prevStep}
                    className="text-sm hover:text-slate-400 cursor-pointer"
                >
                    volver
                </button>
            </div>
            <div className="p-6 border border-gray-200">
                <p className="mb-5 text-sm font-semibold text-slate-500">Metodo de pago</p>
                            /** Aca iria toda la parte de pago */
                <button
                onClick={handlePagar}
                    className="w-full md:w-3/5 bg-lime-400 p-2 rounded-lg text-white font-bold cursor-pointer"
                >PAGAR</button>
            </div>
        </div>
    )
}
