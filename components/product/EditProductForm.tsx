"use client"
import { editProduct } from "@/actions/edit-product-action"
import { ProductFormSchema } from "@/src/zodSchema"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function EditProductForm({children}: {children: React.ReactNode}) {
    const params = useParams()
    const id = +params.id   
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
        //Validamos del lado del cliente
        const result = ProductFormSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message, {pauseOnHover: false})
            })
            return
        }
        const response = await editProduct(data, id)
        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message, {pauseOnHover: false})
            })
            return
        }
        toast.success("Producto actualizado", {pauseOnHover: false})
        router.push('/admin/products')
    }

    return (
        <div className="bg-white px-5 py-10 mt-10 rounded-md max-w-3xl mx-auto">
            <form 
                className="space-y-5"
                action={handleSubmit}
            >
                
                {children}

                <input 
                    className="w-full p-2 bg-lime-400 font-bold text-white cursor-pointer hover:bg-lime-500 transition-all"
                    value="Editar Producto"
                    type="submit" 
                />
            </form>
        </div>
    )
}
