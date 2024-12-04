import { createShippingOrder } from "@/actions/adress-action";
import { useCheckoutStore } from "@/src/checkoutStore";
import { ShippingSchema } from "@/src/zodSchema";
import { toast } from "react-toastify";


export default function ShippingForm({ onNext }: { onNext: () => void }) {
    const setShippingData = useCheckoutStore((state) => state.setShippingData)
    const prevStep = useCheckoutStore((state) => state.prevStep)
    const shippingData = useCheckoutStore((state) => state.shippingData)

    const handleAdressForm = async (formData: FormData) => {
        const data = {
            nombre: formData.get("nombre") as string,
            apellido: formData.get("apellido") as string,
            telefono: formData.get("telefono") as string,
            dni: formData.get("dni") as string,
            provincia: formData.get("provincia") as string,
            ciudad: formData.get("ciudad") as string,
            direccion: formData.get("direccion") as string,
            nro: formData.get("nro") as string,
            piso: formData.get("piso") as string,
        }
        /** VALIDACION CLIENTE */
        const result = ShippingSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message, { pauseOnHover: false })
            })
            return
        }
        /** VALIDACION SERVIDOR */
        const response = await createShippingOrder(data)
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        setShippingData(data)
        onNext()
    }

    return (
        <div className="">
            <div className="bg-gradient-to-r from-sky-900 to-sky-800 p-2 text-white font-bold flex justify-between items-center">
                <h2>
                    2. Envío y facturación
                </h2>
                <button 
                    onClick={prevStep}
                    className="text-sm hover:text-slate-400 cursor-pointer"
                >
                    volver
                </button>
            </div>
            <div className="p-6 border border-gray-200">
                <p className="mb-5 text-sm font-semibold text-slate-500">Datos de entrega de tu pedido</p>
                <form
                    action={handleAdressForm}
                    className="md:grid md:grid-cols-2 md:gap-3">
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="nombre">Nombre</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="nombre"
                            name="nombre"
                            defaultValue={shippingData.nombre}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="apellido">Apellido</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="apellido"
                            name="apellido"
                            defaultValue={shippingData.apellido}

                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="dni">DNI</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="dni"
                            name="dni"
                            defaultValue={shippingData.dni}

                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="telefono">Teléfono</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="telefono"
                            name="telefono"
                            defaultValue={shippingData.telefono}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="provincia">Provincia</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="provincia"
                            name="provincia"
                            defaultValue={shippingData.provincia}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="ciudad">Ciudad</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            defaultValue={shippingData.ciudad}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="dirección">Dirección</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="direccion"
                            name="direccion"
                            defaultValue={shippingData.direccion}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="nro">Nro</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="nro"
                            name="nro"
                            defaultValue={shippingData.nro}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-10">
                        <label
                            className="font-semibold"
                            htmlFor="piso">Piso</label>
                        <input
                            className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="text"
                            id="piso"
                            name="piso"
                            defaultValue={shippingData.piso}
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <input
                            className="w-full md:w-3/5 bg-lime-400 p-2 rounded-lg text-white font-bold cursor-pointer"
                            type="submit"
                            value='Guardar datos envio'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
