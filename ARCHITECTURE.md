# Blog 项目架构分析

## 概览

这是一个个人博客网站项目，使用 **Yarn Workspaces Monorepo** 架构组织，部署在 **Google Cloud App Engine** 上。文章以 Markdown 格式存储在 GitHub 仓库中，通过 GitHub API 动态拉取渲染。

在线地址：[martinqaq.monster](http://www.martinqaq.monster/)

---

## 目录结构

```
blog/
├── client/          # 前端版本 v1 — Vite + React 17，轻量风格
├── client2/         # 前端版本 v2 — Webpack + React 16 + Material UI（旧版，已废弃）
├── client3/         # 前端版本 v3 — Vite + React 17 + Material UI + react-markdown
├── server/          # 后端 — Koa + 自研路由装饰器框架
├── articles/        # 本地文章备份（Markdown 文件）
├── package.json     # Monorepo 根配置，定义 workspaces
├── Makefile         # 常用命令快捷入口
├── app.yaml         # GCP App Engine 部署配置
└── yarn.lock
```

---

## 后端 (server/)

### 技术栈
- **运行时**: Node.js / TypeScript
- **Web 框架**: Koa
- **路由/DI**: `@martinoooo/route-plugin`（自研装饰器框架）
- **模板引擎**: koa-hbs (Handlebars)
- **HTTP 客户端**: axios
- **编码**: js-base64

### 架构设计

采用**类 NestJS 的装饰器驱动架构**，由 `@martinoooo/route-plugin` 提供核心能力：

```
server/src/
├── main.ts                              # 应用入口
├── cats/
│   ├── cats.controller.ts               # API 控制器
│   └── cats.service.ts                  # 业务逻辑层
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts      # 全局异常过滤器
│   ├── interceptors/
│   │   └── transform.interceptor.ts      # 响应转换拦截器
│   ├── middleware/
│   │   ├── html.middleware.ts            # HTML 页面渲染中间件
│   │   └── logger.middleware.ts          # 请求日志中间件
│   └── helper/
│       └── loadJs.ts                     # Webpack manifest 辅助（已废弃）
└── views/
    └── view.hbs                          # Handlebars 模板
```

### 请求处理流程

```
请求 → Koa
  ├── koa-static (静态资源)
  ├── koa-hbs (模板引擎)
  ├── HtmlMiddleware  ─── 非 /api 请求 → 渲染 view.hbs
  │     └── /api 请求 → next()
  ├── LoggerMiddleware ─── 记录请求耗时
  ├── @Router('api') ─── 路由分发
  │     └── CatsController
  │           ├── GET /api/articles/list  →  获取文章目录
  │           └── GET /api/article?name=  →  获取文章内容
  ├── TransformInterceptor ─── 统一包装响应 { code, message, data }
  └── HttpExceptionFilter ─── 全局异常捕获
```

### 核心机制

1. **依赖注入**: `CatsService` 通过 `@Provider()` 装饰器注册，由 `@martinoooo/dependency-injection` 注入到 `CatsController` 构造函数。
2. **内容源**: 文章存储在 GitHub 仓库的 `articles/` 目录下，Service 通过 GitHub Contents API 拉取目录结构和文件内容（Base64 解码）。
3. **同构渲染**: 非 API 请求统一渲染 `view.hbs`，前端 SPA 接管路由。开发模式下通过 Vite dev server 的 HMR 注入实现热更新。

---

## 前端

项目存在三个前端版本，是逐步演进的产物。

### client/ — Vite 轻量版（当前主力）

- **构建工具**: Vite 2
- **框架**: React 17 + React Router 5
- **样式**: Less
- **特点**: 极简设计，自定义字体 (Roboto, Kanit)，三个页面 (Home / Blog / About)

```
client/src/
├── main.tsx              # 入口
├── App.tsx               # 路由配置 (BrowserRouter)
├── App.less              # 全局样式
├── index.less
├── pages/
│   ├── Home/             # 首页 — 欢迎语
│   ├── Blog/             # 博客页（占位，内容较少）
│   └── About/            # 关于页（占位）
├── static/               # 字体文件
│   ├── Kanit-Regular.ttf
│   ├── Roboto-Light.ttf
│   └── Roboto-Medium.ttf
```

### client3/ — Material UI 版

- **构建工具**: Vite 2
- **框架**: React 17 + React Router 5
- **UI 库**: Material UI 4 (makeStyles API)
- **Markdown 渲染**: react-markdown
- **特点**: 更完整的博客功能，含侧边抽屉导航，文章列表 + 内容双栏布局

```
client3/src/
├── pages/
│   ├── material/               # Material UI 主题的博客
│   │   ├── App.tsx             # 路由 + 主题配置
│   │   ├── components/
│   │   │   ├── Layout.tsx      # 顶栏 + 侧边导航
│   │   │   ├── Blog.tsx        # 文章列表 + 内容区
│   │   │   ├── ListItem.tsx    # 文章列表项
│   │   │   ├── Paper.tsx       # Markdown 渲染区
│   │   │   ├── SideDrawer.tsx  # 侧边抽屉导航
│   │   │   ├── Home.tsx / About.tsx / Ui.tsx
│   │   │   └── ...
│   │   └── constants/
│   └── qqspace/                # QQ 空间风格（实验性）
├── api/
│   └── articles.ts             # API 请求封装 (axios)
├── constants/
│   ├── index.ts                # BLOG_NAME = '城没有门'
│   ├── nav.tsx                 # 导航配置
│   └── ui.tsx                  # UI 选项
└── definetions/
    └── index.ts                # TypeScript 类型定义
```

### client2/ — Webpack 版（已废弃）

- **构建工具**: Webpack 4
- **框架**: React 16 + React Router 5 + Material UI 4
- **特点**: 多页面打包（每个 page 独立入口），manifest 清单，vendor 分包。已不再维护。

---

## 数据流

```
GitHub Repository (articles/*.md)
       │
       │  GitHub Contents API (GET /repos/:owner/:repo/contents/)
       ▼
  CatsService
       │
       ├── findList()  →  GET /api/articles/list
       │     遍历 articles/ 目录，返回 { name, path, children[] } 树
       │
       └── findOne()   →  GET /api/article?name=path/to/file
             获取单个文件内容，Base64 解码返回 Markdown 原文
       │
       ▼
  CatsController
       │  JSON: { code: 200, message: 'success', data: ... }
       ▼
  Client (浏览器)
       │
       ├── 文章列表 → 侧边栏目录树
       └── 文章内容 → react-markdown 渲染
```

---

## 关键设计决策

| 决策 | 说明 |
|------|------|
| **GitHub 作为 CMS** | 文章存储在 GitHub 仓库，无需数据库。通过 API 动态拉取，更新文章只需 Push。 |
| **自研路由框架** | `@martinoooo/route-plugin` 提供装饰器式路由 + DI + 中间件，模仿 NestJS 风格，轻量且自主可控。 |
| **SSR 同构路由** | 非 API 请求统一返回 `view.hbs`，前端 React Router 接管。避免了 SSR 的复杂性，同时保证了直接访问子路径的体验。 |
| **三个前端版本并存** | 反映技术选型的迭代：Webpack → Vite，从自定义样式 → Material UI。client/ 和 client3/ 是并行维护的两个版本。 |
| **Monorepo** | Yarn Workspaces 共享依赖，client/ 和 server/ 统一管理。但 client2/ 和 client3/ 未纳入 workspaces。 |

---

## 运行方式

```bash
# 安装依赖
make install

# 开发模式
make web      # 启动前端 (client/ Vite dev server @ :3000)
make serve    # 启动后端 (server/ ts-node + nodemon @ :8080)

# 部署
make deploy   # 构建前端 → gcloud app deploy
```

后端启动后，访问 `http://localhost:8080/` ，非 `/api` 路径渲染 `view.hbs`（开发模式下注入 Vite HMR 脚本），前端接管路由。

---

## 待改进点

1. **client2/ client3/ 未纳入 workspaces**，依赖独立管理，存在重复安装。
2. **GitHub ACCESS_TOKEN 未做环境变量注入**，需要在 `server/src/config.ts` 手动创建，不利于 CI/CD。
3. **三个前端版本并存**增加了维护成本，建议确定主版本后清理废弃代码。
4. **app.yaml 运行时为 nodejs10**，已 EOL，应升级至 Node.js 18+。
5. **view.hbs 硬编码了 Vite dev server 地址** (`localhost:3000`)，生产环境需手动切换。
