import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/assets/brand/lt-ea-concepts');
fs.mkdirSync(outDir, { recursive: true });

const ink = '#191816';
const red = '#b42318';
const hot = '#d92d20';
const paper = '#fffaf4';
const warm = '#f3f1ec';
const muted = '#6f6a61';

const shell = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="red" x1="40" y1="26" x2="216" y2="224" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ef4444"/>
      <stop offset=".54" stop-color="#b42318"/>
      <stop offset="1" stop-color="#7f1d1d"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#281812" flood-opacity=".18"/>
    </filter>
  </defs>
  ${body}
</svg>
`;

function cuts(bg = red) {
  return `<path d="M45 80h45l-14 13H31zM166 72h54l-14 13h-54zM52 174h70l-14 13H38z" fill="${bg}" opacity=".95"/>`;
}

const concepts = [
  ['01-speed-block', '速度块面', '最像 EA 的斜切速度感，但保留 LT 可读性。', shell('LT EA 01 速度块面', `
  <rect x="22" y="22" width="212" height="212" rx="46" fill="${ink}" filter="url(#shadow)"/>
  <path d="M66 72h34v84h57l-23 28H66z" fill="${paper}"/>
  <path d="M114 72h96l-23 28h-32v84h-34v-84H91z" fill="${paper}"/>
  <path d="M50 194h126l-16 18H34z" fill="${hot}"/>`)],
  ['02-red-strike', '红色斜击', '一条红色斜线像判断刀口，冲击力强。', shell('LT EA 02 红色斜击', `
  <rect width="256" height="256" rx="50" fill="${warm}"/>
  <path d="M58 62h34v106h64l-18 24H58z" fill="${ink}"/>
  <path d="M106 62h96l-18 24h-34v106h-34V86H88z" fill="${ink}"/>
  <path d="M62 178L190 58h32L94 178z" fill="${red}"/>`)],
  ['03-outline-speed', '线框速度', '更轻、更现代，适合网页页头。', shell('LT EA 03 线框速度', `
  <rect x="24" y="24" width="208" height="208" rx="44" fill="${paper}"/>
  <path d="M69 64h30v98h60l-18 24H69z" fill="none" stroke="${ink}" stroke-width="12" stroke-linejoin="miter"/>
  <path d="M110 64h94l-18 24h-34v98h-30V88H92z" fill="none" stroke="${ink}" stroke-width="12" stroke-linejoin="miter"/>
  ${cuts(red)}`)],
  ['04-cut-corner', '切角方标', '方形头像友好，切角带速度。', shell('LT EA 04 切角方标', `
  <path d="M44 22h168l22 22v168l-22 22H44l-22-22V44z" fill="url(#red)" filter="url(#shadow)"/>
  <path d="M64 66h34v92h56l-20 28H64z" fill="${paper}"/>
  <path d="M110 66h92l-20 28h-30v92h-34V94H90z" fill="${paper}"/>
  <path d="M48 198h140l-14 18H34z" fill="${ink}" opacity=".35"/>`)],
  ['05-negative-t', '负形 T', 'T 用负形切出来，整体更像高级 monogram。', shell('LT EA 05 负形 T', `
  <rect width="256" height="256" rx="48" fill="${ink}"/>
  <path d="M58 62h146l-20 28h-30v104H58z" fill="${paper}"/>
  <path d="M90 90h32v76h52l-16 22H90z" fill="${ink}"/>
  <path d="M34 206h156l-16 18H18z" fill="${red}"/>`)],
  ['06-triangle-drive', '三角驱动', '增加三角负形，更运动化。', shell('LT EA 06 三角驱动', `
  <rect x="22" y="22" width="212" height="212" rx="48" fill="${paper}"/>
  <path d="M64 68h34v96h58l-20 26H64z" fill="${ink}"/>
  <path d="M110 68h92l-20 26h-30v96h-34V94H90z" fill="${ink}"/>
  <path d="M170 116l42 24-42 24z" fill="${red}"/>
  <path d="M42 198h134l-15 18H27z" fill="${ink}" opacity=".18"/>`)],
  ['07-compact-ea', '紧凑电竞', '最紧凑，适合图标，但科技感较重。', shell('LT EA 07 紧凑电竞', `
  <rect width="256" height="256" rx="40" fill="${ink}"/>
  <path d="M54 78h40v74h56l-22 26H54z" fill="${paper}"/>
  <path d="M98 78h104l-22 26h-32v74h-40v-74H76z" fill="${paper}"/>
  <path d="M48 59h78l-16 18H32zM48 181h132l-16 18H32z" fill="${red}"/>`)],
  ['08-advisor-angle', '顾问斜角', '冲击力收一点，更适合专业顾问。', shell('LT EA 08 顾问斜角', `
  <rect x="24" y="24" width="208" height="208" rx="48" fill="${warm}"/>
  <path d="M66 66h32v100h62l-18 24H66z" fill="${ink}"/>
  <path d="M112 66h94l-18 24h-34v100h-32V90H94z" fill="${ink}"/>
  <path d="M69 195h108" stroke="${red}" stroke-width="12" stroke-linecap="square"/>
  <path d="M185 58h24l-19 22h-24z" fill="${red}"/>`)],
  ['09-lt-arrow', '箭头推进', '把 LT 做成前进箭头，表达推进判断。', shell('LT EA 09 箭头推进', `
  <rect width="256" height="256" rx="50" fill="${paper}"/>
  <path d="M54 70h34v94h58l-18 24H54z" fill="${ink}"/>
  <path d="M98 70h86l34 58-34 58h-34l34-58-34-58H80z" fill="${ink}"/>
  <path d="M124 96h50l18 32-18 32h-50l17-32z" fill="${paper}"/>
  <path d="M38 202h130l-15 18H23z" fill="${red}"/>`)],
  ['10-red-frame', '红色框架', '速度外框更明显，像内容角标。', shell('LT EA 10 红色框架', `
  <rect x="24" y="24" width="208" height="208" rx="42" fill="${ink}"/>
  <path d="M48 58h58M48 58v58M208 58h-58M208 58v58M48 198h58M208 198h-58" fill="none" stroke="${red}" stroke-width="12" stroke-linecap="square"/>
  <path d="M70 72h32v92h56l-18 24H70z" fill="${paper}"/>
  <path d="M112 72h92l-18 24h-32v92h-32V96H94z" fill="${paper}"/>`)],
  ['11-split-lt', '分体 LT', '两个字母分开但同一速度方向。', shell('LT EA 11 分体 LT', `
  <rect width="256" height="256" rx="48" fill="${warm}"/>
  <path d="M55 61h34v101h61l-20 28H55z" fill="${ink}"/>
  <path d="M134 61h80l-20 28h-23v101h-34V89h-23z" fill="${red}"/>
  <path d="M44 201h137l-14 18H30z" fill="${ink}" opacity=".22"/>`)],
  ['12-white-race', '白底竞速', '更轻，适合需要干净背景的场景。', shell('LT EA 12 白底竞速', `
  <rect width="256" height="256" rx="54" fill="#fff"/>
  <path d="M61 65h33v102h64l-18 24H61z" fill="${ink}"/>
  <path d="M106 65h100l-18 24h-37v102h-33V89H88z" fill="${ink}"/>
  <path d="M44 77h48l-12 13H32zM44 112h40l-12 13H32zM44 147h50l-12 13H32z" fill="${red}"/>`)],
  ['13-monolith', '黑色碑标', '最稳重的 EA 风，速度感藏在切口里。', shell('LT EA 13 黑色碑标', `
  <rect x="30" y="20" width="196" height="216" rx="38" fill="${ink}" filter="url(#shadow)"/>
  <path d="M66 62h36v104h58l-20 28H66z" fill="${paper}"/>
  <path d="M112 62h92l-20 28h-30v104h-36V90H92z" fill="${paper}"/>
  <path d="M164 52h44l-14 16h-44zM48 204h132l-14 16H34z" fill="${red}"/>`)],
  ['14-slash-door', '斜切门洞', '像进入判断入口，和你的业务更贴。', shell('LT EA 14 斜切门洞', `
  <rect width="256" height="256" rx="50" fill="${paper}"/>
  <path d="M66 190V66h126l-20 26h-72v74h60l-18 24z" fill="${ink}"/>
  <path d="M122 91h80l-18 24h-20v75h-34v-75h-26z" fill="${red}"/>
  <path d="M74 204h100" stroke="${ink}" stroke-width="10" stroke-linecap="square" opacity=".2"/>`)],
  ['15-steel-rule', '钢尺速度', '加入标尺，回到装修判断。', shell('LT EA 15 钢尺速度', `
  <rect x="22" y="22" width="212" height="212" rx="44" fill="${warm}"/>
  <path d="M50 66h152v124H50z" fill="${ink}"/>
  <path d="M70 82h28v72h52l-16 22H70z" fill="${paper}"/>
  <path d="M110 82h78l-16 22h-24v72h-28v-72H94z" fill="${paper}"/>
  <path d="M58 68v18M82 68v12M106 68v18M130 68v12M154 68v18M178 68v12" stroke="${red}" stroke-width="5"/>`)],
  ['16-red-l', '红色 L 主导', '强调 Laotan 的 L，T 做结构支撑。', shell('LT EA 16 红色 L 主导', `
  <rect width="256" height="256" rx="48" fill="${ink}"/>
  <path d="M58 62h38v102h64l-22 28H58z" fill="${red}"/>
  <path d="M112 62h96l-22 28h-32v102h-38V90H90z" fill="${paper}"/>
  <path d="M42 204h144l-16 18H26z" fill="${paper}" opacity=".18"/>`)],
  ['17-red-t', '红色 T 主导', '强调 Tan 的 T，更像签名缩写。', shell('LT EA 17 红色 T 主导', `
  <rect width="256" height="256" rx="48" fill="${ink}"/>
  <path d="M58 62h34v102h64l-20 28H58z" fill="${paper}"/>
  <path d="M108 62h98l-20 28h-34v102h-34V90H88z" fill="${red}"/>
  <path d="M46 202h134l-15 18H31z" fill="${red}" opacity=".55"/>`)],
  ['18-minimal-cut', '极简切口', '最少元素，适合后续精修为正式标。', shell('LT EA 18 极简切口', `
  <rect width="256" height="256" rx="52" fill="${paper}"/>
  <path d="M62 62h32v104h58l-18 24H62z" fill="${ink}"/>
  <path d="M108 62h94l-18 24h-34v104h-32V86H90z" fill="${ink}"/>
  <path d="M168 60h34l-12 14h-34zM52 198h132l-12 14H40z" fill="${red}"/>`)],
  ['19-stacked-motion', '层叠运动', '多层影子，适合封面或视频片头。', shell('LT EA 19 层叠运动', `
  <rect x="22" y="22" width="212" height="212" rx="44" fill="${ink}"/>
  <path d="M74 78h34v90h58l-18 24H74z" fill="${red}" opacity=".45" transform="translate(10 8)"/>
  <path d="M120 78h92l-18 24h-32v90h-34v-90h-26z" fill="${red}" opacity=".45" transform="translate(10 8)"/>
  <path d="M64 68h34v90h58l-18 24H64z" fill="${paper}"/>
  <path d="M110 68h92l-18 24h-32v90h-34V92H92z" fill="${paper}"/>`)],
  ['20-laotan-race', '老谭竞速版', '最完整的候选封面：LT + LAOTAN。', shell('LT EA 20 老谭竞速版', `
  <rect width="256" height="256" rx="44" fill="${warm}"/>
  <path d="M58 54h36v98h62l-20 26H58z" fill="${ink}"/>
  <path d="M108 54h98l-20 26h-34v98h-36V80H88z" fill="${ink}"/>
  <path d="M44 188h142l-15 18H29z" fill="${red}"/>
  <text x="128" y="224" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="900" fill="${muted}" letter-spacing="3">LAOTAN</text>`)],
];

for (const [id, name, note, svg] of concepts) {
  fs.writeFileSync(path.join(outDir, `${id}.svg`), svg);
}

const cards = concepts.map(([id, name, note], index) => `
      <article class="card">
        <div class="media"><img src="${id}.svg" alt="${name}" /></div>
        <div class="meta">
          <b>${String(index + 1).padStart(2, '0')} · ${name}</b>
          <span>${note}</span>
          <a href="${id}.svg">打开 SVG</a>
        </div>
      </article>`).join('');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>老谭 LT · EA 风格 20 个方向</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;background:#f3f1ec;color:#191816;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",Arial,sans-serif}
    main{width:min(1240px,92vw);margin:0 auto;padding:44px 0 72px}
    header{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:end;margin-bottom:24px}
    h1{margin:0;font-size:43px;line-height:1.08;letter-spacing:0}
    p{margin:12px 0 0;color:#6f6a61;line-height:1.7;font-weight:700;max-width:780px}
    .badge{border:1px solid rgba(25,24,22,.12);border-radius:999px;background:#fff;padding:9px 13px;font-size:13px;font-weight:900;color:#514c45}
    .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
    .card{border:1px solid rgba(25,24,22,.12);border-radius:8px;background:#fff;box-shadow:0 14px 44px rgba(38,31,22,.07);overflow:hidden}
    .media{aspect-ratio:1/1;display:grid;place-items:center;padding:18px;background:#fbfaf7}
    img{width:100%;height:100%;object-fit:contain;display:block}
    .meta{padding:14px;display:grid;gap:8px}
    b{font-size:15px;line-height:1.35}
    span{color:#6f6a61;font-size:13px;line-height:1.55;font-weight:650}
    a{color:#b42318;font-size:13px;font-weight:900;text-decoration:none}
    @media(max-width:1080px){.grid{grid-template-columns:repeat(4,1fr)}}
    @media(max-width:860px){.grid{grid-template-columns:repeat(3,1fr)}header{grid-template-columns:1fr}}
    @media(max-width:620px){main{width:min(100% - 24px,1240px);padding-top:30px}.grid{grid-template-columns:repeat(2,1fr);gap:10px}.media{padding:12px}.meta{padding:12px}h1{font-size:32px}p{font-size:14px}}
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>LT · EA 风格 20 个方向</h1>
        <p>参考 EA 的斜切、速度、几何断笔和负形处理，但不复刻 EA。目标是找到适合老谭的 LT 字母主标：更有冲击力，同时保留顾问品牌的可信感。</p>
      </div>
      <div class="badge">EA-INSPIRED · LT</div>
    </header>
    <section class="grid">
${cards}
    </section>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(`Generated ${concepts.length} EA-inspired LT logos in ${outDir}`);
