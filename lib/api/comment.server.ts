import {getApiUrlServer} from "@/lib/env";
import type {CommentVO, CommentListResponse} from "@/lib/types";

const PUBLIC_COMMENT_BASE_PATH = "/api/public/comment";

export const getCommentListServer = async (blogId: number): Promise<CommentVO[] | null> => {
    try {
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return null;
        }

        const fullUrl = `${apiUrl}${PUBLIC_COMMENT_BASE_PATH}/list/${blogId}`;

        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
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
};