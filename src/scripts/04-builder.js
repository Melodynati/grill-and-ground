const dishSVG=(it,cls)=>{
  const src=PH[it.id];
  if(src) return '<img'+(cls?' class="'+cls+'"':'')+' src="'+src+'" alt="" loading="lazy" decoding="async">';
  return '<div'+(cls?' class="'+cls+' noPhoto"':' class="noPhoto"')+'><span>'+it.nm+'</span></div>';
};

/* =========================================================
   The builder: one pick per category, priced like the menu book.
   ========================================================= */
const picks={}; let step=0; const group={};
const OPTIONAL=["drink","addon"];                 /* Beverage and Add-on can be skipped */
const isOpt=k=>OPTIONAL.includes(k);
const requiredDone=()=>CATS.every(c=>isOpt(c.key)||picks[c.key]);
const $=id=>document.getElementById(id);
const stepsEl=$("steps"), panelEl=$("panel"), trayEl=$("trayList"), sumEl=$("sum"), barEl=$("stickyBar");
const money=n=>n.toLocaleString("en-US");
const itemOf=(cat,id)=>cat.items.find(i=>i.id===id)||null;
const priceText=(cat,it)=>{
  if(cat.key==="side") return "Free";
  if(cat.priceLabel) return cat.priceLabel;
  if(it.price) return it.price+".-";
  if(cat.key==="addon") return "0.-";
  return "In buffet box";
};
const CHECK='<span class="ok"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" fill="none" stroke="#12301E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

function card(cat,it){
  const on=picks[cat.key]===it.id;
  return '<button type="button" class="dish" role="radio" aria-checked="'+on+'" data-id="'+it.id+'"'+(on?' title="Chosen. Tap again to clear."':'')+'>'+
    dishSVG(it)+(it.tag?'<span class="tag">'+it.tag+'</span>':'')+CHECK+
    '<span class="meta"><span class="dn">'+(it.it?'<i>'+it.it+'</i> ':'')+it.nm+'</span>'+
    '<span class="dth">'+it.th+'</span>'+(it.note?'<span class="dnote">'+it.note+'</span>':'')+
    '<span class="dpr"><span class="rule"></span><span class="sq"></span><span>'+priceText(cat,it)+'</span></span>'+
    '</span></button>';
}

const SECNAME=Object.fromEntries(SECTIONS);
function luxCard(cat,it,n){
  const on=picks[cat.key]===it.id, pop=it.pop||3;
  const popTx=pop>=5?"Most chosen":pop>=4?"Guest favourite":"Rising favourite";
  return '<button type="button" class="dish lux" role="radio" aria-checked="'+on+'" data-id="'+it.id+'" style="--i:'+n+'"'+(on?' title="Chosen. Tap again to clear."':'')+'>'+
    '<span class="luxImg">'+dishSVG(it)+(it.badge?'<span class="luxBadge"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12 4.5 7.5 0 6l4.5-1.5z" fill="currentColor"/></svg>'+it.badge+'</span>':'')+CHECK+'</span>'+
    '<span class="luxBody">'+
      '<span class="luxSec">'+(SECNAME[it.sec]||"")+'</span>'+
      '<span class="luxName">'+(it.it?'<i>'+it.it+'</i> ':'')+it.nm+'</span>'+
      '<span class="luxTh">'+it.th+'</span>'+
      (it.desc?'<span class="luxDesc">'+it.desc+'</span>':'')+
      (it.flav?'<span class="luxFlav">'+it.flav.map(f=>'<span class="fl"><span aria-hidden="true">'+f[0]+'</span>'+f[1]+'</span>').join("")+'</span>':'')+
      (it.ingr?'<span class="luxIngr"><b>Crafted with</b>'+it.ingr.join('<span class="dot" aria-hidden="true">·</span>')+'</span>':'')+
      (it.note?'<span class="luxNote">'+it.note+'</span>':'')+
      '<span class="luxFoot"><span class="luxPop" aria-label="Popularity '+pop+' of 5, '+popTx+'">'+
        '<span class="bars" aria-hidden="true">'+[1,2,3,4,5].map(k=>'<i'+(k<=pop?' class="on"':'')+'></i>').join("")+'</span>'+popTx+'</span>'+
        '<span class="luxPrice">'+priceText(cat,it)+'</span></span>'+
    '</span></button>';
}

