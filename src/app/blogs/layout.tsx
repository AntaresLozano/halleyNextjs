import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Audiovisual Blog | Halley Cinema", template: "%s | Halley Cinema" },
  description: "Essays and practical guides from Halley Cinema on filmmaking, editing, lighting and video essays, plus companion pieces to our films.",
  alternates: { canonical: "/blogs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
