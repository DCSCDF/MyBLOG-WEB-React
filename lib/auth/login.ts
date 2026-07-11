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
import { logToServer } from "@/lib/auth/logger";

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

  let existingToken: string | null = null;
  let existingRemember = false;

  if (typeof window !== "undefined") {
    existingToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    existingRemember = localStorage.getItem("remember") === "true";
  }

  await logToServer(`performLogin: 开始登录 - code=${code.slice(0, 8)}..., remember=${remember}, existingToken=${existingToken ? '存在(' + existingToken.length + ')' : '不存在'}`, "info");

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

  await logToServer(`performLogin: 获取 token 成功 - token长度=${token.length}`, "success");

  await logToServer(`performLogin: 执行 clearAuthStorage()`, "info");
  clearAuthStorage();

  await logToServer(`performLogin: 执行 saveToken() - remember=${remember}`, "info");
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
    await logToServer(`performLogin: Token 存储验证失败，恢复旧 token`, "error");
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

  await logToServer(`performLogin: Token 存储验证成功`, "success");

  await logToServer(`performLogin: 执行 triggerLoginNotification()`, "info");
  triggerLoginNotification(remember);

  await logToServer(`performLogin: 执行 checkStorageConsistency()`, "info");
  const consistencyChecked = await checkStorageConsistency(token, remember);
  
  if (!consistencyChecked) {
    await logToServer(`performLogin: 存储一致性检查失败，恢复旧 token`, "error");
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

  await logToServer(`performLogin: 登录成功，准备跳转 - redirectUrl=${redirectUrl}`, "success");

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
