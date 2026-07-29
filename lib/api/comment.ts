"use client";

import { getApiUrl } from "@/lib/env";
import type { CommentVO, CommentListResponse, SubmitCommentRequest, SubmitCommentResponse } from "@/lib/types";

const PUBLIC_COMMENT_BASE_PATH = "/api/public/comment";

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

            if (!response.ok) {
                return null;
            }

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
    ): Promise<SubmitCommentResponse> => {
        try {
            const response = await fetch(`/api/comment`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                return {
                    data: { id: 0, message: `请求失败: ${response.status}` },
                    success: false,
                    errorMsg: `请求失败: ${response.status}`,
                    code: response.status,
                };
            }

            let result: SubmitCommentResponse;
            try {
                result = await response.json();
            } catch {
                return {
                    data: { id: 0, message: "响应解析失败" },
                    success: false,
                    errorMsg: "响应解析失败",
                    code: 500,
                };
            }

            if (result.success === undefined || result.success === null) {
                return {
                    data: { id: result.data?.id || 0, message: result.data?.message || "提交成功" },
                    success: true,
                    errorMsg: null,
                    code: result.code || 200,
                };
            }

            return result;
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