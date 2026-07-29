"use client";

import type { TokenResponse, ProfileResponse } from "@/lib/types";

const AUTH_PROXY_PATH = "/api/auth";

export const authApi = {
    getToken: async (code: string, remember: boolean = false): Promise<TokenResponse> => {
        const response = await fetch(`${AUTH_PROXY_PATH}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
                remember,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    },

    getUserProfile: async (): Promise<ProfileResponse> => {
        const response = await fetch(`${AUTH_PROXY_PATH}?action=profile`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        return response.json();
    },

    logout: async (): Promise<void> => {
        await fetch(`${AUTH_PROXY_PATH}?action=logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });
    },
};
