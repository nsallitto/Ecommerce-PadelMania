"use server"

import { ShippingSchema } from "@/src/zodSchema"

export async function createShippingOrder(data: unknown) {
    const result = ShippingSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
}