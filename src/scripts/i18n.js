/* =====================================================================
   EN / ไทย language toggle
   English is the page as written. Thai is applied on top by swapping text
   (and a few labels) from GG_TH, so the English markup and every script
   that builds the page stay untouched. Text the builder renders later is
   translated as it appears. Choice is remembered; ?lang=th opens in Thai.
   ===================================================================== */
(function(){
  const TH=window.GG_TH||{};
  const BACK={}; for(const k in TH) if(!(TH[k] in BACK)) BACK[TH[k]]=k;      /* Thai → English, for text rewritten while in Thai */
  const norm=s=>s.replace(/\s+/g," ").trim();
  /* Thai has no spaces between words, so the browser guesses where it may wrap and sometimes splits
     a compound (มะเขือ|เทศ). These words are glued with invisible word joiners so they stay whole. */
  const GLUE=["มะเขือเทศเชอร์รี","มะเขือเทศ","เชอร์รี","ออร์แกนิก","ออร์เดอร์","บาร์บีคิว","เบเกอรี่","แอปเปิ้ล","ข้าวโพด","หัวไชเท้า","ผักโขม","ขึ้นฉ่าย",
    "แตงกวา","กะหล่ำปลี","สับปะรด","เฟรนช์ฟรายส์","โหระพา","ชิเมจิ","บร็อคโคลี","กาญจนาภิเษก","ปริมณฑล","โอ้กะจู๋","ทรัฟเฟิล","มาร์เบิล",
    "พาสต้า","เพสโต้","แซลมอน","ซีอิ๊ว","เทนเดอร์","บอสตัน","คุโรเกะ","วากิว","แฮมเบิร์ก","สเต๊ก","ฟักทอง","เครื่องเคียง","เครื่องดื่ม","ของหวาน",
    "จานหลัก","หน้าบ้าน","ก้อนเมฆ","ผืนดิน","ปลายนิ้ว","วันเดียวกัน","เมนูบุ๊ก","แคมเปญ","พาร์ตเนอร์","มาสเตอร์เชฟ","เดลิเวอรี","ก็อร่อย",
    "เกล็ดขนมปัง","ขนมปัง","สมุนไพร","กระเทียม","เบคอน","รมควัน","สันคอหมู","สันใน","พอร์คชอป","หมูมาร์เบิล","ไข่แดง","ไข่ดาว","หอมเนย",
    "ข้าวผัด","กุ้งตัวโต","นักชิม","ตัวน้อย","เผ็ด","ชีสเยิ้ม","ร้อนฉ่า","ฟาร์ม","สาขา","สลัด","ซีฟู้ด","ส่วนลด","รางวัล","ประจำเดือน",
    "พรีเมียม","คุ้มค่า","สุขภาพ","ผู้บริโภค","ไอเดีย","โปรโมชัน","คอนเซปต์","แบรนด์","ปีใหม่","ออฟฟิศ","กลุ่มเป้าหมาย","กลยุทธ์","งบประมาณ"]
    .sort((a,b)=>b.length-a.length);
  const GLUE_RE=new RegExp(GLUE.join("|"),"g");
  const MARK=/[\u0E31\u0E33-\u0E3A\u0E47-\u0E4E]/;
  const glue=s=>s.replace(GLUE_RE,w=>[...w].map((ch,i)=>i&&!MARK.test(ch)?"\u2060"+ch:ch).join(""));
  const unglue=s=>s.replace(/\u2060/g,"");
  const t=s=>{ const k=norm(s); return glue(TH[k]!=null?TH[k]:(rule(k)??s)); };
  window.GGT=s=>lang==="th"?t(s):s;                                          /* used by scripts that animate words */

  /* ---------- dynamic strings ---------- */
  const MON={Jan:"ม.ค.",Feb:"ก.พ.",Mar:"มี.ค.",Apr:"เม.ย.",May:"พ.ค.",Jun:"มิ.ย.",Jul:"ก.ค.",Aug:"ส.ค.",Sep:"ก.ย.",Oct:"ต.ค.",Nov:"พ.ย.",Dec:"ธ.ค."};
  const mon=s=>s.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g,m=>MON[m]);
  const tt=s=>TH[s]!=null?TH[s]:s;
  const RULES=[
    [/^(\d+) of 8 chosen$/,m=>"เลือกแล้ว "+m[1]+"/8"],
    [/^Pick the 6 essentials to continue · (\d+) to go$/,m=>"เลือกให้ครบ 6 หมวดหลักก่อนนะ · อีก "+m[1]+" หมวด"],
    [/^Next: (.+)$/,m=>"ต่อไป: "+tt(m[1])],
    [/^Skip to (.+)$/,m=>"ข้ามไป "+tt(m[1])],
    [/^(\d+) branches$/,m=>m[1]+" สาขา"],
    [/^(\d+) open now, (\d+) opening soon$/,m=>"เปิดแล้ว "+m[1]+" สาขา อีก "+m[2]+" สาขาเร็ว ๆ นี้"],
    [/^Opening (\d+) (\w{3}) · in (\d+) days$/,m=>"เปิด "+m[1]+" "+MON[m[2]]+" · อีก "+m[3]+" วัน"],
    [/^Open since$/,()=>"เปิดตั้งแต่"],
    [/^(\d+) (\w{3}) (\d{4})$/,m=>MON[m[2]]?m[1]+" "+MON[m[2]]+" "+(+m[3]+543):null],
    [/^Arriving in (\d+) min$/,m=>"อีก "+m[1]+" นาทีถึง"],
    [/^Your (\d+) picks are on their way to the kitchen\.$/,m=>"ทั้ง "+m[1]+" เมนู กำลังส่งเข้าครัว"],
    [/^Popularity (\d) of 5, (.+)$/,m=>"ความนิยม "+m[1]+" จาก 5, "+tt(m[2])],
    [/^Remove (.+)$/,m=>"ลบ "+m[1]+" ออก"],
    [/^Filter (.+)$/,m=>"ตัวกรอง"+tt(m[1].charAt(0).toUpperCase()+m[1].slice(1))],
    [/^QR code for order (.+)$/,m=>"คิวอาร์โค้ดของออร์เดอร์ "+m[1]],
    [/^(Phase \d|Always-on) · (\w{3})–(\w{3})$/,m=>m[1]+" · "+MON[m[2]]+"–"+MON[m[3]]],
    [/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)–(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/,m=>mon(m[0])]
  ];
  const BACK_RULES=[
    [/^(\d+) สาขา$/,m=>m[1]+" branches"],
    [/^เลือกแล้ว (\d+)\/8$/,m=>m[1]+" of 8 chosen"],
    [/^อีก (\d+) นาทีถึง$/,m=>"Arriving in "+m[1]+" min"]
  ];
  function rule(k){ for(const [re,fn] of RULES){ const m=k.match(re); if(m){ const r=fn(m); if(r!=null) return r; } } return null; }
  function backRule(k){ for(const [re,fn] of BACK_RULES){ const m=k.match(re); if(m) return fn(m); } return null; }

  /* ---------- sentences split around inline markup: {0},{1} are the original child elements ---------- */
  const TPL={
    "Orders delivery {0} a week":"สั่ง Delivery {0} / สัปดาห์",
    "{0} years old":"อายุ {0} ปี",
    "{0} a month":"รายได้ {0} / เดือน",
    "With {0} chef-curated main courses from the menu book, plus choices across sides, salads, soups, bakes, desserts, drinks, and add-ons, guests can build over {1} different set combinations.":
      "จานหลัก {0} เมนูที่เชฟคัดจากเมนูบุ๊ก รวมกับเครื่องเคียง สลัด ซุป เบเกอรี่ ของหวาน เครื่องดื่ม และ Add-on จัดเซ็ตได้มากกว่า {1} แบบ"
  };
  const TPL_RULES=[[/^Step \{0\} of 8 · (.+)$/,m=>"ขั้นที่ {0}/8 · "+tt(m[1])]];
  const SKIP=".dn,.luxName,.luxTh,.dth,script,style,svg,.ggLang,[data-noi18n]";
  const SKIP_ATTR=".ggLang,[data-noi18n]";
  /* dish names stay English on the menu cards (the Thai name sits under each one); in the tray and the packing caption the Thai name is used */
  let NAMES=null;
  const names=()=>{ if(NAMES) return NAMES; NAMES={};
    try{ CATS.forEach(c=>c.items.forEach(it=>{ if(it.th){ NAMES[norm(it.nm)]=it.th; if(it.it) NAMES[norm(it.it+" "+it.nm)]=it.th; } })); }catch(e){}
    return NAMES; };

  let lang="en";
  const textOrig=new Map(), attrOrig=new Map(), tplOrig=new Map(), written=new WeakMap();
  const ATTRS=["aria-label","alt","title","data-tip","placeholder"];

  function tplKey(el){
    let k="",i=0,hasT=false,hasE=false;
    for(const c of el.childNodes){
      if(c.nodeType===3){ k+=c.nodeValue; if(/[A-Za-z]/.test(c.nodeValue)) hasT=true; }
      else if(c.nodeType===1){ if(c.nodeName==="BR"){ k+=" "; continue; } hasE=true; k+="{"+(i++)+"}"; }
    }
    return hasT&&hasE?norm(k):null;
  }
  function applyTpl(el){
    if(tplOrig.has(el)) return true;
    const k=tplKey(el); if(!k) return false;
    let th=TPL[k]; if(th==null) for(const [re,fn] of TPL_RULES){ const m=k.match(re); if(m){ th=fn(m); break; } }
    if(th==null) return false;
    const kids=[...el.childNodes], els=kids.filter(c=>c.nodeType===1&&c.nodeName!=="BR");
    const frag=document.createDocumentFragment();
    th.split(/(\{\d\})/).forEach(p=>{ const m=p.match(/^\{(\d)\}$/); frag.appendChild(m?els[+m[1]]:document.createTextNode(glue(p))); });
    tplOrig.set(el,kids); el.textContent=""; el.appendChild(frag); el.setAttribute("data-tr","");
    return true;
  }
  function doText(n){
    const v=n.nodeValue; if(!v||!/[A-Za-z]/.test(v)) return;
    const p=n.parentElement; if(!p||p.closest(SKIP)) return;
    const k=norm(v), inDish=p.closest(".tv,#packNm,.sealPrice small");
    let dish=inDish?names()[k]:null;
    if(inDish&&dish==null&&k.includes("→")){ const [a,b]=k.split("→").map(norm); dish=(TH[a]??a)+"  →  "+(names()[b]??b); }
    const th=dish!=null?dish:TH[k]!=null?TH[k]:rule(k); if(th==null) return;
    const lead=v.match(/^\s*/)[0], trail=v.match(/\s*$/)[0], out=lead+glue(th)+trail;
    textOrig.set(n,v); written.set(n,out); n.nodeValue=out; p.setAttribute("data-tr","");
  }
  function doAttrs(el){
    for(const a of ATTRS){ const v=el.getAttribute(a); if(!v||!/[A-Za-z]/.test(v)) continue;
      const k=norm(v), th=TH[k]!=null?TH[k]:rule(k); if(th==null||th===v) continue;
      const key=a; let m=attrOrig.get(el); if(!m){ m={}; attrOrig.set(el,m); } m[key]=v; el.setAttribute(a,th); }
  }
  function walk(root){
    if(root.nodeType===3){ doText(root); return; }
    if(root.nodeType!==1||root.closest(SKIP_ATTR)) return;
    if(root.closest(SKIP)){ if(root.matches("svg")) doAttrs(root); return; }
    const els=[root,...root.querySelectorAll("*")];
    for(const el of els){ if(!el.closest(SKIP_ATTR)) doAttrs(el); if(el.closest(SKIP)) continue; applyTpl(el); }
    const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(tw.nextNode()) nodes.push(tw.currentNode);
    nodes.forEach(doText);
  }
  function restore(){
    tplOrig.forEach((kids,el)=>{ el.textContent=""; kids.forEach(k=>el.appendChild(k)); el.removeAttribute("data-tr"); }); tplOrig.clear();
    textOrig.forEach((v,n)=>{ if(n.nodeValue===written.get(n)) n.nodeValue=v; n.parentElement&&n.parentElement.removeAttribute("data-tr"); }); textOrig.clear();
    attrOrig.forEach((m,el)=>{ for(const a in m) el.setAttribute(a,m[a]); }); attrOrig.clear();
    /* text a script rewrote from Thai while Thai was on */
    const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let n;
    while((n=tw.nextNode())){ const v=norm(unglue(n.nodeValue)); if(!v||!/[฀-๿]/.test(v)) continue;
      const p=n.parentElement; if(!p||p.closest(SKIP)) continue;
      const en=BACK[v]??backRule(v); if(en!=null) n.nodeValue=en; }
  }

  /* ---------- watch for text the page renders later ---------- */
  let busy=false;
  const mo=new MutationObserver(recs=>{
    if(lang!=="th"||busy) return; busy=true;
    try{
      for(const r of recs){
        if(r.type==="childList"){
          const el=r.target; if(el.nodeType===1&&!el.closest(SKIP)){ tplOrig.delete(el); applyTpl(el); }   /* a sentence re-rendered around new markup */
          r.addedNodes.forEach(walk); }
        else if(r.type==="characterData"){ if(written.get(r.target)!==r.target.nodeValue){ textOrig.delete(r.target); doText(r.target); } }
        else if(r.type==="attributes"){ const v=r.target.getAttribute(r.attributeName); if(v&&/[A-Za-z]/.test(v)) doAttrs(r.target); }
      }
    } finally { mo.takeRecords(); busy=false; }
  });

  /* ---------- the toggle ---------- */
  let ui;
  function setLang(l,save){
    if(l===lang) return; lang=l;
    document.documentElement.lang=l==="th"?"th":"en";
    if(l==="th"){ busy=true; walk(document.body); mo.takeRecords(); busy=false;
      mo.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS}); }
    else { mo.disconnect(); restore(); }
    if(ui) ui.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.l===l)));
    if(save){ try{ localStorage.setItem("gg-lang",l); }catch(e){} }
    document.dispatchEvent(new CustomEvent("gg:lang",{detail:l}));
  }
  function buildUI(){
    ui=document.createElement("div"); ui.className="ggLang"; ui.setAttribute("role","group"); ui.setAttribute("aria-label","Language / ภาษา");
    ui.innerHTML='<button type="button" data-l="en" lang="en" aria-pressed="true">EN</button><button type="button" data-l="th" lang="th" aria-pressed="false">ไทย</button>';
    ui.addEventListener("click",e=>{ const b=e.target.closest("button"); if(b) setLang(b.dataset.l,true); });
    document.body.appendChild(ui);
    /* on the opening scene it sits under the top pills; after that it moves up to the corner */
    const j=document.getElementById("journey");
    const place=()=>ui.classList.toggle("solo",!j||j.getBoundingClientRect().bottom<innerHeight*.5);
    addEventListener("scroll",place,{passive:true}); place();
  }
  function init(){
    buildUI();
    let want=null;
    try{ const q=new URLSearchParams(location.search).get("lang"); if(q==="th"||q==="en") want=q; }catch(e){}
    if(!want){ try{ want=localStorage.getItem("gg-lang"); }catch(e){} }
    if(want==="th") setLang("th",false);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
  window.GGLang={set:l=>setLang(l,true),get:()=>lang};
})();
