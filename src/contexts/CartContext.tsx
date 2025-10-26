"use client";
import { createContext, useContext, useState, ReactNode, FC } from "react";

interface CartContextType {
  bagClicked: boolean;
  isSheetOpen: boolean;
  sizeError: string | null;

  sumOfCartItems: number | null;
  setSumOfCartItems: React.Dispatch<React.SetStateAction<number | null>>;
  setSizeError: React.Dispatch<React.SetStateAction<string | null>>;

  setBagClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CartProviderProps {
  children: ReactNode;
}

export interface ClothDataProps {
  id: string;
  name: string;
  color: string;
  price: string;
  details: string[];
  delivery: string;
  front_image: string;
  image_p1: string;
  image_p2: string;
  image_p3: string;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [bagClicked, setBagClicked] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const [sumOfCartItems, setSumOfCartItems] = useState<number | null>(null);

  return (
    <CartContext.Provider
      value={{
        bagClicked,
        sumOfCartItems,
        sizeError,
        setSizeError,
        setSumOfCartItems,
        setBagClicked,
        isSheetOpen,
        setIsSheetOpen,
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
