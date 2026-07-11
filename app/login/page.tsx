"use client";

import {useEffect, useState, useCallback, useRef} from "react";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {Spinner} from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";
import {
    performLogin,
    handleLogout,
    handleBack,
    redirectToAdmin,
    LoginParams,
} from "@/lib/auth/login";
import {IconAlertCircle} from "@tabler/icons-react";

type PageState = "loading" | "error" | "success";

export default function LoginPage() {
    const [pageState, setPageState] = useState<PageState>("loading");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const loginParamsRef = useRef<LoginParams | null>(null);

    const handleLogin = useCallback(async (params: LoginParams) => {
        setPageState("loading");
        setErrorMessage("");

        const result = await performLogin(params);

        if (result.success && result.redirectUrl) {
            setPageState("success");
            window.location.href = result.redirectUrl;
        } else {
            setPageState("error");
            setErrorMessage(result.error || "登录失败");
        }
    }, []);

    const handleRetry = useCallback(() => {
        if (loginParamsRef.current) {
            handleLogin(loginParamsRef.current).then();
        }
    }, [handleLogin]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get("logout") === "true") {
            handleLogout();
            return;
        }

        if (urlParams.get("back") === "true") {
            handleBack();
            return;
        }

        const code = urlParams.get("code");
        const redirectUrl = urlParams.get("redirect_url");
        const remember = urlParams.get("remember") === "true";

        if (code && redirectUrl) {
            const params: LoginParams = {
                code,
                redirectUrl,
                remember,
            };
            loginParamsRef.current = params;
            setTimeout(() => {
                handleLogin(params).then();
            }, 0);
        } else {
            redirectToAdmin();
        }
    }, [handleLogin]);

    const renderContent = () => {
        switch (pageState) {
            case "loading":
                return (
                    <Empty className="w-full">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Spinner/>
                            </EmptyMedia>
                            <EmptyTitle>正在处理登录</EmptyTitle>
                            <EmptyDescription>
                                请稍候，我们正在验证您的身份，不要刷新页面。
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                );

            case "error":
                return (
                    <Empty className="w-full">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <IconAlertCircle className="text-red-500"/>
                            </EmptyMedia>
                            <EmptyTitle>登录失败</EmptyTitle>
                            <EmptyDescription>{errorMessage}</EmptyDescription>
                        </EmptyHeader>
                        <div className="mt-4 flex flex-row gap-2">
                            <Button onClick={handleRetry} variant="outline" size="sm">
                                重试
                            </Button>
                            <Button onClick={handleBack} variant="ghost" size="sm">
                                返回首页
                            </Button>
                        </div>
                    </Empty>
                );

            case "success":
                return (
                    <Empty className="w-full">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Spinner/>
                            </EmptyMedia>
                            <EmptyTitle>登录成功</EmptyTitle>
                            <EmptyDescription>正在跳转...</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                );

            default:
                return null;
        }
    };

    return (
        <section className="mt-24 flex flex-col items-center justify-center mt-[30vh]">
            {renderContent()}
        </section>
    );
}
