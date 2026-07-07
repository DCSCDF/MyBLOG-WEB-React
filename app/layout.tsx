import "./globals.css";
import React from "react";
import Header from "@/components/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var cookies = document.cookie.split(';');
                                    var theme = 'light';
                                    for (var i = 0; i < cookies.length; i++) {
                                        var cookie = cookies[i].trim();
                                        var parts = cookie.split('=');
                                        if (parts[0] === 'theme') {
                                            theme = parts[1] === 'dark' ? 'dark' : 'light';
                                            break;
                                        }
                                    }
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="min-h-full">
          <Header />
          <main className="w-full">
              {children}
          </main>




            </body>
        </html>
    );
}
