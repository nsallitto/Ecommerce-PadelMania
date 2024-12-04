import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z.string().min(6, "El password debe tener al menos 6 caracteres")
})

export const ShippingSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    dni: z.string().min(8, " El DNI debe tener al menos 8 caracteres"),
    telefono: z.string().min(9, "El teléfono debe tener al menos 9 caracteres"),
    provincia: z.string().min(1, "La provincia es requerida"),
    ciudad: z.string().min(1, "La ciudad es requerida"),
    direccion: z.string().min(1, "La dirección es requerida"),
    nro: z.string().min(1, "El número es requerido"),
    piso: z.string().optional(), // Piso es opcional
})

export const OrderIdSchema = z.object({
    orderId: z.string()
                .transform((value) => parseInt(value)) //-->el string que llega lo transformamos a numero con metodo transform
                .refine((value) => value > 0, "Hay errores") //-->refine nos permite revisar ciertos valores
})

export const SearchSchema = z.object({
    search: z.string()
                .trim()
                .min(1, "La busquda esta vacía")
})

export const ProductFormSchema = z.object({
    name: z.string().trim().min(1, "El nombre no puede ir vacio"),
    price: z.string().transform((value) => parseInt(value)).refine((value) => value > 0, "Precio no válido"), //--> transformamos a numero y validamos que sea > 0
    description: z.string().trim().min(10, "Descripción no válida"),
    categoryId: z.string().transform((value) => parseInt(value)).refine((value) => value > 0, "Categoria no válida"),
    brandId: z.string().transform((value) => parseInt(value)).refine((value) => value > 0, "Marca no válida"),
    image: z.string().min(1, "La imagen es obligatoria")
})