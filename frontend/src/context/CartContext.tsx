import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CartContext,
  type AddCartItem,
  type CartItem,
} from "./cartStore";

const STORAGE_KEY = "furniro-cart";

const createItemId = (item: AddCartItem) =>
  `${item.productId}:${item.color}:${item.size}`;

const loadItems = (): CartItem[] => {
  try {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    return savedItems ? (JSON.parse(savedItems) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: AddCartItem) => {
    const id = createItemId(item);
    setItems((currentItems) => {
      const existingItem = currentItems.find((current) => current.id === id);
      if (existingItem) {
        return currentItems.map((current) =>
          current.id === id
            ? { ...current, quantity: current.quantity + item.quantity }
            : current,
        );
      }
      return [...currentItems, { ...item, id }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem }),
    [items, addItem, updateQuantity, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
