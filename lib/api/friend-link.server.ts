import { getApiUrlServer } from "@/lib/env";
import type { FriendLinkListParams, FriendLinkPageResponse } from "@/lib/types";

const PUBLIC_FRIEND_LINK_BASE_PATH = "/api/public/friend-link";

export const getFriendLinkListServer = async (params: FriendLinkListParams): Promise<FriendLinkPageResponse["data"] | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_FRIEND_LINK_BASE_PATH}/list`;
        const requestBody = {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
        };

        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
            return null;
        }

        const result: FriendLinkPageResponse = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
};