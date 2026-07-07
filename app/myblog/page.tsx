import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function Blog() {
    return (
        <section>
            <div className={"flex flex-col items-center"}>
                <div className={"my-12 sm:my-24 w-full max-w-none sm:max-w-2xl"}>
                    <div className={"px-4 sm:px-6"}>
                        <div>
                            <h2 className={"text-black dark:text-white text-xl font-bold"}>用户简介</h2>
                        </div>
                        <div className={"mt-6 flex flex-col sm:flex-row gap-3"}>
                            <div className="flex-shrink-0">
                                <Avatar size={60}>
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={"flex gap-2 items-center flex-wrap"}>
                                    <p className={"text-black dark:text-white text-md font-bold"}>JiuLiu</p>
                                    <Badge variant="secondary">博客作者</Badge>
                                </div>
                                <p className={"text-zinc-500 dark:text-zinc-400 mt-2"}>
                                    我是一名独立开发者，主要熟悉前后端开发等方面，爱好探险、剪辑、摄影等等，目前正在开发我的博客。
                                </p>
                            </div>
                        </div>
                        <h2 className={"text-zinc-500 mt-8 sm:mt-10 dark:text-zinc-400 text-xs"}>Recent Posts</h2>

                    </div>
                    <div className={"mt-6"}>


                        <div className={"p-4 sm:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 my-4 mx-4 sm:mx-0"}>
                            <div className={"flex items-center gap-2 flex-wrap"}>
                                <Badge variant="secondary">分类</Badge>
                                <span className={"text-xs text-zinc-500 dark:text-zinc-400"}>2026/4/12</span>
                            </div>
                            <p className={"mt-1 text-md"}>MYBLOG博客网站项目介绍</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>我的博客网站经过多次迭代，也是伴随着经验的增长，最后决定重构自己的博客。新博客项目经过半年多的开发，大体功能已经完成了，架构三端分离方便维护，剩下的主要还是进行功能打磨</p>
                            <p className=" pt-2 flex items-center text-zinc-500">Read more
                                <span className="mt-0.75 ">
                                    <svg className="relative mt-px overflow-visible ml-2.5 text-zinc-500" fill="none"
                                        height="6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" viewBox="0 0 3 6" width="3"><path d="M0 0L3 3L0 6"></path>
                                    </svg>
                                </span>
                            </p>
                        </div>

                        <div className={"p-4 sm:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 my-4 mx-4 sm:mx-0"}>
                            <div className={"flex items-center gap-2 flex-wrap"}>
                                <Badge variant="secondary">分类</Badge>
                                <span className={"text-xs text-zinc-500 dark:text-zinc-400"}>2026/4/12</span>
                            </div>
                            <p className={"mt-1 text-md"}>MYBLOG博客网站项目介绍</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>我的博客网站经过多次迭代，也是伴随着经验的增长，最后决定重构自己的博客。新博客项目经过半年多的开发，大体功能已经完成了，架构三端分离方便维护，剩下的主要还是进行功能打磨</p>

                        </div>

                        <div className={"p-4 sm:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 my-4 mx-4 sm:mx-0"}>
                            <div className={"flex items-center gap-2 flex-wrap"}>
                                <Badge variant="secondary">分类</Badge>
                                <span className={"text-xs text-zinc-500 dark:text-zinc-400"}>2026/4/12</span>
                            </div>
                            <p className={"mt-1 text-md"}>MYBLOG博客网站项目介绍</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>我的博客网站经过多次迭代，也是伴随着经验的增长，最后决定重构自己的博客。新博客项目经过半年多的开发，大体功能已经完成了，架构三端分离方便维护，剩下的主要还是进行功能打磨</p>

                        </div>


                    </div>


                    <div className="px-4 sm:px-0">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#"/>
                                </PaginationItem>
                                <PaginationItem className="hidden sm:inline-flex">
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem className="hidden sm:inline-flex">
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem className="hidden sm:inline-flex">
                                    <PaginationEllipsis/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#"/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>


                </div>
            </div>
        </section>
    );
}
