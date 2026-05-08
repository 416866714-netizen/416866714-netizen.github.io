const modal=document.getElementById('qrModal');
document.querySelectorAll('.js-open-qr').forEach(b=>b.onclick=()=>{modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'});
document.querySelectorAll('.js-close-qr').forEach(b=>b.onclick=()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('.js-close-qr')?.click()});
const items=document.querySelectorAll('.section,.dark-section,.pricing article,.cases article');items.forEach(i=>i.classList.add('reveal'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});items.forEach(i=>io.observe(i));
