"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeleton() {
    return (
        <div className="flex items-center gap-1 py-4 -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-7 w-14 rounded-md" />
            <Skeleton className="h-7 w-18 rounded-md" />
            <Skeleton className="h-7 w-12 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-7 w-20 rounded-md" />
        </div>
    );
}

export function ArticleListSkeleton() {
    return (
        <div className="flex flex-col divide-y divide-border">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="py-6 first:pt-0">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-12 rounded-full" />
                        <Skeleton className="h-4 w-20 rounded" />
                        <Skeleton className="h-4 w-24 rounded" />
                    </div>
                    <Skeleton className="mt-3 h-6 w-3/4 rounded" />
                    <Skeleton className="mt-2 h-4 w-full rounded" />
                    <Skeleton className="mt-1 h-4 w-5/6 rounded" />
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        <Skeleton className="h-5 w-12 rounded-md" />
                        <Skeleton className="h-5 w-16 rounded-md" />
                        <Skeleton className="h-5 w-10 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
}