"use client";

import {useEffect} from "react";
import "./globals.css";

export default function GlobalError({
                                        error,
                                        unstable_retry,
                                    }: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <head>
            <title>错误</title>
        </head>
        <body>
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                textAlign: "center",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
            }}
        >
            <p style={{fontSize: "3rem", fontWeight: 700, margin: 0}}>错误</p>
            <h1 style={{marginTop: "1rem", fontSize: "1.5rem", fontWeight: 600, margin: 0}}>
                应用发生严重错误
            </h1>
            <p style={{marginTop: "0.5rem", opacity: 0.7, margin: 0}}>
                抱歉,页面加载时发生了错误。
            </p>
            <button
                onClick={() => unstable_retry()}
                style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                }}
            >
                重试
            </button>
        </div>
        </body>
        </html>
    );
}
