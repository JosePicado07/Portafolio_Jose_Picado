import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import MotionObserver from "@/components/MotionObserver";
import "./globals.css";

const geist = Geist({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-geist",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "José Picado · Data Engineer & Consultant",
  description: "I build data pipelines, and the systems that prove they're right.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <Script id="motion-ok" strategy="beforeInteractive">
          {`if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok')`}
        </Script>
        <MotionObserver />
        {children}
      </body>
    </html>
  );
}