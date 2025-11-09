"use client";

import CheckOutForm from "@/components/checkout/checkOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurrency from "../../../utils/convertToSubCurrency";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined)
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckOut({ cartTotal }: { cartTotal: number }) {
  return (
    <div className="min-h-screen bg-white mt-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8">
          <section className="lg:col-span-1">
            <div className="bg-white ">
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubCurrency(cartTotal),
                  currency: "usd",
                }}
              >
                <CheckOutForm cartTotal={cartTotal} />
              </Elements>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
