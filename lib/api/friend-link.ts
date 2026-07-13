"use client";

import {getApiUrl} from "@/lib/env";
import {SubmitFriendLinkRequest, SubmitFriendLinkResponse, FriendLinkListParams, FriendLinkPageResponse} from "./friend-link.server";

const PUBLIC_FRIEND_LINK_BASE_PATH = "/api/public/friend-link";

export const friendLinkApi = {
    getFriendLinkList: async (params: FriendLinkListParams): Promise<FriendLinkPageResponse["data"] | null> => {
        try {
            const apiUrl = getApiUrl();
            if (!apiUrl) {
                return null;
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${apiUrl}${PUBLIC_FRIEND_LINK_BASE_PATH}/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPage: params.currentPage,
                    pageSize: params.pageSize,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const result: FriendLinkPageResponse = await response.json();

            if (result.success && result.data) {
                return result.data;
            }

            return null;
        } catch {
            return null;
        }
    },

    submitFriendLink: async (data: SubmitFriendLinkRequest): Promise<SubmitFriendLinkResponse> => {
        try {
            const apiUrl = getApiUrl();
            if (!apiUrl) {
                return {
                    data: "",
                    success: false,
                    errorMsg: "API地址未配置",
                    code: 500,
                };
            }

            const response = await fetch(`${apiUrl}${PUBLIC_FRIEND_LINK_BASE_PATH}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    url: data.url,
                    summary: data.summary || undefined,
                    imageUrl: data.imageUrl || undefined,
                }),
            });

            return await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return {
                data: "",
                success: false,
                errorMsg: "网络请求失败",
                code: 500,
            };
        }
    },
};
