import ProductsTable from "@/components/admin/ProductsTable";
import Pagination from "@/components/ui/Pagination";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        include: {
            category: true
        },
        where: {
            category: {
                name: {
                    contains: searchTerm,
                    mode: 'insensitive' //-->no discrimina mayusculas o minusculas
                }
            }
        }
    })
    return products
}
export default async function page({ searchParams }: { searchParams: { search: string } }) {
    const products = await searchProducts(searchParams.search);

    return (
        <>
            <h1 className="text-3xl text-center text-sky-900 font-bold mt-10 mb-16">Resultados de la búsqueda: {searchParams.search}</h1>

            {products.length ? (
                <>
                    <ProductsTable products={products} />
                    <Link
                        className="flex justify-center text-sky-900 font-bold mt-5"
                        href={'/admin/products'}
                    >Volver</Link>
                </>
            ) : (
                <>
                    <p className="text-center mb-5">No se encontró ninguna categoría con ese nombre</p>
                    <Link
                        className="flex justify-center text-sky-900 font-bold"
                        href={'/admin/products'}
                    >Volver</Link>
                </>
            )}
        </>
    )
}
