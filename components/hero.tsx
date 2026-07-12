"use client"

import TextAnimate from "@/components/ui/text-animate";
import {ThreeDMarquee} from "@/components/ui/3d-marquee";
// import {AppleHelloEnglishEffect} from "@/components/ui/apple-hello-effect";
import {Button} from "@/components/ui/button";
import {motion} from "motion/react";
import {cn} from "@/lib/utils";
// import {SquigglyText} from "@/components/ui/squiggly-text";


export default function Hero({images}: { images: string[] }) {

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


                {/*<h1 className="text-center text-5xl leading-tight font-bold text-neutral-900 md:text-7xl lg:text-8xl dark:text-neutral-100">*/}
                {/*    How many {" "}*/}
                {/*    <SquigglyText*/}
                {/*        stepDuration={70}*/}
                {/*        scale={[6, 9]}*/}
                {/*        className="text-amber-500"*/}
                {/*    >*/}
                {/*        drinks*/}
                {/*    </SquigglyText>{" "}*/}
                {/*    <br/>*/}
                {/*    are <SquigglyText scale={5}>too many</SquigglyText> drinks?*/}
                {/*</h1>*/}

                {/*<AppleHelloEnglishEffect className="text-neutral-800 dark:text-neutral-100 h-16"/>*/}
                {/*<TextAnimate text="Hello" type="rollIn" />*/}
                {/*<TextAnimate text="Welcome" type="rollIn"/>*/}
                <TextAnimate text="Hey, I'm a Developer" type="rollIn"/>
                <motion.p
                    className="text-neutral-600 dark:text-neutral-400  max-w-xl text-center"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1, duration: 0.6}}
                >
                    一个个人开发的博客系统，采用SpringBoot、Vue、React构建，如果你想要使用同款项目，前往Github发行版仓库下载。
                </motion.p>
                <motion.div
                    className="flex gap-4"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.2, duration: 0.6}}
                >
                    <Button
                        onClick={() => window.open("https://github.com/DCSCDF/MYBLOG-Distribution", "_blank")}>Github</Button>
                    <Button className={"dark:backdrop-blur-xs "} variant="outline"
                            onClick={() => window.open("/myblog")}>我的博客</Button>
                </motion.div>


            </div>
        </section>
    );
}
