/* branch status follows the calendar: "Opening 9 Oct" turns into "Open now" on the day */
(function(){
  const now=new Date(), today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let open=0, soon=0;
  document.querySelectorAll("#branches .br").forEach(b=>{
    const [y,m,d]=b.dataset.open.split("-").map(Number), od=new Date(y,m-1,d), st=b.querySelector(".brStat");
    if(today>=od){ open++; b.classList.add("isOpen"); st.textContent="Open now";
      const h=b.querySelector(".brHours"); if(h&&/Opens/.test(h.textContent)) h.innerHTML="<b>Open since</b> "+d+" "+M[m-1]+" "+y; }
    else { soon++; b.classList.add("isSoon"); const days=Math.round((od-today)/864e5);
      st.textContent=days<=1?"Opening tomorrow":"Opening "+d+" "+M[m-1]+" · in "+days+" days"; }
  });
  const c=document.getElementById("brCount"), sub=document.getElementById("brCountSub");
  if(c){ c.textContent=(open+soon)+" branches"; sub.textContent=soon?open+" open now, "+soon+" opening soon":"Kanchanaphisek, Lasalle, Bang Yai and Rama 2"; }
  /* time-limited promotions disappear once they end */
  document.querySelectorAll("#branches [data-until]").forEach(e=>{ const [y,m,d]=e.dataset.until.split("-").map(Number);
    if(today>new Date(y,m-1,d)) e.remove(); });
})();

