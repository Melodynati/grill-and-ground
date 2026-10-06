
/* =====================================================================
   Grill & Ground · Virtual Buffet — scenes 1-8 and the campaign
   - film(fp)      : scroll-scrubbed GSAP timeline over the packaging film
                     (float → bento → crystal lid → security seal → delivery
                     → doorstep → scan), with time-remapped cuts
   - drive(t,on)   : the SCAN. TASTE. PLAY. campaign (GSAP, autoplays)
   - debug(t)      : jump the campaign to t for testing
   ===================================================================== */
(function(){
  "use strict";
  const gsap=window.gsap;
  const RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $=id=>document.getElementById(id);
  const pack=$("pack"); if(!pack||!gsap) return;
  const scene=pack.querySelector(".packScene"), stage=$("finStage"), camp=$("camp"),
        film=$("packFilm"), back=$("filmBack");
  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
  const lerp=(a,b,t)=>a+(b-a)*t;
  let W=scene.clientWidth, H=scene.clientHeight, small=W<700;

  /* ---------------- order serial and the dynamic QR ---------------- */
  const d0=new Date();
  const SERIAL="GG-VB-"+String(d0.getFullYear()%100).padStart(2,"0")+String(d0.getMonth()+1).padStart(2,"0")+"-"+(1000+Math.floor(Math.random()*9000));
  /* each seal's QR opens the live site with the order serial */
  const SITE_URL="https://melodynati.github.io/grill-and-ground/";
  const QR_URL=SITE_URL+"?o="+SERIAL;
  const QR=(function(){
    try{ const q=qrcode(0,"M"); q.addData(QR_URL); q.make();
      return {n:q.getModuleCount(), dark:(r,c)=>q.isDark(r,c)}; }
    catch(e){ return {n:QRM.length, dark:(r,c)=>QRM[r][c]==="1"}; }   /* static code as a fallback */
  })();
  function qrSVG(fg){
    const n=QR.n; let d="";
    for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(QR.dark(r,c)) d+="M"+c+" "+r+"h1v1h-1z";
    return '<svg viewBox="-3 -3 '+(n+6)+' '+(n+6)+'" role="img" aria-label="QR code for order '+SERIAL+'"><rect x="-3" y="-3" width="'+(n+6)+'" height="'+(n+6)+'" fill="#fff"/><path d="'+d+'" fill="'+fg+'"/></svg>';
  }
  $("ocQ").innerHTML=qrSVG("#17120A"); $("sealQR").innerHTML=qrSVG("#17120A");
  $("ocSerial").textContent="Nº "+SERIAL; $("sealSerial").textContent="Nº "+SERIAL;

  /* ======================= PART 1 · THE FILM ======================= */
  /* film seconds by scroll position: the hard cuts get a little scroll of their own,
     so each one happens under a dissolve, a white-out or a golden flash */
  const K=[[0,0],[.36,6.11],[.40,6.17],[.41,6.25],[.52,7.13],[.565,7.18],[.585,7.26],[.62,7.55],
           [.76,10.06],[.775,10.11],[.785,10.18],[.90,12.48],[.915,12.53],[.925,12.60],[1,17.12]];   /* cuts at 6.21, 7.22, 10.14, 12.55 s */
  function vtime(f){
    for(let i=1;i<K.length;i++) if(f<=K[i][0]){ const a=K[i-1], b=K[i]; return a[1]+(b[1]-a[1])*((f-a[0])/((b[0]-a[0])||1)); }
    return K[K.length-1][1];
  }
  let pending=null;
  function seek(t){
    if(!film||film.readyState<1) return;
    t=Math.min(t,(film.duration||17.17)-.04);
    if(film.seeking){ pending=t; return; }
    if(Math.abs(film.currentTime-t)>.02) film.currentTime=t;
  }
  if(film) film.addEventListener("seeked",()=>{ if(pending!=null){ const p=pending; pending=null; seek(p); } });

  const CAPS=[
    [0,.15,"01 In the cloud","Fresh from the ground, rising into the cloud."],
    [.16,.33,"02 Into the bento","The main course takes the largest seat."],
    [.335,.41,"03 The crystal lid","Closed slowly, sealed in light."],
    [.42,.52,"04 Security seal","One serial. One live QR. Tamper-evident."],
    [.525,.60,"05 On its way","Your Virtual Buffet is on its way to your door."],
    [.63,.76,"06 Delivered","Warm, sealed and right on time."],
    [.79,.90,"07 Scan the seal","Point your camera at the QR."],
    [.93,1.2,"08 Unlock","Every seal opens the campaign."]];
  const capBox=$("fCaps");
  capBox.innerHTML=CAPS.map(c=>'<div class="fCap"><p>'+c[2]+'</p><h2>'+c[3]+'</h2></div>').join("");
  const capEls=[...capBox.children];
  const rushEls=[...$("rush").children];
  const F={zoom:1,blur:0,bright:1,white:0,gold:0,ox:50,home:0,streak:0,eta:25};
  let ftl=null, filmOn=false, lastFp=0, picksSig="";

  function buildFilm(){
    const keep=ftl?ftl.progress():lastFp;
    if(ftl) ftl.kill();
    Object.assign(F,{zoom:1,blur:0,bright:1,white:0,gold:0,ox:50,home:0,streak:0,eta:25});
    const tl=gsap.timeline({paused:true,defaults:{ease:"power2.inOut"}});
    /* scenes 1-3: a slow dolly through the float, the bento and the lid */
    tl.fromTo(F,{zoom:1},{zoom:1.05,duration:.36,ease:"sine.inOut"},0);
    tl.to(F,{blur:5,bright:1.08,duration:.018,ease:"power2.in"},.384)
      .to(F,{blur:0,bright:1,duration:.022,ease:"power2.out"},.404)
      .to(F,{zoom:1,duration:.09,ease:"sine.inOut"},.41);
    /* scene 5: the package flies forward, the camera follows it through the cloud */
    tl.to(F,{zoom:1.7,duration:.078,ease:"power2.in"},.50)
      .to(F,{blur:12,duration:.035,ease:"power2.in"},.542)
      .to(F,{white:1,duration:.03,ease:"power2.in"},.548)
      .fromTo(F,{streak:0},{streak:1,duration:.03,ease:"power1.in"},.53)
      .to(F,{streak:0,duration:.008,ease:"none"},.577)
      .to(F,{home:1,eta:0,duration:.01,ease:"none"},.579)
      .set(F,{zoom:1.32},.583)                                   /* under full white: nothing jumps on screen */
      .to(F,{ox:62,duration:.004,ease:"none"},.581)
      .to(F,{zoom:1,duration:.085,ease:"power3.out"},.586)
      .to(F,{blur:0,duration:.04,ease:"power2.out"},.586)
      .to(F,{white:0,duration:.045,ease:"power2.out"},.588);
    tl.fromTo(F,{eta:25},{eta:1,duration:.05,ease:"power1.in"},.525);
    rushEls.forEach((el,i)=>{
      const a=i/rushEls.length*Math.PI*2+.4, r=Math.max(W,H)*(.55+(i%3)*.12);
      tl.fromTo(el,{x:Math.cos(a)*r*.12,y:Math.sin(a)*r*.08,scale:.35,autoAlpha:0},
                   {x:Math.cos(a)*r,y:Math.sin(a)*r*.7,scale:2.8,autoAlpha:.95,duration:.042,ease:"power2.in"},.506+i*.0045);
      tl.set(el,{autoAlpha:0},.584);
    });
    /* scene 6: on the doorstep, a slow push in */
    tl.to(F,{zoom:1.05,duration:.09,ease:"sine.inOut"},.672)
      .to(F,{blur:5,duration:.012,ease:"power2.in"},.764)
      .to(F,{ox:57,duration:.004,ease:"none"},.774)
      .to(F,{blur:0,zoom:1,duration:.02,ease:"power2.out"},.778);
    /* scene 7 into 8: the scan lands in a golden flash */
    tl.to(F,{gold:1,duration:.014,ease:"power2.in"},.903)
      .to(F,{ox:50,duration:.004,ease:"none"},.918)
      .to(F,{gold:0,duration:.045,ease:"power2.out"},.924)
      .to(F,{zoom:1.03,duration:.07,ease:"sine.inOut"},.93);

    /* captions */
    capEls.forEach((el,i)=>{
      const c=CAPS[i], a=Math.max(.008,c[0]);
      tl.fromTo(el,{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.018,ease:"power3.out"},a);
      if(c[1]<1) tl.to(el,{autoAlpha:0,y:-12,duration:.014,ease:"power2.in"},c[1]-.014);
    });

    /* scene 4: the seal card, with the order's own QR and the guest's picks */
    const oc=$("orderCard"), thumbs=()=>[...$("ocPicks").children];
    gsap.set(oc,small?{xPercent:-50,yPercent:0}:{xPercent:0,yPercent:-50});
    tl.fromTo(oc,{autoAlpha:0,x:small?0:70,y:small?40:0,rotationY:small?0:-16,transformPerspective:900},
                 {autoAlpha:1,x:0,y:0,rotationY:0,duration:.026,ease:"back.out(1.5)"},.425)
      .fromTo(thumbs(),{autoAlpha:0,scale:.55},{autoAlpha:1,scale:1,duration:.012,stagger:.0028,ease:"back.out(2.2)"},.44)
      .to(oc,{autoAlpha:0,x:small?0:50,y:small?30:0,duration:.014,ease:"power2.in"},.508);

    /* scene 5: the route to the door */
    const rt=$("route");
    gsap.set(rt,{xPercent:-50});
    tl.fromTo(rt,{autoAlpha:0,y:26,scale:.94},{autoAlpha:1,y:0,scale:1,duration:.018,ease:"back.out(1.6)"},.514)
      .fromTo("#routeFill",{scaleX:0},{scaleX:1,duration:.055,ease:"power1.inOut"},.522)
      .fromTo("#routeDot",{left:"0%"},{left:"100%",duration:.055,ease:"power1.inOut"},.522)
      .to(rt,{autoAlpha:0,duration:.006,ease:"none"},.576);

    /* scene 6: delivered */
    const dt=$("dToast");
    gsap.set(dt,{xPercent:-50,left:"50%",top:small?"auto":"18%",bottom:small?"16px":"auto"});
    tl.fromTo(dt,{autoAlpha:0,y:-22,scale:.84},{autoAlpha:1,y:0,scale:1,duration:.02,ease:"back.out(1.9)"},.626)
      .fromTo(dt,{"--dash":24},{"--dash":0,duration:.02,ease:"power2.out"},.636)
      .fromTo(dt,{"--ring":.9,"--rs":1},{"--ring":0,"--rs":1.9,duration:.03,ease:"power2.out"},.65)
      .to(dt,{autoAlpha:0,y:-14,duration:.014,ease:"power2.in"},.744);

    /* scene 7: scanning, then verified */
    const sc=$("scanChip");
    gsap.set(sc,{xPercent:-50});
    tl.fromTo(sc,{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.016,ease:"back.out(1.6)"},.79)
      .fromTo("#scanBar",{scaleX:0},{scaleX:1,duration:.108,ease:"power1.inOut"},.795)
      .set(sc,{attr:{class:"scanChip ok"}},.903)
      .fromTo(sc,{scale:1},{scale:1.07,duration:.008,yoyo:true,repeat:1,ease:"power2.out"},.903)
      .to(sc,{autoAlpha:0,y:16,duration:.014,ease:"power2.in"},.962);

    tl.set({}, {}, 1);
    ftl=tl; tl.progress(keep);
  }
  function refreshPicks(){
    const items=(window.GGPACK&&GGPACK.items)?GGPACK.items():[];
    const sig=items.map(i=>i&&i.id).join(",");
    if(sig===picksSig) return false;
    picksSig=sig;
    $("ocPicks").innerHTML=items.map(it=>it&&PH[it.id]?'<img src="'+PH[it.id]+'" alt="'+(it.nm||"").replace(/"/g,"")+'">':'<span></span>').join("");
    return true;
  }
  const wEl=$("whiteout"), gEl=$("goldFlash"), sEl=$("streaks"), etaEl=$("eta");
  let lastEta=-1;
  function applyFilm(fp){
    const z=F.zoom, f=[];
    if(F.blur>.05) f.push("blur("+F.blur.toFixed(2)+"px)");
    if(Math.abs(F.bright-1)>.002) f.push("brightness("+F.bright.toFixed(3)+")");
    film.style.filter=f.length?f.join(" "):"none";
    film.style.transform=(small?"translateY(-50%) ":"")+"scale("+z.toFixed(4)+")";
    film.style.objectPosition=(small?F.ox.toFixed(1):"50")+"% 50%";
    film.style.opacity="1";
    if(back) back.style.opacity=(small?.35+F.home*.65:0).toFixed(3);
    wEl.style.opacity=F.white.toFixed(3);
    gEl.style.opacity=F.gold.toFixed(3);
    sEl.style.opacity=(F.streak*.9).toFixed(3);
    sEl.style.transform="rotate("+(fp*140).toFixed(2)+"deg) scale("+(1+F.streak*.25).toFixed(3)+")";
    const e=Math.max(1,Math.round(F.eta));
    if(e!==lastEta){ lastEta=e; etaEl.textContent=F.home>.5?"Arrived":"Arriving in "+e+" min"; }
  }
  function film_(fp){
    if(!film) return;
    if(refreshPicks()&&ftl) buildFilm();
    if(!ftl) buildFilm();
    if(!filmOn){ filmOn=true; stage.style.visibility="visible"; }
    lastFp=fp;
    ftl.progress(fp);
    seek(vtime(fp));
    applyFilm(fp);
  }
  function filmOff(){
    filmOn=false; if(ftl) ftl.progress(0);
    [wEl,gEl,sEl].forEach(e=>e.style.opacity="0");
    stage.style.visibility="hidden";
  }

  /* ===================== PART 2 · THE CAMPAIGN ===================== */
  const IC={
    gift:'<path d="M4 10h16v10H4zM2.5 7h19v3h-19zM12 7v13M12 7c-2-4-6.5-4-6.5-1.3S12 7 12 7zm0 0c2-4 6.5-4 6.5-1.3S12 7 12 7z" fill="none" stroke="#5A3A0E" stroke-width="1.7" stroke-linejoin="round"/>',
    side:'<path d="M6 9h12l-1.6 11H7.6zM8 9l-1-5M11 9V3M14 9l1.2-5.5M17 9l1.8-4" fill="none" stroke="#5A3A0E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    drink:'<path d="M6 7h12l-1.4 13H7.4zM5 7h14M13 7l2.5-4.5h3" fill="none" stroke="#5A3A0E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 12h10" stroke="#5A3A0E" stroke-width="1.4"/>',
    pct:'<circle cx="7.5" cy="7.5" r="2.6" fill="none" stroke="#5A3A0E" stroke-width="1.8"/><circle cx="16.5" cy="16.5" r="2.6" fill="none" stroke="#5A3A0E" stroke-width="1.8"/><path d="M18.5 5.5l-13 13" stroke="#5A3A0E" stroke-width="1.8" stroke-linecap="round"/>',
    up:'<path d="M3.5 9l4.2 3.6L12 5l4.3 7.6L20.5 9l-1.8 9.5H5.3z" fill="none" stroke="#5A3A0E" stroke-width="1.7" stroke-linejoin="round"/><path d="M5.5 21h13" stroke="#5A3A0E" stroke-width="1.7" stroke-linecap="round"/>',
    key:'<circle cx="8" cy="12" r="4" fill="none" stroke="#5A3A0E" stroke-width="1.8"/><path d="M12 12h9M18 12v3M21 12v2.4" stroke="#5A3A0E" stroke-width="1.8" stroke-linecap="round"/>',
    trophy:'<path d="M7 4h10v5a5 5 0 01-10 0zM7 6H4v1.5A3.5 3.5 0 007.5 11M17 6h3v1.5a3.5 3.5 0 01-3.5 3.5M12 14v4M8 21h8M9.5 18h5" fill="none" stroke="#5A3A0E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'};
  const REW=[
    {k:"UPG",t:"Free Buffet Upgrade",s:"Step up to the premium set",w:8,i:"up"},
    {k:"SIDE",t:"Free Side Dish",s:"Any side, on the house",w:26,i:"side"},
    {k:"D10",t:"10% Discount",s:"Off your next Virtual Buffet",w:22,i:"pct"},
    {k:"DRK",t:"Free Drink",s:"A drink with your next set",w:26,i:"drink"},
    {k:"EXC",t:"Exclusive Menu Access",s:"Members-only dishes, first",w:5,i:"key"},
    {k:"D20",t:"20% Discount",s:"Off your next Virtual Buffet",w:12,i:"pct"},
    {k:"GRD",t:"Monthly Grand Prize",s:"Entered in this month's draw",w:1,i:"trophy",grand:true}];
  const REPS=8, NR=REW.length;
  const track=$("reelTrack"), reel=$("reel"), frameEl=reel.querySelector(".reelFrame");
  track.innerHTML=Array.from({length:REPS*NR},(_,j)=>{ const r=REW[j%NR];
    return '<div class="rc'+(r.grand?" grand":"")+'"><span class="ic"><svg viewBox="0 0 24 24">'+IC[r.i]+'</svg></span><b>'+r.t+'</b><small>'+r.s+'</small></div>'; }).join("");
  const cards=[...track.children];
  let cw=150, gap=14, rx=0, ridx=NR+2, hot=-1, spinTl=null, spun=false, spinning=false;
  const xOf=i=>reel.clientWidth/2-(i*(cw+gap)+cw/2);
  function setReel(x){
    rx=x; track.style.transform="translate3d("+x.toFixed(1)+"px,-50%,0)";
    const c=Math.round((reel.clientWidth/2-x-cw/2)/(cw+gap));
    for(let j=Math.max(0,c-4);j<=Math.min(cards.length-1,c+4);j++){
      const d=Math.abs((j*(cw+gap)+cw/2)-(reel.clientWidth/2-x))/(cw+gap);
      cards[j].style.transform="scale("+(1+.09*Math.max(0,1-d)).toFixed(3)+")";
    }
    if(c!==hot){
      if(cards[hot]) cards[hot].classList.remove("hot");
      if(cards[c]) cards[c].classList.add("hot");
      if(spinning&&!RM) gsap.fromTo(frameEl,{scale:1.045},{scale:1,duration:.14,ease:"power2.out",overwrite:true});
      hot=c;
    }
  }
  function layoutReel(){
    cw=small?108:148; gap=small?10:14;
    reel.style.setProperty("--cw",cw+"px"); track.style.gap=gap+"px";
    track.style.left="0px"; gsap.set(frameEl,{xPercent:-50,yPercent:-50});
    setReel(xOf(ridx));
  }
  function pickWinner(){
    let r=Math.random()*REW.reduce((a,b)=>a+b.w,0);
    for(let i=0;i<NR;i++){ r-=REW[i].w; if(r<0) return i; } return 1;
  }
  const winBox=$("winBox"), winName=$("winName"), winCode=$("winCode");
  function showWin(j,cardIdx,instant){
    const r=REW[j], card=cards[cardIdx];
    winName.textContent=r.t;
    winCode.textContent="Claim code  VB-"+r.k+"-"+SERIAL.slice(-4);
    card.classList.add("won");
    if(instant){ gsap.set(winBox,{autoAlpha:1,y:0,scale:1}); return; }
    gsap.timeline()
      .to(card,{rotationY:360,scale:1.16,duration:1,ease:"back.out(1.7)"})
      .to(card,{scale:1.08,duration:.5,ease:"sine.inOut"},">-.15");
    gsap.fromTo(winBox,{autoAlpha:0,y:18,scale:.9},{autoAlpha:1,y:0,scale:1,duration:1.1,ease:"elastic.out(1,.6)",delay:.15});
    const cr=card.getBoundingClientRect(), sr=scene.getBoundingClientRect();
    burst(cr.left-sr.left+cr.width/2,cr.top-sr.top+cr.height/2,130,1.15,-Math.PI/2,Math.PI*2);
  }
  function spin(){
    if(spinning) return;
    spun=true;
    cards.forEach(c=>{ c.classList.remove("won"); gsap.set(c,{rotationY:0}); });
    gsap.to(winBox,{autoAlpha:0,y:10,duration:.25});
    const j=pickWinner();
    ridx=((ridx%NR)+NR)%NR+NR;                /* same card, one lap in: room to run */
    setReel(xOf(ridx));
    const target=NR*(REPS-2)+j, st={x:rx};
    if(RM){ ridx=target; setReel(xOf(target)); showWin(j,target,true); ridx=NR+j; return; }
    spinning=true;
    spinTl=gsap.timeline({onComplete:()=>{ spinning=false; showWin(j,target,false); ridx=target; }})
      .to(st,{x:rx+cw*.45,duration:.42,ease:"power2.out",onUpdate:()=>setReel(st.x)})           /* wind up */
      .to(st,{x:xOf(target)-cw*.38,duration:3.9,ease:"power4.out",onUpdate:()=>setReel(st.x)})  /* release, coast, slow */
      .to(st,{x:xOf(target),duration:1,ease:"elastic.out(1,.42)",onUpdate:()=>setReel(st.x)});  /* settle on the prize */
  }
  $("spinBtn").addEventListener("click",spin);

  /* headline letters */
  const campH=$("campH");
  campH.innerHTML="SCAN. TASTE. PLAY.".split(" ").map(w=>'<span class="w">'+[...w].map(ch=>'<span class="l">'+ch+'</span>').join("")+'</span>').join(" ");
  const letters=[...campH.querySelectorAll(".l")];

  /* floating coupons and gifts */
  const FLO=[
    ['coupon','10%'],['gift'],['coupon','FREE'],['spark'],['gift'],['coupon','20%'],['spark'],['coupon','VIP'],['gift'],['spark']];
  const SPOTS_M=[[2,4],[78,17],[-6,56],[88,44],[2,94],[76,93],[42,1],[88,22],[44,96],[-2,30]];
  const SPOTS=[[8,20],[86,16],[5,64],[93,56],[16,84],[80,82],[30,10],[70,8],[90,36],[10,42]];
  const svgFor=f=>{
    if(f[0]==="coupon") return '<svg width="86" height="46" viewBox="0 0 86 46"><defs><linearGradient id="cpG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1C2"/><stop offset=".45" stop-color="#E2B04E"/><stop offset=".7" stop-color="#FCE6A4"/><stop offset="1" stop-color="#C38B2E"/></linearGradient></defs><path d="M6 2h74a4 4 0 014 4v9a8 8 0 000 16v9a4 4 0 01-4 4H6a4 4 0 01-4-4v-9a8 8 0 000-16V6a4 4 0 014-4z" fill="url(#cpG)"/><path d="M60 6v34" stroke="#8A5A17" stroke-width="1.4" stroke-dasharray="3 3"/><text x="31" y="29" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-weight="700" font-size="17" fill="#4A2E08">'+f[1]+'</text></svg>';
    if(f[0]==="gift") return '<svg width="54" height="56" viewBox="0 0 54 56"><defs><linearGradient id="gfG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2D2416"/><stop offset="1" stop-color="#120D07"/></linearGradient><linearGradient id="gfR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C38B2E"/><stop offset=".5" stop-color="#FFE7A3"/><stop offset="1" stop-color="#C38B2E"/></linearGradient></defs><rect x="5" y="22" width="44" height="31" rx="3" fill="url(#gfG)"/><rect x="2" y="14" width="50" height="10" rx="2" fill="#241B10"/><rect x="23" y="14" width="8" height="39" fill="url(#gfR)"/><path d="M27 14c-5-11-17-10-14-3 2 4 14 3 14 3zm0 0c5-11 17-10 14-3-2 4-14 3-14 3z" fill="none" stroke="url(#gfR)" stroke-width="3"/></svg>';
    return '<svg width="34" height="34" viewBox="0 0 34 34"><path d="M17 1c1.5 9 6 13.5 16 16-10 2.5-14.5 7-16 16-1.5-9-6-13.5-16-16 10-2.5 14.5-7 16-16z" fill="#FFE7A3"/></svg>';
  };
  const campIn=camp.querySelector(".campIn");
  const floats=FLO.map((f,i)=>{ const d=document.createElement("div"); d.className="floaty";
    const sp=small?SPOTS_M[i]:SPOTS[i]; d.style.left=sp[0]+"%"; d.style.top=sp[1]+"%"; d.innerHTML=svgFor(f);
    if(small) d.style.transform="scale(.62)";
    camp.insertBefore(d,campIn); return d; });
  let drift=[];
  function startDrift(){ if(RM||drift.length) return;
    drift=floats.map((d,i)=>gsap.to(d.firstChild,{y:(i%2?1:-1)*(10+i%3*6),x:(i%3-1)*8,rotation:(i%2?1:-1)*(6+i%4*3),
      duration:2.4+(i%4)*.55,ease:"sine.inOut",yoyo:true,repeat:-1})); }
  function stopDrift(){ drift.forEach(t=>t.kill()); drift=[]; floats.forEach(d=>gsap.set(d.firstChild,{clearProps:"transform"})); }

  /* ---------- particles: confetti, golden dust, sparkles ---------- */
  const fx=$("fxCv"), fg=fx.getContext("2d");
  let FDPR=1, parts=[], dust=[];
  const CONF=["#FFE3A3","#E9C46A","#C99238","#FFF6DA","#F4D58D","#2F5A34","#E86A4A","#FFFFFF"];
  function burst(x,y,n,power,dir,spread){
    if(RM) return;
    for(let i=0;i<n;i++){
      const a=dir+(Math.random()-.5)*spread, v=(380+Math.random()*620)*power;
      parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-120*power,r:Math.random()*6.28,vr:(Math.random()-.5)*14,
        f:Math.random()*6.28,vf:6+Math.random()*10,w:6+Math.random()*7,h:3+Math.random()*5,
        c:CONF[(Math.random()*CONF.length)|0],life:2.6+Math.random()*1.6,t:0,star:Math.random()<.18});
    }
  }
  function sizeFx(){ FDPR=Math.min(1.5,devicePixelRatio||1); fx.width=Math.round(W*FDPR); fx.height=Math.round(H*FDPR); }
  function star(x,y,s){ fg.beginPath(); fg.moveTo(x,y-s); fg.quadraticCurveTo(x,y,x+s,y); fg.quadraticCurveTo(x,y,x,y+s);
    fg.quadraticCurveTo(x,y,x-s,y); fg.quadraticCurveTo(x,y,x,y-s); fg.fill(); }
  let lastNow=0;
  function stepFx(now){
    const dt=Math.min(.05,lastNow?(now-lastNow)/1000:.016); lastNow=now;
    fg.setTransform(FDPR,0,0,FDPR,0,0); fg.clearRect(0,0,W,H);
    /* golden dust rises slowly and twinkles */
    if(!RM){
      while(dust.length<70) dust.push({x:Math.random()*W,y:H+Math.random()*H*.2,v:14+Math.random()*30,s:.8+Math.random()*2.2,p:Math.random()*6.28,dr:(Math.random()-.5)*16});
      fg.globalCompositeOperation="lighter";
      dust.forEach(d=>{ d.y-=d.v*dt; d.x+=Math.sin(now/1400+d.p)*d.dr*dt; if(d.y<-10){ d.y=H+10; d.x=Math.random()*W; }
        const tw=.35+.65*Math.pow(Math.max(0,Math.sin(now/600+d.p)),3);
        fg.fillStyle="rgba(255,214,120,"+(tw*.75).toFixed(3)+")"; fg.beginPath(); fg.arc(d.x,d.y,d.s,0,6.283); fg.fill();
        if(tw>.92){ fg.fillStyle="rgba(255,248,220,.9)"; star(d.x,d.y,d.s*4.5); } });
      fg.globalCompositeOperation="source-over";
    }
    /* confetti: gravity, air drag, a flutter as each piece turns */
    for(let i=parts.length-1;i>=0;i--){
      const p=parts[i]; p.t+=dt;
      if(p.t>p.life||p.y>H+40){ parts.splice(i,1); continue; }
      p.vx*=Math.pow(.18,dt); p.vy=p.vy*Math.pow(.32,dt)+780*dt; p.x+=p.vx*dt+Math.sin(p.f)*18*dt; p.y+=p.vy*dt;
      p.r+=p.vr*dt; p.f+=p.vf*dt;
      const a=clamp((p.life-p.t)/.6);
      fg.save(); fg.globalAlpha=a; fg.translate(p.x,p.y); fg.rotate(p.r);
      fg.fillStyle=p.c;
      if(p.star){ fg.globalCompositeOperation="lighter"; star(0,0,p.w*.9*(.6+.4*Math.abs(Math.cos(p.f)))); }
      else { fg.scale(1,Math.cos(p.f)); fg.fillRect(-p.w/2,-p.h/2,p.w,p.h); }
      fg.restore();
    }
  }

  /* ---------- the campaign timeline ---------- */
  let ctl=null, active=false, playing=false, lastT=0, origin={x:0,y:0}, bursts=[];
  const DUR=3.4, SPIN_AT=2.55;
  function filmPoint(fx_,fy_){
    /* where a point of the film frame lands on screen (object-fit: cover) */
    if(!film||!film.videoWidth) return {x:W*.66,y:H*.74};
    const er=film.getBoundingClientRect(), sr=scene.getBoundingClientRect();
    const vw=film.videoWidth, vh=film.videoHeight, k=Math.max(er.width/vw,er.height/vh);
    const dw=vw*k, dh=vh*k, ox=(small?F.ox:50)/100;
    return {x:er.left-sr.left+(er.width-dw)*ox+fx_*dw, y:er.top-sr.top+(er.height-dh)/2+fy_*dh};
  }
  function buildCamp(){
    const keep=ctl?ctl.progress():0;
    if(ctl) ctl.kill();
    origin=filmPoint(.705,.83);
    origin.x=clamp(origin.x,0,W); origin.y=clamp(origin.y,0,H);
    gEl.style.setProperty("--fx",(origin.x/W*100).toFixed(1)+"%"); gEl.style.setProperty("--fy",(origin.y/H*100).toFixed(1)+"%");
    const R=Math.hypot(Math.max(origin.x,W-origin.x),Math.max(origin.y,H-origin.y))+20;
    const tl=gsap.timeline({paused:true});
    tl.set(camp,{autoAlpha:1},.001)
      .fromTo(camp,{clipPath:"circle(0px at "+origin.x.toFixed(0)+"px "+origin.y.toFixed(0)+"px)"},
                   {clipPath:"circle("+R.toFixed(0)+"px at "+origin.x.toFixed(0)+"px "+origin.y.toFixed(0)+"px)",duration:1.05,ease:"expo.inOut"},0)
      .fromTo("#campKick",{autoAlpha:0,y:12,letterSpacing:".5em"},{autoAlpha:1,y:0,letterSpacing:".16em",duration:.7,ease:"power3.out"},.55)
      .fromTo(letters,{autoAlpha:0,yPercent:115,rotationX:-80,scale:.8},
                      {autoAlpha:1,yPercent:0,rotationX:0,scale:1,duration:.75,stagger:.04,ease:"back.out(2.2)"},.62)
      .fromTo(".campP",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},1.25)
      .fromTo(reel,{autoAlpha:0,y:34,scale:.95},{autoAlpha:1,y:0,scale:1,duration:.8,ease:"power3.out"},1.45)
      .fromTo(floats,{autoAlpha:0,scale:.3,y:50},{autoAlpha:1,scale:1,y:0,duration:.9,stagger:.07,ease:"back.out(1.8)"},1.2)
      .fromTo("#sealCard",{autoAlpha:0,x:40},{autoAlpha:1,x:0,duration:.7,ease:"back.out(1.4)"},2.0)
      .fromTo(".campBtns",{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},2.3)
      .fromTo(".campNote",{autoAlpha:0},{autoAlpha:1,duration:.6},2.5)
      .set({}, {}, DUR);
    ctl=tl; tl.progress(keep);
    bursts=[[.32,()=>burst(origin.x,origin.y,110,1.05,-Math.PI/2,1.9)],
            [1.0,()=>{ burst(0,H*.62,80,1.1,-Math.PI/4,.7); burst(W,H*.62,80,1.1,-Math.PI*3/4,.7); }]];
  }
  function resetCamp(){
    if(spinTl){ spinTl.kill(); spinTl=null; } spinning=false; spun=false;
    cards.forEach(c=>{ c.classList.remove("won","hot"); gsap.set(c,{rotationY:0,scale:1}); });
    gsap.set(winBox,{autoAlpha:0}); hot=-1; ridx=NR+2; layoutReel();
    parts=[]; stopDrift(); camp.classList.remove("live");
    bursts.forEach(b=>b.done=false);
  }
  function tick(now){
    if(!active) return;
    const t=ctl.time();
    bursts.forEach(b=>{ if(!b.done&&t>=b[0]){ b.done=true; if(t<b[0]+.5) b[1](); } });
    if(t>.9) startDrift();
    camp.classList.toggle("live",t>1.2);
    if(!spun&&t>=SPIN_AT) spin();
    stepFx(now);
  }
  function activate(){
    active=true; buildCamp(); sizeFx(); lastNow=0;
    gsap.ticker.add(tickW);
    if(RM){ ctl.progress(1); spin(); }
  }
  const tickW=()=>tick(performance.now());
  function deactivate(){
    active=false; playing=false; gsap.ticker.remove(tickW);
    if(ctl) ctl.pause(0);
    gsap.set(camp,{autoAlpha:0});
    resetCamp(); fg.clearRect(0,0,fx.width,fx.height);
  }
  gsap.set(camp,{autoAlpha:0});
  layoutReel();

  $("finReplay").addEventListener("click",()=>{
    resetCamp();
    if(window.GGPACK&&film&&film.classList.contains("on")){
      /* replay the whole journey: back to the top of the packaging scene */
      const top=pack.getBoundingClientRect().top+scrollY;
      scrollTo({top:top+2,behavior:RM?"auto":"smooth"});
      return;
    }
    ctl.restart(); playing=true;
  });

  let rsT;
  addEventListener("resize",()=>{ clearTimeout(rsT); rsT=setTimeout(()=>{
    W=scene.clientWidth; H=scene.clientHeight; small=W<700;
    layoutReel(); if(ftl) buildFilm(); if(active){ buildCamp(); sizeFx(); }
  },140); });

  window.GGFIN={
    serial:SERIAL, url:QR_URL,
    film:film_, filmOff,
    drive(t,on){
      if(on&&!active){ W=scene.clientWidth; H=scene.clientHeight; small=W<700; activate(); }
      if(!on&&active){ deactivate(); }
      if(!on){ lastT=0; return; }
      if(!playing&&!RM){ playing=true; ctl.play(); }
      if(t>lastT+1e-4&&t>ctl.progress()) ctl.progress(t);     /* scrolling ahead pushes the show forward */
      lastT=t;
    },
    crossfade(){ return ctl?clamp(ctl.time()/.45):0; },
    debug(t,opt){
      W=scene.clientWidth; H=scene.clientHeight; small=W<700;
      if(!active) activate();
      playing=false; ctl.pause(); ctl.progress(t);
      if(opt&&opt.win){ const j=opt.win===true?0:opt.win; if(spinTl) spinTl.kill(); spinning=false; spun=true;
        const target=NR*(REPS-2)+j; setReel(xOf(target)); showWin(j,target,true); }
    }
  };
})();
