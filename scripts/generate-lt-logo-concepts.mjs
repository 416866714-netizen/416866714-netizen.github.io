import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/assets/brand/lt-concepts');
fs.mkdirSync(outDir, { recursive: true });

const ink = '#191816';
const red = '#b42318';
const warm = '#f3f1ec';
const paper = '#fffaf4';
const muted = '#7a746b';

const svgShell = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="ltRed" x1="44" y1="26" x2="214" y2="224" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d92d20"/>
      <stop offset=".58" stop-color="#b42318"/>
      <stop offset="1" stop-color="#7f1d1d"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#281812" flood-opacity=".18"/>
    </filter>
  </defs>
  ${body}
</svg>
`;

const concepts = [
  {
    id: '01-ruler-gate',
    title: 'LT 01 Ruler Gate',
    name: '标尺入口',
    note: '最贴近“签约前判断”，稳重、像一个判断入口。',
    svg: svgShell('LT 01 标尺入口', `
  <rect x="24" y="24" width="208" height="208" rx="48" fill="${ink}" filter="url(#softShadow)"/>
  <rect x="38" y="38" width="180" height="180" rx="36" fill="url(#ltRed)"/>
  <path d="M74 64v128h72" fill="none" stroke="${paper}" stroke-width="20" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M116 64h78M155 64v128" fill="none" stroke="${paper}" stroke-width="20" stroke-linecap="square"/>
  <path d="M61 88h58M61 128h58M61 168h58" stroke="${paper}" stroke-width="8" stroke-linecap="round" opacity=".32"/>
  <path d="M190 70h18v18M208 168v18h-18" fill="none" stroke="${paper}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`)
  },
  {
    id: '02-seal',
    title: 'LT 02 Seal',
    name: '信用印章',
    note: '更像个人信用背书，适合头像和小红书角标。',
    svg: svgShell('LT 02 信用印章', `
  <rect x="24" y="24" width="208" height="208" rx="58" fill="${warm}"/>
  <circle cx="128" cy="128" r="86" fill="${ink}"/>
  <circle cx="128" cy="128" r="72" fill="url(#ltRed)"/>
  <text x="128" y="148" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="900" fill="${paper}">LT</text>
  <path d="M80 78h96M80 178h96" stroke="${paper}" stroke-width="7" stroke-linecap="round" opacity=".28"/>
  <path d="M90 98l20-20M166 178l20-20" stroke="${paper}" stroke-width="6" stroke-linecap="round" opacity=".78"/>`)
  },
  {
    id: '03-check-compass',
    title: 'LT 03 Check Compass',
    name: '判断罗盘',
    note: '强调判断、筛选、避坑，识别度强。',
    svg: svgShell('LT 03 判断罗盘', `
  <rect width="256" height="256" rx="52" fill="${ink}"/>
  <circle cx="128" cy="128" r="83" fill="none" stroke="${paper}" stroke-width="8" opacity=".18"/>
  <path d="M128 42v32M128 182v32M42 128h32M182 128h32" stroke="${paper}" stroke-width="8" stroke-linecap="round" opacity=".35"/>
  <path d="M78 72v112h62" fill="none" stroke="${paper}" stroke-width="20" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M112 76h78M151 76v108" fill="none" stroke="${paper}" stroke-width="20" stroke-linecap="square"/>
  <path d="M92 132l24 24 55-66" fill="none" stroke="${red}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`)
  },
  {
    id: '04-door',
    title: 'LT 04 Door',
    name: '装修前入口',
    note: '像一扇门：先进入判断，再决定签约。',
    svg: svgShell('LT 04 装修前入口', `
  <rect x="22" y="22" width="212" height="212" rx="44" fill="${warm}"/>
  <path d="M70 196V60h116v136" fill="${ink}"/>
  <path d="M88 76v102h48" fill="none" stroke="${paper}" stroke-width="18" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M118 76h52M144 76v102" fill="none" stroke="${paper}" stroke-width="18" stroke-linecap="square"/>
  <circle cx="172" cy="132" r="7" fill="${red}"/>
  <path d="M70 196h116" stroke="${red}" stroke-width="12" stroke-linecap="round"/>`)
  },
  {
    id: '05-grid-standard',
    title: 'LT 05 Grid Standard',
    name: '标准网格',
    note: '偏方法论和评分标准，适合“老谭 AI 工作台”。',
    svg: svgShell('LT 05 标准网格', `
  <rect x="24" y="24" width="208" height="208" rx="32" fill="${paper}"/>
  <path d="M64 64h128M64 104h128M64 144h128M64 184h128M64 64v120M104 64v120M144 64v120M184 64v120" stroke="${ink}" stroke-width="4" opacity=".16"/>
  <path d="M80 58v128h58" fill="none" stroke="${ink}" stroke-width="22" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M110 58h82M151 58v128" fill="none" stroke="${ink}" stroke-width="22" stroke-linecap="square"/>
  <path d="M68 202h120" stroke="${red}" stroke-width="12" stroke-linecap="round"/>
  <circle cx="196" cy="202" r="8" fill="${red}"/>`)
  },
  {
    id: '06-signature',
    title: 'LT 06 Signature',
    name: '个人签名',
    note: '更像个人 IP，亲近、有记忆点。',
    svg: svgShell('LT 06 个人签名', `
  <rect width="256" height="256" rx="56" fill="${paper}"/>
  <path d="M58 76c18-22 42-18 42 8v84c0 18 18 22 34 4" fill="none" stroke="${ink}" stroke-width="17" stroke-linecap="round"/>
  <path d="M105 82h82M146 82v78c0 24 24 30 44 12" fill="none" stroke="${ink}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M62 188c34 14 82 16 132-6" fill="none" stroke="${red}" stroke-width="9" stroke-linecap="round"/>
  <text x="128" y="222" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="800" fill="${muted}" letter-spacing="2">LAOTAN</text>`)
  },
  {
    id: '07-shield',
    title: 'LT 07 Shield',
    name: '风险把关',
    note: '偏避坑、审核、保护感；适合咨询产品。',
    svg: svgShell('LT 07 风险把关', `
  <rect x="22" y="22" width="212" height="212" rx="46" fill="${ink}"/>
  <path d="M128 48l72 26v50c0 48-28 82-72 104-44-22-72-56-72-104V74l72-26z" fill="url(#ltRed)"/>
  <path d="M91 78v96h48" fill="none" stroke="${paper}" stroke-width="18" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M115 78h62M146 78v96" fill="none" stroke="${paper}" stroke-width="18" stroke-linecap="square"/>
  <path d="M92 132l26 24 48-58" fill="none" stroke="${ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`)
  },
  {
    id: '08-bracket',
    title: 'LT 08 Bracket',
    name: '边界判断',
    note: '强调边界、框架和签约前检查，比较高级克制。',
    svg: svgShell('LT 08 边界判断', `
  <rect width="256" height="256" rx="44" fill="${warm}"/>
  <path d="M58 58h46M58 58v46M198 58h-46M198 58v46M58 198v-46M58 198h46M198 198h-46M198 198v-46" fill="none" stroke="${red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M82 78v100h52" fill="none" stroke="${ink}" stroke-width="19" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M113 78h72M149 78v100" fill="none" stroke="${ink}" stroke-width="19" stroke-linecap="square"/>
  <path d="M76 128h104" stroke="${ink}" stroke-width="5" stroke-linecap="round" opacity=".18"/>`)
  },
  {
    id: '09-wordmark',
    title: 'LT 09 Wordmark',
    name: '字母字标',
    note: '最简洁，适合未来如果要做英文缩写体系。',
    svg: svgShell('LT 09 字母字标', `
  <rect width="256" height="256" rx="52" fill="${paper}"/>
  <path d="M56 64v126h75" fill="none" stroke="${ink}" stroke-width="24" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M102 64h102M153 64v126" fill="none" stroke="${ink}" stroke-width="24" stroke-linecap="square"/>
  <path d="M55 202h146" stroke="${red}" stroke-width="11" stroke-linecap="round"/>
  <text x="128" y="42" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="900" fill="${muted}" letter-spacing="3">LAOTAN</text>`)
  },
  {
    id: '10-corner-stamp',
    title: 'LT 10 Corner Stamp',
    name: '角标印记',
    note: '像内容封面角标，适合小红书封面体系。',
    svg: svgShell('LT 10 角标印记', `
  <rect x="24" y="24" width="208" height="208" rx="50" fill="url(#ltRed)" filter="url(#softShadow)"/>
  <path d="M56 56h46M56 56v46M200 200h-46M200 200v-46" fill="none" stroke="${paper}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".88"/>
  <path d="M76 74v112h62" fill="none" stroke="${paper}" stroke-width="21" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M110 74h76M148 74v112" fill="none" stroke="${paper}" stroke-width="21" stroke-linecap="square"/>
  <path d="M72 188h108" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity=".36"/>`)
  }
];

