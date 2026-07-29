import { env } from "next-runtime-env";

const QUOTE_CHARS = ["`", "'", '"'];

const cleanUrl = (raw: string): string => {
    if (!raw) return "";
    let cleaned = raw;
    let changed = true;
    while (changed) {
        changed = false;
        cleaned = cleaned.trim();
        for (const q of QUOTE_CHARS) {
            if (cleaned.startsWith(q) && cleaned.endsWith(q) && cleaned.length >= 2) {
                cleaned = cleaned.slice(1, -1);
                changed = true;
            }
        }
    }
    cleaned = cleaned.trim();
    return cleaned;
};

const isValidExternalUrl = (url: string): boolean => {
    if (!url) return false;
    if (url.includes("localhost")) return false;
    if (url.includes("127.0.0.1")) return false;
    if (url.includes("0.0.0.0")) return false;
    return url.startsWith("http://") || url.startsWith("https://");
};

export const getApiUrl = (): string => {
    const rawUrl = env("NEXT_PUBLIC_API_URL") || "";
    return cleanUrl(rawUrl);
};

export const getAdminUrl = (): string => {
    const rawUrl = env("NEXT_PUBLIC_ADMIN_URL") || "";
    return cleanUrl(rawUrl);
};

export const getApiUrlServer = (): string => {
    const rawProcessEnvUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const rawRuntimeEnvUrl = env("NEXT_PUBLIC_API_URL") || "";
    const processEnvUrl = cleanUrl(rawProcessEnvUrl);
    const runtimeEnvUrl = cleanUrl(rawRuntimeEnvUrl);

    let finalUrl = "";

    if (isValidExternalUrl(runtimeEnvUrl)) {
        finalUrl = runtimeEnvUrl;
    } else if (isValidExternalUrl(processEnvUrl)) {
        finalUrl = processEnvUrl;
    } else if (runtimeEnvUrl) {
        finalUrl = runtimeEnvUrl;
    } else if (processEnvUrl) {
        finalUrl = processEnvUrl;
    }

    return finalUrl;
};