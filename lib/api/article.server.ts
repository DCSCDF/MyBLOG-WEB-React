import { getApiUrlServer } from "@/lib/env";

const PUBLIC_ARTICLE_BASE_PATH = "/api/public/article";

export interface Article {
    id: number;
    categoryId: number;
    categoryName: string | null;
    title: string;
    summary: string;
    coverImage: string;
    tags: string;
    commentCount: number;
    isTop: boolean;
    authorNickname: string;
    authorAvatar: string | null;
    authorBio: string | null;
    mdContent: string;
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
    const apiName = "getAdminArticleListServer";
    try {
        console.log(`[SSR API] ${apiName} - Start with params:`, JSON.stringify(params));
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/admin/list`;
        const requestBody = {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
            keyword: params.keyword || undefined,
            categoryId: params.categoryId || undefined,
        };
        console.log(`[SSR API] ${apiName} - Request URL: ${fullUrl}`);
        console.log(`[SSR API] ${apiName} - Request Method: POST`);
        console.log(`[SSR API] ${apiName} - Request Headers:`, JSON.stringify({ "Content-Type": "application/json" }));
        console.log(`[SSR API] ${apiName} - Request Body:`, JSON.stringify(requestBody));

        const startTime = Date.now();
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
        });
        const duration = Date.now() - startTime;
        console.log(`[SSR API] ${apiName} - Response Status: ${response.status} ${response.statusText} (took ${duration}ms)`);

        const result: ArticlePageResponse = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: total=${result.data?.total || 0}, records count=${result.data?.records?.length || 0}`);

        if (result.success && result.data) {
            return result.data;
        }

        console.log(`[SSR API] ${apiName} - Returning null due to failed response`);
        return null;
    } catch (error) {
        console.error(`[SSR API] ${apiName} - ERROR:`, error);
        console.error(`[SSR API] ${apiName} - Error stack:`, error instanceof Error ? error.stack : "no stack");
        return null;
    }
};

export const getPublicArticleListServer = async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
    const apiName = "getPublicArticleListServer";
    try {
        console.log(`[SSR API] ${apiName} - Start with params:`, JSON.stringify(params));
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/list`;
        const requestBody = {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
            keyword: params.keyword || undefined,
            categoryId: params.categoryId || undefined,
        };
        console.log(`[SSR API] ${apiName} - Request URL: ${fullUrl}`);
        console.log(`[SSR API] ${apiName} - Request Method: POST`);
        console.log(`[SSR API] ${apiName} - Request Headers:`, JSON.stringify({ "Content-Type": "application/json" }));
        console.log(`[SSR API] ${apiName} - Request Body:`, JSON.stringify(requestBody));

        const startTime = Date.now();
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
        });
        const duration = Date.now() - startTime;
        console.log(`[SSR API] ${apiName} - Response Status: ${response.status} ${response.statusText} (took ${duration}ms)`);

        const result: ArticlePageResponse = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: total=${result.data?.total || 0}, records count=${result.data?.records?.length || 0}`);

        if (result.success && result.data) {
            return result.data;
        }

        console.log(`[SSR API] ${apiName} - Returning null due to failed response`);
        return null;
    } catch (error) {
        console.error(`[SSR API] ${apiName} - ERROR:`, error);
        console.error(`[SSR API] ${apiName} - Error stack:`, error instanceof Error ? error.stack : "no stack");
        return null;
    }
};

export const getUserArticleListServer = async (params: ArticleListParams): Promise<ArticlePageResponse["data"] | null> => {
    const apiName = "getUserArticleListServer";
    try {
        console.log(`[SSR API] ${apiName} - Start with params:`, JSON.stringify(params));
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/user/list`;
        const requestBody = {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
            keyword: params.keyword || undefined,
            categoryId: params.categoryId || undefined,
        };
        console.log(`[SSR API] ${apiName} - Request URL: ${fullUrl}`);
        console.log(`[SSR API] ${apiName} - Request Method: POST`);
        console.log(`[SSR API] ${apiName} - Request Headers:`, JSON.stringify({ "Content-Type": "application/json" }));
        console.log(`[SSR API] ${apiName} - Request Body:`, JSON.stringify(requestBody));

        const startTime = Date.now();
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
        });
        const duration = Date.now() - startTime;
        console.log(`[SSR API] ${apiName} - Response Status: ${response.status} ${response.statusText} (took ${duration}ms)`);

        const result: ArticlePageResponse = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: total=${result.data?.total || 0}, records count=${result.data?.records?.length || 0}`);

        if (result.success && result.data) {
            return result.data;
        }

        console.log(`[SSR API] ${apiName} - Returning null due to failed response`);
        return null;
    } catch (error) {
        console.error(`[SSR API] ${apiName} - ERROR:`, error);
        console.error(`[SSR API] ${apiName} - Error stack:`, error instanceof Error ? error.stack : "no stack");
        return null;
    }
};

export const getArticleDetailServer = async (id: number): Promise<Article | null> => {
    const apiName = "getArticleDetailServer";
    try {
        console.log(`[SSR API] ${apiName} - Start with article id: ${id}`);
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ARTICLE_BASE_PATH}/${id}`;
        console.log(`[SSR API] ${apiName} - Request URL: ${fullUrl}`);
        console.log(`[SSR API] ${apiName} - Request Method: GET`);
        console.log(`[SSR API] ${apiName} - Request Headers:`, JSON.stringify({ "Content-Type": "application/json" }));

        const startTime = Date.now();
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        const duration = Date.now() - startTime;
        console.log(`[SSR API] ${apiName} - Response Status: ${response.status} ${response.statusText} (took ${duration}ms)`);

        const result: { data: Article; success: boolean; errorMsg: string | null; code: number } = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: title=${result.data?.title || "(none)"}, id=${result.data?.id || 0}`);

        if (result.success && result.data) {
            return result.data;
        }

        console.log(`[SSR API] ${apiName} - Returning null due to failed response`);
        return null;
    } catch (error) {
        console.error(`[SSR API] ${apiName} - ERROR:`, error);
        console.error(`[SSR API] ${apiName} - Error stack:`, error instanceof Error ? error.stack : "no stack");
        return null;
    }
};
