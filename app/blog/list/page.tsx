// // import {cn} from "@/lib/utils";
// // import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";
// import {
//     Pagination,
//     PaginationContent, PaginationEllipsis,
//     PaginationItem,
//     PaginationLink, PaginationNext,
//     PaginationPrevious
// } from "@/components/ui/pagination";
//
// export default function blogList() {
//
//     return (
//         <section className={"mt-24"}>
//             {/*<div*/}
//             {/*    className={cn(*/}
//             {/*        "absolute inset-0 -z-10 pointer-events-none",*/}
//             {/*        "[background-size:20px_20px]",*/}
//             {/*        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",*/}
//             {/*        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",*/}
//             {/*    )}*/}
//             {/*/>*/}
//             {/*<div*/}
//             {/*    className="pointer-events-none absolute inset-0 -z-10 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>*/}
//
//             <div className="mx-auto w-full max-w-4xl p-4">
//                 <div className="overflow-hidden rounded-lg">
//
//                     {/*<div className=" px-6 py-5">*/}
//                     {/*    <h2 className="font-semibold text-xl tracking-tight">*/}
//                     {/*        用户文章*/}
//                     {/*    </h2>*/}
//                     {/*</div>*/}
//
//
//                     <div className="flex gap-4 px-6 py-4 transition-colors hover:bg-muted/50 ">
//                         <div className="min-w-0 flex-1">
//                             <div className="flex items-center gap-2"><span data-slot="badge" data-variant="secondary"
//                                                                            className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs">Engineering</span><span
//                                 className="text-xs text-muted-foreground">Mar 10, 2026</span></div>
//                             <h3 className="mt-1 text-sm font-medium">Autodesk Looks to the Future of 3D Printing with
//                                 Project Escher</h3><p className="mt-1 text-xs text-muted-foreground line-clamp-1">How
//                             multi-head 3D printing could transform manufacturing workflows and enable new production
//                             techniques at scale.</p>
//                             <div className="mt-2 flex items-center gap-2"><span data-slot="avatar" data-size="default"
//                                                                                 className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 h-5 w-5"><img
//                                 data-slot="avatar-image" className="aspect-square size-full" alt="Ryan Samuel"
//                                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&amp;h=400&amp;auto=format&amp;fit=crop"/></span><span
//                                 className="text-xs text-muted-foreground">Ryan Samuel</span></div>
//                         </div>
//                     </div>
//
//                     <div className="flex gap-4 px-6 py-4 transition-colors hover:bg-muted/50 ">
//                         <div className="min-w-0 flex-1">
//                             <div className="flex items-center gap-2"><span data-slot="badge" data-variant="secondary"
//                                                                            className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs">Engineering</span><span
//                                 className="text-xs text-muted-foreground">Mar 10, 2026</span></div>
//                             <h3 className="mt-1 text-sm font-medium">Autodesk Looks to the Future of 3D Printing with
//                                 Project Escher</h3><p className="mt-1 text-xs text-muted-foreground line-clamp-1">How
//                             multi-head 3D printing could transform manufacturing workflows and enable new production
//                             techniques at scale.</p>
//                             <div className="mt-2 flex items-center gap-2"><span data-slot="avatar" data-size="default"
//                                                                                 className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 h-5 w-5"><img
//                                 data-slot="avatar-image" className="aspect-square size-full" alt="Ryan Samuel"
//                                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&amp;h=400&amp;auto=format&amp;fit=crop"/></span><span
//                                 className="text-xs text-muted-foreground">Ryan Samuel</span></div>
//                         </div>
//                     </div>
//                     <div className="flex gap-4 px-6 py-4 transition-colors hover:bg-muted/50 ">
//                         <div className="min-w-0 flex-1">
//                             <div className="flex items-center gap-2"><span data-slot="badge" data-variant="secondary"
//                                                                            className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs">Engineering</span><span
//                                 className="text-xs text-muted-foreground">Mar 10, 2026</span></div>
//                             <h3 className="mt-1 text-sm font-medium">Autodesk Looks to the Future of 3D Printing with
//                                 Project Escher</h3><p className="mt-1 text-xs text-muted-foreground line-clamp-1">How
//                             multi-head 3D printing could transform manufacturing workflows and enable new production
//                             techniques at scale.</p>
//                             <div className="mt-2 flex items-center gap-2"><span data-slot="avatar" data-size="default"
//                                                                                 className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 h-5 w-5"><img
//                                 data-slot="avatar-image" className="aspect-square size-full" alt="Ryan Samuel"
//                                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&amp;h=400&amp;auto=format&amp;fit=crop"/></span><span
//                                 className="text-xs text-muted-foreground">Ryan Samuel</span></div>
//                         </div>
//                     </div>
//                     <div className="flex gap-4 px-6 py-4 transition-colors hover:bg-muted/50 ">
//                         <div className="min-w-0 flex-1">
//                             <div className="flex items-center gap-2"><span data-slot="badge" data-variant="secondary"
//                                                                            className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs">Engineering</span><span
//                                 className="text-xs text-muted-foreground">Mar 10, 2026</span></div>
//                             <h3 className="mt-1 text-sm font-medium">Autodesk Looks to the Future of 3D Printing with
//                                 Project Escher</h3><p className="mt-1 text-xs text-muted-foreground line-clamp-1">How
//                             multi-head 3D printing could transform manufacturing workflows and enable new production
//                             techniques at scale.</p>
//                             <div className="mt-2 flex items-center gap-2"><span data-slot="avatar" data-size="default"
//                                                                                 className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 h-5 w-5"><img
//                                 data-slot="avatar-image" className="aspect-square size-full" alt="Ryan Samuel"
//                                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&amp;h=400&amp;auto=format&amp;fit=crop"/></span><span
//                                 className="text-xs text-muted-foreground">Ryan Samuel</span></div>
//                         </div>
//                     </div>
//
//
//                 </div>
//                 <div className="px-4 sm:px-0 py-10">
//                     <Pagination>
//                         <PaginationContent>
//                             <PaginationItem><PaginationPrevious href="#"/></PaginationItem>
//                             <PaginationItem className="hidden sm:inline-flex"><PaginationLink
//                                 href="#">1</PaginationLink></PaginationItem>
//                             <PaginationItem><PaginationLink href="#"
//                                                             isActive>2</PaginationLink></PaginationItem>
//                             <PaginationItem className="hidden sm:inline-flex"><PaginationLink
//                                 href="#">3</PaginationLink></PaginationItem>
//                             <PaginationItem
//                                 className="hidden sm:inline-flex"><PaginationEllipsis/></PaginationItem>
//                             <PaginationItem><PaginationNext href="#"/></PaginationItem>
//                         </PaginationContent>
//                     </Pagination>
//                 </div>
//
//             </div>
//         </section>
//     )
// }


