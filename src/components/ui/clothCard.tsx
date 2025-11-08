import { ClothDataProps } from "@/types/types";
import Image from "next/image";
import React from "react";

interface ClothCardProps {
  data: ClothDataProps;
}

export default function ClothCard({ data }: ClothCardProps) {
  return (
    <div className="flex  justify-center ">
      <button
        type="button"
        className="group flex w-full cursor-pointer flex-col items-stretch rounded-xl bg-white 
                 transition-all duration-300 ease-in-out lg:hover:shadow-sm lg:hover:-translate-y-2 "
        aria-label={`View product ${data.name}`}
      >
        <div className="">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={data.front_image}
              alt={data.name}
              fill
              className="rounded-lg object-cover"
              style={{ boxShadow: "white" }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center flex-shrink-0 items-start p-4 bg-white group-hover:bg-white transition-colors duration-300 ">
          <div className="text-[12px] font-semibold truncate text-gray-800 group-hover:underline">
            {data.name
              .replace(/-/g, " ")
              .slice(0, data.name.replace(/-/g, " ").lastIndexOf(" "))}
          </div>
          <div className="text-[12px] sm:text-sm text-gray-400 font-mono">
            {data.color}
          </div>
          <div className="text-[12px] sm:text-sm font-medium text-gray-600">
            ${data.price}
          </div>
        </div>
      </button>
    </div>
  );
}
