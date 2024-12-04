import ProductCard from "@/components/product/ProductCard"
import { prisma } from "@/src/lib/prisma"
import Image from "next/image"

/** HACEMOS LA CONSULTA A PRISMA PARA OBTENER PRODUCTOS */
async function getProductsByCategory(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                name: category
            }
        }
    })
    return products
}

export default async function page({params}: {params: { category : string } }) {
    const category = params.category //--> leemos la categoria clikeada de la URL
    const products = await getProductsByCategory(category)
    
    return (
        <>
            <div className="relative w-full h-[300px] mb-10">
                <Image 
                    fill
                    alt="Banner seccion"
                    src={`/bannerImages/bannerVista${category}.png`}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 items-start gap-3">
                {products.map( product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        category={category}
                    />
                ))}
            </div>

        </>
    )
}
