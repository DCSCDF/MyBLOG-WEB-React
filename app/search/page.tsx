"use client"

import React, {useState} from "react"
import {Search} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge";
// import {Separator} from "@/components/ui/separator";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export default function SearchPage() {
    const [query, setQuery] = useState("")

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <section className="mt-24 px-4 py-4 flex justify-center md:mx-8">
            <div className={"flex flex-col"}>
                <form className="space-y-6 w-full  max-w-4xl" onSubmit={handleSubmit}>
                    <Field className="gap-3">
                        <FieldLabel htmlFor="search">检索文章</FieldLabel>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>
                            <Input
                                type="search"
                                id="search"
                                name="search"
                                placeholder="search"
                                className="h-9 pl-9 pr-9"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </div>
                        <FieldDescription>输入关键词来搜索文章、分类、标签...</FieldDescription>
                    </Field>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={() => setQuery("")}
                        >
                            清空
                        </Button>
                        <Button type="submit" size="lg">
                            搜索
                        </Button>
                    </div>
                </form>


                <div className={"max-w-4xl mt-10"}>

                    <div className={"mb-6 font-medium text-sm"}>
                        <h1>123 的搜索结果 :</h1>
                    </div>


                    <div className={"gap-y-8 flex flex-col"}>
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

                        <div className={"mt-10"}>
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
                </div>
            </div>

        </section>
    )
}