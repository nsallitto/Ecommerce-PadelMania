"use server"
import { prisma } from "@/src/lib/prisma";
import { ProductFormSchema } from "@/src/zodSchema";

export async function createProduct(data: unknown) {
    const result = ProductFormSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }   
    }
    await prisma.product.create({
        data: result.data
    })
}