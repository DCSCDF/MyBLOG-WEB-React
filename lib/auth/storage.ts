"use client";

import {logToServer} from "@/lib/auth/logger";

const STORAGE_KEYS = {
    TOKEN: "token",
    LOGIN_STATUS: "login_status",
    SESSION_LOGIN_TRIGGER: "session_login_trigger",
    REMEMBER: "remember",
};

export const clearAuthStorage = (): void => {
    logToServer(`clearAuthStorage: 清除所有认证存储`, "warn").then();
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.LOGIN_STATUS);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER);
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_LOGIN_TRIGGER);
};

export const validateTokenStorage = (token: string, useLocalStorage: boolean): boolean => {
    const storage = useLocalStorage ? localStorage : sessionStorage;

    if (typeof storage === "undefined") {
        return false;
    }

    const storedToken = storage.getItem(STORAGE_KEYS.TOKEN);
    if (!storedToken) {
        return false;
    }

    if (storedToken !== token) {
        return false;
    }

    const reReadToken = storage.getItem(STORAGE_KEYS.TOKEN);
    return reReadToken === token;
};

export const checkStorageConsistency = async (token: string, useLocalStorage: boolean): Promise<boolean> => {
    const checkCount = 3;
    const interval = 150;

    for (let i = 0; i < checkCount; i++) {
        if (!validateTokenStorage(token, useLocalStorage)) {
            return false;
        }
        if (i < checkCount - 1) {
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
    }

    return true;
};

export const saveToken = (token: string, remember: boolean): void => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.TOKEN, token);

    if (remember) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER, "true");
    } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBER);
    }
};

export const triggerLoginNotification = (remember: boolean): void => {
    const triggerValue = Date.now().toString();

    if (remember) {
        localStorage.setItem(STORAGE_KEYS.LOGIN_STATUS, triggerValue);
    } else {
        sessionStorage.setItem(STORAGE_KEYS.SESSION_LOGIN_TRIGGER, triggerValue);
    }
};
