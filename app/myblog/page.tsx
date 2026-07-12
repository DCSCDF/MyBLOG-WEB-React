import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminInfoCard } from "@/components/AdminInfoCard";

export default function Blog() {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="relative z-10">
                <div className="flex flex-col items-center">
                    <div className="my-24 w-full max-w-none sm:max-w-4xl">
                        <AdminInfoCard />
                        <div>
                            <div className="mt-10">
                                <Card className="overflow-hidden mx-4 gap-y-0 ring-0">
                                    <CardHeader className="flex-row items-baseline justify-between pb-2">
                                        <div>
                                            <CardTitle className="text-sm">博客</CardTitle>
                                            <CardDescription className="mt-0.5 text-xs">我的开发/生活分享</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-1 py-4 -mx-6 px-6">
                                            <Button size="sm" className="h-7 gap-1.5 text-xs">All <span className="opacity-70">6</span></Button>
                                            {["Engineering", "Design", "Product", "Culture"].map((tag) => (
                                                <Button key={tag} variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                                                    {tag} <span className="opacity-60">{tag === "Engineering" ? 3 : 1}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardContent className="py-4 group gap-y-8 flex flex-col">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="h-5 rounded-full border-red-500/30 text-[10px] text-red-600 dark:text-red-400">置顶</Badge>
                                                <span className="text-[10px] text-muted-foreground">未分类</span>
                                            </div>
                                            <h3 className="mt-3 text-base font-medium leading-snug tracking-tight">How We Rebuilt Our Component Architecture for 10x Scale</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">After hitting performance walls with 200+ components, we redesigned our entire architecture around composition patterns, tree-shaking boundaries, and lazy hydration.</p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {["tag", "React", "Performance"].map((t) => (
                                                    <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-muted-foreground">Engineering</span>
                                            </div>
                                            <h3 className="mt-3 text-base font-medium leading-snug tracking-tight">How We Rebuilt Our Component Architecture for 10x Scale</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">After hitting performance walls with 200+ components, we redesigned our entire architecture around composition patterns, tree-shaking boundaries, and lazy hydration.</p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {[].map((t) => (
                                                    <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="items-center justify-center py-6 bg-transparent border-0">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem><PaginationPrevious href="#"/></PaginationItem>
                                                <PaginationItem className="hidden sm:inline-flex"><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                                                <PaginationItem className="hidden sm:inline-flex"><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                                <PaginationItem className="hidden sm:inline-flex"><PaginationEllipsis/></PaginationItem>
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