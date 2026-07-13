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
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const response = await fetch(`${apiUrl}${PUBLIC_FRIEND_LINK_BASE_PATH}/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentPage: params.currentPage,
                pageSize: params.pageSize,
            }),
            next: {
                revalidate: 1800,
            },
        });

        const result: FriendLinkPageResponse = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
};
