import type { Metadata } from "next";
import { K2D } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppProvider } from '@/context/AppContext';

const k2dFont = K2D({
  subsets: ["latin"], // Asegúrate de especificar los subsets
  weight: ["400", "700"], // Puedes ajustar los pesos que necesites
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.halleycinema.com"),
  title: {
    default: "Halley Cinema | Alejandro Torné – Expressive Audiovisual Communication",
    template: "%s | Halley Cinema",
  },
  description:
    "Halley Cinema is the studio of filmmaker Alejandro Torné: pre-production, production, editing, color and animation, plus original video essays on psychology, philosophy and the modern mind.",
  openGraph: {
    siteName: "Halley Cinema",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${k2dFont.className} antialiased relative overflow-x-clip`}>
        <AppProvider>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
