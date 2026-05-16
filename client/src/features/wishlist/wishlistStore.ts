import { create } from "zustand";

export type WishlistItem = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  image?: string;
};

type WishlistState = {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  removeItem: (_id: string) => void;
  hasItem: (_id: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  toggleItem: (item) =>
    set((state) => {
      const exists = state.items.some((wishlistItem) => wishlistItem._id === item._id);

      if (exists) {
        return {
          items: state.items.filter((wishlistItem) => wishlistItem._id !== item._id),
        };
      }

      return {
        items: [...state.items, item],
      };
    }),

  removeItem: (_id) =>
    set((state) => ({
      items: state.items.filter((item) => item._id !== _id),
    })),

  hasItem: (_id) => get().items.some((item) => item._id === _id),

  clearWishlist: () => set({ items: [] }),
}));