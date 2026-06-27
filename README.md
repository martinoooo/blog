# blog

个人博客网站，基于 Vite + React 18 + Material UI，文章以 Markdown 格式存储在 `articles/` 目录下，构建时通过 `import.meta.glob` 打包进静态产物，部署在 Vercel。

## 项目结构

```
blog/
├── src/           # 前端源码
│   ├── api/       # 文章数据获取（构建时 glob 导入）
│   ├── pages/     # 页面组件
│   └── constants/ # 常量配置
├── articles/      # Markdown 文章（按子目录分类）
├── dist/          # 构建产物（Vite 输出）
├── index.html     # HTML 入口
├── vite.config.ts
├── tsconfig.json
└── vercel.json    # Vercel 部署配置
```

## 使用

```bash
# 安装依赖
pnpm install

# 本地开发
pnpm dev

# 构建
pnpm build

# 预览构建产物
pnpm preview
```

## 添加文章

在 `articles/` 目录下按分类子目录放置 `.md` 文件即可，构建时自动打包。

```
articles/
├── React/
│   └── xxx.md
├── Tech/
│   └── xxx.md
└── ...
```

## 部署

项目配置了 `vercel.json`，连上 Vercel 后自动构建部署为静态站点。
