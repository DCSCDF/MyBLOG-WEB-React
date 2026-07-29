import { getApiUrlServer } from "@/lib/env";
import type { AdminInfo, AdminInfoResponse } from "@/lib/types";

const PUBLIC_ADMIN_BASE_PATH = "/api/public/admin";

export const getAdminInfoServer = async (): Promise<AdminInfo | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_ADMIN_BASE_PATH}/info`;

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

        const result: AdminInfoResponse = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch {
        return null;
    }
};