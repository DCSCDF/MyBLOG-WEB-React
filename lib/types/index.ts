export interface ApiResponse<T = unknown> {
    data: T;
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export interface PageData<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
}

export interface ConfigItem {
    configKey: string;
    configValue: string;
}

export interface SiteInfo {
    siteName: string;
    siteDomain: string;
    siteDescription: string;
    recordNumber: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    sortOrder: number;
}

export interface Article {
    id: number;
    categoryId: number;
    categoryName: string | null;
    title: string;
    summary: string;
    coverImage: string;
    tags: string;
    commentCount: number;
    isTop: boolean;
    authorNickname: string;
    authorAvatar: string | null;
    authorBio: string | null;
    mdContent: string;
    createTime: string;
}

export interface ArticleListParams {
    currentPage: number;
    pageSize: number;
    keyword?: string;
    categoryId?: number;
}

export interface CommentVO {
    id: number;
    parentId: number;
    username: string;
    email: string;
    avatarUrl: string | null;
    website: string | null;
    content: string;
    isAdmin: boolean;
    deviceInfo: string;
    createTime: string;
    updateTime: string;
    children: CommentVO[];
}

export interface SubmitCommentRequest {
    blogId: number;
    parentId: number;
    username?: string;
    email?: string;
    avatarUrl?: string;
    website?: string;
    content: string;
}

export interface SubmitCommentResponse {
    data: {
        id: number;
        message: string;
    };
    success: boolean;
    errorMsg: string | null;
    code: number;
}

export interface FriendLink {
    name: string;
    url: string;
    summary: string;
    imageUrl: string;
    createTime: string;
}

export interface FriendLinkListParams {
    currentPage: number;
    pageSize: number;
}

export interface SubmitFriendLinkRequest {
    name: string;
    url: string;
    summary?: string;
    imageUrl?: string;
}

export interface AdminInfo {
    nickname: string;
    email: string;
    avatarUrl: string | null;
    bio: string;
}

export interface TokenResponse {
    success: boolean;
    data?: {
        token: string;
    };
    message?: string;
    errorMsg?: string;
    code?: number;
}

export interface UserProfile {
    id: number;
    username: string;
    nickname: string;
    email: string;
    createTime: string;
    updateTime: string;
    avatarUrl: string | null;
}

export type ConfigResponse<T = null> = ApiResponse<T>;
export type BatchConfigResponse = ApiResponse<ConfigItem[]>;
export type CategoryListResponse = ApiResponse<Category[]>;
export type ArticlePageResponse = ApiResponse<PageData<Article>>;
export type CommentListResponse = ApiResponse<CommentVO[]>;
export type FriendLinkPageResponse = ApiResponse<PageData<FriendLink>>;
export type SubmitFriendLinkResponse = ApiResponse<string>;
export type AdminInfoResponse = ApiResponse<AdminInfo | null>;
export type ProfileResponse = ApiResponse<UserProfile>;