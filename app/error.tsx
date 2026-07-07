"use client";

import {useEffect} from "react";
import Link from "next/link";

export default function Error({
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
        <div
            className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 text-center">
            <p className="text-7xl font-bold text-foreground">错误</p>
            <h1 className="mt-4 text-2xl font-semibold text-foreground">页面出错了</h1>
            <p className="mt-2 text-muted-foreground">抱歉,页面加载时发生了错误。</p>
            <div className="mt-6 flex gap-3">
                <button
                    onClick={() => unstable_retry()}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    重试
                </button>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                    返回首页
                </Link>
            </div>
        </div>
    );
}