function renderSteps(){
  stepsEl.innerHTML=CATS.map((c,i)=>
    '<button type="button" class="stepBtn'+(picks[c.key]?" done":"")+'" role="tab" aria-selected="'+(i===step)+'" data-i="'+i+'">'+
    '<span class="n">'+(picks[c.key]?"&#10003;":(i+1))+'</span>'+c.label+(isOpt(c.key)?'<span class="opt">optional</span>':'')+'</button>').join("");
}

function renderPanel(){
  const cat=CATS[step];
  if(cat.groups&&!group[cat.key]) group[cat.key]=cat.groups[0][0];
  const list=cat.groups?(group[cat.key]==="all"?cat.items:cat.items.filter(i=>i.sec===group[cat.key])):cat.items;
  const entering=panelEl.dataset.k!==cat.key+"|"+group[cat.key]; panelEl.dataset.k=cat.key+"|"+group[cat.key];
  panelEl.innerHTML=
    '<div class="panelHead"><div><h3 class="slab">'+cat.head+'</h3>'+
      '<p class="panelNote">'+cat.note+'</p></div>'+
      '<span class="pick1">'+(isOpt(cat.key)?'Optional<em>pick 1 or skip</em>':'Pick 1'+(cat.daily?'<em>from the bar</em>':''))+'</span>'+(picks[cat.key]?'<span class="clearHint">Tap it again to clear</span>':'')+'</div>'+
    (cat.groups?'<div class="subtabs">'+cat.groups.map(([k,n])=>
      '<button type="button" class="subtab" aria-pressed="'+(group[cat.key]===k)+'" data-g="'+k+'">'+n+'</button>').join("")+'</div>':'')+
    '<div class="dgrid'+(cat.lux?' luxGrid'+(entering?' enter':''):'')+'" role="radiogroup" aria-label="'+cat.head+'">'+list.map((i,n)=>cat.lux?luxCard(cat,i,n):card(cat,i)).join("")+'</div>'+
    '<div class="panelFoot"><button type="button" class="btn btn-quiet" id="prevStep"'+(step===0?" disabled":"")+'>Back</button>'+
      '<button type="button" class="btn btn-solid" id="nextStep">'+(isOpt(cat.key)&&!picks[cat.key]?(step===CATS.length-1?"Skip and review the set":"Skip to "+CATS[step+1].label):(step===CATS.length-1?"Review the set":"Next: "+CATS[step+1].label))+'</button></div>';
}

