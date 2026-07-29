import { getApiUrlServer } from "@/lib/env";
import type { Category, CategoryListResponse } from "@/lib/types";

const PUBLIC_CATEGORY_BASE_PATH = "/api/public/category";

export const getCategoryListServer = async (): Promise<Category[]> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return [];
        }

        const fullUrl = `${apiUrl}${PUBLIC_CATEGORY_BASE_PATH}/list`;

        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return [];
        }

        const result: CategoryListResponse = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return [];
    } catch {
        return [];
    }
};