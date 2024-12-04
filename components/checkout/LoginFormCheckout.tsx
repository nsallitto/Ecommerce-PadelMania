import { Login } from "@/actions/login-action";
import { useCheckoutStore } from "@/src/checkoutStore";
import { LoginSchema } from "@/src/zodSchema";
import { toast } from "react-toastify";

export default function LoginFormCheckout({ onNext }: { onNext: () => void }) {
    const setUserData = useCheckoutStore((state) => state.setUserData)

    const handleLoginForm = async (formData: FormData) => {
        const data = {  //-->almacenamos los campos en un obj para poder validar
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }
        /** VALIDACION CLIENTE */
        const result = LoginSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach( issue => { //-->lo recorremos ya que zod nos devuelve un []
                toast.error(issue.message, {pauseOnHover: false})
            })
            return
        }
        /** VALIDACION SERVIDOR */
        const response = await Login(data)
        if (response?.errors) {
            response.errors.forEach( issue => {
                toast.error(issue.message)
            })
            return
        }
        setUserData(data)
        onNext()
    }

    return (
        <div>
            <h2
                className="bg-gradient-to-r from-sky-900 to-sky-800 p-2 text-white font-bold">
                1. Identificación
            </h2>
            <div className="p-6 border border-gray-200">
                <p className="mb-5 text-sm font-semibold text-slate-500">Inicia Sesión</p>
                <form 
                    action={handleLoginForm}
                >
                    <div className="flex flex-col space-y-2 mb-4">
                        <label
                            className="font-semibold"
                            htmlFor="email">Email *</label>
                        <input
                            className="border border-gray-300 w-full md:w-3/5 p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="email"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mb-10">
                        <label
                            className="font-semibold"
                            htmlFor="password">Password *</label>
                        <input
                            className="border border-gray-300 w-full md:w-3/5 p-2 rounded-lg focus:outline-none focus:border-lime-400"
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>
                    <input
                        className="w-full md:w-3/5 bg-lime-400 p-2 rounded-lg text-white font-bold cursor-pointer"
                        type="submit"
                        value='Iniciar Sesión'
                    />
                </form>
            </div>
        </div>
    )
}
