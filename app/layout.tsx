import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ayuxuexi.com"),
  title: {
    default: "阿语百宝箱学习资料",
    template: "%s｜阿语百宝箱",
  },
  description: "阿语百宝箱公开学习指南、阿语专四备考说明与常见问题。",
  icons: {
    icon: "/seo-assets/logo.png",
    apple: "/seo-assets/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "阿语百宝箱",
    images: [{ url: "/seo-assets/og.png", width: 1536, height: 1024, alt: "阿语百宝箱" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/seo-assets/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
