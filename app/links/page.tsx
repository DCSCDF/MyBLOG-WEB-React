"use client"

import {Button} from "@/components/ui/button"
import {BackgroundRippleEffect} from "@/components/ui/background-ripple-effect"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {CodeEditor} from "@/components/ui/code-editor"
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
    useModal,
} from "@/components/ui/animated-modal"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"

function ModalCancelButton() {
    const {setOpen} = useModal()
    return (
        <Button variant="outline" onClick={() => setOpen(false)}>
            取消
        </Button>
    )
}

const mySiteCode = `<!-- 站点链接-->
<a href="https://myblog.icu" target="_blank" rel="noopener noreferrer">
  <!-- 图片url-->
  <img src="https://api.myblog.icu/api/images/66d8abaee825b7d74238c6bc8a58f4a5?size=sm"
       alt="myblog.icu" />
  <div>
     <!-- 网站名称-->
    <h3>JiuLiuBLOG</h3>
     <!-- 简介-->
    <p>一个个人开发的简洁博客，分享开发经验和生活日常。</p>
  </div>
</a>`


export default function Links() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
            <div className="pointer-events-none">
                <BackgroundRippleEffect/>
            </div>
            <section className="relative z-10 mt-32 px-4 max-w-3xl mx-auto">
                <div className="mb-10">
                    <h1
                        className="text-4xl font-extrabold text-on-surface tracking-tighter mb-2">
                        朋友们
                    </h1>
                    <p
                        className="dark:text-neutral-400 text-neutral-600 text-sm font-medium tracking-wide uppercase opacity-70">
                        Curation of Excellent
                        Technical Blogs &amp; Links
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    <a href="https://amvc.top"
                       className="group block p-4 bg-neutral-50 border dark:bg-neutral-900  rounded-lg transition-all duration-300"
                       rel="noopener noreferrer" target="_blank">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container shrink-0 text-gray-400">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img alt="麻辣工夫茶博客网" src="https://amvc.top/touxiang.webp"
                                     className="w-full h-full object-cover transition-all"/></div>
                            <div className="min-w-0"><h3
                                className="font-bold text-on-surface text-sm truncate group-hover:text-primary transition-colors">麻辣工夫茶博客网</h3>
                                <p className="dark:text-neutral-400 text-neutral-600 text-xs truncate leading-relaxed">天气晴朗，万物可爱~</p>
                            </div>
                        </div>
                    </a>


                    <a href="https://amvc.top"
                       className="group block p-4 bg-neutral-50 border dark:bg-neutral-900  rounded-lg transition-all duration-300"
                       rel="noopener noreferrer" target="_blank">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container shrink-0 text-gray-400">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img alt="麻辣工夫茶博客网" src="https://amvc.top/touxiang.webp"
                                     className="w-full h-full object-cover transition-all"/></div>
                            <div className="min-w-0"><h3
                                className="font-bold text-on-surface text-sm truncate group-hover:text-primary transition-colors">麻辣工夫茶博客网</h3>
                                <p className="dark:text-neutral-400 text-neutral-600 text-xs truncate leading-relaxed">天气晴朗，万物可爱~</p>
                            </div>
                        </div>
                    </a>


                </div>


                {/*<div className="mt-16 bg-surface-container-low p-8 rounded-lg">*/}
                {/*    <h2*/}
                {/*        className="font-bold text-lg mb-4 text-on-surface">*/}
                {/*        申请须知*/}
                {/*    </h2>*/}
                {/*    <p*/}
                {/*        className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">*/}
                {/*        请提前添加本站，我将会很快处理。*/}
                {/*        如果你的站点打不开或者墙了我将会定期移除， 如果更换了域名请告诉我你之前的域名和更换后的域名以方便我调整。*/}
                {/*        若长时间未审核or评论不了，请加QQ：3209174373，只换个人博客。*/}
                {/*    </p>*/}
                {/*    <p*/}
                {/*        className="text-on-surface-variant text-sm leading-relaxed max-w-2xl mt-2">*/}
                {/*        我的网站：名称 JiuLiuBLOG、域名*/}
                {/*        myblog.icu 、描述 JiuLiu的博客，分享前端开发经验与生活日常。*/}
                {/*    </p>*/}
                {/*</div>*/}

                <Card className="mx-auto w-full my-10">
                    <CardHeader>
                        <CardTitle>申请友链</CardTitle>
                        <CardDescription>
                            请仔细阅读下方友链申请须知。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing)">
                        <div
                            className="-mx-(--card-spacing) max-h-72 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
                            <p>
                                请提前添加本站，我将会很快处理。
                            </p>
                            <p>
                                如果你的站点打不开或者被墙了我将会定期移除， 如果更换了域名请告诉我你之前的域名和更换后的域名以方便我调整。
                            </p>
                            <p>
                                若长时间未审核or评论不了，请加QQ：3209174373，只换个人博客。
                            </p>
                            <CodeEditor
                                lang="html"
                                title="myblog.icu"
                                copyButton
                                writing={false}
                                className="w-full"
                            >
                                {mySiteCode}
                            </CodeEditor>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Modal>
                            <ModalTrigger asChild>
                                <Button>申请</Button>
                            </ModalTrigger>
                            <ModalBody>
                                <ModalContent>
                                    <h2 className="text-2xl font-bold mb-2 text-on-surface">申请友链</h2>
                                    <p className="text-muted-foreground text-sm mb-6">
                                        请填写以下信息，我会尽快审核。
                                    </p>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点名称
                                            </label>
                                            <Input placeholder="请输入你的站点名称"/>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点链接
                                            </label>
                                            <Input placeholder="https://example.com"/>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点描述
                                            </label>
                                            <Textarea
                                                placeholder="简单介绍一下你的网站..."
                                                className="min-h-20"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点图片
                                            </label>
                                            <Input placeholder="输入站点图片链接，确保无跨域问题。"/>
                                        </div>
                                    </div>
                                </ModalContent>
                                <div className="flex justify-end gap-2 p-4 bg-gray-100 dark:bg-neutral-900">
                                    <ModalCancelButton/>
                                    <Button>提交申请</Button>
                                </div>
                            </ModalBody>
                        </Modal>
                    </CardFooter>
                </Card>


            </section>
        </div>
    );
}
