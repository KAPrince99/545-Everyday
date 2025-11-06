import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import QueryProvider from "@/providers/queryProvider";
import { CartProvider } from "../contexts/CartContext";
import ScrollToTop from "@/components/ui/scrollToTop";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "545 ",
    template: "545 | %s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={roboto.className}>
        <body className={`antialiased bg-white scroll-smooth`}>
          <CartProvider>
            <QueryProvider>
              <Header />

              <main className="w-full">
                <ScrollToTop />
                {children}
              </main>
            </QueryProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
