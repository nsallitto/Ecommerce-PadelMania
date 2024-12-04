import EditProductForm from "@/components/product/EditProductForm";
import ProductForm from "@/components/product/ProductForm";
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation";

async function getProduct(productId: number) {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        notFound() //-->fn() de next que nos lleva al not-found
    }
    return product
}
export default async function EditProduct({ params }: { params: { id: string } }) {
    const productId = +params.id
    const product = await getProduct(productId)

    return (
        <>
            <h1
                className="text-3xl text-center text-sky-900 font-bold mt-10 mb-5"
            >Edita el producto: <span className="text-lime-500">{product.name}</span></h1>

            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    )
}
