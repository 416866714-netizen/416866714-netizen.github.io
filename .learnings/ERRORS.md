# Error Log

## [ERR-20260527-001] xhs-generate image timeout

**Logged**: 2026-05-27T12:00:00+08:00
**Priority**: high
**Status**: fixed
**Area**: backend/frontend

### Summary
小红书生成在带“我的图片素材”时容易显示接口异常，根因是同一请求先 Qwen-VL 识图，再把原始 base64 图片继续传给 GPT-5.5 生成，导致请求体和视觉模型耗时叠加，容易触发上游/网关超时或截断。

### Details
纯文字 GPT-5.5 high 请求线上可成功但耗时约 56 秒；带图片请求旧版返回 `directImagesAttached:true`，说明图片被二次传给生成模型。修复后图片只走一次 OCR/识图，生成阶段只传图片摘要，线上带图片请求返回 `directImagesAttached:false` 且 HTTP 200。

### Suggested Action
以后涉及图片生成链路时，避免在一个 Worker 请求内重复传大图。先 OCR/摘要，再文本生成；错误提示必须展示分类，如上游超时、限流、内容过大、参数不兼容，而不是统一显示“接口异常”。

### Metadata
- Source: user_feedback
- Related Files: worker.js, public/tools/xhs/index.html
- Tags: xhs, image, timeout, cloudflare-worker, gpt-5.5

---

## [ERR-20260527-002] xhs vision provider mismatch

**Logged**: 2026-05-27T13:35:00+08:00
**Priority**: medium
**Status**: fixed
**Area**: backend/frontend

### Summary
用户明确希望 GPT-5.5 自己识图，不希望默认另接 Qwen-VL。上一版虽然降低了带图生成异常，但产品心智变成“先 Qwen OCR，再 GPT 生成”，和用户对 GPT-5.5 多模态能力的预期不一致。

### Details
修复后，“我的图片素材”默认直接随生成请求发给 GPT-5.5；只有 GPT-5.5 直读图片失败时，才启用 Qwen-VL/OCR 摘要兜底。前端状态同步显示 `GPT-5.5直读`、`备用摘要`、`无图片`，避免用户误判当前链路。

### Suggested Action
以后外接视觉模型只能作为降级路径，不能在用户指定多模态主模型时抢主链路。状态栏必须把主模型、推理强度、识图模式说清楚。

### Metadata
- Source: user_feedback
- Related Files: worker.js, public/tools/xhs/index.html
- Tags: xhs, vision, gpt-5.5, qwen-vl, product-expectation

---
