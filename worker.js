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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function classifyUpstreamError(reason = '') {
  const text = String(reason || '');
  if (/timeout|超时|aborted|network/i.test(text)) return 'upstream_timeout';
  if (/Concurrency limit|Too Many Requests|429|rate_limit/i.test(text)) return 'upstream_rate_limit';
  if (/413|too large|payload|request entity|content length/i.test(text)) return 'payload_too_large';
  if (/401|403|invalid api key|unauthorized|forbidden/i.test(text)) return 'auth_or_permission';
  if (/unsupported|Unknown parameter|Unrecognized|max_completion_tokens|reasoning_effort/i.test(text)) return 'proxy_param_unsupported';
  if (/JSON|parse|Unexpected token|返回非 JSON/i.test(text)) return 'model_format_error';
  return 'upstream_error';
}

const XHS_BRAND5_FULL_KB = `【品牌名称】

老谭

【给AI的使用说明】

你在生成老谭账号内容时，必须始终把老谭理解为“长沙业主装修前的独立判断顾问”。老谭不是装修公司销售，不是设计师账号，不是施工监理账号，也不是给某一家装修公司导流的中介账号。你生成的每一篇小红书内容，都要帮助长沙业主在签约前、付款前、选公司前、看报价前、看合同前建立判断标准。内容的核心不是“推荐谁”，而是“教用户怎么判断”。老谭账号的价值不是装修科普，而是判断工具。用户看完以后应该产生的心理路径是：这说的就是我，我终于知道该怎么看了，我先收藏一下，我还是拿不准，可以问问老谭。写作时不要把老谭写成热情销售，也不要把老谭写成什么都能解决的万能专家。老谭只做装修前独立判断，重点处理业主在签约前的信息不对称、价格不确定、合同不放心、公司不知道怎么选、方案和预算拿不准等问题。

【品牌一句话定位】

老谭，是长沙业主装修前的独立判断顾问。

【目标客户】

目标客户是正在准备装修、准备选装修公司、准备签合同、已经拿到报价单或合同但还没完全放心的长沙业主。优先服务长沙本地自住业主，尤其是第一次装修、改善型装修、预算已经初步确定但害怕被坑的人。他们不一定懂装修，不一定懂材料和工艺，也不一定知道半包、全包、整装、设计工作室、小团队、大公司之间到底差在哪。他们真正需要的不是被立刻推销，而是有人帮他们把复杂信息翻译成可以判断的标准。内容必须默认读者是花钱装修的人，不是同行，不是设计师，不是装修公司老板。不要对行业讲大道理，要对业主讲“你现在该怎么看、该问什么、该警惕什么、该保留什么证据”。

【用户核心痛点】

用户的核心痛点是装修前拿不准。拿不准报价是否真实，担心低价签约后增项；拿不准合同条款是否有坑，担心责任边界不清；拿不准半包、全包、整装怎么选，担心选错模式；拿不准装修公司说的话是真是假，担心被话术带着走；拿不准预算够不够，担心前期看起来便宜，后期越装越高；拿不准自己家到底适合什么方案，担心听了太多建议反而更乱。老谭内容必须抓住“签之前最焦虑”这个阶段。用户不是想看装修百科，而是想在做决定前少走弯路。

【核心心智】

老谭要让用户形成一个稳定心智：装修前拿不准，先问问老谭。这个心智必须通过“独立、判断、长沙、本地经验、真实案例、检查工具”反复建立。老谭说话的感觉应该是冷静、直接、专业、有边界，不讨好、不恐吓、不替用户做决定。老谭给用户的是判断方法，不是直接替用户选公司。内容要让用户感觉：老谭站在业主这一边，但不情绪化；老谭懂长沙装修，但不卖弄专业；老谭能把复杂问题讲清楚，但不会强推成交。

【必须反复融入的品牌卖点】

第一，独立判断。老谭不是装修公司销售，不站某家公司，只帮助业主看清报价、合同、预算和选择逻辑。第二，长沙本地经验。内容要多使用长沙、本地报价、本地公司、本地楼盘、本地装修习惯、本地业主常见问题，不做全国泛科普。第三，装修前场景。重点覆盖签约前、付款前、看报价前、看合同前、选模式前、定预算前。第四，判断工具化。多做检查表、清单、对照表、花费明细、案例拆解，让用户可以直接对照使用。第五，真实案例感。可以使用脱敏案例、真实报价问题、合同风险、长沙业主常见情况，但不能编造夸张故事。第六，轻引导。内容结尾要自然引向“让老谭帮用户做初步判断”的动作，但表达必须根据具体内容变化，不要强行使用“找我咨询”“私信领资料”“加微信成交”等销售感话术。

【可作为内容证据的素材】

可使用长沙业主报价单里的典型问题、合同条款常见风险、半包全包整装差异、本地价格区间、装修公司选择维度、预算拆分、真实咨询案例、脱敏聊天问题、社群常见提问、老谭看过大量报价后总结出的规律。证据要服务判断，不要服务炫耀。比如写报价内容时，可以展示“暂估”“按实结算”“材料型号不清”“施工项目描述模糊”“漏项”“管理费计算不清”等具体风险；写合同内容时，可以讲付款节点、延期责任、增项确认、材料变更、验收标准；写选择内容时，可以讲不同装修模式适合什么人。每条内容至少要给一个可执行判断标准。

【小红书表达发散原则】

标题要短、具体、有问题感，优先围绕长沙、报价、合同、预算、半包、全包、签约前、拿不准等主题发散。标题不是固定句式，AI 应根据当篇内容的真实问题重新生成，让用户一眼知道“这篇能帮我判断什么”。封面要简单有力，建议纯色深底、大字标题、栏目标签、老谭识别，不要用花哨效果图做背景。正文结构可以灵活变化，但必须完成几个任务：先让用户认出自己的场景，再拆出问题，再给判断标准，最后给自然求助入口。语气要像老谭在帮业主看问题，不要像营销文案。内容不是越热闹越好，而是越能让用户保存、对照、发来咨询越好。

AI 生成选题时优先选择“签约前马上会用到”的问题，不优先选择完工欣赏、装修风格、施工过程流水账。老谭账号最适合做四类内容：第一类是审报价，例如暂估、漏项、材料型号、管理费、拆除和水电增项；第二类是审合同，例如付款节点、延期责任、验收标准、增项确认；第三类是定预算，例如长沙本地不同装修模式大致花费、哪些钱不能省、哪些钱容易被低估；第四类是定方向，例如半包、全包、整装、设计工作室、小团队、大公司分别适合什么人。每篇内容只解决一个判断问题，不要一篇里塞太多装修知识。

【转化意图 / 不要写死话术】

转化意图是让用户把自己拿不准的材料或情况发给老谭做判断。AI 不要固定复读某一句私信口令，而要根据内容主题生成自然入口：报价类引导用户发报价，合同类引导用户在签前核对风险，预算类引导用户说明面积和预算，选择类引导用户说明自己的阶段和偏好。私信承接时先确认用户阶段：是否已拿报价、是否已拿合同、是否已定公司、房子在哪个区域、面积和预算大概多少。不要一上来强推付费或强推微信，先给用户一个初步判断方向，再引导更完整的判断服务。

【禁止使用的表达】

禁止把老谭写成装修公司、销售顾问、合作品牌客服、施工监理、设计师或中介。禁止写“老谭推荐这家公司”“找老谭安排装修”“老谭帮你选定哪家公司”这类会破坏独立性的表达。禁止为了制造焦虑而夸大风险，禁止编造案例，禁止点名攻击具体公司，禁止泄露客户隐私。禁止把内容写成泛装修百科，也不要大量使用“闭眼选”“绝对不踩坑”“长沙唯一”“保证不增项”等不可验证承诺。不要把老谭写成低价导购号，也不要把 B 端合作品牌的卖点混到老谭账号里。

【品牌边界 / 不要写偏】

老谭只做装修前独立判断，不做某个品牌的销售转化。可以讲半包、全包、整装、设计、报价、合同，但都必须站在业主判断角度讲。老谭不能混入 8K 的 8000 元设计卖点，不能混入宅师傅的 438 半包卖点，不能混入玖玖精装的高端精装房全案改造卖点，也不能混入玖玖半包的大宅施工获客话术。老谭可以基于案例做判断，但不要替任何品牌背书。

【AI生成内容时的最终判断标准】

生成完每篇老谭内容后，必须检查：这篇是不是帮助长沙业主在装修前做判断？有没有明确场景和可执行标准？有没有保持独立顾问身份？有没有避免销售感？用户看完是否愿意收藏、对照自己的报价或合同、再来问老谭？如果答案是否定的，这篇就不是合格的老谭内容。

最终内容应该让用户感觉“我不是被推销了，而是终于有了一个判断尺子”。如果内容只有观点没有工具，要补检查项；如果内容只有工具没有信任，要补真实脱敏场景；如果内容只有焦虑没有解决方法，要补可操作建议；如果结尾只有强推咨询，要改成轻判断入口。`;

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
  },
  "brand5": {
    "name": "老谭装修避坑",
    "knowledge": XHS_BRAND5_FULL_KB
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
  return ensureParagraphSpacing(out.join('\n\n'));
}

