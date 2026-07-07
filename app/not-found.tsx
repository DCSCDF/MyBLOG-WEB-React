import Link from "next/link";

export default function NotFound() {
    return (
        <div
            className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 text-center">
            <p className="text-7xl font-bold text-foreground">404</p>
            <h1 className="mt-4 text-2xl font-semibold text-foreground">页面未找到</h1>
            <p className="mt-2 text-muted-foreground">您访问的页面不存在或已被移动。</p>
            <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
                返回首页
            </Link>
        </div>
    );
}
