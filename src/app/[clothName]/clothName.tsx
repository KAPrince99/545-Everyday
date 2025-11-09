"use client";

import { supabase } from "@/lib/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { setCartData, UniqueCartItemProps } from "../actions/cartActions";
import { useCart } from "@/contexts/CartContext";
import ProductInfo from "@/components/ui/productInfo";
import { ProductImageDisplay } from "@/components/ui/productImageDisplay";
import StyledWithCard from "@/components/ui/StyledWithCard";
import { CartItemProps, ClothDataProps } from "@/types/types";
import ClothNameSkeleton from "@/components/ui/clothNameSkeleton";

async function fetchClothData(
  decodedClothName: string
): Promise<ClothDataProps> {
  const { data, error } = await supabase
    .from("clothes")
    .select("*")
    .eq("name", decodedClothName)
    .single();

  if (error || !data) throw new Error(error?.message || "Cloth not found");

  return data;
}

export default function ClothName({ clothName }: { clothName: string }) {
  const decodedClothName = decodeURIComponent(clothName);
  const [chosenSize, setChosenSize] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { setIsSheetOpen, sizeError, setSizeError } = useCart();
  const queryClient = useQueryClient();

  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  function handleSelectSize(selectedSize: string, i: number) {
    setChosenSize(selectedSize);
    setSelectedIndex(i);
  }

  const { data, isLoading, error } = useQuery<ClothDataProps>({
    queryKey: ["clothData", decodedClothName],
    queryFn: () => fetchClothData(decodedClothName),
  });

  useEffect(() => {
    if (chosenSize) {
      setSizeError(null);
    }
  }, [chosenSize, setSizeError]);

  const { mutateAsync: addToCartMutation, isPending: isAddingToCart } =
    useMutation({
      mutationFn: setCartData,

      onMutate: async (newCartItem: CartItemProps) => {
        await queryClient.cancelQueries({ queryKey: ["cart"] });

        const previousCart = queryClient.getQueryData<UniqueCartItemProps[]>([
          "cart",
        ]);

        queryClient.setQueryData<UniqueCartItemProps[]>(
          ["cart"],
          (old: any) => {
            if (!old) return [newCartItem as UniqueCartItemProps];

            // Check if item with same name/size/price exists
            const existingItemIndex = old.findIndex(
              (item: any) =>
                item.name === newCartItem.name &&
                item.size === newCartItem.size &&
                item.price === newCartItem.price
            );

            if (existingItemIndex > -1) {
              const updatedCart = [...old];
              updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                count: (updatedCart[existingItemIndex].count || 1) + 1,
              };
              return updatedCart;
            } else {
              return [...old, { ...newCartItem, count: 1 }];
            }
          }
        );

        setSizeError(null);
        setIsSheetOpen(true);

        return { previousCart };
      },

      onError: (err, variables, context) => {
        console.error("Error adding to cart, rolling back:", err);
        if (context?.previousCart) {
          queryClient.setQueryData(["cart"], context.previousCart);

          setIsSheetOpen(false);
          alert("Failed to add item to cart. Please try again.");
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });

  if (isLoading) return <ClothNameSkeleton />;
  if (error) return <p className="text-red-500">Error Loading Cloth</p>;
  if (!data) return <p>No cloth data found.</p>;

  const { id, name, price, front_image, color } = data;
  async function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!chosenSize) {
      setSizeError("Please select a size before adding to cart.");
      return;
    }

    const newCartItem: CartItemProps = {
      front_image: front_image,
      name: name,
      price: price,
      size: chosenSize,
      cloth_id: id,
      color: color,
    };
    setSelectedIndex(null);
    setChosenSize(null);

    await addToCartMutation(newCartItem);
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-1 lg:gap-12">
          <section className=" w-full lg:col-span-2 ">
            <ProductImageDisplay data={data} />
          </section>

          <ProductInfo
            data={data}
            chosenSize={chosenSize}
            sizeError={sizeError}
            sizeOptions={sizeOptions}
            selectedIndex={selectedIndex}
            isAddingToCart={isAddingToCart}
            handleSelectSize={handleSelectSize}
            handleAddToCart={handleAddToCart}
          />
        </div>
        <>
          <StyledWithCard />
        </>
      </div>
    </div>
  );
}
