import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const THEME_COOKIE_NAME = "theme";

// export function getThemeFromCookie(): "light" | "dark" {
//   if (typeof document === "undefined") return "light";
//   const cookies = document.cookie.split(";");
//   for (const cookie of cookies) {
//     const [name, value] = cookie.trim().split("=");
//     if (name === THEME_COOKIE_NAME) {
//       return value === "dark" ? "dark" : "light";
//     }
//   }
//   return "light";
// }

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

// Theme state is tracked independently of the DOM class so that external
// consumers (useSyncExternalStore) stay in sync with the animation library
// without creating a circular dependency: the library reads isDarkMode from
// this snapshot and, in its own effect, toggles the class — so the snapshot
// must not read the class back.
let currentTheme: "light" | "dark" = "light";
if (typeof document !== "undefined") {
  currentTheme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  return () => {
    themeListeners.delete(callback);
  };
}

export function getThemeSnapshot(): "light" | "dark" {
  return currentTheme;
}

export function getThemeServerSnapshot(): "light" | "dark" {
  return "light";
}

export function toggleTheme() {
  const next = currentTheme === "dark" ? "light" : "dark";
  currentTheme = next;
  setThemeCookie(next);
  applyTheme(next);
  themeListeners.forEach((l) => l());
}

// Updates theme state + cookie + notifies subscribers without touching the
// dark class. react-theme-switch-animation manages the class itself via the
// View Transition API; we only mirror the change into our external store.
export function syncThemeState(theme: "light" | "dark") {
  currentTheme = theme;
  setThemeCookie(theme);
  themeListeners.forEach((l) => l());
}
