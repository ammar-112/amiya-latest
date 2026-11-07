(function(){'use strict';
// split headline into animated words
document.querySelectorAll('.split').forEach(function(h){var w=h.textContent.trim().split(/\s+/);h.innerHTML=w.map(function(x,i){return '<span style="animation-delay:'+(i*0.14+0.2)+'s">'+x+'</span>'}).join(' ');h.setAttribute('aria-label',w.join(' '))});
// mobile menu
var b=document.querySelector('.burger'),m=document.querySelector('.menu');
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
// reveal on scroll
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
// starfield + drifting hearts
var c=document.getElementById('sky'),g=c.getContext('2d'),P=[],W,H;
function size(){W=c.width=innerWidth;H=c.height=innerHeight}size();addEventListener('resize',size);
var n=Math.min(90,Math.floor(innerWidth/14));
for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,v:Math.random()*.25+.05,t:Math.random()*6,h:Math.random()<.08});
(function loop(){g.clearRect(0,0,W,H);P.forEach(function(p){p.t+=.03;p.y-=p.v;if(p.y<-10){p.y=H+10;p.x=Math.random()*W}
g.globalAlpha=.4+.5*Math.sin(p.t);g.fillStyle=p.h?'#f472b6':'#e9ddff';
if(p.h){g.font='16px serif';g.fillText('\u2665',p.x,p.y)}else{g.beginPath();g.arc(p.x,p.y,p.r,0,6.3);g.fill()}});
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)requestAnimationFrame(loop)})();
// flip cards on touch
document.querySelectorAll('.flip').forEach(function(f){f.addEventListener('click',function(){f.classList.toggle('on')});f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();f.classList.toggle('on')}})});
// copy shayari
document.querySelectorAll('.copy').forEach(function(btn){btn.addEventListener('click',function(){var t=btn.dataset.t+' - AMIYA';(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){btn.textContent='Copy ho gaya'}).catch(function(){btn.textContent='Copy nahi hua'});setTimeout(function(){btn.textContent='Copy karo'},1800)})});
// surprise
function burst(){var s=['\u2665','\u2605','\u2728','\u2736'],col=['#f472b6','#c084fc','#fde68a','#fff'];
for(var i=0;i<70;i++){var e=document.createElement('span');e.className='fl';e.textContent=s[i%4];e.style.cssText='left:'+Math.random()*100+'vw;color:'+col[i%4]+';font-size:'+(14+Math.random()*26)+'px;animation-duration:'+(3+Math.random()*4)+'s;animation-delay:'+Math.random()*1.2+'s;text-shadow:0 0 12px currentColor';document.body.appendChild(e);setTimeout(function(x){x.remove()},9000,e)}
for(var j=0;j<90;j++){var k=document.createElement('i');k.className='fl';k.style.cssText='left:'+Math.random()*100+'vw;width:9px;height:14px;background:'+col[j%4]+';animation-duration:'+(2.5+Math.random()*3)+'s;animation-delay:'+Math.random()*.8+'s';document.body.appendChild(k);setTimeout(function(x){x.remove()},7000,k)}}
var sb=document.getElementById('surprise');if(sb)sb.addEventListener('click',function(){document.getElementById('msg').hidden=false;sb.textContent='Phir se dekho';burst();document.getElementById('msg').scrollIntoView({behavior:'smooth',block:'center'})});
})();
