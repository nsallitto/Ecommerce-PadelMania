"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/zodSchema";
import { revalidatePath } from "next/cache";

export async function dispatchOrder(formData: FormData) {

    const data = {
        orderId: formData.get("order_id")
    }
    const result = OrderIdSchema.safeParse(data) //-->validamos data
    if (result.success) {
        try {
            await prisma.order.update({
                //buscamos la orden cuyo id sea igual a orderIdpero de result asi ya esta validado
                where: {
                    id: result.data.orderId
                },
                //una vez encontrado decimos que queremos actualizar
                data: {
                    status: true
                }
            })
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error);
        }
    }
}