"use client"

import TextAnimate from "@/components/ui/text-animate";
import {ThreeDMarquee} from "@/components/ui/3d-marquee";
import {AppleHelloEnglishEffect} from "@/components/ui/apple-hello-effect";
import {Button} from "@/components/ui/button";
import {motion} from "motion/react";

export default function Hero({images}: { images: string[] }) {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 dark:hidden">
                <ThreeDMarquee images={images}/>
            </div>

            <div className="relative z-10 flex h-full flex-col items-center mt-[26vh] gap-8 mx-3">
                <AppleHelloEnglishEffect className="text-neutral-800 dark:text-neutral-100 h-16"/>
                {/*<TextAnimate text="Hello" type="rollIn" />*/}
                <TextAnimate text="I am a Blog Developer" type="rollIn"/>
                <motion.p
                    className="text-neutral-600 dark:text-neutral-400  max-w-xl text-center"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1, duration: 0.6}}
                >
                    该博客采用后端SpringBoot前端Vue+React开发，如果你想要使用同款博客，前往github查看发行版仓库。
                </motion.p>
                <motion.div
                    className="flex gap-4"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.2, duration: 0.6}}
                >
                    <Button
                        onClick={() => window.open("https://github.com/DCSCDF/MYBLOG-Distribution", "_blank")}>Github</Button>
                    <Button variant="outline" onClick={() => window.open("/myblog")}>我的博客</Button>
                </motion.div>

            </div>
        </section>
    );
}
