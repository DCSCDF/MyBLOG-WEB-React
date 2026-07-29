"use client";

import {getApiUrl} from "@/lib/env";
import type {BatchConfigResponse} from "@/lib/types";

const PUBLIC_CONFIG_BASE_PATH = "/api/public/config";

export const configApi = {
    // getSiteInfo: async (): Promise<ConfigResponse<SiteInfo>> => {
    //     const apiUrl = getApiUrl();
    //     const response = await fetch(`${apiUrl}${PUBLIC_CONFIG_BASE_PATH}/site-info`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //
    //     return response.json();
    // },

    getConfigsByKeys: async (keys: string[]): Promise<BatchConfigResponse> => {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}${PUBLIC_CONFIG_BASE_PATH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({keys}),
        });

        return response.json();
    },
};