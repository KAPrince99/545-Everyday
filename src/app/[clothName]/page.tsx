"use client";

import { CartItemProps } from "@/components/ui/cartSheet";
import { supabase } from "@/lib/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { setCartData, UniqueCartItemProps } from "../actions/cartActions";
import { useCart } from "@/contexts/CartContext";
import ProductInfo from "@/components/ui/productInfo";
import { ProductImageDisplay } from "@/components/ui/productImageDisplay";
import StyledWithCard from "@/components/ui/StyledWithCard";

// ✅ params should be a Promise (Next.js 15+)
interface ClothNameProps {
  params: Promise<{ clothName: string }>;
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

// ✅ Async data fetcher
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

export default function Page({ params }: ClothNameProps) {
  // ✅ unwrap params (Next.js 15+ requirement)
  const { clothName } = use(params);
  const decodedClothName = decodeURIComponent(clothName);
  const [chosenSize, setChosenSize] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const { setIsSheetOpen } = useCart();
  const queryClient = useQueryClient();

  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  function handleSelectSize(selectedSize: string, i: number) {
    setChosenSize(selectedSize);
    setSelectedIndex(i);
  }

  // ✅ React Query fetch
  const { data, isLoading, error } = useQuery<ClothDataProps>({
    queryKey: ["clothData", decodedClothName],
    queryFn: () => fetchClothData(decodedClothName),
  });

  useEffect(() => {
    if (chosenSize) {
      setSizeError(null);
    }
  }, [chosenSize]);

  const { mutateAsync: addToCartMutation, isPending: isAddingToCart } =
    useMutation({
      mutationFn: setCartData,
      // onMutate receives the new item data *before* the API call
      onMutate: async (newCartItem: CartItemProps) => {
        // 1. Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ["cart"] });

        // 2. Snapshot the previous value
        const previousCart = queryClient.getQueryData<UniqueCartItemProps[]>([
          "cart",
        ]);

        // 3. Optimistically update the cache to the new value
        queryClient.setQueryData<UniqueCartItemProps[]>(["cart"], (old) => {
          if (!old) return [newCartItem as UniqueCartItemProps];

          // Check if item with same name/size/price exists
          const existingItemIndex = old.findIndex(
            (item) =>
              item.name === newCartItem.name &&
              item.size === newCartItem.size &&
              item.price === newCartItem.price
          );

          if (existingItemIndex > -1) {
            // If it exists, increment the count
            const updatedCart = [...old];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              count: (updatedCart[existingItemIndex].count || 1) + 1,
            };
            return updatedCart;
          } else {
            // Otherwise, add the new item with a count of 1
            return [...old, { ...newCartItem, count: 1 }];
          }
        });

        setSizeError(null);
        setIsSheetOpen(true); // Open the cart sheet immediately

        // 4. Return a context object with the snapshot value
        return { previousCart };
      },
      // If the mutation fails, use the context to roll back
      onError: (err, variables, context) => {
        console.error("Error adding to cart, rolling back:", err);
        if (context?.previousCart) {
          queryClient.setQueryData(["cart"], context.previousCart);
          // Optional: Keep the sheet closed on error
          setIsSheetOpen(false);
          alert("Failed to add item to cart. Please try again.");
        }
      },
      // Always refetch after error or success to ensure the client is in sync with the server
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });

  // ✅ Loading / Error states
  if (isLoading) return <Loader2 className="animate-spin" />;
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
          {/* 🖼️ Product Images */}
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
