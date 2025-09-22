import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "看護師用計算ツール",
  description: "看護師がよく使う計算ツールまとめ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
          <head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/icons/icon-192.png" />
            <meta name="theme-color" content="#f87171" />
            </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-neutral-50 text-gray-900 
          dark:bg-gray-900 dark:text-gray-100
        `}
      >
        {children}
      </body>
    </html>
  );
}
