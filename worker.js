const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
  });
}

function textBlock(value, max = 12000) {
  return String(value || '').slice(0, max);
}


function hasXhsAuth(request) {
  return (request.headers.get('Cookie') || '').includes('xhs_auth=1');
}
function passwordPage(error = '') {
  return new Response(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>大壮内容工作台</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f6f2ea;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;color:#171717}.box{width:min(420px,92vw);background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:24px;box-shadow:0 24px 80px rgba(0,0,0,.1);padding:28px}h1{margin:0 0 8px;font-size:24px}p{color:#746f68}input{width:100%;box-sizing:border-box;border:1px solid #ddd;border-radius:14px;padding:13px;font-size:18px}button{margin-top:12px;width:100%;border:0;border-radius:14px;background:#171717;color:#fff;padding:13px;font-weight:900}.err{color:#e60012;font-size:13px}</style></head><body><form class="box" method="POST" action="/tools/xhs-login"><h1>大壮小红书内容工作台</h1><p>请输入访问密码</p><input name="password" type="password" autocomplete="current-password" autofocus placeholder="密码"><button>进入</button>${error?`<div class="err">${error}</div>`:''}</form></body></html>`,{headers:{'Content-Type':'text/html; charset=utf-8'}});
}
function formatXhsText(value='') {
  return String(value).replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(Boolean).flatMap(p=>{
    if (p.length<=46) return [p];
    return p.replace(/([。！？；])\s*/g,'$1\n').split('\n').map(x=>x.trim()).filter(Boolean);
  }).join('\n\n');
}

function buildSystemPrompt(input = {}) {
  const skills = Array.isArray(input.skills) ? input.skills.join('、') : '';
  return `你是“大壮小红书内容总编”和“创作教练”，服务于装修顾问品牌内容生产。你的任务不是泛泛写文案，而是根据对标内容、企业知识库和用户素材，生成可以直接发小红书的图文方案。

【核心原则】
1. 借结构，不借原文；借情绪，不照抄表达；借选题，不复制案例。
2. 必须优先使用企业知识库和用户自己的素材。
3. 必须去 AI 味：不要空话、套话、机械排比、首先其次最后、总而言之、在这个时代、作为专业人士等。
4. 要像真实的人在分享经验：有具体场景、有判断、有克制、有口语停顿。
5. 不要恐吓业主，不要绝对化承诺，不要贬低具体公司，不要过度广告。
6. 大壮是装修决策顾问，不是装修公司；核心是帮助业主先判断方案、报价、合同、边界和责任。
7. 最终正文必须已经空好格：每 1-2 句话一段，段落之间空一行，不要连续大段文字。

【已启用创作技能】${skills || '去 AI 味、小红书结构、故事化表达、强冲突标题、大壮装修顾问语气'}

【可调用的创作方法】
- 小红书结构：封面钩子、前三秒痛点、一页一个观点、结尾自然引导。
- 去 AI 味改写：删空话、短句和长句交错、保留人的判断和犹豫。
- 小说/灵感构思：What if、人物欲望冲突、三幕式、场景目标-冲突-结果、反常识角度。
- 发布检查：封面钩子、真实感、AI 味风险、广告感、对标相似度、收藏价值、评论引导。

【输出要求】
必须只输出 JSON，不要 Markdown 代码块。JSON 字段：
{
  "benchmarkAnalysis":"对标拆解",
  "final":"最终可发布版本，含标题、正文、标签",
  "titles":"标题 8 个 + 封面文案 5 个",
  "versions":"正文 A/B/C 三个版本",
  "script":"${input.pageCount || 6} 页图片页脚本，每页含画面建议、大字、小字、素材用途",
  "story":"灵感拆解/故事化表达建议",
  "check":"发布检查，含抄袭风险、广告感、AI味、优化建议",
  "scores":{"hook":数字,"real":数字,"ai":"低/中/高"}
}`;
}

function buildUserPrompt(input = {}, prompt = '') {
  return `请根据以下资料生成小红书图文方案。

【企业知识库】
${textBlock(input.knowledgeText, 8000)}

【对标标题】
${textBlock(input.benchmarkTitle, 1200)}

【对标正文】
${textBlock(input.benchmarkText, 5000)}

【对标亮点/我喜欢它哪里】
${textBlock(input.benchmarkNotes, 4000)}

【已有对标拆解】
${textBlock(input.benchmarkAnalysis, 3000)}

【我的素材/案例背景】
${textBlock(input.myNotes, 4000)}

【核心观点】
${textBlock(input.corePoint, 1200)}

【必须出现】
${textBlock(input.mustSay, 2000)}

【不能出现】
${textBlock(input.avoidSay, 2000)}

【目标人群】${input.audience || ''}
【图片页数】${input.pageCount || 6}
【内容模板】${input.template || ''}
【生成模式】${input.mode || ''}
【图片数量】对标 ${input.imageCounts?.benchmark || 0} 张；我的素材 ${input.imageCounts?.mine || 0} 张。

【前端拼装提示词备份】
${textBlock(prompt, 6000)}

请严格按 JSON 输出。`;
}

function normalizeDeepSeekJSON(content) {
  let raw = String(content || '').trim();
  raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  try { return JSON.parse(raw); } catch (_) {}
  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch (_) {}
  }
  return {
    benchmarkAnalysis: '',
    final: raw,
    titles: '',
    versions: '',
    script: '',
    story: '',
    check: '模型未返回标准 JSON，已原样展示。',
    scores: { hook: '--', real: '--', ai: '未知' },
  };
}


