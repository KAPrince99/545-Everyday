import React from "react";
import { Card, CardContent } from "./card";
import { CartSheet } from "./cartSheet";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { AccordionInfo } from "./accordionInfo";
import { ClothDataProps } from "@/app/[clothName]/page";
import { BorderBeam } from "./border-beam";

interface ProductInfoProps {
  data: ClothDataProps;
  sizeOptions: string[];
  sizeError?: string | null;
  chosenSize?: string | null;
  isAddingToCart: boolean;
  selectedIndex?: number | null;
  handleSelectSize: (selectedSize: string, i: number) => void;
  handleAddToCart: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ProductInfo({
  data,
  sizeOptions,
  sizeError,
  chosenSize,
  isAddingToCart,
  selectedIndex,
  handleSelectSize,
  handleAddToCart,
}: ProductInfoProps) {
  const { name, price } = data;
  return (
    <Card className="relative w-full overflow-hidden overflow-y-auto  h-[550px] lg:h-[900px] lg:mt-7 ">
      <CardContent className="space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold md:text-lg">
            {name
              .replace(/-/g, " ")
              .slice(0, name.replace(/-/g, " ").lastIndexOf(" "))}
          </h1>
          <p className="font-lg text-sm">${price}</p>
        </div>

        {/* Size Section */}
        <div className="flex justify-between items-center mt-4">
          <span>Size</span>
          <span className="underline cursor-pointer">Size Chart</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          {sizeOptions.map((size, index) => (
            <button
              key={index}
              onClick={() => handleSelectSize(size, index)}
              className={`text-xs border px-3 py-1 rounded   cursor-pointer ${
                selectedIndex === index
                  ? "bg-[#063573] text-white animate-transition-all duration-75"
                  : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <CartSheet
          data={data}
          chosenSize={chosenSize}
          sizeError={sizeError}
          action={
            <Button
              onClick={handleAddToCart}
              variant="default"
              className="mt-4 w-full cursor-pointer py-4 text-sm sm:py-6 sm:text-md"
            >
              {isAddingToCart ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Add to Bag"
              )}
            </Button>
          }
        />
        <AccordionInfo />
      </CardContent>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}
