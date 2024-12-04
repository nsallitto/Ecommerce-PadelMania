import { useCartStore } from "@/src/cartStore";
import { CartProduct } from "@/src/types"
import { formatCurrency, getImagePath } from "@/src/utils";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import Image from "next/image";
import { useMemo } from "react";

type ProductCartProps = {
    product: CartProduct
}
const MAX_ITEMS = 5 //-->se recomienda ponerlo en una variable por si lo usamos enotra parte del codigo, solo cambiamos de aqui

export default function ProductCart({ product }: ProductCartProps) {
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const removeItem = useCartStore((state) => state.removeItem)
    const disabledDecreaseButton = useMemo(() => product.quantity === 1, [product]) //--> evitamos pedidos negativos
    const disabledIncreaseButton = useMemo(() => product.quantity === MAX_ITEMS, [product])

    return (
        <>
            <div className="border-b border-gray-200 hover:bg-gray-100">
                <div className="flex justify-between p-3 items-center space-x-5">
                    <Image
                        alt={`Imagen del producto ${product.name}`}
                        src={getImagePath(product.image)}
                        width={70}
                        height={70}
                    />
                    <p className="text-slate-700 text-lg">{product.name}</p>
                    <p className="font-bold text-xl text-slate-800">{formatCurrency(product.price)}</p>
                    <button
                        type="button"
                        onClick={() => removeItem(product.id)}>
                        <TrashIcon
                            className="w-4 text-red-700 cursor-pointer" />
                    </button>
                </div>
                <div className="flex justify-between mx-5 my-2">
                    <div className="flex space-x-2 items-center mx-2">
                        <p>Cantidad: </p>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                disabled={disabledDecreaseButton}
                                className="disabled:opacity-20"
                                onClick={() => decreaseQuantity(product.id)}>
                                <MinusIcon width={15} />
                            </button>
                            <p>{product.quantity}</p>
                            <button
                                type="button"
                                disabled={disabledIncreaseButton}
                                className="disabled:opacity-20"
                                onClick={() => increaseQuantity(product.id)}>
                                <PlusIcon width={15} />
                            </button>
                        </div>
                    </div>
                    <div>Subtotal: <span className="font-bold text-lg">{formatCurrency(product.subtotal)}</span></div>
                </div>
            </div>
        </>

    )
}
