"use client";

import { getApiUrl } from "@/lib/env";
import type { Article, ArticlePageResponse, ArticleListParams } from "./article.server";

const PUBLIC_ARTICLE_BASE_PATH = "/api/public/article";

export const articleApi = {
    getPublicArticleList: async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
        try {
            const apiUrl = getApiUrl();
            if (!apiUrl) {
                return null;
            }

            const response = await fetch(`${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/list`, {
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
            });

            const result: ArticlePageResponse = await response.json();

            if (result.success && result.data) {
                return result.data;
            }

            return null;
        } catch {
            return null;
        }
    },

    getArticleList: async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
        try {
            const apiUrl = getApiUrl();
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
            });

            const result: ArticlePageResponse = await response.json();

            if (result.success && result.data) {
                return result.data;
            }

            return null;
        } catch {
            return null;
        }
    },

    getUserArticleList: async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
        try {
            const apiUrl = getApiUrl();
            if (!apiUrl) {
                return null;
            }

            const response = await fetch(`${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/user/list`, {
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
            });

            const result: ArticlePageResponse = await response.json();

            if (result.success && result.data) {
                return result.data;
            }

            return null;
        } catch {
            return null;
        }
    },

    getArticleDetail: async (id: number): Promise<Article | null> => {
        try {
            const apiUrl = getApiUrl();
            if (!apiUrl) {
                return null;
            }

            const response = await fetch(`${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result: { data: Article; success: boolean; errorMsg: string | null; code: number } = await response.json();

            if (result.success && result.data) {
                return result.data;
            }

            return null;
        } catch {
            return null;
        }
    },
};