function ensureParagraphSpacing(value = '') {
  let s = String(value || '')
    .replace(/\r/g, '')
    .replace(/[\u2028\u2029]/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .trim();
  if (!s) return '';
  return s.split(/\n+/).map(x => x.trim()).filter(Boolean).join('\n\n');
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
  "titleCoverPairs":[
    {"title":"标题1","coverText":"封面大字","coverSubtext":"封面小字/栏目标签","coverVisual":"封面画面、构图和光影建议","imageUse":"适合使用哪张素材图或什么画面","reason":"为什么这个标题和封面匹配"}
  ],
  "titles":"兼容字段：把5组标题封面方案整理成可读文本",
  "versions":"正文 A/B/C 三个版本",
  "script":"6 页图文脚本，每页含页面观点、可用素材建议；不要再把封面和标题分开生成",
  "story":"灵感拆解/故事化表达建议",
  "check":"发布检查，含抄袭风险、广告感、AI味、优化建议",
  "scores":{"hook":数字,"real":数字,"ai":"低/中/高"}
}
【标题封面硬性要求】
titleCoverPairs 必须正好 5 组。每组必须是一一对应的完整方案：一个标题只配一个封面，不要先生成标题库再生成封面库。封面大字要能承接标题的钩子，画面建议要说明用什么图、什么局部、什么构图。
【重要】JSON 字符串内的引号必须使用中文引号 ""（U+201C/U+201D），严禁使用英文双引号 " （U+0022），否则 JSON 解析会失败。例如应写 "业主说"报价太贵"" 而不是 "业主说\"报价太贵\""。`;
}

function buildUserPrompt(input = {}, prompt = '') {
  return `请根据资料生成小红书图文方案。必须围绕当前选择品牌，不能忽略品牌资料。

【品牌/企业知识库，最高优先级，必须使用】
${textBlock(input.knowledgeText, 1800)}

【对标文案，必须认真拆解；不是复制】
对标链接：${textBlock(input.benchmarkUrl, 500)}
对标标题：${textBlock(input.benchmarkTitle, 500)}
对标正文，最多1000字：${textBlock(input.benchmarkText, 1000)}
已有对标拆解补充：${textBlock(input.benchmarkAnalysis, 800)}

【强制对标要求】
1. 先在 benchmarkAnalysis 字段里拆出：标题钩子、开头痛点、正文结构、段落节奏、情绪推进、结尾引导。
2. final 正文要学习对标的“结构和节奏”，但不能照抄原句、案例和具体表达。
3. 如果对标文案为空，要在 check 里明确说明“未提供对标文案”。

【我的素材】
${textBlock(input.myNotes, 500)}

【这篇要讲什么】${textBlock(input.corePoint, 200)}
【必须出现】${textBlock(input.mustSay, 300)}
【不能出现】${textBlock(input.avoidSay, 300)}
【目标人群】${input.audience || ''}
【当前品牌名称】${input.brandName || ''}
【模板】${input.template || ''}
【模式】${input.mode || ''}

输出：必须包含 benchmarkAnalysis、final、titleCoverPairs、titles、script、check、scores。titleCoverPairs 必须正好 5 组，每组标题和封面一一对应，不能把标题库和封面脚本分开。final 含标题、正文、标签合计不超过1000字；必须使用真实换行符分段，不要用”|/｜/分段符号”代替换行；每段之间空一行，复制到小红书后也应自然分段。`;
}

function buildReviseUserPrompt(input = {}, prompt = '') {
  return `请修改已有小红书文案。必须围绕当前选择品牌，保持品牌调性不变。

【品牌/企业知识库，修改时保持品牌边界】
${textBlock(input.knowledgeText, 1500)}

【我的文字素材（如有新增信息可融入）】
${textBlock(input.myNotes, 400)}

【核心观点】${textBlock(input.corePoint, 150)}
【必须出现】${textBlock(input.mustSay, 200)}
【不能出现】${textBlock(input.avoidSay, 200)}
【当前品牌名称】${input.brandName || ''}

修改时注意：
1. 保持品牌知识库中的定位、卖点、表达边界
2. 不新增品牌知识库中没有的承诺或服务
3. 保持原有的对标拆解结构（benchmarkAnalysis），如需调整注明原因
4. 保留原有的 titleCoverPairs 标题封面组合和图片脚本，只按需微调；标题和封面仍必须一一对应`;
}

function normalizeDeepSeekJSON(content) {
  let raw = String(content || '').trim();
  let debugErrors = [];
  // 去掉 markdown 代码块
  raw = raw.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
  // 提取第一个 { 到最后一个 }
  const firstBrace = raw.indexOf('{');
  const lastBrace = raw.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    raw = raw.slice(firstBrace, lastBrace + 1);
  }
  // 尝试1：直接解析
  try { return JSON.parse(raw); } catch (e) { debugErrors.push('p1@' + (e.message||'').match(/position (\d+)/)?.[1] + ':' + (e.message||'').slice(0, 60)); }
  // 尝试2：修复中文语境中的 ASCII 引号 → 中文引号
  // 核心思路：在 JSON 字符串值内部，用中文引号 “” 替代 ASCII “
  // 使用简单的行级启发式：在每一行中，找到 “text” 模式，如果周围是中文就替换
  let fixed = raw;
  // 匹配：非JSON结构位置的 “text” 对（周围是中文的引号）
  // JSON结构模式: “key”: 或 , “key” 或 { “key” 或 [ “ 等
  // 内容中不应该出现的模式: 中文字”内容”中文字
  const cjkRange = '一-鿿㐀-䶿豈-﫿　-〿＀-￯';
  // 替换中文+引号+内容+引号+中文（不含 JSON 结构关键字符）
  const fixRe = new RegExp(`([${cjkRange}】）\\)」』、。！？；：，])\\s*”([^”]{1,150}?)”\\s*(?=[${cjkRange}【（\\(「『、。！？；：，\\s])`, 'g');
  fixed = fixed.replace(fixRe, '$1”$2”');
  // 清理未配对的 “（可能在开头或结尾）
  if (fixed !== raw) {
    try { return JSON.parse(fixed); } catch (e) { debugErrors.push('p2@' + (e.message||'').match(/position (\d+)/)?.[1] + ':' + (e.message||'').slice(0, 60)); }
  }
  // 尝试3：修复尾部逗号 + 清理控制字符
  let fixed3 = raw.replace(/,(\s*[}\]])/g, '$1');
  try { return JSON.parse(fixed3); } catch (e) { debugErrors.push('p3:' + (e.message||'').slice(0, 60)); }
  // 尝试4：最宽泛的 { } 匹配
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
    check: '模型未返回标准 JSON，已原样展示。\n解析错误: ' + debugErrors.join(' | '),
    scores: { hook: '--', real: '--', ai: '未知' },
  };
}

function coerceTitleCoverPairs(value = []) {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return coerceTitleCoverPairs(parsed);
    } catch (_) {
      return value.split(/\n{2,}|(?=\n?\s*\d+[\.、])/)
        .map(x => x.trim())
        .filter(Boolean)
        .slice(0, 5)
        .map((chunk) => {
          const title = (chunk.match(/标题[：:]\s*([^\n]+)/) || chunk.match(/^\s*\d+[\.、]\s*([^\n]+)/) || [])[1] || chunk.split('\n')[0] || '';
          const coverText = (chunk.match(/封面(?:大字|文案)?[：:]\s*([^\n]+)/) || [])[1] || title;
          const coverVisual = (chunk.match(/(?:画面|构图|视觉)[：:]\s*([^\n]+)/) || [])[1] || '';
          const reason = (chunk.match(/(?:理由|匹配|原因)[：:]\s*([^\n]+)/) || [])[1] || '';
          return { title: title.trim(), coverText: coverText.trim(), coverSubtext: '', coverVisual: coverVisual.trim(), imageUse: '', reason: reason.trim() };
        });
    }
  }
  const list = Array.isArray(value) ? value : Object.values(value);
  return list.map((item) => {
    if (typeof item === 'string') return { title: item, coverText: item, coverSubtext: '', coverVisual: '', imageUse: '', reason: '' };
    if (!item || typeof item !== 'object') return null;
    const title = item.title || item['标题'] || item.name || item.hook || '';
    const coverText = item.coverText || item.cover || item['封面大字'] || item['封面文案'] || item.coverTitle || title;
    return {
      title: String(title || '').trim(),
      coverText: String(coverText || '').trim(),
      coverSubtext: String(item.coverSubtext || item['封面小字'] || item.subtitle || item.tag || '').trim(),
      coverVisual: String(item.coverVisual || item['封面画面'] || item.visual || item.layout || item.scene || '').trim(),
      imageUse: String(item.imageUse || item['用图建议'] || item.material || item.image || '').trim(),
      reason: String(item.reason || item['匹配理由'] || item.logic || item.why || '').trim(),
    };
  }).filter(x => x && (x.title || x.coverText)).slice(0, 5);
}

function deriveTitleCoverPairs(titles = '', script = '') {
  const titleLines = String(titles || '')
    .split('\n')
    .map(x => x.replace(/^\s*\d+[\.、]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 5);
  const scriptLines = String(script || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  if (!titleLines.length && !scriptLines.length) return [];
  const pairs = [];
  for (let i = 0; i < 5; i++) {
    const title = titleLines[i] || titleLines[0] || `标题方案${i + 1}`;
    const line = scriptLines[i] || scriptLines[0] || '';
    const coverText = (line.match(/封面(?:大字|文案)?[：:]\s*([^，。\n]+)/) || [])[1] || title;
    pairs.push({
      title,
      coverText,
      coverSubtext: '',
      coverVisual: line.replace(/^第\d+页[：:]\s*/, ''),
      imageUse: '',
      reason: '由旧版标题/脚本字段自动合并，建议生成后再精修。'
    });
  }
  return pairs;
}

function formatTitleCoverPairs(pairs = []) {
  const list = coerceTitleCoverPairs(pairs);
  if (!list.length) return '';
  return list.map((item, idx) => {
    return [
      `${idx + 1}. ${item.title || '未命名标题'}`,
      `封面大字：${item.coverText || item.title || ''}`,
      item.coverSubtext ? `封面小字：${item.coverSubtext}` : '',
      item.coverVisual ? `画面建议：${item.coverVisual}` : '',
      item.imageUse ? `用图建议：${item.imageUse}` : '',
      item.reason ? `匹配逻辑：${item.reason}` : ''
    ].filter(Boolean).join('\n');
  }).join('\n\n');
}

function normalizeTitleCoverOutput(result = {}) {
  let pairs = coerceTitleCoverPairs(result.titleCoverPairs || result['标题封面组合'] || result['标题封面方案']);
  if (!pairs.length) pairs = deriveTitleCoverPairs(result.titles, result.script);
  if (pairs.length) {
    result.titleCoverPairs = pairs;
    result.titleCoverPairsText = formatTitleCoverPairs(pairs);
    result.titles = result.titleCoverPairsText;
  }
  return result;
}

function standardizeXhsResult(result = {}) {
  if (!result || typeof result !== 'object') return result;
  if (typeof result.final === 'string' && /(?:^|\n)\s*final\s*[:：]/i.test(result.final)) {
    const mixed = result.final;
    const finalMatch = mixed.match(/(?:^|\n)\s*final\s*[:：]\s*\n?([\s\S]*?)(?=(?:\n\s*(?:titleCoverPairs|titles|script|check|story|scores|versions|benchmarkAnalysis)\s*[:：])|$)/i);
    if (finalMatch && finalMatch[1]) result.final = finalMatch[1].trim();
    const benchmarkMatch = mixed.match(/(?:^|\n)\s*benchmarkAnalysis\s*[:：]\s*\n?([\s\S]*?)(?=\n\s*final\s*[:：]|$)/i);
    if (benchmarkMatch && !result.benchmarkAnalysis) result.benchmarkAnalysis = benchmarkMatch[1].trim();
  }
  if (!result.final) {
    const title = result['标题'] || result.title || '';
    const body = result['正文'] || result.body || result.content || '';
    if (title || body) result.final = `${title ? '标题：' + title + '\n\n' : ''}${body}`;
  }
  if (!result.titles && result['标题']) result.titles = String(result['标题']);
  if (!result.script && result['图片脚本']) result.script = Array.isArray(result['图片脚本']) ? result['图片脚本'].map(x => typeof x === 'string' ? x : JSON.stringify(x, null, 2)).join('\n\n') : String(result['图片脚本']);
  if (!result.check && result['发布检查']) result.check = typeof result['发布检查'] === 'string' ? result['发布检查'] : JSON.stringify(result['发布检查'], null, 2);
  if (!result.versions && result['正文']) result.versions = String(result['正文']);
  if (result.titles && typeof result.titles === 'object') result.titles = JSON.stringify(result.titles, null, 2);
  if (result.script && typeof result.script === 'object') result.script = JSON.stringify(result.script, null, 2);
  if (result.check && typeof result.check === 'object') result.check = JSON.stringify(result.check, null, 2);
  if (result.story && typeof result.story === 'object') result.story = JSON.stringify(result.story, null, 2);
  result = normalizeTitleCoverOutput(result);
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
  const m=(input.images?.mine||[]).slice(0,5).map((x,i)=>({...x,group:x.group || '我的素材图'+(i+1)}));
  return m.filter(x => x && /^data:image\//.test(x.dataUrl || '') && String(x.dataUrl).length < 900000).slice(0, 5);
}

function cleanBenchmarkImages(input = {}) {
  const b=(input.images?.benchmark||[]).slice(0,3).map((x,i)=>({...x,group:'对标截图'+(i+1)}));
  return b.filter(x => x && /^data:image\//.test(x.dataUrl || '') && String(x.dataUrl).length < 900000).slice(0, 3);
}

async function openAIChat(messages, env, maxTokens = 1800, options = {}) {
  const controller = new AbortController();
  const effort = options.reasoningEffort || env.OPENAI_REASONING_EFFORT || 'medium';
  const defaultTimeout = effort === 'high' ? 160000 : effort === 'medium' ? 110000 : 70000;
  const timer = setTimeout(() => controller.abort('timeout'), options.timeoutMs || defaultTimeout);
  let model = options.model || env.OPENAI_MODEL || 'gpt-5.5';
  if (model !== 'gpt-5.5') model = 'gpt-5.5';
  const limit = Math.min(maxTokens, options.maxTokensCap || 900);
  const payload = {
    model,
    messages,
    temperature: options.temperature ?? 0.35,
  };
  // GPT-5 系列用 max_completion_tokens 更稳；旧模型仍用 max_tokens。
  if (/gpt-5/i.test(model)) payload.max_completion_tokens = limit;
  else payload.max_tokens = limit;
  if (/gpt-5/i.test(model)) payload.reasoning_effort = effort;
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
    if (/Concurrency limit|rate_limit|429|Too Many Requests/i.test(errText)) {
      let retryErr = errText;
      for (const wait of [2200, 5200]) {
        await sleep(wait);
        const retry = await fetch((env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const retryText = await retry.text();
        if (retry.ok) {
          const retryData = JSON.parse(retryText);
          return retryData.choices?.[0]?.message?.content || '';
        }
        retryErr = retryText.slice(0, 1000);
      }
      throw new Error(retryErr);
    }
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

async function callOpenAIBenchmarkAnalysis(input = {}, env) {
  if (!env.OPENAI_API_KEY) return null;
  const model = 'gpt-5.5';
  const reasoning = input.reasoningEffort || env.OPENAI_REASONING_EFFORT || 'medium';
  let benchmarkImageAnalysis = [];
  const benchmarkImgs = cleanBenchmarkImages(input);
  if (benchmarkImgs.length) {
    benchmarkImageAnalysis = await analyzeBenchmarkScreenshots({...input, images:{benchmark: benchmarkImgs, mine: []}}, env);
  }
  const prompt = `只拆解对标文案结构，不生成完整正文。

【对标文案】
参考链接：${textBlock(input.benchmarkUrl, 500)}
标题：${textBlock(input.benchmarkTitle, 300)}
正文：${textBlock(input.benchmarkText, 1800)}

【对标截图OCR/小红书截图结构摘要，仅用于辅助拆解结构】
${textBlock(JSON.stringify(benchmarkImageAnalysis, null, 2), 1800)}

请按真实小红书内容编辑视角拆：
1. 标题钩子
2. 开头痛点
3. 正文结构
4. 段落节奏
5. 情绪推进
6. 结尾引导
7. 可借鉴点
8. 禁止照抄
9. 如果截图里识别到封面字/标题/正文/评论互动，请把这些也纳入拆解；截图只用于学习结构，不得复制原文。

输出JSON：{"benchmarkAnalysis":{"标题钩子":"...","开头痛点":"...","正文结构":"...","段落节奏":"...","情绪推进":"...","结尾引导":"...","可借鉴点":["..."],"禁止照抄":["..."]}}`;
  try {
    const raw = await openAIChat([
      { role: 'system', content: '你是老谭小红书内容总编。当前任务只做对标拆解，不生成正文。必须用 GPT-5.5 高推理强度，输出纯 JSON。' },
      { role: 'user', content: prompt },
    ], env, 1400, { maxTokensCap: 1400, temperature: 0.25, reasoningEffort: reasoning, model });
    const r = normalizeDeepSeekJSON(raw);
    return json({ benchmarkAnalysis: r.benchmarkAnalysis || r.final || raw.slice(0, 800), provider: 'openai', model, reasoning, benchmarkImageAnalysis });
  } catch (e) {
    return json({
      benchmarkAnalysis: fallbackBenchmarkAnalysis(input, benchmarkImageAnalysis, String(e.message || e)),
      provider: 'server-fallback',
      model,
      reasoning,
      benchmarkImageAnalysis,
      warning: 'GPT-5.5 拆解临时不可用，已用服务器兜底拆解，稍后可重新点一次获取精修版。',
    });
  }
}

function fallbackBenchmarkAnalysis(input = {}, benchmarkImageAnalysis = [], reason = '') {
  const title = textBlock(input.benchmarkTitle || '未填写标题', 160);
  const body = String(input.benchmarkText || '').replace(/\r/g, '').trim();
  const lines = body.split('\n').map(x => x.trim()).filter(Boolean);
  const opening = lines.slice(0, 2).join(' / ') || '开头需要先把用户带入具体痛点或决策场景。';
  const middle = lines.slice(2, 8).join(' / ') || '正文需要拆成：痛点提醒、判断标准、证据细节、行动入口。';
  const imageNotes = benchmarkImageAnalysis
    .filter(x => !x.error)
    .map(x => [x.group, x.cover_text, x.visible_title, x.visible_body, x.comments_or_metrics, x.hook, x.structure_points && x.structure_points.join('、'), x.borrowable].filter(Boolean).join('：'))
    .filter(Boolean)
    .join('\n');
  return {
    '标题钩子': `标题是「${title}」。优先判断它用了什么拦截点：本地关键词、痛点提醒、反常识、结果承诺或动作劝阻。可学习标题的入口，不照抄原句。`,
    '开头痛点': opening,
    '正文结构': `先看正文是否按“用户正在担心什么 -> 为什么这件事重要 -> 给出判断标准/证据 -> 引导下一步”推进。当前中段信息：${textBlock(middle, 360)}`,
    '段落节奏': '建议学习短句、强分段、一段一个判断点的节奏。小红书装修内容不要写成公司说明书，要让用户能扫读、收藏、对照。',
    '情绪推进': '从“我也有这个担心”推进到“我知道该看哪里”，保持提醒感，不制造恐吓，不做绝对承诺。',
    '结尾引导': '结尾应落到一个低成本动作：发报价/合同/小区面积/装修阶段/图纸中的一个信息，不要同时要太多。',
    '截图辅助': imageNotes || '本次没有可用截图OCR摘要，主要按文字对标拆解。',
    '可借鉴点': ['借结构，不借原文', '借用户痛点，不复制案例', '借分段节奏，不照搬句子', '把对标卖点改成当前品牌自己的判断标准'],
    '禁止照抄': ['不要复制标题原句', '不要复用对方案例和承诺', '不要把对标品牌的服务卖点写成自己的', '不要用无法证明的绝对化表达'],
    '系统说明': `服务器兜底拆解已启用。上游原因：${textBlock(reason, 220)}`,
  };
}

function buildReviseSystemPrompt(input = {}) {
  return `你是"老谭小红书内容总编"，当前任务是**修改已有文案**，不是重新创作。

【核心任务】
根据用户的修改要求，对当前版本进行精准修改。只改用户要求改的部分，保留其他内容不变。

【修改规则】
1. 保持品牌调性、核心观点、已有案例不变
2. 只调整用户明确要求修改的方面（字数、语气、结构、冲突感等）
3. 如果用户要求"改短"，删减冗余而不是砍掉核心观点
4. 如果用户要求"更冲突/更狠"，强化标题和开头的痛点冲突，不是加感叹号
5. 如果用户要求"去AI味"，删掉套话空话，换成口语短句
6. 如果用户要求"更像真实业主"，增加犹豫、对比、具体场景，减少推销感
7. final 正文必须空好格：每1-2句话一段，段间空一行，用真实换行符
8. 输出格式保持不变，必须是同样的JSON结构

【输出要求】
必须只输出 JSON，字段与原始生成保持一致：benchmarkAnalysis, final, titleCoverPairs, titles, versions, script, check, scores。titleCoverPairs 必须保持 5 组标题+封面一一对应。
final 不超过1000字，final 必须用真实换行分段。`;
}

async function callDeepSeek(input = {}, body = {}, env) {
  input = compactInput(input);
  if (!env.DEEPSEEK_API_KEY) return json({ error: 'DEEPSEEK_API_KEY is not configured on server.' }, 500);
  const isRevise = body.action === 'revise';
  const reviseContext = isRevise ? `\n\n【当前版本】\n${textBlock(body.currentVersion, 6000)}\n\n【修改要求】\n${textBlock(body.revisionInstruction, 2000)}` : '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), 60000);
  const system = isRevise ? buildReviseSystemPrompt(input) : buildSystemPrompt(input);
  const user = (isRevise ? buildReviseUserPrompt({...input, images:{}}, '') : buildUserPrompt({...input, images:{}}, '')) + reviseContext;
  const payload = {
    model: env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.62,
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
    return json({ error: 'DeepSeek 请求超时', detail: String(e.message || e).slice(0, 300) }, 502);
  }
  clearTimeout(timer);
  if (!resp.ok) return json({ error: 'DeepSeek API 错误', status: resp.status, detail: text.slice(0, 800) }, 502);
  let data;
  try { data = JSON.parse(text); } catch (_) { return json({ error: 'DeepSeek 返回非 JSON', detail: text.slice(0, 500) }, 502); }
  let result = normalizeDeepSeekJSON(data.choices?.[0]?.message?.content || '');
  if (typeof result.final === 'string') result.final = formatXhsText(result.final);
  if (result.final && typeof result.final === 'object' && result.final.body) result.final.body = formatXhsText(result.final.body);
  result = limitXhsFinalLength(result, 1000);
  result.readState = usageState(input, 'deepseek');
  result.readState.model = env.DEEPSEEK_MODEL || 'deepseek-chat';
  result.readState.imageReadable = false;
  result.check = (result.check || '') + '\n\n系统说明：本次使用 DeepSeek 文本模式生成。若有图片，已先通过 GPT OCR 提取文字后传入 DeepSeek。';
  return json(result);
}

async function callVisionModel(messages, env, maxTokens = 520) {
  // 优先 Qwen-VL（国产最强识图），否则用 GPT
  if (env.QWEN_API_KEY) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('timeout'), 40000);
    try {
      const resp = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.QWEN_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: env.QWEN_MODEL || 'qwen-vl-max', messages, max_tokens: maxTokens, temperature: 0.15 }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      const text = await resp.text();
      if (resp.ok) {
        const data = JSON.parse(text);
        return data.choices?.[0]?.message?.content || '';
      }
      console.log('Qwen-VL failed, falling back to GPT:', resp.status);
    } catch (e) {
      clearTimeout(timer);
      console.log('Qwen-VL error, falling back to GPT:', String(e).slice(0, 80));
    }
  }
  // Fallback to GPT
  if (env.OPENAI_API_KEY) {
    return await openAIChat(messages, env, maxTokens, { timeoutMs: 40000, maxTokensCap: 700, temperature: 0.2 });
  }
  throw new Error('No vision model configured. Set QWEN_API_KEY or OPENAI_API_KEY.');
}

async function analyzeImages(input = {}, env) {
  const imgs = cleanImages(input);
  if (!env.QWEN_API_KEY && !env.OPENAI_API_KEY) return imgs.map(img => ({ group: img.group, error: '未配置识图模型 Key' }));
  const provider = env.QWEN_API_KEY ? 'qwen-vl' : 'openai';
  const out = [];
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const content = [
      { type: 'text', text: `请仔细识别这张${img.group}，这是用户的装修实拍/效果图素材。请重点分析装修风格，后续文案必须引用这些细节。输出JSON：{"group":"我的素材图","style":"装修风格（现代简约/法式奶油/侘寂/新中式/轻奢/极简/原木等）+风格特征描述","colors":"主色调、辅色、材质颜色","materials":"可见材料（木地板/微水泥/岩板/艺术漆等）","space":"这是什么空间（客厅/厨房/卧室/卫生间），空间特征","ocr":"图中文字/品牌/logo","content_points":["这张图最值得写进正文的3个亮点"],"xhs_use":"封面/痛点/证据/案例/收尾","must_mention":["正文必须提到的画面细节"],"risk":"可能误读的地方"}` },
      { type: 'image_url', image_url: { url: img.dataUrl, detail: 'low' } },
    ];
    try {
      const raw = await callVisionModel([
        { role: 'system', content: '你是图片识别和装修风格分析助手。只输出JSON。重点提取装修风格、颜色、材料、空间布局、可写进小红书正文的具体画面细节。' },
        { role: 'user', content },
      ], env, 700);
      out.push(normalizeDeepSeekJSON(raw));
    } catch (e) {
      out.push({ group: img.group, error: provider + ' 识图失败: ' + String(e.message || e).slice(0, 300) });
    }
  }
  return out;
}

async function analyzeBenchmarkScreenshots(input = {}, env) {
  const imgs = cleanBenchmarkImages(input);
  if (!env.QWEN_API_KEY && !env.OPENAI_API_KEY) return imgs.map(img => ({ group: img.group, error: '未配置识图模型 Key' }));
  const provider = env.QWEN_API_KEY ? 'qwen-vl' : 'openai';
  const out = [];
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const content = [
      { type: 'text', text: `请把这张${img.group}当作“小红书笔记截图”识别，不要当装修实景图。常见截图可能是左边图片/封面，右边标题正文评论互动。请尽量OCR所有可见文字，并拆解结构。输出JSON：{"group":"对标截图","screenshot_type":"小红书笔记截图/封面截图/评论截图/未知","cover_text":"封面或图片上的大字","visible_title":"可见标题","visible_body":"可见正文，尽量完整OCR","comments_or_metrics":"可见评论/点赞/收藏/互动数据","visual_structure":"左图右文/多图封面/纯文字/评论区等版式","hook":"标题或封面钩子怎么吸引人","opening":"正文开头痛点或场景","structure_points":["结构拆解1","结构拆解2","结构拆解3"],"borrowable":"可借鉴的结构/节奏/转化动作","do_not_copy":"不能照抄的具体表达/案例/承诺","ocr_confidence":"高/中/低","risk":"可能误读或遮挡处"}` },
      { type: 'image_url', image_url: { url: img.dataUrl, detail: 'low' } },
    ];
    try {
      const raw = await callVisionModel([
        { role: 'system', content: '你是小红书截图OCR和爆款结构拆解助手。只输出JSON。重点识别标题、正文、封面大字、图文排版、互动线索和可借鉴结构。' },
        { role: 'user', content },
      ], env, 900);
      out.push(normalizeDeepSeekJSON(raw));
    } catch (e) {
      out.push({ group: img.group, error: provider + ' 对标截图识别失败: ' + String(e.message || e).slice(0, 300) });
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
  const model = input.aiModel || env.OPENAI_MODEL || 'gpt-5.5';
  const reasoning = input.reasoningEffort || env.OPENAI_REASONING_EFFORT || 'medium';
  const imgs = cleanImages(input).slice(0, 5);
  const imageBlocks = imgs.map(img => ({ type: 'image_url', image_url: { url: img.dataUrl, detail: 'low' } }));
  const text = buildUserPrompt({...input, images:{}}, '') + `

【我的图片素材】
本消息附上 ${imgs.length} 张用户自己的图片素材。你必须先看图，再写文案。

【图片关联硬性要求】
1. 先在 benchmarkAnalysis 之后增加/包含 imageMaterial 字段，写出你从图片里看到的具体内容：画面主体、文字、颜色/风格、空间/工地/材料/页面信息。
2. final 正文开头前3段内必须出现至少1个图片里的具体细节。
3. titleCoverPairs 的每组封面都要说明用哪张图、图里哪个局部或文字作为画面依据；script 每一页也要引用素材图。
4. 如果你看不清图片，final 不要泛写，必须明确说“图片看不清，需要补充文字素材”，并停止编造。
5. 禁止只写品牌通用卖点，必须把图片内容当成案例素材。

【OCR辅助摘要】
${textBlock(JSON.stringify(imageAnalysis, null, 2), 1200)}

【输出JSON字段】
benchmarkAnalysis, imageMaterial, final, titleCoverPairs, titles, script, check, scores。titleCoverPairs 必须正好 5 组，每组标题和封面一一对应；final 不超过1000字，必须用真实换行分段，段落之间空一行。` + current;
  const content = [{ type: 'text', text }, ...imageBlocks];
  return await openAIChat([
    { role: 'system', content: '你是小红书图文编辑和图片观察员。小红书工作只允许使用 GPT-5.5。最高优先级：必须看用户上传图片，并把图片具体细节写进正文；如果看不清就明说，不能写泛泛装修文案。' },
    { role: 'user', content },
  ], env, 1200, { timeoutMs: 160000, maxTokensCap: 1200, temperature: 0.25, reasoningEffort: reasoning, model, json: false });
}

async function callOpenAI(input = {}, body = {}, env) {
  input = hydrateXhsBrand(input);
  const model = 'gpt-5.5';
  const reasoning = input.reasoningEffort || env.OPENAI_REASONING_EFFORT || 'medium';
  const originalCounts = {
    benchmark: input.imageCounts?.benchmark || input.images?.benchmark?.length || 0,
    mine: input.imageCounts?.mine || input.images?.mine?.length || 0,
  };
  const hasMineImages = (input.images?.mine?.length || 0) > 0;
  const imgsForGpt = hasMineImages ? cleanImages(input) : [];
  input = compactInput(input);

  if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not configured on server.' }, 500);
  let imageAnalysis = body.imageAnalysis || input.imageAnalysis || [];
  let imageSentForOcr = 0;
  let directImagesAttached = false;
  let visionMode = imgsForGpt.length > 0 ? 'gpt-5.5-direct' : 'none';
  let visionFallbackUsed = false;
  let directVisionError = '';

  const current = body.action === 'revise' ? `

【当前版本】
${textBlock(body.currentVersion, 4500)}

【修改要求】
${textBlock(body.revisionInstruction, 1200)}

【历史版本摘要】
${textBlock(JSON.stringify(body.history || []), 1200)}` : '';
  const buildTextOnlyUser = (analysis = []) => buildUserPrompt({...input, images:{}}, '') + `

【我的图片素材识别摘要/OCR，如为空可忽略】
${textBlock(JSON.stringify(analysis, null, 2), 3000)}

【强制要求】
如果上面有图片识别摘要，正文和图片脚本必须引用至少2个具体画面细节/文字/风格/工地信息；不能只写泛泛行业文案。
对标文案也必须参与：先拆解，再改写成当前品牌和素材的版本。
必须输出 titleCoverPairs：5组标题+封面一一对应，不要分开标题库和封面库。` + current;
  const system = '你是老谭小红书内容总编。必须优先读取并使用【当前选择品牌】、【网页内置品牌资料】、【对标文案】和【我的文字素材】。文案必须明确出现当前品牌名称，必须使用当前品牌的核心定位/卖点，不能写成别的品牌。快速输出，不要长篇思考。尽量JSON；也可直接正文。要求真实、短句、去AI味。必须做对标拆解，并在输出 benchmarkAnalysis 字段里说明学了对标的哪些结构。必须输出 titleCoverPairs，正好5组标题+封面一一对应。最终发布正文不得超过1000字；final 必须已经用真实换行分段，段落之间空一行，不要用分隔符代替换行。';
  let raw;
  try {
    if (body.action !== 'revise' && imgsForGpt.length > 0) {
      raw = await openAIChatWithUserImages({...input, images:{benchmark:[], mine: imgsForGpt}}, [], env, current);
      directImagesAttached = true;
      visionMode = 'gpt-5.5-direct';
    } else {
      imageAnalysis = [];
      raw = await openAIChat([
        { role: 'system', content: system },
        { role: 'user', content: buildTextOnlyUser(imageAnalysis) },
      ], env, 1200, { timeoutMs: 120000, maxTokensCap: 1200, temperature: 0.35, reasoningEffort: reasoning, model, json: false });
    }
  } catch (e) {
    directVisionError = String(e.message || e);
    try {
      if (body.action !== 'revise' && imgsForGpt.length > 0) {
        imageSentForOcr = imgsForGpt.length;
        visionFallbackUsed = true;
        imageAnalysis = await analyzeImages({...input, images:{benchmark:[], mine: imgsForGpt}}, env);
        visionMode = env.QWEN_API_KEY ? 'qwen-vl-fallback' : 'gpt-ocr-fallback';
        raw = await openAIChat([
          { role: 'system', content: system },
          { role: 'user', content: buildTextOnlyUser(imageAnalysis) },
        ], env, 1200, { timeoutMs: 120000, maxTokensCap: 1200, temperature: 0.35, reasoningEffort: reasoning, model, json: false });
      } else {
        throw e;
      }
    } catch (e2) {
      try {
        const micro = `用GPT-5.5快速生成小红书内容。主题：${textBlock(input.corePoint || input.benchmarkTitle || '装修内容', 120)}。品牌资料：${textBlock(input.knowledgeText, 500)}。对标：${textBlock(input.benchmarkTitle + '\n' + input.benchmarkText, 700)}。我的文字素材：${textBlock(input.myNotes, 300)}。图片摘要：${textBlock(JSON.stringify(imageAnalysis), 700)}。如果图片摘要为空或失败，要在check里说明图片识别失败。输出JSON，final不超过1000字，final内必须用真实换行分段，titleCoverPairs必须正好5组标题+封面一一对应：{"final":"标题\n\n正文第一段\n\n正文第二段\n\n标签","titleCoverPairs":[{"title":"标题1","coverText":"封面大字","coverSubtext":"封面小字","coverVisual":"画面建议","imageUse":"用图建议","reason":"匹配逻辑"}],"titles":"5组标题封面文本","script":"6页图片脚本","check":"发布检查","scores":{"hook":80,"real":80,"ai":"低"}}`;
        raw = await openAIChat([
          { role: 'system', content: '你是老谭小红书内容总编，只用GPT-5.5。极速输出JSON，不要解释。' },
          { role: 'user', content: micro },
        ], env, 900, { timeoutMs: 90000, maxTokensCap: 900, temperature: 0.3, reasoningEffort: reasoning, model, json: false });
        if (imgsForGpt.length > 0 && !visionFallbackUsed) visionMode = 'gpt-5.5-text-fallback';
      } catch (e3) {
        const reason = [directVisionError && 'GPT-5.5直读图片失败：' + directVisionError, String(e3.message || e2.message || e.message || e)].filter(Boolean).join('\n');
        return json(buildFallbackGenerateResult(input, imageAnalysis, reason, model, reasoning, originalCounts, imageSentForOcr));
      }
    }
  }
  let result = standardizeXhsResult(normalizeDeepSeekJSON(raw));
  result = enforceXhsBrandMention(result, input);
  if (typeof result.final === 'string') result.final = formatXhsText(result.final);
  if (result.final && typeof result.final === 'object' && result.final.body) result.final.body = formatXhsText(result.final.body);
  if (typeof result.final === 'string') result.final = ensureParagraphSpacing(result.final);
  result = limitXhsFinalLength(result, 1000);
  if (originalCounts.mine > 0 && !directImagesAttached && !result.imageMaterial && !imageAnalysis.some(x=>!x.error)) {
    result.check = (result.check || '') + '\n\n图片关联警告：GPT-5.5 未返回可验证的图片细节。本次不应视为有效看图，请补充图片文字描述或降低图片复杂度后重试。';
  }
  result.imageAnalysis = imageAnalysis;
  result.readState = usageState(input, 'openai-only');
  result.readState.model = model;
  result.readState.reasoning = reasoning;
  result.readState.imageAnalysisCount = imageAnalysis.filter(x=>!x.error).length;
  result.readState.imageOcrAttempted = imageSentForOcr;
  result.readState.imageOcrErrors = imageAnalysis.filter(x=>x.error).length;
  result.readState.benchmarkImages = originalCounts.benchmark;
  result.readState.myImages = originalCounts.mine;
  result.readState.imageReadable = directImagesAttached || Boolean(result.imageMaterial) || imageAnalysis.some(x=>!x.error);
  result.readState.directImagesAttached = directImagesAttached;
  result.readState.visionMode = visionMode;
  result.readState.visionFallbackUsed = visionFallbackUsed;
  if (visionFallbackUsed && directVisionError) result.readState.directVisionError = textBlock(directVisionError, 500);
  result.readState.imageMaterialReturned = Boolean(result.imageMaterial);
  const imageModeText = directImagesAttached
    ? '我的素材图由 GPT-5.5 直接读取并生成，Qwen-VL 未参与。'
    : (visionFallbackUsed ? 'GPT-5.5 直读图片失败后，已改用备用 OCR/摘要链路再交给 GPT-5.5 生成。' : '本次未上传我的素材图，按文字素材生成。');
  result.check = (result.check || '') + `\n\n系统说明：本次小红书工作使用 ${model}，推理强度 ${reasoning}。${imageModeText} 对标图只用于拆解辅助，不会被当成你的案例素材。`;
  result.check = ensureParagraphSpacing(result.check || '');
  return json(result);
}

function buildFallbackGenerateResult(input = {}, imageAnalysis = [], reason = '', model = 'gpt-5.5', reasoning = 'medium', originalCounts = {}, imageSentForOcr = 0) {
  const brand = String(input.brandName || '当前品牌').trim();
  const core = String(input.corePoint || input.benchmarkTitle || '装修前先把判断标准搞清楚').trim();
  const notes = String(input.myNotes || input.benchmarkText || '补充一个真实客户场景、楼盘面积、报价/合同/工地细节，会更像真人内容。').trim();
  const must = String(input.mustSay || '').trim();
  const avoid = String(input.avoidSay || '绝对承诺、恐吓、点名攻击具体公司').trim();
  const imgLine = imageAnalysis.filter(x=>!x.error).map(x => [x.ocr, x.content_points && x.content_points.join('、')].filter(Boolean).join('；')).filter(Boolean).join('\n');
  const title = core.length > 28 ? core.slice(0, 28) : core;
  let final = [
    title,
    '',
    '很多长沙业主不是不会装修，是签约前不知道该先看哪里。',
    '',
    notes.slice(0, 240),
    '',
    '这时候不要只看总价，也不要只听一句“后面不会加”。',
    '',
    '先把三个边界看清楚：',
    '',
    '1. 报价边界：哪些包含，哪些另算，材料型号有没有写清。',
    '',
    '2. 合同边界：付款节点、增项确认、验收标准有没有写进合同。',
    '',
    '3. 责任边界：后面谁确认、谁负责、怎么留证据。',
    '',
    imgLine ? '这次图片里可用的信息：' + imgLine.slice(0, 180) : '',
    '',
    must ? '这篇重点抓住：' + must : '',
    '',
    brand + '做的是装修前独立判断，不替你拍板选公司，只帮你先看清报价、预算和合同边界。',
    '',
    '如果你也准备交定金，先把报价和合同关键页整理出来，再决定要不要往下签。',
    '',
    '#' + brand.replace(/\s+/g, '') + ' #长沙装修 #装修报价 #装修合同 #签约前避坑'
  ].filter(Boolean).join('\n');
  final = ensureParagraphSpacing(formatXhsText(final));
  const titleCoverPairs = [
    {
      title,
      coverText: title,
      coverSubtext: '签约前先看这一步',
      coverVisual: '用报价单、合同局部或工地现场作底图，标题压在画面上半区，留出干净留白。',
      imageUse: '优先用用户上传的真实报价/合同/工地图；没有图片时用简洁文字封面。',
      reason: '标题直接承接核心观点，封面把用户先拦在签约前。'
    },
    {
      title: '长沙装修签约前，别只看总价',
      coverText: '别只看总价',
      coverSubtext: '报价边界更重要',
      coverVisual: '左右对比构图：左侧总价数字，右侧材料/工艺/增项清单。',
      imageUse: '适合报价单、预算表、合同条款截图打码后使用。',
      reason: '标题说动作劝阻，封面放大“总价”误区，适合提高停留。'
    },
    {
      title: '报价低不低，先看合同边界',
      coverText: '低价不等于靠谱',
      coverSubtext: '先看合同边界',
      coverVisual: '合同页或清单页作为背景，用圈注标出付款节点、增项确认、材料型号。',
      imageUse: '适合合同关键页、报价清单或手写标注图。',
      reason: '标题和封面都围绕低价风险，但不做恐吓和绝对承诺。'
    },
    {
      title: '交定金前先查这3项',
      coverText: '定金前查3项',
      coverSubtext: '报价/合同/责任',
      coverVisual: '三栏清单式封面，每栏一个检查项，整体像可收藏的检查表。',
      imageUse: '适合做纯文字清单封面，或叠加工地/桌面资料图。',
      reason: '标题给明确动作，封面直接呈现可收藏价值。'
    },
    {
      title: '装修报价拿不准，先别急着签',
      coverText: '拿不准先别签',
      coverSubtext: brand,
      coverVisual: '人物视角看报价单或手机聊天记录，保留一点真实犹豫感。',
      imageUse: '适合用户自己的聊天截图、报价截图、现场沟通图打码后使用。',
      reason: '标题贴近用户犹豫心理，封面把“暂停签约”做成低压力提醒。'
    }
  ];
  const result = limitXhsFinalLength({
    benchmarkAnalysis: fallbackBenchmarkAnalysis(input, [], reason),
    final,
    titleCoverPairs,
    titles: formatTitleCoverPairs(titleCoverPairs),
    script: [
      '第1页：封面：从上方标题封面5组里选1组，封面和标题必须配套使用。',
      '第2页：真实场景：小区/面积/装修阶段/拿到几份报价',
      '第3页：报价边界：材料型号、数量、单价、是否另算',
      '第4页：合同边界：付款节点、增项确认、验收标准',
      '第5页：责任边界：谁确认、谁负责、怎么留证据',
      '第6页：收尾：签约前先做初步判断'
    ].join('\n'),
    check: '服务器兜底生成：GPT-5.5 上游未稳定返回，已先返回可编辑初稿；稍后可重新点生成获取精修版。\n\n错误分类：' + classifyUpstreamError(reason) + '\n\n已规避：' + avoid + '\n\n上游原因：' + textBlock(reason, 300),
    scores: { hook: 78, real: 76, ai: '中' },
    imageAnalysis,
    readState: {
      provider: 'server-fallback',
      knowledgeChars: textBlock(input.knowledgeText, 12000).length,
      benchmarkChars: `${input.benchmarkTitle || ''}${input.benchmarkText || ''}${input.benchmarkNotes || ''}`.length,
      myMaterialChars: `${input.myNotes || ''}${input.corePoint || ''}${input.mustSay || ''}${input.avoidSay || ''}`.length,
      benchmarkImages: originalCounts.benchmark || 0,
      myImages: originalCounts.mine || 0,
      imageReadable: imageAnalysis.some(x=>!x.error),
      model,
      reasoning,
      imageAnalysisCount: imageAnalysis.filter(x=>!x.error).length,
      imageOcrAttempted: imageSentForOcr,
      imageOcrErrors: imageAnalysis.filter(x=>x.error).length,
      directImagesAttached: false,
      imageMaterialReturned: imageAnalysis.some(x=>!x.error),
      upstreamErrorType: classifyUpstreamError(reason),
      upstreamError: textBlock(reason, 500),
    }
  }, 1000);
  result.check = (result.check || '') + `\n\n系统说明：本次为服务器兜底结果，模型目标仍为 ${model}，推理强度 ${reasoning}。错误分类：${classifyUpstreamError(reason)}。`;
  return result;
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
  items.push(...getB2BEffectiveContactLibrary(position));
  return items.map((x, idx) => ({ id: idx + 1, source: x.source || '飞书文档整理', position: position[x.brand] || x.position || '', ...x }));
}

function getB2BEffectiveContactLibrary(position = {}) {
  const brands = {
    '8K设计': {
      action: '到公司',
      mind: '来8K不是听销售介绍，而是做设计判断：设计能力、案例匹配、8000设计费值不值、效果图能不能真实落地。',
      redlines: ['不讲宅师傅半包价格。', '不把公司规模当主钩子。', '不说“聊聊需求”，要说“带户型图判断设计方向、预算和落地难度”。', '设计费不能说成几张图，要讲服务边界和落地配合。'],
      stages: {
        '首次加微信': '您好～我是8K全案设计这边主理人。我们不是只出效果图的纯设计，主要做「设计 + 半包落地」：好设计、高审美，但不做高溢价。\n\n我们原创设计师团队有12年+大宅设计经验，200㎡内常规户型8000起。长沙别墅、复式楼、大平层100+项目施工落地中，工地也可以看。\n\n您是哪个楼盘、大概多大面积？我看看有没有同楼盘、同面积或相近风格的案例，先发您参考。',
        'D0接待': '你现在不用急着定设计，也不用急着交钱。\n\n我先按你家情况发一组相关案例。你重点不是看图好不好看，而是看：风格和你家像不像、预算能不能撑住、后期能不能落地。\n\n你把楼盘、面积和喜欢的风格发我，我先帮你匹配。',
        'D2-D3轻邀约': '你现在不用急着定，也不用急着交钱。\n\n你这个情况，最该先判断的是：设计方向、8000设计费包含什么、你喜欢的效果最后能不能真实落地。\n\n线上看图只能看审美，到公司可以结合户型图、同风格案例和效果图到完工的链路一起看。\n\n你看这周工作日晚上，还是周末带户型图来更方便？'
      },
      types: [
        ['设计信任型','设计','你们到底会不会设计','到公司','看设计师怎么分析户型、需求和风格。','设计师户型分析过程 / 同风格案例菜单'],
        ['落地型','落地 / 工艺','效果图能不能做出来','到公司','看效果图、施工图、完工实景之间的完整链路。','效果图 vs 完工实拍 / 施工节点落地证据'],
        ['设计费型','预算 / 报价','8000元设计费值不值','到公司','看服务边界，确认8000到底包含什么。','8000设计服务清单 / 服务边界图'],
        ['案例匹配型','案例','有没有和我家相关案例','到公司','按面积、户型、风格匹配案例，而不是看一堆无关图片。','同面积/同风格案例目录'],
        ['预算匹配型','预算','喜欢的效果装不装得起','到公司','结合户型、风格和预算判断效果是否现实。','风格预算匹配说明 / 同预算案例']
      ]
    },
    '玖玖精工 / 玖玖半包': {
      action: '看工地',
      mind: '来玖玖精工不是听半包介绍，而是做施工判断：工艺标准、真实工地、报价漏项、图纸能不能落地。',
      redlines: ['不说成低价半包。', '不占普通家庭低价心智。', '不只比总价，必须讲工艺、漏项、材料和图纸落地。', '看工地是主动作，不要一上来只发报价。'],
      stages: {
        '首次加微信': '您好～玖玖精工这边，我们专注长沙大宅高标准半包施工。\n\n纯施工能做，设计+施工一站式也能做。现在有100+别墅、复式、大平层工地在施工，真实工地可以看。\n\n你现在是已经有设计图，还是还在前期规划？我可以先按你家情况发工地、工艺或报价参考。',
        'D0接待': '你现在不用急着定施工方。\n\n半包施工最怕不是价格高一点，而是图纸落不了地、报价漏项、施工过程没人管。\n\n我先发一组真实工地给你，你重点看工艺节点和现场管理，不是只看工地干不干净。',
        'D2-D3轻邀约': '你现在不用急着定，也不用急着交钱。\n\n你最该先判断的是施工靠不靠谱、报价有没有漏项、后期能不能把设计图落地。\n\n这个线上看资料很难判断清楚。我建议先看一次真实工地，这一趟主要帮你判断工艺、管理和节点标准。\n\n你看这周工作日，还是周末看工地更方便？'
      },
      types: [
        ['有图纸型','落地 / 报价','图纸能不能落地','到公司','带图纸判断施工难点、预算风险和落地路径。','图纸节点 vs 现场节点 / 图纸精算案例'],
        ['工艺验证型','工艺','施工靠不靠谱','看工地','现场看工艺、管理、材料和节点。','大宅工地实拍 / 水电防水泥木节点'],
        ['报价型','预算 / 报价','半包报价是否漏项','到公司','拆报价结构，看项目、材料、工艺标准和漏项。','报价结构说明 / 漏项风险清单'],
        ['大宅复杂型','设计 / 全案 / 落地','别墅复式节点难','看工地','看复杂节点和最终交付，判断团队能不能接住。','别墅/复式/大平层复杂节点案例'],
        ['付款保障型','付款','施工过程失控','到公司','把施工流程、验收逻辑和付款方式先看清楚。','付款节点说明 / 验收流程图']
      ]
    },
    '玖玖精装': {
      action: '到公司',
      mind: '来玖玖精装不是普通装修咨询，而是判断精装房哪里值得改、预算是否合理、全案能否一体落地。',
      redlines: ['瑞府30+套统一说“设计 / 施工 / 定制推进中”。', '不要只卖8000设计费，设计只是入口，后端是全案交付。', '不要说成普通半包或普通改造公司。', '必须讲设计、改造、定制、软装一体化衔接。'],
      stages: {
        '首次加微信': '您好～玖玖精装全案改造这边，我们主要做高端精装房改造，设计+改造+定制+软装一站式交付。\n\n长沙市区100+案例落地，瑞府也有30+套在设计、施工、定制推进中。\n\n您是哪个楼盘、大概多大面积？我可以先按楼盘和户型帮您匹配相近案例。',
        'D0接待': '你现在不用急着决定改不改。\n\n精装房改造最怕盲目拆、盲目换、盲目加预算。我先发一组同楼盘/相近户型案例，你重点看改造前后和全案落地效果。',
        'D2-D3轻邀约': '你现在不用急着定，也不用急着交钱。\n\n你这个情况，最该先判断的是哪里值得改、哪里不建议浪费钱、预算区间怎么控制、后期设计和定制能不能一体落地。\n\n线上看案例只能看一部分，我建议带户型图和现场照片到公司做一次改造判断。\n\n你看这周工作日，还是周末过来更方便？'
      },
      types: [
        ['改造判断型','改造','哪里该改，哪里不该改','到公司','带户型图和现场照片判断保留、微改、重做和预算方向。','改造前后对比 / 保留与重做判断卡'],
        ['同楼盘型','案例','有没有类似案例','到公司','看同楼盘/同面积/同风格案例，而不是乱刷图。','同楼盘案例库 / 瑞府推进中背书'],
        ['全案落地型','全案 / 落地','设计、施工、定制、软装会不会脱节','到公司','看设计、改造、定制、软装怎么衔接。','全案流程卡 / 四环节衔接图'],
        ['效果落地型','落地 / 设计','效果图能否实现','看完工现场','看效果图与真实落地之间的差距。','效果图 vs 实景 / 完工现场'],
        ['预算型','预算 / 报价','喜欢的效果要花多少钱','到公司','判断喜欢的效果和预算能不能匹配。','预算构成说明 / 同档次案例']
      ]
    },
    '宅师傅半包装修': {
      action: '免费量房',
      mind: '来宅师傅不是听装修报价，而是先把自己家怎么装、半包多少钱、哪里容易增项、付款是否安全算清楚。',
      redlines: ['免费量房只用于宅师傅。', '438元/㎡起不能说成所有客户最终价。', '不要包装成高端大宅品牌。', '先施工后付款、增项负责等承诺以公司最终规则为准。'],
      stages: {
        '首次加微信': '您好～宅师傅这边，我们做长沙普通家庭透明半包，438元/㎡起。\n\n可以先免费量房，出平面图、施工图和精准预算，不签约也能带走参考。\n\n你现在是想先看半包大概要多少钱，还是想先了解免费量房出图预算的流程？',
        'D0接待': '你现在不用急着定装修公司。\n\n普通家庭装修最怕预算不清楚，前期听着便宜，后面越装越超。我先发你一组预算逻辑，你重点看哪些是基础半包，哪些会因为户型和需求变化。',
        'D2-D3轻邀约': '你现在不用急着定，也不用急着交钱。\n\n你这个情况，最该先判断的是你家怎么装、半包大概要多少钱、哪些地方容易增项。\n\n我建议先做一次免费量房，把平面图、施工图和预算做出来。这一趟不是让你马上签，而是先把自己家装修算清楚。\n\n你看这周工作日晚上，还是周末量房方便？'
      },
      types: [
        ['预算型','预算 / 报价','半包到底多少钱','免费量房','先算清你家半包大概要多少钱，别只听每平米价格。','预算拆解图 / 免费量房出图流程'],
        ['增项型','增项','怕后期加钱','免费量房','先把图纸和预算做清楚，提前看哪些地方容易增项。','图纸预算流程 / 容易增项清单'],
        ['付款型','付款','怕先交钱后被动','到公司','当面把验收节点、付款方式和保障规则讲清楚。','付款节点说明 / 验收流程图'],
        ['工艺型','工艺 / 落地','便宜会不会质量差','看工地','现场看施工和完工，比微信上讲工艺更直观。','真实工地实拍 / 工艺节点图'],
        ['小白型','小白 / 设计','不知道从哪里开始','免费量房','第一次装修先把户型、方案和预算理清楚。','免费量房流程 / 装修步骤说明']
      ]
    }
  };
  const refusal = {
    '没时间': '没关系，不急。\n\n我不建议你为了看公司专门跑一趟，但如果你要判断【核心问题】，线下看一次会更省时间。\n\n我先按你家情况发一组资料，你看完如果还觉得拿不准，我们再约一个最方便的时间。',
    '先看看': '可以，你先看。\n\n我建议你看资料时别只看好不好看，重点看三件事：\n1. 和你家面积 / 户型像不像；\n2. 预算和你预期是否接近；\n3. 最后有没有真实落地证据。\n\n你看完如果还是拿不准，我再帮你判断该看工地、到公司，还是看完工现场。',
    '太远了': '理解，专门跑一趟肯定要有价值。\n\n所以我不建议你只是来听介绍。如果要来，这一趟必须帮你判断清楚【具体问题】。\n\n你把小区、面积和最担心的问题发我，我先判断值不值得来，值得再约，不值得我就先线上发你资料。',
    '沉默': '我先不打扰你。\n\n你后面如果还在看装修，别急着只比价格或只看效果图。\n\n先判断清楚：方案是否适合、预算是否清楚、工艺是否靠谱、最后能不能落地。\n\n你把小区、面积和最担心的问题发我，我再帮你判断下一步该看什么。'
  };
  const out = [];
  const invite = (type) => `你现在不用急着定，也不用急着交钱。\n\n你这个情况，最该先判断的是：${type[2]}。\n\n这个在线上看资料很难判断清楚。我建议你先【${type[3]}】，这一趟主要帮你判断：${type[4]}\n\n你看这周工作日，还是周末方便？`;
  const material = (type) => `我先发你一组【${type[5]}】，不是让你马上定。\n\n你重点看的是：它能不能帮你判断「${type[2]}」。\n\n看完以后，如果你还是拿不准，我们再决定下一步是${type[3]}，还是先继续补资料。`;
  Object.entries(brands).forEach(([brand, data]) => {
    out.push({ brand, scene: 'B端有效接触', status: '品牌心智', title: `${brand}｜有效接触核心心智`, text: data.mind, logic: 'B端四品牌有效接触模式的品牌心智定位。', source: 'B端有效接触规则库' });
    Object.entries(data.stages).forEach(([stage, text]) => out.push({ brand, scene: 'B端有效接触', status: stage, title: `${brand}｜${stage}`, text, logic: '按微信阶段推进，不急着成交。', source: 'B端有效接触规则库' }));
    data.types.forEach(type => {
      out.push({ brand, scene: '判断型邀约', status: type[0], title: `${brand}｜${type[0]}｜判断型邀约`, text: invite(type), logic: `主动作：${type[3]}。判断价值：${type[4]}`, source: 'B端有效接触规则库' });
      out.push({ brand, scene: '物料动作', status: type[0], title: `${brand}｜${type[5]}`, text: `解决顾虑：${type[2]}\n推动动作：${type[3]}\n\n${material(type)}`, logic: '中间培育先发物料，不空催到访。', source: 'B端有效接触规则库' });
    });
    data.redlines.forEach((text, index) => out.push({ brand, scene: '禁区提醒', status: '禁区', title: `${brand}｜禁区 ${index + 1}`, text, logic: '防止跨品牌口径混用。', source: 'B端有效接触规则库' }));
    Object.entries(refusal).forEach(([status, text]) => out.push({ brand, scene: '拒绝处理', status, title: `${brand}｜${status}`, text, logic: '降低压力，保留判断入口。', source: 'B端有效接触规则库' }));
  });
  return out.map(x => ({ position: position[x.brand] || '', ...x }));
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

async function callDeepSeekWithOcr(input = {}, body = {}, env) {
  // 第一步：用 GPT 做图片 OCR
  input = hydrateXhsBrand(input);
  const mineImgs = (input.images?.mine || []).filter(x => x && x.dataUrl).slice(0, 2);
  let imageAnalysis = [];
  if (mineImgs.length > 0) {
    imageAnalysis = await analyzeImages({...input, images:{benchmark:[], mine: mineImgs}}, env);
  }
  // 第二步：把 OCR 结果注入到文本中，传给 DeepSeek
  const ocrLines = imageAnalysis.filter(x => !x.error).map(img =>
    `[图片分析] ${img.group||''}:\n装修风格: ${img.style||img.visual||'未知'}\n色调材质: ${img.colors||''} / ${img.materials||''}\n空间: ${img.space||''}\n图中文字: ${img.ocr||''}\n可写进正文的亮点: ${(img.content_points||[]).join('、')}`
  );
  const enrichedInput = {
    ...input,
    images: { benchmark: [], mine: [] },
    myNotes: (input.myNotes || '') + (ocrLines.length ? '\n\n【以下为上传图片的 GPT 视觉分析结果，请在正文中引用装修风格、颜色、材料等具体细节】\n' + ocrLines.join('\n') : ''),
  };
  // 第三步：DeepSeek 文本生成
  const result = await callDeepSeek(compactInput(enrichedInput), body, env);
  if (result.status >= 500) return result;
  // 注入 OCR 状态
  const parsed = await result.json();
  parsed.readState = parsed.readState || {};
  parsed.readState.imageReadable = true;
  parsed.readState.imageAnalysisCount = imageAnalysis.filter(x => !x.error).length;
  parsed.readState.imageOcrErrors = imageAnalysis.filter(x => x.error).length;
  parsed.check = (parsed.check || '') + '\n\n系统说明：已通过识图模型提取图片风格/颜色/材料信息，再交由 DeepSeek 生成正文。';
  return json(parsed);
}

async function callAnthropic(input = {}, body = {}, env) {
  input = compactInput(input);
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'ANTHROPIC_API_KEY is not configured on server.', tip: '请在 Cloudflare Worker 中设置 ANTHROPIC_API_KEY 密钥' }, 500);

  const isRevise = body.action === 'revise';
  const reviseContext = isRevise ? `\n\n【当前版本】\n${textBlock(body.currentVersion, 6000)}\n\n【修改要求】\n${textBlock(body.revisionInstruction, 2000)}` : '';

  const system = (isRevise ? buildReviseSystemPrompt(input) : buildSystemPrompt(input))
    + '\n\n你必须只输出纯 JSON，不要包含任何 Markdown 代码块标记（如 ```json），直接输出 JSON 对象。';
  const user = (isRevise ? buildReviseUserPrompt({...input, images:{}}, '') : buildUserPrompt({...input, images:{}}, '')) + reviseContext;

  const model = env.ANTHROPIC_MODEL || 'claude-opus-4-7';
  const baseUrl = env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1';
  const isProxy = !!env.ANTHROPIC_BASE_URL;

  let endpoint, headers, payload;
  if (isProxy) {
    // 中转站：OpenAI 兼容格式
    endpoint = baseUrl.replace(/\/+$/, '') + '/chat/completions';
    headers = {
      'Authorization': `Bearer ${env.ANTHROPIC_API_KEY}`,
      'Content-Type': 'application/json',
    };
    payload = {
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      max_tokens: 2400,
      temperature: 0.62,
    };
  } else {
    // 官方 Anthropic：原生格式
    endpoint = 'https://api.anthropic.com/v1/messages';
    headers = {
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    };
    payload = {
      model,
      system,
      messages: [{ role: 'user', content: user }],
      max_tokens: 2400,
      temperature: 0.62,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), 180000);
  let resp, text;
  try {
    resp = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    text = await resp.text();
  } catch (e) {
    clearTimeout(timer);
    return json({ error: 'Anthropic 请求超时（180秒）', detail: String(e.message || e).slice(0, 300) }, 502);
  }
  clearTimeout(timer);
  if (!resp.ok) return json({ error: 'Anthropic API 错误', status: resp.status, detail: text.slice(0, 800) }, 502);

  let data;
  try { data = JSON.parse(text); } catch (_) { return json({ error: 'Anthropic 返回非 JSON', detail: text.slice(0, 500) }, 502); }

  // 中转站返回 OpenAI 格式 (choices[0].message.content)；官方返回 data.content[0].text
  let content = isProxy ? (data.choices?.[0]?.message?.content || '') : (data.content?.[0]?.text || '');
  let result = normalizeDeepSeekJSON(content);
  if (typeof result.final === 'string') result.final = formatXhsText(result.final);
  if (result.final && typeof result.final === 'object' && result.final.body) result.final.body = formatXhsText(result.final.body);
  result = limitXhsFinalLength(result, 1000);
  result = enforceXhsBrandMention(result, input);
  result.readState = usageState(input, 'anthropic');
  result.readState.model = model;
  result.readState.imageReadable = false;
  result.check = (result.check || '') + '\n\n系统说明：本次使用 Anthropic Claude Opus 4.7 文本模式生成。若有图片，已先通过识图模型提取文字后传入 Opus。';
  return json(result);
}

