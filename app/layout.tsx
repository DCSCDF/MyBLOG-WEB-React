"use client";
import "./globals.css";
import React from "react";
import Header from "@/components/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="zh-CN">
            <body className="min-h-full">
          <Header />
          <main className="w-full">
                        {children}
                    </main>

            </body>
        </html>
    );
}
