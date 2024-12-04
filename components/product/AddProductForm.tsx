"use client"
import { useRouter } from "next/navigation"
import { createProduct } from "@/actions/create-product-action";
import { ProductFormSchema } from "@/src/zodSchema";
import { toast } from "react-toastify";

export default function AddProductForm({children}: {children: React.ReactNode}) {
    const router = useRouter()
    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            description: formData.get("description"),
            categoryId: formData.get("categoryId"),
            brandId: formData.get("brandId"),
            image: formData.get("image"),
        }
        /** VALIDAMOS DEL LADO DEL CLIENTE */
        const result = ProductFormSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message, {pauseOnHover: false})
            })
            return
        }
        /** VALIDAMOS DEL LADO DEL SERVIDOR */
        const response = await createProduct(data)
        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message, {pauseOnHover: false})
            })
            return
        }
        toast.success("Producto creado correctamente", {pauseOnHover: false})
        router.push('/admin/products')
    }

    return (
        <div className="bg-white px-5 py-10 mt-10 rounded-md max-w-3xl mx-auto">
            <form 
                action={handleSubmit}
                className="space-y-5"
            >
                {children}

                <input 
                    className="w-full p-2 bg-lime-400 font-bold text-white cursor-pointer hover:bg-lime-500 transition-all"
                    type="submit" 
                    value='Agregar Producto'
                />    
            </form>
        </div>
    )
}
