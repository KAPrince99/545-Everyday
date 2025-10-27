import Banner from "@/components/ui/banner";
import Catalog from "@/components/ui/catalog";
import TextLayer from "@/components/ui/textLayer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "545 | Catalog",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <TextLayer />
      <Catalog />
    </div>
  );
}
