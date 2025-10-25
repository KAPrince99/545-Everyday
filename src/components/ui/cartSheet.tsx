"use client";
import { ClothDataProps } from "@/app/[clothName]/page";
import {
  deleteCartItem,
  getCartData,
  UniqueCartItemProps,
  DeleteCartItemParams, // Import the new type
} from "@/app/actions/cartActions";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

interface DataProps {
  action: ReactNode;
  data?: ClothDataProps;
  chosenSize?: string | null;
  sizeError?: string | null;
}

export interface CartItemProps {
  id?: string | number;
  front_image: string;
  name: string;
  price: string;
  size: string | null;
  cloth_id: string;
  color: string;
}

export function CartSheet({ action, sizeError }: DataProps) {
  const { isSheetOpen, setIsSheetOpen, setSumOfCartItems } = useCart();
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading: isCartLoading } = useQuery<
    UniqueCartItemProps[]
  >({
    queryKey: ["cart"],
    queryFn: getCartData,
    staleTime: 0,
  });

  const totalItemCount =
    cartItems?.reduce((sum, item) => sum + (item.count || 1), 0) || 0;
  useEffect(() => {
    setSumOfCartItems(totalItemCount);
  }, [totalItemCount, setSumOfCartItems]);
  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    // The onMutate now receives the DeleteCartItemParams object
    onMutate: async (itemToDeleteParams: DeleteCartItemParams) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);

      // Optimistically update the UI by filtering out the item matching the unique parameters
      queryClient.setQueryData<UniqueCartItemProps[]>(["cart"], (old) =>
        old?.filter(
          (item) =>
            item.name !== itemToDeleteParams.name ||
            item.price !== itemToDeleteParams.price ||
            item.size !== itemToDeleteParams.size
        )
      );
      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      alert("Failed to delete item. Please try again.");
    },
    onSettled: () => {
      // Re-fetch to ensure sync with the database
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      const currentCartData = queryClient.getQueryData(["cart"]) as
        | UniqueCartItemProps[]
        | undefined;
      // Close the sheet if the cart becomes empty after deletion
      if (!currentCartData || currentCartData.length === 0) {
        setIsSheetOpen(false); // Use the state setter instead of DOM manipulation
      }
    },
  });

  function handleDeleteCart(
    itemName: string,
    itemPrice: string,
    itemSize: string | null,
    itemColor: string
  ) {
    // Pass the parameters as a single object to the mutate function
    deleteMutation.mutate({
      name: itemName,
      price: itemPrice,
      size: itemSize,
      color: itemColor,
    });
  }

  const cartIsEmpty = cartItems?.length === 0;

  // --- FIX APPLIED HERE ---
  // Calculate total based on item price * count
  const cartTotal =
    cartItems?.reduce(
      (sum, item) => sum + parseFloat(item.price) * (item.count || 1),
      0
    ) || 0;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {action}
      <SheetContent
        side="right"
        className="w-[355px] sm:w-[540px] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            Review your selected items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {isCartLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin size-8" />
            </div>
          ) : cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={item.id || index}
                className="grid grid-cols-[1fr_2fr] p-2 shadow-sm "
              >
                <section className="relative aspect-square">
                  <Image
                    src={item.front_image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </section>
                <section className="space-y-4">
                  <div className="">
                    <p className="text-[13px] font-semibold">
                      {item.name
                        .replace(/-/g, " ")
                        .slice(
                          0,
                          item.name.replace(/-/g, " ").lastIndexOf(" ")
                        )}
                    </p>
                  </div>
                  <div className="flex justify-between pr-2 items-center">
                    <p>size: {item.size}</p>
                    <Trash2
                      onClick={() =>
                        handleDeleteCart(
                          item.name,
                          item.price,
                          item.size,
                          item.color
                        )
                      }
                      className="size-4 cursor-pointer text-red-600"
                    />
                  </div>
                  <div className="flex justify-between items-center ">
                    <div>
                      {/* Placeholder buttons for quantity +/- */}
                      <Button
                        className="rounded-none cursor-pointer"
                        variant="outline"
                      >
                        -
                      </Button>
                      <Button
                        className="rounded-none cursor-pointer"
                        variant="outline"
                      >
                        {item.count}
                      </Button>
                      <Button
                        className="rounded-none cursor-pointer"
                        variant="outline"
                      >
                        +
                      </Button>
                    </div>

                    {/* --- FIX APPLIED HERE --- */}
                    {/* Display the total price for this line item */}
                    <p className="text-sm font-semibol">
                      ${(parseFloat(item.price) * (item.count || 1)).toFixed(2)}
                    </p>
                  </div>
                </section>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              Your cart is empty.
            </p>
          )}
        </div>

        <SheetFooter className="mt-auto">
          <div className="flex justify-between items-center w-full mb-4">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold ">${cartTotal.toFixed(2)}</p>
          </div>
          <Link href={cartIsEmpty ? "#" : "/checkOut"}>
            {" "}
            <Button
              onClick={() => {
                if (cartIsEmpty) return;
                setIsSheetOpen(false);
              }}
              disabled={cartIsEmpty}
              type="submit"
              className="w-full cursor-pointer "
            >
              Checkout
            </Button>
          </Link>

          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      {sizeError && <p className="text-red-500 mt-2 text-sm">{sizeError}</p>}
    </Sheet>
  );
}
