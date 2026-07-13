"use client";

import React, {JSX} from "react"
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
import {useConfig} from "@/lib/hooks/useConfig"
import {Skeleton} from "@/components/ui/skeleton"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {FriendLink, SubmitFriendLinkRequest} from "@/lib/api/friend-link.server"
import {friendLinkApi} from "@/lib/api/friend-link"
import {useState} from "react"

function ModalCancelButton() {
    const {setOpen} = useModal()
    return (
        <Button variant="outline" onClick={() => setOpen(false)}>
            取消
        </Button>
    )
}

function parsePTags(html: string): JSX.Element[] {
    const pRegex = /<p[^>]*>(.*?)<\/p>/gi
    const elements: JSX.Element[] = []
    let match
    let index = 0

    while ((match = pRegex.exec(html)) !== null) {
        if (match.index > index) {
            index = match.index + match[0].length
            continue
        }
        elements.push(
            <p key={elements.length} className="text-on-surface-variant text-sm leading-relaxed">
                {match[1]}
            </p>
        )
        index = match.index + match[0].length
    }

    if (elements.length === 0) {
        elements.push(
            <p key={0} className="text-on-surface-variant text-sm leading-relaxed">
                {html.replace(/<[^>]*>/g, "")}
            </p>
        )
    }

    return elements
}

interface LinksClientProps {
    initialFriendLinks: FriendLink[]
}

export default function LinksClient({initialFriendLinks}: LinksClientProps) {
    const {config, isLoading} = useConfig();
    const {links} = config;

    const [friendLinks] = useState<FriendLink[]>(initialFriendLinks)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [submitSuccess, setSubmitSuccess] = useState("")

    const [formData, setFormData] = useState<SubmitFriendLinkRequest>({
        name: "",
        url: "",
        summary: "",
        imageUrl: "",
    })

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            setSubmitError("链接名称不能为空")
            return
        }
        if (!formData.url.trim()) {
            setSubmitError("URL地址不能为空")
            return
        }

        setIsSubmitting(true)
        setSubmitError("")
        setSubmitSuccess("")

        const result = await friendLinkApi.submitFriendLink(formData)

        if (result.success) {
            setSubmitSuccess(result.data)
            setFormData({name: "", url: "", summary: "", imageUrl: ""})
        } else {
            setSubmitError(result.errorMsg || "提交失败")
        }

        setIsSubmitting(false)
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
            <div className="pointer-events-none">
                <BackgroundRippleEffect/>
            </div>
            <section className="relative z-10 mt-32 px-4 w-full max-w-3xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter mb-2">
                        朋友们
                    </h1>
                    <p className="dark:text-neutral-400 text-neutral-600 text-sm font-medium tracking-wide uppercase opacity-70">
                        Curation of Excellent Technical Blogs &amp; Links
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {friendLinks.length === 0 ? (
                        <div className="col-span-1 lg:col-span-2 py-8 text-center">
                            <p className="text-muted-foreground text-sm">暂无友链</p>
                        </div>
                    ) : (
                        friendLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className="group block p-4 backdrop-blur-xs border rounded-lg transition-all duration-300 hover:shadow-lg"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12 rounded-lg bg-surface-container shrink-0">
                                        <AvatarImage
                                            src={link.imageUrl}
                                            alt={link.name}
                                            className="object-cover transition-all group-hover:scale-110"
                                        />
                                        <AvatarFallback className="text-xs font-medium">
                                            {link.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-on-surface text-sm truncate group-hover:text-primary transition-colors">
                                            {link.name}
                                        </h3>
                                        <p className="dark:text-neutral-400 text-neutral-600 text-xs truncate leading-relaxed">
                                            {link.summary || "暂无描述"}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))
                    )}
                </div>

                <Card className="mx-auto w-full my-10">
                    <CardHeader>
                        <CardTitle>申请友链</CardTitle>
                        <CardDescription>
                            请仔细阅读下方友链申请须知。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing)">
                        {isLoading ? (
                            <div
                                className="-mx-(--card-spacing) space-y-4 border-t bg-muted/50 px-(--card-spacing) py-4">
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-32 w-full"/>
                            </div>
                        ) : (
                            <div
                                className="-mx-(--card-spacing) max-h-72 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4">
                                {parsePTags(links.content)}
                                {links.codeInfo && (
                                    <CodeEditor
                                        lang="html"
                                        title="myblog.icu"
                                        copyButton
                                        writing={false}
                                        className="w-full"
                                    >
                                        {links.codeInfo.replace(/\\n/g, '\n').replace(/<br\s*\/?>/gi, '\n')}
                                    </CodeEditor>
                                )}
                            </div>
                        )}
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
                                    {submitError && (
                                        <div
                                            className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                                            {submitError}
                                        </div>
                                    )}
                                    {submitSuccess && (
                                        <div
                                            className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-lg">
                                            {submitSuccess}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点名称 <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                placeholder="请输入你的站点名称"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点链接 <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                placeholder="https://example.com"
                                                value={formData.url}
                                                onChange={(e) => setFormData({...formData, url: e.target.value})}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点描述
                                            </label>
                                            <Textarea
                                                placeholder="简单介绍一下你的网站..."
                                                className="min-h-20"
                                                value={formData.summary}
                                                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-on-surface">
                                                站点图片
                                            </label>
                                            <Input
                                                placeholder="输入站点图片链接，确保无跨域问题。"
                                                value={formData.imageUrl}
                                                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </ModalContent>
                                <div className="flex justify-end gap-2 p-4 bg-gray-100 dark:bg-neutral-900">
                                    <ModalCancelButton/>
                                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? "提交中..." : "提交申请"}
                                    </Button>
                                </div>
                            </ModalBody>
                        </Modal>
                    </CardFooter>
                </Card>
            </section>
        </div>
    );
}
