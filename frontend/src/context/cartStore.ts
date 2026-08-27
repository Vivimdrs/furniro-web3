import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  discountPrice?: number | null;
};

export type AddCartItem = Omit<CartItem, "id">;

type CartStore = {
  items: CartItem[];
  isCartOpen: boolean;                   
  openCart: () => void;                  
  closeCart: () => void;
  addItem: (item: AddCartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

const createItemId = (item: AddCartItem) =>
  `${item.productId}:${item.color}:${item.size}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (item) =>
        set((state) => {
          const id = createItemId(item);
          const existingItem = state.items.find((current) => current.id === id);

          if (existingItem) {
            return {
              isCartOpen: true,
              items: state.items.map((current) =>
                current.id === id
                  ? {
                      ...current,
                      ...item,
                      id,
                      quantity: current.quantity + item.quantity,
                    }
                  : current,
              ),
            };
          }

          return { 
            isCartOpen: true,
            items: [...state.items, { ...item, id }] };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "furniro-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
export const useCart = <T>(selector: (state: CartStore) => T): T => {
  return useCartStore(selector);
};