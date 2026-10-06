import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import "../globals.css";

export const metadata: Metadata = {
  title: "José Picado · Data Engineer & Consultant",
  description:
    "I build data pipelines, and the systems that prove they're right.",
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="en">{children}</RootShell>;
}
