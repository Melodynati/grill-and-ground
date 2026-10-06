
/* =====================================================================
   The cinematic order creation, launched by Confirm Selection
   1 Order confirmation · 2 Cloud ascension            (GSAP timeline, ~5.5 s)
   3 Food orchestra · 4 Assembly · 5 Hero (slow motion)
   6 Sealing · 7 QR reveal · 8 Scan to win              (the packing film, auto-played,
                                                         overlays keyed to film time)
   Final: "Your Virtual Buffet Is Ready." → Continue to Delivery
   ===================================================================== */
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const root=$("cine"); if(!root||!window.gsap||typeof GGFrames==="undefined") return;
  const G=gsap, RM=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sky=$("cnSky"), sx=sky.getContext("2d"), film=GGFrames.attach($("cnFilm")), still=$("cnStill"), dust=$("cnDust"), dx=dust.getContext("2d");
  const veil=root.querySelector(".veilBg"), glow=$("cnGlow"), flash=$("cnFlash"), pulse=$("cnPulse"),
        passL=$("cnPassL"), passR=$("cnPassR"), set=$("cnSet"), grid=$("cnSetGrid"), say1=$("cnSay1"), prep=$("cnPrep"),
        sayTop=$("cnSayTop"), kick=$("cnKick"), head=$("cnHead"), holo=$("cnHolo"), serial=$("cnSerial"),
        rewards=$("cnRewards"), fin=$("cnFinal"), skipB=$("cnSkip"), bar=$("cnBar");
  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
  const seg=(t,a,b)=>clamp((t-a)/(b-a));
  let W=0,H=0, running=false, phase="", intro=null, raf=0, lastSay="";

  still.src=CINE_STILL;
  passL.style.backgroundImage=passR.style.backgroundImage="url("+SC.bank+")";

  /* ---------- the sky realm: the real cloud-sea frames from the opening ---------- */
  const SKY=[]; for(let i=104;i<FARM_FRAMES.length;i++){ const im=new Image(); im.src="data:image/webp;base64,"+FARM_FRAMES[i]; SKY.push(im); }
  function drawSky(f,zoom){
    const i0=Math.floor(f), i1=Math.min(SKY.length-1,i0+1), t=f-i0;
    const draw=(im,a)=>{ if(!im.complete||!im.naturalWidth) return;
      const s=Math.max(sky.width/960,sky.height/540)*zoom, w=960*s, h=540*s;
      sx.globalAlpha=a; sx.drawImage(im,(sky.width-w)/2,(sky.height-h)/2,w,h); };
    draw(SKY[i0],1); if(t>.01) draw(SKY[i1],t); sx.globalAlpha=1;
  }

  /* ---------- golden particles ---------- */
  const P=[], B=[];
  const spr=document.createElement("canvas"); spr.width=spr.height=48;
  { const g=spr.getContext("2d"), gr=g.createRadialGradient(24,24,0,24,24,24);
    gr.addColorStop(0,"rgba(255,250,228,1)"); gr.addColorStop(.3,"rgba(255,222,150,.75)"); gr.addColorStop(1,"rgba(255,200,110,0)");
    g.fillStyle=gr; g.fillRect(0,0,48,48); }
  for(let i=0;i<(innerWidth<700?46:90);i++) P.push({x:Math.random(),y:Math.random(),z:.3+Math.random()*.7,s:.6+Math.random()*1.6,ph:Math.random()*6.3,v:.00002+Math.random()*.00005});
  let dustLevel=0;
  function burst(n){ const c=Math.min(W,H);
    for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, sp=(.25+Math.random()*.9)*c*.0016;
      B.push({x:W/2,y:H*.5,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-.2,life:1,s:1+Math.random()*2.6}); } }
  function drawDust(now,dt){
    dx.clearRect(0,0,dust.width,dust.height); dx.globalCompositeOperation="lighter";
    const k=Math.max(W,H)/1400;
    if(dustLevel>.01) for(const q of P){
      let y=(q.y-now*q.v)%1; if(y<0) y+=1;
      const x=(q.x+Math.sin(now*.0004+q.ph)*.02+1)%1, sz=q.s*(5+q.z*8)*k;
      dx.globalAlpha=dustLevel*(.25+.5*q.z)*(.6+.4*Math.sin(now*.002+q.ph*3));
      dx.drawImage(spr,x*W-sz,y*H-sz,sz*2,sz*2);
    }
    for(let i=B.length-1;i>=0;i--){ const b=B[i];
      b.x+=b.vx*dt; b.y+=b.vy*dt; b.vy+=.00035*dt; b.vx*=.985; b.vy*=.985; b.life-=dt/1500;
      if(b.life<=0){ B.splice(i,1); continue; }
      const sz=b.s*7*k; dx.globalAlpha=Math.min(1,b.life*1.4); dx.drawImage(spr,b.x-sz,b.y-sz,sz*2,sz*2); }
    dx.globalAlpha=1; dx.globalCompositeOperation="source-over";
  }

  /* ---------- words: each line arrives word by word, out of focus into focus ---------- */
  const words=s=>s.split(" ").map(w=>'<span class="w">'+w+'</span>').join(" ");
  function say(k,h){
    const id=k+"|"+h; if(id===lastSay) return; lastSay=id;
    const old=[...sayTop.querySelectorAll(".w"),kick];
    G.to(old,{opacity:0,y:-8,filter:"blur(6px)",duration:.35,ease:"power2.in",onComplete:()=>{
      if(lastSay!==id) return;
      kick.textContent=k; head.innerHTML=words(h);
      G.fromTo(kick,{opacity:0,y:8},{opacity:1,y:0,duration:.6,ease:"power3.out"});
      G.to(head.querySelectorAll(".w"),{opacity:1,y:0,filter:"blur(0px)",duration:.8,stagger:.06,ease:"power3.out"});
    }});
  }
  function unsay(){ lastSay=""; G.to([kick,...sayTop.querySelectorAll(".w")],{opacity:0,duration:.4}); }

  /* ---------- the guest's set ---------- */
  function buildSet(){
    const sel=CATS.map(c=>picks[c.key]?c.items.find(i=>i.id===picks[c.key]):null).filter(Boolean);
    grid.innerHTML=sel.map(it=>'<span>'+(PH[it.id]?'<img src="'+PH[it.id]+'" alt="">':'')+'</span>').join("");
    const tot=document.querySelector(".sum .tot span:last-child"); $("cnSetPrice").textContent=tot?tot.textContent:"";
  }

  /* ---------- film beats, in film seconds ---------- */
  const BEATS=[
    [0.15,"03 · The orchestra","Eight components <i>rise into the light.</i>"],
    [3.6,"04 · Assembly","Each one curves home to its own place."],
    [4.55,"05 · The hero","The main course <i>lands last.</i>"],
    [6.35,"06 · Sealed","A crystal lid. <i>Freshness, locked.</i>"],
    [7.45,"07 · Your seal","One serial. One live QR. <i>Your campaign badge.</i>"],
    [10.3,"08 · Scan to win","Point your camera at the seal."],
    [12.75,"Unlocked","Every seal opens <i>a reward.</i>"]];
  const REW=[["🎁","Surprise Gift","A treat packed with your next set"],["🎟️","Lucky Draw","Monthly grand prize entry"],
             ["🎡","Spin the Wheel","One spin with every seal"],["🏷️","Discount Coupon","Up to 20% off your next buffet"],
             ["⭐","Loyalty Points","Points on every order"],["🧭","Buffet Missions","Collect all eight categories"]];
  rewards.innerHTML=REW.map(r=>'<div class="rw"><span class="ic" aria-hidden="true">'+r[0]+'</span><b>'+r[1]+'</b><small>'+r[2]+'</small></div>').join("");
  const rwEls=[...rewards.children];
  let fired={};
  const once=(k,fn)=>{ if(!fired[k]){ fired[k]=1; fn(); } };

  function layoutRewards(){
    const small=W<700, n=rwEls.length;
    rwEls.forEach((el,i)=>{
      let x,y;
      if(small){ const c=i%2, r=Math.floor(i/2); x=(c?.27:-.27)*W; y=(-.2+r*.2)*H; }
      else { const a=-Math.PI/2+(i/n)*Math.PI*2; x=Math.cos(a)*Math.min(W*.36,520); y=Math.sin(a)*Math.min(H*.32,300)+H*.04; }
      el.dataset.x=x; el.dataset.y=y;
    });
  }

  /* film-time overlays */
  function filmTick(t){
    const b=BEATS.filter(x=>t>=x[0]).pop(); if(b) say(b[1],b[2]);
    /* 5: time slows around the hero, then the energy pulse covers the cut to the lid */
    const slow=RM()?1:1-.55*Math.min(seg(t,4.5,4.9),1-seg(t,5.75,6.0));
    if(Math.abs(film.playbackRate-slow)>.02) film.playbackRate=slow;
    glow.style.opacity=(.25+.55*Math.min(seg(t,5.6,6.1),1-seg(t,6.3,6.9))+.35*Math.min(seg(t,12.4,12.6),1-seg(t,12.7,13.6))).toFixed(3);
    if(t>=5.95) once("pulseGo",()=>{ G.fromTo(pulse,{scale:.3,opacity:1},{scale:6,opacity:0,duration:1.4,ease:"power2.out"}); burst(70); });
    flash.style.opacity=(Math.max(
      Math.min(seg(t,6.02,6.2),1-seg(t,6.22,6.5)),          /* hero → lid */
      Math.min(seg(t,7.08,7.21),1-seg(t,7.23,7.55)),        /* sky → table */
      .7*Math.min(seg(t,10.02,10.13),1-seg(t,10.15,10.4)),  /* label → scan */
      Math.min(seg(t,12.4,12.54),1-seg(t,12.56,12.95))      /* scan lands */
    )).toFixed(3);
    /* 7: a holographic QR appears above the sealed tray and settles into the label */
    const hq=seg(t,6.45,7.05);
    holo.style.opacity=(Math.min(seg(t,6.4,6.6),1-seg(t,6.95,7.12))).toFixed(3);
    holo.style.transform="translate(-50%,-50%) translateY("+(hq*H*.30).toFixed(1)+"px) scale("+(1-hq*.55).toFixed(3)+") rotateX("+((1-hq)*18).toFixed(1)+"deg)";
    serial.style.opacity=Math.min(seg(t,7.6,8.0),1-seg(t,9.8,10.1)).toFixed(3);
    /* 8: the burst and the rewards */
    if(t>=12.55) once("rewards",()=>{ burst(220);
      rwEls.forEach((el,i)=>G.fromTo(el,{x:0,y:0,scale:.4,opacity:0,rotate:(i%2?8:-8)},
        {x:+el.dataset.x,y:+el.dataset.y,scale:1,opacity:1,rotate:0,duration:1.3,delay:.12*i,ease:"back.out(1.5)"}));
      rwEls.forEach((el,i)=>G.to(el,{y:"-=10",duration:2.2+i*.2,yoyo:true,repeat:-1,ease:"sine.inOut",delay:1.4+.12*i}));
    });
    dustLevel=t<12.5?.55:.9;
    bar.style.transform="scaleX("+(.22+.73*seg(t,0,17.1)).toFixed(4)+")";
  }

  /* ---------- the loop ---------- */
  let last=performance.now(), skyF=0, skyZoom=1.25;
  function loop(now){
    raf=0; if(!running) return;
    const dt=Math.min(50,now-last); last=now;
    if(phase==="intro"||phase==="final"){ drawSky(skyF,skyZoom); }
    if(phase==="film"){ filmTick(film.currentTime);
      if(film.ended||(film.duration&&film.currentTime>=film.duration-.08)) toFinal(); }
    drawDust(now,dt);
    raf=requestAnimationFrame(loop);
  }
  function size(){
    W=innerWidth; H=innerHeight; const d=Math.min(devicePixelRatio||1,1.5);
    sky.width=Math.round(W*d); sky.height=Math.round(H*d); dust.width=W; dust.height=H; layoutRewards();
  }
  addEventListener("resize",()=>{ if(running) size(); });

  /* ---------- scenes 1 and 2 ---------- */
  function playIntro(){
    phase="intro";
    const T=G.timeline({onComplete:startFilm});
    const rm=RM();
    prep.innerHTML=words("Preparing Your Virtual Buffet…");
    /* 1: the page falls away, the set stays, the light warms */
    T.to(veil,{opacity:1,duration:1.1,ease:"power2.inOut"},0)
     .fromTo(set,{opacity:0,scale:rm?1:.9,y:20},{opacity:1,scale:1,y:0,duration:1.2,ease:"power3.out"},.25)
     .to(glow,{opacity:.55,duration:1.6,ease:"sine.inOut"},.4)
     .to(prep.querySelectorAll(".w"),{opacity:1,y:0,filter:"blur(0px)",duration:.9,stagger:.09,ease:"power3.out"},.8)
     .fromTo(say1.querySelector("p"),{opacity:0},{opacity:1,duration:.6},.6)
     .to({},{duration:.5},2.2)                                              /* everything holds, briefly */
    /* 2: the camera rises through the cloud and the sky realm opens */
     .to(sky,{opacity:1,duration:1.2,ease:"power2.inOut"},2.5)
     .to(set,{opacity:0,y:-H*.18,scale:.82,filter:"blur(6px)",duration:1.2,ease:"power2.in"},2.5)
     .to(say1,{opacity:0,y:-20,duration:.7,ease:"power2.in"},2.5)
     .fromTo([passL,passR],{opacity:.95,y:-H*.2},{y:H*.9,duration:2.6,ease:"power2.inOut"},2.6)
     .fromTo(passL,{x:0},{x:-W*.55,duration:2.4,ease:"power2.inOut"},3.2)
     .fromTo(passR,{x:0},{x:W*.55,duration:2.4,ease:"power2.inOut"},3.2)
     .to([passL,passR],{opacity:0,duration:.6},4.8)
     .fromTo({f:0,z:1.35},{f:0,z:1.35},{f:12,z:1.0,duration:3.2,ease:"sine.inOut",onUpdate(){ skyF=this.targets()[0].f; skyZoom=this.targets()[0].z; }},2.5)
     .call(()=>{ say("02 · Cloud ascension","Something special <i>is being created.</i>"); dustLevel=.8; },[],3.3)
     .to(glow,{opacity:.85,duration:1.2},4.4)
     .fromTo(bar,{scaleX:0},{scaleX:.22,duration:5.6,ease:"none"},0)
     .to(flash,{opacity:.9,duration:.45,ease:"power2.in"},5.2);
    intro=T;
  }

  /* ---------- scenes 3-8: the packing film ---------- */
  function startFilm(){
    phase="film"; fired={};
    film.currentTime=0; film.playbackRate=1;
    G.set(film,{opacity:1}); G.to(flash,{opacity:0,duration:.8,ease:"power2.out"});
    /* wide screens: the film fills the frame; tall screens: the cloud sky stays behind the letterboxed film */
    G.to(sky,{opacity:(W/H<1)?.85:0,duration:.6,delay:.3}); G.to(glow,{opacity:.25,duration:1});
    const p=film.play(); if(p&&p.catch) p.catch(()=>{ toFinal(); });
  }
  film.addEventListener("ended",()=>{ if(phase==="film") toFinal(); });

  /* ---------- final: the sealed package above the cloud ---------- */
  let autoT=null;
  let leaving=false;
  function goPack(){
    if(leaving) return; leaving=true;
    if(autoT){ autoT.kill(); autoT=null; }
    close(()=>{
      const pack=$("pack"), top=pack.getBoundingClientRect().top+scrollY;
      glideTo(top+2,1600);
    });
  }
  function toFinal(){
    if(phase==="final") return; phase="final";
    if(intro){ intro.kill(); intro=null; }
    unsay(); G.killTweensOf(rwEls); G.to(sayTop,{opacity:0,duration:.4});
    const T=G.timeline();
    T.to(flash,{opacity:.85,duration:.5,ease:"power2.in"},0)
     .call(()=>{ film.pause(); G.set([film,set,say1,holo,serial,passL,passR],{opacity:0}); G.set(rwEls,{opacity:0});
                 G.set(veil,{opacity:1}); skyF=15; skyZoom=1.06; G.set(sky,{opacity:1}); },[],.5)
     .fromTo(still,{opacity:0,scale:1.08},{opacity:1,scale:1,duration:2.4,ease:"power2.out"},.5)
     .to(flash,{opacity:0,duration:1.2,ease:"power2.out"},.55)
     .to(glow,{opacity:.6,duration:1.5},.6)
     .set(fin,{visibility:"visible"},.9)
     .fromTo(fin,{opacity:0,y:24},{opacity:1,y:0,duration:1.1,ease:"power3.out"},1.0)
     .to(bar,{scaleX:1,duration:.6},.5)
     .to(skipB,{opacity:0,duration:.4,onComplete:()=>skipB.style.visibility="hidden"},.5)
     .call(()=>$("cnGo").focus({preventScroll:true}),[],1.6)
     /* hold on the sealed package, then carry the guest into the packaging section */
     .fromTo(bar,{scaleX:0},{scaleX:1,duration:3.4,ease:"none"},1.4)
     .call(goPack,[],4.9);
    autoT=T;
    /* the package keeps floating */
    G.to(still,{y:-10,duration:3.2,yoyo:true,repeat:-1,ease:"sine.inOut",delay:2.9});
    dustLevel=.7;
  }

  /* ---------- open / close ---------- */
  function reset(){
    G.killTweensOf([veil,set,glow,sky,passL,passR,flash,still,fin,film,bar,pulse,holo,serial,skipB,say1,kick,...rwEls]);
    G.set([veil,set,glow,sky,passL,passR,flash,still,fin,film,pulse,holo,serial,say1,sayTop,...rwEls],{clearProps:"all"});
    G.set(bar,{scaleX:0}); fin.style.visibility="hidden"; skipB.style.visibility=""; G.set(skipB,{opacity:1});
    kick.textContent=""; head.innerHTML=""; lastSay=""; B.length=0; dustLevel=.35; fired={};
  }
  function play(){
    if(typeof GGFrames==="undefined") return false;
    GGFrames.warm();
    buildSet(); reset(); size();
    const ser=$("sealSerial"); serial.textContent=(ser&&ser.textContent)||"";
    const q=$("sealQR"); holo.innerHTML=q?q.innerHTML:"";
    document.documentElement.classList.add("cineLock");
    root.classList.add("on"); root.setAttribute("aria-hidden","false");
    running=true; last=performance.now(); if(!raf) raf=requestAnimationFrame(loop);
    playIntro(); skipB.focus({preventScroll:true});
    return true;
  }
  function close(after){
    G.to(root,{opacity:0,duration:.7,ease:"power2.inOut",onComplete:()=>{
      running=false; film.pause(); root.classList.remove("on"); root.setAttribute("aria-hidden","true"); G.set(root,{clearProps:"opacity"});
      document.documentElement.classList.remove("cineLock"); reset(); leaving=false; if(after) after();
    }});
  }
  /* Continue to Delivery: back to the page, gliding into the packaging scene at the delivery */
  function glideTo(y,dur){
    const html=document.documentElement, prev=html.style.scrollBehavior; html.style.scrollBehavior="auto";
    const y0=scrollY, dy=y-y0, t0=performance.now(), e=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    if(RM()){ scrollTo(0,y); html.style.scrollBehavior=prev; return; }
    const step=n=>{ const p=Math.min(1,(n-t0)/dur); scrollTo(0,y0+dy*e(p)); if(p<1) requestAnimationFrame(step); else html.style.scrollBehavior=prev; };
    requestAnimationFrame(step);
  }
  $("cnGo").addEventListener("click",goPack);
  $("cnReplay").addEventListener("click",()=>{ if(autoT){ autoT.kill(); autoT=null; } reset(); size(); playIntro(); });
  skipB.addEventListener("click",toFinal);
  addEventListener("keydown",e=>{ if(running&&e.key==="Escape"){ phase==="final"?goPack():toFinal(); } });

  window.GGCine={play};
})();
