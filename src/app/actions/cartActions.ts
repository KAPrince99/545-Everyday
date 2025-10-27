"use server";

import { CartItemProps } from "@/components/ui/cartSheet";
import { ClothDataProps } from "@/contexts/CartContext";
import { createClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export interface CartDataProps {
  front_image: string;
  name: string;
  price: string;
  size: string | null;
  cloth_id: string;
  color: string;
}

export interface UniqueCartItemProps extends CartItemProps {
  id: string;
  count: number;
}

export async function getClothData(): Promise<ClothDataProps[] | undefined> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("clothes").select("*");
    if (error) throw new Error(error.message);

    return data as ClothDataProps[] | undefined;
  } catch (error) {
    console.error("Error fetching Cloth Data:", error);
  }
}

export async function setCartData(cartData: CartDataProps) {
  const supabase = await createClient();
  try {
    const { error: insertError } = await supabase
      .from("cart")
      .insert(cartData)
      .select();
    if (insertError) throw new Error(insertError.message);
    revalidatePath(`/${cartData.name}`);

    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

export async function getCartData() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("cart").select("*");
    if (error) throw new Error(error.message);
    if (!data) return [];
    const aggregatedCartItems: Record<string, UniqueCartItemProps> = {};
    data.forEach((item) => {
      const key = `${item.name}-${item.size}-${item.price}`;
      if (aggregatedCartItems[key]) {
        aggregatedCartItems[key].count += 1;
      } else {
        aggregatedCartItems[key] = { ...item, count: 1 };
      }
    });

    return Object.values(aggregatedCartItems);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
}

export interface DeleteCartItemParams {
  name: string;
  price: string;
  size: string | null;
  color: string;
}

export async function deleteCartItem(params: DeleteCartItemParams) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("name", params.name)
      .eq("price", params.price)
      .eq("size", params.size)
      .eq("color", params.color);
    if (error) throw new Error(error.message);

    return { success: true };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
}

export interface itemToDeleteProps {
  name: string;
  size: string;
  cloth_id: string;
}

export async function deleteSingleCartItem(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("cart").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    return;
  }
  return { sucess: true };
}
