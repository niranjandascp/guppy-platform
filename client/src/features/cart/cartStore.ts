import { create } from "zustand";

export type CartItem = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (_id: string) => void;
  increaseQty: (_id: string) => void;
  decreaseQty: (_id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i._id === item._id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  removeItem: (_id) =>
    set((state) => ({
      items: state.items.filter((item) => item._id !== _id),
    })),

  increaseQty: (_id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQty: (_id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.quantity * item.price, 0),
}));