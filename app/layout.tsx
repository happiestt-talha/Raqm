import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mtalha.me"),
  title: "M Talha Manzoor — Software Engineer",
  description:
    "I build fast, scalable web products with clean interfaces and solid architecture. Full-stack engineer based in Lahore, Pakistan.",
  openGraph: {
    title: "M Talha Manzoor — Software Engineer",
    description: "I build fast, scalable web products with clean interfaces and solid architecture.",
    url: "https://mtalha.me",
    siteName: "M Talha Manzoor",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4F1EC"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-paper text-ink font-body antialiased selection:bg-accent selection:text-paper">
        {children}
      </body>
    </html>
  );
}