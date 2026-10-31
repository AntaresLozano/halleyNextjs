import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Halley Cinema about your next video project, from a single talking head to a full production with a crew built around it.",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
