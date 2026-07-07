import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const THEME_COOKIE_NAME = "theme";

export function getThemeFromCookie(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === THEME_COOKIE_NAME) {
      return value === "dark" ? "dark" : "light";
    }
  }
  return "light";
}

export function setThemeCookie(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=31536000`;
}

export function applyTheme(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

const themeListeners = new Set<() => void>();

export function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  return () => {
    themeListeners.delete(callback);
  };
}

export function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function getThemeServerSnapshot(): "light" | "dark" {
  return "light";
}

export function toggleTheme() {
  const next = getThemeSnapshot() === "dark" ? "light" : "dark";
  setThemeCookie(next);
  applyTheme(next);
  themeListeners.forEach((l) => l());
}
