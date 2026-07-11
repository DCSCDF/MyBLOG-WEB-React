"use client";

import { getApiUrl } from "@/lib/env";

const AUTH_BASE_PATH = "/api/auth";

export interface TokenResponse {
  success: boolean;
  data?: {
    token: string;
  };
  message?: string;
  errorMsg?: string;
  code?: number;
}

export interface UserProfile {
  id: number;
  username: string;
  nickname: string;
  email: string;
  createTime: string;
  updateTime: string;
  avatarUrl: string | null;
}

export interface ProfileResponse {
  success: boolean;
  data?: UserProfile;
  errorMsg?: string;
  code?: number;
}

export const authApi = {
  getToken: async (code: string, remember: boolean = false): Promise<TokenResponse> => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${AUTH_BASE_PATH}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        remember,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getUserProfile: async (token: string): Promise<ProfileResponse> => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${AUTH_BASE_PATH}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify({}),
    });

    return response.json();
  },
};
