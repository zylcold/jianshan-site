# jianshan-site

静态说明站点，只提供隐私政策与用户协议页面（主页为占位）。

## 内容

| 页面 | 说明 |
| --- | --- |
| `site/index.html` | 主页（占位，暂不实现） |
| `site/privacy.html` | 隐私政策 |
| `site/terms.html` | 用户协议 |
| `site/assets/style.css` | 站点样式（自动适配深色模式） |

站点刻意保持简洁：不介绍未发布的功能、不放截图、不做宣传，仅提供提交审核与合规所需的页面。

## 本地预览

```sh
cd site && python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 部署

仓库为私有；站点通过 Cloudflare Pages 发布（静态文件直接上传，不接入 Git 集成）：

```sh
cd site && npx wrangler pages deploy . --project-name <项目名> --branch main
```

## 联系方式

yunlongzhu0315@gmail.com
