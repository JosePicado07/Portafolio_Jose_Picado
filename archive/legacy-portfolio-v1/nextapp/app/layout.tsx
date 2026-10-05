import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Barlow } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "José Picado — Workday Consultant & Data Engineer",
  description:
    "Workday Consultant and Data Engineer specializing in ETL pipelines, data migration, and scalable data architecture. Costa Rica, remote.",
  keywords: ["Workday", "Data Engineer", "ETL", "Apache Spark", "Databricks", "Data Conversion"],
  authors: [{ name: "José Andrés Picado Corrales" }],
  openGraph: {
    title: "José Picado — Workday Consultant & Data Engineer",
    description: "ETL pipelines · Workday migration · Scalable data architecture",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${syne.variable} ${jetBrainsMono.variable} ${barlow.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-base text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
