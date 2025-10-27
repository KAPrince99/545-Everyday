import React from "react";
import ClothName from "./clothName";
import { Metadata } from "next";

type Params = {
  params: Promise<{ clothName: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { clothName } = await params;
  return {
    title: {
      absolute: `${clothName}`,
    },
  };
}

export default async function Page({ params }: Params) {
  const { clothName } = await params;
  return <ClothName clothName={clothName} />;
}
