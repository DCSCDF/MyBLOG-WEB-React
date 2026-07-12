"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
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
import {AdminInfoCard} from "@/components/AdminInfoCard";
import {getCategoryListServer, Category} from "@/lib/api/category.server";
import {getAdminArticleListServer, Article} from "@/lib/api/article.server";
import {CategorySkeleton, ArticleListSkeleton} from "@/components/ArticleSkeleton";

export default function Blog() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsCategoriesLoading(true);
            const list = await getCategoryListServer();
            setCategories(list);
            setIsCategoriesLoading(false);
        };
        fetchCategories().then();
    }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            const result = await getAdminArticleListServer({
                currentPage,
                pageSize: 6,
                categoryId: selectedCategoryId || undefined,
            });
            if (result) {
                setArticles(result.records);
                setTotalPages(result.pages);
            } else {
                setArticles([]);
                setTotalPages(0);
            }
            setIsLoading(false);
        };
        fetchArticles().then();
    }, [currentPage, selectedCategoryId]);

    const handleCategoryClick = (categoryId: number | null) => {
        setSelectedCategoryId(categoryId);
        setCurrentPage(1);
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

    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="relative z-10">
                <div className="flex flex-col items-center">
                    <div className="my-24 w-full max-w-none sm:max-w-4xl">
                        <AdminInfoCard/>
                        <div>
                            <div className="mt-10">
                                <Card className="overflow-hidden mx-4 gap-y-0 ring-0">
                                    <CardHeader className="flex-row items-baseline justify-between pb-2">
                                        <div>
                                            <CardTitle className="text-sm">博客</CardTitle>
                                            <CardDescription
                                                className="mt-0.5 text-xs">我的开发/生活分享</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className="flex items-center gap-1 py-4 -mx-6 px-6 overflow-x-auto scrollbar-hide">
                                            {isCategoriesLoading ? (
                                                <CategorySkeleton />
                                            ) : (
                                                <>
                                                    <Button size="sm"
                                                            variant={selectedCategoryId === null ? "default" : "ghost"}
                                                            className={`h-7 gap-1.5 text-xs shrink-0 ${selectedCategoryId === null ? "" : "text-muted-foreground hover:text-foreground"}`}
                                                            onClick={() => handleCategoryClick(null)}>
                                                        All
                                                    </Button>
                                                    {categories.map((category) => (
                                                        <Button key={category.id}
                                                                variant={selectedCategoryId === category.id ? "default" : "ghost"}
                                                                size="sm"
                                                                className={`h-7 gap-1.5 text-xs shrink-0 ${selectedCategoryId === category.id ? "" : "text-muted-foreground hover:text-foreground"}`}
                                                                title={category.description}
                                                                onClick={() => handleCategoryClick(category.id)}>
                                                            {category.name}
                                                        </Button>
                                                    ))}
                                                </>
                                            )}
                                        </div>

                                    </CardContent>
                                    <CardContent className="py-4 group gap-y-8 flex flex-col">
                                        {isLoading ? (
                                            <ArticleListSkeleton />
                                        ) : articles.length === 0 ? (
                                            <div className="text-center py-12 text-muted-foreground text-sm">
                                                暂无文章
                                            </div>
                                        ) : (
                                            <div className="flex flex-col divide-y divide-border">
                                                {articles.map((article) => (
                                                    <Link key={article.id} href={`/article/${article.id}`}
                                                          className="block group py-6 first:pt-0">
                                                        <div className="flex items-center gap-2">
                                                            {article.isTop && (
                                                                <Badge variant="outline"
                                                                       className="h-5 rounded-full border-red-500/30 text-[10px] text-red-600 dark:text-red-400 shrink-0">置顶</Badge>
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
                                                                <span key={tag}
                                                                      className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                                                {tag}
                                                            </span>
                                                            ))}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                    </CardContent>
                                    {!isLoading && totalPages > 1 && (
                                        <CardFooter
                                            className="items-center justify-center py-6 bg-transparent border-0">
                                            <Pagination>
                                                <PaginationContent>
                                                    <PaginationItem>
                                                        <PaginationPrevious href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                                                        }}/>
                                                    </PaginationItem>
                                                    {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                                        <PaginationItem key={page}
                                                                        className={page === currentPage ? "" : "hidden sm:inline-flex"}>
                                                            <PaginationLink href="#" isActive={page === currentPage}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setCurrentPage(page);
                                                                            }}>
                                                                {page}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    ))}
                                                    <PaginationItem>
                                                        <PaginationNext href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                                        }}/>
                                                    </PaginationItem>
                                                </PaginationContent>
                                            </Pagination>
                                        </CardFooter>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}