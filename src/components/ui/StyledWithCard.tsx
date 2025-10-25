"use client";
import { ClothDataProps } from "@/contexts/CartContext";
import React from "react";
import ShowCard from "./showCard";
import { getClothData } from "@/app/actions/cartActions";
import { useQuery } from "@tanstack/react-query";

function shuffleArray(array: ClothDataProps[] | undefined): ClothDataProps[] {
  if (!array) {
    return [];
  }

  const shuffledArray: ClothDataProps[] = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export default function StyledWithCard() {
  const { data } = useQuery({
    queryKey: ["clothes"],
    queryFn: getClothData,
    staleTime: 30000,
  });

  const alternatives = shuffleArray(data).slice(0, 4);

  return <ShowCard title="STYLED WITH" data={alternatives} />;
}
