"use client";

import {useState} from "react";
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
import "katex/dist/katex.min.css";

interface Comment {
    id: number;
    author: string;
    initials: string;
    time: string;
    content: string;
    isAdmin?: boolean;
    replies?: Comment[];
}

function CommentItem({
                         comment,
                         isReply = false,
                         activeReplyId,
                         setActiveReplyId,
                     }: {
    comment: Comment;
    isReply?: boolean;
    activeReplyId: number | null;
    setActiveReplyId: (id: number | null) => void;
}) {
    const showReply = activeReplyId === comment.id;

    return (
        <div className={isReply ? "ml-8 pl-4" : ""}>
            <div className="flex items-start gap-3 py-3">
                <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                        {comment.initials}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{comment.author}</span>
                        {comment.isAdmin && (
                            <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                                管理员
                            </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {comment.content}
                    </p>
                    <button
                        type="button"
                        onClick={() => setActiveReplyId(showReply ? null : comment.id)}
                        className="mt-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        回复
                    </button>
                    {showReply && (
                        <form className="mt-2 space-y-3 p-1">
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <Label htmlFor={`reply-name-${comment.id}`} className="text-xs">
                                        名称
                                    </Label>
                                    <Input
                                        id={`reply-name-${comment.id}`}
                                        placeholder="Your name"
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`reply-email-${comment.id}`} className="text-xs">
                                        邮箱
                                    </Label>
                                    <Input
                                        type="email"
                                        id={`reply-email-${comment.id}`}
                                        placeholder="your@email.com"
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`reply-avatar-${comment.id}`} className="text-xs">
                                        头像URL
                                    </Label>
                                    <Input
                                        type="url"
                                        id={`reply-avatar-${comment.id}`}
                                        placeholder="https://example.com/img"
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`reply-url-${comment.id}`} className="text-xs">
                                        网站链接
                                    </Label>
                                    <Input
                                        type="url"
                                        id={`reply-url-${comment.id}`}
                                        placeholder="https://example.com"
                                        className="h-8 text-xs"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`reply-message-${comment.id}`} className="text-xs">
                                    内容
                                </Label>
                                <Textarea
                                    id={`reply-message-${comment.id}`}
                                    placeholder={`回复 ${comment.author}...`}
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
                                <Button type="button" size="sm" className="h-7 text-xs">
                                    发送
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            {comment.replies?.map((reply) => (
                <CommentItem
                    key={reply.id}
                    comment={reply}
                    isReply
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                />
            ))}
        </div>
    );
}

