import { Suspense } from "react"
import { getFriendLinkListServer } from "@/lib/api/friend-link.server"
import { getConfigsByKeysServer } from "@/lib/api/config.server"
import LinksClient from "./LinksClient"

interface PageProps {
    searchParams: {
        page?: string;
    };
}

const DEFAULT_LINKS_CONFIG = {
    content: "<p>请提前添加本站，我将会很快处理。</p>",
    codeInfo: "",
};

export default async function Links({ searchParams }: PageProps) {
    const [resolvedSearchParams] = await Promise.all([searchParams]);
    const pageParam = resolvedSearchParams.page;
    const currentPage = pageParam !== undefined ? Math.max(1, parseInt(pageParam, 10)) : 1;

    const [initialFriendLinks, configMap] = await Promise.all([
        getFriendLinkListServer({ currentPage, pageSize: 8 }),
        getConfigsByKeysServer(["links.content", "links.codeInfo"]),
    ]);

    const linksConfig = {
        content: configMap.get("links.content") || DEFAULT_LINKS_CONFIG.content,
        codeInfo: configMap.get("links.codeInfo") || DEFAULT_LINKS_CONFIG.codeInfo,
    };

    return (
        <Suspense fallback={
            <div className="mt-32 px-4 w-full max-w-3xl mx-auto">
                <div className="h-8 bg-muted rounded animate-pulse mb-4" />
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-24 bg-muted rounded animate-pulse" />
                    ))}
                </div>
            </div>
        }>
            <LinksClient
                initialFriendLinks={initialFriendLinks?.records || []}
                totalPages={initialFriendLinks?.pages || 0}
                currentPage={currentPage}
                total={initialFriendLinks?.total || 0}
                linksConfig={linksConfig}
            />
        </Suspense>
    )
}
