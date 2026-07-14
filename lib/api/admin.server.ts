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
  try {
    const apiUrl = getApiUrlServer();
    if (!apiUrl) {
      return null;
    }

    const response = await fetch(`${apiUrl}${PUBLIC_ADMIN_BASE_PATH}/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result: AdminInfoResponse = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch {
    return null;
  }
};