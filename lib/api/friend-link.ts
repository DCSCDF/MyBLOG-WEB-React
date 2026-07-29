"use client";

import { getApiUrl } from "@/lib/env";
import type { SubmitFriendLinkRequest, SubmitFriendLinkResponse } from "@/lib/types";

const PUBLIC_FRIEND_LINK_BASE_PATH = "/api/public/friend-link";

export const friendLinkApi = {
    submitFriendLink: async (data: SubmitFriendLinkRequest): Promise<SubmitFriendLinkResponse> => {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}${PUBLIC_FRIEND_LINK_BASE_PATH}/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response.json();
    },
};