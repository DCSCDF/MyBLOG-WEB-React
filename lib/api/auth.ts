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
};
