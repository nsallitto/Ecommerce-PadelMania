"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";

type AdminRouteProps = {
    route: {
        url: string;
        text: string;
        blank: boolean;
    }
}

export default function AdminRoute({route}: AdminRouteProps) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(route.url)    
    
    return (
        <Link
            href={route.url}
            className={`${isActive ? 'text-lime-500': "text-white"} font-bold hover:text-lime-500 text-lg transition-all`}
            target={route.blank ? "_blank" : ""}
        >
        {route.text}</Link>
    )
}
