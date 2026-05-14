# 老谭小红书自动化｜项目原文档

更新时间：2026-05-10
项目编号：老谭第三个项目
项目名称：老谭小红书自动化

## 1. 项目定位

“老谭小红书自动化”是老谭内部使用的小红书图文内容生产工具。

它不是普通文案生成器，而是一个围绕老谭多个品牌知识库、对标图文、个人素材、GPT 读图、改稿对话、历史版本管理的小红书内容工作台。

核心目标：

1. 输入对标账号图文；
2. 输入自己的图片、案例和文字素材；
3. 选择对应品牌知识库；
4. GPT 读取图片和文字；
5. 自动生成小红书标题、正文、图片页脚本、标签和发布检查；
6. 可继续和 GPT 对话改稿；
7. 保留历史版本；
8. 最终输出已经空好格、可直接发布的小红书文案。

## 2. 固定入口

线上工具地址：

```text
https://laotanuwen.com/tools/xhs/
```

当前带版本号访问：

```text
https://laotanuwen.com/tools/xhs/?v=202605101740
```

访问密码：

```text
0000
```

> 说明：这是内部工具，仅供用户本人使用。

## 3. 以后提到“小红书自动化”时优先查找的路径

### 3.1 线上源码主路径

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页
```

### 3.2 页面文件

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/public/tools/xhs/index.html
```

同步备份页面：

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/tools/xhs/index.html
```

### 3.3 后端 Worker 文件

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/worker.js
```

### 3.4 Cloudflare 配置文件

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/wrangler.toml
```

### 3.5 项目原文档路径

桌面备份：

```text
/Users/tanzhimin/Desktop/老谭小红书自动化-项目原文档.md
```

仓库文档备份：

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/docs/老谭小红书自动化-项目原文档.md
```

线上公开备份文件：

```text
https://laotanuwen.com/docs/xhs-automation.md
```

对应源码：

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/public/docs/xhs-automation.md
```

## 4. 技术架构

### 4.1 部署域名

```text
laotanuwen.com
```

### 4.2 工具页面

```text
/tools/xhs/
```

### 4.3 API 接口

```text
/api/xhs-generate
```

### 4.4 Cloudflare 项目

```text
curly-frog-9f44
```

### 4.5 部署方式

GitHub push → Cloudflare Worker / Workers Assets 部署。

当前不要使用手动上传。

### 4.6 GitHub 仓库

```text
https://github.com/416866714-netizen/416866714-netizen.github.io.git
```

分支：

```text
main
```

### 4.7 Cloudflare Worker 配置

```text
name = "curly-frog-9f44"
main = "worker.js"
assets.directory = "./public"
```

## 5. 当前已实现功能

### 5.1 页面与入口

- 小红书内容工作台 v2；
- 页面地址 `/tools/xhs/`；
- 顶部紧凑控制条；
- 三栏工作台：
  - 对标图文；
  - 我的素材 / 我的内容；
  - 生成结果；
- 移动端响应式；
- 页面 noindex，避免搜索引擎收录。

### 5.2 密码保护

- `/tools/xhs/` 已加密码页；
- 密码：`0000`；
- 登录后写入 cookie；
- 已设置工具页面不缓存，避免绕过。

### 5.3 GPT-only 模型逻辑

- 当前强制使用 GPT 接口；
- 模型名：`gpt-5.5`；
- 接口 Base URL：`https://api.moril1.com/v1`；
- Key 存在 Cloudflare Worker Secret，不进入前端，不进入 GitHub；
- 页面顶部显示模型状态；
- 已尝试默认最高推理强度：
  - `reasoning_effort: high`
  - `reasoning: { effort: high }`
- 如果接口不支持推理参数，Worker 会自动去掉推理参数重试。

### 5.4 图片读取逻辑

当前图片处理为两步式：

```text
上传图片
→ 前端压缩图片
→ Worker 逐张提交给 GPT 做 OCR / 图片描述 / 小红书用途判断
→ 得到图片识别摘要
→ 再把图片摘要 + 企业知识库 + 对标文字 + 我的素材交给 GPT 生成最终文案
```

当前图片数量规则：

```text
对标图：最多 3 张
我的素材图：最多 6 张
```

压缩逻辑：

```text
最大宽度：720px
压缩质量：0.45
单张后端转发上限：约 420KB
```

### 5.5 企业知识库

已支持 5 个品牌知识库：

```text
品牌1
品牌2
品牌3
品牌4
品牌5
```

每个品牌可独立：

- 命名；
- 保存知识库；
- 读取知识库；
- 清除知识库。

知识库内容保存在当前浏览器 localStorage。

每个品牌知识库适合保存：