function usageState(input = {}, provider = 'deepseek') {
  const knowledge = textBlock(input.knowledgeText, 12000);
  const benchmark = `${input.benchmarkTitle || ''}${input.benchmarkText || ''}${input.benchmarkNotes || ''}`;
  const mine = `${input.myNotes || ''}${input.corePoint || ''}${input.mustSay || ''}${input.avoidSay || ''}`;
  const imgCount = (input.images?.benchmark?.length || 0) + (input.images?.mine?.length || 0);
  return {
    provider,
    knowledgeChars: knowledge.length,
    benchmarkChars: benchmark.length,
    myMaterialChars: mine.length,
    benchmarkImages: input.images?.benchmark?.length || input.imageCounts?.benchmark || 0,
    myImages: input.images?.mine?.length || input.imageCounts?.mine || 0,
    imageReadable: provider === 'openai' && imgCount > 0,
  };
}

function cleanImages(input = {}) {
  const b=(input.images?.benchmark||[]).slice(0,3).map(x=>({...x,group:'对标图'}));
  const m=(input.images?.mine||[]).slice(0,6).map(x=>({...x,group:'我的素材图'}));
  const all=[...b,...m];
  return all.filter(x => x && /^data:image\//.test(x.dataUrl || '') && String(x.dataUrl).length < 420000).slice(0, 9);
}

async function openAIChat(messages, env, maxTokens = 1800) {
  const payload = {
    model: env.OPENAI_MODEL || 'gpt-5.5',
    messages,
    temperature: 0.58,
    max_tokens: maxTokens,
    reasoning_effort: 'high',
    reasoning: { effort: 'high' },
    response_format: { type: 'json_object' },
  };
  let resp = await fetch((env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let text = await resp.text();
  if (!resp.ok && /reasoning|effort|unsupported|unknown/i.test(text)) {
    delete payload.reasoning_effort; delete payload.reasoning;
    resp = await fetch((env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions', {method:'POST',headers:{'Authorization':`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(payload)});
    text = await resp.text();
  }
  if (!resp.ok) throw new Error(text.startsWith('<') ? '上游或 Worker 返回 HTML 错误，通常是图片/文本过大或模型超时。' : text.slice(0, 1000));
  const data = JSON.parse(text);
  return data.choices?.[0]?.message?.content || '';
}

async function analyzeImages(input = {}, env) {
  const imgs = cleanImages(input);
  const out = [];
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const content = [
      { type: 'text', text: `请识别这张${img.group}${i+1}。输出JSON：{"group":"对标图/我的素材图","ocr":"图中文字","visual":"画面描述","content_points":["要点"],"xhs_use":"适合在小红书里承担的作用","risk":"可能误读/看不清的地方"}` },
      { type: 'image_url', image_url: { url: img.dataUrl, detail: 'low' } },
    ];
    try {
      const raw = await openAIChat([
        { role: 'system', content: '你是图片OCR和小红书图文拆解助手。只输出JSON。' },
        { role: 'user', content },
      ], env, 700);
      out.push(normalizeDeepSeekJSON(raw));
    } catch (e) {
      out.push({ group: img.group, error: String(e.message || e).slice(0, 500) });
    }
  }
  return out;
}

async function callOpenAI(input = {}, body = {}, env) {
  if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not configured on server.' }, 500);
  let imageAnalysis = body.imageAnalysis || input.imageAnalysis || [];
  if (body.action !== 'revise') imageAnalysis = await analyzeImages(input, env);
  const current = body.action === 'revise' ? `\n\n【当前版本】\n${textBlock(body.currentVersion, 10000)}\n\n【修改要求】\n${textBlock(body.revisionInstruction, 3000)}\n\n【历史版本摘要】\n${textBlock(JSON.stringify(body.history || []), 5000)}` : '';
  const userText = buildUserPrompt({...input, images:{}}, body.prompt) + `\n\n【图片识别摘要/OCR】\n${textBlock(JSON.stringify(imageAnalysis, null, 2), 9000)}` + current;
  let raw;
  try {
    raw = await openAIChat([
      { role: 'system', content: buildSystemPrompt(input) + '\n你已经拿到图片OCR摘要，必须把图片信息用于对标拆解和素材匹配。必须明确引用素材里的具体信息，不能泛泛输出装修模板。' },
      { role: 'user', content: userText },
    ], env, 3200);
  } catch (e) {
    return json({ error: 'OpenAI/GPT request failed', status: 502, detail: String(e.message || e).slice(0, 1000) }, 502);
  }
  const result = normalizeDeepSeekJSON(raw);
  if (typeof result.final === 'string') result.final = formatXhsText(result.final);
  if (result.final && typeof result.final === 'object' && result.final.body) result.final.body = formatXhsText(result.final.body);
  result.imageAnalysis = imageAnalysis;
  result.readState = usageState(input, 'openai');
  result.readState.imageAnalysisCount = imageAnalysis.length;
  return json(result);
}

async function handleXhsGenerate(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method === 'GET') {
    return json({ ok: Boolean(env.DEEPSEEK_API_KEY), deepseek: Boolean(env.DEEPSEEK_API_KEY), openai: Boolean(env.OPENAI_API_KEY), provider: 'multi', endpoint: '/api/xhs-generate', model: env.OPENAI_MODEL || 'gpt-5.5', reasoning: 'high' });
  }
  if (request.method !== 'POST') return json({ error: 'Method Not Allowed' }, 405);
  if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not configured on server.' }, 500);

  const body = await request.json().catch(() => ({}));
  const input = body.input || {};
  if (input.provider !== 'openai') input.provider = 'openai';
  return callOpenAI(input, body, env);
  const reviseContext = body.action === 'revise' ? `\n\n【当前版本】\n${textBlock(body.currentVersion, 10000)}\n\n【修改要求】\n${textBlock(body.revisionInstruction, 3000)}\n\n【历史版本摘要】\n${textBlock(JSON.stringify(body.history || []), 5000)}` : '';
  const payload = {
    model: input.model || env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [
      { role: 'system', content: buildSystemPrompt(input) },
      { role: 'user', content: buildUserPrompt(input, body.prompt) + reviseContext },
    ],
    temperature: 0.78,
    max_tokens: 2600,
    response_format: { type: 'json_object' },
  };

  const resp = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const text = await resp.text();
  if (!resp.ok) return json({ error: 'DeepSeek request failed', status: resp.status, detail: text.slice(0, 1000) }, 502);
  let data;
  try { data = JSON.parse(text); } catch (_) { return json({ error: 'DeepSeek returned non-json', detail: text.slice(0, 1000) }, 502); }
  const content = data.choices?.[0]?.message?.content || '';
  const result = normalizeDeepSeekJSON(content);
  result.readState = usageState(input, 'deepseek');
  return json(result);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/tools/xhs-login' && request.method === 'POST') { const form=await request.formData(); if (form.get('password')==='0000') return new Response('',{status:302,headers:{'Location':'/tools/xhs/','Set-Cookie':'xhs_auth=1; Path=/tools/xhs; Max-Age=2592000; HttpOnly; SameSite=Lax'}}); return passwordPage('密码不正确'); }
    if (url.pathname.startsWith('/tools/xhs') && !hasXhsAuth(request)) { const res = passwordPage(); res.headers.set('Cache-Control','no-store'); return res; }
    if (url.pathname === '/api/xhs-generate') return handleXhsGenerate(request, env);
    const res = await env.ASSETS.fetch(request);
    if (url.pathname.startsWith('/tools/xhs')) res.headers.set('Cache-Control','no-store');
    return res;
  },
};
