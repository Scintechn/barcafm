import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7cc42a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.barcafm.pt"),
  title: {
    default: "Barca FM 99.6 — A rádio com mais emoção",
    template: "%s · Barca FM 99.6",
  },
  description:
    "Rádio local de Ponte da Barca a transmitir para o Minho e Douro Litoral em 99.6 FM.",
  icons: { icon: "/icon.svg" },
};

// Inline anti-FOUC script: reads localStorage `theme` + system preference and
// applies the `.dark` class to <html> BEFORE the first paint. Must remain
// inline (no external src) and synchronous.
const themeInitScript = `
(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t!=='light'&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
