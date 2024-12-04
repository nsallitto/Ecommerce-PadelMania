import { create } from "zustand"
import { CartProduct } from "./types"
import { Product } from "@prisma/client"

/** CREAMOS LA INTERFACE PARA TYPESCRIPT */
interface Store {
    cart: CartProduct[],
    addToCart: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearCart: () => void
}
/** CREAMOS NUESTRO STATE */
export const useCartStore = create<Store>((set, get) => ({
    cart: [],
    addToCart: (product) => {
        const { description, categoryId, brandId, createdAt, updatedAt, ...data } = product //-> solo necesitamos data
        //evitamos registros duplicados
        let cartActualizado : CartProduct[] = []
        if(get().cart.find(item => item.id === product.id)) { //--> si el producto clickeado existe en carrito
            cartActualizado = get().cart.map(item => item.id === product.id ? { //--> buscamos el producto clickeado y actualizamos cantidad
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity+1)
            } : item )
        } else { //--> si el producto clickeado no esta en carrito
            cartActualizado = [...get().cart, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }    
        //seteamos el cart
        set(() => ({
            cart: cartActualizado
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id)  => {
        set((state) => ({
            cart: state.cart.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity-1)
            } : item)
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            cart: state.cart.filter(item => item.id !== id)
        }))
    },
    clearCart: () => {
        set(() => ({
            cart: []
        }))
    }
}))

