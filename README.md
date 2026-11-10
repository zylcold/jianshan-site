# 见山官网

[访问官网](https://zylcold.github.io/jianshan-site/) · [App Store](https://apps.apple.com/app/id6820524973)

静态站点，使用 HTML、CSS 和原生 JavaScript。首页包含滚动视差、三幅水墨诗境、Agent 创作介绍、六种画风、自然声试听、呼吸引导与画廊展示。自然声由访客主动播放，切换诗境或隐藏页面时停止。系统开启减少动态效果后，保留呼吸文字提示并停用视差和光晕变化。

## 本地预览

```sh
python3 -m http.server 8080 --directory site
```

打开 [http://localhost:8080](http://localhost:8080)。`site/privacy.html` 与 `site/terms.html` 分别为隐私政策及用户协议。

## 素材来源

素材取自见山 App 工程，图片压缩为 WebP，首页水墨山水用独立的透明栅格图分层排布。

| 网站素材 | App 工程来源 |
| --- | --- |
| 墨山、近岸与亭 | `Jianshan/Resources/InkTerrain/`、`Jianshan/Resources/InkMotifs/` |
| 图标、宣纸与墨绫挂轴 | `Jianshan/Assets.xcassets/` |
| 《山居秋暝》《定风波》《江雪》 | App 水墨渲染，使用 `scripts/render_metal_preview.py` 的诗境输出及 `promo/scene-frames/ink/` 素材 |
| 六种画风样张 | `promo/scene-frames/` 中的 App 渲染图 |
| 溪流、细雨、山风 | `Jianshan/Resources/Audio/` 中的 AAC 录音，署名与许可见首页底部 |

呼吸引导演示沿用 App 的 `BreathPattern.poetry` 节奏，吸气 6 秒，呼气 10 秒。

## 部署

推送 `site/**` 到 `main` 后，现有 GitHub Actions 工作流 `Deploy Pages` 自动发布。
