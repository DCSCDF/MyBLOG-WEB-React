"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {ArrowUpRight} from "lucide-react";
import {CardFooter} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Category} from "@/lib/api/category.server";
import {Article} from "@/lib/api/article.server";
import {articleApi} from "@/lib/api/article";

interface BlogListClientProps {
    initialCategories: Category[];
    initialArticles: Article[];
    initialTotalPages: number;
    initialCurrentPage: number;
    initialSelectedCategoryId: number | null;
}

export function BlogListClient({
                                   initialCategories,
                                   initialArticles,
                                   initialTotalPages,
                                   initialCurrentPage,
                                   initialSelectedCategoryId
                               }: BlogListClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [loading, setLoading] = useState(false);

    const categories = initialCategories;

    const selectedCategoryId = (() => {
        const catId = searchParams.get("categoryId");
        if (catId !== null && catId !== "null") {
            return parseInt(catId, 10);
        }
        return initialSelectedCategoryId;
    })();

    const currentPage = (() => {
        const page = searchParams.get("page");
        if (page !== null) {
            return parseInt(page, 10);
        }
        return initialCurrentPage;
    })();

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const result = await articleApi.getUserArticleList({
                    currentPage,
                    pageSize: 6,
                    categoryId: selectedCategoryId ?? undefined,
                });
                if (result) {
                    setArticles(result.records);
                    setTotalPages(result.pages);
                }
            } catch {
                setArticles([]);
                setTotalPages(0);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles().then();
    }, [currentPage, searchParams, selectedCategoryId]);

    const updateUrlParams = (newPage: number, newCategoryId: number | null) => {
        const params = new URLSearchParams();
        if (newCategoryId !== null) {
            params.set("categoryId", newCategoryId.toString());
        }
        if (newPage > 1) {
            params.set("page", newPage.toString());
        }
        router.push(`/blog/list?${params.toString()}`, {scroll: false});
    };

    const handleCategoryChange = (value: string) => {
        if (value === "all") {
            updateUrlParams(1, null);
        } else {
            const category = categories.find(c => c.name.toLowerCase() === value.toLowerCase());
            updateUrlParams(1, category?.id ?? null);
        }
    };

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        updateUrlParams(page, selectedCategoryId);
    };

    const getPageUrl = (page: number): string => {
        const params = new URLSearchParams();
        if (selectedCategoryId !== null) {
            params.set("categoryId", selectedCategoryId.toString());
        }
        if (page > 1) {
            params.set("page", page.toString());
        }
        return params.toString();
    };

    const splitTags = (tags: string) => {
        if (!tags) return [];
        return [...new Set(tags.split(",").filter((tag) => tag.trim()))];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <div className="flex items-center gap-1 px-6 py-3 flex-wrap">
                <Button
                    size="sm"
                    variant={selectedCategoryId === null ? "default" : "ghost"}
                    className={`h-7 uppercase gap-1.5 text-xs shrink-0 ${selectedCategoryId === null ? "" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => handleCategoryChange("all")}
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategoryId === category.id ? "default" : "ghost"}
                        size="sm"
                        className={`h-7 uppercase gap-1.5 text-xs shrink-0 ${selectedCategoryId === category.id ? "" : "text-muted-foreground hover:text-foreground"}`}
                        title={category.description}
                        onClick={() => handleCategoryChange(category.name.toLowerCase())}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            <div className="grid gap-px bg-transparent md:grid-cols-2">
                {loading ? (
                    Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="group flex flex-col justify-between bg-card p-5">
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-16 bg-muted rounded animate-pulse"/>
                                    <div className="h-4 w-4 bg-muted rounded-full animate-pulse"/>
                                </div>
                                <div className="mt-2 h-5 w-3/4 bg-muted rounded animate-pulse"/>
                                <div className="mt-1.5 h-4 w-full bg-muted rounded animate-pulse"/>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-1 mb-3">
                                    <div className="h-4 w-12 bg-muted rounded-md animate-pulse"/>
                                    <div className="h-4 w-10 bg-muted rounded-md animate-pulse"/>
                                </div>
                                <div className="flex items-center justify-between border-t pt-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 bg-muted rounded-full animate-pulse"/>
                                        <div className="h-3 w-20 bg-muted rounded animate-pulse"/>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-16 bg-muted rounded animate-pulse"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : articles.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
                        暂无文章
                    </div>
                ) : (
                    articles.map((post) => (
                        <article
                            key={post.id}
                            className="group flex flex-col justify-between bg-card p-5 cursor-pointer transition-colors hover:bg-muted/50"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {post.isTop && (
                                            <span
                                                className="border-none text-[10px] text-red-600 dark:text-red-400 shrink-0">置顶</span>
                                        )}
                                        <span
                                            className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                            {post.categoryName || "未分类"}
                                        </span>
                                    </div>
                                    <ArrowUpRight
                                        className="size-3.5 text-muted-foreground/0 transition-all group-hover:text-muted-foreground"/>
                                </div>
                                <h3 className="mt-2 text-sm font-medium leading-snug">
                                    {post.title}
                                </h3>
                                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                    {post.summary}
                                </p>
                            </div>

                            <div className="mt-4">
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {splitTags(post.tags).map((t) => (
                                        <Badge key={t} variant="secondary"
                                            className="rounded px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t pt-3">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-5">
                                            <AvatarFallback className="text-[8px]">
                                                {post.authorNickname?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-[10px] text-muted-foreground">
                                            {post.authorNickname || "未知"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                        <span>{formatDate(post.createTime)}</span>
                                        <span className="size-0.5 rounded-full bg-muted-foreground/40"/>
                                        <span>{post.commentCount} comments</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>

            <CardFooter className="items-center justify-center py-6 bg-transparent border-t-0">
                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={`/blog/list?${getPageUrl(Math.max(1, currentPage - 1))}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) handlePageChange(currentPage - 1);
                                    }}
                                />
                            </PaginationItem>
                            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}
                                                className={page === currentPage ? "" : "hidden sm:inline-flex"}>
                                    <PaginationLink
                                        href={`/blog/list?${getPageUrl(page)}`}
                                        isActive={page === currentPage}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page);
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href={`/blog/list?${getPageUrl(Math.min(totalPages, currentPage + 1))}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </CardFooter>
        </>
    );
}
