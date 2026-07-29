"use client";

import { authApi } from "@/lib/api/auth";
import { getAdminUrl } from "@/lib/env";
import {
  clearAuthStorage,
  triggerLoginNotification,
} from "@/lib/auth/storage";

export interface LoginParams {
  code: string;
  redirectUrl: string;
  remember?: boolean;
}

export interface LoginResult {
  success: boolean;
  error?: string;
  redirectUrl?: string;
}

export const performLogin = async (params: LoginParams): Promise<LoginResult> => {
  const { code, redirectUrl, remember = false } = params;

  try {
    const tokenResponse = await authApi.getToken(code, remember);

    if (!tokenResponse) {
      return {
        success: false,
        error: "未收到响应",
      };
    }

    if (!tokenResponse.success) {
      return {
        success: false,
        error: tokenResponse.errorMsg || tokenResponse.message || "登录失败",
      };
    }

    if (!tokenResponse.data || !tokenResponse.data.token) {
      return {
        success: false,
        error: "无效的 Token",
      };
    }

    clearAuthStorage();

    triggerLoginNotification(remember);

    return {
      success: true,
      redirectUrl,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "登录请求失败";
    return {
      success: false,
      error: message,
    };
  }
};

export const handleLogout = (): void => {
  authApi.logout().finally(() => {
    clearAuthStorage();
    window.location.href = "/";
  });
};

export const handleBack = (): void => {
  window.location.href = "/";
};

export const redirectToAdmin = (): void => {
  const adminUrl = getAdminUrl();
  window.location.href = adminUrl || "/";
};
