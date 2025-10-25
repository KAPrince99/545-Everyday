import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ClothDataProps } from "@/app/[clothName]/page";
import Image from "next/image";

export function ProductImageDisplay({ data }: { data: ClothDataProps }) {
  const { front_image, image_p1, image_p2, image_p3, name } = data;
  return (
    <Carousel className="w-full  mx-auto  ">
      <CarouselContent>
        {[front_image, image_p1, image_p2, image_p3].map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className=" shadow-none border-none  ">
                <CardContent className="relative aspect-square  p-0">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
