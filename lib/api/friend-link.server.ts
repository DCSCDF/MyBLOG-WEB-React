import { getApiUrlServer } from "@/lib/env";

const PUBLIC_FRIEND_LINK_BASE_PATH = "/api/public/friend-link";

export interface FriendLink {
    name: string;
    url: string;
    summary: string;
    imageUrl: string;
    createTime: string;
}

export interface FriendLinkPageResponse {
    data: {
        records: FriendLink[];
        total: number;
        size: number;
        current: number;
        pages: number;
    };
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export interface FriendLinkListParams {
    currentPage: number;
    pageSize: number;
}

export interface SubmitFriendLinkRequest {
    name: string;
    url: string;
    summary?: string;
    imageUrl?: string;
}

export interface SubmitFriendLinkResponse {
    data: string;
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export const getFriendLinkListServer = async (params: FriendLinkListParams): Promise<FriendLinkPageResponse["data"] | null> => {
    const apiName = "getFriendLinkListServer";
    try {
        console.log(`[SSR API] ${apiName} - Start with params:`, JSON.stringify(params));
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_FRIEND_LINK_BASE_PATH}/list`;
        const requestBody = {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
        };
        console.log(`[SSR API] ${apiName} - Request URL: ${fullUrl}`);
        console.log(`[SSR API] ${apiName} - Request Method: POST`);
        console.log(`[SSR API] ${apiName} - Request Headers:`, JSON.stringify({ "Content-Type": "application/json" }));
        console.log(`[SSR API] ${apiName} - Request Body:`, JSON.stringify(requestBody));
        console.log(`[SSR API] ${apiName} - Timeout: 5000ms`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.log(`[SSR API] ${apiName} - TIMEOUT: Request aborted after 5000ms`);
            controller.abort();
        }, 5000);

        const startTime = Date.now();
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
            signal: controller.signal,
        });
        const duration = Date.now() - startTime;
        clearTimeout(timeoutId);
        console.log(`[SSR API] ${apiName} - Response Status: ${response.status} ${response.statusText} (took ${duration}ms)`);

        const result: FriendLinkPageResponse = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: total=${result.data?.total || 0}, records count=${result.data?.records?.length || 0}`);

        if (result.success && result.data) {
            return result.data;
        }

        console.log(`[SSR API] ${apiName} - Returning null due to failed response`);
        return null;
    } catch (error) {
        console.error(`[SSR API] ${apiName} - ERROR:`, error);
        console.error(`[SSR API] ${apiName} - Error name:`, error instanceof Error ? error.name : "unknown");
        console.error(`[SSR API] ${apiName} - Error message:`, error instanceof Error ? error.message : "no message");
        console.error(`[SSR API] ${apiName} - Error stack:`, error instanceof Error ? error.stack : "no stack");
        if (error instanceof Error && error.name === "AbortError") {
            console.error(`[SSR API] ${apiName} - This appears to be a TIMEOUT error (AbortError)`);
        }
        return null;
    }
};
