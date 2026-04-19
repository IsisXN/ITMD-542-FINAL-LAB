import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Isis Portfolio Showcase",
  description: "Portfolio and organization showcase built with Next.js and Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#05070d] text-white antialiased">
        <Navbar />
        <main className="min-h-screen pt-24">{children}</main>
      </body>
    </html>
  );
}