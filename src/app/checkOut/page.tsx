import { Metadata } from "next";
import CheckOut from "./checkOut";

export const metadata: Metadata = {
  title: " Checkout",
};

export default function Page() {
  return <CheckOut />;
}
