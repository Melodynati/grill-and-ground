
/* =====================================================================
   Scene 1 · Ground to Cloud — one continuous, scroll-controlled shot
   - the real farm footage is a 120-frame sequence drawn on a canvas,
     cross-faded between frames so the dolly glides at any scroll speed
   - 0%  enter the aisle · 20% deeper · 40% ingredients rise
     60% the lens tilts up · 80% full sky (through the cloud) · 100% cloud world
   - progress comes from GSAP ScrollTrigger (scrub + momentum) once it loads;
     until then a damped scroll follower keeps the scene alive
   ===================================================================== */
(function(){
  const RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const M = RM ? 0 : 1;
  const $ = id => document.getElementById(id);
  const journey=$("journey"), scene=$("scene"), farm=$("farm"), cv=$("farmCv"), cx2=cv.getContext("2d",{alpha:false});
  const plateImg=$("plateImg"), sunOrb=$("sunOrb"), godRays=$("godRays"), bloom=$("bloom"), hazeBand=$("hazeBand"),
        skyHigh=$("skyHigh"), sunHigh=$("sunHigh"), far=$("cloudsFar"), mid=$("cloudsMid");
  const bank=$("bank"), floor=$("floor"), auraWrap=$("auraWrap"), aura=$("aura"), rays=$("rays");
  const burst=$("burst"), plateWrap=$("plateWrap"), ctaRow=$("ctaRow"), hint=$("hint");
  const pollen=$("pollen"), pctx=pollen.getContext("2d"), veil=$("veil"), leaves=$("leaves"), dof=$("dof");
  const caps=[$("capA"),$("capB"),$("capC"),$("capD")];
  const railDot=$("railDot"), altName=$("altName"), stops=[...document.querySelectorAll(".railStop")];

  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
  const seg=(p,a,b)=>clamp((p-a)/(b-a));
  const win=(p,a,b,c,d)=>Math.min(seg(p,a,b),1-seg(p,c,d));
  const sm=t=>t*t*(3-2*t);
  const eout=t=>1-Math.pow(1-t,3);
  const back=t=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};

  /* ---------- the footage ---------- */
  const CUT=104, NF=CUT+STEAK_FRAMES.length;     /* frames 0-103: the farm and the tilt; 104+: the steak in the cloud world */
  const srcOf=i=>i<CUT?FARM_FRAMES[i]:STEAK_FRAMES[i-CUT];
  const imgs=new Array(NF);
  let lastF=-1, W=0, H=0, CW=0, CH=0;
  function loadFrame(i){
    if(imgs[i]) return;
    const im=new Image(); im.decoding="async";
    im.onload=()=>{ im.ok=true; if(Math.abs(i-lastF)<2 || lastF<0) { const f=lastF<0?0:lastF; lastF=-1; drawFrame(f); } };
    im.src="data:image/webp;base64,"+srcOf(i);
    imgs[i]=im;
  }
  /* first frame, then a coarse pass, then the rest: something real shows instantly */
  loadFrame(0);
  for(let s of [16,8,4,2,1]) for(let i=0;i<NF;i+=s) loadFrame(i);
  const nearest=i=>{ for(let d=0;d<NF;d++){ if(imgs[i-d]&&imgs[i-d].ok&&(i-d<CUT)===(i<CUT)) return imgs[i-d];
                                            if(imgs[i+d]&&imgs[i+d].ok&&(i+d<CUT)===(i<CUT)) return imgs[i+d]; } return null; };
  function cover(im,alpha){
    const s=Math.max(CW/960,CH/540), dw=960*s, dh=540*s;
    cx2.globalAlpha=alpha; cx2.drawImage(im,(CW-dw)/2,(CH-dh)/2,dw,dh);
  }
  function drawFrame(f){
    if(!CW) return;
    if(Math.abs(f-lastF)<.004) return; lastF=f;
    const i0=Math.floor(f), i1=Math.min(NF-1,i0+1), t=f-i0;
    const a=(imgs[i0]&&imgs[i0].ok)?imgs[i0]:nearest(i0);
    if(!a) return;
    cover(a,1);
    const tb=sm(clamp((t-.2)/.6));                       /* a short blend window keeps every frame crisp */
    if(tb>.01 && i1!==i0 && i1!==CUT){                  /* cross-fade to the next frame: no stepping */
      const b=imgs[i1]; if(b&&b.ok) cover(b,tb);
    }
    cx2.globalAlpha=1;
  }
  /* when the scroll comes to rest between two frames, ease onto the nearer one so nothing stays ghosted */
  let snapT=0, snapRaf=0;
  function settle(f){
    clearTimeout(snapT); if(snapRaf){cancelAnimationFrame(snapRaf);snapRaf=0;}
    const goal=Math.round(f); if(Math.abs(goal-f)<.02) return;
    snapT=setTimeout(()=>{
      let v=f; const step=()=>{ v+=(goal-v)*.18; if(Math.abs(goal-v)<.01) v=goal; lastF=-1; drawFrame(v);
        snapRaf=v===goal?0:requestAnimationFrame(step); };
      snapRaf=requestAnimationFrame(step);
    },140);
  }
  /* scroll → frame: the dolly runs to 58%, slows into the tilt, and the cloud world drifts to the end */
  function frameAt(p){
    if(p<.58) return 87*(p/.58);
    if(p<.81) return 87+16*sm(seg(p,.58,.81));
    return CUT+(STEAK_FRAMES.length-1)*seg(p,.81,.975);      /* the plate floats, then the lens pushes in on the steak */
  }

  /* ---------- pollen and dust caught in the sun ---------- */
  const small=()=>W<700;
  const NP=RM?0:(innerWidth<700?42:84);
  const P=[];
  for(let i=0;i<NP;i++){
    const r=(n)=>{const x=Math.sin(i*12.9898+n*78.233)*43758.5453; return x-Math.floor(x);};
    P.push({x:r(1),y:r(2),z:.25+r(3)*.75,s:.6+r(4)*1.9,a:.25+r(5)*.6,ph:r(6)*6.28,fs:.0003+r(7)*.0006,vy:.000012+r(8)*.00003,vx:(r(9)-.5)*.00001});
  }
  const spr=document.createElement("canvas"); spr.width=spr.height=64;
  { const g=spr.getContext("2d"), gr=g.createRadialGradient(32,32,0,32,32,32);
    gr.addColorStop(0,"rgba(255,252,236,1)"); gr.addColorStop(.25,"rgba(255,236,180,.75)"); gr.addColorStop(1,"rgba(255,220,150,0)");
    g.fillStyle=gr; g.fillRect(0,0,64,64); }
  let sunX=.5, sunY=.06, pollenAlpha=1, loop=0, inView=true;
  function pollenFrame(now){
    loop=0; if(!inView||!NP) return;
    const pw=pollen.width, ph=pollen.height;
    pctx.clearRect(0,0,pw,ph);
    if(pollenAlpha>.01){
      pctx.globalCompositeOperation="lighter";
      const k=Math.max(pw,ph)/1400;
      for(const q of P){
        let x=(q.x+Math.sin(now*q.fs+q.ph)*.014+now*q.vx)%1; if(x<0)x+=1;
        let y=(q.y-now*q.vy-cur*q.z*1.3)%1; if(y<0)y+=1;
        const dx=x-sunX, dy=(y-sunY)*.7, lit=1+1.8*Math.exp(-(dx*dx+dy*dy)*9);
        const tw=.55+.45*Math.sin(now*.0016+q.ph*3);
        const sz=q.s*(4+q.z*9)*k*(small()?1.3:1);
        pctx.globalAlpha=clamp(q.a*tw*lit*pollenAlpha*(.45+q.z*.55),0,1);
        pctx.drawImage(spr,x*pw-sz,y*ph-sz,sz*2,sz*2);
      }
      pctx.globalAlpha=1; pctx.globalCompositeOperation="source-over";
    }
    loop=requestAnimationFrame(pollenFrame);
  }
  const wake=()=>{ if(!loop&&inView&&NP) loop=requestAnimationFrame(pollenFrame); };
  if("IntersectionObserver" in window){
    new IntersectionObserver(es=>{ inView=es[0].isIntersecting; wake(); },{rootMargin:"100px"}).observe(journey);
  }

  /* ---------- the sky set, as before ---------- */
  const MIST='<div class="mist t"></div><div class="mist b"></div>';
  function buildClouds(){
    plateImg.src=SC.plate;
    if(!bank.querySelector(".mist")){ bank.innerHTML=MIST; mid.innerHTML=MIST; floor.innerHTML='<div class="mist t"></div>'; }
    if(!godRays.firstElementChild) godRays.innerHTML="<i></i>";
    far.style.backgroundImage="url("+SC.far+")";
    mid.style.backgroundImage="url("+SC.bank+")";
    bank.style.backgroundImage="url("+SC.bank+")";
    floor.style.backgroundImage="url("+SC.floor+")";
  }

  let cx=0,cy=0,plateW=0;
  const PLATE_AR=0.66;
  function layout(){
    W=scene.clientWidth; H=scene.clientHeight;
    const sm_=W<700;
    /* the canvas: sharp enough, light enough */
    const dpr=Math.min(window.devicePixelRatio||1,1.5);
    CW=cv.width=Math.round(W*dpr); CH=cv.height=Math.round(H*dpr); lastF=-1;
    pollen.width=Math.round(W*Math.min(dpr,1.25)); pollen.height=Math.round(H*Math.min(dpr,1.25));
    const sTop=scene.getBoundingClientRect().top;
    const capBottom=caps[3].getBoundingClientRect().bottom-sTop;
    const ctaH=ctaRow.getBoundingClientRect().height||60;
    const bandTop=capBottom+(sm_?12:18);
    const bandBottom=H-ctaH-(sm_?24:32);
    const band=Math.max(bandBottom-bandTop,170);
    cx=W/2;
    plateW=Math.min(W*(sm_?.8:.46),560,(band*.92)/PLATE_AR);
    cy=bandTop+band/2;
    const as=Math.max(W*(sm_?1.35:.9),Math.min(H*1.1,1100));
    Object.assign(aura.style,{width:as+"px",height:as+"px",left:(-as/2)+"px",top:(-as/2)+"px"});
    const rs=as*1.1;
    Object.assign(rays.style,{width:rs+"px",height:rs+"px",left:(-rs/2)+"px",top:(-rs/2)+"px"});
    auraWrap.style.left=cx+"px"; auraWrap.style.top=cy+"px";
    const bs=plateW*1.25;
    Object.assign(burst.style,{width:bs+"px",height:bs+"px",left:(cx-bs/2)+"px",top:(cy-bs/2)+"px"});
    Object.assign(plateWrap.style,{width:plateW+"px",left:cx+"px",top:cy+"px"});
    buildClouds();
    if(!useST){ readTarget(); cur=target; }
    render(cur); wake();
  }

  /* ---------- one take: a single progress value drives every layer ---------- */
  let cur=0;
  function render(p){
    cur=p;
    const sm_=W<700;

    /* the footage */
    const f=frameAt(p), cloudWorld=p>=.81;
    drawFrame(f); settle(f);

    /* the lens tilts up at the end of the aisle: the field sinks, the sky opens above it */
    const tilt=sm(seg(p,.60,.81));
    const push=cloudWorld?1:(1+.035*seg(p,0,.58)*M);
    const ty=cloudWorld?0:tilt*.46*H*M;
    farm.style.transform="translate3d(0,"+ty.toFixed(1)+"px,0) scale("+push.toFixed(4)+")";
    farm.style.setProperty("--cut",(cloudWorld?-32:(-32+tilt*34)).toFixed(1)+"%");

    /* where the sun sits in the frame, for the rays, the bloom and the sunlit pollen */
    const sunInFrame=cloudWorld?.56:(f<75?.05:.05+(f-75)/28*.47);
    sunX=.5; sunY=cloudWorld?.56:clamp(sunInFrame+ty/H*(1/push));
    const sr=Math.max(W,H)*(cloudWorld?.6:.9);
    sunOrb.style.left="50%"; sunOrb.style.top=(sunY*100).toFixed(2)+"%";
    sunOrb.firstElementChild.style.cssText="width:"+sr.toFixed(0)+"px;height:"+sr.toFixed(0)+"px;left:"+(-sr/2).toFixed(0)+"px;top:"+(-sr/2).toFixed(0)+"px";
    sunOrb.style.opacity=(cloudWorld?0:(.32+tilt*.4)*(1-seg(p,.74,.80))).toFixed(3);
    const rayW=Math.max(W,H)*2.4;
    godRays.style.opacity=(cloudWorld?0:(.15+.14*tilt)*(1-seg(p,.74,.80))).toFixed(3);
    godRays.firstElementChild.style.cssText="width:"+rayW.toFixed(0)+"px;height:"+rayW.toFixed(0)+"px;left:calc(50% - "+(rayW/2).toFixed(0)+"px);top:calc("+(sunY*100).toFixed(1)+"% - "+(rayW/2).toFixed(0)+"px)";
    bloom.style.opacity=(cloudWorld?.10:.12+.12*tilt).toFixed(3);

    /* the sky above the field */
    skyHigh.style.opacity=(cloudWorld?0:tilt).toFixed(3);
    sunHigh.style.opacity=(cloudWorld?0:tilt*.55).toFixed(3);
    sunHigh.style.transform="translate3d(0,"+((1-tilt)*.18*H*M).toFixed(1)+"px,0)";
    far.style.opacity=(cloudWorld?0:tilt).toFixed(3);
    far.style.transform="translate3d(0,"+((-.42+tilt*.42)*H*M).toFixed(1)+"px,0)";
    hazeBand.style.opacity=(cloudWorld?0:win(p,.55,.66,.76,.81)*.55).toFixed(3);
    mid.style.opacity=(win(p,.66,.72,.79,.84)*.85).toFixed(3);
    mid.style.transform="translate3d(0,"+((-.9+seg(p,.66,.86)*1.9)*H*M).toFixed(1)+"px,0)";

    /* through the cloud: a bank passes the lens, the light goes white-gold, and we come out above it */
    bank.style.opacity=win(p,.70,.75,.86,.91).toFixed(3);
    bank.style.transform="translate3d(0,"+((-1.9+sm(seg(p,.70,.92))*2.9)*H*M).toFixed(1)+"px,0)";
    veil.style.opacity=sm(win(p,.755,.80,.82,.875)).toFixed(3);
    floor.style.opacity="0";

    /* depth of field and the near leaves in the wind, only while we are in the rows */
    const lv=seg(p,.02,.17);
    leaves.style.opacity=(1-lv).toFixed(3);
    leaves.style.transform="translate3d(0,"+(lv*.32*H*M).toFixed(1)+"px,0) scale("+(1+lv*.35*M).toFixed(3)+")";
    leaves.style.visibility=lv>=.999?"hidden":"visible";
    dof.style.opacity=(1-seg(p,.56,.70)).toFixed(3);

    /* pollen: everywhere in the field, thinner in the white, a few gold motes in the cloud world */
    pollenAlpha=cloudWorld?.35*seg(p,.84,.9):(1-seg(p,.76,.80));

    /* the cloud world: the golden aura pops and the plate floats up into it */
    const a=seg(p,.84,.94);
    auraWrap.style.opacity="0";
    auraWrap.style.transform="scale("+(RM?1:Math.max(0,back(a))).toFixed(4)+")";
    const bu=seg(p,.86,.98);
    burst.style.opacity="0";
    burst.style.transform="scale("+(.4+1.5*bu*M+(1-M)).toFixed(3)+")";
    const pl=eout(seg(p,.86,.96));
    plateWrap.style.opacity="0";
    plateWrap.style.transform="translate(-50%,-50%) translate3d(0,"+((1-pl)*.35*H*M).toFixed(1)+"px,0) scale("+(.8+.2*pl).toFixed(3)+")";

    /* words */
    const ops=[win(p,-1,0,.12,.18),win(p,.25,.31,.45,.51),win(p,.61,.66,.75,.79),seg(p,.90,.96)];
    caps.forEach((c,i)=>{
      c.style.opacity=ops[i].toFixed(3);
      c.style.transform="translate3d(0,"+((1-ops[i])*16*M).toFixed(1)+"px,0)";
      c.style.visibility=ops[i]<.01?"hidden":"visible";
    });
    const cta=seg(p,.94,.99);
    ctaRow.style.opacity=cta.toFixed(3);
    ctaRow.style.pointerEvents=cta>.5?"auto":"none";
    ctaRow.style.visibility=cta<.01?"hidden":"visible";
    hint.style.opacity=(1-seg(p,0,.04)).toFixed(3);

    /* altitude */
    railDot.style.bottom=(p*100).toFixed(2)+"%";
    const names=["Ground","Grill","Sky","Cloud"], marks=[0,.36,.66,1];
    let k=0; marks.forEach((m,i)=>{if(Math.abs(p-m)<Math.abs(p-marks[k]))k=i;});
    stops.forEach((s,i)=>s.classList.toggle("on",i===k));
    if(altName.textContent!==names[k]) altName.textContent=names[k];
  }

  /* ---------- scroll: a damped follower until GSAP ScrollTrigger takes over ---------- */
  let target=0, raf=0, useST=false;
  function readTarget(){
    const rect=journey.getBoundingClientRect();
    target=clamp(-rect.top/((rect.height-H)||1));
  }
  function tick(){
    raf=0; const d=target-cur;
    if(RM||Math.abs(d)<.0004) render(target); else { render(cur+d*.16); raf=requestAnimationFrame(tick); }
  }
  function frame(){ if(useST) return; readTarget(); if(!raf) raf=requestAnimationFrame(tick); }
  addEventListener("scroll",frame,{passive:true});
  let rt; addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(layout,120);});

  window.GGJ={
    get p(){ return cur; },
    setP(p){ render(p); },
    useScrollTrigger(){ useST=true; removeEventListener("scroll",frame); if(raf){cancelAnimationFrame(raf);raf=0;} }
  };
  layout();
})();
