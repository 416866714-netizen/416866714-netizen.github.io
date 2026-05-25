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
  return new Response(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>老谭内容工作台</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f6f2ea;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;color:#171717}.box{width:min(420px,92vw);background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:24px;box-shadow:0 24px 80px rgba(0,0,0,.1);padding:28px}h1{margin:0 0 8px;font-size:24px}p{color:#746f68}input{width:100%;box-sizing:border-box;border:1px solid #ddd;border-radius:14px;padding:13px;font-size:18px}button{margin-top:12px;width:100%;border:0;border-radius:14px;background:#171717;color:#fff;padding:13px;font-weight:900}.err{color:#e60012;font-size:13px}</style></head><body><form class="box" method="POST" action="/tools/xhs-login"><h1>老谭小红书内容工作台</h1><p>请输入访问密码</p><input name="password" type="password" autocomplete="current-password" autofocus placeholder="密码"><button>进入</button>${error?`<div class="err">${error}</div>`:''}</form></body></html>`,{headers:{'Content-Type':'text/html; charset=utf-8'}});
}

const XHS_DEFAULT_BRANDS = {
  "brand1": {
    "name": "8K设计",
    "knowledge": "8K设计｜品牌信息\n\n一、品牌定位\n8K设计是长沙高审美住宅全案设计品牌，用清晰设计费标准，服务想把家装得好看、专业、并且真正能落地的装修客户。它不是只做纸面方案、只出效果图的纯设计工作室，而是围绕全案设计、施工图、效果图、设计落地配合形成完整服务，让客户既能看到审美，也能看到落地路径。\n\n二、产品定位\n8K设计的核心产品是全案设计服务。服务内容包含平面方案、4K高清效果图、施工图、设计落地配合，以及围绕户型、风格、预算和施工可行性的系统设计判断。设计费标准清晰，适合想找设计师但担心设计费太贵、担心设计和施工脱节的业主。内容表达中要突出：4K效果图、同面积/同风格案例、设计费和服务内容、设计到施工怎么落地。\n\n三、客户心智定位\n客户心里想的是：我想家装得好看，但不想被高额设计费吓退，也想确认设计最后能不能落地。所以8K要占据的心智是：好看、设计费清晰、能落地。不是低价装修，不是普通半包施工，也不是精装房改造品牌。\n\n四、核心吸引人群\n主要吸引注重审美和风格的长沙业主，大平层、改善型住宅、毛坯房客户，以及想找设计师但担心设计费贵、设计和施工脱节的人。尤其适合对风格、空间比例、户型优化、生活方式规划有要求的客户。\n\n五、内容方向\n小红书内容要围绕高审美、全案设计、4K效果图、同面积/同风格案例、设计费、设计落地、户型优化。可以写设计费透明、风格案例种草、户型优化、4K高清效果图、设计到施工怎么落地、效果图与落地能力的信任证明。标题和正文要让客户感觉：不是找一个会画图的人，而是找一个懂审美、懂生活、也懂落地边界的设计团队。\n\n六、转化钩子\n私信和内容承接可以围绕三个入口：1｜设计费和服务内容；2｜同面积/同风格案例；3｜设计到施工怎么落地。客户不回复时，用4K高清效果图、完工落地案例和同户型同风格参考重新激活。引导客户留下楼盘、面积、喜欢风格，再匹配案例。\n\n七、表达边界\n可以强调高审美、原创设计、设计费清晰、案例匹配、设计落地配合；不要承诺绝对省钱、保证效果完全一样、保证零增项。语气要有审美、有专业判断，但不能油腻，不要空泛说“高端大气”，要落到具体户型、风格、设计费、效果图、施工落地。"
  },
  "brand2": {
    "name": "玖玖精工 / 玖玖半包",
    "knowledge": "玖玖精工 / 玖玖半包｜品牌信息\n\n一、品牌定位\n玖玖精工 / 玖玖半包是长沙高标准半包施工品牌，核心不是低价，而是真实工地、施工工艺和高标准交付。它服务的是已经准备装修、已经有设计图，或者正在找靠谱施工方的业主，重点解决施工靠不靠谱、工艺标不标准、报价透不透明、工地能不能真实验证的问题。\n\n二、产品定位\n核心产品是半包施工和施工落地服务。客户可以看真实工地，有设计图纸可以免费核算，品牌拥有100+别墅、复式、大平层工地在施工。服务重点包括半包报价、工价明细、图纸精算、施工工艺、工地管理、节点落地和现场验证。玖玖精工要表达的是高标准施工，而不是“最低价半包”。\n\n三、客户心智定位\n客户心里想的是：我已经准备装修或有设计图了，现在最怕施工翻车，想找一个靠谱、工地真实可看的施工团队。所以玖玖精工要占据的心智是：施工靠谱、工地真实可看、工艺标准清楚、图纸能精算、报价能核对。\n\n四、核心吸引人群\n主要吸引已有设计图、正在找施工方的业主；关注施工标准、工艺和报价的人；大平层、复式、别墅、改善型住宅客户；想看真实工地再决策的客户；怕装修延期、增项、偷工减料的人。内容里要多出现大宅、高标准半包、真实工地、工艺细节、图纸精算、附近工地。\n\n五、内容方向\n小红书内容要围绕真实工地、半包施工、工艺标准、图纸精算、看附近工地、施工报价、工地细节。可以写真实工地实拍、施工工艺拆解、半包报价/工价明细、图纸报价流程、施工避坑、看工地建立信任。标题和正文要让客户感到“这个团队能落地、能被验证、不是靠嘴说”。\n\n六、转化钩子\n承接用户时可以围绕三个入口：1｜看附近真实工地；2｜半包报价/工价明细；3｜有设计图，免费精算。客户不回复时，用真实工地和工艺细节激活；再进一步询问客户在哪一片，推进到附近工地匹配。客户如果已有图纸，要强调可以按图纸核算，不要只给笼统单价。\n\n七、表达边界\n不要把玖玖精工写成精装房改造品牌，不要写成设计公司，不要主打低价。可以说高标准、真实工地、100+工地、图纸精算、工艺透明，但不要承诺绝对零增项、保证最低价、保证施工永远不出问题。语气要专业、实在、施工现场感强，多写工地、节点、报价、图纸、验收这些能建立信任的内容。"
  },
  "brand3": {
    "name": "玖玖精装",
    "knowledge": "玖玖精装｜品牌信息\n\n一、品牌定位\n玖玖精装是长沙高端大宅精装全案改造品牌，专注高端楼盘、精装房改造和一站式交付。它不是普通装修公司，也不是单纯软装搭配，而是围绕设计、改造、定制、软装形成完整交付链路，帮助高端精装房业主把原始交付改成更符合审美、生活方式和品质要求的家。\n\n二、产品定位\n核心产品是精装房全案改造，包含设计 + 改造 + 定制 + 软装一站式落地。品牌有长沙100+大平层案例落地中，近期长沙瑞府有30+套在设计、施工、定制推进中。可提供4K高清效果图、真实现场、完工案例、相近户型参考。内容表达里要突出高端楼盘、精装改造、同楼盘案例、完工落地、4K效果图、真实现场。\n\n三、客户心智定位\n客户心里想的是：我买的是高端楼盘或精装房，不想将就原始精装，想找一个懂同楼盘、懂审美、能全案落地的团队。所以玖玖精装要占据的心智是：高端精装改造、全案交付、懂楼盘、懂审美、能落地。\n\n四、核心吸引人群\n主要吸引长沙高端楼盘业主，精装房想重新改造的客户，大平层、别墅、改善型住宅客户，以及想省心做设计、改造、定制、软装一体化交付的人。尤其适合对高审美、整体感、同户型参考、落地品质和省心交付有要求的客户。\n\n五、内容方向\n小红书内容要围绕精装改造、高端楼盘、长沙瑞府、全案交付、同户型案例、完工落地、4K效果图、真实现场。可以写高端楼盘内容、长沙瑞府等小区案例、精装房改造前后对比、不同风格完工落地案例、设计改造定制软装一体化表达。不要把玖玖精装写成普通半包，也不要写成只做效果图的设计公司。\n\n六、转化钩子\n承接客户时可以用：1｜相近户型/面积效果图；2｜真实现场/完工案例；3｜设计费/改造费参考。重点是让客户留下楼盘、面积和喜欢的风格，然后匹配同楼盘、同户型或相近风格的4K高清设计实景案例。内容里可以自然带出长沙瑞府30+套推进中、100+大平层案例落地中，但不要每篇都硬广。\n\n七、表达边界\n可以强调高端精装房改造、瑞府背书、100+案例、设计+改造+定制+软装一站式、4K效果图和完工案例；不要承诺绝对省钱、保证零增项、保证完全复刻。语气要高级、专业、克制，不能低价感太重。要让客户感觉这是懂高端楼盘、懂审美、懂交付的团队。"
  },
  "brand4": {
    "name": "宅师傅半包装修",
    "knowledge": "宅师傅半包装修｜品牌信息\n\n一、品牌定位\n宅师傅半包装修是长沙普通家庭透明半包装修品牌，服务预算敏感、怕被坑、想先把方案和预算搞清楚的业主。它不追求高端审美，也不吸引高端大宅客户，核心打法是低价格 + 好施工 + 强保障 + 低决策成本。\n\n二、产品定位\n核心产品是普通家庭半包装修服务。基础半包438元/㎡，综合一般550-600元/㎡。可以免费量房、免费平面图、免费施工图、免费精准预算，不签约也可以带走资料参考。支持先施工后付款，验收满意后再付款；非图纸变更增项，公司负责；有27项超国标工艺。内容里要让客户感到：先把自己家怎么装、要花多少钱搞清楚，再决定要不要合作。\n\n三、客户心智定位\n客户心里想的是：我预算不高，但不想被坑；我想先免费把图纸和预算算清楚，再决定要不要合作。所以宅师傅要占据的心智是：低价格、强保障、免费算清预算、普通家庭友好、决策成本低。\n\n四、核心吸引人群\n主要吸引中端偏低预算客户、普通刚需家庭、第一次装修的小白业主、价格敏感型客户，以及怕增项、怕先交钱、怕报价不透明的人。它适合想做半包、自己控制主材、希望报价清楚、施工有保障的长沙业主。\n\n五、内容方向\n小红书内容要围绕438半包、普通家庭、免费量房、免费平面图、免费施工图、精准预算、先施工后付款、零增项、低决策成本、装修避坑。可以写半包报价、半包避坑、普通家庭装修建议、真实工地、材料、合同、增项避坑。不要写成高端设计账号，也不要写成大宅高标准施工品牌。\n\n六、转化钩子\n承接客户时可以用三个入口：1｜看半包大概要多少钱；2｜免费量房/出图/做预算；3｜了解先装修后付款/零增项。客户不回复时，强化“免费拿资料、低决策成本”；再进一步强调先装修后付款、非图纸变更增项公司负责，降低客户担心被坑、被增项、先交钱后被动的顾虑。\n\n七、表达边界\n可以强调438元/㎡起、免费量房出图预算、先施工后付款、透明半包、普通家庭友好；但不要把438说成所有客户最终价，不要过度承诺绝对零增项，要说明以实际房屋、方案、图纸和施工内容为准。语气要清楚、实在、接地气，让第一次装修的业主能听懂、敢咨询。"
  }
};

