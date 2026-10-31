import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Pre-production, production and post-production by Alejandro Torné: research and scripting, talking heads, multi-camera and event coverage, editing, color grading, sound, visual effects and animation.",
  alternates: { canonical: "/services" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
