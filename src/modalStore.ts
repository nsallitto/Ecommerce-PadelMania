import { create } from "zustand";
import { CartModal } from "./types";

export const useModalStore = create<CartModal>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false })
}))