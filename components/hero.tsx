"use client"

import TextAnimate from "@/components/ui/text-animate";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import {Button} from "@/components/ui/button";
import {motion} from "motion/react";
import {cn} from "@/lib/utils";
import { HeroConfig } from "@/lib/hooks/useConfig";

interface HeroProps {
    images: string[];
    config: HeroConfig;
}

export default function Hero({images, config}: HeroProps) {
    const { hero } = { hero: config };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 dark:hidden">
                <ThreeDMarquee images={images}/>
            </div>

            <div className="absolute inset-0 hidden dark:block">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                    )}
                />
                <div
                    className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            </div>


            <div className="relative z-10 flex h-full flex-col items-center mt-[30vh] gap-8 mx-3">
                <>
                    <TextAnimate text={hero.title} type="rollIn" />
                    <motion.p
                            className="text-neutral-600 dark:text-neutral-400 max-w-xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            {hero.content}
                        </motion.p>
                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <Button onClick={() => window.open(hero.githubLink, "_blank")}>Github</Button>
                            <Button className={"dark:backdrop-blur-xs "} variant="outline"
                                onClick={() => window.open("/myblog")}>我的博客</Button>
                        </motion.div>
                </>
            </div>
        </section>
    );
}
