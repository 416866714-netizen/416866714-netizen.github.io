const modal = document.getElementById('qrModal');
function openQr(){ if(modal){ modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }}
function closeQr(){ if(modal){ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }}
document.querySelectorAll('.js-open-qr').forEach(el=>el.addEventListener('click', openQr));
document.querySelectorAll('.js-close-qr').forEach(el=>el.addEventListener('click', closeQr));
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeQr(); });
