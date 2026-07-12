import { env } from "next-runtime-env";

export const getApiUrl = (): string => {
  return env("NEXT_PUBLIC_API_URL") || "";
};

export const getAdminUrl = (): string => {
  return env("NEXT_PUBLIC_ADMIN_URL") || "";
};

export const getApiUrlServer = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || env("NEXT_PUBLIC_API_URL") || "";
};
