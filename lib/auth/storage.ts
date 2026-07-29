"use client";

const STORAGE_KEYS = {
    LOGIN_STATUS: "login_status",
    SESSION_LOGIN_TRIGGER: "session_login_trigger",
    REMEMBER: "remember",
};

export const clearAuthStorage = (): void => {
    localStorage.removeItem(STORAGE_KEYS.LOGIN_STATUS);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_LOGIN_TRIGGER);
};

export const triggerLoginNotification = (remember: boolean): void => {
    const triggerValue = Date.now().toString();

    if (remember) {
        localStorage.setItem(STORAGE_KEYS.LOGIN_STATUS, triggerValue);
    } else {
        sessionStorage.setItem(STORAGE_KEYS.SESSION_LOGIN_TRIGGER, triggerValue);
    }
};
