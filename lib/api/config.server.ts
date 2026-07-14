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
    const apiName = "getSiteInfoServer";
    try {
        console.log(`[SSR API] ${apiName} - Start`);
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_CONFIG_BASE_PATH}/site-info`;
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

        const result: ConfigResponse<SiteInfo> = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: siteName=${result.data?.siteName || "(none)"}, siteDomain=${result.data?.siteDomain || "(none)"}`);

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

export const getConfigsByKeysServer = async (keys: string[]): Promise<Map<string, string>> => {
    const apiName = "getConfigsByKeysServer";
    try {
        console.log(`[SSR API] ${apiName} - Start with keys:`, JSON.stringify(keys));
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            console.log(`[SSR API] ${apiName} - FAILED: API URL is empty! Returning empty Map`);
            return new Map();
        }

        const fullUrl = `${apiUrl}${PUBLIC_CONFIG_BASE_PATH}`;
        const requestBody = { keys };
        console.log(`[SSR API] ${apiName} - Request URL: ${fullUrl}`);
        console.log(`[SSR API] ${apiName} - Request Method: POST`);
        console.log(`[SSR API] ${apiName} - Request Headers:`, JSON.stringify({ "Content-Type": "application/json" }));
        console.log(`[SSR API] ${apiName} - Request Body:`, JSON.stringify(requestBody));

        const startTime = Date.now();
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
        });
        const duration = Date.now() - startTime;
        console.log(`[SSR API] ${apiName} - Response Status: ${response.status} ${response.statusText} (took ${duration}ms)`);

        const result: BatchConfigResponse = await response.json();
        console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
        console.log(`[SSR API] ${apiName} - Response data summary: config items count=${result.data?.length || 0}`);

        if (result.success && result.data) {
            const configMap = new Map<string, string>();
            result.data.forEach((item) => {
                configMap.set(item.configKey, item.configValue);
            });
            console.log(`[SSR API] ${apiName} - Config map created with ${configMap.size} entries`);
            return configMap;
        }

        console.log(`[SSR API] ${apiName} - Returning empty Map due to failed response`);
        return new Map();
    } catch (error) {
        console.error(`[SSR API] ${apiName} - ERROR:`, error);
        console.error(`[SSR API] ${apiName} - Error stack:`, error instanceof Error ? error.stack : "no stack");
        return new Map();
    }
};
