"use client";

import { getApiUrl } from "@/lib/env";

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

export const adminApi = {
  getAdminInfo: async (): Promise<AdminInfoResponse> => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${PUBLIC_ADMIN_BASE_PATH}/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        data: null,
        success: false,
        errorMsg: response.status === 404 ? "请求的资源不存在" : "请求失败",
        code: response.status,
      };
    }

    return response.json();
  },
};