// import {cn} from "@/lib/utils";
"use client";
// import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";
// import Link from "next/link";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {
    Card,
    CardContent, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
// import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"


const writers = [
    {
        id: 1,
        name: "Sarah Chen",
        initials: "SC",
        role: "123452346@qq.com",
        posts: 24,
        bio: "Writes about React architecture, performance optimization, and developer tooling.",
    },
    {
        id: 2,
        name: "Marcus Rivera",
        initials: "MR",
        role: "123452346@qq.com",
        posts: 18,
        bio: "Covers design systems, CSS techniques, and the intersection of design and code.",
    },
    {
        id: 3,
        name: "Aisha Patel",
        initials: "AP",
        role: "123452346@qq.com",
        posts: 31,
        bio: "Focuses on backend architecture, database patterns, and infrastructure at scale.",
    },
]

export default function blogUserList() {
    // const words = [
    //     {
    //         text: "在这里查看发表文章的",
    //     },
    //     {
    //         text: "用户.",
    //         className: "text-blue-500 dark:text-blue-500",
    //     },
    // ];
    return (
        <section className={"mt-24"}>
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

            {/*<div className="flex flex-col items-center justify-center mt-20 ">*/}
            {/*    /!*<p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base ">*!/*/}
            {/*    /!*    The road to freedom starts from here*!/*/}
            {/*    /!*</p>*!/*/}
            {/*    <TypewriterEffectSmooth words={words}/>*/}
            {/*    /!*<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">*!/*/}
            {/*    /!*    <button*!/*/}
            {/*    /!*        className="w-32 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">*!/*/}
            {/*    /!*        加入我们*!/*/}
            {/*    /!*    </button>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}

            <div className={"flex items-center justify-center flex-col mx-3"}>


                {/*<div*/}
                {/*    className={"max-w-2xl rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 p-3 w-full m-3 flex flex-row justify-between"}>*/}
                {/*    <div className={"flex flex-row gap-3 items-center"}>*/}
                {/*        <img className={"rounded-md"} width={60} height={60} src="https://github.com/shadcn.png"*/}
                {/*             alt="Name"/>*/}
                {/*        <div>*/}
                {/*            <h3 className={"text-md font-bold"}>Name</h3>*/}
                {/*            <p className={"text-sm text-neutral-600 dark:text-neutral-400"}>2312373154815@qq.cun</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={"flex items-center"}>*/}
                {/*        <Link href={""}>*/}
                {/*            <p className={"py-1 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-md text-center dark:text-neutral-200 text-neutral-800"}>查看</p>*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <Card className={"gap-y-0 w-full max-w-4xl ring-0 bg-transparent"}>
                    <CardHeader className="px-6 pb-10">
                        <CardTitle className="text-xl font-semibold tracking-tight">
                            用户
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            可以查看所有文章作者用户
                        </p>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 p-0">
                        {writers.map((writer,) => {


                            return (
                                <div
                                    key={writer.id}
                                    className="px-6 py-4 transition-colors hover:bg-muted/50"
                                >
                                    {/* 头像 + 基本信息 */}
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-10">
                                            <AvatarFallback>
                                                {writer.initials}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0">
                                            <span className="text-sm font-medium">
                                              {writer.name}
                                            </span>

                                            <div
                                                className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{writer.role}</span>
                                                <Separator orientation="vertical" className="h-4"/>
                                                <span>{writer.posts} 篇文章</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                                        {/*{writer.bio}*/}
                                    </p>
                                </div>
                            )
                        })}
                    </CardContent>
                    <CardFooter className={"py-10 bg-transparent border-0"}>
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


        </section>


    )
}