"use client";
import { Handbag } from "lucide-react";
import { Button } from "./button";
import UploadButton from "./uploadButton";
import { Badge } from "./badge";
import { useCart } from "@/contexts/CartContext";
import { CartSheet } from "./cartSheet";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const { setIsSheetOpen, sumOfCartItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <header className=" w-full  h-10 flex justify-around items-center fixed inset-x-0 top-0  bg-white z-50">
      <div>Header</div>
      <Link href="/">
        <h1 className="font-bold text-md">FIVEFOURFIVE</h1>
      </Link>
      <div className="flex justify-between items-center gap-2 hidden">
        <UploadButton />
        <Button variant="destructive">delete</Button>
      </div>
      <div className="flex justify-center items-center">
        <CartSheet
          action={
            <div
              className="relative inline-block mt-2 cursor-pointer"
              onClick={() => {
                setIsSheetOpen(true);
              }}
            >
              <Handbag className="w-5 h-5" />

              <Badge
                className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2 text-[10px]"
                variant="default"
              >
                {sumOfCartItems}
              </Badge>
            </div>
          }
        />
      </div>
    </header>
  );
}
