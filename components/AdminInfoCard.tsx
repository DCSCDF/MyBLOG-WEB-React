"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Grid} from "@/components/ui/grid-pattern";
import {Badge} from "@/components/ui/badge";
import {AdminInfo} from "@/lib/api/admin.server";

interface AdminInfoCardProps {
    adminInfo: AdminInfo | null;
}

export function AdminInfoCard({adminInfo}: AdminInfoCardProps) {

    return (
        <div className="px-4">
            <h2 className="text-black dark:text-white text-xl font-bold">用户简介</h2>

            <div
                className="relative mx-auto w-full mt-6 bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden">
                <Grid size={20}/>
                {adminInfo ? (
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