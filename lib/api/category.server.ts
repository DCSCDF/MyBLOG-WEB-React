import { getApiUrlServer } from "@/lib/env";

const PUBLIC_CATEGORY_BASE_PATH = "/api/public/category";

export interface Category {
  id: number;
  name: string;
  description: string;
  sortOrder: number;
}

export interface CategoryListResponse {
  data: Category[];
  success: boolean;
  errorMsg: string | null;
  code: number;
}

export const getCategoryListServer = async (): Promise<Category[]> => {
  const apiName = "getCategoryListServer";
  try {
    console.log(`[SSR API] ${apiName} - Start`);
    const apiUrl = getApiUrlServer();
    if (!apiUrl) {
      console.log(`[SSR API] ${apiName} - FAILED: API URL is empty! Returning empty array`);
      return [];
    }

    const fullUrl = `${apiUrl}${PUBLIC_CATEGORY_BASE_PATH}/list`;
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

    const result: CategoryListResponse = await response.json();
    console.log(`[SSR API] ${apiName} - Response success: ${result.success}, code: ${result.code}, errorMsg: ${result.errorMsg || "none"}`);
    console.log(`[SSR API] ${apiName} - Response data summary: categories count=${result.data?.length || 0}`);

    if (result.success && result.data) {
      return result.data;
    }

    console.log(`[SSR API] ${apiName} - Returning empty array due to failed response`);
    return [];
  } catch (error) {
    console.error(`[SSR API] ${apiName} - ERROR:`, error);
    console.error(`[SSR API] ${apiName} - Error stack:`, error instanceof Error ? error.stack : "no stack");
    return [];
  }
};
