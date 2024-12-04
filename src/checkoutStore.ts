import { create } from "zustand"
import { CheckoutState } from "./types"

export const useCheckoutStore = create<CheckoutState>((set) => ({
    step: 1,
    setStep: (nextStep) => set({step: nextStep}),
    prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })), // No permite ir más atrás del primer paso
    userData: { email: '', password: '' },
    setUserData: (data) => set({ userData: data}),
    shippingData: {
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        provincia: '',
        ciudad: '',
        direccion: '',
        nro: '',
        piso: '',
    },
    setShippingData: (data) => set({ shippingData: data }),
}))