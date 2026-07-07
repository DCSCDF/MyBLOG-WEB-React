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
            <div className={"flex flex-col  items-center"}>
                <div className={"my-24 w-2xl"}>
                    <div className={"px-6"}>
                        <div>
                            <h2 className={"text-black dark:text-white text-xl font-bold"}>用户简介</h2>
                        </div>
                        <div className={"mt-6 flex flex-row gap-3"}>
                            <div>
                                <Avatar size={60}>
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <div className={"flex gap-2 items-center"}>
                                    <p className={"text-black dark:text-white text-md font-bold"}>JiuLiu</p>
                                    <Badge variant="secondary">博客作者</Badge>
                                </div>
                                <p className={"text-zinc-500 dark:text-zinc-400"}>
                                    我是一名独立开发者，主要熟悉前后端开发等方面，爱好探险、剪辑、摄影等等，目前正在开发我的博客。
                                </p>
                            </div>
                        </div>
                        <h2 className={"text-zinc-500 mt-10 dark:text-zinc-400 text-xs"}>Recent Posts</h2>

                    </div>
                    <div className={"mt-6"}>


                        <div className={"p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 my-4"}>
                            <div className={"flex items-center gap-2"}>
                                <Badge variant="secondary">分类</Badge> <span
                                className={"text-xs text-zinc-500 dark:text-zinc-400"}>2026/4/12</span>
                            </div>
                            <p className={"mt-1 text-md"}>MYBLOG博客网站项目介绍</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>我的博客网站经过多次迭代，也是伴随着经验的增长，最后决定重构自己的博客。新博客项目经过半年多的开发，大体功能已经完成了，架构三端分离方便维护，剩下的主要还是进行功能打磨</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>By jiuliu</p>
                        </div>

                        <div className={"p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 my-4"}>
                            <div className={"flex items-center gap-2"}>
                                <Badge variant="secondary">分类</Badge> <span
                                className={"text-xs text-zinc-500 dark:text-zinc-400"}>2026/4/12</span>
                            </div>
                            <p className={"mt-1 text-md"}>MYBLOG博客网站项目介绍</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>我的博客网站经过多次迭代，也是伴随着经验的增长，最后决定重构自己的博客。新博客项目经过半年多的开发，大体功能已经完成了，架构三端分离方便维护，剩下的主要还是进行功能打磨</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>By jiuliu</p>
                        </div>

                        <div className={"p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 my-4"}>
                            <div className={"flex items-center gap-2"}>
                                <Badge variant="secondary">分类</Badge> <span
                                className={"text-xs text-zinc-500 dark:text-zinc-400"}>2026/4/12</span>
                            </div>
                            <p className={"mt-1 text-md"}>MYBLOG博客网站项目介绍</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>我的博客网站经过多次迭代，也是伴随着经验的增长，最后决定重构自己的博客。新博客项目经过半年多的开发，大体功能已经完成了，架构三端分离方便维护，剩下的主要还是进行功能打磨</p>
                            <p className={"mt-1 text-sm text-zinc-500"}>By jiuliu</p>
                        </div>


                    </div>


                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#"/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
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
