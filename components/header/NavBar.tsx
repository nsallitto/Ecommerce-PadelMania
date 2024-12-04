"use client"
import { useState } from "react";
import Link from "next/link";
import { Category } from "@prisma/client";
import { useModalStore } from "@/src/modalStore";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { UserIcon, ShoppingBagIcon } from "@heroicons/react/24/solid"

type NavBarProps = {
    categories: Category[]
}

export default function NavBar({ categories }: NavBarProps) {
    const [isClick, setIsClick] = useState(false)

    const toggleNavbar = (): void => {
        setIsClick(!isClick)
    }
    const { openModal } = useModalStore()
    return (
        <>
            <div className="mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 h-20">

                <Link href={'/products/#'} className="text-white text-3xl font-bold italic"><span className="text-lime-500">PADEL </span>MANIA</Link>

                <div className="hidden sm:block">
                    <nav className="flex items-center space-x-10 2xl:space-x-16">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products/${category.name}`}
                                className="text-white font-bold hover:text-lime-500 text-lg transition-all"
                            >
                                {category.name}</Link>
                        ))}
                    </nav>
                </div>
                <div className="sm:hidden">
                    <button onClick={toggleNavbar}>
                        {isClick ? (
                            <XMarkIcon width={34} className="text-lime-500"/>
                        ) : (
                            <Bars3Icon width={34} className="text-lime-500"/>
                        )}
                    </button>
                </div>

                <div className="flex gap-4">
                    <UserIcon className="size-6 text-white hover:cursor-pointer hover:text-lime-500 transition-all"/>
                    <ShoppingBagIcon 
                        onClick={openModal}
                        className="size-6 text-white hover:cursor-pointer hover:text-lime-500 transition-all"/>
                </div>
            </div>

            {isClick && (
                <div className="sm:hidden">
                    <nav className="flex flex-col ml-6 space-y-3 pb-10">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products/${category.name}`}
                                className="text-white font-bold text-xl"
                            >
                                {category.name}</Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    )
}
