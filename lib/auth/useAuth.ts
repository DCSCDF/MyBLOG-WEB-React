"use client";

import {useState, useEffect} from "react";
import {authApi, type UserProfile} from "@/lib/api/auth";
import {clearAuthStorage} from "@/lib/auth/storage";

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
                setAuthState({
                    user: null,
                    isLoggedIn: false,
                    isLoading: false,
                    error: null,
                });
                return;
            }

            try {
                const response = await authApi.getUserProfile(token);

                if (response.success && response.data) {
                    setAuthState({
                        user: response.data,
                        isLoggedIn: true,
                        isLoading: false,
                        error: null,
                    });
                } else {
                    if (response.code === 401) {
                        clearAuthStorage();
                        setAuthState({
                            user: null,
                            isLoggedIn: false,
                            isLoading: false,
                            error: response.errorMsg || "登录已过期",
                        });
                    } else {
                        setAuthState({
                            user: null,
                            isLoggedIn: false,
                            isLoading: false,
                            error: null,
                        });
                    }
                }
            } catch {
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