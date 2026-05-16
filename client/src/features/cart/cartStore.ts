import { create } from "zustand";

export type CartItem = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  image?: string;
  quantity?: number;
};

type AppliedCoupon = {
  code: string;
  discountAmount: number;
};

type CartState = {
  items: CartItem[];
  appliedCoupon: AppliedCoupon | null;
  addItem: (item: CartItem) => void;
  removeItem: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  clearCoupon: () => void;
  subtotal: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  appliedCoupon: null,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((cartItem) => cartItem._id === item._id);

      if (existing) {
        return {
          items: state.items.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
              : cartItem
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

  updateQuantity: (_id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),

  clearCart: () => set({ items: [], appliedCoupon: null }),

  applyCoupon: (coupon) => set({ appliedCoupon: coupon }),

  clearCoupon: () => set({ appliedCoupon: null }),

  subtotal: () =>
    get().items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    ),

  total: () => {
    const subtotal = get().subtotal();
    const discount = get().appliedCoupon?.discountAmount || 0;
    return Math.max(0, subtotal - discount);
  },
}));