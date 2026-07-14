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
};