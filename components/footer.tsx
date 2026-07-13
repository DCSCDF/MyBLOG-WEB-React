import React from "react";
import {SiteInfo} from "@/lib/api/config.server";

interface FooterProps {
    siteInfo?: SiteInfo | null;
}

export default function Footer({siteInfo}: FooterProps) {
    return (
        <footer className="border-t mt-20">
            <section className="mx-auto w-full max-w-4xl p-4">
                <div className="overflow-hidden rounded-lg ">
                    <div className="flex flex-col items-center justify-between gap-4 px-4 py-3 sm:flex-row">
                        <div className="text-center sm:text-left">
                            <span className="font-medium text-sm">
                              <span
                                  data-br="_R_1cpbsnpfiuqbtb_"
                                  data-brr="1"
                                  style={{
                                      display: 'inline-block',
                                      verticalAlign: 'top',
                                      textDecoration: 'inherit',
                                      textWrap: 'balance'
                                  }}
                              >
                                    {siteInfo?.siteName || "网站名字"}
                              </span>
                            </span>
                            <p className="mt-0.5 text-muted-foreground text-xs">
                                {siteInfo?.recordNumber || "A simple website"}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">

                            <a
                                href="https://github.com/DCSCDF" target="_blank"
                                className="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 gap-1.5 rounded-[min(var(--radius-md),12px)] text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5 h-7 w-7 p-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-github size-3.5"
                                     aria-hidden="true">
                                    <path
                                        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            </a>

                        </div>
                    </div>
                    <div className="px-4 py-3">
                        <p className="text-center text-muted-foreground text-xs sm:text-left">
                            © 2026 {siteInfo?.siteName || "网站名字"}. All rights reserved.
                        </p>
                    </div>
                </div>
            </section>
        </footer>
    );
}
