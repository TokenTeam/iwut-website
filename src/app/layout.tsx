import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://iwut.tokenteam.net";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "掌上吾理",
  title: {
    default: "掌上吾理 - 一键开启愉快的武汉理工大学校园生活！",
    template: "%s | 掌上吾理",
  },
  description:
    "掌上吾理是 Token 团队为武汉理工大学学生开发的校园生活应用，提供 iOS、Android 下载与反馈入口。",
  keywords: [
    "掌上吾理",
    "吾理经纬",
    "武汉理工大学",
    "掌上吾理 Pro",
    "掌理",
    "武汉理工",
    "武理",
    "武汉理工大学课表",
    "武汉理工大学校园应用",
    "武汉理工大学 app",
  ],
  authors: [{ name: "TokenTeam", url: "https://github.com/TokenTeam" }],
  creator: "TokenTeam",
  publisher: "TokenTeam",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "掌上吾理 - 一键开启愉快的武汉理工大学校园生活！",
    description:
      "掌上吾理是 Token 团队为武汉理工大学学生开发的校园生活应用，提供 iOS、Android 下载与反馈入口。",
    url: siteUrl,
    siteName: "掌上吾理",
    locale: "zh_CN",
    type: "website",
  },
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
    <html lang="zh-CN">
      <body
        className={`${manrope.variable} bg-paper text-zinc-800 antialiased transition-colors dark:bg-paper-dark dark:text-zinc-300`}
      >
        {children}
      </body>
    </html>
  );
}
