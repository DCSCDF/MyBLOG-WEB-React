import {getApiUrlServer} from "@/lib/env";

const PUBLIC_COMMENT_BASE_PATH = "/api/public/comment";

export interface CommentVO {
    id: number;
    parentId: number;
    username: string;
    email: string;
    avatarUrl: string | null;
    website: string | null;
    content: string;
    isAdmin: boolean;
    deviceInfo: string;
    createTime: string;
    updateTime: string;
    children: CommentVO[];
}

export interface CommentListResponse {
    data: CommentVO[];
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export const getCommentListServer = async (blogId: number): Promise<CommentVO[] | null> => {
    const apiName = "getCommentListServer";
    try {
        console.log(`[SSR API] ${apiName} - Start with blogId: ${blogId}`);
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_COMMENT_BASE_PATH}/list/${blogId}`;
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

        const result: CommentListResponse = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: comments count=${result.data?.length || 0}`);

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
