"use client";

import { authApi } from "@/lib/api/auth";
import { getAdminUrl } from "@/lib/env";
import {
  clearAuthStorage,
  validateTokenStorage,
  checkStorageConsistency,
  saveToken,
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

  const existingToken = localStorage.getItem("token") || sessionStorage.getItem("token");
  const existingRemember = localStorage.getItem("remember") === "true";

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

  if (!tokenResponse.data) {
    return {
      success: false,
      error: "缺少数据",
    };
  }

  if (!tokenResponse.data.token) {
    return {
      success: false,
      error: "无效的 Token",
    };
  }

  const token = tokenResponse.data.token;

  clearAuthStorage();

  saveToken(token, remember);

  const maxRetries = 3;
  const retryInterval = 300;
  let storageValidated = false;

  for (let i = 0; i < maxRetries; i++) {
    if (validateTokenStorage(token, remember)) {
      storageValidated = true;
      break;
    }

    if (i < maxRetries - 1) {
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      saveToken(token, remember);
    }
  }

  if (!storageValidated) {
    if (existingToken) {
      const storage = existingRemember ? localStorage : sessionStorage;
      storage.setItem("token", existingToken);
      if (existingRemember) {
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("remember");
      }
    }
    return {
      success: false,
      error: "Token 存储验证失败",
    };
  }

  triggerLoginNotification(remember);

  const consistencyChecked = await checkStorageConsistency(token, remember);
  if (!consistencyChecked) {
    if (existingToken) {
      const storage = existingRemember ? localStorage : sessionStorage;
      storage.setItem("token", existingToken);
      if (existingRemember) {
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("remember");
      }
    }
    return {
      success: false,
      error: "存储一致性检查失败",
    };
  }

  return {
    success: true,
    redirectUrl,
  };
};

export const handleLogout = (): void => {
  clearAuthStorage();
  window.location.href = "/";
};

export const handleBack = (): void => {
  window.location.href = "/";
};

export const redirectToAdmin = (): void => {
  const adminUrl = getAdminUrl();
  window.location.href = adminUrl || "/";
};
