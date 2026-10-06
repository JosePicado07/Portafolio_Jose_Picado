import type { Metadata } from "next";
import { Geist } from "next/font/google";
import MotionObserver from "@/components/MotionObserver";
import "./globals.css";

const HEAD_SCRIPT = `try{var d=document.documentElement,m=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!m)d.classList.add('motion-ok');if(!m&&(navigator.hardwareConcurrency||8)>4&&(navigator.deviceMemory||8)>4&&!(navigator.connection&&navigator.connection.saveData)){try{var c=document.createElement('canvas');if(c.getContext('webgl2')||c.getContext('webgl'))d.classList.add('webgl-ok')}catch(e){}}}catch(e){}`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body className={`${geist.variable} antialiased`}>
        <MotionObserver />
        {children}
      </body>
    </html>
  );
}