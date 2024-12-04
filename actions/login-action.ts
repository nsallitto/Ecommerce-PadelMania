"use server"

import { LoginSchema } from "@/src/zodSchema";

export async function Login(data: unknown) { //-->Le ponemos unknown porque no sabemos que dato va a llegar y vamos a validar con ZOD
    /** VALIDAMOS DATA */
    const result = LoginSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    try {
        //aca vamos a interactuar con prisma
    } catch (error) {
        console.log(error);
        
    }
}