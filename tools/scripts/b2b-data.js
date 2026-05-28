(function () {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const state = {
    brand: "8K设计",
    stage: "首次加微信",
    level: "A高意向",
    concern: "落地",
    keyword: "",
    kind: "全部",
    action: "全部",
    libraryStage: "全部",
  };

  const stages = [
    "首次加微信",
    "D0接待",
    "D1补证据",
    "D2-D3轻邀约",
    "D5-D7二次证据",
    "D10-D15长期培育",
    "拒绝处理",
  ];

  const levels = {
    "A高意向": "有小区、面积、明确需求，并愿意发图纸 / 约量房 / 看工地 / 到公司 / 看完工现场。当天推进判断型邀约。",
    "B中意向": "有需求但时间不急，愿意看资料。先发匹配物料，3-5 天轻跟进。",
    "C培育": "还早期，只看内容和案例。每周发一次价值资料，不逼单。",
    "D暂缓": "不回复、需求不清、预算明显不匹配。停止高频追发，保留低压力入口。",
  };

  const concerns = ["预算", "增项", "付款", "工艺", "设计", "落地", "案例", "报价", "改造", "全案", "小白"];
  const libraryKinds = ["全部", "阶段话术", "判断型邀约", "物料解释", "拒绝处理", "禁区", "物料动作"];

  const brands = {
    "8K设计": {
      short: "高审美全案设计｜8000设计费清晰｜效果图能落地",
      mind: "客户来8K，不是来听销售介绍，而是来做一次设计判断：到公司看方案、案例和服务边界，也可以看完工现场判断效果图能不能真实落地。",
      defaultAction: "到公司 / 看完工",
      materials: ["效果图 vs 完工实拍", "同面积/同风格案例", "8000设计服务清单", "设计过程", "工地落地证据"],
      redlines: [
        "不讲宅师傅半包价格，不讲普通家庭低价口径。",
        "不把看公司规模当主钩子。",
        "不说“聊聊需求”，要说“带户型图来判断设计方向、预算和落地难度”。",
        "设计费不能说成几张图，要讲平面、效果图、施工图和后期落地配合。",
      ],
      types: [
        { name: "设计信任型", concerns: ["设计"], worry: "你们到底会不会设计", action: "到公司 / 看完工", judge: "到公司看设计师怎么分析户型、需求和风格，必要时再看完工落地。", material: "设计师户型分析过程 / 同风格案例菜单" },
        { name: "落地型", concerns: ["落地", "工艺"], worry: "效果图能不能做出来", action: "到公司 / 看完工", judge: "看效果图、施工图、完工实景之间的完整链路。", material: "效果图 vs 完工实拍 / 施工节点落地证据" },
        { name: "设计费型", concerns: ["预算", "报价"], worry: "8000元设计费值不值", action: "到公司 / 看完工", judge: "到公司看服务边界，确认8000到底包含什么，再用完工案例判断落地价值。", material: "8000设计服务清单 / 服务边界图" },
        { name: "案例匹配型", concerns: ["案例"], worry: "有没有和我家相关案例", action: "到公司 / 看完工", judge: "按面积、户型、风格匹配案例，并看完工案例验证落地。", material: "同面积/同风格案例目录" },
        { name: "预算匹配型", concerns: ["预算"], worry: "喜欢的效果装不装得起", action: "到公司 / 看完工", judge: "结合户型、风格、预算和完工案例判断效果是否现实。", material: "风格预算匹配说明 / 同预算案例" },
      ],
      stageScripts: {
        "首次加微信": `您好～我是8K全案设计这边主理人。我们不是只出效果图的纯设计，主要做「设计 + 半包落地」：好设计、高审美，但不做高溢价。

我们原创设计师团队有12年+大宅设计经验，200㎡内常规户型8000起。长沙别墅、复式楼、大平层100+项目施工落地中，工地也可以看。

您是哪个楼盘、大概多大面积？我看看有没有同楼盘、同面积或相近风格的案例，先发您参考。`,
        "D0接待": `你现在不用急着定设计，也不用急着交钱。

我先按你家情况发一组相关案例。你重点不是看图好不好看，而是看：风格和你家像不像、预算能不能撑住、后期能不能落地。

你把楼盘、面积和喜欢的风格发我，我先帮你匹配。`,
        "D1补证据": `这组资料我建议你重点看效果图和完工实景的关系。

线上看图只能看审美，真正难的是效果图最后怎么做出来。你如果担心落地，后面最好看一次完整链路。`,
        "D2-D3轻邀约": `你现在不用急着定，也不用急着交钱。

你这个情况，最该先判断的是：设计方向、8000设计费包含什么、你喜欢的效果最后能不能真实落地。

线上看图只能看审美，到公司可以结合户型图、同风格案例和服务边界一起看；如果你更担心落地，也可以看完工现场，直接判断效果图到实景的质感。

你看这周工作日晚上，还是周末带户型图来更方便？`,
        "D5-D7二次证据": `我再发你一组效果图和实景对比，你可以留着看。

重点看收口、灯光、材质和比例，不是单纯看照片好不好看。很多设计线上看很漂亮，但落地能力要看完整案例才判断得出来。`,
        "D10-D15长期培育": `我先不连续打扰你。

你后面如果还在看设计，直接发我「楼盘+面积+喜欢风格」就行。我可以先帮你匹配几套同面积或相近风格案例，你先看方向，不用急着定。`,
      },
    },
    "玖玖精工 / 玖玖半包": {
      short: "大宅高标准半包施工｜真实工地可看｜图纸精算",
      mind: "客户来玖玖精工，不是听半包介绍，而是做施工判断：工艺标准、真实工地、报价漏项、图纸能不能落地。",
      defaultAction: "看工地",
      materials: ["真实工地实拍", "节点工艺图", "图纸精算案例", "报价结构拆解", "完工实拍"],
      redlines: [
        "不说成低价半包，不占普通家庭低价心智。",
        "不把玖玖精工说成精装改造品牌。",
        "不只比总价，必须讲工艺标准、漏项、材料和图纸落地。",
        "看工地是主动作，不要一上来只发报价。",
      ],
      types: [
        { name: "有图纸型", concerns: ["落地", "报价"], worry: "图纸能不能落地", action: "到公司", judge: "带图纸判断施工难点、预算风险和落地路径。", material: "图纸节点 vs 现场节点 / 图纸精算案例" },
        { name: "工艺验证型", concerns: ["工艺"], worry: "施工靠不靠谱", action: "看工地", judge: "现场看工艺、管理、材料和节点。", material: "大宅工地实拍 / 水电防水泥木节点" },
        { name: "报价型", concerns: ["预算", "报价"], worry: "半包报价是否漏项", action: "到公司", judge: "拆报价结构，看项目、材料、工艺标准和漏项。", material: "报价结构说明 / 漏项风险清单" },
        { name: "大宅复杂型", concerns: ["设计", "全案", "落地"], worry: "别墅复式节点难", action: "看工地", judge: "看复杂节点和最终交付，判断团队能不能接住。", material: "别墅/复式/大平层复杂节点案例" },
        { name: "付款保障型", concerns: ["付款"], worry: "施工过程失控", action: "到公司", judge: "把施工流程、验收逻辑和付款方式先看清楚。", material: "付款节点说明 / 验收流程图" },
      ],
      stageScripts: {
        "首次加微信": `您好～玖玖精工这边，我们专注长沙大宅高标准半包施工。

纯施工能做，设计+施工一站式也能做。现在有100+别墅、复式、大平层工地在施工，真实工地可以看。

你现在是已经有设计图，还是还在前期规划？我可以先按你家情况发工地、工艺或报价参考。`,
        "D0接待": `你现在不用急着定施工方。

半包施工最怕不是价格高一点，而是图纸落不了地、报价漏项、施工过程没人管。

我先发一组真实工地给你，你重点看工艺节点和现场管理，不是只看工地干不干净。`,
        "D1补证据": `这组工地你重点看水电、防水、基层和收口。

这些地方微信上讲再多都比较虚，现场看一眼更容易判断施工标准。你在哪个区域？我帮你看附近有没有正在施工的大宅工地。`,
        "D2-D3轻邀约": `你现在不用急着定，也不用急着交钱。

你最该先判断的是施工靠不靠谱、报价有没有漏项、后期能不能把设计图落地。

这个线上看资料很难判断清楚。我建议先看一次真实工地，这一趟主要帮你判断工艺、管理和节点标准。

你看这周工作日，还是周末看工地更方便？`,
        "D5-D7二次证据": `我再发你一组图纸精算和现场节点的对比。

半包不能只看总价，关键要看项目有没有漏、材料有没有写清楚、工艺标准是什么。后面如果你有图纸，可以带过来拆一次。`,
        "D10-D15长期培育": `我先不连续打扰你。

你后面如果还在找施工方，直接把小区、面积、有没有图纸发我。我先帮你判断是该看工地，还是先拆图纸报价。`,
      },
    },
    "玖玖精装": {
      short: "高端精装房全案改造｜设计+改造+定制+软装一体",
      mind: "客户来玖玖精装，不是普通装修咨询，而是判断精装房哪里值得改、预算是否合理、全案能否一体落地。",
      defaultAction: "到公司",
      materials: ["同楼盘案例", "完工实拍", "效果图 vs 实景", "改造前后对比", "定制软装搭配"],
      redlines: [
        "瑞府30+套统一说“设计 / 施工 / 定制推进中”，不要夸大全部完工。",
        "不要只卖8000设计费，设计只是入口，后端是全案交付。",
        "不要说成普通半包或普通改造公司。",
        "必须讲设计、改造、定制、软装一体化衔接。",
      ],
      types: [
        { name: "改造判断型", concerns: ["改造"], worry: "哪里该改，哪里不该改", action: "到公司", judge: "带户型图和现场照片判断保留、微改、重做和预算方向。", material: "改造前后对比 / 保留与重做判断卡" },
        { name: "同楼盘型", concerns: ["案例"], worry: "有没有类似案例", action: "到公司", judge: "看同楼盘/同面积/同风格案例，而不是乱刷图。", material: "同楼盘案例库 / 瑞府推进中背书" },
        { name: "全案落地型", concerns: ["全案", "落地"], worry: "设计、施工、定制、软装会不会脱节", action: "到公司", judge: "看设计、改造、定制、软装怎么衔接。", material: "全案流程卡 / 四环节衔接图" },
        { name: "效果落地型", concerns: ["落地", "设计"], worry: "效果图能否实现", action: "看完工现场", judge: "看效果图与真实落地之间的差距。", material: "效果图 vs 实景 / 完工现场" },
        { name: "预算型", concerns: ["预算", "报价"], worry: "喜欢的效果要花多少钱", action: "到公司", judge: "判断喜欢的效果和预算能不能匹配。", material: "预算构成说明 / 同档次案例" },
      ],
      stageScripts: {
        "首次加微信": `您好～玖玖精装全案改造这边，我们主要做高端精装房改造，设计+改造+定制+软装一站式交付。

长沙市区100+案例落地，瑞府也有30+套在设计、施工、定制推进中。

您是哪个楼盘、大概多大面积？我可以先按楼盘和户型帮您匹配相近案例。`,
        "D0接待": `你现在不用急着决定改不改。

精装房改造最怕盲目拆、盲目换、盲目加预算。我先发一组同楼盘/相近户型案例，你重点看改造前后和全案落地效果。`,
        "D1补证据": `这组案例你重点看三个地方：原始精装保留了什么、哪些地方做了微改、定制和软装怎么衔接。

精装改造不是局部修修补补，关键是整体效果和落地链路。`,
        "D2-D3轻邀约": `你现在不用急着定，也不用急着交钱。

你这个情况，最该先判断的是哪里值得改、哪里不建议浪费钱、预算区间怎么控制、后期设计和定制能不能一体落地。

线上看案例只能看一部分，我建议带户型图和现场照片到公司做一次改造判断。

你看这周工作日，还是周末过来更方便？`,
        "D5-D7二次证据": `我再发你一组完工现场和效果图对比。

如果你担心效果图好看但实际落不了地，这组会更直观。后面有时间也可以看完工现场，质感比线上图片更容易判断。`,
        "D10-D15长期培育": `我先不连续打扰你。

你后面如果还在看精装房改造，直接发我楼盘、面积和现场照片。我先帮你判断哪些地方值得改，哪些不建议花冤枉钱。`,
      },
    },
    "宅师傅半包装修": {
      short: "普通家庭透明半包｜438起｜免费量房出图预算",
      mind: "客户来宅师傅，不是听装修报价，而是先把自己家怎么装、半包多少钱、哪里容易增项、付款是否安全算清楚。",
      defaultAction: "免费量房",
      materials: ["免费量房出图预算流程", "预算拆解", "工地实拍", "付款验收规则", "材料清单", "完工实拍"],
      redlines: [
        "免费量房只用于宅师傅，不给其他品牌用。",
        "438元/㎡起不能说成所有客户最终价。",
        "不要包装成高端大宅品牌。",
        "先施工后付款、非图纸变更增项负责等承诺以公司最终规则为准。",
      ],
      types: [
        { name: "预算型", concerns: ["预算", "报价"], worry: "半包到底多少钱", action: "免费量房", judge: "先算清你家半包大概要多少钱，别只听每平米价格。", material: "预算拆解图 / 免费量房出图流程" },
        { name: "增项型", concerns: ["增项"], worry: "怕后期加钱", action: "免费量房", judge: "先把图纸和预算做清楚，提前看哪些地方容易增项。", material: "图纸预算流程 / 容易增项清单" },
        { name: "付款型", concerns: ["付款"], worry: "怕先交钱后被动", action: "到公司", judge: "当面把验收节点、付款方式和保障规则讲清楚。", material: "付款节点说明 / 验收流程图" },
        { name: "工艺型", concerns: ["工艺", "落地"], worry: "便宜会不会质量差", action: "看工地", judge: "现场看施工和完工，比微信上讲工艺更直观。", material: "真实工地实拍 / 工艺节点图" },
        { name: "小白型", concerns: ["小白", "设计"], worry: "不知道从哪里开始", action: "免费量房", judge: "第一次装修先把户型、方案和预算理清楚。", material: "免费量房流程 / 装修步骤说明" },
      ],
      stageScripts: {
        "首次加微信": `您好～宅师傅这边，我们做长沙普通家庭透明半包，438元/㎡起。

可以先免费量房，出平面图、施工图和精准预算，不签约也能带走参考。

你现在是想先看半包大概要多少钱，还是想先了解免费量房出图预算的流程？`,
        "D0接待": `你现在不用急着定装修公司。

普通家庭装修最怕预算不清楚，前期听着便宜，后面越装越超。我先发你一组预算逻辑，你重点看哪些是基础半包，哪些会因为户型和需求变化。`,
        "D1补证据": `这组资料是免费量房出图预算流程。

我们强调先出图纸再做预算，就是为了把项目尽量前置到图纸里，减少后期临时加钱和扯皮。`,
        "D2-D3轻邀约": `你现在不用急着定，也不用急着交钱。

你这个情况，最该先判断的是你家怎么装、半包大概要多少钱、哪些地方容易增项。

我建议先做一次免费量房，把平面图、施工图和预算做出来。这一趟不是让你马上签，而是先把自己家装修算清楚。

你看这周工作日晚上，还是周末量房方便？`,
        "D5-D7二次证据": `我再发你一组工地和完工参考。

如果你担心438起会不会质量差，最好不要只听我微信上讲，后面可以看一次真实工地，水电、防水、基层这些现场更直观。`,
        "D10-D15长期培育": `我先不连续打扰你。

你后面如果还在看装修，直接把小区、面积和预算大概范围发我。我先帮你判断是该免费量房，还是先线上看预算逻辑。`,
      },
    },
  };

  const refusalScripts = {
    "没时间": `没关系，不急。

我不建议你为了看公司专门跑一趟，但如果你要判断【核心问题】，线下看一次会更省时间。

我先按你家情况发一组资料，你看完如果还觉得拿不准，我们再约一个最方便的时间。`,
    "先看看": `可以，你先看。

我建议你看资料时别只看好不好看，重点看三件事：
1. 和你家面积 / 户型像不像；
2. 预算和你预期是否接近；
3. 最后有没有真实落地证据。

你看完如果还是拿不准，我再帮你判断该看工地、到公司，还是看完工现场。`,
    "太远了": `理解，专门跑一趟肯定要有价值。

所以我不建议你只是来听介绍。如果要来，这一趟必须帮你判断清楚【具体问题】。

你把小区、面积和最担心的问题发我，我先判断值不值得来，值得再约，不值得我就先线上发你资料。`,
    "沉默": `我先不打扰你。

你后面如果还在看装修，别急着只比价格或只看效果图。

先判断清楚：方案是否适合、预算是否清楚、工艺是否靠谱、最后能不能落地。

你把小区、面积和最担心的问题发我，我再帮你判断下一步该看什么。`,
  };

  function materialItems(brandName = state.brand) {
    const brand = brands[brandName] || currentBrand();
    return brand.types.map((type) => ({
      brand: brandName,
      name: type.material,
      typeName: type.name,
      concern: type.concerns.join(" / "),
      action: type.action,
      solves: type.worry,
      stage: state.stage === "首次加微信" ? "D0接待" : state.stage,
      text: materialScript(type),
    }));
  }

  function currentBrand() {
    return brands[state.brand] || brands["8K设计"];
  }

  function matchedType() {
    const brand = currentBrand();
    return brand.types.find((item) => item.concerns.includes(state.concern)) || brand.types[0];
  }

  function stageGoal() {
    const map = {
      "首次加微信": "先定品牌心智，不急着邀约。",
      "D0接待": "接住客户，收集最小字段，发第一组相关物料。",
      "D1补证据": "根据客户顾虑补证据，不硬邀约。",
      "D2-D3轻邀约": "客户看过一轮证据后，推动一个有效接触动作。",
      "D5-D7二次证据": "换更强证据，不重复催。",
      "D10-D15长期培育": "保留信任，留低压力入口。",
      "拒绝处理": "处理没时间、先看看、太远、沉默，不逼单。",
    };
    return map[state.stage] || "";
  }

  function stageScript() {
    if (state.stage === "拒绝处理") {
      return Object.entries(refusalScripts).map(([title, text]) => ({ title, text, kind: "拒绝处理" }));
    }
    return [{ title: `${state.brand}｜${state.stage}`, text: currentBrand().stageScripts[state.stage] || currentBrand().stageScripts["D0接待"], kind: "阶段话术" }];
  }

  function invitationScript(type) {
    return `你现在不用急着定，也不用急着交钱。

你这个情况，最该先判断的是：${type.worry}。

这个在线上看资料很难判断清楚。我建议你先【${type.action}】，这一趟主要帮你判断：${type.judge}

你看这周工作日，还是周末方便？`;
  }

  function materialScript(type) {
    return `我先发你一组【${type.material}】，不是让你马上定。

你重点看的是：它能不能帮你判断「${type.worry}」。

看完以后，如果你还是拿不准，我们再决定下一步是${type.action}，还是先继续补资料。`;
  }

  function levelAdvice() {
    const action = matchedType().action;
    const map = {
      "A高意向": `当天推进判断型邀约，主动作只推【${action}】。`,
      "B中意向": `先发一组对应物料，再在D2-D3轻推【${action}】。`,
      "C培育": "先发选择标准、案例拆解或避坑清单，不急着邀约。",
      "D暂缓": "停止高频追发，只留低压力入口。",
    };
    return map[state.level] || "";
  }

  function copyText(text, button) {
    const done = () => {
      if (!button) return;
      const old = button.textContent;
      button.textContent = "已复制";
      setTimeout(() => { button.textContent = old; }, 900);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.focus();
    area.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(area);
    done && done();
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));
  }

  function card(title, body, extra = "") {
    return `<article class="b2b-card">
      <h3>${escapeHtml(title)}</h3>
      <div class="b2b-card-body">${escapeHtml(body)}</div>
      ${extra}
    </article>`;
  }

  function renderSelectors() {
    const brandEl = $("#b2bBrand");
    const stageEl = $("#b2bStage");
    const levelEl = $("#b2bLevel");
    const concernEl = $("#b2bConcern");
    const kindEl = $("#b2bKindFilter");
    const actionEl = $("#b2bActionFilter");
    const libraryStageEl = $("#b2bStageFilter");
    if (!brandEl || brandEl.dataset.ready) return;
    brandEl.innerHTML = Object.keys(brands).map((x) => `<option>${x}</option>`).join("");
    stageEl.innerHTML = stages.map((x) => `<option>${x}</option>`).join("");
    levelEl.innerHTML = Object.keys(levels).map((x) => `<option>${x}</option>`).join("");
    concernEl.innerHTML = concerns.map((x) => `<option>${x}</option>`).join("");
    if (kindEl) kindEl.innerHTML = libraryKinds.map((x) => `<option>${x}</option>`).join("");
    if (actionEl) actionEl.innerHTML = ["全部", ...new Set(Object.values(brands).flatMap((brand) => brand.types.map((type) => type.action)).concat(["低压力入口", "检查", "先发物料"]))].map((x) => `<option>${x}</option>`).join("");
    if (libraryStageEl) libraryStageEl.innerHTML = ["全部", ...stages, "禁区", "物料动作"].map((x) => `<option>${x}</option>`).join("");
    brandEl.dataset.ready = "1";
    [brandEl, stageEl, levelEl, concernEl].forEach((el, index) => {
      el.addEventListener("change", () => {
        const keys = ["brand", "stage", "level", "concern"];
        state[keys[index]] = el.value;
        renderB2B();
      });
    });
    $("#b2bSearch")?.addEventListener("input", (event) => {
      state.keyword = event.target.value.trim();
      renderLibrary();
    });
    kindEl?.addEventListener("change", (event) => {
      state.kind = event.target.value;
      renderLibrary();
    });
    actionEl?.addEventListener("change", (event) => {
      state.action = event.target.value;
      renderLibrary();
    });
    libraryStageEl?.addEventListener("change", (event) => {
      state.libraryStage = event.target.value;
      renderLibrary();
    });
  }

  function renderSummary() {
    const brand = currentBrand();
    const type = matchedType();
    $("#b2bBrandMind").textContent = brand.mind;
    $("#b2bActionBadge").textContent = type.action;
    $("#b2bTypeBadge").textContent = type.name;
    $("#b2bStageBadge").textContent = stageGoal();
    $("#b2bActionCards").innerHTML = [
      card("当前判断", `品牌：${state.brand}\n阶段：${state.stage}\n客户级别：${state.level}\n客户类型：${type.name}\n核心顾虑：${type.worry}`),
      card("现在该做什么", `${levelAdvice()}\n\n推荐主动作：${type.action}\n这一动作帮客户判断：${type.judge}\n\n不要同时塞多个邀约。`),
      card("先发什么物料", `${type.material}\n\n${materialScript(type)}`),
      card("禁区提醒", brand.redlines.map((x, i) => `${i + 1}. ${x}`).join("\n")),
    ].join("");
  }

  function renderScripts() {
    const type = matchedType();
    const scripts = [
      ...stageScript(),
      { title: "判断型邀约", text: invitationScript(type), kind: "邀约" },
      { title: "物料解释话术", text: materialScript(type), kind: "物料" },
    ];
    $("#b2bScriptCards").innerHTML = scripts.map((item, index) => `
      <article class="b2b-script">
        <div class="meta"><span class="tag">${escapeHtml(item.kind)}</span><span class="tag source">${escapeHtml(state.brand)}</span><span class="tag">${escapeHtml(state.stage)}</span></div>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="quote">${escapeHtml(item.text)}</div>
        <button class="copy b2b-copy" data-b2b-copy="${index}">复制这条</button>
      </article>
    `).join("");
    $$("[data-b2b-copy]").forEach((button) => {
      button.addEventListener("click", () => copyText(scripts[Number(button.dataset.b2bCopy)].text, button));
    });
  }

  function renderMaterials() {
    const type = matchedType();
    const all = materialItems();
    const ordered = [all.find((item) => item.typeName === type.name), ...all.filter((item) => item.typeName !== type.name)].filter(Boolean);
    $("#b2bMaterialList").innerHTML = ordered.map((item, index) => `
      <article class="b2b-material">
        <div class="meta"><span class="tag source">${escapeHtml(item.action)}</span><span class="tag">${escapeHtml(item.typeName)}</span><span class="tag">${escapeHtml(item.concern)}</span></div>
        <h3>${escapeHtml(item.name)}</h3>
        <div class="b2b-card-body">${escapeHtml(`解决顾虑：${item.solves}
适合阶段：${item.stage}
推动动作：${item.action}

配套话术：
${item.text}`)}</div>
        <button class="copy b2b-material-copy" data-b2b-material-copy="${index}">复制物料话术</button>
      </article>
    `).join("");
    $$("[data-b2b-material-copy]").forEach((button) => {
      button.addEventListener("click", () => copyText(ordered[Number(button.dataset.b2bMaterialCopy)].text, button));
    });
  }

  function libraryItems() {
    const out = [];
    Object.entries(brands).forEach(([brandName, brand]) => {
      Object.entries(brand.stageScripts).forEach(([stage, text]) => {
        out.push({ brand: brandName, kind: "阶段话术", stage, concern: "阶段", action: brand.defaultAction, title: `${brandName}｜${stage}`, text });
      });
      brand.types.forEach((type) => {
        out.push({ brand: brandName, kind: "判断型邀约", stage: "D2-D3轻邀约", concern: type.concerns.join(" / "), action: type.action, title: `${brandName}｜${type.name}｜判断型邀约`, text: invitationScript(type) });
        out.push({ brand: brandName, kind: "物料解释", stage: "D1补证据", concern: type.concerns.join(" / "), action: type.action, title: `${brandName}｜${type.name}｜物料解释`, text: materialScript(type) });
      });
      brand.redlines.forEach((text, i) => out.push({ brand: brandName, kind: "禁区", stage: "禁区", concern: "红线", action: "检查", title: `${brandName}｜禁区 ${i + 1}`, text }));
      materialItems(brandName).forEach((item) => out.push({ brand: brandName, kind: "物料动作", stage: "物料动作", concern: item.concern, action: item.action, title: `${brandName}｜${item.name}`, text: `解决顾虑：${item.solves}\n适合阶段：${item.stage}\n推动动作：${item.action}\n\n${item.text}` }));
    });
    Object.entries(refusalScripts).forEach(([title, text]) => {
      Object.keys(brands).forEach((brandName) => out.push({ brand: brandName, kind: "拒绝处理", stage: "拒绝处理", concern: title, action: "低压力入口", title: `${brandName}｜${title}`, text }));
    });
    return out;
  }

  function renderLibrary() {
    const kw = state.keyword.toLowerCase();
    const items = libraryItems().filter((item) => {
      const selected = item.brand === state.brand || state.brand === "全部";
      const text = `${item.brand} ${item.kind} ${item.stage} ${item.concern} ${item.action} ${item.title} ${item.text}`.toLowerCase();
      return selected
        && (state.kind === "全部" || item.kind === state.kind)
        && (state.action === "全部" || item.action === state.action)
        && (state.libraryStage === "全部" || item.stage === state.libraryStage)
        && (!kw || text.includes(kw));
    });
    $("#b2bLibraryCount").textContent = `${items.length}条`;
    $("#b2bLibrary").innerHTML = items.slice(0, 80).map((item, index) => `
      <article class="script">
        <div class="meta"><span class="tag">${escapeHtml(item.brand)}</span><span class="tag">${escapeHtml(item.kind)}</span><span class="tag">${escapeHtml(item.stage)}</span><span class="tag">${escapeHtml(item.concern)}</span><span class="tag source">${escapeHtml(item.action)}</span></div>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="quote">${escapeHtml(item.text)}</div>
        <button class="copy b2b-lib-copy" data-b2b-lib-copy="${index}">复制这条</button>
      </article>
    `).join("") || `<div class="empty">没有匹配的话术，换个关键词试试。</div>`;
    $$("[data-b2b-lib-copy]").forEach((button) => {
      button.addEventListener("click", () => copyText(items[Number(button.dataset.b2bLibCopy)].text, button));
    });
  }

  function renderContextForAI() {
    const brand = currentBrand();
    const type = matchedType();
    const scripts = stageScript().map((x) => `${x.title}\n${x.text}`).join("\n\n---\n\n");
    const context = `【B端四品牌有效接触模式】
当前品牌：${state.brand}
品牌心智：${brand.mind}
当前阶段：${state.stage}
阶段目标：${stageGoal()}
客户级别：${state.level}
级别处理：${levels[state.level]}
核心顾虑：${state.concern}
客户类型：${type.name}
客户真实担心：${type.worry}
推荐主动作：${type.action}
动作判断价值：${type.judge}
先发物料：${type.material}

【当前阶段标准话术】
${scripts}

【判断型邀约模板】
${invitationScript(type)}

【物料解释话术】
${materialScript(type)}

【品牌禁区】
${brand.redlines.map((x, i) => `${i + 1}. ${x}`).join("\n")}`;
    const el = $("#b2bAiContext");
    if (el) el.value = context;
  }

  function fillReplyDesk() {
    const type = matchedType();
    const brand = currentBrand();
    $("#brandKb") && ($("#brandKb").value = `【B端四品牌有效接触】\n${$("#b2bAiContext")?.value || ""}`);
    $("#scriptKb") && ($("#scriptKb").value = `${stageScript().map((x) => x.text).join("\n\n---\n\n")}\n\n---\n\n${invitationScript(type)}\n\n---\n\n${materialScript(type)}`);
    $("#customerQuestion") && ($("#customerQuestion").value = `客户当前顾虑：${type.worry}\n请按${state.brand}口径，生成一条微信回复。目标不是硬成交，而是先发物料，再推动客户${type.action}做一次关键判断。`);
    $("#styleKb") && ($("#styleKb").value = "短句、克制、不油腻；先降低压力，再说明判断价值；不要跨品牌卖点；不要越权承诺。");
    if (window.switchWork) window.switchWork("reply");
  }

  function renderB2B() {
    renderSelectors();
    $("#b2bBrand").value = state.brand;
    $("#b2bStage").value = state.stage;
    $("#b2bLevel").value = state.level;
    $("#b2bConcern").value = state.concern;
    if ($("#b2bKindFilter")) $("#b2bKindFilter").value = state.kind;
    if ($("#b2bActionFilter")) $("#b2bActionFilter").value = state.action;
    if ($("#b2bStageFilter")) $("#b2bStageFilter").value = state.libraryStage;
    renderSummary();
    renderScripts();
    renderMaterials();
    renderLibrary();
    renderContextForAI();
  }

  function init() {
    if (!$("#b2bBrand")) return;
    renderB2B();
    $("#b2bFillAi")?.addEventListener("click", fillReplyDesk);
    $("#b2bCopyContext")?.addEventListener("click", (event) => copyText($("#b2bAiContext")?.value || "", event.currentTarget));
    if (location.hash === "#b2b" && window.switchWork) window.switchWork("b2b");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
