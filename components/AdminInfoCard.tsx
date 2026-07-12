"use client";

import {useState, useEffect} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Grid} from "@/components/ui/grid-pattern";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import {adminApi, AdminInfo} from "@/lib/api/admin";

// import {getApiUrl} from "@/lib/env";

export function AdminInfoCard() {
    const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdminInfo = async () => {
            try {
                // const apiUrl = `${getApiUrl()}${PUBLIC_ADMIN_BASE_PATH}/info`;
                // console.log("Requesting admin info from:", apiUrl);
                const response = await adminApi.getAdminInfo();
                // console.log("Admin API Response:", response);
                // console.log("response.success:", response.success);
                // console.log("response.data:", response.data);
                if (response.success && response.data) {
                    setAdminInfo(response.data);
                    setError(null);
                } else {
                    setError(response.errorMsg || "获取信息失败");
                    // console.log("API success false or data null");
                }
            } catch (err) {
                setError("网络请求失败");
                console.error("Failed to fetch admin info:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminInfo().then();
    }, []);

    return (
        <div className="px-4">
            <h2 className="text-black dark:text-white text-xl font-bold">用户简介</h2>

            <div
                className="relative mx-auto w-full mt-6 bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden">
                <Grid size={20}/>
                {loading ? (
                    <div className="flex flex-col sm:flex-row gap-3 relative z-20">
                        <div className="shrink-0">
                            <Skeleton className="w-[60px] h-[60px] rounded-full"/>
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-20 h-5"/>
                                <Skeleton className="w-16 h-5"/>
                            </div>
                            <Skeleton className="w-full h-4"/>
                            <Skeleton className="w-3/4 h-4"/>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-24 relative z-20">
                        <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
                    </div>
                ) : adminInfo ? (
                    <div className="flex flex-col sm:flex-row gap-3 relative z-20">
                        <div className="shrink-0">
                            <Avatar size={60}>
                                {adminInfo.avatarUrl && <AvatarImage src={adminInfo.avatarUrl}/>}
                                <AvatarFallback>{adminInfo.nickname.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex gap-2 items-center flex-wrap">
                                <p className="text-black dark:text-white text-md font-bold">{adminInfo.nickname}</p>
                                <Badge variant="secondary">博客作者</Badge>
                            </div>
                            <p className="text-neutral-500 text-sm dark:text-neutral-400 mt-2">{adminInfo.bio}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row gap-3 relative z-20">
                        <div className="shrink-0">
                            <Avatar size={60}>
                                <AvatarFallback>J</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex gap-2 items-center flex-wrap">
                                <p className="text-black dark:text-white text-md font-bold">JiuLiu</p>
                                <Badge variant="secondary">博客作者</Badge>
                            </div>
                            <p className="text-neutral-500 text-sm dark:text-neutral-400 mt-2">我是一名独立开发者，主要熟悉前后端开发等方面，爱好探险、剪辑、摄影等等，目前正在开发我的博客。</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}