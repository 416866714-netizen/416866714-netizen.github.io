const modal=document.getElementById('qrModal');
function openQr(){if(modal){modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}}
function closeQr(){if(modal){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}}
document.querySelectorAll('.js-open-qr').forEach(el=>el.addEventListener('click',openQr));
document.querySelectorAll('.js-close-qr').forEach(el=>el.addEventListener('click',closeQr));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeQr()});
const nav=document.querySelector('.globalnav');
const reveals=[...document.querySelectorAll('.reveal')];
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.18,rootMargin:'0px 0px -8% 0px'});
reveals.forEach((el,i)=>{el.style.transitionDelay=(i%4)*90+'ms';io.observe(el)});
const parallax=[...document.querySelectorAll('[data-parallax]')];
const steps=[...document.querySelectorAll('.fade-step')];
const story=document.querySelector('.sticky-story');
const doc1=document.querySelector('.doc-1');const doc2=document.querySelector('.doc-2');const after=document.querySelector('.after');const divider=document.querySelector('.divider');const compare=document.querySelector('.compare-scene');
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}
function tick(){const y=window.scrollY;nav.classList.toggle('scrolled',y>innerHeight*.65);parallax.forEach(el=>{const k=parseFloat(el.dataset.parallax||0);el.style.transform=`translate3d(0,${y*k}px,0)`});if(story){const r=story.getBoundingClientRect();const p=clamp((-r.top)/(r.height-innerHeight),0,1);if(doc1)doc1.style.transform=`translate3d(${p*70}px,${p*22}px,0) rotate(${-10+p*13}deg)`;if(doc2)doc2.style.transform=`translate3d(${-p*70}px,${-p*28}px,0) rotate(${9-p*12}deg)`;steps.forEach((s,i)=>s.classList.toggle('active',p>i*.24+.08))}if(compare){const r=compare.getBoundingClientRect();const p=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);const val=clamp(100-p*100,0,100);if(after)after.style.clipPath=`inset(0 0 0 ${val}%)`;if(divider)divider.style.left=val+'%'}}
let ticking=false;addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{tick();ticking=false});ticking=true}},{passive:true});tick();
