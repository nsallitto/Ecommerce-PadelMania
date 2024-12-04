import AddProductForm from "@/components/product/AddProductForm";
import ProductForm from "@/components/product/ProductForm";


export default function page() {

    return (
        <>
            <h1 className="text-3xl text-center text-sky-900 font-bold mt-10 mb-5">Agrega un nuevo producto</h1>
            {/* ESTO ES UNA COMPOSICION. ServerComponent --> ClientComponent --> ServerComponent */}
            <AddProductForm>
                <ProductForm />
            </AddProductForm>
        </>
    )
}