async function callAnthropicWithOcr(input = {}, body = {}, env) {
  input = hydrateXhsBrand(input);
  const mineImgs = (input.images?.mine || []).filter(x => x && x.dataUrl).slice(0, 2);
  let imageAnalysis = [];
  if (mineImgs.length > 0) {
    imageAnalysis = await analyzeImages({...input, images:{benchmark:[], mine: mineImgs}}, env);
  }
  const ocrLines = imageAnalysis.filter(x => !x.error).map(img =>
    `[图片分析] ${img.group||''}:\n装修风格: ${img.style||img.visual||'未知'}\n色调材质: ${img.colors||''} / ${img.materials||''}\n空间: ${img.space||''}\n图中文字: ${img.ocr||''}\n可写进正文的亮点: ${(img.content_points||[]).join('、')}`
  );
  const enrichedInput = {
    ...input,
    images: { benchmark: [], mine: [] },
    myNotes: (input.myNotes || '') + (ocrLines.length ? '\n\n【以下为上传图片的视觉分析结果，请在正文中引用装修风格、颜色、材料等具体细节】\n' + ocrLines.join('\n') : ''),
  };
  const result = await callAnthropic(compactInput(enrichedInput), body, env);
  if (result.status >= 500) return result;
  const parsed = await result.json();
  parsed.readState = parsed.readState || {};
  parsed.readState.imageReadable = true;
  parsed.readState.imageAnalysisCount = imageAnalysis.filter(x => !x.error).length;
  parsed.readState.imageOcrErrors = imageAnalysis.filter(x => x.error).length;
  parsed.check = (parsed.check || '') + '\n\n系统说明：已通过识图模型提取图片风格/颜色/材料信息，再交由 Claude Opus 4.7 生成正文。';
  return json(parsed);
}

