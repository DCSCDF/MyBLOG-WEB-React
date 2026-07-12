import {env} from "next-runtime-env";

const PUBLIC_CONFIG_BASE_PATH = "/api/public/config";

export interface SiteInfo {
    siteName: string;
    siteDomain: string;
    siteDescription: string;
    recordNumber: string;
}

export interface ConfigResponse<T = null> {
    data: T;
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export const getApiUrlServer = (): string => {
    return process.env.NEXT_PUBLIC_API_URL || env("NEXT_PUBLIC_API_URL") || "";
};

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