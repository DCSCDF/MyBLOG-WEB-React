"use client";

import { env } from "next-runtime-env";

export const getApiUrl = (): string => {
  return env("NEXT_PUBLIC_API_URL") || "";
};

export const getAdminUrl = (): string => {
  return env("NEXT_PUBLIC_ADMIN_URL") || "";
};
