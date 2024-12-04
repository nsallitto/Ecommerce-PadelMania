"use client"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"
import AdminRoute from "../admin/AdminRoute"

const adminNavigation = [
    { url: "/admin/orders", text: "Ordenes", blank: false },
    { url: "/admin/products", text: "Productos", blank: false },
    { url: "/products", text: "Ver Productos", blank: true },
]
export default function AdminNavBar() {
    const [isClick, setIsClick] = useState(false);

    const toggleNavbar = () => {
        setIsClick(!isClick)
    }
    return (
        <>

            <div className="mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 h-20">
                <Link href={'/products/#'} className="text-white text-3xl font-bold italic"><span className="text-lime-500">PADEL </span>MANIA</Link>

                {/* nav de desktop */}
                <div className="hidden sm:block">
                    <nav className="flex items-center space-x-10 2xl:space-x-16">
                        {adminNavigation.map((route) => (
                            <AdminRoute
                                key={route.url}
                                route={route}
                            />
                        ))}
                    </nav>
                </div>

                {/* botones de mobile */}
                <div className="sm:hidden">
                    <button onClick={toggleNavbar}>
                        {isClick ? (
                            <XMarkIcon width={34} className="text-lime-500" />
                        ) : (
                            <Bars3Icon width={34} className="text-lime-500" />
                        )}
                    </button>
                </div>
            </div>
            {/* nav de mobile */}
            {isClick && (
                <div className="sm:hidden">
                    <nav className="flex flex-col ml-6 space-y-3 pb-10">
                        {adminNavigation.map((route) => (
                            <AdminRoute
                                key={route.url}
                                route={route}
                            />
                        ))}
                    </nav>
                </div>
            )}
        </>
    )
}
{/* <Link
                                key={route.text}
                                href={`${route.url}`}
                                className="text-white font-bold hover:text-lime-500 text-lg transition-all"
                            >
                                {route.text}
                            </Link> */}