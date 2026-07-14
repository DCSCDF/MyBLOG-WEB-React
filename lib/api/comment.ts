"use client";

import { getApiUrl } from "@/lib/env";

const PUBLIC_COMMENT_BASE_PATH = "/api/public/comment";

export interface CommentVO {
    id: number;
    parentId: number;
    username: string;
    email: string;
    avatarUrl: string | null;
    website: string | null;
    content: string;
    isAdmin: boolean;
    deviceInfo: string;
    createTime: string;
    updateTime: string;
    children: CommentVO[];
}

export interface CommentListResponse {
    data: CommentVO[];
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export interface SubmitCommentRequest {
    blogId: number;
    parentId: number;
    username?: string;
    email?: string;
    avatarUrl?: string;
    website?: string;
    content: string;
}

export interface SubmitCommentResponse {
    data: {
        id: number;
        message: string;
    };
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export const commentApi = {
    getCommentList: async (blogId: number): Promise<CommentVO[] | null> => {
        try {
            const apiUrl = getApiUrl();
            if (!apiUrl) {
                return null;
            }

            const response = await fetch(`${apiUrl}${PUBLIC_COMMENT_BASE_PATH}/list/${blogId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                signal: AbortSignal.timeout(5000),
            });

            const result: CommentListResponse = await response.json();

            if (result.success && result.data) {
                return result.data;
            }

            return null;
        } catch {
            return null;
        }
    },

    submitComment: async (
        request: SubmitCommentRequest,
        token?: string | null
    ): Promise<SubmitCommentResponse> => {
        try {
            const apiUrl = getApiUrl();
            if (!apiUrl) {
                return {
                    data: { id: 0, message: "API地址未配置" },
                    success: false,
                    errorMsg: "API地址未配置",
                    code: 500,
                };
            }

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (token) {
                headers["token"] = token;
            }

            const response = await fetch(`${apiUrl}${PUBLIC_COMMENT_BASE_PATH}`, {
                method: "POST",
                headers,
                body: JSON.stringify(request),
                signal: AbortSignal.timeout(5000),
            });

            return response.json();
        } catch {
            return {
                data: { id: 0, message: "网络请求失败" },
                success: false,
                errorMsg: "网络请求失败",
                code: 500,
            };
        }
    },
};