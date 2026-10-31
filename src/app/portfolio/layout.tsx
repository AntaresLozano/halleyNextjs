import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Original films from Halley Cinema: video essays and animated shorts on psychology, philosophy and the modern mind, with notes on how each one was made.",
  alternates: { canonical: "/portfolio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