"use client"

import {ArrowUpRight} from "lucide-react"
import {
    Card,

    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
// import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

const posts = [
    {
        category: "Design",
        title: "Design Tokens: From Figma Variables to Runtime Theming",
        excerpt:
            "A deep dive into our token pipeline — how we sync Figma variables to CSS custom properties and support runtime theme switching with zero layout shift.",
        tags: ["Tokens", "Figma", "CSS"],
        author: {name: "Alex Rivera", initials: "AR"},
        date: "Feb 28, 2026",
        read: "8 min",
    },
    {
        category: "Engineering",
        title: "Why We Made Every PR Require an Accessibility Review",
        excerpt:
            "After an audit revealed 47 WCAG violations, we embedded accessibility into our CI pipeline. Violations dropped 92% in three months.",
        tags: ["A11y", "CI/CD", "Testing"],
        author: {name: "Jordan Park", initials: "JP"},
        date: "Feb 15, 2026",
        read: "6 min",
    },
    {
        category: "Product",
        title: "Rethinking Onboarding: From 14 Steps to 3",
        excerpt:
            "We cut our onboarding flow from 14 steps to 3 and saw activation rates jump from 23% to 61%. Here the research and iteration that got us there.",
        tags: ["Onboarding", "Activation", "UX Research"],
        author: {name: "Maya Okonkwo", initials: "MO"},
        date: "Feb 3, 2026",
        read: "9 min",
    },
    {
        category: "Culture",
        title: "The 5 Rituals That Keep Our Remote Team Connected",
        excerpt:
            "With 48 people across 12 time zones, synchronous standups don't work. These async rituals replaced them — and our engagement scores hit an all-time high.",
        tags: ["Remote", "Team", "Async"],
        author: {name: "Liam Nguyen", initials: "LN"},
        date: "Jan 20, 2026",
        read: "5 min",
    },
    {
        category: "Engineering",
        title: "Migrating to Edge: Lessons from Serving 40M Requests/Day",
        excerpt:
            "We moved our rendering layer from a single-region Node.js cluster to edge functions. P95 latency dropped from 380ms to 45ms — but the migration wasn't straightforward.",
        tags: ["Edge", "Infrastructure", "Latency"],
        author: {name: "Priya Sharma", initials: "PS"},
        date: "Jan 8, 2026",
        read: "11 min",
    },
]

export default function BlogList() {
    return (
        <section className="mx-auto w-full max-w-4xl p-4 mt-24">
            <Card className={"gap-y-0"}>
                {/* 头部：标题 + 筛选 */}
                <CardHeader className="flex-row items-baseline justify-between px-6 pb-4">
                    <div>
                        <h2 className="text-sm font-medium">文章</h2>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            网站用户编写分享的文章
                        </p>
                    </div>
                </CardHeader>

                {/* 筛选 ToggleGroup */}
                <div className="flex items-center gap-1 px-6 py-3 border-y">
                    <ToggleGroup defaultValue={["all"]} className="flex-wrap">

                        <ToggleGroupItem value="all"
                                         className="text-xs h-auto py-1 data-[state=on]:bg-foreground data-[state=on]:text-background">
                            All <span className="ml-1 tabular-nums opacity-70">6</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="engineering" className="text-xs h-auto py-1">
                            Engineering <span className="ml-1 tabular-nums opacity-60">3</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="design" className="text-xs h-auto py-1">
                            Design <span className="ml-1 tabular-nums opacity-60">1</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="product" className="text-xs h-auto py-1">
                            Product <span className="ml-1 tabular-nums opacity-60">1</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="culture" className="text-xs h-auto py-1">
                            Culture <span className="ml-1 tabular-nums opacity-60">1</span>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                {/* 文章网格 */}
                <div className="grid gap-px bg-muted  md:grid-cols-2">
                    {posts.map((post) => (
                        <article
                            key={post.title}
                            className="group flex flex-col justify-between bg-card p-5 cursor-pointer transition-colors hover:bg-muted/50"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                        {post.category}
                                    </span>
                                    <ArrowUpRight
                                        className="size-3.5 text-muted-foreground/0 transition-all group-hover:text-muted-foreground"/>
                                </div>
                                <h3 className="mt-2 text-sm font-medium leading-snug">
                                    {post.title}
                                </h3>
                                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="mt-4">
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {post.tags.map((t) => (
                                        <Badge
                                            key={t}
                                            variant="secondary"
                                            className="rounded px-1.5 py-0.5 text-[10px]"
                                        >
                                            {t}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t pt-3">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-5">
                                            <AvatarFallback className="text-[8px]">
                                                {post.author.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-[10px] text-muted-foreground">
                                            {post.author.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                        <span>{post.date}</span>
                                        <span className="size-0.5 rounded-full bg-muted-foreground/40"/>
                                        <span>{post.read}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <CardFooter className={"items-center justify-center py-2 bg-transparent"}>

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
        </section>
    )
}