export default function Article() {
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

    // 示例 Markdown 内容（包含 Mermaid 图表和 LaTeX 数学公式）
    const articleContent = `After three years of scaling a Django monolith, our deploy times stretched past 45 minutes and a single failing test could block the entire team. We did not jump straight to microservices. Instead, we drew service boundaries inside the monolith first, enforcing them with module-level import rules and shared nothing between domains.

## Architecture Overview

Here's a diagram showing our migration strategy:

\`\`\`mermaid
graph LR
    A[Monolith] --> B[Identify Boundaries]
    B --> C[Extract Billing Domain]
    C --> D[Internal HTTP Interface]
    D --> E[Separate Database]
    E --> F[Reduced Deploy Time: 45min → 3min]
\`\`\`
| 关系类型 | 主实体 | 关联实体 | 关系说明 | 基数 |
|---------|-------|---------|---------|-----|
| 用户角色 | SysUser | SysUserRole | 用户拥有角色 | 1:N |
| 角色分配 | SysRole | SysUserRole | 角色分配给用户 | 1:N |
| 角色权限 | SysRole | SysRolePermission | 角色拥有权限 | 1:N |
| 权限分配 | SysPermission | SysRolePermission | 权限分配给角色 | 1:N |
| 角色权限组 | SysRole | SysRolePermissionGroup | 角色拥有权限组 | 1:N |
| 权限组分配 | SysPermissionGroup | SysRolePermissionGroup | 权限组分配给角色 | 1:N |
| 权限归属 | SysPermission | SysPermissionGroupItem | 权限属于权限组 | 1:N |
| 权限组包含 | SysPermissionGroup | SysPermissionGroupItem | 权限组包含权限 | 1:N |

## Key Metrics

The performance improvement was significant:

$$
\\text{Deploy Time Reduction} = \\frac{45 - 3}{45} \\times 100\\% = 93.3\\%
$$

We also observed:

$$
\\text{Success Rate} = \\frac{N_{success}}{N_{total}} = \\frac{987}{1000} = 98.7\\%
$$

## Technical Implementation

### Code Example

Here's how we structured our service boundaries:

\`\`\`typescript
// billing.service.ts
export class BillingService {
  private apiClient: HttpClient;
  
  constructor() {
    this.apiClient = new HttpClient('/internal/billing');
  }
  
  async createInvoice(data: InvoiceData): Promise<Invoice> {
    return this.apiClient.post('/invoices', data);
  }
  
  async processPayment(invoiceId: string): Promise<Payment> {
    return this.apiClient.post(\`/invoices/\${invoiceId}/pay\`);
  }
}
\`\`\`

### Database Migration Timeline

\`\`\`mermaid
gantt
    title Billing Domain Migration Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Define API Surface           :a1, 2024-01-01, 30d
    Implement HTTP Interface     :a2, after a1, 45d
    section Phase 2
    Run Dual Write Mode          :b1, after a2, 90d
    Migrate to Separate DB       :b2, after b1, 30d
    section Phase 3
    Remove Old Code              :c1, after b2, 15d
    Optimize Performance         :c2, after c1, 30d
\`\`\`

## Mathematical Model

Our deployment success rate follows a binomial distribution:

$$
P(k \\text{ successes in } n \\text{ trials}) = \\binom{n}{k} p^k (1-p)^{n-k}
$$

Where:
- $n$ = total number of deployments
- $k$ = successful deployments  
- $p$ = probability of success per deployment

For our billing service migration:
- $n = 250$ deployments over 6 months
- $k = 247$ successful deployments
- $p \\approx 0.987$

$$
\\mu = np = 250 \\times 0.987 = 246.75
$$

$$
\\sigma = \\sqrt{np(1-p)} = \\sqrt{250 \\times 0.987 \\times 0.013} \\approx 1.79
$$

## Conclusion

The lesson was not that monoliths are bad. The lesson was that **boundaries matter more than infrastructure**. A well-structured monolith with clean domain separation will outperform a distributed system with tangled dependencies every time.

> Start with boundaries, extract services only when you have a concrete operational reason.

### Key Takeaways

- ✅ **Identify clear API surfaces** before extracting services
- ✅ **Use internal HTTP interfaces** to enforce boundaries
- ✅ **Migrate databases gradually** to minimize risk
- ✅ **Measure performance improvements** to justify the effort
`;

    const comments: Comment[] = [
        {
            id: 1,
            author: "Elena Vasquez",
            initials: "EV",
            time: "2 hours ago",
            isAdmin: true,
            content:
                "Great breakdown of server components. The mental model shift from client-first to server-first is the hardest part for teams adopting this pattern.",
            replies: [
                {
                    id: 2,
                    author: "David Kim",
                    initials: "DK",
                    time: "1 hour ago",
                    content:
                        "Agreed. We found that starting with server components by default and only adding 'use client' when needed made the transition much smoother.",
                },
            ],
        },
        {
            id: 3,
            author: "Raj Patel",
            initials: "RP",
            time: "5 hours ago",
            content:
                "Would love a follow-up on how this integrates with existing state management libraries. We use Zustand heavily and the boundary between server and client state is still unclear.",
        },
        {
            id: 4,
            author: "Mia Thompson",
            initials: "MT",
            time: "Yesterday",
            content:
                "The performance comparison at the end was really helpful. Seeing the before and after bundle sizes made the case for our team to prioritize the migration.",
        },
    ];

    return (<section className={"mt-24 mx-auto w-full max-w-4xl py-4 px-2 md:px-4"}>

        <Card>
            <CardContent className="py-3 md:px-6 px-4">
                {/* 顶部标签和日期 */}
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">Business</Badge>
                    <span className="text-xs text-muted-foreground">
                        10 October 2025
                    </span>
                </div>

                {/* 标题 */}
                <CardTitle className="mt-3 text-xl tracking-tight">
                    Autodesk Looks to the Future of 3D Printing with Project Escher
                </CardTitle>

                {/*/!* 描述 *!/*/}
                {/*<CardDescription className="mt-2 line-clamp-2">*/}
                {/*    Warner Music Group announced it is acquiring selected assets of the*/}
                {/*    music platform Songkick, including its concert-finding app and*/}
                {/*    trademark. The deal closes a prolonged legal dispute between the two*/}
                {/*    companies.*/}
                {/*</CardDescription>*/}

                {/* 作者信息 */}
                <div className="mt-4 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop"
                            alt="Otto Gonzalez"
                        />
                        <AvatarFallback>OG</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Otto Gonzalez</p>
                        <p className="text-xs text-muted-foreground">Senior Editor</p>
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
                        {articleContent}
                    </Streamdown>
                </div>


                <Separator className={"mt-12 mb-8"}/>

                {/* 联系表单 */}
                <section className="mx-auto w-full">
                    <div className="overflow-hidden rounded-lg bg-card">
                        {/*<div className="md:px-6 px-0 py-5">*/}
                        {/*    <h2 className="text-sm font-medium">回复</h2>*/}
                        {/*    <p className="mt-1 text-xs text-muted-foreground">*/}
                        {/*        回复后将进行审核才可见.*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <form className="space-y-4 md:px-6 px-0 py-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">名称</Label>
                                    <Input id="name" placeholder="Your name"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">邮箱</Label>
                                    <Input type="email" id="email" placeholder="your@email.com"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="avatar">头像URL</Label>
                                    <Input type="url" id="avatar" placeholder="https://example.com/img"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="url">网站链接</Label>
                                    <Input type="url" id="url" placeholder="https://example.com"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">内容</Label>
                                <Textarea id="message" placeholder="content" rows={4}/>
                            </div>
                            <div className="flex justify-end">
                                <Button type="button" className="w-full max-w-40">
                                    发送评论
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* 评论区域 */}
                <div className="overflow-hidden rounded-lg bg-card">
                    <CardHeader className="md:px-6 px-0 pb-5">
                        <CardTitle className="font-semibold text-xl tracking-tight">
                            评论
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {comments.length} 个评论在此篇文章
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="md:px-6 px-0 py-0">
                        {comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                activeReplyId={activeReplyId}
                                setActiveReplyId={setActiveReplyId}
                            />
                        ))}
                    </CardContent>

                </div>

            </CardContent>
        </Card>

    </section>)
}
