/* Musikraum - gebuendelte Behaviors. Self-activating: laufen nur, wenn ihre Elemente existieren. */
(function(){
  var h=document.querySelector('.site-header');
  if(!h)return;
  var toggle=h.querySelector('.nav-toggle');
  var backdrop=h.querySelector('.mobile-menu-backdrop');
  var menu=h.querySelector('.mobile-menu');
  var footer=document.querySelector('.site-footer');
  var main=document.querySelector('main');
  var first=main&&main.firstElementChild;
  var startsWithHero=!!(first&&(first.classList.contains('hero')||first.classList.contains('subhero')));
  var raf=0;
  function clamp(v){return Math.max(0,Math.min(1,v))}
  function smooth(t){return t*t*t*(t*(t*6-15)+10)}
  function mix(a,b,p){return Math.round(a+(b-a)*p)}
  function setMenu(open){
    h.classList.toggle('mobile-menu-open',open);
    if(toggle)toggle.setAttribute('aria-expanded',open?'true':'false');
    if(menu){
      menu.hidden=!open;
      menu.setAttribute('aria-hidden',open?'false':'true');
    }
  }
  function paint(){
    raf=0;
    var p=startsWithHero?smooth(clamp(window.scrollY/180)):1;
    var footerTop=footer?footer.getBoundingClientRect().top:Infinity;
    var footerFade=smooth(clamp((footerTop-window.innerHeight+8)/150));
    var mobile=p*footerFade;
    var footerInView=footerFade<.04;
    var text=[mix(255,47,p),mix(255,43,p),mix(255,37,p)].join(',');
    h.style.setProperty('--header-bg',(.88*p).toFixed(3));
    h.style.setProperty('--header-line',(.22*p).toFixed(3));
    h.style.setProperty('--header-shadow',(.07*p).toFixed(3));
    h.style.setProperty('--header-text',text);
    h.style.setProperty('--header-muted',text);
    h.style.setProperty('--mobile-nav',mobile.toFixed(3));
    h.classList.toggle('footer-in-view',footerInView);
    h.classList.toggle('show-mobile-nav',mobile>.04);
  }
  function request(){if(!raf)raf=requestAnimationFrame(paint)}
  function requestSoon(){
    setTimeout(request,80);
    setTimeout(request,420);
    setTimeout(request,900);
    setTimeout(request,1600);
    setTimeout(request,2600);
  }
  if(toggle){
    setMenu(false);
    toggle.addEventListener('click',function(){setMenu(!h.classList.contains('mobile-menu-open'))});
    if(menu)menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
    if(backdrop)backdrop.addEventListener('click',function(){setMenu(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  }
  paint();
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('scrollend',request);
  window.addEventListener('resize',request);
  window.addEventListener('hashchange',requestSoon);
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');
    if(a)requestSoon();
  });
})();

(function(){
  if(!('IntersectionObserver'in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var items=[].slice.call(document.querySelectorAll('.section-head,.section>.container>div,.card,.step,.overtone-note,.aside,.sound-band .container,.welcome__text,.welcome__image,.cta .container,.stage-cta__content'));
  if(!items.length)return;
  document.documentElement.classList.add('reveal-ready');
  items.forEach(function(el){el.classList.add('reveal-item')});
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(el){io.observe(el)});
})();

(function(){
  var bg=document.querySelector('.stage-page-bg');
  var trigger=document.querySelector('#auftritte-verbinden');
  var footer=document.querySelector('.site-footer');
  var bottomLocked=false;
  var raf=0;
  function paint(){
    raf=0;
    var triggerRect=trigger?trigger.getBoundingClientRect():{top:window.innerHeight,bottom:window.innerHeight};
    var footerTop=footer?footer.getBoundingClientRect().top:Infinity;
    var screenCovered=triggerRect.top<=0&&triggerRect.bottom>=window.innerHeight;
    var pastCoveredArea=triggerRect.bottom<window.innerHeight;
    if(triggerRect.top>0)bottomLocked=false;
    if(screenCovered||pastCoveredArea)bottomLocked=true;
    document.body.classList.toggle('stage-bg-bottom',bottomLocked);
    document.body.classList.toggle('stage-bg-footer',footerTop<=0);
  }
  function request(){if(!raf)raf=requestAnimationFrame(paint)}
  paint();
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',request);
})();

(function(){
  var y=document.getElementById('year');
  if(y)y.textContent=new Date().getFullYear();
})();
