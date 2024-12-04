import ProductsTable from "@/components/admin/ProductsTable";
import SearchProduct from "@/components/admin/SearchProduct";
import Pagination from "@/components/ui/Pagination";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() { //-->esta consulta es para saber cuantos productos hay en total y asi calcular el total pag
    return await prisma.product.count()
}
async function getProducts(page: number, pageSize: number) { //-->hacemos la consulta para obtener productos
    const skip = (page - 1) * pageSize //-->calculamos que registros hay que saltar
    return await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true
        }
    })
}
export type ProductsWhithCategory = Awaited<ReturnType<typeof getProducts>> //-->le dejamos el trabajo de los types a TS 

export default async function AdminProducts({ searchParams }: { searchParams: { page: string } }) {
    const page = +searchParams.page || 1 //-->si no hay searchParams toma 1
    const pageSize = 5 //-->cantidad de registros que queremso por pag

    page < 0 && redirect('/admin/products')

    //al ser consultas independientes conviene hacerlas juntas
    const [products, totalProducts] = await Promise.all([
        getProducts(page, pageSize),
        productCount(), 
    ])

    const totalPage = Math.ceil(totalProducts / pageSize)
    page > totalPage && redirect('/admin/products')//-->si el usuario ingresa un nro de pag desde la url(despues de la consulta porque utiliza totalPage)

    return (
        <>
            <h1 className="text-3xl text-center text-sky-900 font-bold mt-10 mb-5">Administra tus Productos</h1>

            <div className="flex flex-col md:flex-row lg:justify-between gap-5 mx-3 lg:mt-8">
                <Link
                    className="bg-lime-400 p-2 w-full lg:w-auto text-white font-bold text-center"
                    href={'/admin/products/new'}
                >Nuevo Producto</Link>

                <SearchProduct />
            </div>
            <ProductsTable products={products} />

            <Pagination page={page} totalPage={totalPage} />
        </>
    )
}
