const m=document.querySelector('.menu-toggle'),
s=document.querySelector('.sidebar');
m.onclick=()=>s.classList.toggle('open');

let l='nl';document.querySelector('.lang-toggle').onclick=()=>{
l=l==='nl'?'en':'nl';document.querySelectorAll('[data-nl]').forEach(e=>e.textContent=e.dataset[l]);
};

document.querySelectorAll('.carousel img').forEach(i=>i.onclick=()=>{
const m=document.querySelector('.modal');m.classList.add('open');m.querySelector('img').src=i.src;});

document.querySelector('.modal').onclick=e=>{if(e.target.tagName!=='IMG')e.currentTarget.classList.remove('open');};

setInterval(()=>{const c=document.querySelector('.carousel.auto');if(!c)return;
c.scrollBy({left:300,behavior:'smooth'});},4000);

const o=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('show')));
document.querySelectorAll('.fade').forEach(e=>o.observe(e));