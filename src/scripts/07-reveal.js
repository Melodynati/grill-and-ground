
(function(){
  const RM=matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. each section's heading wipes up, then its content follows in a stagger */
  const groups=[...document.querySelectorAll("section.facts, section#plan, section#pricing, section.builder, main section, body > section")]
    .filter(s=>!s.closest(".journey")&&!s.classList.contains("journey")&&!s.classList.contains("pack")&&!s.classList.contains("skyClose"));
  groups.forEach(sec=>{
    sec.querySelectorAll(".secHead h2, .bookRun").forEach(h=>h.classList.add("rv-head"));
    const items=sec.querySelectorAll(".secHead p, .fact, .block, .kpi, .tier, .steps li, .compare tr, .posBox, .certs, .factNote, .stepsWrap, .steps, .panel, .tray, .mathline, .close");
    items.forEach((el,i)=>{ el.classList.add("rv-item"); el.style.setProperty("--i",Math.min(i,10)); });
  });
  if(RM||!("IntersectionObserver" in window)){ groups.forEach(s=>s.classList.add("rv-on")); }
  else{
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("rv-on"); io.unobserve(e.target); }
    }),{threshold:0,rootMargin:"0px 0px -12% 0px"});   /* any part on screen: tall sections like the builder still reveal */
    groups.forEach(s=>io.observe(s));
    /* safety net: whatever the reader has already scrolled past is shown, even if an observer event was missed */
    const sweep=()=>groups.forEach(s=>{ if(!s.classList.contains("rv-on")&&s.getBoundingClientRect().top<innerHeight*.9) s.classList.add("rv-on"); });
    addEventListener("scroll",sweep,{passive:true}); setTimeout(sweep,1500);
  }

  /* 2. the headline numbers count up the first time they are seen */
  const counters=[...document.querySelectorAll(".fact b")].filter(b=>/\d/.test(b.textContent));
  const runCount=b=>{
    const raw=b.textContent, m=raw.match(/[\d,]+/); if(!m) return;
    const end=+m[0].replace(/,/g,""), pre=raw.slice(0,m.index), post=raw.slice(m.index+m[0].length);
    if(RM){ return; }
    const t0=performance.now(), dur=1400;
    const step=now=>{
      const k=Math.min(1,(now-t0)/dur), v=Math.round(end*(1-Math.pow(1-k,3)));
      b.textContent=pre+v.toLocaleString("en-US")+post;
      if(k<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if("IntersectionObserver" in window){
    const io2=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ runCount(e.target); io2.unobserve(e.target);} }),{threshold:.6});
    counters.forEach(b=>io2.observe(b));
  }

  /* 3. picking a dish sends its photo flying into your set */
  const panel=document.getElementById("panel");
  if(panel && !RM){
    panel.addEventListener("click",e=>{
      const card=e.target.closest(".dish"); if(!card) return;
      const wasOn=card.getAttribute("aria-checked")==="true";
      if(wasOn) return;                                  /* clearing, not choosing */
      const img=card.querySelector("img"); if(!img) return;
      const catKey=(typeof CATS!=="undefined"&&typeof step!=="undefined")?CATS[step].key:null;
      const from=img.getBoundingClientRect();
      const fly=document.createElement("div"); fly.className="flyer";
      fly.innerHTML='<img src="'+img.src+'" alt="">';
      Object.assign(fly.style,{left:from.left+"px",top:from.top+"px",width:from.width+"px",height:from.height+"px"});
      document.body.appendChild(fly);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        const tray=document.getElementById("tray"), bar=document.getElementById("stickyBar");
        const trayR=tray.getBoundingClientRect();
        const useTray=trayR.width>0 && trayR.top<innerHeight && trayR.bottom>0;
        const dest=(useTray?tray:bar).getBoundingClientRect();
        const tx=dest.left+dest.width/2-(from.left+from.width/2);
        const ty=(useTray?dest.top+80:dest.top+dest.height/2)-(from.top+from.height/2);
        const anim=fly.animate([
          {transform:"translate(0,0) scale(1) rotate(0deg)",opacity:1},
          {transform:"translate("+(tx*.45)+"px,"+(ty*.45-90)+"px) scale(.62) rotate(-8deg)",opacity:1,offset:.45},
          {transform:"translate("+tx+"px,"+ty+"px) scale(.18) rotate(6deg)",opacity:.15}
        ],{duration:760,easing:"cubic-bezier(.45,.05,.3,1)"});
        anim.onfinish=()=>{
          fly.remove();
          const tot=document.querySelector(".sum .tot");
          if(tot){ tot.classList.remove("bump"); void tot.offsetWidth; tot.classList.add("bump"); }
          const row=catKey&&document.querySelector('.trow[data-cat="'+catKey+'"]');
          if(row){ row.classList.remove("pop"); void row.offsetWidth; row.classList.add("pop"); }
        };
      }));
    },true);
  }
})();
