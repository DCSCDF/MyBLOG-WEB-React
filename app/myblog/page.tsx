import { AdminInfoCard } from "@/components/AdminInfoCard";
import { BlogClient } from "@/components/BlogClient";
import { getCategoryListServer } from "@/lib/api/category.server";
import { getAdminArticleListServer } from "@/lib/api/article.server";

interface PageProps {
    searchParams: {
        categoryId?: string;
        page?: string;
    };
}

export default async function Blog({ searchParams }: PageProps) {
    const categoryIdParam = searchParams.categoryId;
    const pageParam = searchParams.page;

    const selectedCategoryId = categoryIdParam !== undefined && categoryIdParam !== "null"
        ? parseInt(categoryIdParam, 10)
        : null;

    const currentPage = pageParam !== undefined ? Math.max(1, parseInt(pageParam, 10)) : 1;

    const [categories, articleResult] = await Promise.all([
        getCategoryListServer(),
        getAdminArticleListServer({
            currentPage,
            pageSize: 6,
            categoryId: selectedCategoryId ?? undefined,
        }),
    ]);

    const articles = articleResult?.records || [];
    const totalPages = articleResult?.pages || 0;

    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="relative z-10">
                <div className="flex flex-col items-center">
                    <div className="my-24 w-full max-w-none sm:max-w-4xl">
                        <AdminInfoCard />
                        <div>
                            <div className="mt-10">
                                <BlogClient
                                    initialCategories={categories}
                                    initialArticles={articles}
                                    initialTotalPages={totalPages}
                                    initialCurrentPage={currentPage}
                                    initialSelectedCategoryId={selectedCategoryId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}