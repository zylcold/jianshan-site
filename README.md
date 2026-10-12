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

仓库公开；推送到 `main` 且改动位于 `site/**` 时，由 GitHub Actions（`.github/workflows/pages.yml`）自动发布到 GitHub Pages。

站点地址：https://zylcold.github.io/jianshan-site/

## 联系方式

yunlongzhu0315@gmail.com
