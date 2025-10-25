import Image from "next/image";
import { Manrope } from "next/font/google";
import React from "react";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { roboto } from "@/app/layout";

const manrope = Manrope({
  subsets: ["latin"],
});

export default function Banner() {
  const words = [
    {
      text: "Experience",
    },
    {
      text: "The",
    },
    {
      text: "Journey",
    },
    {
      text: "King",
      className: "text-white",
    },
  ];
  return (
    // We use relative positioning on the container so the child 'fill' image works
    // min-h-screen ensures it always takes at least the full height of the viewport
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0">
        <Image
          src="/545/545_banner.webp" // Replace with your image path
          alt="Person next to a classic car with luggage"
          fill // fill is the modern equivalent of layout="fill"
          // objectFit and objectPosition are now applied directly via Tailwind classes or standard CSS props
          className="object-cover object-center"
          priority
          // Optimized 'sizes' attribute for responsive image loading:
          // On mobile, image takes 100% of the viewport width (100vw)
          // On medium screens (md: breakpoint), still 100vw
          // On larger screens (lg: breakpoint), still 100vw, as it spans the full width of the page
          sizes="100vw"
        />
      </div>

      {/* 
        Optional: You can add overlay content here (text, buttons, navigation)
        Example: 
      */}
      <div className="absolute  top-50 inset-0 flex items-center  justify-center p-4 ">
        <TypewriterEffectSmooth className={roboto.className} words={words} />
      </div>
    </div>
  );
}
