"use client";

import React, {useState, useCallback} from "react";
import {useParams} from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Streamdown} from "streamdown";
import {code} from "@streamdown/code";
import {mermaid} from "@streamdown/mermaid";
import {math} from "@streamdown/math";
import {commentApi} from "@/lib/api/comment";
import {useAuth} from "@/lib/auth/useAuth";
import type {Article} from "@/lib/api/article.server";
import type {CommentVO, SubmitCommentRequest} from "@/lib/api/comment";
import "katex/dist/katex.min.css";

const validateUrl = (url: string): boolean => {
    if (!url) return true;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const validateEmail = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const getInitials = (name: string): string => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
};

const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "刚刚";
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
};

interface FormData {
    username: string;
    email: string;
    avatarUrl: string;
    website: string;
    content: string;
}

interface ArticleClientProps {
    initialArticle: Article | null;
    initialComments: CommentVO[];
}

function CommentItem({
                         comment,
                         isTopLevel = true,
                         parentUsername = "",
                         activeReplyId,
                         setActiveReplyId,
                         isLoggedIn,
                         onSubmitReply,
                         submitLoading,
                     }: {
    comment: CommentVO;
    isTopLevel?: boolean;
    parentUsername?: string;
    activeReplyId: number | null;
    setActiveReplyId: (id: number | null) => void;
    isLoggedIn: boolean;
    onSubmitReply: (parentId: number, data: FormData) => Promise<boolean>;
    submitLoading: boolean;
}) {
    const showReply = activeReplyId === comment.id;
    const displayContent = parentUsername ? `@${parentUsername} ${comment.content}` : comment.content;

    const [replyFormData, setReplyFormData] = useState<FormData>({
        username: "",
        email: "",
        avatarUrl: "",
        website: "",
        content: "",
    });

    const handleReplyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setReplyFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await onSubmitReply(comment.id, replyFormData);
        if (success) {
            setReplyFormData({
                username: "",
                email: "",
                avatarUrl: "",
                website: "",
                content: "",
            });
            setActiveReplyId(null);
        }
    };

    return (
        <>
            <div className={isTopLevel ? "" : "pl-4 md:pl-12"}>
                <div className="flex items-start gap-3 py-3">
                    <Avatar className="size-8 shrink-0">
                        {comment.avatarUrl ? (
                            <AvatarImage src={comment.avatarUrl} alt={comment.username}/>
                        ) : (
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                                {getInitials(comment.username)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{comment.username}</span>
                            {comment.isAdmin && (
                                <Badge variant="secondary"
                                       className={"!rounded-sm text-neutral-600 dark:text-neutral-400"}>
                                    管理员
                                </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{formatTime(comment.createTime)}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            {displayContent}
                        </p>
                        <button
                            type="button"
                            onClick={() => setActiveReplyId(showReply ? null : comment.id)}
                            className="mt-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            回复
                        </button>
                        {showReply && (
                            <form
                                className="mt-2 space-y-3 p-1"
                                onSubmit={handleSubmit}
                            >
                                {!isLoggedIn && (
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <Label htmlFor={`reply-name-${comment.id}`} className="text-xs">
                                                名称 *
                                            </Label>
                                            <Input
                                                id={`reply-name-${comment.id}`}
                                                name="username"
                                                value={replyFormData.username}
                                                onChange={handleReplyInputChange}
                                                className="h-8 text-xs"
                                                placeholder="您的名称"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`reply-email-${comment.id}`} className="text-xs">
                                                邮箱
                                            </Label>
                                            <Input
                                                type="email"
                                                id={`reply-email-${comment.id}`}
                                                name="email"
                                                value={replyFormData.email}
                                                onChange={handleReplyInputChange}
                                                className="h-8 text-xs"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`reply-avatar-${comment.id}`} className="text-xs">
                                                头像URL
                                            </Label>
                                            <Input
                                                type="url"
                                                id={`reply-avatar-${comment.id}`}
                                                name="avatarUrl"
                                                value={replyFormData.avatarUrl}
                                                onChange={handleReplyInputChange}
                                                className="h-8 text-xs"
                                                placeholder="https://example.com/img"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`reply-url-${comment.id}`} className="text-xs">
                                                网站链接
                                            </Label>
                                            <Input
                                                type="url"
                                                id={`reply-url-${comment.id}`}
                                                name="website"
                                                value={replyFormData.website}
                                                onChange={handleReplyInputChange}
                                                className="h-8 text-xs"
                                                placeholder="https://example.com"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <Label htmlFor={`reply-message-${comment.id}`} className="text-xs">
                                        内容 *
                                    </Label>
                                    <Textarea
                                        id={`reply-message-${comment.id}`}
                                        name="content"
                                        value={replyFormData.content}
                                        onChange={handleReplyInputChange}
                                        placeholder={`回复 ${comment.username}...`}
                                        rows={2}
                                        className="text-xs"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs"
                                        onClick={() => setActiveReplyId(null)}
                                    >
                                        取消
                                    </Button>
                                    <Button type="submit" size="sm" className="h-7 text-xs" disabled={submitLoading}>
                                        {submitLoading ? "发送中..." : "发送"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            {comment.children?.map((child) => (
                <CommentItem
                    key={child.id}
                    comment={child}
                    isTopLevel={false}
                    parentUsername={comment.username}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                    isLoggedIn={isLoggedIn}
                    onSubmitReply={onSubmitReply}
                    submitLoading={submitLoading}
                />
            ))}
        </>
    );
}

export default function ArticleClient({initialArticle, initialComments}: ArticleClientProps) {
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
    const [article] = useState<Article | null>(initialArticle);
    const [comments, setComments] = useState<CommentVO[]>(initialComments);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        avatarUrl: "",
        website: "",
        content: "",
    });
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorDialogMessage, setErrorDialogMessage] = useState("");
    const params = useParams<{ id: string }>();
    const {isLoggedIn} = useAuth();

    const refreshComments = useCallback(async () => {
        const id = parseInt(params.id || "", 10);
        if (isNaN(id)) return;
        const data = await commentApi.getCommentList(id);
        setComments(data || []);
    }, [params.id]);

    const handleSubmitComment = async (parentId: number = 0, data?: FormData): Promise<boolean> => {
        const id = parseInt(params.id || "", 10);
        if (isNaN(id)) return false;

        const commentData = data || formData;

        if (!commentData.content.trim()) {
            setErrorDialogMessage("评论内容不能为空");
            setErrorDialogOpen(true);
            return false;
        }

        if (!isLoggedIn && !commentData.username.trim()) {
            setErrorDialogMessage("请输入您的名称");
            setErrorDialogOpen(true);
            return false;
        }

        if (!isLoggedIn && !validateEmail(commentData.email)) {
            setErrorDialogMessage("邮箱格式不正确");
            setErrorDialogOpen(true);
            return false;
        }

        if (!validateUrl(commentData.avatarUrl)) {
            setErrorDialogMessage("头像URL格式不正确");
            setErrorDialogOpen(true);
            return false;
        }

        if (!validateUrl(commentData.website)) {
            setErrorDialogMessage("网站链接格式不正确");
            setErrorDialogOpen(true);
            return false;
        }

        setSubmitLoading(true);
        setSubmitMessage(null);

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const requestData: SubmitCommentRequest = {
            blogId: id,
            parentId,
            content: commentData.content.trim(),
        };

        if (!isLoggedIn) {
            const username = commentData.username.trim();
            if (username) {
                requestData.username = username;
            }
            const email = commentData.email.trim();
            if (email) {
                requestData.email = email;
            }
            const avatarUrl = commentData.avatarUrl.trim();
            if (avatarUrl) {
                requestData.avatarUrl = avatarUrl;
            }
            const website = commentData.website.trim();
            if (website) {
                requestData.website = website;
            }
        }

        const response = await commentApi.submitComment(requestData, token);

        if (response.success) {
            setErrorDialogMessage(response.data.message || "评论提交成功");
            setErrorDialogOpen(true);
            if (!data) {
                setFormData({
                    username: "",
                    email: "",
                    avatarUrl: "",
                    website: "",
                    content: "",
                });
            }
            setActiveReplyId(null);
            await refreshComments();
            setSubmitLoading(false);
            return true;
        } else {
            setErrorDialogMessage(response.errorMsg || "评论提交失败");
            setErrorDialogOpen(true);
            setSubmitLoading(false);
            return false;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!article) {
        return (
            <section className="mt-24 mx-auto w-full max-w-4xl py-4 px-2 md:px-4">
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">文章不存在</p>
                </div>
            </section>
        );
    }

    return (<section className={"mt-24 mx-auto w-full max-w-4xl py-4 px-2 md:px-4"}>

        <Card className="ring-0">
            <CardContent className="py-3  md:px-6 px-4">
                <div className="flex items-center gap-2">
                    {article.categoryName && (
                        <Badge className={"!rounded-sm text-neutral-600 dark:text-neutral-400"}
                               variant="secondary">{article.categoryName}</Badge>
                    )}
                    {article.isTop && (
                        <Badge className={"!rounded-sm text-neutral-600 dark:text-neutral-400"}
                               variant="secondary">置顶</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                        {new Date(article.createTime).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>

                <CardTitle className="mt-4 text-xl tracking-tight">
                    {article.title}
                </CardTitle>

                <div className="mt-4 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        {article.authorAvatar ? (
                            <AvatarImage
                                src={article.authorAvatar}
                                alt={article.authorNickname}
                            />
                        ) : (
                            <AvatarFallback>
                                {article.authorNickname.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{article.authorNickname}</p>
                    </div>
                </div>

                <div className={"mt-8 border-t mb-12"}/>


                <div className={"text-neutral-600 dark:text-neutral-400"}>
                    <Streamdown
                        mode="static"
                        plugins={{
                            code: code,
                            mermaid: mermaid,
                            math: math,
                        }}
                    >
                        {article.mdContent}
                    </Streamdown>
                </div>


                <div className={"mt-8 border-t mb-12"}/>

                <section className="mx-auto w-full">
                    <div className="overflow-hidden rounded-lg bg-card">
                        {submitMessage && (
                            <div
                                className={`text-center py-2 text-sm ${submitMessage.includes('成功') ? 'text-green-600' : 'text-red-600'}`}>
                                {submitMessage}
                            </div>
                        )}
                        <form className="space-y-4 py-6" onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitComment(0);
                        }}>
                            {!isLoggedIn && (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">名称 *</Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="您的名称"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">邮箱</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="avatarUrl">头像URL</Label>
                                        <Input
                                            type="url"
                                            id="avatarUrl"
                                            name="avatarUrl"
                                            value={formData.avatarUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/img"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="website">网站链接</Label>
                                        <Input
                                            type="url"
                                            id="website"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="content">内容 *</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder={isLoggedIn ? "写下您的评论..." : "写下您的评论..."}
                                    rows={4}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" className="w-full max-w-40" disabled={submitLoading}>
                                    {submitLoading ? "发送中..." : "发送评论"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>

                <div className="overflow-hidden rounded-lg bg-card">
                    <CardHeader className="px-0 pb-5">
                        <CardTitle className="font-semibold text-xl tracking-tight">
                            评论
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {article.commentCount} 个评论在此篇文章
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-0 py-0">
                        {comments.length === 0 ? (
                            <div className="flex items-center justify-center h-16">
                                <p className="text-sm text-muted-foreground">暂无评论</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    activeReplyId={activeReplyId}
                                    setActiveReplyId={setActiveReplyId}
                                    isLoggedIn={isLoggedIn}
                                    onSubmitReply={handleSubmitComment}
                                    submitLoading={submitLoading}
                                />
                            ))
                        )}
                    </CardContent>

                </div>

            </CardContent>
        </Card>

        <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>提示</AlertDialogTitle>
                    <AlertDialogDescription>
                        {errorDialogMessage}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction onClick={() => setErrorDialogOpen(false)}>
                    确定
                </AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>

    </section>)
}