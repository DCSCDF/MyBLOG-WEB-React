import type {MetadataRoute} from "next";
import {getSiteInfoServer} from "@/lib/api/config.server";
import {
    getAdminArticleListServer,
    getUserArticleListServer,
} from "@/lib/api/article.server";
import {getCategoryListServer} from "@/lib/api/category.server";
import type {Article, Category, ArticleListParams, PageData} from "@/lib/types";

/**
 * 确保 URL 拥有合法的协议前缀。
 * 如果没有协议前缀，则默认补上 https://
 */
function ensureProtocol(url: string): string {
    if (!url) return "";
    const trimmed = url.trim().replace(/\/+$/, "");
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }
    return `https://${trimmed}`;
}

type FetchFn = (params: ArticleListParams) => Promise<PageData<Article> | null>;

/**
 * 通过分页方式从指定的文章列表 API 拉取全部文章。
 */
async function fetchAllArticlesFrom(fetchFn: FetchFn): Promise<Article[]> {
    const allArticles: Article[] = [];
    const pageSize = 100;
    let currentPage = 1;

    while (true) {
        const pageData = await fetchFn({currentPage, pageSize});

        // 没有数据或当前页为空，结束拉取
        if (!pageData || !pageData.records || pageData.records.length === 0) {
            break;
        }

        allArticles.push(...pageData.records);

        // 已到达最后一页，结束拉取
        if (currentPage >= pageData.pages || pageData.records.length < pageSize) {
            break;
        }

        currentPage += 1;

        // 安全上限：防止死循环（单源最多 10000 篇）
        if (allArticles.length >= 10000) {
            break;
        }
    }

    return allArticles;
}

/**
 * 按文章 id 去重，保留首次出现的记录。
 */
function dedupeArticles(articles: Article[]): Article[] {
    const seen = new Set<number>();
    const result: Article[] = [];
    for (const a of articles) {
        if (!seen.has(a.id)) {
            seen.add(a.id);
            result.push(a);
        }
    }
    return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteInfo = await getSiteInfoServer();
    const categories: Category[] = await getCategoryListServer();

    // /myblog 使用管理员文章接口；/blog/list 使用用户社区文章接口
    const [adminArticles, userArticles] = await Promise.all([
        fetchAllArticlesFrom(getAdminArticleListServer),
        fetchAllArticlesFrom(getUserArticleListServer),
    ]);

    // 两个合并后按 id 去重，避免出现重复 URL
    const allArticles = dedupeArticles([...adminArticles, ...userArticles]);

    const baseUrl = ensureProtocol(siteInfo?.siteDomain || "");
    const now = new Date();

    const entries: MetadataRoute.Sitemap = [];

    if (baseUrl) {
        // 首页
        entries.push({
            url: `${baseUrl}/`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        });

        entries.push({
            url: `${baseUrl}/myblog`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.95,
        });

        // /myblog 分类筛选页
        categories.forEach((category) => {
            entries.push({
                url: `${baseUrl}/myblog?categoryId=${category.id}`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.75,
            });
        });

        entries.push({
            url: `${baseUrl}/blog/list`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        });

        // /blog/list 分类筛选页
        categories.forEach((category) => {
            entries.push({
                url: `${baseUrl}/blog/list?categoryId=${category.id}`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.7,
            });
        });

        // 友链页
        entries.push({
            url: `${baseUrl}/links`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.6,
        });

        // 搜索页
        entries.push({
            url: `${baseUrl}/search`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.5,
        });
    }

    // 动态文章详情页（来自 /myblog 与 /blog/list 两个来源）
    allArticles.forEach((article) => {
        const lastMod = article.createTime
            ? new Date(article.createTime)
            : now;

        entries.push({
            url: baseUrl
                ? `${baseUrl}/article/${article.id}`
                : `/article/${article.id}`,
            lastModified: lastMod,
            changeFrequency: "monthly",
            priority: article.isTop ? 0.9 : 0.8,
        });
    });

    return entries;
}
