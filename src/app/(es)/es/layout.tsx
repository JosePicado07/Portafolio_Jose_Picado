import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import "../../globals.css";

export const metadata: Metadata = {
  title: "José Picado · Ingeniero de datos y consultor",
  description:
    "Construyo pipelines de datos y los sistemas que demuestran que están bien.",
  alternates: {
    canonical: "/es",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
};

export default function EsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="es">{children}</RootShell>;
}
