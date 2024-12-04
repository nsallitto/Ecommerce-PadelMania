import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { prisma } from "@/src/lib/prisma";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Padel Mania",
  description: "Tienda de Padel - Encontra los mejores productos",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
