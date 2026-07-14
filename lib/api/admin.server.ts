import { getApiUrlServer } from "@/lib/env";

export const PUBLIC_ADMIN_BASE_PATH = "/api/public/admin";

export interface AdminInfo {
  nickname: string;
  email: string;
  avatarUrl: string | null;
  bio: string;
}

export interface AdminInfoResponse {
  data: AdminInfo | null;
  success: boolean;
  errorMsg: string | null;
  code: number;
}

export const getAdminInfoServer = async (): Promise<AdminInfo | null> => {
  const apiName = "getAdminInfoServer";
  try {
    console.log(`[SSR API] ${apiName} - Start`);
    const apiUrl = getApiUrlServer();
    if (!apiUrl) {
      console.log(`[SSR API] ${apiName} - FAILED: API URL is empty!`);
      return null;
    }

    const fullUrl = `${apiUrl}${PUBLIC_ADMIN_BASE_PATH}/info`;
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

    const result: AdminInfoResponse = await response.json();
    console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
    console.log(`[SSR API] ${apiName} - Response data summary: nickname=${result.data?.nickname || "(none)"}, email=${result.data?.email || "(none)"}`);

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
