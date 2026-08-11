"use client";

import {Link as TransitionLink, useTransitionRouter} from "next-view-transitions";
import {useSearchParams} from "next/navigation";
import {motion} from "motion/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import type {Category, Article} from "@/lib/types";


interface BlogClientProps {
    initialCategories: Category[];
    initialArticles: Article[];
    initialTotalPages: number;
    initialCurrentPage: number;
    initialSelectedCategoryId: number | null;
}

export function BlogClient({
                               initialCategories,
                               initialArticles,
                               initialTotalPages,
                               initialCurrentPage,
                               initialSelectedCategoryId
                           }: BlogClientProps) {
    const router = useTransitionRouter();
    const searchParams = useSearchParams();

    const articles = initialArticles;
    const totalPages = initialTotalPages;
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

    const updateUrlParams = (newPage: number, newCategoryId: number | null) => {
        const params = new URLSearchParams();
        if (newCategoryId !== null) {
            params.set("categoryId", newCategoryId.toString());
        }
        if (newPage > 1) {
            params.set("page", newPage.toString());
        }
        router.push(`/myblog?${params.toString()}`, {scroll: false});
    };

    const handleCategoryClick = (categoryId: number | null) => {
        updateUrlParams(1, categoryId);
    };

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        updateUrlParams(page, selectedCategoryId);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const splitTags = (tags: string) => {
        if (!tags) return [];
        return [...new Set(tags.split(",").filter((tag) => tag.trim()))];
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

    const renderArticleList = () => {
        if (articles.length === 0) {
            return (
                <div className="text-center py-12 text-muted-foreground text-sm">
                    暂无文章
                </div>
            );
        }

        const listVariants = {
            hidden: {},
            visible: {
                transition: {staggerChildren: 0.06} as never
            }
        };

        const itemVariants = {
            hidden: {opacity: 0, y: 8},
            visible: {
                opacity: 1,
                y: 0,
                transition: {duration: 0.4, ease: "easeOut" as const}
            }
        };

        return (
            <motion.div
                key={`${currentPage}-${selectedCategoryId ?? "all"}`}
                className="flex flex-col"
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                {articles.map((article) => (
                    <motion.div key={article.id} variants={itemVariants}>
                        <TransitionLink href={`/article/${article.id}`}
                              className="block group py-6 hover:bg-muted/50 px-4">
                            <div className="flex items-center uppercase gap-2">
                                {article.isTop && (
                                    <span
                                        className=" border-none text-[10px] text-red-600 dark:text-red-400 shrink-0">置顶</span>
                                )}
                                <span
                                    className="text-[10px] text-muted-foreground shrink-0">{article.categoryName || "未分类"}</span>
                                <span
                                    className="text-[10px] text-muted-foreground shrink-0">{formatDate(article.createTime)}</span>
                            </div>
                            <h3 className="mt-3 text-base font-medium leading-snug tracking-tight group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                {article.summary}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {splitTags(article.tags).map((tag) => (
                                    <Badge key={tag} variant="secondary"
                                           className="rounded px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </TransitionLink>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    return (
        <Card className="overflow-hidden md:mx-4 mx-0 gap-y-0 ring-0">
            <CardHeader className="flex-row items-baseline justify-between pb-2">
                <div>
                    <CardTitle className="text-sm">博客</CardTitle>
                    <CardDescription className="mt-0.5 text-xs">我的开发/生活分享</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-1 py-4 -mx-6 px-6 overflow-x-auto scrollbar-hide">
                    <Button
                        size="sm"
                        variant={selectedCategoryId === null ? "default" : "ghost"}
                        className={`h-7 gap-1.5 text-xs shrink-0 ${selectedCategoryId === null ? "" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={() => handleCategoryClick(null)}
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategoryId === category.id ? "default" : "ghost"}
                            size="sm"
                            className={`h-7 uppercase gap-1.5 text-xs shrink-0 ${selectedCategoryId === category.id ? "" : "text-muted-foreground  hover:text-foreground"}`}
                            title={category.description}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </CardContent>
            <CardContent className="py-4 px-0 group gap-y-8 flex flex-col">
                {renderArticleList()}
            </CardContent>
            {totalPages > 1 && (
                <CardFooter className="items-center justify-center py-6 bg-transparent border-0">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={`/myblog?${getPageUrl(Math.max(1, currentPage - 1))}`}
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
                                        href={`/myblog?${getPageUrl(page)}`}
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
                                    href={`/myblog?${getPageUrl(Math.min(totalPages, currentPage + 1))}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            )}
        </Card>
    );
}
