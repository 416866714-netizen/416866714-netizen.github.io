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



function compactInput(input = {}) {
  return {
    ...input,
    knowledgeText: textBlock(input.knowledgeText, 2000),
    benchmarkTitle: textBlock(input.benchmarkTitle, 500),
    benchmarkText: textBlock(input.benchmarkText, 1200),
    benchmarkNotes: textBlock(input.benchmarkNotes, 800),
    benchmarkAnalysis: textBlock(input.benchmarkAnalysis, 800),
    myNotes: textBlock(input.myNotes, 1000),
    corePoint: textBlock(input.corePoint, 300),
    mustSay: textBlock(input.mustSay, 500),
    avoidSay: textBlock(input.avoidSay, 500),
    images: { benchmark: [], mine: [] },
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
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), 52000);
  const payload = {
    model: env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    temperature: 0.5,
    max_tokens: Math.min(maxTokens, 2400),
    response_format: { type: 'json_object' },
  };
  let resp, text;
  try {
    resp = await fetch((env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    text = await resp.text();
  } catch (e) {
    throw new Error('GPT 请求超时或网络失败：' + String(e.message || e).slice(0, 300));
  } finally {
    clearTimeout(timer);
  }
  if (!resp.ok) throw new Error(text.startsWith('<') ? '上游或 Worker 返回 HTML 错误，通常是图片/文本过大或模型超时。' : text.slice(0, 1000));
  const data = JSON.parse(text);
  return data.choices?.[0]?.message?.content || '';
}

async function callDeepSeek(input = {}, body = {}, env) {
  input = compactInput(input);
  if (!env.DEEPSEEK_API_KEY) return json({ error: 'DEEPSEEK_API_KEY is not configured on server.' }, 500);
  const reviseContext = body.action === 'revise' ? `\n\n【当前版本】\n${textBlock(body.currentVersion, 9000)}\n\n【修改要求】\n${textBlock(body.revisionInstruction, 2500)}\n\n【历史版本摘要】\n${textBlock(JSON.stringify(body.history || []), 3000)}` : '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), 45000);
  const payload = {
    model: env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [
      { role: 'system', content: buildSystemPrompt(input) + '\n优先保证快速、稳定、可直接发布。没有图片 OCR 时，不要假装看到了图片，只基于文字素材生成。' },
      { role: 'user', content: buildUserPrompt({...input, images:{}}, '') + reviseContext },
    ],
    temperature: 0.72,
    max_tokens: 2400,
    response_format: { type: 'json_object' },
  };
  let resp, text;
  try {
    resp = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    text = await resp.text();
  } catch (e) {
    clearTimeout(timer);
    return json({ error: 'DeepSeek request timeout/network failed', detail: String(e.message || e).slice(0, 500) }, 502);
  }
  clearTimeout(timer);
  if (!resp.ok) return json({ error: 'DeepSeek request failed', status: resp.status, detail: text.slice(0, 1000) }, 502);
  let data;
  try { data = JSON.parse(text); } catch (_) { return json({ error: 'DeepSeek returned non-json', detail: text.slice(0, 1000) }, 502); }
  const result = normalizeDeepSeekJSON(data.choices?.[0]?.message?.content || '');
  if (typeof result.final === 'string') result.final = formatXhsText(result.final);
  if (result.final && typeof result.final === 'object' && result.final.body) result.final.body = formatXhsText(result.final.body);
  result.readState = usageState(input, 'deepseek-fast');
  result.readState.imageReadable = false;
  result.check = (result.check || '') + '\n\n系统说明：本次使用极速文本模式，优先保证生成成功；图片仅统计数量，未做视觉识别。需要精读图片时再走深度视觉模式。';
  return json(result);
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
  if (!(String(input.mode || '').includes('深度') && ((input.images?.benchmark?.length || 0) + (input.images?.mine?.length || 0) > 0))) input = compactInput(input);
  if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not configured on server.' }, 500);
  let imageAnalysis = body.imageAnalysis || input.imageAnalysis || [];
  if (body.action !== 'revise') imageAnalysis = await analyzeImages(input, env);
  const current = body.action === 'revise' ? `\n\n【当前版本】\n${textBlock(body.currentVersion, 10000)}\n\n【修改要求】\n${textBlock(body.revisionInstruction, 3000)}\n\n【历史版本摘要】\n${textBlock(JSON.stringify(body.history || []), 5000)}` : '';
  const userText = buildUserPrompt({...input, images:{}}, '') + `\n\n【图片识别摘要/OCR】\n${textBlock(JSON.stringify(imageAnalysis, null, 2), 9000)}` + current;
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



function getScriptsLibrary() {
  const position = {
    '8K设计': '长沙高审美住宅全案设计品牌：4K效果图、设计费清晰、设计到施工落地。',
    '玖玖精工 / 玖玖半包': '长沙大宅高标准半包施工：真实工地、工艺标准、图纸精算、附近工地。',
    '玖玖精装': '长沙高端精装房全案改造：8000元设计入口、瑞府背书、设计改造定制软装一体化。',
    '宅师傅半包装修': '长沙普通家庭透明半包：438元/㎡起、免费量房出图预算、先施工后付款、零增项保障。'
  };
  const items = [
    {brand:'8K设计', scene:'小红书私信', status:'Day1 首条触达', title:'8K设计 Day1 首条触达', text:'哈喽～看到你对 8K 设计内容感兴趣。我们专注全案设计落地，长沙有 100+ 别墅/复式/大平层项目落地中。如果你也在看长沙装修/设计，可以回个数字：\n\n1｜设计费和服务内容\n2｜同面积/同风格案例\n3｜设计到施工怎么落地\n\n也可以留个微信，我把详细资料和 4K 高清图发你看看。', logic:'用 1/2/3 让客户自选需求，最终动作落到留微信看高清图。'},
    {brand:'8K设计', scene:'小红书私信', status:'Day2 未回复追发', title:'8K设计 Day2 4K效果图激活', text:'我这边整理了几套 8K 最近客户比较喜欢的 4K 高清效果图，不同面积和风格都有。微信上看图更清楚，直接留个微信，我发你参考一下。', logic:'不重复问需求，直接用4K高清效果图重新激活。'},
    {brand:'8K设计', scene:'小红书私信', status:'Day3 轻收口', title:'8K设计 Day3 完工落地案例收口', text:'如果你后面还在看装修设计，我可以先发几套 4K 高清效果图和完工落地案例给你留着参考。微信上看图更清楚，留个微信就行，我发你。', logic:'加入完工落地案例，解决效果图能不能落地的顾虑。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'小红书私信', status:'Day1 首条触达', title:'玖玖精工 Day1 首条触达', text:'哈喽～看到你对玖玖精工的内容感兴趣。我们专注长沙高标准半包施工，目前有 100+ 别墅/复式/大平层工地在施工。如果你也在看长沙装修，可以回个数字：\n\n1｜看附近真实工地\n2｜半包报价/工价明细\n3｜有设计图，免费精算\n\n可以加个微信，我把工地、工艺和报价参考发你看看。', logic:'承接看工地、报价、图纸精算三类需求。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'小红书私信', status:'Day2 未回复追发', title:'玖玖精工 Day2 真实工地激活', text:'我这边整理了几个正在施工的真实工地案例，大平层、别墅、复式都有。小红书发图不太方便，直接留个微信，我把工地现场和工艺细节发你看看。', logic:'用真实工地和工艺细节建立信任。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'小红书私信', status:'Day3 轻收口', title:'玖玖精工 Day3 附近工地匹配', text:'如果你后面还在看装修施工，可以告诉我你在哪一片，我帮你看看附近有没有正在施工的工地。小红书发图不太方便，留个微信，我发你工地现场参考。', logic:'询问区域，推进到附近工地匹配。'},
    {brand:'玖玖精装', scene:'小红书私信', status:'Day1 首条触达', title:'玖玖精装 Day1 首条触达', text:'哈喽～玖玖精装改造全案交付，长沙 100+ 大平层案例落地中，近期长沙瑞府有 30+ 套在设计/施工/定制推进中。您目前关注哪方面呢：\n\n1｜瑞府/相近户型效果图\n2｜真实现场/完工案例\n3｜设计费/改造参考\n\n小红书发图不太方便，直接留个微信，我把对应案例发你。', logic:'兼容瑞府和非瑞府客户，减少运营判断压力。'},
    {brand:'玖玖精装', scene:'小红书私信', status:'Day2 未回复追发', title:'玖玖精装 Day2 精装改造效果图激活', text:'我这边整理了几套客户比较喜欢的精装改造 4K 高清效果图，瑞府也有不同风格的完工落地案例。微信上看图更清楚，直接留个微信，我按你喜欢的风格发你看看。', logic:'用精装改造4K效果图和瑞府完工案例激活。'},
    {brand:'玖玖精装', scene:'小红书私信', status:'Day3 轻收口', title:'玖玖精装 Day3 精装房改造轻收口', text:'如果你后面还在看精装房改造，我可以先发几套 4K 高清效果图和完工落地案例给你留着参考。微信上看图更清楚，直接留个微信就行，我发你。', logic:'不制造压力，保留微信入口。'},
    {brand:'宅师傅半包装修', scene:'小红书私信', status:'Day1 首条触达', title:'宅师傅 Day1 首条触达', text:'哈喽～看到你对宅师傅半包内容感兴趣。我们做长沙普通家庭透明半包，438 元/㎡起。可以免费量房，出平面图、施工图和精准预算，不签约也能带走参考。如果你也在看装修，可以回个数字：\n\n1｜看半包大概要多少钱\n2｜免费量房/出图/做预算\n3｜了解先装修后付款/零增项\n\n也可以留个微信，我把报价参考和免费出图流程发你看看。', logic:'打出438元/㎡起和免费量房出图预算，保持低决策成本。'},
    {brand:'宅师傅半包装修', scene:'小红书私信', status:'Day2 未回复追发', title:'宅师傅 Day2 免费出图预算激活', text:'宅师傅这边可以先免费量房，出平面图、施工图和精准预算，不签约也能带走参考。你可以先把自己家怎么装、要花多少钱搞清楚，留个微信我发你流程。', logic:'强化免费拿资料和低决策成本。'},
    {brand:'宅师傅半包装修', scene:'小红书私信', status:'Day3 轻收口', title:'宅师傅 Day3 先施工后付款收口', text:'宅师傅是先装修后付款，非图纸变更的增项公司负责。如果你还在看装修，可以先了解一下 438 半包报价和付款流程，留个微信我发你参考。', logic:'强化先施工后付款和增项保障。'},
    {brand:'8K设计', scene:'微信接待', status:'第1句 我是谁', title:'8K微信第1句：我是谁', text:'您好～我是8K全案设计这边主理人。我们不是只出效果图的纯设计，主要做「设计 + 半包落地」：好设计、高审美，但不做高溢价。[愉快]', logic:'建立8K不是纯设计、而是设计+半包落地的边界。'},
    {brand:'8K设计', scene:'微信接待', status:'第2句 有何不同', title:'8K微信第2句：有何不同', text:'我们原创设计师团队有12年+大宅设计经验，设计费按户型面积有清晰标准，200㎡内常规户型8000起。长沙别墅、复式楼、大平层100+项目施工落地中，工地随时可看。', logic:'证明原创团队、经验、设计费标准和施工落地能力。'},
    {brand:'8K设计', scene:'微信接待', status:'第3句 有什么好处', title:'8K微信第3句：有什么好处', text:'我们最近做了很多好看的新案例，效果图、完工落地和不同风格都有。您是哪个楼盘、大概多大面积？我看看有没有同楼盘、同面积或相近风格的案例，先发您参考。', logic:'引导客户说楼盘、面积、风格，便于精准匹配案例。'},
    {brand:'8K设计', scene:'微信接待', status:'第4句 降低开口成本', title:'8K微信第4句：数字选择题激活', text:'您如果暂时还没想清楚风格也没关系。我这边一般会先按三个方向帮客户看：\n\n1｜先看设计费和服务内容\n2｜先看同面积/同风格案例\n3｜先看效果图怎么落地成实景\n\n您回个数字就行，我按您想看的先发。', logic:'客户不回时，用数字选择题降低开口成本。'},
    {brand:'8K设计', scene:'微信接待', status:'第5句 轻收口', title:'8K微信第5句：轻收口', text:'那我先不打扰您。您后面如果还在看装修设计，直接发我「楼盘+面积」就行。我可以先帮您匹配几套同面积/相近风格案例，您先看看方向，不用急着定。', logic:'不逼客户，留下楼盘+面积的长期入口。'},
    {brand:'8K设计', scene:'微信接待', status:'执行原则', title:'8K微信接待核心原则', text:'不把微信当成继续硬推销的地方；不一上来乱甩一堆案例图；每句话都要配一个能证明实力的物料；先建立客户心智，再引导客户说楼盘、面积、风格；让客户觉得：这个公司有审美、有实力、有诚意，而且不是普通设计工作室。', logic:'用于约束8K微信接待整体语气和动作。'},
    {brand:'8K设计', scene:'配套物料', status:'物料说明', title:'8K全案设计服务边界图', text:'这张图不是案例图，而是告诉客户8K到底做什么、不做什么。建议内容：8K做全案设计、效果图、施工图、半包落地配合；不只出效果图、不做套模板设计、不只卖设计概念；适合长沙大平层、复式、别墅、改善型住宅客户。', logic:'配合第1句，建立8K不是普通纯设计公司的心智。'},
    {brand:'8K设计', scene:'配套物料', status:'物料说明', title:'8K实力背书证据图', text:'这张图要证明8K不是靠话术包装，而是真的有团队、有经验、有项目、有落地。建议内容：原创设计师团队；12年+大宅设计经验；200㎡内常规户型8000起；100+别墅/复式/大平层施工落地中；真实工地随时可看。', logic:'配合第2句，证明原创团队、经验、设计费标准和施工落地能力。'},
    {brand:'8K设计', scene:'配套物料', status:'物料说明', title:'8K近期案例目录 / 案例菜单', text:'这里不要直接乱甩一套案例，而是给客户一个案例库菜单。建议内容：按户型分大平层、复式、别墅、改善型住宅；按风格分现代、奶油、法式、中古、侘寂、意式等；按资料类型分4K效果图、完工落地案例、效果图vs实景、施工落地过程。', logic:'配合第3句，让客户知道可以按楼盘、面积、风格精准匹配。'},
    {brand:'8K设计', scene:'配套物料', status:'物料说明', title:'8K微信资料选择卡', text:'这张卡片用来降低客户开口成本，让客户不需要组织长句，只需要回数字。1｜设计费和服务内容：适合还在了解设计公司、想先看价格和服务边界的客户；2｜同面积/同风格案例：适合想找装修感觉、先看审美和案例的客户；3｜效果图落地实景：适合担心效果图好看但落不了地的客户。', logic:'配合第4句，用选择题激活未回复客户。'},
    {brand:'8K设计', scene:'配套物料', status:'物料说明', title:'8K案例匹配入口卡', text:'这张卡片是最后的低压力入口，把客户从“要不要合作”转成“先看看我家适合什么方向”。建议内容：发我楼盘+面积，帮你匹配案例；可匹配同面积4K效果图、同风格完工案例、效果图vs实景落地、设计费和服务内容；适合大平层、复式、别墅、改善型住宅。', logic:'配合第5句，不逼客户成交，留下长期入口。'},
    {brand:'8K设计', scene:'微信接待', status:'执行顺序', title:'8K微信5句完整执行顺序', text:'第1句：我是谁，建立8K不是纯设计、而是设计+半包落地的边界。第2句：有何不同，证明原创团队、经验、设计费标准和施工落地能力。第3句：有什么好处，引导客户说楼盘、面积、风格，便于精准匹配案例。第4句：降低开口成本，客户不回时用数字选择题激活。第5句：轻收口，不逼客户，留下楼盘+面积的长期入口。', logic:'执行人员按顺序推进，不要一次性乱发。'},
    {brand:'8K设计', scene:'微信接待', status:'执行提醒', title:'8K微信接待执行提醒', text:'第1-3句为统一必发，不管客户是否主动说话，都要先完成第一层心智建立；第3句之后开始判断客户是否回复；如果客户回复楼盘、面积、风格，立即进入客户回话后的统一承接；如果客户不回复，再发第4句、第5句；不要在微信里一次性甩大量图片，要按客户信息精准匹配；8K微信接待的重点不是催到店，而是先让客户相信：8K有审美、有实力、有真实落地能力。', logic:'2026-05-11并入主流程。'},
    {brand:'玖玖精装', scene:'品牌知识库', status:'品牌定位', title:'玖玖精装品牌定位定稿', text:'长沙高端精装房全案改造品牌。用高审美设计和8000元设计费切入高端楼盘客户，依靠自有改造施工团队、自有定制设计与安装团队，提供设计、改造、定制、软装一站式落地服务。', logic:'生成玖玖精装回复时，必须围绕高端精装房全案改造，不要说成普通装修公司。'},
    {brand:'玖玖精装', scene:'品牌知识库', status:'心智定位', title:'玖玖精装心智定位', text:'高端精装房想改得好看、省心、能落地，先看玖玖精装。对客户来说，玖玖精装不是普通装修公司，而是一个：比传统高端公司更有性价比，又比普通改造公司更懂设计和落地的全案团队。', logic:'用于回答客户为什么选玖玖精装。'},
    {brand:'玖玖精装', scene:'品牌知识库', status:'产品定位', title:'玖玖精装产品定位', text:'以8000元全案设计作为入口，承接后端精装改造 + 全屋定制 + 软装落地的一体化产品。设计：8000元设计费，对标行业150-200元/㎡设计水平，用高审美效果图吸引客户；改造：玖玖精工原班施工团队，自有改造施工体系，不靠外包拼施工队；定制：自有定制设计师、自有定制安装师，核心是设计、深化、安装衔接更顺；背书：已进入长沙瑞府这类顶级楼盘，瑞府30+套在设计/施工/定制推进中。', logic:'生成回复时可拆成设计、改造、定制、背书四个卖点。'},
    {brand:'玖玖精装', scene:'品牌知识库', status:'一句话定位', title:'玖玖精装一句话理解', text:'玖玖精装是用高审美设计和8000元设计费切入高端精装房客户，再依靠自有改造施工团队、自有定制设计/安装团队和长沙瑞府背书，承接精装房全案交付的高性价比品牌。', logic:'适合给客户做短版解释。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'品牌知识库', status:'品牌定位', title:'玖玖精工品牌定位定稿', text:'长沙大宅高标准半包施工品牌。玖玖精工专注别墅、复式、大平层等大宅项目施工，长期承接长沙设计工作室的高端设计落地项目，用接近头部施工公司的工艺标准，服务对施工品质、落地还原和工地管理有要求的客户。它不是最低价半包，而是：工艺好、工地多、懂设计落地、价格比顶级公司更合理的大宅施工团队。', logic:'生成玖玖精工回复时，不要占便宜半包心智，要占高标准施工里的高性价比心智。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'品牌知识库', status:'心智定位', title:'玖玖精工心智定位', text:'有设计图，想找靠谱施工方；想要好工艺，又不想多花顶级公司的溢价，就看玖玖精工。更直白一点：高端设计图要落地，大宅半包施工找玖玖精工。玖玖精工要占的不是“便宜半包”心智，而是高标准施工里的高性价比选择。', logic:'用于承接有设计图、正在找施工方的大宅客户。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'品牌知识库', status:'产品定位', title:'玖玖精工产品定位', text:'面向别墅、复式、大平层客户的高标准半包施工服务。核心产品结构：高标准工艺，工艺接近头部施工公司，对标更高端、更贵的施工公司，不是普通低价半包队伍；价格更合理，相比顶级施工公司便宜约20%，核心是少花品牌溢价，保留施工品质；先装修后付款，降低客户信任门槛；100+大宅工地背书；长期承接长沙设计工作室的高端设计施工单，懂设计师图纸，能配合复杂节点和现场还原。', logic:'生成回复时可拆成工艺、价格、付款、工地、设计工作室背书。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'品牌知识库', status:'一句话定位', title:'玖玖精工最终一句话定位', text:'玖玖精工是长沙大宅高标准半包施工团队，长期承接设计工作室高端设计落地项目，100+别墅/复式/大平层工地在施工，工艺接近头部公司，价格比顶级公司更合理，并支持先装修后付款。', logic:'适合在微信里做短版背书。'},
    {brand:'玖玖精工 / 玖玖半包', scene:'品牌知识库', status:'对外短版表达', title:'玖玖精工对外短版表达', text:'长沙大宅高标准半包施工｜100+别墅/复式/大平层工地在施工｜长期承接设计工作室高端设计落地｜好工艺，比顶级公司少花约20%。', logic:'适合海报、资料卡、短句回复。'}
  ];
  return items.map((x, idx) => ({ id: idx + 1, source: '飞书文档整理', position: position[x.brand] || '', ...x }));
}

function scriptsImages(input = {}) {
  return (input.images || []).filter(x => x && /^data:image\//.test(x.dataUrl || '') && String(x.dataUrl).length < 420000).slice(0, 6).map(x=>({...x,group:'聊天记录截图'}));
}
async function analyzeScriptImages(input = {}, env) {
  const imgs = scriptsImages(input), out=[];
  for (let i=0;i<imgs.length;i++) {
    const img=imgs[i];
    try {
      const raw=await openAIChat([
        {role:'system',content:'你是聊天记录OCR和销售话术风格分析助手。只输出JSON。'},
        {role:'user',content:[{type:'text',text:'识别这张聊天截图，区分“我说的”和“客户说的”，提取我的语气、句式、追问方式、成交节奏。输出JSON：{"ocr":"完整文字","my_style":"我的表达风格","customer_points":["客户关注点"],"usable_phrases":["可复用句子"],"avoid":"不确定/看不清"}'},{type:'image_url',image_url:{url:img.dataUrl,detail:'low'}}]}
      ],env,900);
      out.push(normalizeDeepSeekJSON(raw));
    } catch(e) { out.push({error:String(e.message||e).slice(0,500)}); }
  }
  return out;
}
async function handleScriptsReply(request, env) {
  if (request.method === 'OPTIONS') return new Response(null,{headers:CORS});
  if (request.method === 'GET') return json({ok:Boolean(env.OPENAI_API_KEY), endpoint:'/api/scripts-reply', model: env.OPENAI_MODEL || 'gpt-5.5'});
  if (request.method !== 'POST') return json({error:'Method Not Allowed'},405);
  if (!env.OPENAI_API_KEY) return json({error:'OPENAI_API_KEY is not configured'},500);
  const body=await request.json().catch(()=>({}));
  const input=body.input||{};
  const imageStyle = body.action==='revise' ? [] : await analyzeScriptImages(input, env);
  const prompt = `【最高优先级要求】\n你必须读取并使用下面的信息包。不要只看客户原话。生成时按优先级执行：1品牌知识库/服务边界/禁用表达；2标准话术库；3我的聊天风格；4知识草稿与训练反馈；5客户原话。若信息冲突，以品牌知识库和服务边界为准。\n\n【网页汇聚给 GPT 的完整信息包】\n${textBlock(input.gptContext || '',40000)}\n\n【客户原话】\n${textBlock(input.customerQuestion,3000)}\n\n【场景】${input.scene||''}\n【客户状态】${input.status||''}\n【当前品牌】${input.brand||''}\n\n【品牌知识库】\n${textBlock(input.brandKb,22000)}\n\n【标准话术库】\n${textBlock(input.scriptKb,26000)}\n\n【我的聊天风格库】\n${textBlock(input.styleKb,16000)}\n\n【当前未保存知识补充表单】\n${textBlock(input.currentKbForm,12000)}\n\n【最近训练反馈/好坏案例】\n${textBlock(input.feedbackKb,16000)}\n\n【聊天截图风格分析】\n${textBlock(JSON.stringify(imageStyle,null,2),9000)}\n\n【当前版本】\n${textBlock(body.current,6000)}\n\n【本次修改要求】\n${textBlock(body.revision,2000)}\n\n请输出JSON：{"best":"可直接发送的推荐回复，短句，像真人，不油腻，已空好行；必须体现当前品牌调性并避开服务边界外承诺","versions":"温柔版/专业版/强势版/微信版/小红书私信版","analysis":"客户类型、真实意图、风险点、成交机会，并说明本次用了哪些品牌信息/服务边界","next":"如果客户回复/不回复分别怎么接下一句","style":"从品牌知识库、话术库、聊天记录里学到的品牌调性、服务边界、禁用表达和可复用句式"}`;
  let raw;
  try { raw=await openAIChat([
    {role:'system',content:'你是大壮公司的销售话术总教练，擅长微信、小红书私信、评论区和代运营成交沟通。你必须逐项读取网页汇聚的信息包，尤其是当前品牌知识库、服务边界、禁用表达、标准话术库、聊天风格、知识草稿和训练反馈。回复必须贴合当前品牌调性；不得输出与服务边界冲突的承诺；不要像AI，不要油腻，不要过度承诺。输出JSON。'},
    {role:'user',content:prompt}
  ],env,2600); } catch(e) { return json({error:'GPT request failed', detail:String(e.message||e).slice(0,1000)},502); }
  const r=normalizeDeepSeekJSON(raw);
  return json({best:formatXhsText(r.best||r.final||''),versions:r.versions||'',analysis:r.analysis||'',next:r.next||'',style:r.style||'',imageStyle});
}

async function handleXhsGenerate(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method === 'GET') {
    return json({ ok: Boolean(env.DEEPSEEK_API_KEY || env.OPENAI_API_KEY), deepseek: Boolean(env.DEEPSEEK_API_KEY), openai: Boolean(env.OPENAI_API_KEY), provider: 'auto', endpoint: '/api/xhs-generate', model: env.DEEPSEEK_MODEL || 'deepseek-chat', fallbackModel: env.OPENAI_MODEL || 'gpt-4o-mini', reasoning: 'fast' });
  }
  if (request.method !== 'POST') return json({ error: 'Method Not Allowed' }, 405);

  const body = await request.json().catch(() => ({}));
  const input = body.input || {};
  const imgCount = (input.images?.benchmark?.length || 0) + (input.images?.mine?.length || 0);
  const mode = String(input.mode || '');

  // 默认走极速文本模式：小红书成稿先保证快和稳定。
  // 只有用户选择“深度分析”且上传图片时，才走视觉 OCR，避免 9 张图片逐张识别导致 Cloudflare/上游超时。
  if (!(mode.includes('深度') && imgCount > 0)) {
    if (env.DEEPSEEK_API_KEY) return callDeepSeek(input, body, env);
    if (!env.OPENAI_API_KEY) return json({ error: 'No AI API key configured on server.' }, 500);
  }

  if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not configured on server.' }, 500);
  input.provider = 'openai';
  return callOpenAI(input, body, env);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/tools/xhs-login' && request.method === 'POST') { const form=await request.formData(); if (form.get('password')==='0000') return new Response('',{status:302,headers:{'Location':'/tools/xhs/','Set-Cookie':'xhs_auth=1; Path=/tools/xhs; Max-Age=2592000; HttpOnly; SameSite=Lax'}}); return passwordPage('密码不正确'); }
    if ((url.pathname.startsWith('/tools/xhs') || url.pathname.startsWith('/tools/scripts')) && !hasXhsAuth(request)) { const res = passwordPage(); res.headers.set('Cache-Control','no-store'); return res; }
    if (url.pathname === '/api/xhs-generate') return handleXhsGenerate(request, env);
    if (url.pathname === '/api/scripts-reply') return handleScriptsReply(request, env);
    if (url.pathname === '/api/scripts-library') return json({ ok: true, source: 'feishu-doc:NkgtdR8eAoW470xdgtMcYePVnmf', items: getScriptsLibrary() });
    const res = await env.ASSETS.fetch(request);
    if (url.pathname.startsWith('/tools/xhs') || url.pathname.startsWith('/tools/scripts')) res.headers.set('Cache-Control','no-store');
    return res;
  },
};
