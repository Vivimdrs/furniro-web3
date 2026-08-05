import { createContext } from "react";

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

export type CartContextValue = {
  items: CartItem[];
  addItem: (item: AddCartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
