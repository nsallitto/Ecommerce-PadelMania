"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderData } from "@/src/types"

export async function createOrderAction(data: OrderData) {

    /** ACA VA A IR LA VALIDACION DE PAGO */
    
    try {
        await prisma.order.create({
            data: {
                total: data.total,
                orderProducts: {
                    create: data.cart.map( product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
        return {
            success: "Pago Exitoso"
        }
    } catch (error) {
        console.log(error);
    }
}