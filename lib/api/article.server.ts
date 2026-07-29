import {getApiUrlServer} from "@/lib/env";
import type {Article, ArticleListParams, ArticlePageResponse} from "@/lib/types";

const PUBLIC_ARTICLE_BASE_PATH = "/api/public/article";

async function fetchArticleList(
    apiPath: string,
    params: ArticleListParams
): Promise<ArticlePageResponse["data"] | null> {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}${apiPath}`;
        const requestBody = {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
            keyword: params.keyword || undefined,
            categoryId: params.categoryId || undefined,
        };

        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const result: ArticlePageResponse = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
}

export const getAdminArticleListServer = async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
    return fetchArticleList("/admin/list", params);
};

// export const getPublicArticleListServer = async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
//     return fetchArticleList("/list", params);
// };

export const getUserArticleListServer = async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
    return fetchArticleList("/user/list", params);
};

export const getArticleDetailServer = async (id: number): Promise<Article | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/${id}`;

        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const result = await response.json() as { success: boolean; data: Article | null };

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
};