import { Product } from "@/types";
import { create } from "zustand";

type appState = {
  term: string;
  setTerm: (val: string) => void;

  cart: Record<number, { product: Product; quantity: number }>;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
};

export const useAppStore = create<appState>((set) => ({
  term: "",
  setTerm: (val) => set({ term: val }),

  cart: {},

  addToCart: (product) =>
    set((state) => {
      const current = state.cart[product.id];
      return {
        cart: {
          ...state.cart,
          [product.id]: {
            product,
            quantity: current ? current.quantity + 1 : 1,
          },
        },
      };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [productId]: _, ...rest } = state.cart;
      return { cart: rest };
    }),

  setQuantity: (productId, delta) =>
    set((state) => {
      const current = state.cart[productId];
      if (!current) return state;

      const newQuantity = current.quantity + delta;

      if (newQuantity <= 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [productId]: _, ...rest } = state.cart;
        return { cart: rest };
      }

      return {
        cart: {
          ...state.cart,
          [productId]: {
            ...current,
            quantity: newQuantity,
          },
        },
      };
    }),

  clearCart: () => set({ cart: {} }),
}));
