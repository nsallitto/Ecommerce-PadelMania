import { prisma } from "@/src/lib/prisma"
import Image from "next/image"
import { formatCurrency, getImagePath } from "@/src/utils"
import AddToCartButton from "@/components/product/AddToCartButton"
import ToastNotification from "@/components/ui/ToastNotification"


/** BUSCAMOS EL PRODUCTO */
export const getProduct = async (productId: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    return product!
}

export default async function page({ params }: { params: { id: String } }) {
    const { id } = params
    const productId = +id
    const product = await getProduct(productId)

    return (
        <>
            <ToastNotification />
            <div className="p-2 bg-white flex flex-col md:flex-row md:space-x-4 md:m-20 xl:mx-32">
                <div className="relative w-full h-64 md:h-[400px] md:w-1/2 "> {/* Asegura que haya un tamaño fijo para la imagen en sm */}
                    <Image
                        alt={`Imagen del producto ${product.name}`}
                        layout="fill"
                        objectFit="contain"
                        src={getImagePath(product.image)}
                        className="w-full h-full"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-4 md:justify-between md:p-5 xl:p-10">
                    <div className="flex flex-col md:gap-3 xl:gap-5">
                        <p className="text-sm text-gray-500">ID del Producto: {product.id}</p>
                        <h2 className="text-4xl font-bold text-slate-800">{product.name}</h2>
                        <p className="text-m text-slate-700">{product.description}</p>
                        <p className="text-3xl font-bold text-slate-800">{formatCurrency(product.price)}</p>
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </div>


        </>
    )
}