async function callBenchmarkAnalysis(input = {}, env) {
  const callDeepSeekBenchmark = async () => {
    if (!env.DEEPSEEK_API_KEY) return null;
    const prompt = `只拆解对标文案结构，不生成完整正文。\n\n【对标文案】\n标题：${textBlock(input.benchmarkTitle, 300)}\n正文：${textBlock(input.benchmarkText, 1200)}\n我喜欢它的点：${textBlock(input.benchmarkNotes, 500)}\n\n输出JSON：{"benchmarkAnalysis":{"标题钩子":"...","开头痛点":"...","正文结构":"...","段落节奏":"...","情绪推进":"...","结尾引导":"...","可借鉴点":["..."],"禁止照抄":["..."]}}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('timeout'), 30000);
    let resp, text;
    try {
      resp = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: env.DEEPSEEK_MODEL || 'deepseek-chat',
          messages: [
            { role: 'system', content: '你是老谭小红书内容总编。只做对标拆解，不生成正文。输出JSON。' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.5, max_tokens: 1200,
          response_format: { type: 'json_object' },
        }),
        signal: controller.signal,
      });
      text = await resp.text();
    } catch (e) {
      clearTimeout(timer);
      return json({ error: '拆解请求超时', detail: String(e.message || e).slice(0, 300) }, 502);
    }
    clearTimeout(timer);
    if (!resp.ok) return json({ error: '拆解 API 错误', status: resp.status, detail: text.slice(0, 500) }, 502);
    let data;
    try { data = JSON.parse(text); } catch (_) { return json({ error: '拆解返回非 JSON', detail: text.slice(0, 300) }, 502); }
    const r = normalizeDeepSeekJSON(data.choices?.[0]?.message?.content || '');
    return json({ benchmarkAnalysis: r.benchmarkAnalysis || r.final || text.slice(0, 500), provider: 'deepseek' });
  };

  if (!env.ANTHROPIC_API_KEY) {
    const deepseekResult = await callDeepSeekBenchmark();
    if (deepseekResult) return deepseekResult;
    return json({ error: 'ANTHROPIC_API_KEY is not configured.', tip: '请在 Cloudflare Worker 中设置 ANTHROPIC_API_KEY 密钥' }, 500);
  }

  const prompt = `只拆解对标文案结构，不生成完整正文。\n\n【对标文案】\n标题：${textBlock(input.benchmarkTitle, 300)}\n正文：${textBlock(input.benchmarkText, 1200)}\n我喜欢它的点：${textBlock(input.benchmarkNotes, 500)}\n\n输出JSON：{"benchmarkAnalysis":{"标题钩子":"...","开头痛点":"...","正文结构":"...","段落节奏":"...","情绪推进":"...","结尾引导":"...","可借鉴点":["..."],"禁止照抄":["..."]}}`;

  const model = env.ANTHROPIC_MODEL || 'claude-opus-4-7';
  const baseUrl = env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1';
  const isProxy = !!env.ANTHROPIC_BASE_URL;

  let endpoint, headers, payload;
  if (isProxy) {
    endpoint = baseUrl.replace(/\/+$/, '') + '/chat/completions';
    headers = {
      'Authorization': `Bearer ${env.ANTHROPIC_API_KEY}`,
      'Content-Type': 'application/json',
    };
    payload = {
      model,
      messages: [
        { role: 'system', content: '你是老谭小红书内容总编。只做对标拆解，不生成正文。必须只输出纯 JSON，不要 Markdown 代码块。' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1200,
      temperature: 0.5,
    };
  } else {
    endpoint = 'https://api.anthropic.com/v1/messages';
    headers = {
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    };
    payload = {
      model,
      system: '你是老谭小红书内容总编。只做对标拆解，不生成正文。必须只输出纯 JSON，不要 Markdown 代码块。',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1200,
      temperature: 0.5,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), 180000);
  let resp, text;
  try {
    resp = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload), signal: controller.signal });
    text = await resp.text();
  } catch (e) {
    clearTimeout(timer);
    return json({ error: '拆解请求超时', detail: String(e.message || e).slice(0, 300) }, 502);
  }
  clearTimeout(timer);
  if (!resp.ok) {
    const deepseekResult = await callDeepSeekBenchmark();
    if (deepseekResult) return deepseekResult;
    return json({ error: '拆解 API 错误', status: resp.status, detail: text.slice(0, 500) }, 502);
  }

  let data;
  try { data = JSON.parse(text); } catch (_) { return json({ error: '拆解返回非 JSON', detail: text.slice(0, 300) }, 502); }
  const content = isProxy ? (data.choices?.[0]?.message?.content || '') : (data.content?.[0]?.text || '');
  const r = normalizeDeepSeekJSON(content);
  return json({ benchmarkAnalysis: typeof r.benchmarkAnalysis === 'object' ? JSON.stringify(r.benchmarkAnalysis, null, 2) : (r.benchmarkAnalysis || r.final || content.slice(0, 500)) });
}

async function handleXhsGenerate(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method === 'GET') {
    const primaryModel = env.OPENAI_API_KEY ? 'openai' : (env.ANTHROPIC_API_KEY ? 'anthropic' : (env.DEEPSEEK_API_KEY ? 'deepseek' : 'none'));
    const modelName = env.OPENAI_API_KEY ? (env.OPENAI_MODEL || 'gpt-5.5') : (env.ANTHROPIC_API_KEY ? (env.ANTHROPIC_MODEL || 'claude-opus-4-7') : (env.DEEPSEEK_MODEL || 'deepseek-chat'));
    const visionProvider = env.OPENAI_API_KEY ? 'gpt-5.5-direct' : 'none';
    const visionFallback = env.QWEN_API_KEY ? 'qwen-vl' : (env.OPENAI_API_KEY ? 'gpt-5.5-ocr' : 'none');
    return json({ ok: true, provider: primaryModel, vision: visionProvider, visionFallback, endpoint: '/api/xhs-generate', model: modelName, reasoning: env.OPENAI_REASONING_EFFORT || 'medium', note: `默认 ${primaryModel === 'openai' ? 'GPT-5.5' : primaryModel === 'anthropic' ? 'Claude Opus 4.7' : 'DeepSeek'} 生成；识图: ${visionProvider === 'gpt-5.5-direct' ? 'GPT-5.5直读' : '未配置'}；备用: ${visionFallback === 'qwen-vl' ? 'Qwen-VL' : visionFallback === 'gpt-5.5-ocr' ? 'GPT-5.5摘要' : '无'}` });
  }
  if (request.method !== 'POST') return json({ error: 'Method Not Allowed' }, 405);

  const body = await request.json().catch(() => ({}));
  let input = body.input || {};
  const hasMineImages = (input.images?.mine?.length || 0) > 0;

  // 拆解对标 → GPT-5.5 高推理优先
  if (body.action === 'benchmark-analysis') {
    if (env.OPENAI_API_KEY) return callOpenAIBenchmarkAnalysis(input, env);
    return callBenchmarkAnalysis(input, env);
  }

  // 主模型：GPT-5.5 高推理；Anthropic / DeepSeek 仅作为备用
  if (env.OPENAI_API_KEY) return callOpenAI(input, body, env);

  // 备用：Anthropic Claude Opus 4.7；DeepSeek 作为降级
  if (env.ANTHROPIC_API_KEY) {
    const anthropicResult = hasMineImages && (env.QWEN_API_KEY || env.OPENAI_API_KEY)
      ? await callAnthropicWithOcr(input, body, env)
      : await callAnthropic(input, body, env);
    if (anthropicResult.status < 500 || !env.DEEPSEEK_API_KEY) return anthropicResult;
    if (hasMineImages && (env.QWEN_API_KEY || env.OPENAI_API_KEY)) return callDeepSeekWithOcr(input, body, env);
    return callDeepSeek(input, body, env);
  }

  // 降级到 DeepSeek
  if (env.DEEPSEEK_API_KEY) {
    if (hasMineImages && (env.QWEN_API_KEY || env.OPENAI_API_KEY)) return callDeepSeekWithOcr(input, body, env);
    if (hasMineImages && !env.QWEN_API_KEY && !env.OPENAI_API_KEY) {
      input = compactInput(input);
      return callDeepSeek(input, body, env);
    }
    return callDeepSeek(input, body, env);
  }

  return json({ error: 'No AI model configured.', tip: '请在 Cloudflare Worker 中设置 ANTHROPIC_API_KEY 或 DEEPSEEK_API_KEY 密钥' }, 500);
}

async function handleXhsBenchmarks(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (!env.XHS_BENCHMARKS) return json({ error: 'XHS_BENCHMARKS KV is not configured' }, 500);
  const key = 'library:v1';
  if (request.method === 'GET') {
    const items = await env.XHS_BENCHMARKS.get(key, 'json').catch(() => null);
    return json({ ok: true, source: 'cloudflare-kv', items: Array.isArray(items) ? items : [] });
  }
  if (request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const item = body.item || {};
    const title = String(item.title || '').slice(0, 160).trim();
    const text = String(item.text || '').slice(0, 6000);
    const analysis = String(item.analysis || '').slice(0, 6000);
    const url = String(item.url || '').slice(0, 600);
    if (!title && !text && !analysis && !url) return json({ error: 'empty benchmark item' }, 400);
    const current = await env.XHS_BENCHMARKS.get(key, 'json').catch(() => null);
    const items = Array.isArray(current) ? current : [];
    const saved = {
      id: Date.now(),
      brand: String(item.brand || '').slice(0, 80),
      url,
      title: title || '未命名对标',
      text,
      notes: '',
      analysis,
      savedAt: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    };
    const next = [saved, ...items.filter(x => String(x.id) !== String(saved.id))].slice(0, 80);
    await env.XHS_BENCHMARKS.put(key, JSON.stringify(next));
    return json({ ok: true, item: saved, items: next });
  }
  if (request.method === 'DELETE') {
    const id = new URL(request.url).searchParams.get('id') || '';
    const current = await env.XHS_BENCHMARKS.get(key, 'json').catch(() => null);
    const items = Array.isArray(current) ? current : [];
    const next = items.filter(x => String(x.id) !== String(id));
    await env.XHS_BENCHMARKS.put(key, JSON.stringify(next));
    return json({ ok: true, items: next });
  }
  return json({ error: 'Method Not Allowed' }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/tools/xhs-login') return new Response('',{status:302,headers:{'Location':'/tools/xhs/'}});
    if (url.pathname === '/api/xhs-generate') return handleXhsGenerate(request, env);
    if (url.pathname === '/api/xhs-benchmarks') return handleXhsBenchmarks(request, env);
    if (url.pathname === '/api/scripts-reply') return handleScriptsReply(request, env);
    if (url.pathname === '/api/scripts-library') return json({ ok: true, source: 'feishu-doc:NkgtdR8eAoW470xdgtMcYePVnmf', items: getScriptsLibrary() });
    if (url.pathname === '/api/scripts-b2b-library') return json({ ok: true, source: 'b2b-effective-contact-rules', items: getB2BEffectiveContactLibrary() });
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    if (url.pathname.startsWith('/tools/xhs') || url.pathname.startsWith('/tools/scripts')) out.headers.set('Cache-Control','no-store');
    return out;
  },
};
