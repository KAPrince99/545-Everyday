import { Metadata } from "next";
import CheckOut from "./checkOut";
import { getCartTotal } from "../actions/cartActions";

export const metadata: Metadata = {
  title: " Checkout",
};

export default async function Page() {
  const cartTotal = await getCartTotal();
  console.log("CART TOTAL:", cartTotal);
  return (
    <main>
      <CheckOut cartTotal={cartTotal} />
    </main>
  );
}
