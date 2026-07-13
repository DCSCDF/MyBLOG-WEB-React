// import { ArrowUpRight } from "lucide-react";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {getCategoryListServer} from "@/lib/api/category.server";
import {getUserArticleListServer} from "@/lib/api/article.server";
// import { Category } from "@/lib/api/category.server";
// import { Article } from "@/lib/api/article.server";
import {BlogListClient} from "@/components/BlogListClient";

interface PageProps {
    searchParams: {
        categoryId?: string;
        page?: string;
    };
}

export default async function BlogList({searchParams}: PageProps) {
    const [resolvedSearchParams] = await Promise.all([searchParams]);
    const categoryIdParam = resolvedSearchParams.categoryId;
    const pageParam = resolvedSearchParams.page;

    const selectedCategoryId = categoryIdParam !== undefined && categoryIdParam !== "null"
        ? parseInt(categoryIdParam, 10)
        : null;

    const currentPage = pageParam !== undefined ? Math.max(1, parseInt(pageParam, 10)) : 1;

    const [categories, articleResult] = await Promise.all([
        getCategoryListServer(),
        getUserArticleListServer({
            currentPage,
            pageSize: 6,
            categoryId: selectedCategoryId ?? undefined,
        }),
    ]);

    const articles = articleResult?.records || [];
    const totalPages = articleResult?.pages || 0;

    return (
        <section className="mx-auto w-full max-w-4xl p-4 mt-24">
            <Card className="gap-y-0 ring-0">
                <CardHeader className="flex-row items-baseline justify-between px-6 pb-4">
                    <CardTitle className="text-xl font-semibold tracking-tight">文章</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                        这里可以查看该网站其他用户作者的文章，其他用户发表的文章均与本站站长无关。
                    </p>
                </CardHeader>

                <BlogListClient
                    initialCategories={categories}
                    initialArticles={articles}
                    initialTotalPages={totalPages}
                    initialCurrentPage={currentPage}
                    initialSelectedCategoryId={selectedCategoryId}
                />
            </Card>
        </section>
    );
}
