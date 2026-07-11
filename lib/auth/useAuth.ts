"use client";

import {useState, useEffect} from "react";
import {authApi, type UserProfile} from "@/lib/api/auth";
import {clearAuthStorage} from "@/lib/auth/storage";
import {logToServer} from "@/lib/auth/logger";

export interface AuthState {
    user: UserProfile | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            if (!token) {
                await logToServer("useAuth: 未检测到 token", "info");
                setAuthState({
                    user: null,
                    isLoggedIn: false,
                    isLoading: false,
                    error: null,
                });
                return;
            }

            await logToServer(`useAuth: 检测到 token，长度=${token.length}，尝试获取用户信息`, "info");

            try {
                const response = await authApi.getUserProfile(token);
                await logToServer(`useAuth: API 响应 - success=${response.success}, code=${response.code}, errorMsg=${response.errorMsg}`, "info");

                if (response.success && response.data) {
                    await logToServer(`useAuth: 获取用户信息成功 - username=${response.data.username}, nickname=${response.data.nickname}`, "success");
                    setAuthState({
                        user: response.data,
                        isLoggedIn: true,
                        isLoading: false,
                        error: null,
                    });
                } else {
                    await logToServer(`useAuth: 获取用户信息失败 - code=${response.code}, errorMsg=${response.errorMsg}`, "warn");

                    if (response.code === 401) {
                        await logToServer("useAuth: 401 未授权，执行清除 token", "error");
                        clearAuthStorage();
                        setAuthState({
                            user: null,
                            isLoggedIn: false,
                            isLoading: false,
                            error: response.errorMsg || "登录已过期",
                        });
                    } else {
                        await logToServer("useAuth: API 失败但非 401，保留 token", "warn");
                        setAuthState({
                            user: null,
                            isLoggedIn: false,
                            isLoading: false,
                            error: null,
                        });
                    }
                }
            } catch (err) {
                await logToServer(`useAuth: 获取用户信息异常 - ${(err as Error).message}`, "error");
                setAuthState({
                    user: null,
                    isLoggedIn: false,
                    isLoading: false,
                    error: null,
                });
            }
        };

        initAuth().then();
    }, []);

    const logout = () => {
        clearAuthStorage();
        setAuthState({
            user: null,
            isLoggedIn: false,
            isLoading: false,
            error: null,
        });
    };

    return {...authState, logout};
};