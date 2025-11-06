"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartItemProps } from "@/types/types";
import { createContext, useContext, useState, ReactNode, FC } from "react";

interface CartContextType {
  bagClicked: boolean;
  isSheetOpen: boolean;
  sizeError: string | null;
  localCart: CartItemProps[];

  sumOfCartItems: number | null;
  setSumOfCartItems: React.Dispatch<React.SetStateAction<number | null>>;
  setSizeError: React.Dispatch<React.SetStateAction<string | null>>;

  setBagClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;

  addToCart: (item: Omit<CartItemProps, "quantity">) => void;
  removeFromCart: (itemId: string, itemSize: string) => void;
  updateQuantity: (itemId: string, itemSize: string, quantity: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [bagClicked, setBagClicked] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const [sumOfCartItems, setSumOfCartItems] = useState<number | null>(null);
  const [localCart, setLocalCart] = useLocalStorage<CartItemProps[]>(
    "cart",
    []
  );

  const addToCart = (newItem: Omit<CartItemProps, "quantity">) => {
    setLocalCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string, itemSize: string) => {
    setLocalCart((prevCart) =>
      prevCart.filter((item) => !(item.id === itemId && item.size === itemSize))
    );
  };

  const updateQuantity = (
    itemId: string,
    itemSize: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(itemId, itemSize);
    } else {
      setLocalCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId && item.size === itemSize
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        // All the context values are now provided correctly
        bagClicked,
        sumOfCartItems,
        sizeError,
        setSizeError,
        setSumOfCartItems,
        setBagClicked,
        isSheetOpen,
        setIsSheetOpen,
        localCart, // This was missing
        addToCart, // This was missing
        removeFromCart, // This was missing
        updateQuantity, // This was missing
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be inside <CartProvider />");
  }
  return ctx;
}
