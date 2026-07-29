import { getApiUrlServer } from "@/lib/env";
import type { SiteInfo, ConfigItem, ConfigResponse, BatchConfigResponse } from "@/lib/types";

const PUBLIC_CONFIG_BASE_PATH = "/api/public/config";

export const getSiteInfoServer = async (): Promise<SiteInfo | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_CONFIG_BASE_PATH}/site-info`;

        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const result: ConfigResponse<SiteInfo> = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
};

export const getConfigsByKeysServer = async (keys: string[]): Promise<Map<string, string>> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return new Map();
        }

        const fullUrl = `${apiUrl}${PUBLIC_CONFIG_BASE_PATH}`;
        const requestBody = { keys };

        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
        });

        if (!response.ok) {
            return new Map();
        }

        const result: BatchConfigResponse = await response.json();

        if (result.success && result.data) {
            const configMap = new Map<string, string>();
            result.data.forEach((item: ConfigItem) => {
                configMap.set(item.configKey, item.configValue);
            });
            return configMap;
        }

        return new Map();
    } catch {
        return new Map();
    }
};