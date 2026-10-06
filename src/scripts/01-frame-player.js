/* The packing film plays from embedded stills drawn on a canvas instead of a <video>:
   scrubbing still frames is smooth in every browser, and hosts that block blob: video still work.
   attach(canvas) gives the canvas the parts of the video API the scenes use:
   currentTime, duration, readyState, seeking, videoWidth/Height, play(), pause(),
   playbackRate, paused, ended, and an "ended" event. CSS object-fit still crops it. */
window.GGFrames=(function(){
  const FPS=16, N=PACK_FRAMES.length, DUR=N/FPS, W=960, H=540;
  const CUTS=[6.208,7.219,10.135,12.552];                 /* hard cuts: never blend across these */
  const imgs=new Array(N), subs=new Set();
  function img(i){
    if(!imgs[i]){ const im=new Image(); im.decoding="async";
      im.onload=()=>{ im.ok=true; subs.forEach(f=>f(i)); };
      im.src="data:image/webp;base64,"+PACK_FRAMES[i]; imgs[i]=im; }
    return imgs[i];
  }
  img(0);
  let warmed=false;
  function warm(){ if(warmed) return; warmed=true; for(const s of [8,4,2,1]) for(let i=0;i<N;i+=s) img(i); }
  const shot=t=>CUTS.filter(c=>c<=t).length;
  function attach(cv){
    cv.width=W; cv.height=H;
    const ctx=cv.getContext("2d");
    let t=0, rate=1, playing=false, ended=false, last=0, raf=0;
    function pick(i){                                    /* the nearest loaded still from the same shot */
      const sh=shot(i/FPS);
      for(let d=0;d<N;d++){
        for(const j of [i-d,i+d]) if(j>=0&&j<N&&imgs[j]&&imgs[j].ok&&shot(j/FPS)===sh) return imgs[j];
      }
      return null;
    }
    function draw(){
      const f=Math.min(N-1,t*FPS), i0=Math.floor(f), i1=Math.min(N-1,i0+1), fr=f-i0;
      img(i0); img(i1);
      const a=(imgs[i0].ok?imgs[i0]:pick(i0)); if(!a) return;
      ctx.globalAlpha=1; ctx.drawImage(a,0,0,W,H);
      if(fr>.02&&i1!==i0&&shot(i0/FPS)===shot(i1/FPS)&&imgs[i1].ok){ ctx.globalAlpha=fr; ctx.drawImage(imgs[i1],0,0,W,H); ctx.globalAlpha=1; }
    }
    subs.add(i=>{ if(Math.abs(i-t*FPS)<2.5) draw(); });
    function step(now){
      if(!playing) return;
      t+=Math.min(.1,(now-last)/1000)*rate; last=now;
      if(t>=DUR){ t=DUR; playing=false; ended=true; draw(); cv.dispatchEvent(new Event("ended")); return; }
      draw(); raf=requestAnimationFrame(step);
    }
    Object.defineProperties(cv,{
      currentTime:{get:()=>t,set:v=>{ t=Math.max(0,Math.min(DUR,+v||0)); ended=false; draw(); },configurable:true},
      duration:{get:()=>DUR,configurable:true},
      readyState:{get:()=>(imgs[0]&&imgs[0].ok?4:0),configurable:true},
      seeking:{get:()=>false,configurable:true},
      videoWidth:{get:()=>W,configurable:true}, videoHeight:{get:()=>H,configurable:true},
      paused:{get:()=>!playing,configurable:true}, ended:{get:()=>ended,configurable:true},
      playbackRate:{get:()=>rate,set:v=>{ rate=+v||1; },configurable:true},
      play:{value:()=>{ warm(); if(!playing){ playing=true; ended=false; last=performance.now(); raf=requestAnimationFrame(step); } return Promise.resolve(); },configurable:true},
      pause:{value:()=>{ playing=false; cancelAnimationFrame(raf); },configurable:true}
    });
    draw();
    return cv;
  }
  return {attach, warm, duration:DUR};
})();
