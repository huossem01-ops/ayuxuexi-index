# 阿语百宝箱公开索引

阿语百宝箱的 Public SEO/GEO 内容仓库。它生成可由 Nginx 挂载到 `ayuxuexi.com` 指定子路径的静态页面，不接管网站根路径，也不包含完整学习应用的数据与业务代码。

## 双仓库边界

| 仓库 | 可见性 | 职责 |
| --- | --- | --- |
| `ayzsdsb` | Private | 根页面、真题训练、词汇学习、API、完整题库和词库 |
| `ayuxuexi-index` | Public | 学习指南、常见问题、项目说明、sitemap、llms.txt 和结构化数据 |

最终请求由同一台服务器上的 Nginx 分流：

```text
ayuxuexi.com/             → Private Next.js 应用
ayuxuexi.com/training     → Private Next.js 应用
ayuxuexi.com/words        → Private Next.js 应用
ayuxuexi.com/api/*        → Private Next.js 应用
ayuxuexi.com/faq          → 本仓库静态页面
ayuxuexi.com/guide        → 本仓库静态页面
ayuxuexi.com/zhuansi      → 本仓库静态页面
ayuxuexi.com/about        → 本仓库静态页面
```

Private 应用不提供指向这些公开资料页的导航。公开资料主要通过搜索引擎、站点地图、外部链接或直接 URL 被发现。

## 当前公开页面

| 路径 | 内容 |
| --- | --- |
| `/guide` | 阿拉伯语学习与备考方法 |
| `/zhuansi` | 阿语专四备考结构说明 |
| `/faq` | 使用、进度、设备与内容边界 |
| `/about` | 项目定位与数据保护原则 |

仓库根路径不生成 Landing Page，线上 `/` 始终由 Private 项目处理。

## 本地开发

要求 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

公开边界检查、生产构建与静态产物测试：

```bash
npm test
```

构建产物位于 `out/`。

## 静态资源隔离

Next.js 的 `assetPrefix` 设置为 `/_seo`。线上 HTML 会从 `/_seo/_next/` 加载本仓库的构建资源，避免和 Private Next.js 应用的 `/_next/` 发生冲突。

图片等 Public 资源统一放在 `public/seo-assets/`，线上路径为 `/seo-assets/`。

## SEO 与 GEO

- 所有 canonical URL 均使用 `https://ayuxuexi.com/<path>`。
- 各页面提供独立标题、描述与 Open Graph 元数据。
- `/faq` 提供 `FAQPage` JSON-LD。
- 指南和专四说明提供 `Article` JSON-LD。
- `/about` 提供 `Organization` JSON-LD。
- `sitemap.xml` 同时列出完整应用入口和公开资料页。
- `robots.txt` 禁止抓取 `/api/`，并声明统一 sitemap。
- `llms.txt` 提供面向生成式检索系统的公开内容索引。

## 数据安全红线

Public 仓库禁止包含：

- 完整词库或可重建完整词库的批量数据；
- 历年原题、选项、标准答案和私有解析；
- Private 仓库内部 ID、数据顺序或文件副本；
- API 密钥、数据库凭据、用户反馈和运行时数据；
- 指向 Private Git 仓库的 submodule 或自动同步任务。

`npm run check:public` 会检查常见私密路径、字段标记、密钥形式和危险文件名。它是基础防线，不能替代人工审查。

## Nginx

参考配置位于 `deploy/nginx-ayuxuexi-index.conf.example`。配置必须合并进现有 HTTPS `server` 块，先执行 `nginx -t`，再由管理员决定是否 reload。

本仓库本身不执行服务器部署、不修改 DNS，也不负责启动 Private 应用。

## 许可

除非项目所有者另行书面授权，否则品牌名称、文案、视觉资产和代码均保留权利。
