
/* =====================================================================
   Builder → Packaging hand-off
   - Confirm Selection stays disabled until the 6 required categories are chosen
     (Beverage and Add-on are optional)
   - on confirm: check animation + message, the picks "leave for the kitchen",
     then a cinematic easeInOutCubic scroll (1200–1800 ms) to #pack
   - on arrival: spotlight, fade-up order card, floating mini bento, pulsing CTA
   ===================================================================== */
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const btn=$("confirmSel"), help=$("confirmHelp"), pack=$("pack"), fx=$("confirmFx"), card=$("cfCard"),
        thumbs=$("cfThumbs"), arrive=$("arrive"), spot=$("arriveSpot"), aCard=$("arriveCard"), cta=$("arriveCta"), grid=$("miniGrid");
  if(!btn||!pack||typeof CATS==="undefined"||typeof picks==="undefined") return;
  const RM=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  const G=window.gsap;
  const N=8, OPT=["drink","addon"];
  let busy=false, armed=false, shown=false, gliding=false;

  /* ---------- 1 · validation ---------- */
  const selectedItems=()=>CATS.map(c=>picks[c.key]?{cat:c,id:picks[c.key]}:null).filter(Boolean);
  function update(){
    const req=CATS.filter(c=>!OPT.includes(c.key)), have=req.filter(c=>picks[c.key]).length, ready=have===req.length;
    btn.disabled=!ready; btn.setAttribute("aria-disabled",String(!ready));
    btn.classList.toggle("ready",ready);
    help.classList.toggle("ok",ready);
    help.textContent=ready?(selectedItems().length===N?"All 8 chosen. Ready for the kitchen.":"Ready for the kitchen. Beverage and Add-on are optional.")
                          :"Pick the 6 essentials to continue"+(have?" · "+(req.length-have)+" to go":"");
  }

  /* ---------- 3 · cinematic scroll ---------- */
  const easeInOutCubic=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  function cineScroll(targetY,dur){
    return new Promise(resolve=>{
      const html=document.documentElement, prev=html.style.scrollBehavior;
      const maxY=Math.max(0,html.scrollHeight-innerHeight);
      targetY=Math.min(maxY,Math.max(0,targetY));
      const y0=scrollY, dy=targetY-y0;
      if(RM()||Math.abs(dy)<2){ html.style.scrollBehavior="auto"; scrollTo(0,targetY); html.style.scrollBehavior=prev; resolve(true); return; }
      gliding=true;
      if(dur==null) dur=Math.min(1800,Math.max(1200,1200+Math.abs(dy)*.18));
      html.style.scrollBehavior="auto";                       /* the page default is smooth: hand control to our curve */
      let raf=0; const t0=performance.now();
      const stop=()=>{ cancelAnimationFrame(raf); done(false); };  /* the visitor takes over: never fight them */
      const opts={passive:true};
      function done(ok){ html.style.scrollBehavior=prev; gliding=false;
        removeEventListener("wheel",stop,opts); removeEventListener("touchstart",stop,opts); removeEventListener("keydown",stop);
        resolve(ok); }
      addEventListener("wheel",stop,opts); addEventListener("touchstart",stop,opts); addEventListener("keydown",stop);
      const step=now=>{ const p=Math.min(1,(now-t0)/dur);
        scrollTo(0,y0+dy*easeInOutCubic(p));
        if(p<1) raf=requestAnimationFrame(step); else done(true); };
      raf=requestAnimationFrame(step);
    });
  }
  const packTop=()=>pack.getBoundingClientRect().top+scrollY+2;

  /* ---------- 4 · the hand-off moment ---------- */
  const imgOf=s=>(typeof PH!=="undefined"&&PH[s.id])?'<img src="'+PH[s.id]+'" alt="">':'<span></span>';
  function fillThumbs(){
    const sel=selectedItems();
    thumbs.innerHTML=sel.map(imgOf).join("");
    grid.innerHTML=sel.slice(0,5).map(imgOf).join("");        /* the mini bento: main is the big cell */
  }
  function confirmSelection(){
    if(busy||!CATS.every(c=>OPT.includes(c.key)||picks[c.key])) return;
    /* the cinematic order creation takes over whenever the packing film is available */
    if(window.GGPACK) GGPACK.refresh();
    if(window.GGCine&&GGCine.play()) return;
    busy=true; armed=true; fillThumbs();
    if(window.GGPACK) GGPACK.refresh();                       /* packaging shows exactly these 8 */
    fx.setAttribute("aria-hidden","false");
    const go=()=>cineScroll(packTop()).then(()=>{ if(armed) showArrival(); });
    const end=()=>{ fx.classList.remove("on"); fx.setAttribute("aria-hidden","true"); busy=false; };

    if(!G||RM()){                                             /* reduced motion: message, then a direct move */
      fx.style.visibility="visible"; fx.style.opacity="1"; fx.classList.add("on");
      card.querySelector(".ring").style.strokeDashoffset="0"; card.querySelector(".tick").style.strokeDashoffset="0";
      setTimeout(()=>{ fx.style.opacity="0"; fx.style.visibility="hidden"; end(); go(); },900);
      return;
    }
    fx.classList.add("on");
    const ring=card.querySelector(".ring"), tick=card.querySelector(".tick"), ims=[...thumbs.children];
    G.timeline({onComplete:end})
      .fromTo(btn,{scale:1},{scale:.95,duration:.09,yoyo:true,repeat:1,ease:"power2.out"},0)
      .fromTo(fx,{autoAlpha:0},{autoAlpha:1,duration:.32,ease:"power2.out"},.08)
      .fromTo(card,{y:26,scale:.92,autoAlpha:0},{y:0,scale:1,autoAlpha:1,duration:.55,ease:"back.out(1.6)"},.12)
      .fromTo(ring,{strokeDashoffset:252},{strokeDashoffset:0,duration:.5,ease:"power2.inOut"},.3)
      .fromTo(tick,{strokeDashoffset:60},{strokeDashoffset:0,duration:.32,ease:"power3.out"},.7)
      .fromTo(card.querySelector(".cfCheck"),{scale:1},{scale:1.08,duration:.14,yoyo:true,repeat:1,ease:"power2.out"},.95)
      .fromTo(ims,{y:14,scale:.6,autoAlpha:0},{y:0,scale:1,autoAlpha:1,duration:.4,stagger:.045,ease:"back.out(2)"},.62)
      /* the picks drop away, as if into the kitchen, while the camera starts to move */
      .to(ims,{y:70,scale:.5,autoAlpha:0,duration:.5,stagger:.035,ease:"power2.in"},1.55)
      .add(go,1.7)
      .to(card,{y:60,scale:.94,autoAlpha:0,duration:.55,ease:"power2.in"},1.85)
      .to(fx,{autoAlpha:0,duration:.6,ease:"power2.inOut"},1.95);
  }

  /* ---------- 5 · arrival at packaging ---------- */
  function showArrival(){
    if(shown) return; shown=true; armed=false;
    arrive.style.visibility="visible";
    if(!G||RM()){ spot.style.opacity=".55"; aCard.style.opacity="1"; aCard.style.transform="translateX(-50%)"; return; }
    G.set(aCard,{xPercent:-50});
    G.timeline()
      .fromTo(spot,{opacity:0},{opacity:1,duration:.8,ease:"power2.out"},0)
      .to(spot,{opacity:.45,duration:1.6,ease:"sine.inOut"},.9)
      .fromTo(aCard,{autoAlpha:0,y:46},{autoAlpha:1,y:0,duration:.8,ease:"power3.out"},.2)
      .fromTo(aCard.querySelectorAll(".arriveTx > *"),{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.5,stagger:.08,ease:"power2.out"},.45)
      .fromTo(cta,{scale:.9},{scale:1,duration:.7,ease:"elastic.out(1,.5)"},.85);
  }
  function hideArrival(){
    if(!shown) return; shown=false;
    const off=()=>{ arrive.style.visibility="hidden"; };
    if(!G||RM()){ off(); return; }
    G.timeline({onComplete:off}).to(aCard,{autoAlpha:0,y:24,duration:.35,ease:"power2.in"},0).to(spot,{opacity:0,duration:.5},0);
  }
  /* if the visitor scrolls the rest of the way themselves, arrive anyway */
  if("IntersectionObserver" in window){
    new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting&&armed&&!busy&&!gliding) showArrival(); }),{threshold:.35}).observe(pack);
  }
  /* once the film is under way, the card steps aside */
  addEventListener("scroll",()=>{
    if(!shown||gliding) return;
    const r=pack.getBoundingClientRect(), q=-r.top/Math.max(1,r.height-innerHeight);
    if(q>.07||q<-.4) hideArrival();
  },{passive:true});
  cta.addEventListener("click",()=>{
    /* glide into the film: past the float and the bento, to the moment the lid closes */
    const span=pack.offsetHeight-innerHeight;
    cineScroll(packTop()+span*.80*.30,1800).then(hideArrival);
  });

  btn.addEventListener("click",confirmSelection);
  window.GGConfirm={update,confirm:confirmSelection,scrollToPack:()=>cineScroll(packTop())};
  update();
})();
