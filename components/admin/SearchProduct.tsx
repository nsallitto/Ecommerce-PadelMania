"use client"
import { SearchSchema } from "@/src/zodSchema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function SearchProduct() {
    const router = useRouter()

    const handleSearch = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message, {pauseOnHover: false})
            })
        }
        router.push(`/admin/products/search?search=${result.data?.search}`)
    }

    return (
        <form
            action={handleSearch}
            className="flex items-center"
        >
            <input
                type="text"
                placeholder="Busca por categoria"
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            />
            <input 
                type="submit" 
                className="bg-lime-400 text-white font-bold p-2 uppercase cursor-pointer"
                value="Buscar"
            />
        </form>
    )
}
