"use client";

import { getApiUrl } from "@/lib/env";

const PUBLIC_CONFIG_BASE_PATH = "/api/public/config";

export interface ConfigItem {
  configKey: string;
  configValue: string;
}

export interface ConfigResponse<T = null> {
  data: T;
  success: boolean;
  errorMsg: string | null;
  code: number;
}

export interface SiteInfo {
  siteName: string;
  siteDomain: string;
  siteDescription: string;
  recordNumber: string;
}

export interface BatchConfigResponse {
  data: ConfigItem[];
  success: boolean;
  errorMsg: string | null;
  code: number;
}

export const configApi = {
  getSiteInfo: async (): Promise<ConfigResponse<SiteInfo>> => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${PUBLIC_CONFIG_BASE_PATH}/site-info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },

  getConfigsByKeys: async (keys: string[]): Promise<BatchConfigResponse> => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${PUBLIC_CONFIG_BASE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keys }),
    });

    return response.json();
  },
};