function renderTray(){
  let main=0,drink=0,addon=0,n=0;
  trayEl.innerHTML=CATS.map(cat=>{
    const it=picks[cat.key]?itemOf(cat,picks[cat.key]):null;
    if(it){ n++;
      if(cat.key==="main") main=it.price||0;
      if(cat.key==="drink") drink=it.price||0;
      if(cat.key==="addon") addon=it.price||0;
    }
    return '<li class="trow'+(it?"":" empty")+'"'+(it?' data-cat="'+cat.key+'"':'')+'>'+
      '<span class="tthumb">'+(it?dishSVG(it):"")+'</span>'+
      '<span class="tx"><span class="tc">'+cat.label+'</span>'+
      '<span class="tv">'+(it?it.nm:(isOpt(cat.key)?"optional, skipped":"not chosen"))+'</span></span>'+
      '<span class="tp">'+(it?priceText(cat,it):"")+'</span>'+
      (it?'<button type="button" class="trem" data-cat="'+cat.key+'" aria-label="Remove '+it.nm+'">&#215;</button>':'')+'</li>';
  }).join("");
  const total=main+drink+addon;
  sumEl.innerHTML=
    '<div><span>Main course, menu price</span><span>'+(main?money(main)+".-":"—")+'</span></div>'+
    '<div><span>Side dish</span><span>Free</span></div>'+
    '<div><span>Beverage</span><span>'+(drink?money(drink)+".-":"—")+'</span></div>'+
    '<div><span>Add-on</span><span>'+(addon?money(addon)+".-":"0.-")+'</span></div>'+
    '<div class="tot"><span>'+n+' of 8 chosen</span><span>THB '+money(total)+'</span></div>';
  barEl.innerHTML='<span>'+n+' of 8 chosen <b>THB '+money(total)+'</b></span>'+
    (requiredDone()?'<button type="button" class="btn-confirm ready" id="barConfirm"><span class="ck" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Confirm</button>'
          :'<button type="button" class="btn btn-solid" id="reviewBtn">Review set</button>');
  if(window.GGConfirm) GGConfirm.update();
}

function paint(){ renderSteps(); renderPanel(); renderTray();
  if(window.GGPACK) GGPACK.refresh(); }
function go(i){ step=Math.max(0,Math.min(CATS.length-1,i)); paint();
  const y=panelEl.getBoundingClientRect().top;
  if(y<0||y>innerHeight*.5) panelEl.scrollIntoView({block:"start",behavior:"smooth"}); }

function pick(catKey,id,quiet){
  const first=!picks[catKey];
  if(!quiet && picks[catKey]===id){ delete picks[catKey]; paint(); return; }   /* tap again to clear */
  picks[catKey]=id; paint();
  if(!quiet&&first&&step<CATS.length-1) setTimeout(()=>go(step+1),420);
}

stepsEl.addEventListener("click",e=>{const b=e.target.closest(".stepBtn"); if(b) go(+b.dataset.i);});
panelEl.addEventListener("click",e=>{
  const cat=CATS[step];
  const d=e.target.closest(".dish"); if(d){ pick(cat.key,d.dataset.id); return; }
  const s=e.target.closest(".subtab"); if(s){ group[cat.key]=s.dataset.g; renderPanel(); return; }
  if(e.target.closest("#nextStep")){ step===CATS.length-1?$("tray").scrollIntoView({block:"center",behavior:"smooth"}):go(step+1); return; }
  if(e.target.closest("#prevStep")) go(step-1);
});
barEl.addEventListener("click",e=>{ if(e.target.closest("#reviewBtn")) $("tray").scrollIntoView({block:"center",behavior:"smooth"});
  if(e.target.closest("#barConfirm")&&window.GGConfirm) GGConfirm.confirm(); });
trayEl.addEventListener("click",e=>{ const r=e.target.closest(".trem"); if(r){ delete picks[r.dataset.cat]; paint(); } });
$("surprise").addEventListener("click",()=>{
  CATS.forEach(c=>{ picks[c.key]=c.items[Math.floor(Math.random()*c.items.length)].id; });
  const m=itemOf(CATS[0],picks.main); if(m) group.main=m.sec;
  const d=itemOf(CATS[6],picks.drink); if(d) group.drink=d.sec;
  paint();
});
$("clear").addEventListener("click",()=>{ CATS.forEach(c=>delete picks[c.key]); step=0; paint(); });

$("mainCount").textContent=MAINS.length;
paint();

/* the scrolling scene hands over to the builder */
window.GG={
  featured:["truffle","set2","cubes","nordic","cheesechicken"].map(id=>MAINS.find(m=>m.id===id)),
  dishSVG:dishSVG,
  pickMain(id){ const m=MAINS.find(x=>x.id===id); if(!m) return; group.main=m.sec; step=0; pick("main",id,true);
    $("builder").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); }
};
