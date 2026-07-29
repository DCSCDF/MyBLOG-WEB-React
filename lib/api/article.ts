"use client";

import {getApiUrl} from "@/lib/env";
import type {ArticlePageResponse, ArticleListParams} from "@/lib/types";

const PUBLIC_ARTICLE_BASE_PATH = "/api/public/article";

async function fetchArticleList(
    apiPath: string,
    params: ArticleListParams
): Promise<ArticlePageResponse["data"] | null> {
    try {
        const apiUrl = getApiUrl();
        if (!apiUrl) {
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}${apiPath}`;
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                currentPage: params.currentPage,
                pageSize: params.pageSize,
                keyword: params.keyword || undefined,
                categoryId: params.categoryId || undefined,
            }),
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

export const articleApi = {
    getPublicArticleList: (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
        return fetchArticleList("/list", params);
    },

    getArticleList: (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
        return fetchArticleList("/admin/list", params);
    },

    // getUserArticleList: (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
    //     return fetchArticleList("/user/list", params);
    // },

    // getArticleDetail: async (id: number): Promise<Article | null> => {
    //     try {
    //         const apiUrl = getApiUrl();
    //         if (!apiUrl) {
    //             return null;
    //         }
    //
    //         const response = await fetch(`${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/${id}`, {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //         });
    //
    //         if (!response.ok) {
    //             return null;
    //         }
    //
    //         const result = await response.json() as { success: boolean; data: Article | null };
    //
    //         if (result.success && result.data) {
    //             return result.data;
    //         }
    //
    //         return null;
    //     } catch {
    //         return null;
    //     }
    // },
};