function hydrateXhsBrand(input = {}) {
  const slot = input.brandSlot || 'brand1';
  const def = XHS_DEFAULT_BRANDS[slot] || XHS_DEFAULT_BRANDS.brand1;
  const name = String(input.brandName || '').trim() || def.name;
  const userKb = String(input.knowledgeText || '').trim();
  return {
    ...input,
    brandName: name,
    knowledgeText: `【当前选择品牌】${name}
【网页内置品牌资料】
${def.knowledge}

【用户补充/本机保存品牌资料】
${userKb}`.trim(),
  };
}

function formatXhsText(value='') {
  let s = String(value || '')
    .replace(/\r/g, '')
    .replace(/[\u2028\u2029]/g, '\n')
    .replace(/<br\s*\/?>(?!\n)/gi, '\n')
    .replace(/\s*([|｜])\s*/g, '\n\n')
    .replace(/([。！？；])(?=\S)/g, '$1\n\n');
  const lines = s.split('\n').map(x => x.trim()).filter(Boolean);
  const out = [];
  for (const line of lines) {
    if (/^(标题|最终正文|正文|标签|#)/.test(line) || line.length <= 34) { out.push(line); continue; }
    const parts = line.replace(/([。！？；])\s*/g, '$1\n').split('\n').map(x=>x.trim()).filter(Boolean);
    let buf = '';
    for (const part of parts) {
      if (!buf) buf = part;
      else if ((buf + part).length <= 42) buf += part;
      else { out.push(buf); buf = part; }
    }
    if (buf) out.push(buf);
  }
  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

function buildSystemPrompt(input = {}) {
  const skills = Array.isArray(input.skills) ? input.skills.join('、') : '';
  return `你是“老谭小红书内容总编”和“创作教练”，服务于装修顾问品牌内容生产。你的任务不是泛泛写文案，而是根据对标内容、企业知识库和用户素材，生成可以直接发小红书的图文方案。

【核心原则】
1. 必须先拆解对标文案：标题钩子、开头痛点、段落节奏、转折结构、结尾引导；借结构，不借原文；借情绪，不照抄表达；借选题，不复制案例。
2. 必须优先使用企业知识库和用户自己的素材。
3. 必须去 AI 味：不要空话、套话、机械排比、首先其次最后、总而言之、在这个时代、作为专业人士等。
4. 要像真实的人在分享经验：有具体场景、有判断、有克制、有口语停顿。
5. 不要恐吓业主，不要绝对化承诺，不要贬低具体公司，不要过度广告。
6. 老谭是装修决策顾问，不是装修公司；核心是帮助业主先判断方案、报价、合同、边界和责任。
7. 最终正文必须已经空好格：每 1-2 句话一段，段落之间空一行；必须使用真实换行符，不要用“|/｜/分段符号”代替换行。
8. 小红书正文硬限制：生成的最终正文含标题、正文、标签合计不得超过1000个中文字符；优先控制在800-950字。

【已启用创作技能】${skills || '去 AI 味、小红书结构、故事化表达、强冲突标题、老谭装修顾问语气'}

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
  return `请根据资料生成小红书图文方案。必须围绕当前选择品牌，不能忽略品牌资料。

【品牌/企业知识库，最高优先级，必须使用】
${textBlock(input.knowledgeText, 1800)}

【对标文案，必须认真拆解；不是复制】
对标标题：${textBlock(input.benchmarkTitle, 500)}
对标正文，最多1000字：${textBlock(input.benchmarkText, 1000)}
我喜欢/要学习的点：${textBlock(input.benchmarkNotes, 800)}
已有对标拆解补充：${textBlock(input.benchmarkAnalysis, 800)}

【强制对标要求】
1. 先在 benchmarkAnalysis 字段里拆出：标题钩子、开头痛点、正文结构、段落节奏、情绪推进、结尾引导。
2. final 正文要学习对标的“结构和节奏”，但不能照抄原句、案例和具体表达。
3. 如果对标文案为空，要在 check 里明确说明“未提供对标文案”。

【我的素材】
${textBlock(input.myNotes, 500)}

【核心观点】${textBlock(input.corePoint, 200)}
【必须出现】${textBlock(input.mustSay, 300)}
【不能出现】${textBlock(input.avoidSay, 300)}
【目标人群】${input.audience || ''}
【页数】${input.pageCount || 6}
【当前品牌名称】${input.brandName || ''}
【模板】${input.template || ''}
【模式】${input.mode || ''}
【图片数量】对标 ${input.imageCounts?.benchmark || 0} 张；我的素材 ${input.imageCounts?.mine || 0} 张。

输出：必须包含 benchmarkAnalysis、final、titles、script、check、scores。final 含标题、正文、标签合计不超过1000字；必须使用真实换行符分段，不要用“|/｜/分段符号”代替换行；每段之间空一行，复制到小红书后也应自然分段。`;
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

function standardizeXhsResult(result = {}) {
  if (!result || typeof result !== 'object') return result;
  if (!result.final) {
    const title = result['标题'] || result.title || '';
    const body = result['正文'] || result.body || result.content || '';
    if (title || body) result.final = `${title ? '标题：' + title + '\n\n' : ''}${body}`;
  }
  if (!result.titles && result['标题']) result.titles = String(result['标题']);
  if (!result.script && result['图片脚本']) result.script = Array.isArray(result['图片脚本']) ? result['图片脚本'].map(x => typeof x === 'string' ? x : JSON.stringify(x, null, 2)).join('\n\n') : String(result['图片脚本']);
  if (!result.check && result['发布检查']) result.check = typeof result['发布检查'] === 'string' ? result['发布检查'] : JSON.stringify(result['发布检查'], null, 2);
  if (!result.versions && result['正文']) result.versions = String(result['正文']);
  if (!result.scores) result.scores = { hook: '--', real: '--', ai: '低' };
  return result;
}



function enforceXhsBrandMention(result = {}, input = {}) {
  const brand = String(input.brandName || '').trim();
  if (!brand) return result;
  const short = brand.split('/')[0].trim();
  const all = JSON.stringify(result, null, 2);
  if (all.includes(short) || all.includes(brand)) return result;
  const summaries = {
    '8K设计': `如果你是长沙业主，想要家里好看、设计费清晰、最后还能落地，可以重点了解${brand}：全案设计、4K效果图、同面积/同风格案例、设计到施工落地配合。`,
    '玖玖精工': `如果你是长沙别墅、复式、大平层业主，有设计图想找靠谱半包施工方，可以重点了解${brand}：高标准半包施工、真实工地、图纸精算、工艺透明，适合怕施工翻车的人。`,
    '玖玖精装': `如果你是长沙高端楼盘或精装房业主，不想将就原始精装，可以重点了解${brand}：设计+改造+定制+软装一站式落地，可按楼盘、户型和风格匹配案例。`,
    '宅师傅': `如果你是长沙普通家庭、第一次装修或预算敏感，可以重点了解${brand}：438元/㎡起、免费量房出图做预算、先施工后付款，先把方案和预算算清楚再决定。`,
  };
  const key = Object.keys(summaries).find(k => brand.includes(k)) || short;
  const brandLine = `

${summaries[key] || `当前选择品牌是${brand}，文案需要围绕该品牌的定位、产品和客户心智展开。`}`;
  if (typeof result.final === 'string') result.final += brandLine;
  else if (result.final && typeof result.final === 'object') result.final.brandNote = brandLine.trim();
  else result.final = `当前品牌：${brand}${brandLine}`;
  result.check = (result.check || '') + `

品牌读取检查：已强制使用当前选择品牌「${brand}」。`;
  return result;
}


function compactInput(input = {}) {
  return {
    ...input,
    knowledgeText: textBlock(input.knowledgeText, 2000),
    benchmarkTitle: textBlock(input.benchmarkTitle, 500),
    benchmarkText: textBlock(input.benchmarkText, 1000),
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
  // 生成文案时只读取“我的图片素材”，不读对标图，避免文案跑到对标账号。
  const m=(input.images?.mine||[]).slice(0,5).map((x,i)=>({...x,group:'我的素材图'+(i+1)}));
  return m.filter(x => x && /^data:image\//.test(x.dataUrl || '') && String(x.dataUrl).length < 900000).slice(0, 5);
}

async function openAIChat(messages, env, maxTokens = 1800, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), options.timeoutMs || 45000);
  const model = env.OPENAI_MODEL || 'gpt-5.5';
  const limit = Math.min(maxTokens, options.maxTokensCap || 900);
  const payload = {
    model,
    messages,
    temperature: options.temperature ?? 0.35,
  };
  // GPT-5 系列用 max_completion_tokens 更稳；旧模型仍用 max_tokens。
  if (/gpt-5/i.test(model)) payload.max_completion_tokens = limit;
  else payload.max_tokens = limit;
  if (/gpt-5/i.test(model)) payload.reasoning_effort = options.reasoningEffort || 'low';
  if (options.json !== false) payload.response_format = { type: 'json_object' };
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
  if (!resp.ok) {
    const errText = text.startsWith('<') ? '上游或 Worker 返回 HTML 错误，通常是图片/文本过大或模型超时。' : text.slice(0, 1000);
    // 部分代理不支持 GPT-5 附加参数，自动移除后重试一次，仍然是同一个 GPT-5.5 模型。
    if (/reasoning_effort|max_completion_tokens|unsupported|Unknown parameter|Unrecognized/i.test(errText)) {
      delete payload.reasoning_effort;
      if (payload.max_completion_tokens) { payload.max_tokens = payload.max_completion_tokens; delete payload.max_completion_tokens; }
      const retry = await fetch((env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const retryText = await retry.text();
      if (!retry.ok) throw new Error(retryText.slice(0, 1000));
      const retryData = JSON.parse(retryText);
      return retryData.choices?.[0]?.message?.content || '';
    }
    throw new Error(errText);
  }
  const data = JSON.parse(text);
  return data.choices?.[0]?.message?.content || '';
}

async function callDeepSeek(input = {}, body = {}, env) {
  input = compactInput(input);
  if (!env.DEEPSEEK_API_KEY) return json({ error: 'DEEPSEEK_API_KEY is not configured on server.' }, 500);
  const reviseContext = body.action === 'revise' ? `\n\n【当前版本】\n${textBlock(body.currentVersion, 9000)}\n\n【修改要求】\n${textBlock(body.revisionInstruction, 2500)}\n\n【历史版本摘要】\n${textBlock(JSON.stringify(body.history || []), 3000)}` : '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), 18000);
  const payload = {
    model: env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [
      { role: 'system', content: '你是老谭小红书内容编辑。只输出JSON，字段：final,titles,versions,script,story,check,scores。要求：真实、短句、去AI味、可直接发布。' },
      { role: 'user', content: buildUserPrompt({...input, images:{}}, '') + reviseContext },
    ],
    temperature: 0.62,
    max_tokens: 1400,
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
  let result = normalizeDeepSeekJSON(data.choices?.[0]?.message?.content || '');
  if (typeof result.final === 'string') result.final = formatXhsText(result.final);
  if (result.final && typeof result.final === 'object' && result.final.body) result.final.body = formatXhsText(result.final.body);
  result = limitXhsFinalLength(result, 1000);
  result.readState = usageState(input, 'deepseek-fast');
  result.readState.model = env.DEEPSEEK_MODEL || 'deepseek-chat';
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
      { type: 'text', text: `请仔细识别这张${img.group}，这是用户自己的图片素材，后续文案必须关联它。输出JSON：{"group":"我的素材图","ocr":"图中文字/招牌/价格/楼盘/品牌/工地文字","visual":"画面里具体有什么，空间/工地/户型/材料/人物/颜色/风格","content_points":["可写进正文的具体素材点"],"xhs_use":"这张图适合承担封面/痛点/证据/案例/收尾中的哪个作用","must_mention":["正文必须关联的画面细节"],"risk":"可能误读/看不清的地方"}` },
      { type: 'image_url', image_url: { url: img.dataUrl, detail: 'low' } },
    ];
    try {
      const raw = await openAIChat([
        { role: 'system', content: '你是图片OCR和小红书图文拆解助手。只输出JSON。重点提取可写进小红书正文的具体画面细节。' },
        { role: 'user', content },
      ], env, 520, { timeoutMs: 45000, maxTokensCap: 700, temperature: 0.2, reasoningEffort: 'low', json: false });
      out.push(normalizeDeepSeekJSON(raw));
    } catch (e) {
      out.push({ group: img.group, error: String(e.message || e).slice(0, 500) });
    }
  }
  return out;
}

function limitXhsFinalLength(result = {}, max = 1000) {
  const trim = (s) => {
    s = String(s || '').trim();
    if (s.length <= max) return s;
    const cut = s.slice(0, max - 36).replace(/[，、；：,.!！?？][^，、；：,.!！?？]*$/, '');
    return cut + '\n\n（正文已按小红书1000字限制自动收束）';
  };
  if (typeof result.final === 'string') result.final = trim(result.final);
  if (result.final && typeof result.final === 'object') {
    if (result.final.body) result.final.body = trim(result.final.body);
    else result.final = trim(JSON.stringify(result.final, null, 2));
  }
  result.check = (result.check || '') + `

长度检查：最终正文已按小红书1000字限制控制。`;
  return result;
}

async function openAIChatWithUserImages(input = {}, imageAnalysis = [], env, current = '') {
  const imgs = cleanImages(input).slice(0, 5);
  const imageBlocks = imgs.map(img => ({ type: 'image_url', image_url: { url: img.dataUrl, detail: 'low' } }));
  const text = buildUserPrompt({...input, images:{}}, '') + `

【我的图片素材】
本消息附上 ${imgs.length} 张用户自己的图片素材。你必须先看图，再写文案。

【图片关联硬性要求】
1. 先在 benchmarkAnalysis 之后增加/包含 imageMaterial 字段，写出你从图片里看到的具体内容：画面主体、文字、颜色/风格、空间/工地/材料/页面信息。
2. final 正文开头前3段内必须出现至少1个图片里的具体细节。
3. script 每一页都要说明用哪张图、图里哪个局部或文字作为画面依据。
4. 如果你看不清图片，final 不要泛写，必须明确说“图片看不清，需要补充文字素材”，并停止编造。
5. 禁止只写品牌通用卖点，必须把图片内容当成案例素材。

【OCR辅助摘要】
${textBlock(JSON.stringify(imageAnalysis, null, 2), 1200)}

【输出JSON字段】
benchmarkAnalysis, imageMaterial, final, titles, script, check, scores。final 不超过1000字，必须用真实换行分段，段落之间空一行。` + current;
  const content = [{ type: 'text', text }, ...imageBlocks];
  return await openAIChat([
    { role: 'system', content: '你是小红书图文编辑和图片观察员。小红书工作只允许使用 GPT-5.5。最高优先级：必须看用户上传图片，并把图片具体细节写进正文；如果看不清就明说，不能写泛泛装修文案。' },
    { role: 'user', content },
  ], env, 900, { timeoutMs: 120000, maxTokensCap: 950, temperature: 0.25, reasoningEffort: 'low', json: false });
}

async function callOpenAI(input = {}, body = {}, env) {
  input = hydrateXhsBrand(input);
  const originalCounts = {
    benchmark: input.imageCounts?.benchmark || input.images?.benchmark?.length || 0,
    mine: input.imageCounts?.mine || input.images?.mine?.length || 0,
  };
  const wantsDeep = String(input.mode || '').includes('深度');
  const hasImages = ((input.images?.benchmark?.length || 0) + (input.images?.mine?.length || 0)) > 0;

  // 没有我的图片时才压缩掉图片；有我的图片时保留前5张给 GPT-5.5 读取。
  const hasMineImages = (input.images?.mine?.length || 0) > 0;
  if ((!hasMineImages && !(wantsDeep && hasImages)) || body.action === 'revise') input = compactInput(input);

  if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not configured on server.' }, 500);
  let imageAnalysis = body.imageAnalysis || input.imageAnalysis || [];
  let imageSentForOcr = 0;

  // 只读取“我的图片素材”前 5 张；不读对标图。读图失败不阻断生成，但会在读取状态里说明。
  if (body.action !== 'revise' && (input.images?.mine?.length || 0) > 0) {
    const imgsForOcr = cleanImages(input);
    imageSentForOcr = imgsForOcr.length;
    imageAnalysis = await analyzeImages({...input, images:{benchmark:[], mine: imgsForOcr}}, env);
  } else {
    imageAnalysis = [];
  }

  const current = body.action === 'revise' ? `

【当前版本】
${textBlock(body.currentVersion, 4500)}

【修改要求】
${textBlock(body.revisionInstruction, 1200)}

【历史版本摘要】
${textBlock(JSON.stringify(body.history || []), 1200)}` : '';
  const userText = buildUserPrompt({...input, images:{}}, '') + `

【我的图片素材识别摘要/OCR，最高优先级之一】
${textBlock(JSON.stringify(imageAnalysis, null, 2), 3000)}

【强制要求】
如果上面有图片识别摘要，正文和图片脚本必须引用至少2个具体画面细节/文字/风格/工地信息；不能只写泛泛行业文案。
对标文案也必须参与：先拆解，再改写成当前品牌和素材的版本。` + current;
  const system = '你是老谭小红书内容总编。小红书工作只允许使用 GPT-5.5。必须优先读取并使用【当前选择品牌】、【网页内置品牌资料】和【我的图片素材识别摘要/OCR】；如果有图片摘要，正文必须关联图片里的具体细节。文案必须明确出现当前品牌名称，必须使用当前品牌的核心定位/卖点，不能写成别的品牌。快速输出，不要长篇思考。尽量JSON；也可直接正文。要求真实、短句、去AI味。必须做对标拆解，并在输出 benchmarkAnalysis 字段里说明学了对标的哪些结构。最终发布正文不得超过1000字；final 必须已经用真实换行分段，段落之间空一行，不要用分隔符代替换行。';
  let raw;
  try {
    if ((input.images?.mine?.length || 0) > 0) {
      raw = await openAIChatWithUserImages(input, imageAnalysis, env, current);
    } else {
      raw = await openAIChat([
        { role: 'system', content: system },
        { role: 'user', content: userText },
      ], env, 650, { timeoutMs: 75000, maxTokensCap: 700, temperature: 0.35, reasoningEffort: 'low', json: false });
    }
  } catch (e) {
    try {
      const micro = `用GPT-5.5快速生成小红书内容。主题：${textBlock(input.corePoint || input.benchmarkTitle || '装修内容', 120)}。品牌资料：${textBlock(input.knowledgeText, 500)}。对标：${textBlock(input.benchmarkTitle + '\n' + input.benchmarkText, 700)}。我的文字素材：${textBlock(input.myNotes, 300)}。图片摘要：${textBlock(JSON.stringify(imageAnalysis), 700)}。如果图片摘要为空或失败，要在check里说明图片识别失败。输出JSON，final不超过1000字，final内必须用真实换行分段：{"final":"标题\n\n正文第一段\n\n正文第二段\n\n标签","titles":"5个标题","script":"6页图片脚本","check":"发布检查","scores":{"hook":80,"real":80,"ai":"低"}}`;
      raw = await openAIChat([
        { role: 'system', content: '你是老谭小红书内容总编，只用GPT-5.5。极速输出JSON，不要解释。' },
        { role: 'user', content: micro },
      ], env, 420, { timeoutMs: 35000, maxTokensCap: 450, temperature: 0.3, reasoningEffort: 'low', json: false });
    } catch (e2) {
      return json({ error: 'OpenAI/GPT request failed', status: 502, detail: String(e2.message || e.message || e).slice(0, 1000), tip: 'GPT-5.5 上游连续超时；已确认后端强制 GPT-5.5，没有切换其他模型。' }, 502);
    }
  }
  let result = standardizeXhsResult(normalizeDeepSeekJSON(raw));
  result = enforceXhsBrandMention(result, input);
  if (typeof result.final === 'string') result.final = formatXhsText(result.final);
  if (result.final && typeof result.final === 'object' && result.final.body) result.final.body = formatXhsText(result.final.body);
  result = limitXhsFinalLength(result, 1000);
  if ((input.images?.mine?.length || 0) > 0 && !result.imageMaterial && !imageAnalysis.some(x=>!x.error)) {
    result.check = (result.check || '') + '\n\n图片关联警告：GPT-5.5 未返回可验证的图片细节。本次不应视为有效看图，请补充图片文字描述或降低图片复杂度后重试。';
  }
  result.imageAnalysis = imageAnalysis;
  result.readState = usageState(input, 'openai-only');
  result.readState.model = env.OPENAI_MODEL || 'gpt-5.5';
  result.readState.imageAnalysisCount = imageAnalysis.filter(x=>!x.error).length;
  result.readState.imageOcrAttempted = imageSentForOcr;
  result.readState.imageOcrErrors = imageAnalysis.filter(x=>x.error).length;
  result.readState.benchmarkImages = originalCounts.benchmark;
  result.readState.myImages = originalCounts.mine;
  result.readState.imageReadable = Boolean(result.imageMaterial) || imageAnalysis.some(x=>!x.error);
  result.readState.directImagesAttached = (input.images?.mine?.length || 0) > 0;
  result.readState.imageMaterialReturned = Boolean(result.imageMaterial);
  result.check = (result.check || '') + '\n\n系统说明：本次小红书工作强制使用 GPT-5.5。已把“我的图片素材”前 5 张直接附给 GPT-5.5 生成；OCR摘要成功则同时使用，失败则以直接看图为准；不读取对标图，避免跑偏。';
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
    {role:'system',content:'你是老谭公司的销售话术总教练，擅长微信、小红书私信、评论区和代运营成交沟通。你必须逐项读取网页汇聚的信息包，尤其是当前品牌知识库、服务边界、禁用表达、标准话术库、聊天风格、知识草稿和训练反馈。回复必须贴合当前品牌调性；不得输出与服务边界冲突的承诺；不要像AI，不要油腻，不要过度承诺。输出JSON。'},
    {role:'user',content:prompt}
  ],env,2600); } catch(e) { return json({error:'GPT request failed', detail:String(e.message||e).slice(0,1000)},502); }
  const r=normalizeDeepSeekJSON(raw);
  return json({best:formatXhsText(r.best||r.final||''),versions:r.versions||'',analysis:r.analysis||'',next:r.next||'',style:r.style||'',imageStyle});
}

async function callBenchmarkAnalysis(input = {}, env) {
  input = hydrateXhsBrand(input);
  const prompt = `只拆解对标文案结构，不生成完整正文。\n\n【对标文案】\n标题：${textBlock(input.benchmarkTitle, 300)}\n正文：${textBlock(input.benchmarkText, 1200)}\n我喜欢它的点：${textBlock(input.benchmarkNotes, 500)}\n\n输出JSON：{"benchmarkAnalysis":{"标题钩子":"...","开头痛点":"...","正文结构":"...","段落节奏":"...","情绪推进":"...","结尾引导":"...","可借鉴点":["..."],"禁止照抄":["..."]}}\n\n只拆解对标结构，不生成全新文案。`;
  let raw;
  try {
    raw = await openAIChat([
      { role: 'system', content: '你是老谭小红书内容总编。只做对标拆解，不生成正文。输出JSON。' },
      { role: 'user', content: prompt }
    ], env, 1200, { thinking: 'fast' });
  } catch (e) {
    return json({ error: '拆解请求失败', detail: String(e.message || e).slice(0, 500) }, 502);
  }
  const r = normalizeDeepSeekJSON(raw);
  return json({ benchmarkAnalysis: r.benchmarkAnalysis || r.final || raw });
}

async function handleXhsGenerate(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method === 'GET') {
    return json({ ok: Boolean(env.OPENAI_API_KEY), openai: Boolean(env.OPENAI_API_KEY), provider: 'openai-only', endpoint: '/api/xhs-generate', model: env.OPENAI_MODEL || 'gpt-5.5', reasoning: 'fast', note: '小红书工作只允许使用 GPT-5.5' });
  }
  if (request.method !== 'POST') return json({ error: 'Method Not Allowed' }, 405);

  const body = await request.json().catch(() => ({}));
  const input = body.input || {};
  const imgCount = (input.images?.benchmark?.length || 0) + (input.images?.mine?.length || 0);
  const mode = String(input.mode || '');

  // 小红书工作强制只走 GPT-5.5，不允许 DeepSeek 或自动路由。
  if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not configured on server.' }, 500);
  input.provider = 'openai';
  if (body.action === 'benchmark-analysis') return callBenchmarkAnalysis(input, env);
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
