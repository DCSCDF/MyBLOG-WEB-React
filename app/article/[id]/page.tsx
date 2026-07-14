import ArticleClient from "./ArticleClient";
import {getArticleDetailServer} from "@/lib/api/article.server";
import {getCommentListServer} from "@/lib/api/comment.server";

interface PageProps {
    params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({params}: PageProps) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id || "", 10);

    if (isNaN(id)) {
        return (
            <section className="mt-24 mx-auto w-full max-w-4xl py-4 px-2 md:px-4">
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">文章不存在</p>
                </div>
            </section>
        );
    }

    const [article, comments] = await Promise.all([
        getArticleDetailServer(id),
        getCommentListServer(id),
    ]);

    return <ArticleClient initialArticle={article} initialComments={comments || []}/>;
}