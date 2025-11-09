import { ConfettiButton } from "@/components/ui/confetti";
import React from "react";

export default function page() {
  return (
    <main className="relative flex justify-center items-center mx-auto mt-80">
      <ConfettiButton className="cursor-pointer">Thank You. 🎉</ConfettiButton>
    </main>
  );
}
