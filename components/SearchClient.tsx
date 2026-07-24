"use client"

import {useState, useEffect} from "react"
import {Search} from "lucide-react"
import Link from "next/link"
import {useRouter, useSearchParams} from "next/navigation"

import {Button} from "@/components/ui/button"
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import type {Article} from "@/lib/api/article.server"
import {articleApi} from "@/lib/api/article"

export function SearchClient() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [inputValue, setInputValue] = useState(searchParams.get("keyword") || "")
    const [articles, setArticles] = useState<Article[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)

    const keyword = searchParams.get("keyword") || ""

    const currentPage = (() => {
        const page = searchParams.get("page")
        if (page !== null) {
            return parseInt(page, 10)
        }
        return 1
    })()

    useEffect(() => {
        const fetchArticles = async () => {
            if (!keyword.trim()) {
                setArticles([])
                setTotalPages(0)
                return
            }

            setLoading(true)
            try {
                const result = await articleApi.getPublicArticleList({
                    currentPage,
                    pageSize: 6,
                    keyword: keyword,
                })
                if (result) {
                    setArticles(result.records)
                    setTotalPages(result.pages)
                } else {
                    setArticles([])
                    setTotalPages(0)
                }
            } catch {
                setArticles([])
                setTotalPages(0)
            } finally {
                setLoading(false)
            }
        }

        fetchArticles().then()
    }, [currentPage, keyword])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        updateUrlParams(1, inputValue)
    }

    const handleClear = () => {
        setInputValue("")
        updateUrlParams(1, "")
    }

    const updateUrlParams = (newPage: number, keywordValue: string) => {
        const params = new URLSearchParams()
        if (keywordValue.trim()) {
            params.set("keyword", keywordValue.trim())
        }
        if (newPage > 1) {
            params.set("page", newPage.toString())
        }
        router.push(`/search?${params.toString()}`, {scroll: false})
    }

    const handlePageChange = (page: number) => {
        if (page === currentPage) return
        updateUrlParams(page, keyword)
    }

    const getPageUrl = (page: number): string => {
        const params = new URLSearchParams()
        if (keyword.trim()) {
            params.set("keyword", keyword.trim())
        }
        if (page > 1) {
            params.set("page", page.toString())
        }
        return params.toString()
    }

    const splitTags = (tags: string) => {
        if (!tags) return []
        return [...new Set(tags.split(",").filter((tag) => tag.trim()))]
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <section className="mt-24 px-4 py-4">
            <div className="max-w-4xl mx-auto">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Field className="gap-3">
                        <FieldLabel htmlFor="search">检索文章</FieldLabel>
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>
                            <Input
                                type="search"
                                id="search"
                                name="search"
                                placeholder=""
                                className="h-9 pl-9 pr-9"
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                        </div>
                        <FieldDescription>输入关键词搜索文章、分类、标签......</FieldDescription>
                    </Field>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={handleClear}
                            disabled={!inputValue.trim()}
                        >
                            清空
                        </Button>
                        <Button type="submit" size="lg" disabled={!inputValue.trim()}>
                            搜索
                        </Button>
                    </div>
                </form>


                <div className="mt-10">
                    {keyword.trim() ? (
                        <div className="mb-6 font-medium text-sm">
                            <h1>搜索 {keyword} 共 {articles.length} 篇文章</h1>
                        </div>
                    ) : (
                        <div className="mb-6 font-medium text-sm text-muted-foreground">
                            <h1></h1>
                        </div>
                    )}

                    <div className="gap-y-8 flex flex-col">
                        {loading ? (
                            Array.from({length: 6}).map((_, i) => (
                                <div key={i} className="group flex flex-col justify-between bg-card p-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <div className="h-4 w-16 bg-muted rounded animate-pulse"/>
                                            <div className="h-4 w-4 bg-muted rounded-full animate-pulse"/>
                                        </div>
                                        <div className="mt-2 h-5 w-3/4 bg-muted rounded animate-pulse"/>
                                        <div className="mt-1.5 h-4 w-full bg-muted rounded animate-pulse"/>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            <div className="h-4 w-12 bg-muted rounded-md animate-pulse"/>
                                            <div className="h-4 w-10 bg-muted rounded-md animate-pulse"/>
                                        </div>
                                        <div className="flex items-center justify-between border-t pt-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 bg-muted rounded-full animate-pulse"/>
                                                <div className="h-3 w-20 bg-muted rounded animate-pulse"/>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-16 bg-muted rounded animate-pulse"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : articles.length === 0 && keyword.trim() ? (
                            <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
                                没有文章
                            </div>
                        ) : articles.length > 0 ? (
                            articles.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/article/${post.id}`}
                                    className="group flex flex-col justify-between bg-card p-5 cursor-pointer transition-colors hover:bg-muted/50"
                                >
                                    <div>
                                        <div className="flex items-center uppercase gap-2">
                                            {post.isTop && (
                                                <Badge
                                                    variant="outline"
                                                    className="h-5 rounded-full border-red-500/30 text-[10px] text-red-600 dark:text-red-400"
                                                >
                                                    置顶
                                                </Badge>
                                            )}
                                            <span className="text-[10px] text-muted-foreground">
                                                {post.categoryName || "未分类"}
                                            </span>
                                        </div>
                                        <h3 className="mt-3 text-base font-medium leading-snug tracking-tight">
                                            {post.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                            {post.summary}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {splitTags(post.tags).map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-muted-foreground">
                                                {post.authorNickname || "Unknown"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                            <span>{formatDate(post.createTime)}</span>
                                            <span className="size-0.5 rounded-full bg-muted-foreground/40"/>
                                            <span>{post.commentCount} comments</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : null}

                        {totalPages > 1 && (
                            <div className="mt-10">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={`/search?${getPageUrl(Math.max(1, currentPage - 1))}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (currentPage > 1) handlePageChange(currentPage - 1)
                                                }}
                                            />
                                        </PaginationItem>
                                        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page}
                                                            className={page === currentPage ? "" : "hidden sm:inline-flex"}>
                                                <PaginationLink
                                                    href={`/search?${getPageUrl(page)}`}
                                                    isActive={page === currentPage}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handlePageChange(page)
                                                    }}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <PaginationNext
                                                href={`/search?${getPageUrl(Math.min(totalPages, currentPage + 1))}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                                }}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}