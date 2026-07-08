import {cn} from "@/lib/utils";

export default function blogList() {
    return (
        <section className={"mt-24"}>
            <div
                className={cn(
                    "absolute inset-0 -z-10 pointer-events-none",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>


            <div className="mx-auto w-full max-w-4xl p-4">
                <div className="overflow-hidden rounded-lg">
                    <div className=" px-6 py-5">
                        <h2 className="font-semibold text-xl tracking-tight">
                            Recent Posts
                        </h2>
                    </div>


                    <div className="flex gap-4 px-6 py-4 transition-colors hover:bg-muted/50 ">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2"><span data-slot="badge" data-variant="secondary"
                                                                           className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs">Engineering</span><span
                                className="text-xs text-muted-foreground">Mar 10, 2026</span></div>
                            <h3 className="mt-1 text-sm font-medium">Autodesk Looks to the Future of 3D Printing with
                                Project Escher</h3><p className="mt-1 text-xs text-muted-foreground line-clamp-1">How
                            multi-head 3D printing could transform manufacturing workflows and enable new production
                            techniques at scale.</p>
                            <div className="mt-2 flex items-center gap-2"><span data-slot="avatar" data-size="default"
                                                                                className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 h-5 w-5"><img
                                data-slot="avatar-image" className="aspect-square size-full" alt="Ryan Samuel"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&amp;h=400&amp;auto=format&amp;fit=crop"/></span><span
                                className="text-xs text-muted-foreground">Ryan Samuel</span></div>
                        </div>
                    </div>


                    <div className="flex gap-4 px-6 py-4 transition-colors hover:bg-muted/50">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2"><span data-slot="badge" data-variant="secondary"
                                                                           className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs">Product</span><span
                                className="text-xs text-muted-foreground">Mar 6, 2026</span></div>
                            <h3 className="mt-1 text-sm font-medium">Cross-Platform Services and the Future of Ride
                                Sharing</h3><p className="mt-1 text-xs text-muted-foreground line-clamp-1">Breaking down
                            platform silos to create seamless experiences across mobile, web, and emerging
                            interfaces.</p>
                            <div className="mt-2 flex items-center gap-2"><span data-slot="avatar" data-size="default"
                                                                                className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 h-5 w-5"><img
                                data-slot="avatar-image" className="aspect-square size-full" alt="Nora Hazel"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&amp;h=400&amp;auto=format&amp;fit=crop"/></span><span
                                className="text-xs text-muted-foreground">Nora Hazel</span></div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}