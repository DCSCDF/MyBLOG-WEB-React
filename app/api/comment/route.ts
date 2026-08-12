import { NextRequest, NextResponse } from "next/server";
import { getApiUrlServer } from "@/lib/env";

const TOKEN_COOKIE_NAME = "blog_token";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
        const body = await req.json();
        const apiUrl = getApiUrlServer();
        if (!apiUrl) {
            return NextResponse.json(
                {
                    data: { id: 0, message: "API地址未配置" },
                    success: false,
                    errorMsg: "API地址未配置",
                    code: 500,
                },
                { status: 500 }
            );
        }

        const apiBase = apiUrl.replace(/\/$/, "");
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers.token = token;
        }
        const upstream = await fetch(`${apiBase}/api/public/comment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        const data = await upstream.json();
        return NextResponse.json(data, { status: upstream.status });
    } catch (err) {
        const message = err instanceof Error ? err.message : "评论提交失败";
        return NextResponse.json(
            {
                data: { id: 0, message },
                success: false,
                errorMsg: message,
                code: 500,
            },
            { status: 500 }
        );
    }
}
