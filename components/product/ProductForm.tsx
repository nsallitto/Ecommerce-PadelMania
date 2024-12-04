import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"
import { Product } from "@prisma/client"

type ProductFormProps = {
    product?: Product
}
/** TRAEMOS LAS CATEGORIAS Y LAS MARCAS PARA EL <SELECT> */
async function getCategories() {
    return await prisma.category.findMany()
}
async function getBrands() {
    return await prisma.brand.findMany()
}

export default async function ProductForm({product}: ProductFormProps) {
    const [ categories, brands ] = await Promise.all([getCategories(), getBrands()])

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name">
                    Nombre
                </label>
                <input
                    className="w-full p-3 bg-slate-100"
                    placeholder="Nombre"
                    name="name"
                    id="name"
                    type="text" 
                    defaultValue={product?.name}/>
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="price">
                    Precio
                </label>
                <input
                    className="w-full p-3 bg-slate-100"
                    placeholder="Precio"
                    name="price"
                    id="price"
                    type="text" 
                    defaultValue={product?.price}/>
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="description">
                    Desripción
                </label>
                <textarea
                    className="w-full p-3 bg-slate-100 text-gray-400"
                    id="description"
                    name="description"
                    placeholder="Descripción"
                    defaultValue={product?.description}
                >
                </textarea>
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId">
                    Categoria:
                </label>
                <select
                    name="categoryId"
                    id="categoryId"
                    className="w-full p-3 bg-slate-100"
                    defaultValue={product?.categoryId}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map((category) => (
                        <option
                        key={category.id}
                        value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="brandId">
                    Marca:
                </label>
                <select
                    name="brandId"
                    id="brandId"
                    className="w-full p-3 bg-slate-100"
                    defaultValue={product?.brandId}
                >
                    <option value="">-- Seleccione --</option>
                    {brands.map((brand) => (
                        <option 
                        key={brand.id}
                        value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>

            <ImageUpload image={product?.image}/>
        </>
    )
}
