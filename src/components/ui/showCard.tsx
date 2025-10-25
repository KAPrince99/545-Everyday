import { ClothDataProps } from "@/contexts/CartContext";
import Link from "next/link";
import React from "react";
import ClothCard from "./clothCard";

interface ShowCardProps {
  title: string;
  data: ClothDataProps[];
}

export default function ShowCard({ title, data }: ShowCardProps) {
  return (
    <main className="container mx-auto px-4 py-8 ">
      <div className="text-md md:text-lg font-bold mb-2 text-left ml-4">
        {title}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {data.map((item) => (
          <Link key={item.id} href={`/${item.name}`}>
            <ClothCard data={item} />
          </Link>
        ))}
      </div>
    </main>
  );
}
