import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";


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
            <title>JIULIUBLOG</title>
        </head>
        <body className="min-h-screen flex flex-col">
        <Header/>
        <main className="w-full flex-1">
            {children}
        </main>

        <Footer/>
        </body>
        </html>
    );
}
