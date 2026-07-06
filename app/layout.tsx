import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "我的博客",
  description: "个人博客网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>


          {/*<nav>*/}
          {/*  <ul>*/}
          {/*    <li><a href="/">主页</a></li>*/}
          {/*    <li><a href="/blog">博客</a></li>*/}
          {/*    <li><a href="/links">友链</a></li>*/}
          {/*  </ul>*/}
          {/*</nav>*/}


        </header>
        <main className="flex-1">{children}</main>
        <footer>
          <p>页脚内容</p>
        </footer>
      </body>
    </html>
  );
}
