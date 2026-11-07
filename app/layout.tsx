import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Noto_Sans_Myanmar } from "next/font/google";
import { ServiceWorker } from "@/components/ServiceWorker";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jp = Noto_Sans_JP({ variable: "--font-jp", weight: ["400", "500", "700"], preload: false });
const my = Noto_Sans_Myanmar({ variable: "--font-my", weight: ["400", "600"], subsets: ["myanmar"] });

export const metadata: Metadata = {
  title: "Memori メモリ",
  description: "JLPT N5/N4 kanji & vocabulary flashcards with spaced repetition.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Memori", statusBarStyle: "default" },
  icons: { apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1712" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Apply the saved light/dark choice before paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem('memori-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jp.variable} ${my.variable} antialiased`}>
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
