import NavBar from '@/components/header/NavBar'
import CartModal from '@/components/cart/CartModal'
import { prisma } from '@/src/lib/prisma'

/** Obtenemos las categorias */
export const getCategories = async () => {
    return await prisma.category.findMany()
}

export default async function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const categories = await getCategories()
    return (
        <>
            <header className="bg-gradient-to-r from-sky-950 to-teal-700">
                <NavBar categories={categories} />
            </header>
            <CartModal />
            <main className="lg:mx-20 lg:mt-10">
                {children}
            </main>
            <footer className="mt-20">
                aca va a ir el footer
            </footer>
        </>
    )
}
