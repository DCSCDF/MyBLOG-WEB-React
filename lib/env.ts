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
  const url = cleanUrl(rawUrl);
  if (rawUrl !== url) {
    console.log("[SSR DEBUG] getApiUrl - cleaned URL from:", JSON.stringify(rawUrl), "to:", JSON.stringify(url));
  }
  console.log("[SSR DEBUG] getApiUrl:", url ? url : "(empty)");
  return url;
};

export const getAdminUrl = (): string => {
  const rawUrl = env("NEXT_PUBLIC_ADMIN_URL") || "";
  const url = cleanUrl(rawUrl);
  if (rawUrl !== url) {
    console.log("[SSR DEBUG] getAdminUrl - cleaned URL from:", JSON.stringify(rawUrl), "to:", JSON.stringify(url));
  }
  console.log("[SSR DEBUG] getAdminUrl:", url ? url : "(empty)");
  return url;
};

export const getApiUrlServer = (): string => {
  const rawProcessEnvUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const rawRuntimeEnvUrl = env("NEXT_PUBLIC_API_URL") || "";
  const processEnvUrl = cleanUrl(rawProcessEnvUrl);
  const runtimeEnvUrl = cleanUrl(rawRuntimeEnvUrl);

  console.log("[SSR DEBUG] getApiUrlServer - raw process.env.NEXT_PUBLIC_API_URL:", JSON.stringify(rawProcessEnvUrl));
  console.log("[SSR DEBUG] getApiUrlServer - cleaned process.env.NEXT_PUBLIC_API_URL:", processEnvUrl ? processEnvUrl : "(empty)");
  console.log("[SSR DEBUG] getApiUrlServer - processEnvUrl isExternalValid:", isValidExternalUrl(processEnvUrl));
  console.log("[SSR DEBUG] getApiUrlServer - raw next-runtime-env NEXT_PUBLIC_API_URL:", JSON.stringify(rawRuntimeEnvUrl));
  console.log("[SSR DEBUG] getApiUrlServer - cleaned next-runtime-env NEXT_PUBLIC_API_URL:", runtimeEnvUrl ? runtimeEnvUrl : "(empty)");
  console.log("[SSR DEBUG] getApiUrlServer - runtimeEnvUrl isExternalValid:", isValidExternalUrl(runtimeEnvUrl));

  let finalUrl = "";
  let source = "none";

  if (isValidExternalUrl(runtimeEnvUrl)) {
    finalUrl = runtimeEnvUrl;
    source = "next-runtime-env (valid external URL)";
  } else if (isValidExternalUrl(processEnvUrl)) {
    finalUrl = processEnvUrl;
    source = "process.env (valid external URL)";
  } else if (runtimeEnvUrl) {
    finalUrl = runtimeEnvUrl;
    source = "next-runtime-env (fallback, may be localhost)";
  } else if (processEnvUrl) {
    finalUrl = processEnvUrl;
    source = "process.env (fallback, may be localhost)";
  }

  console.log("[SSR DEBUG] getApiUrlServer - selected source:", source);
  console.log("[SSR DEBUG] getApiUrlServer - final URL:", finalUrl ? finalUrl : "(empty)");

  if (finalUrl && (finalUrl.includes("localhost") || finalUrl.includes("127.0.0.1"))) {
    console.warn("[SSR WARNING] getApiUrlServer - final URL contains localhost/127.0.0.1! This will likely FAIL in Docker container unless backend is running in the SAME container on port 8088");
  }

  if (finalUrl && (finalUrl.includes("`") || finalUrl.includes("'") || finalUrl.includes('"'))) {
    console.warn("[SSR WARNING] getApiUrlServer - final URL still contains quote characters! This may cause fetch failures. URL:", JSON.stringify(finalUrl));
  }

  return finalUrl;
};
