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
  try {
    const apiUrl = getApiUrlServer();
    if (!apiUrl) {
      return [];
    }

    const response = await fetch(`${apiUrl}${PUBLIC_CATEGORY_BASE_PATH}/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result: CategoryListResponse = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return [];
  } catch {
    return [];
  }
};