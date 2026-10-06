
/* Scene 1 is scrubbed by GSAP ScrollTrigger: pixel-exact progress, momentum on the scrub, reversible both ways */
(function(){
  if(!window.gsap||!window.ScrollTrigger||!window.GGJ) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ignoreMobileResize:true});
  const RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cam={p:0};
  GGJ.useScrollTrigger();
  gsap.fromTo(cam,{p:0},{p:1,ease:"none",onUpdate:()=>GGJ.setP(cam.p),
    scrollTrigger:{trigger:"#journey",start:"top top",end:"bottom bottom",scrub:RM?true:1.2,invalidateOnRefresh:true}});
})();
