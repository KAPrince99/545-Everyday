"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCartData, UniqueCartItemProps } from "../actions/cartActions";
import CheckOutForm from "@/components/checkout/checkOutForm";
import OrderSummary from "@/components/checkout/orderSummary";

export default function CheckOutPage() {
  const { data: checkOutItems } = useQuery<UniqueCartItemProps[]>({
    queryKey: ["cart"],
    queryFn: getCartData,
    staleTime: 0,
  });
  return (
    <div className="min-h-screen bg-white mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CHECKOUT FORM */}
          <section className="lg:col-span-1">
            <div className="bg-white ">
              <CheckOutForm />
            </div>
          </section>
          {/* ORDER SUMMARY */}
          <section>
            <div className="bg-white">
              <OrderSummary cart={checkOutItems} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