for (const concept of concepts) {
  fs.writeFileSync(path.join(outDir, `${concept.id}.svg`), concept.svg);
}

const cards = concepts.map((concept, index) => `
      <article class="card">
        <div class="media"><img src="${concept.id}.svg" alt="${concept.name}" /></div>
        <div class="meta">
          <b>${String(index + 1).padStart(2, '0')} · ${concept.name}</b>
          <span>${concept.note}</span>
          <a href="${concept.id}.svg">打开 SVG</a>
        </div>
      </article>`).join('');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>老谭 LT Logo 10 个方向</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;background:#f3f1ec;color:#191816;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",Arial,sans-serif}
    main{width:min(1180px,92vw);margin:0 auto;padding:46px 0 70px}
    header{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:end;margin-bottom:24px}
    h1{margin:0;font-size:44px;line-height:1.08;letter-spacing:0}
    p{margin:12px 0 0;color:#6f6a61;line-height:1.7;font-weight:700;max-width:720px}
    .badge{border:1px solid rgba(25,24,22,.12);border-radius:999px;background:#fff;padding:9px 13px;font-size:13px;font-weight:900;color:#514c45}
    .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
    .card{border:1px solid rgba(25,24,22,.12);border-radius:8px;background:#fff;box-shadow:0 14px 44px rgba(38,31,22,.07);overflow:hidden}
    .media{aspect-ratio:1/1;display:grid;place-items:center;padding:18px;background:#fbfaf7}
    img{width:100%;height:100%;display:block;object-fit:contain}
    .meta{padding:14px;display:grid;gap:8px}
    b{font-size:15px;line-height:1.35}
    span{color:#6f6a61;font-size:13px;line-height:1.55;font-weight:650}
    a{color:#b42318;font-size:13px;font-weight:900;text-decoration:none}
    @media(max-width:980px){.grid{grid-template-columns:repeat(3,1fr)}header{grid-template-columns:1fr}}
    @media(max-width:620px){main{width:min(100% - 24px,1180px);padding-top:30px}.grid{grid-template-columns:repeat(2,1fr)}h1{font-size:34px}.media{padding:12px}.meta{padding:12px}}
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>老谭 LT Logo 10 个方向</h1>
        <p>用 LT 做字母主标。整体围绕签约前判断、报价合同避坑、长期信用沉淀，不做装修公司促销感，也不做纯科技感。</p>
      </div>
      <div class="badge">LAOTAN · LOGO CONCEPTS</div>
    </header>
    <section class="grid">
${cards}
    </section>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(`Generated ${concepts.length} LT logo concepts in ${outDir}`);
