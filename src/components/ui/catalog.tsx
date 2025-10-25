import { createClient } from "@/lib/server";
import React from "react";
import ShowCard from "./showCard";

export default async function Catalog() {
  const supabase = await createClient();
  const title = "OUTWEAR";
  const { data: clothes, error: errorClothes } = await supabase
    .from("clothes")
    .select("*");
  if (errorClothes) {
    console.error("Supabase error:", errorClothes.message);
    return <p className="text-center text-red-500">Error loading catalog</p>;
  }

  if (!clothes?.length) {
    return <p className="text-center text-gray-500">No clothes found</p>;
  }
  return (
    <>
      <ShowCard title={title} data={clothes} />
    </>
  );
}
