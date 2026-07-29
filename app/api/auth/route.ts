import { NextRequest, NextResponse } from "next/server";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getApiUrlServer } from "@/lib/env";

const TOKEN_COOKIE_NAME = "blog_token";
const REMEMBER_COOKIE_NAME = "blog_remember";

const getApiBase = (): string => {
    const apiUrl = getApiUrlServer();
    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }
    return apiUrl.replace(/\/$/, "");
};

const isHttpsProxy = (req: NextRequest): boolean => {
    const proto = req.headers.get("x-forwarded-proto");
    if (proto) {
        return proto.split(",")[0].trim() === "https";
    }
    return req.nextUrl.protocol === "https:";
};

const buildCookieOptions = (req: NextRequest, remember: boolean): Partial<ResponseCookie> => {
    const secure = isHttpsProxy(req);
    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
    return {
        path: "/",
        httpOnly: true,
        secure,
        sameSite: "lax",
        maxAge,
    };
};

const buildClearCookieOptions = (req: NextRequest): Partial<ResponseCookie> => {
    const secure = isHttpsProxy(req);
    return {
        path: "/",
        httpOnly: true,
        secure,
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
    };
};

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");

        if (action === "logout") {
            const response = NextResponse.json(
                { success: true },
                { status: 200 }
            );
            response.cookies.set(TOKEN_COOKIE_NAME, "", buildClearCookieOptions(req));
            response.cookies.set(REMEMBER_COOKIE_NAME, "", buildClearCookieOptions(req));
            return response;
        }

        if (action === "profile") {
            const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
            if (!token) {
                return NextResponse.json(
                    {
                        success: false,
                        code: 401,
                        message: "未登录",
                        errorMsg: "未登录或登录已过期",
                    },
                    { status: 200 }
                );
            }

            const apiBase = getApiBase();
            const upstream = await fetch(`${apiBase}/api/auth/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                body: JSON.stringify({}),
            });

            const data = await upstream.json();
            const response = NextResponse.json(data, { status: upstream.status });

            if (data?.code === 401) {
                response.cookies.set(TOKEN_COOKIE_NAME, "", buildClearCookieOptions(req));
                response.cookies.set(REMEMBER_COOKIE_NAME, "", buildClearCookieOptions(req));
            }

            return response;
        }

        const body = await req.json().catch(() => ({}));
        const code = body?.code;
        const remember = Boolean(body?.remember);

        if (!code) {
            return NextResponse.json(
                { success: false, message: "缺少 code", errorMsg: "缺少 code" },
                { status: 400 }
            );
        }

        const apiBase = getApiBase();
        const upstream = await fetch(`${apiBase}/api/auth/oauth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, remember }),
        });

        const data = await upstream.json();

        if (data?.success && data?.data?.token) {
            const token = data.data.token;
            const response = NextResponse.json(data, { status: upstream.status });
            const cookieOptions = buildCookieOptions(req, remember);
            response.cookies.set(TOKEN_COOKIE_NAME, token, cookieOptions);
            response.cookies.set(REMEMBER_COOKIE_NAME, remember ? "true" : "false", {
                ...cookieOptions,
                maxAge: remember ? cookieOptions.maxAge : 0,
                expires: remember ? undefined : new Date(0),
            });

            return response;
        }

        return NextResponse.json(data, { status: upstream.status });
    } catch (err) {
        const message = err instanceof Error ? err.message : "代理请求失败";
        return NextResponse.json(
            { success: false, message, errorMsg: message },
            { status: 500 }
        );
    }
}
