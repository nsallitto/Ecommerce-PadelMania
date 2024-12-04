import { dispatchOrder } from "@/actions/dispatch-order"
import { AdminOrder } from "@/src/types"
import { formatCurrency, formatDate } from "@/src/utils"

type OrderCardProps = {
    order: AdminOrder
}
export default function OrderCard({ order }: OrderCardProps) {
    return (
        <div className="bg-white rounded-lg px-4 py-6 sm:p-6 lg:p-8 hover:shadow-xl space-y-2">
            <h2 className="text-xl font-semibold">OrdenID: {order.id}</h2>
            <p className="text-xl font-semibold">Cliente: UsuarioX</p>
            <p className=" text-slate-600">Monto: {formatCurrency(order.total)}</p>
            <p className=" text-slate-600">Pagado el {formatDate(order.createdAt)}</p>
            <div className="border-t border-gray-200">
                <p className=" text-xl mt-2 font-semibold">Productos:</p>
                {order.orderProducts.map((product) => (
                    <div
                        key={product.id}
                        className="mt-2 flex flex-col gap-5"
                    >
                        <div>
                            <div className="flex gap-2 mt-2">
                                <p>{product.quantity}</p>
                                <p>{product.product.name}</p>
                            </div>
                            <p className="mt-2">ID: {product.id}</p>
                        </div>
                        <form 
                            action={dispatchOrder}
                        >
                            <input
                                type="hidden" 
                                value={order.id}
                                name="order_id"
                            />
                            <input
                                type="submit"
                                className=" w-full mt-5 bg-lime-400 p-2 rounded-lg font-semibold text-sky-900 hover:bg-lime-600 cursor-pointer transition-all"
                                value="Despachar orden"
                            />
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
}
