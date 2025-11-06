"use client";
import React from "react";
import { CartSheet } from "./cartSheet";
import { Handbag, User } from "lucide-react";
import { Badge } from "./badge";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function RightSide() {
  const { setIsSheetOpen, sumOfCartItems } = useCart();
  return (
    <div className="flex justify-center gap-4 items-center">
      <div>
        <CartSheet
          action={
            <div
              className="relative inline-block mt-2 cursor-pointer"
              onClick={() => {
                setIsSheetOpen(true);
              }}
            >
              <Handbag size={21} className="text-gray-600" />

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
      <div>
        <SignedOut>
          <Link href="/sign-in">
            <User size={22} className="text-gray-600 cursor-pointer" />
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
