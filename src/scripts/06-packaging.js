
(function(){
  const RM=matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $=id=>document.getElementById(id);
  const pack=$("pack"), scene=pack.querySelector(".packScene"), wrap=$("trayWrap"), tray=$("tray3d"),
        cellsEl=$("packCells"), band=$("packBand"), sky=$("packSky"),
        countIn=$("packCountIn"), nEl=$("packN"), catEl=$("packCat"), nmEl=$("packNm"),
        seal=$("packSeal"), totalEl=$("packTotal"), aura=$("packAura"), tBody=$("trayBody"), tSweep=$("traySweep");
  let trayK=1, labs=[], sparks=[];
  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
  const seg=(p,a,b)=>clamp((p-a)/(b-a));
  const eout=t=>1-Math.pow(1-t,3);
  const back=t=>{const c1=1.45,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};

  const DEFAULTS={main:"truffle",side:"fries",salad:"rolltoss",soup:"soupday",
                  bake:"focaccia",dessert:"yogurt",drink:"deepgreen",addon:"egg"};
  const order=["main","side","salad","soup","bake","dessert","drink","addon"];
  const pad=n=>(n<10?"0":"")+n;
  const INGN=["Fire-seared beef","Garden carrot","Organic cabbage","Vine tomato","Natural-starter dough","Fresh fruit","Organic kale","Radish"];
  let tiles=[], cells=[], items=[];

  function current(key){
    const cat=CATS.find(c=>c.key===key);
    const id=(typeof picks!=="undefined" && picks[key])||DEFAULTS[key];
    return cat.items.find(i=>i.id===id)||cat.items[0];
  }
  function build(){
    items=order.map(current);
    cellsEl.innerHTML=order.map((k,i)=>{
      const cat=CATS.find(c=>c.key===k);
      return '<div class="cell" data-k="'+k+'" style="grid-area:'+k+'"><i>'+pad(i+1)+'</i><em>'+cat.label+'</em></div>';
    }).join("");
    cells=[...cellsEl.children];
    tray.querySelectorAll(".tile").forEach(t=>t.remove());
    tiles=items.map((it,i)=>{
      const src=PH[it.id], d=document.createElement("div");
      d.className="tile";
      d.innerHTML='<div class="tDish">'+(src?'<img src="'+src+'" alt="'+it.nm+'">':'<div class="np">'+it.nm+'</div>')+'</div>'+
        '<div class="tIng"><img src="'+ING[order[i]]+'" alt="'+INGN[i]+'"></div><div class="tFlash"></div>';
      tray.appendChild(d); return d;
    });
    tray.querySelectorAll(".haloLab").forEach(l=>l.remove());
    labs=order.map((k,i)=>{
      const l=document.createElement("div"); l.className="haloLab";
      l.textContent=CATS.find(c=>c.key===k).label;
      tray.appendChild(l); return l;
    });
    /* the guest's own set once they have chosen; the sample set before that */
    const P=window.GGPrice?GGPrice():null, own=P&&P.n>0;
    const sum=own?P.total:(items[0].price||0)+(items[6].price||0)+(items[7].price||0);
    totalEl.innerHTML="THB "+sum.toLocaleString("en-US")+"<small>"+items[0].nm+"</small>";
  }

  /* a few leaves drifting through the shot */
  const LEAF='<svg viewBox="0 0 22 14" width="22" height="14"><path d="M1 12C3 3 12 0 21 2 19 11 9 14 1 12z" fill="#6E9A45"/><path d="M2 12C7 8 14 5 20 3" stroke="#4E7A2A" stroke-width="1" fill="none"/></svg>';
  let leaves=[];
  function makeLeaves(){
    if(!sparks.length) for(let i=0;i<16;i++){
      const d=document.createElement("div"); d.className="spark"; scene.appendChild(d); sparks.push(d);
    }
    if(leaves.length) return;
    for(let i=0;i<9;i++){
      const d=document.createElement("div");
      d.className="leaf"; d.innerHTML=LEAF;
      scene.appendChild(d); leaves.push(d);
    }
  }

  let W=0,H=0,from=[],to=[];
  function layout(){
    W=scene.clientWidth; H=scene.clientHeight;
    if(!tiles.length) build();
    makeLeaves();
    /* the box sits in the room the words and the buttons leave */
    const cap=scene.querySelector(".packCap").getBoundingClientRect();
    const sTop=scene.getBoundingClientRect().top;
    const top=cap.bottom-sTop+(W<700?16:22);
    const bottom=H-(W<700?150:160);
    const bandH=Math.max(bottom-top,180);
    wrap.style.transform="translate(-50%,-50%)";
    { const cw=cellsEl.clientWidth, gp=W<700?7:11;
      const unit=W<700?(cw-gp*2)/3:(cw-gp*4)/(1.75+1+1+1+.78);
      cellsEl.style.gridAutoRows=Math.round(unit*(W<700?.74:.78))+"px"; }
    const k=Math.max(Math.min(1,bandH/wrap.offsetHeight),.56);
    wrap.style.transform="translate(-50%,-50%) scale("+k.toFixed(3)+")";
    wrap.style.top=(top+bandH/2)+"px";
    void wrap.offsetHeight;
    /* tiles live inside the box, so they inherit its tilt */
    const lab=W<700?22:27, ins=W<700?4:6;
    to=cells.map(c=>({x:c.offsetLeft+ins,y:c.offsetTop+ins,w:c.offsetWidth-ins*2,h:c.offsetHeight-ins-lab}));
    /* the halo: all eight float in an arc of golden light before they are packed */
    const TW=tray.offsetWidth, TH=tray.offsetHeight;
    const cx=TW/2, cy=TH*(W<700?.50:.66), rx=TW*(W<700?.36:.45), ry=TH*(W<700?.34:.56);
    const arcOrder=[3,7,5,0,1,6,2,4];               /* left to right; the main sits near the top */
    from=new Array(order.length);
    arcOrder.forEach((item,pos)=>{
      const a=(196+pos*(148/(order.length-1)))*Math.PI/180;
      const big=item===0?1.28:1;
      from[item]={x:cx+rx*Math.cos(a)-to[item].w/2, y:cy+ry*Math.sin(a)-to[item].h/2,
                  rot:(pos%2?1:-1)*(5+pos), big};
    });
    trayK=k;
    const wr=wrap.getBoundingClientRect(), sr=scene.getBoundingClientRect();
    aura.style.left=(wr.left-sr.left+wr.width/2)+"px";
    aura.style.top=(wr.top-sr.top+wr.height*.30)+"px";
    tiles.forEach((d,i)=>{ d.style.width=to[i].w+"px"; d.style.height=to[i].h+"px"; });
    master(progress());
  }
  function progress(){
    const r=pack.getBoundingClientRect();
    return clamp(-r.top/((r.height-H)||1));
  }

  let cur=0,target=0,raf=0,shown=-1;
  function tick(){
    raf=0; const d=target-cur;
    if(RM||Math.abs(d)<.0005) cur=target; else { cur+=d*.15; raf=requestAnimationFrame(tick); }
    master(cur);
  }
  function master(q){
    if(FILM){
      /* the film carries scenes 1-8; the campaign takes over at the end */
      const Fk=.80;
      wrap.style.opacity="0"; aura.style.opacity="0"; capEl.style.opacity="0"; countIn.style.opacity="0";
      seal.style.opacity="0"; seal.style.pointerEvents="none";
      if(window.GGFIN){ GGFIN.film(clamp(q/Fk)); GGFIN.drive(q<Fk?0:(q-Fk)/(1-Fk),q>=Fk); }
      return;
    }
    if(window.GGFIN&&GGFIN.filmOff) GGFIN.filmOff();
    const Pk=.50, capX=.74;      /* the packing stops just before it would seal */
    if(q<Pk){
      render((q/Pk)*capX);
      if(window.GGFIN) GGFIN.drive(0,false);
      if(!FILM) wrap.style.opacity="";
      return;
    }
    render(capX);
    if(!window.GGFIN) return;
    GGFIN.drive((q-Pk)/(1-Pk),true);
    const cf=GGFIN.crossfade();
    wrap.style.opacity=(1-cf).toFixed(3);
    countIn.style.opacity=(1-cf).toFixed(3);
    aura.style.opacity="0";
    capEl.style.opacity=(1-cf).toFixed(3);
    leaves.forEach(L=>L.style.opacity=((1-cf)*.4).toFixed(2));
    sparks.forEach(p=>p.style.opacity="0");
  }
  const film=document.getElementById("packFilm");
  const capEl=scene.querySelector(".packCap");
  let FILM=false;
  if(typeof GGFrames!=="undefined"){
    GGFrames.attach(film); film.classList.add("on"); FILM=true;
    pack.style.height=(innerWidth<700?"640vh":"700vh");   /* room for the film and the campaign */
    /* start decoding the stills a little before the packaging scene is reached */
    if("IntersectionObserver" in window){
      const io=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ GGFrames.warm(); io.disconnect(); } },{rootMargin:"200% 0px"});
      io.observe(pack);
    } else GGFrames.warm();
  }
  function render(q){ renderCore(q); }
  function renderCore(q){
    /* the sky keeps drifting: the same flight, still going */
    sky.style.transform="translate3d(0,"+((q*-.14*H)|0)+"px,0) scale("+(1+q*.07).toFixed(3)+")";
    /* the camera settles onto the box as it fills */
    const settle=eout(seg(q,0,.70));
    tray.style.transform="rotateX("+(10.5-settle*7.5).toFixed(2)+"deg) translateY("+((1-settle)*14).toFixed(1)+"px)";

    let landed=0, latest=-1;
    const now=performance.now();
    /* scene 3: the platter materialises in place, with a sweep of light */
    const mat=eout(seg(q,.12,.30));
    tBody.style.opacity=mat.toFixed(3);
    tBody.style.transform="scale("+(.93+.07*mat).toFixed(4)+")";
    cellsEl.style.opacity=clamp(seg(q,.18,.32)).toFixed(3);
    const sw=seg(q,.18,.36);
    tSweep.style.opacity=(Math.sin(sw*Math.PI)).toFixed(3);
    tSweep.style.setProperty("--sw",(-40+sw*150).toFixed(1)+"%");
    const TW=tray.offsetWidth, TH=tray.offsetHeight, small=W<700;
    const rx=TW*(small?.40:.56), ry=TH*(small?.50:.66), cx=TW/2, cy=TH*.48;
    tiles.forEach((d,i)=>{
      const g=to[i];
      /* scene 1: rise up through the clouds */
      const up=eout(seg(q,i*.008,.10+i*.008));
      /* scene 2: a slow, graceful orbit around the platter */
      const ang=i*Math.PI*2/8 - Math.PI/2 + q*Math.PI*1.7 + (RM?0:now/9000);
      const depth=Math.sin(ang);
      const ox=cx+Math.cos(ang)*rx - g.w/2, oy=cy+depth*ry - g.h/2 + (1-up)*H*.9/trayK;
      /* scene 4: transform, then fly to the compartment */
      const s0=.28+i*.05, tr=seg(q,s0,s0+.035), fl=eout(seg(q,s0+.03,s0+.09));
      const x=ox+(g.x-ox)*fl, y=oy+(g.y-oy)*fl;
      const orbS=(.82+.22*(depth+1)/2)*(small?.9:1);
      const settle=fl>.9?1+Math.sin((fl-.9)/.1*Math.PI)*.035:1;
      const sc=(orbS+(1-orbS)*fl)*settle;
      d.style.transform="translate3d("+x.toFixed(1)+"px,"+y.toFixed(1)+"px,"+(40*(1-fl)).toFixed(1)+"px) scale("+sc.toFixed(3)+")";
      d.style.zIndex=fl>.98?4:(depth>0?7:3);
      d.style.setProperty("--d",(Math.min(g.w,g.h)*.94).toFixed(0)+"px");
      const ing=d.children[1], dish=d.children[0], fx=d.children[2];
      ing.style.opacity=(clamp(up*1.4)*(1-tr)).toFixed(3);
      ing.style.transform="scale("+(1+tr*.35).toFixed(3)+") rotate("+((RM?0:Math.sin(now/1300+i)*4)*(1-tr)).toFixed(2)+"deg)";
      dish.style.opacity=tr.toFixed(3);
      dish.style.transform="scale("+(.72+.28*eout(tr)).toFixed(3)+")";
      fx.style.opacity=(Math.sin(tr*Math.PI)*.95).toFixed(3);
      const L=labs[i];
      if(L){
        L.style.transform="translate3d("+(x+g.w*sc/2).toFixed(1)+"px,"+(y+g.h*sc*.5+Math.min(g.w,g.h)*.5*sc+6).toFixed(1)+"px,0) translateX(-50%)";
        L.style.opacity=(clamp(seg(q,.04,.10))*clamp(1-tr*2)).toFixed(3);
        L.textContent=tr>0?CATS.find(c=>c.key===order[i]).label:INGN[i];
      }
      if(tr>.5){ landed++; latest=i; }
    });

    /* golden burst behind the halo, fading once the box is full */
    const burst=seg(q,0,.12);
    aura.style.opacity=(clamp(burst*1.4)*clamp(1-seg(q,.52,.72))).toFixed(3);
    aura.style.transform="scale("+(RM?1:Math.max(.2,back(burst))).toFixed(3)+")";
    const ar=aura.getBoundingClientRect(), sr2=scene.getBoundingClientRect();
    const ax=ar.left-sr2.left, ay=ar.top-sr2.top;
    sparks.forEach((p,i)=>{
      const ph=((now/2600)+i*.071+q*.8)%1, ang=i*2.4;
      const r=(70+ (i%5)*46)*(.4+ph);
      p.style.transform="translate3d("+(ax+Math.cos(ang)*r).toFixed(0)+"px,"+(ay-ph*220+Math.sin(ang)*r*.4).toFixed(0)+"px,0) scale("+(.6+(i%3)*.4).toFixed(2)+")";
      p.style.opacity=(Math.sin(ph*Math.PI)*clamp(1-seg(q,.5,.68))*clamp(burst*2)).toFixed(2);
    });

    /* the counter names whatever just landed */
    const show=latest>=0 && q<.92;
    countIn.style.opacity=(show?1:0).toFixed(2);
    if(latest>=0 && latest!==shown){
      shown=latest;
      const cat=CATS.find(c=>c.key===order[latest]);
      nEl.textContent=pad(latest+1)+" / 08";
      catEl.textContent=cat.label;
      nmEl.textContent=INGN[latest]+"  \u2192  "+items[latest].nm;
    }

    const sealed=seg(q,.76,.88);
    band.style.opacity=sealed.toFixed(3);
    band.style.transform="scaleY("+(.6+sealed*.4).toFixed(3)+")";
    const s=seg(q,.84,.95);
    seal.style.opacity=s.toFixed(3);
    seal.style.transform="translate3d(0,"+((1-s)*12).toFixed(1)+"px,0)";
    seal.style.pointerEvents=s>.5?"auto":"none";

    /* leaves cross the frame on their own paths */
    leaves.forEach((L,i)=>{
      const sp=.7+(i%4)*.22, ph=(q*sp+i*.137)%1;
      const x=(i*.127+ph*1.22)%1.1-.05, y=1.12-ph*1.3;
      L.style.transform="translate3d("+(x*W).toFixed(0)+"px,"+(y*H).toFixed(0)+"px,0) rotate("+
        (ph*540+i*40).toFixed(0)+"deg) scale("+(.55+(i%3)*.3).toFixed(2)+")";
      L.style.opacity=(Math.sin(ph*Math.PI)*.5).toFixed(2);
    });
  }

  function onScroll(){ target=progress(); if(!raf) raf=requestAnimationFrame(tick); }
  let idle=0;
  function idleLoop(){
    idle=0;
    const r=pack.getBoundingClientRect();
    if(!RM && !FILM && r.top<H && r.bottom>0 && cur<.45){ if(!raf) master(cur); idle=requestAnimationFrame(idleLoop); }
  }
  addEventListener("scroll",()=>{ if(!idle) idle=requestAnimationFrame(idleLoop); },{passive:true});
  addEventListener("scroll",onScroll,{passive:true});
  let rt; addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(layout,120);});
  window.GGPACK={refresh(){ shown=-1; build(); layout(); }, items(){
    const any=typeof picks!=="undefined"&&Object.keys(picks).length;      /* skipped Beverage / Add-on stay out */
    return any?items.filter((it,i)=>!((order[i]==="drink"||order[i]==="addon")&&!picks[order[i]])):items; }};
  sky.style.backgroundImage="url("+SC.floor+")";
  layout(); onScroll();
})();
