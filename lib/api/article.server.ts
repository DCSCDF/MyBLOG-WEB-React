import { getApiUrlServer } from "@/lib/env";

const PUBLIC_ARTICLE_BASE_PATH = "/api/public/article";

export interface Article {
    id: number;
    categoryId: number;
    categoryName: string;
    title: string;
    summary: string;
    coverImage: string;
    tags: string;
    commentCount: number;
    isTop: boolean;
    authorNickname: string;
    createTime: string;
}

export interface ArticlePageResponse {
    data: {
        records: Article[];
        total: number;
        size: number;
        current: number;
        pages: number;
    };
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export interface ArticleListParams {
    currentPage: number;
    pageSize: number;
    keyword?: string;
    categoryId?: number;
}

export const getAdminArticleListServer = async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const response = await fetch(`${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/admin/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentPage: params.currentPage,
                pageSize: params.pageSize,
                keyword: params.keyword || undefined,
                categoryId: params.categoryId || undefined,
            }),
            cache: "no-store",
        });

        const result: ArticlePageResponse = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
};

export const getArticleDetailServer = async (id: number): Promise<Article | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const response = await fetch(`${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const result: { data: Article; success: boolean; errorMsg: string | null; code: number } = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
};