// import {cn} from "@/lib/utils";
"use client";
// import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";
import Link from "next/link";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

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


                <div
                    className={"max-w-2xl rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 p-3 w-full m-3 flex flex-row justify-between"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <img className={"rounded-md"} width={60} height={60} src="https://github.com/shadcn.png"
                             alt="Name"/>
                        <div>
                            <h3 className={"text-md font-bold"}>Name</h3>
                            <p className={"text-sm text-neutral-600 dark:text-neutral-400"}>2312373154815@qq.cun</p>
                        </div>
                    </div>
                    <div className={"flex items-center"}>
                        <Link href={""}>
                            <p className={"py-1 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-md text-center dark:text-neutral-200 text-neutral-800"}>查看</p>
                        </Link>
                    </div>
                </div>

                <div
                    className={"max-w-2xl rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 p-3 w-full m-3 flex flex-row justify-between"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <img className={"rounded-md"} width={60} height={60} src="https://github.com/shadcn.png"
                             alt="Name"/>
                        <div>
                            <h3 className={"text-md font-bold"}>Name</h3>
                            <p className={"text-sm text-neutral-600 dark:text-neutral-400"}>2312373154815@qq.cun</p>
                        </div>
                    </div>
                    <div className={"flex items-center"}>
                        <Link href={""}>
                            <p className={"py-1 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-md text-center dark:text-neutral-200 text-neutral-800"}>查看</p>
                        </Link>
                    </div>
                </div>
                <div
                    className={"max-w-2xl rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 p-3 w-full m-3 flex flex-row justify-between"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <img className={"rounded-md"} width={60} height={60} src="https://github.com/shadcn.png"
                             alt="Name"/>
                        <div>
                            <h3 className={"text-md font-bold"}>Name</h3>
                            <p className={"text-sm text-neutral-600 dark:text-neutral-400"}>2312373154815@qq.cun</p>
                        </div>
                    </div>
                    <div className={"flex items-center"}>
                        <Link href={""}>
                            <p className={"py-1 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-md text-center dark:text-neutral-200 text-neutral-800"}>查看</p>
                        </Link>
                    </div>
                </div>
                <div
                    className={"max-w-2xl rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 p-3 w-full m-3 flex flex-row justify-between"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <img className={"rounded-md"} width={60} height={60} src="https://github.com/shadcn.png"
                             alt="Name"/>
                        <div>
                            <h3 className={"text-md font-bold"}>Name</h3>
                            <p className={"text-sm text-neutral-600 dark:text-neutral-400"}>2312373154815@qq.cun</p>
                        </div>
                    </div>
                    <div className={"flex items-center"}>
                        <Link href={""}>
                            <p className={"py-1 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-md text-center dark:text-neutral-200 text-neutral-800"}>查看</p>
                        </Link>
                    </div>
                </div>
                <div
                    className={"max-w-2xl rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 p-3 w-full m-3 flex flex-row justify-between"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <img className={"rounded-md"} width={60} height={60} src="https://github.com/shadcn.png"
                             alt="Name"/>
                        <div>
                            <h3 className={"text-md font-bold"}>Name</h3>
                            <p className={"text-sm text-neutral-600 dark:text-neutral-400"}>2312373154815@qq.cun</p>
                        </div>
                    </div>
                    <div className={"flex items-center"}>
                        <Link href={""}>
                            <p className={"py-1 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-md text-center dark:text-neutral-200 text-neutral-800"}>查看</p>
                        </Link>
                    </div>
                </div>

                <div className="px-4 sm:px-0 py-10">
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
                </div>
            </div>


        </section>


    )
}