- 品牌调性；
- 品牌优势；
- 品牌劣势；
- 禁用词；
- 服务边界；
- 典型案例；
- 常用表达；
- 目标客户；
- 风险提醒。

### 5.6 内容生成

当前支持输入：

- 对标标题；
- 对标正文 / OCR 文本；
- 对标图文截图；
- 我喜欢它哪里；
- 我的图片素材；
- 我的文字素材 / 案例背景；
- 核心观点；
- 必须出现的信息；
- 不能出现的信息；
- 目标人群；
- 图片页数；
- 内容模板；
- 创作技能库。

当前输出：

- 对标拆解；
- 标题；
- 封面文案；
- 正文多版本；
- 图片页脚本；
- 灵感拆解；
- 发布检查；
- 评分；
- 标签；
- 读取状态；
- 图片识别摘要。

### 5.7 创作技能库

默认启用：

- 去 AI 味；
- 小红书爆款结构；
- 故事化表达；
- 强冲突标题；
- 老谭装修顾问语气。

可选：

- 小说灵感构思；
- 人物冲突；
- 三幕式结构；
- Save the Cat；
- 场景写作。

### 5.8 改稿对话

已增加 GPT 聊天改稿板块。

用户可以输入：

```text
帮我改到 300 字
标题更狠一点
更像真实业主
按品牌2知识库重写
每段之间空一行
现在用的什么模型？
```

改稿会带上：

- 当前版本；
- 用户修改要求；
- 历史版本摘要；
- 企业知识库；
- 图片识别摘要；
- 对标素材；
- 我的素材。

### 5.9 历史版本

每次生成 / 改稿会保存历史版本。

历史版本可以点击回看。

### 5.10 空好格

已增加：

```text
一键空好格
```

作用：

- 长段落拆短；
- 每 1-2 句话一段；
- 段落之间空一行；
- 方便直接复制到小红书。

后端 prompt 也已要求 GPT 输出时自动空好格。

## 6. 安全信息

### 6.1 不要写入前端或 GitHub 的内容

以下内容只能存在 Cloudflare Secret，不要写进 HTML / JS / Markdown / GitHub：

```text
OPENAI_API_KEY
DEEPSEEK_API_KEY
CLOUDFLARE_API_TOKEN
```

### 6.2 当前 Secret 名称

Cloudflare Worker Secret 使用：

```text
OPENAI_API_KEY
OPENAI_BASE_URL
OPENAI_MODEL
DEEPSEEK_API_KEY
```

注意：文档只记录 Secret 名称，不记录密钥值。

### 6.3 已知安全建议

之前 API Key 和 Cloudflare Token 曾通过聊天发送，建议后续稳定后重置：

- 重置 Cloudflare API Token；
- 重置 GPT / OpenAI 中转 Key；
- 如继续使用 DeepSeek，也重置 DeepSeek Key。

## 7. 当前最后相关提交

```text
83eac8b Add brand knowledge slots and staged image analysis
ab1778a Add XHS password chat and formatting controls
b87cbc5 Disable cache for protected XHS tool
```

## 8. 后续待优化

### 8.1 数据持久化

当前品牌知识库和历史版本存在浏览器 localStorage。

后续如果需要跨电脑同步，可接：

- 飞书多维表格；
- Cloudflare KV / D1；
- Supabase；
- 自建数据库。

### 8.2 账号级权限

当前密码是简单密码 `0000`。

后续可升级为：

- 用户名 + 密码；
- 飞书登录；
- Cloudflare Access；
- Token 访问。

### 8.3 图片生成

当前能生成图片页脚本，还没有自动生成小红书图片。

后续可加：

- 小红书封面图自动排版；
- 6-9 页图文卡片生成；
- PNG 批量导出；
- 品牌模板库。

### 8.4 内容复盘

后续可加入：

- 小红书发布时间；
- 阅读量；
- 点赞；
- 收藏；
- 评论；
- 哪个标题表现好；
- 反哺品牌知识库。

## 9. 维护规则

以后用户说到：

```text
小红书自动化
老谭小红书自动化
小红书内容工作台
/tools/xhs/
```

应优先定位到本项目。

优先读取路径：

```text
/Users/tanzhimin/Desktop/老谭小红书自动化-项目原文档.md
```

以及线上源码：

```text
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/public/tools/xhs/index.html
/Users/tanzhimin/Desktop/老谭官网系统/03-老谭网页开发资料-不要移动/老谭独立装修网页开发/官网首页/worker.js
```

修改规则：

1. 用户明确确认执行后再改；
2. 不再建议手动上传；
3. 使用 GitHub push → Cloudflare Worker 部署；
4. 修改后要线上验证；
5. 不要提交无关的官网首页改动；
6. 不要把任何 API Key 写进前端或仓库。
