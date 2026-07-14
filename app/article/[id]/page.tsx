"use client";

import {useState, useEffect, useCallback} from "react";
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
import {Streamdown} from "streamdown";
import {code} from "@streamdown/code";
import {mermaid} from "@streamdown/mermaid";
import {math} from "@streamdown/math";
import {articleApi} from "@/lib/api/article";
import {commentApi} from "@/lib/api/comment";
import {useAuth} from "@/lib/auth/useAuth";

import type {Article} from "@/lib/api/article.server";
import type {CommentVO, SubmitCommentRequest} from "@/lib/api/comment";
import "katex/dist/katex.min.css";

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

function CommentItem({
                         comment,
                         isTopLevel = true,
                         parentUsername = "",
                         activeReplyId,
                         setActiveReplyId,
                         isLoggedIn,
                         onSubmitReply,
                         submitLoading,
                         formData,
                         onInputChange,
                     }: {
    comment: CommentVO;
    isTopLevel?: boolean;
    parentUsername?: string;
    activeReplyId: number | null;
    setActiveReplyId: (id: number | null) => void;
    isLoggedIn: boolean;
    onSubmitReply: (parentId: number) => void;
    submitLoading: boolean;
    formData: FormData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const showReply = activeReplyId === comment.id;
    const displayContent = parentUsername ? `@${parentUsername} ${comment.content}` : comment.content;

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
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onSubmitReply(comment.id);
                                }}
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
                                                value={formData.username}
                                                onChange={onInputChange}
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
                                                value={formData.email}
                                                onChange={onInputChange}
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
                                                value={formData.avatarUrl}
                                                onChange={onInputChange}
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
                                                value={formData.website}
                                                onChange={onInputChange}
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
                                        value={formData.content}
                                        onChange={onInputChange}
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
                    formData={formData}
                    onInputChange={onInputChange}
                />
            ))}
        </>
    );
}

export default function Article() {
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
    const [article, setArticle] = useState<Article | null>(null);
    const [comments, setComments] = useState<CommentVO[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        avatarUrl: "",
        website: "",
        content: "",
    });
    const params = useParams<{ id: string }>();
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        const fetchArticle = async () => {
            const id = parseInt(params.id || "", 10);
            if (isNaN(id)) {
                setLoading(false);
                return;
            }
            const data = await articleApi.getArticleDetail(id);
            setArticle(data);
            setLoading(false);
        };
        fetchArticle().then();
    }, [params.id]);

    const refreshComments = useCallback(async () => {
        const id = parseInt(params.id || "", 10);
        if (isNaN(id)) return;
        setCommentsLoading(true);
        const data = await commentApi.getCommentList(id);
        setComments(data || []);
        setCommentsLoading(false);
    }, [params.id]);

    useEffect(() => {
        const loadComments = async () => {
            await refreshComments();
        };
        loadComments();
    }, [refreshComments]);

    const handleSubmitComment = async (parentId: number = 0) => {
        const id = parseInt(params.id || "", 10);
        if (isNaN(id)) return;

        if (!formData.content.trim()) {
            setSubmitMessage("评论内容不能为空");
            setTimeout(() => setSubmitMessage(null), 3000);
            return;
        }

        if (!isLoggedIn && !formData.username.trim()) {
            setSubmitMessage("请输入您的名称");
            setTimeout(() => setSubmitMessage(null), 3000);
            return;
        }

        setSubmitLoading(true);
        setSubmitMessage(null);

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const requestData: SubmitCommentRequest = {
            blogId: id,
            parentId,
            content: formData.content.trim(),
        };

        if (!isLoggedIn) {
            const username = formData.username.trim();
            if (username) {
                requestData.username = username;
            }
            const email = formData.email.trim();
            if (email) {
                requestData.email = email;
            }
            const avatarUrl = formData.avatarUrl.trim();
            if (avatarUrl) {
                requestData.avatarUrl = avatarUrl;
            }
            const website = formData.website.trim();
            if (website) {
                requestData.website = website;
            }
        }

        const response = await commentApi.submitComment(requestData, token);

        if (response.success) {
            setSubmitMessage(response.data.message);
            setFormData({
                username: "",
                email: "",
                avatarUrl: "",
                website: "",
                content: "",
            });
            setActiveReplyId(null);
            await refreshComments();
        } else {
            setSubmitMessage(response.errorMsg || "评论提交失败");
        }

        setSubmitLoading(false);
        setTimeout(() => setSubmitMessage(null), 5000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) {
        return (
            <section className="mt-24 mx-auto w-full max-w-4xl py-4 px-2 md:px-4">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
                </div>
            </section>
        );
    }

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

        <Card>
            <CardContent className="py-3 md:px-6 px-4">
                {/* 顶部标签和日期 */}
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

                {/* 标题 */}
                <CardTitle className="mt-4 text-xl tracking-tight">
                    {article.title}
                </CardTitle>

                {/* 作者信息 */}
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
                        {/*{article.authorBio && (*/}
                        {/*    <p className="text-xs text-muted-foreground">{article.authorBio}</p>*/}
                        {/*)}*/}
                    </div>
                </div>

                <Separator className={"mt-8 mb-12"}/>


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


                <Separator className={"mt-12 mb-8"}/>

                {/* 评论表单 */}
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
                            handleSubmitComment(0).then();
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

                {/* 评论区域 */}
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
                        {commentsLoading ? (
                            <div className="flex items-center justify-center h-16">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
                            </div>
                        ) : comments.length === 0 ? (
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
                                    formData={formData}
                                    onInputChange={handleInputChange}
                                />
                            ))
                        )}
                    </CardContent>

                </div>

            </CardContent>
        </Card>

    </section>)
}