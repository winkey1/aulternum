import type { Metadata } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/ui/SoundManager";
import HudNavigation from "@/components/layout/HudNavigation";
import EasterEgg from "@/components/ui/EasterEgg";
import GameCursor from "@/components/ui/GameCursor";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: 'swap',
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AULTERNUM | Taman Bermain Digital",
  description: "Rumah pengembangan perangkat lunak generasi terbaru yang berspesialisasi dalam pengalaman web dan seluler interaktif.",
};

export const viewport = {
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="font-sans antialiased bg-void-black text-white overflow-x-hidden selection:bg-electric-blue selection:text-black">
        <SoundProvider>
          <GameCursor />
          <HudNavigation />
          <EasterEgg />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
