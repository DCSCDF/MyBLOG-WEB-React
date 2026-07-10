// import {cn} from "@/lib/utils"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
// import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Grid} from "@/components/ui/grid-pattern";
// import {Button} from "@base-ui/react";+-
// import {TextHoverEffect} from "@/components/ui/text-hover-effect"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {Separator} from "@/components/ui/separator"

export default function Blog() {
    return (
        <section className="relative min-h-screen overflow-hidden">


            {/*<div*/}
            {/*    className={cn(*/}
            {/*        "absolute inset-0 -z-10 pointer-events-none",*/}
            {/*        "[background-size:20px_20px]",*/}
            {/*        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",*/}
            {/*        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",*/}
            {/*    )}*/}
            {/*/>*/}
            {/*<div*/}
            {/*    className="pointer-events-none absolute inset-0 -z-10 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>*/}

            {/*<div className="absolute inset-0 z-0 opacity-40">*/}
            {/*    <div className="absolute top-[24%] w-full">*/}
            {/*        <div className="mx-[-1%] sm:mx-0">*/}
            {/*            <TextHoverEffect text="JIULIU"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}


            <div className="relative z-10">
                <div className="flex flex-col items-center">
                    <div className="my-24 w-full max-w-none sm:max-w-4xl">


                        <div className="px-4">
                            <h2 className="text-black dark:text-white text-xl font-bold">用户简介</h2>

                            <div
                                className="relative mx-auto w-full mt-6 bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden">
                                <Grid size={20}/>
                                <div className="flex flex-col sm:flex-row gap-3 relative z-20">
                                    <div className="shrink-0">
                                        <Avatar size={60}>
                                            <AvatarImage src="https://github.com/shadcn.png"/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex gap-2 items-center flex-wrap">
                                            <p className="text-black dark:text-white text-md font-bold">JiuLiu</p>
                                            <Badge variant="secondary">博客作者</Badge>
                                        </div>
                                        <p className="text-neutral-500 text-sm dark:text-neutral-400 mt-2"> 我是一名独立开发者，主要熟悉前后端开发等方面，爱好探险、剪辑、摄影等等，目前正在开发我的博客。</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>

                            {/*<h2 className="text-neutral-500 mb-6 px-4 sm:px-6 mt-8 sm:mt-10 dark:text-neutral-400 text-xs">Recent*/}
                            {/*    Posts*/}
                            {/*</h2>*/}


                            {/*<div className="flex gap-4 px-6 py-4 hover:bg-muted/50">*/}
                            {/*    <div className="min-w-0 flex-1">*/}
                            {/*        <div className="flex items-center gap-2">*/}
                            {/*            <Badge variant="secondary">分类</Badge>*/}
                            {/*            <span className="text-sm text-muted-foreground">2026-10-01</span>*/}
                            {/*        </div>*/}
                            {/*        <h3 className="mt-1 text-md font-medium">MYBLOG项目介绍</h3>*/}
                            {/*        <p className="mt-1 text-sm text-muted-foreground">我的博客网站经过多次迭代，也是伴随着经验的增长，最后决定重构自己的博客。新博客项目经过半年多的开发，大体功能已经完成了，架构三端分离方便维护，剩下的主要还是进行功能打磨</p>*/}
                            {/*        <div className="mt-2">*/}
                            {/*            <span*/}
                            {/*                className="text-sm text-muted-foreground">read more</span></div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}


                            <div className={"mt-20"}>
                                <Card className="overflow-hidden mx-4 gap-y-0">
                                    <CardHeader className="flex-row items-baseline justify-between pb-4">
                                        <div>
                                            <CardTitle className="text-sm">博客</CardTitle>
                                            <CardDescription className="mt-0.5 text-xs">
                                                我的开发/生活分享
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>

                                        <div className="flex items-center gap-1 border-t py-4 -mx-6 px-6">
                                            <Button size="sm" className="h-7 gap-1.5 text-xs">
                                                All <span className="opacity-70">6</span>
                                            </Button>
                                            {["Engineering", "Design", "Product", "Culture"].map((tag) => (
                                                <Button
                                                    key={tag}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                                                >
                                                    {tag}{" "}
                                                    <span className="opacity-60">
                                                        {tag === "Engineering" ? 3 : 1}
                                                    </span>
                                                </Button>
                                            ))}
                                        </div>

                                    </CardContent>

                                    <CardContent className="px-6 py-3 group gap-y-6 flex flex-col border-t">

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="h-5 rounded-full border-red-500/30
                                                 text-[10px] text-red-600 dark:text-red-400">
                                                    置顶
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground">
                                                未分类
                                            </span>
                                            </div>
                                            <h3 className="mt-3 text-base font-medium leading-snug tracking-tight">
                                                How We Rebuilt Our Component Architecture for 10x Scale
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                After hitting performance walls with 200+ components, we redesigned
                                                our entire architecture around composition patterns, tree-shaking
                                                boundaries, and lazy hydration.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {["tag", "React", "Performance"].map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                                    {t}
                                                </span>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator/>


                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-muted-foreground">
                                                Engineering
                                            </span>
                                            </div>
                                            <h3 className="mt-3 text-base font-medium leading-snug tracking-tight">
                                                How We Rebuilt Our Component Architecture for 10x Scale
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                After hitting performance walls with 200+ components, we redesigned
                                                our entire architecture around composition patterns, tree-shaking
                                                boundaries, and lazy hydration.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {[].map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                                    {t}
                                                </span>
                                                ))}
                                            </div>
                                        </div>

                                    </CardContent>
                                    <CardFooter className={"items-center justify-center py-6 bg-transparent"}>

                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem><PaginationPrevious href="#"/></PaginationItem>
                                                <PaginationItem className="hidden sm:inline-flex"><PaginationLink
                                                    href="#">1</PaginationLink></PaginationItem>
                                                <PaginationItem><PaginationLink href="#"
                                                                                isActive>2</PaginationLink></PaginationItem>
                                                <PaginationItem className="hidden sm:inline-flex"><PaginationLink
                                                    href="#">3</PaginationLink></PaginationItem>
                                                <PaginationItem
                                                    className="hidden sm:inline-flex"><PaginationEllipsis/></PaginationItem>
                                                <PaginationItem><PaginationNext href="#"/></PaginationItem>
                                            </PaginationContent>
                                        </Pagination>

                                    </CardFooter>
                                </Card>


                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}
