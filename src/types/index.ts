import { Order, OrderProducts, Product } from "@prisma/client";

export type CartProduct = Pick<Product, 'id'|'name'|'price'|'image'> & {
    quantity: number
    subtotal: number
}
export type CartModal = {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}
export type UserData =  {
    email: string
    password: string
}
export type ShippingData = {
    nombre: string
    apellido: string
    dni: string
    telefono: string
    provincia: string
    ciudad: string
    direccion: string
    nro: string
    piso?: string
}
export type CheckoutState = {
    step: number
    setStep: (nextStep: number) => void
    prevStep: () => void
    userData: UserData
    setUserData: (data: UserData) => void
    shippingData: ShippingData
    setShippingData: (data: ShippingData) => void
}
export type OrderData = {
    cart: CartProduct[],
    total: number,
}
export type AdminOrder = Order & {
    orderProducts: (OrderProducts & { //-->importante los parentesis
        product: Product
    })[]
}