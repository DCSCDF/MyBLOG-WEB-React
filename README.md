这是一个个人博客前端项目，后端使用 SpringBoot，前端采用 Next.js App Router 开发。如果你想要使用同款博客，可以去 GitHub 查看发行版仓库。

## 技术栈

- Next.js 16.2.10 (App Router)
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- shadcn/ui 组件库
- framer-motion 动画库

## 页面结构

- 首页：展示 3D 跑马灯背景和个人介绍，提供跳转到 GitHub 和博客的入口
- 我的博客：用户简介卡片和个人文章列表，支持分类筛选和分页
- 文章列表：所有用户的文章汇总，支持按分类筛选和分页浏览
- 作者列表：展示所有文章作者，可查看指定作者的文章
- 友情链接：展示友链列表，提供友链申请功能

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 http://localhost:3001 查看效果。

## 相关仓库

- 发行版仓库：https://github.com/DCSCDF/MYBLOG-Distribution