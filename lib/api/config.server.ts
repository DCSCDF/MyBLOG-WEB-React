import { getApiUrlServer } from "@/lib/env";

const PUBLIC_CONFIG_BASE_PATH = "/api/public/config";

export interface SiteInfo {
    siteName: string;
    siteDomain: string;
    siteDescription: string;
    recordNumber: string;
}

export interface ConfigItem {
    configKey: string;
    configValue: string;
}

export interface ConfigResponse<T = null> {
    data: T;
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export interface BatchConfigResponse {
    data: ConfigItem[];
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export const getSiteInfoServer = async (): Promise<SiteInfo | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const response = await fetch(`${apiUrl}${PUBLIC_CONFIG_BASE_PATH}/site-info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

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

        const response = await fetch(`${apiUrl}${PUBLIC_CONFIG_BASE_PATH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ keys }),
            cache: "no-store",
        });

        const result: BatchConfigResponse = await response.json();

        if (result.success && result.data) {
            const configMap = new Map<string, string>();
            result.data.forEach((item) => {
                configMap.set(item.configKey, item.configValue);
            });
            return configMap;
        }

        return new Map();
    } catch {
        return new Map();
    }
};