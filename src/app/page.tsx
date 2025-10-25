import Banner from "@/components/ui/banner";
import Catalog from "@/components/ui/catalog";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="px-8 py-6">
        <div className="my-20">
          <div className="text-lg sm:text-xl font-bold mb-2">
            EVERYDAY 25/26
          </div>
          <div className="text-[10px] sm:text-sm text-gray-400">
            The Everyday line embodies the essence of fivefourfive - versatile
            staples designed for daily use. This season, we’re introducing new
            pieces from our Away From Home FW25/26 collection.
          </div>
        </div>
      </div>
      <Catalog />
    </div>
  );
}
