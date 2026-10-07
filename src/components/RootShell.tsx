import { Geist } from "next/font/google";
import MotionObserver from "./MotionObserver";
import type { Lang } from "@/content/en";

const geist = Geist({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-geist",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

const HEAD_SCRIPT = `try{var d=document.documentElement,m=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!m)d.classList.add('motion-ok');if(!m&&!matchMedia('(pointer: coarse)').matches&&(navigator.hardwareConcurrency||8)>4&&(navigator.deviceMemory||8)>4&&!(navigator.connection&&navigator.connection.saveData)){try{var c=document.createElement('canvas');if(c.getContext('webgl2')||c.getContext('webgl'))d.classList.add('webgl-ok')}catch(e){}}}catch(e){}`;

export default function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang}>
      {/* eslint-disable-next-line @next/next/no-head-element -- raw head script must run before first paint; next/head would defer it */}
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
