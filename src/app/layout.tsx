import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "掌上吾理",
  description: "掌上吾理—— 一键开启愉快的武汉理工大学校园生活！",
  keywords: [
    "掌上吾理",
    "吾理经纬",
    "武汉理工大学",
    "掌上吾理 Pro",
    "掌理",
    "武汉理工",
    "武理",
  ],
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${manrope.variable} bg-paper text-zinc-800 antialiased transition-colors dark:bg-paper-dark dark:text-zinc-300`}
      >
        {children}
      </body>
    </html>
  );
}
