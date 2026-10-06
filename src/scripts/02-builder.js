
/* =========================================================
   Dish art: built like the photographs in the menu book.
   One light from the upper left, soft shadows under everything,
   gloss on anything wet, and the far props thrown out of focus.
   ========================================================= */
const g=(x,y,s,r,b)=>'<g transform="translate('+x+' '+y+') rotate('+(r||0)+') scale('+(s||1)+')">'+b+'</g>';
const gs=(x,y,s,r,b)=>'<g filter="url(#dDrop)" transform="translate('+x+' '+y+') rotate('+(r||0)+') scale('+(s||1)+')">'+b+'</g>';
const far=(b)=>'<g filter="url(#dFar)">'+b+'</g>';
const rep=(n,f)=>{let s="";for(let i=0;i<n;i++)s+=f(i);return s;};
const sheen=(cx,cy,rx,ry,rot,o)=>'<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="#FFFFFF" opacity="'+(o||.3)+
  '" filter="url(#dSoft2)" transform="rotate('+(rot||0)+' '+cx+' '+cy+')"/>';
const cast=(cx,cy,rx,ry,o)=>'<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="#0B0908" opacity="'+(o||.6)+'" filter="url(#dSoft)"/>';
const steam=(x,y,s)=>g(x,y,s||1,0,'<g stroke="#FFFFFF" fill="none" stroke-linecap="round" opacity=".22" filter="url(#dSoft2)">'+
  '<path d="M0 0c-9-12 8-18-2-32" stroke-width="5"/><path d="M22-6c-9-14 8-20-2-34" stroke-width="5"/>'+
  '<path d="M-20-4c-8-12 7-17-2-30" stroke-width="4"/></g>');
/* the finish that sits on top of every tile: vignette and film grain */
const FIN='<rect width="320" height="200" fill="url(#dVign)"/>'+
  '<rect width="320" height="200" filter="url(#dGrain)" opacity=".42" style="mix-blend-mode:overlay"/>';

const BG={
  table:'<rect width="320" height="200" fill="url(#dTable)"/><rect width="320" height="200" fill="url(#dSpeck)" opacity=".7"/>'+
    '<rect width="320" height="200" fill="url(#dLight)"/>',
  sage:'<rect width="320" height="200" fill="url(#dSage)"/><rect width="320" height="200" fill="url(#dLight)"/>',
  marble:'<rect width="320" height="200" fill="url(#dMarble)"/>'+
    '<path d="M-10 40C60 30 90 70 160 58S260 20 330 36" stroke="#BEBBB4" stroke-width="1.4" fill="none" opacity=".7"/>'+
    '<path d="M-10 156C80 136 120 176 200 156S290 126 330 146" stroke="#C6C2BC" stroke-width="1.2" fill="none" opacity=".6"/>'+
    '<rect width="320" height="200" fill="url(#dLight)"/>'
};
const TOM=(x,y,s)=>g(x,y,s,0,'<ellipse cy="10" rx="10" ry="4" fill="#0B0908" opacity=".5" filter="url(#dSoft2)"/>'+
  '<circle r="11" fill="#B8241C"/><circle r="11" fill="url(#dSheen)" opacity=".5"/>'+
  '<ellipse cx="-4" cy="-5" rx="3.6" ry="2.6" fill="#FFFFFF" opacity=".75" filter="url(#dSoft2)"/>'+
  '<path d="M-5-10l5 3 5-3-2 4 5 1-6 1z" fill="#3E7A36"/>');
const VINE='<g filter="url(#dBokeh)">'+TOM(16,18,1)+TOM(38,10,.95)+TOM(28,38,.95)+
  '<path d="M8 2c14 4 24 10 30 30" stroke="#4E7A3A" stroke-width="2.4" fill="none"/></g>';

/* ---------- vessels ---------- */
const V={
  plate:()=>cast(164,132,140,40,.62)+
    '<ellipse cx="160" cy="110" rx="142" ry="76" fill="url(#dPlate)"/>'+
    '<ellipse cx="160" cy="110" rx="142" ry="76" fill="url(#dSheen)"/>'+
    '<path d="M24 100A136 70 0 0 1 150 36" stroke="#FFFFFF" stroke-width="7" fill="none" opacity=".55" filter="url(#dSoft2)"/>'+
    '<ellipse cx="160" cy="110" rx="133" ry="70" fill="none" stroke="#14402E" stroke-width="3.6"/>'+
    '<ellipse cx="160" cy="108" rx="133" ry="70" fill="none" stroke="#3E6E56" stroke-width="1.2" opacity=".8"/>'+
    '<ellipse cx="160" cy="112" rx="104" ry="52" fill="#0B0908" opacity=".07" filter="url(#dSoft2)"/>'+
    '<g fill="none" stroke="#14402E" stroke-width="3" stroke-linecap="round"><path d="M234 166c2-6 9-6 11 0"/><path d="M243 166c2-6 9-6 11 0"/></g>',
  white:()=>cast(164,132,140,40,.6)+
    '<ellipse cx="160" cy="110" rx="142" ry="76" fill="url(#dPlate)"/><ellipse cx="160" cy="110" rx="142" ry="76" fill="url(#dSheen)"/>'+
    '<path d="M24 100A136 70 0 0 1 150 36" stroke="#FFFFFF" stroke-width="7" fill="none" opacity=".5" filter="url(#dSoft2)"/>'+
    '<ellipse cx="160" cy="110" rx="118" ry="60" fill="none" stroke="#C9CCC7" stroke-width="1.5"/>',
  sizzler:()=>cast(166,140,146,36,.7)+
    '<ellipse cx="160" cy="112" rx="152" ry="80" fill="url(#dWood)"/>'+
    rep(5,i=>'<path d="M'+(20+i*58)+' 40c6 40 4 80 0 118" stroke="#000000" stroke-width="2" opacity=".16" fill="none"/>')+
    '<ellipse cx="160" cy="112" rx="152" ry="80" fill="none" stroke="#4A2A12" stroke-width="3"/>'+
    '<ellipse cx="158" cy="106" rx="133" ry="67" fill="#0A0908" opacity=".6" filter="url(#dSoft2)"/>'+
    '<ellipse cx="158" cy="104" rx="132" ry="66" fill="url(#dIron)"/>'+
    '<ellipse cx="158" cy="104" rx="119" ry="58" fill="#2E2C29"/><ellipse cx="158" cy="104" rx="119" ry="58" fill="url(#dGranite)"/>'+
    '<path d="M48 88A126 62 0 0 1 152 46" stroke="#FFFFFF" stroke-width="5" fill="none" opacity=".2" filter="url(#dSoft2)"/>',
  tray:(paper,metal)=>cast(166,134,142,38,.62)+
    '<ellipse cx="160" cy="110" rx="148" ry="76" fill="url(#'+(metal||"dSteel")+')"/>'+
    '<ellipse cx="160" cy="110" rx="132" ry="64" fill="'+(metal==="dBrass"?"#C2A067":"#B9BFC4")+'"/>'+
    '<ellipse cx="160" cy="110" rx="132" ry="64" fill="url(#'+(metal||"dSteel")+')" opacity=".65"/>'+
    '<path d="M40 96A140 70 0 0 1 154 34" stroke="#FFFFFF" stroke-width="9" fill="none" opacity=".6" filter="url(#dSoft2)"/>'+
    (paper?'<g transform="rotate(-12 160 108)"><rect x="70" y="50" width="180" height="120" fill="#FAF9F4"/>'+
      '<rect x="70" y="50" width="180" height="120" fill="url(#dSheen)" opacity=".5"/>'+
      '<g fill="none" stroke="#6E9A58" stroke-width="2.2" opacity=".45">'+
      rep(6,i=>'<circle cx="'+(92+(i%3)*62)+'" cy="'+(72+Math.floor(i/3)*62)+'" r="7"/>')+'</g></g>':''),
  bowl:(grad)=>cast(164,134,138,38,.62)+
    '<ellipse cx="160" cy="110" rx="140" ry="76" fill="url(#'+(grad||"dBlue")+')"/>'+
    '<ellipse cx="160" cy="110" rx="140" ry="76" fill="url(#dBlueSpk)"/>'+
    '<path d="M28 98A134 70 0 0 1 150 38" stroke="#FFFFFF" stroke-width="6" fill="none" opacity=".4" filter="url(#dSoft2)"/>'+
    '<ellipse cx="160" cy="114" rx="102" ry="52" fill="#08121E" opacity=".3" filter="url(#dSoft2)"/>'+
    '<ellipse cx="160" cy="112" rx="100" ry="50" fill="url(#dBlueSpk)" opacity=".5"/>',
  enamel:()=>cast(162,148,124,30,.6)+
    '<rect x="32" y="28" width="250" height="150" rx="28" fill="#20382A"/>'+
    '<rect x="32" y="28" width="250" height="150" rx="28" fill="url(#dSheen)" opacity=".5"/>'+
    '<rect x="46" y="40" width="222" height="124" rx="20" fill="#365840"/>'+
    '<path d="M60 58h40" stroke="#FFFFFF" stroke-width="6" opacity=".3" filter="url(#dSoft2)" stroke-linecap="round"/>',
  stone:()=>cast(164,160,126,24,.6)+
    '<rect x="40" y="120" width="244" height="58" rx="4" fill="#6E4326"/><rect x="40" y="120" width="244" height="9" fill="#4E2C16"/>'+
    '<path d="M34 66L286 50L292 130L40 142Z" fill="#6B6862"/><path d="M34 66L286 50L292 130L40 142Z" fill="url(#dSpeck)" opacity=".8"/>'+
    '<path d="M34 66L286 50" stroke="#A8A49D" stroke-width="3"/>'+
    '<path d="M44 74L180 64" stroke="#FFFFFF" stroke-width="7" opacity=".16" filter="url(#dSoft2)"/>',
  pan:()=>cast(162,146,120,30,.6)+
    '<rect x="42" y="24" width="232" height="154" rx="16" fill="url(#dSteel)"/>'+
    '<rect x="56" y="36" width="204" height="130" rx="8" fill="#B4BABF"/>'+
    '<path d="M76 44h160l-8 116H70z" fill="#F7F4EC"/><path d="M76 44h160l-8 116H70z" fill="url(#dSheen)" opacity=".4"/>',
  skillet:()=>'<rect x="16" y="100" width="42" height="13" rx="6.5" fill="#B08C38"/><rect x="262" y="100" width="42" height="13" rx="6.5" fill="#B08C38"/>'+
    cast(164,134,112,34,.6)+'<ellipse cx="160" cy="112" rx="118" ry="72" fill="url(#dSteel)"/>'+
    '<ellipse cx="160" cy="112" rx="104" ry="62" fill="#B4BABF"/>'+
    '<path d="M64 96A110 62 0 0 1 154 46" stroke="#FFFFFF" stroke-width="7" fill="none" opacity=".45" filter="url(#dSoft2)"/>',
  black:()=>cast(164,134,140,36,.7)+'<ellipse cx="160" cy="110" rx="146" ry="74" fill="#151413"/>'+
    '<ellipse cx="160" cy="110" rx="132" ry="64" fill="#231F1D"/>'+
    '<path d="M40 96A140 68 0 0 1 152 40" stroke="#FFFFFF" stroke-width="5" fill="none" opacity=".16" filter="url(#dSoft2)"/>',
  small:()=>cast(163,138,96,28,.42)+
    '<ellipse cx="160" cy="112" rx="100" ry="60" fill="url(#dPlate)"/><ellipse cx="160" cy="112" rx="100" ry="60" fill="url(#dSheen)" opacity=".7"/>'+
    '<path d="M72 104A96 56 0 0 1 152 58" stroke="#FFFFFF" stroke-width="6" fill="none" opacity=".5" filter="url(#dSoft2)"/>'+
    '<ellipse cx="160" cy="112" rx="90" ry="53" fill="none" stroke="#C7CAC5" stroke-width="1.6"/>',
  wbowl:(fill)=>cast(163,140,94,26,.42)+
    '<ellipse cx="160" cy="112" rx="98" ry="60" fill="url(#dPlate)"/><ellipse cx="160" cy="112" rx="98" ry="60" fill="url(#dSheen)" opacity=".7"/>'+
    '<ellipse cx="160" cy="111" rx="81" ry="47" fill="#0B0908" opacity=".18" filter="url(#dSoft2)"/>'+
    '<ellipse cx="160" cy="110" rx="80" ry="46" fill="'+(fill||"#EDEFEA")+'"/>'
};

/* ---------- garnish ---------- */
const X={
  carrot:()=>'<path d="M0-6c34-2 66 2 92 6-26 4-58 8-92 6-5-2-5-10 0-12z" fill="#D96A22"/>'+
    '<path d="M2-4c30-2 58 1 84 5-24 3-54 6-84 5z" fill="#F08A36"/>'+
    '<path d="M8-3c20 0 40 1 60 3" stroke="#FCBE7C" stroke-width="1.8" opacity=".85"/>'+
    '<g stroke="#4E8A3A" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0-2c-10-6-20-8-26-4"/>'+
    '<path d="M0 0c-12 2-20 8-24 14"/><path d="M0-1c-14-2-22 0-28 4"/></g>',
  corn:()=>'<rect x="-15" y="-19" width="30" height="38" rx="11" fill="#D8A62E"/>'+
    '<rect x="-14" y="-18" width="26" height="35" rx="10" fill="#F2C94C"/>'+
    '<g stroke="#C08F22" stroke-width="1.5"><path d="M-14-7h27"/><path d="M-14 5h27"/><path d="M-5-18v34"/><path d="M5-18v34"/></g>'+
    '<path d="M-10-13h8M4 9h7" stroke="#6E4212" stroke-width="3" opacity=".55"/>'+sheen(-6,-9,4,7,-20,.5),
  greens:()=>'<path d="M-30 10c-10-24 6-40 26-36 4 22-8 34-26 36z" fill="#3E7A32"/>'+
    '<path d="M0 12c-4-26 14-38 32-30-2 22-14 32-32 30z" fill="#63A445"/>'+
    '<path d="M-14 2c-2-22 14-34 28-30 0 20-12 30-28 30z" fill="#86BA60"/>'+
    '<path d="M10-4c4-20 22-26 34-18-6 16-20 22-34 18z" fill="#6E2636"/>'+
    '<path d="M14-6c8-10 18-14 26-14" stroke="#C9506A" stroke-width="1.4" fill="none"/>'+
    '<path d="M-40 4c-4-14 4-24 16-24 0 12-6 22-16 24z" fill="#54923E"/>'+sheen(-6,-12,10,5,-30,.25),
  garlic:()=>'<circle r="17" fill="#D8C49E"/><circle cx="-2" cy="-2" r="15" fill="#EFE0C2"/>'+
    '<circle r="17" fill="none" stroke="#7A4C22" stroke-width="3"/>'+
    '<g fill="#C88A48"><ellipse cx="-6" cy="-5" rx="5" ry="4"/><ellipse cx="6" cy="-5" rx="5" ry="4"/>'+
    '<ellipse cx="-6" cy="6" rx="5" ry="4"/><ellipse cx="6" cy="6" rx="5" ry="4"/><ellipse rx="4" ry="3.5"/></g>'+sheen(-6,-8,6,4,-25,.4),
  ramekin:(c,chili)=>'<ellipse cy="7" rx="28" ry="19" fill="#0B0908" opacity=".45" filter="url(#dSoft2)"/>'+
    '<ellipse rx="28" ry="19" fill="#D9CDB4"/><ellipse cx="-2" cy="-2" rx="26" ry="17" fill="#EFE5D2"/>'+
    '<ellipse rx="22" ry="14" fill="'+c+'"/><ellipse rx="22" ry="14" fill="url(#dSheen)" opacity=".35"/>'+
    sheen(-8,-5,7,3,-20,.35)+
    (chili?'<g fill="#E8502E"><circle cx="-6" cy="2" r="1.5"/><circle cx="5" cy="-3" r="1.4"/><circle cx="8" cy="5" r="1.3"/>'+
      '<circle cx="-2" cy="7" r="1.2"/></g><g fill="#6FAE4E"><circle cx="2" cy="1" r="1.1"/><circle cx="-9" cy="-3" r="1"/></g>':''),
  cup:()=>'<ellipse cy="7" rx="24" ry="17" fill="#0B0908" opacity=".4" filter="url(#dSoft2)"/>'+
    '<ellipse rx="24" ry="17" fill="url(#dSteel)"/><ellipse rx="19" ry="13" fill="#EFEBE0"/>'+
    '<g fill="#4E7A3A"><circle cx="-5" cy="-2" r="1.3"/><circle cx="4" cy="3" r="1.3"/><circle cx="6" cy="-4" r="1"/></g>'+sheen(-9,-6,6,3,-20,.6),
  lemon:()=>'<circle r="14" fill="#D9B62E"/><circle cx="-1" cy="-1" r="12.4" fill="#F7E07A"/>'+
    '<g stroke="#E4C84A" stroke-width="1.4"><path d="M0-11v22"/><path d="M-11 0h22"/><path d="M-8-8l16 16"/><path d="M8-8l-16 16"/></g>'+sheen(-5,-6,5,3,-25,.5),
  lotus:()=>'<circle r="15" fill="#C08C48"/><circle cx="-1" cy="-1" r="13" fill="#E4B978"/>'+
    '<g fill="#9A6A2E"><circle cy="-6" r="2.6"/><circle cx="6" cy="-2" r="2.6"/><circle cx="4" cy="5" r="2.6"/>'+
    '<circle cx="-4" cy="5" r="2.6"/><circle cx="-6" cy="-2" r="2.6"/><circle r="2"/></g>',
  shimeji:()=>rep(3,i=>g(i*9-9,(i%2)*5,1,i*12-12,'<rect x="-2" y="-4" width="4" height="13" rx="2" fill="#E3D7BC"/>'+
    '<ellipse cy="-5" rx="6" ry="4" fill="#7A5A3A"/>'+sheen(-2,-6,2.4,1.4,-20,.4))),
  chips:()=>rep(5,i=>'<ellipse cx="'+(i*8-16)+'" cy="'+((i%2)*6)+'" rx="6" ry="4.5" fill="#D9A45E" stroke="#A8701E" stroke-width="1"/>'),
  fries:(n,c)=>rep(n||7,i=>g((i%4)*11-16,Math.floor(i/4)*9-4,1,(i*37)%70-35,
    '<rect x="-3.6" y="-17" width="7.2" height="34" rx="2" fill="'+(c||"#E8B23E")+'"/>'+
    '<rect x="-3.6" y="-17" width="4" height="34" rx="2" fill="'+(c?"#FBF0CE":"#F7D178")+'"/>'+
    '<path d="M-3.6-10h7.2M-3.6-2h7.2M-3.6 6h7.2" stroke="#B87C22" stroke-width="1.2"/>')),
  herb:()=>'<path d="M0 0c10-6 22-8 34-6" stroke="#3E6B30" stroke-width="1.6" fill="none"/>'+
    rep(5,i=>'<ellipse cx="'+(6+i*6)+'" cy="'+(-3-(i%2)*3)+'" rx="2.4" ry="1.4" fill="#63A445"/>'),
  broc:()=>'<path d="M-3 10h6l-1-14h-4z" fill="#8DB86A"/><g fill="#2F6A2C"><circle cx="-8" cy="-6" r="8"/><circle cx="8" cy="-6" r="8"/><circle cy="-12" r="9"/></g>'+
    '<g fill="#54923E"><circle cx="-4" cy="-10" r="4"/><circle cx="5" cy="-12" r="4"/></g>'+sheen(-2,-14,5,3,0,.25),
  slaw:()=>'<ellipse rx="42" ry="24" fill="#E8EBE0"/>'+rep(14,i=>'<path d="M'+((i*13)%60-30)+' '+((i*7)%30-14)+'l'+(12+(i%3)*4)+' '+((i%2)?3:-3)+'" stroke="'+(i%3?"#FFFFFF":"#8E3E6E")+'" stroke-width="2" stroke-linecap="round"/>'),
  sprouts:()=>'<ellipse rx="36" ry="18" fill="#EDEBE0"/>'+rep(12,i=>'<path d="M'+((i*11)%50-25)+' '+((i*5)%20-10)+'c6-4 12-4 18 0" stroke="#FFFFFF" stroke-width="2" fill="none"/>'),
  pumpkin:()=>'<path d="M-24 0c0-18 14-28 30-26 8 12 6 30-6 38-12 6-24 2-24-12z" fill="#D9761E"/>'+
    '<path d="M-18 2c2-12 10-18 20-18" stroke="#F8B562" stroke-width="3" fill="none"/>',
  zucchini:()=>'<circle r="11" fill="#3E6A22"/><circle cx="-1" cy="-1" r="8.5" fill="#E4E2B0"/>'+
    '<path d="M-7-2l14 4" stroke="#2A1E0C" stroke-width="2" opacity=".55"/>',
  pepper:()=>'<path d="M-20-4c12-6 30-6 40 2-10 6-28 6-40-2z" fill="#B82418"/>'+
    '<path d="M-14-3c10-4 24-4 32 1" stroke="#EE6A4A" stroke-width="2" fill="none" opacity=".7"/>'+
    '<path d="M-10-4l6 6M4-4l6 6" stroke="#2A0C06" stroke-width="2" opacity=".6"/>',
  egg:()=>'<path d="M-26 2c-2-16 14-24 28-20 18-4 30 8 24 22-6 14-26 16-40 12-8-2-12-8-12-14z" fill="#F7F4E8"/>'+
    '<circle cx="2" r="10" fill="#E08A16"/><circle cx="2" r="10" fill="url(#dSheen)" opacity=".5"/>'+
    '<circle cx="-1" cy="-3" r="3" fill="#FFE2A8"/>',
  yolkBowl:()=>'<ellipse cy="6" rx="22" ry="15" fill="#0B0908" opacity=".4" filter="url(#dSoft2)"/>'+
    '<ellipse rx="22" ry="15" fill="#EFE5D2"/><circle r="8" fill="#E8901A"/><circle cx="-2" cy="-2" r="2.4" fill="#FFD68A"/>',
  saltBowl:()=>'<ellipse cy="6" rx="22" ry="15" fill="#0B0908" opacity=".4" filter="url(#dSoft2)"/>'+
    '<ellipse rx="22" ry="15" fill="#EFE5D2"/><ellipse rx="16" ry="10" fill="#BCD096"/>'
};

/* ---------- toppings ---------- */
const TOP={
  onion:()=>'<g stroke="#D6E69A" stroke-width="3.2" stroke-linecap="round" fill="none"><path d="M-22-6c8-4 16-2 22 2"/>'+
    '<path d="M-16 2c10-6 22-4 28 0"/><path d="M-10-12c8-2 14 0 20 4"/><path d="M-26 6c6-2 12 0 18 2"/><path d="M0-4c6-4 14-2 18 2"/>'+
    '<path d="M-6 8c6-2 12-2 18 2"/></g><g stroke="#A9C66A" stroke-width="2" stroke-linecap="round"><path d="M-14-4l10 2"/><path d="M4 4l10-2"/></g>'+
    sheen(-4,-4,14,6,-16,.28),
  cheese:()=>'<path d="M-30-16c14-8 40-8 54 2 6 10-4 22-20 24-18 2-38-4-40-14-1-5 2-9 6-12z" fill="#F2DDA2"/>'+
    '<path d="M-28-12c14-6 38-6 50 2" stroke="#FFF6DC" stroke-width="4" opacity=".8" fill="none"/>'+
    sheen(-6,-8,16,6,-14,.4)+g(26,-26,.8,-30,X.herb()),
  mush:()=>'<path d="M-64 6c20-10 64-8 104 2 8 12-10 30-52 30-36 0-58-12-52-32z" fill="#B88A50"/>'+
    '<path d="M-56 8c20-8 58-6 92 2" stroke="#E0BE8A" stroke-width="4" opacity=".7" fill="none"/>'+
    '<g fill="#7A5028"><ellipse cx="-20" cy="16" rx="7" ry="4"/><ellipse cx="6" cy="22" rx="6" ry="3.5"/><ellipse cx="24" cy="12" rx="6" ry="3.5"/></g>'+
    '<g fill="#A63A2E"><rect x="-6" y="8" width="7" height="3" rx="1.5"/><rect x="12" y="22" width="7" height="3" rx="1.5"/></g>'+sheen(-18,10,22,6,-8,.22),
  bbq:()=>'<path d="M-46 0c10-20 40-30 70-24 22 6 34 18 30 32-6 16-40 22-70 16-24-6-36-12-30-24z" fill="#5A1A08" opacity=".72"/>'+
    '<path d="M-28 18c-4 10-14 18-28 16" stroke="#4E1606" stroke-width="9" stroke-linecap="round" fill="none" opacity=".85"/>'+
    sheen(-14,-8,24,7,-12,.3),
  peri:()=>'<path d="M-50-2c10-22 44-30 72-22 22 8 32 20 26 32-8 14-44 18-70 12-22-6-34-12-28-22z" fill="#A82A16" opacity=".62"/>'+
    '<path d="M-72 28c30 8 72 10 112 2 6 6 0 14-12 16-30 4-72 2-98-6-6-4-6-10-2-12z" fill="#B82E18"/>'+
    sheen(-10,-6,22,6,-12,.28)+g(-10,-20,.9,-20,X.herb()),
  thyme:()=>g(-20,-10,.9,-25,X.herb())
};

/* ---------- proteins ---------- */
const P={
  chicken:(top)=>'<path d="M-56-4c6-24 36-36 64-30 30 6 50 22 46 40-4 20-34 30-64 26-30-4-50-16-46-36z" fill="#8A4E20"/>'+
    '<path d="M-54-6c6-23 35-34 62-28 29 6 48 21 44 38-4 19-33 29-62 25-29-4-48-15-44-35z" fill="url(#dChick)"/>'+
    '<g stroke="#3E1D08" stroke-width="4.6" stroke-linecap="round" opacity=".8"><path d="M-40-18l16 36"/><path d="M-22-28l20 48"/>'+
    '<path d="M-2-32l20 52"/><path d="M18-28l18 44"/><path d="M36-18l10 24"/></g>'+
    sheen(-18,-18,20,8,-18,.3)+(top?TOP[top]():''),
  pork:(top)=>'<ellipse cx="2" cy="4" rx="46" ry="36" fill="#5E2E10"/><ellipse rx="46" ry="36" fill="url(#dPork)"/>'+
    '<g stroke="#331505" stroke-width="3.6" stroke-linecap="round" opacity=".76"><path d="M-30-18l40 44"/><path d="M-12-30l42 46"/>'+
    '<path d="M-38 4l24 26"/><path d="M-26 24l44-50"/><path d="M-4 30l38-42"/><path d="M-40 4l28-32"/></g>'+
    sheen(-18,-18,16,7,-20,.3)+(top?TOP[top]():''),
  chop:()=>'<path d="M34-26l44-34" stroke="#E4D8BE" stroke-width="12" stroke-linecap="round"/><circle cx="80" cy="-62" r="8" fill="#EFE6D2"/>'+
    '<path d="M-50 12c-6-30 18-52 48-50 32 2 52 22 48 46-4 22-28 32-54 30-22-2-38-10-42-26z" fill="#5E2E10" transform="translate(2 4)"/>'+
    '<path d="M-50 12c-6-30 18-52 48-50 32 2 52 22 48 46-4 22-28 32-54 30-22-2-38-10-42-26z" fill="url(#dPork)"/>'+
    '<g stroke="#331505" stroke-width="3.6" opacity=".72" stroke-linecap="round"><path d="M-30-20l40 44"/><path d="M-10-34l40 44"/>'+
    '<path d="M-40 10l30-34"/><path d="M-14 30l40-46"/></g>'+sheen(-18,-16,16,7,-20,.28),
  slices:(edge,inner,n)=>rep(n||6,i=>g(-50+i*19,Math.abs(i-((n||6)-1)/2)*3,1,-8+i*3,
    '<rect x="-11" y="-30" width="23" height="58" rx="7" fill="'+edge+'"/><rect x="-7" y="-23" width="15" height="44" rx="5" fill="'+inner+'"/>'+
    '<rect x="-11" y="-30" width="23" height="9" rx="4" fill="#24100A" opacity=".6"/>'+sheen(-4,-14,4,10,0,.22))),
  cubes:()=>[[-40,-10],[-14,-18],[12,-12],[38,-6],[-28,14],[0,10],[26,16]].map(([x,y])=>
    '<rect x="'+(x-14)+'" y="'+(y-12)+'" width="28" height="25" rx="6" fill="url(#dBeef)"/>'+
    '<rect x="'+(x-10)+'" y="'+(y-9)+'" width="12" height="5" rx="2.5" fill="#C4744A" opacity=".6"/>'+
    sheen(x-5,y-6,5,3,-20,.3)).join(""),
  steak:(sauce)=>'<path d="M-60 6c-2-26 30-40 64-36 34 4 56 22 50 42-6 22-40 30-72 24-26-4-42-14-42-30z" fill="url(#dBeef)"/>'+
    (sauce?'<path d="M-50 2c10-20 50-26 80-14 16 8 16 24 0 32-24 10-66 8-80-4-6-5-6-10 0-14z" fill="'+sauce+'"/>'+
      sheen(-16,-6,26,8,-10,.3):
      '<g stroke="#1E0A04" stroke-width="4" opacity=".72" stroke-linecap="round"><path d="M-40-10l20 36"/><path d="M-16-20l20 40"/>'+
      '<path d="M10-22l18 38"/></g>'+sheen(-20,-14,18,7,-16,.26)),
  picanha:()=>'<path d="M-64 20c-4-24 24-44 64-44 40 0 66 16 62 38-4 20-40 30-76 26-30-4-48-10-50-20z" fill="url(#dBeef)"/>'+
    '<path d="M-20-40c20-6 50-4 70 8l-6 16c-20-10-44-12-64-8z" fill="#C4545A"/>'+
    '<path d="M-20-40c20-6 50-4 70 8" stroke="#2A0E06" stroke-width="5" fill="none"/>'+sheen(-14,-26,18,6,-8,.3),
  patty:(sauce,top)=>(sauce==="truffle"?'<ellipse rx="88" ry="44" fill="#E2D9C4"/><ellipse rx="88" ry="44" fill="url(#dTruffle)"/>'+
      sheen(-24,-14,34,10,-10,.3):
      '<ellipse rx="80" ry="40" fill="#3A180C"/><path d="M10-12c32 0 62 12 68 30-20 16-52 20-72 12z" fill="#EAE2D2"/>'+
      sheen(-22,-12,28,9,-10,.22))+
    '<ellipse cy="-2" rx="40" ry="27" fill="#2E1408"/><ellipse cx="-2" cy="-6" rx="36" ry="23" fill="#5E2C12"/>'+
    rep(8,i=>'<circle cx="'+((i*17)%50-25)+'" cy="'+((i*11)%26-16)+'" r="1.6" fill="#1E0A02" opacity=".6"/>')+
    sheen(-16,-16,14,6,-18,.28)+
    (top==="egg"?'<ellipse cx="6" cy="-26" rx="18" ry="15" fill="#B87A3A"/><ellipse cx="1" cy="-31" rx="7" ry="5" fill="#EFC48A" opacity=".85"/>'+
      '<g stroke="#D98A3A" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M-6-40c4-10 10-12 14-4"/><path d="M4-44c6-8 12-6 12 2"/>'+
      '<path d="M-12-36c2-8 8-12 12-8"/><path d="M10-40c6-4 12-2 12 4"/></g>':
      rep(16,i=>'<rect x="'+((i*13)%54-27)+'" y="'+((i*7)%30-24)+'" width="5" height="2" rx="1" fill="#FBF6E6" transform="rotate('+(i*40)+' '+((i*13)%54-27)+' '+((i*7)%30-24)+')"/>')+
      g(-6,-26,.7,-20,X.herb())),
  fillet:(bass)=>'<path d="M-80 10c14-30 72-40 124-26 22 6 30 18 20 28-14 14-82 22-122 14-18-4-26-10-22-16z" fill="#8A5216" transform="translate(2 4)"/>'+
    '<path d="M-80 10c14-30 72-40 124-26 22 6 30 18 20 28-14 14-82 22-122 14-18-4-26-10-22-16z" fill="'+(bass?"#E0AE62":"url(#dFried)")+'"/>'+
    rep(26,i=>'<circle cx="'+((i*23)%130-70)+'" cy="'+((i*7)%26-12)+'" r="'+(1+(i%3)*.5)+'" fill="'+(i%2?"#FBE3AC":"#A8661E")+'" opacity=".85"/>')+
    sheen(-34,-8,30,8,-12,.25),
  tenders:()=>[[-30,-8,-10],[4,4,8],[-10,20,-4]].map(([x,y,r])=>g(x,y,1,r,
    '<path d="M-36-6c10-12 46-14 66-4 8 6 4 16-6 18-20 4-46 4-58-2-6-3-6-8-2-12z" fill="url(#dFried)"/>'+
    rep(8,i=>'<circle cx="'+(i*8-28)+'" cy="'+((i%3)*4-4)+'" r="1.6" fill="#A8661E"/>')+sheen(-14,-4,12,4,-10,.3))).join(""),
  tempura:(n)=>rep(n||3,i=>g(i*30-30,(i%2)*10,1,i*14-14,
    '<path d="M0 10c-8-26 16-44 42-36" stroke="#A8661E" stroke-width="19" stroke-linecap="round" fill="none"/>'+
    '<path d="M0 10c-8-26 16-44 42-36" stroke="url(#dFried)" stroke-width="15" stroke-linecap="round" fill="none"/>'+
    '<path d="M44-28l16-10 0 14z" fill="#C4381C"/>')),
  karaage:(n)=>rep(n||4,i=>g((i%3)*22-22,Math.floor(i/3)*18-6,1,i*30,
    '<path d="M-12-2c-2-10 8-16 16-12 10-2 14 8 10 16-2 10-14 12-20 6-6-2-8-6-6-10z" fill="url(#dFried)"/>'+
    '<circle cx="-3" cy="-4" r="2" fill="#FBE3AC"/><circle cx="5" cy="3" r="1.6" fill="#A8661E"/>')),
  salmon:(glaze)=>(glaze?'<ellipse cy="18" rx="84" ry="24" fill="'+glaze+'"/>'+sheen(-20,14,26,7,-6,.22):'')+
    '<path d="M-64-8c22-20 96-20 122-2 8 8 6 22-6 28-32 16-98 12-116-4-8-8-8-16 0-22z" fill="url(#dSalmon)"/>'+
    '<g stroke="#FFE0C8" stroke-width="2.6" fill="none" opacity=".9"><path d="M-40-14c6 10 6 22 0 30"/><path d="M-16-18c6 12 6 26 0 36"/>'+
    '<path d="M10-18c6 12 6 26 0 36"/><path d="M34-14c5 10 5 22 0 30"/></g>'+
    '<path d="M-60-12c24-16 90-16 116-2" stroke="#7A3212" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>'+
    sheen(-20,-6,26,7,-10,.3),
  whitefish:(sauce)=>(sauce?'<ellipse cy="16" rx="84" ry="24" fill="'+sauce+'"/>':'')+
    '<path d="M-62-6c20-18 92-18 118-2 8 8 4 20-8 26-30 14-94 12-112-4-6-6-6-14 2-20z" fill="#EFE0C6"/>'+
    '<path d="M-58-8c22-14 88-14 112 0" stroke="#A8662E" stroke-width="7" stroke-linecap="round" fill="none"/>'+
    '<g stroke="#4A280E" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M-30-6l10 18"/><path d="M-4-10l10 22"/><path d="M22-8l10 18"/></g>'+
    sheen(-24,-4,24,7,-10,.3),
  gindara:()=>'<ellipse cy="20" rx="82" ry="24" fill="#4A2008"/>'+
    '<path d="M-50-18c18-12 80-12 98 0 6 16 4 34-8 40-26 10-70 10-88-2-8-10-8-28-2-38z" fill="#F0E6D4"/>'+
    '<path d="M-50-18c18-12 80-12 98 0-6 12-24 16-48 16s-44-4-50-16z" fill="#BE7A34"/>'+
    '<path d="M-40-16c14-6 60-6 74 0" stroke="#7A3E12" stroke-width="3" fill="none"/>'+sheen(-22,-10,22,6,-8,.3),
  saba:()=>'<ellipse cy="18" rx="92" ry="22" fill="#4A2008"/>'+
    '<path d="M-86 2c22-22 118-26 158-6 8 6 6 14-4 18-42 14-116 14-154 0z" fill="#5E5E62"/>'+
    '<path d="M-80 8c40 10 110 10 150-2-6 8-40 14-78 14-34 0-60-4-72-12z" fill="#D2CABA"/>'+
    '<g stroke="#141414" stroke-width="3" opacity=".6" stroke-linecap="round"><path d="M-50-8l8 14"/><path d="M-20-12l8 16"/>'+
    '<path d="M12-12l8 16"/><path d="M42-8l6 12"/></g>'+
    '<path d="M-70-4c40-16 100-16 136-4" stroke="#7A3E12" stroke-width="5" fill="none" opacity=".6"/>'+sheen(-30,-4,28,6,-6,.28),
  prawns:(n)=>rep(n||5,i=>g((i%3)*30-30,Math.floor(i/3)*22-10,1,i*40,
    '<path d="M0 0c0-18 22-26 34-12 6 8 2 18-8 20" stroke="#B8341A" stroke-width="13" stroke-linecap="round" fill="none"/>'+
    '<path d="M0 0c0-18 22-26 34-12 6 8 2 18-8 20" stroke="#F07A48" stroke-width="9" stroke-linecap="round" fill="none"/>'+
    '<path d="M4-8c2-10 16-14 24-6" stroke="#FFC8AC" stroke-width="2" fill="none" stroke-dasharray="3 4"/>'+
    '<path d="M26 20l12 6-2-12z" fill="#A82C16"/>')),
  pasta:(sauce,strand,w,bits)=>'<ellipse rx="74" ry="42" fill="'+sauce+'"/>'+
    rep(9,i=>'<path d="M'+(-56+(i%3)*6)+' '+(-26+i*6)+'c16-12 32 8 48-4s32 8 48-2" stroke="'+strand+'" stroke-width="'+w+'" fill="none" stroke-linecap="round" opacity=".92"/>')+
    sheen(-22,-16,26,9,-10,.22)+(bits||""),
  rice:(extra)=>'<ellipse rx="76" ry="42" fill="#6E5A46"/><ellipse rx="76" ry="42" fill="url(#dGrain2)"/>'+(extra||"")+
    '<circle cx="4" cy="-12" r="16" fill="#DC6E16"/><circle cx="4" cy="-12" r="16" fill="url(#dSheen)" opacity=".5"/>'+
    '<circle cx="-1" cy="-17" r="5" fill="#FFCE92"/>'+
    rep(5,i=>'<path d="M'+(20+i*6)+' '+(-4+(i%2)*6)+'l8 3" stroke="#241E1A" stroke-width="3" stroke-linecap="round"/>'),
  mac:()=>'<rect x="-96" y="-50" width="192" height="100" rx="14" fill="#DEA33E"/>'+
    rep(26,i=>'<path d="M'+((i*29)%160-80)+' '+((i*13)%80-40)+'a6 6 0 0 1 10 4" stroke="#F7D46A" stroke-width="5" fill="none" stroke-linecap="round"/>')+
    '<path d="M-10-44c30-4 70 0 96 10 6 30 2 70-10 80-30 4-60 0-86-6z" fill="url(#dFried)"/>'+
    '<path d="M0-30c20 0 50 6 70 16" stroke="#B8441E" stroke-width="10" stroke-linecap="round" fill="none" opacity=".75"/>'+
    '<path d="M-60-10c6 20 20 30 30 32" stroke="#FFF3C4" stroke-width="5" stroke-linecap="round" fill="none"/>'+sheen(-40,-30,26,9,-10,.25),
  chashu:()=>'<ellipse cx="-14" cy="12" rx="76" ry="34" fill="#B8551A"/>'+sheen(-40,6,26,8,-8,.25)+
    '<circle r="42" fill="#6E3210"/><circle r="36" fill="#B87038"/>'+
    '<path d="M-3 0a3 3 0 1 1 6 0a9 9 0 1 1 -18 0a15 15 0 1 1 30 0a21 21 0 1 1 -42 0a27 27 0 1 1 54 0" stroke="#EFCB9A" stroke-width="3" fill="none" opacity=".8"/>'+
    sheen(-14,-16,14,6,-20,.3),
  ribs:()=>'<rect x="-88" y="-34" width="176" height="70" rx="16" fill="#1A0702" transform="translate(3 6)"/>'+
    '<rect x="-88" y="-34" width="176" height="70" rx="16" fill="url(#dRib)"/>'+
    '<path d="M-72-22c40-10 104-10 144 0" stroke="#C4602E" stroke-width="5" opacity=".65" fill="none" stroke-linecap="round"/>'+
    '<g stroke="#180600" stroke-width="2" opacity=".55">'+rep(6,i=>'<path d="M'+(-60+i*24)+'-30v62"/>')+'</g>'+
    sheen(-40,-20,34,8,-6,.22)+g(-40,-10,1.4,-12,X.herb()),
  nanban:()=>'<path d="M-66 0c4-30 40-40 74-34 34 6 52 22 46 42-6 22-40 30-74 24-30-4-50-14-46-32z" fill="url(#dFried)"/>'+
    rep(14,i=>'<circle cx="'+((i*17)%100-50)+'" cy="'+((i*11)%40-20)+'" r="1.8" fill="#A8661E"/>')+
    '<path d="M-64-6c10-18 40-24 56-14 6 14-10 34-34 36-18 2-28-8-22-22z" fill="#EDEADF"/>'+
    '<g fill="#6E9A45"><circle cx="-40" cy="-2" r="1.8"/><circle cx="-28" cy="6" r="1.6"/><circle cx="-20" cy="-8" r="1.6"/></g>'+sheen(-30,-10,16,6,-16,.35)
};

/* ---------- plating templates ---------- */
const T={
  plate:(prot,o)=>{o=o||{};return BG.table+VINE+V.plate()+far(g(216,64,1.3,0,X.greens())+
    (o.carrot===false?'':g(140,60,.95,20,X.carrot()))+TOM(244,52,1))+
    (o.corn===false?'':g(246,130,.8,-8,X.corn()))+(o.garlic?g(252,86,.8,0,X.garlic()):'')+(o.extra||'')+
    (o.sauce?gs(92,94,1,0,X.ramekin(o.sauce,o.chili)):'')+gs(o.x||174,o.y||124,o.s||1,o.r||0,prot)+
    (o.sauce2?gs(118,62,.8,0,X.ramekin(o.sauce2)):'')+(o.steam===false?'':steam(o.x||174,(o.y||124)-46,.9));},
  combo:(a,b,s1,s2)=>BG.table+VINE+V.plate()+far(g(216,62,1.2,0,X.greens())+g(142,58,.9,20,X.carrot())+TOM(244,52,1))+
    g(250,132,.78,-8,X.corn())+gs(88,86,.85,0,X.ramekin(s1))+(s2?gs(126,58,.75,0,X.ramekin(s2)):'')+
    gs(124,130,.92,-6,a)+gs(212,120,.94,8,b)+steam(168,74,.8),
  sizz:(prot,o)=>{o=o||{};return BG.table+V.sizzler()+far(g(208,64,.9,0,X.lotus())+TOM(190,54,1))+
    g(236,84,.8,-10,X.corn())+g(250,116,.9,0,X.shimeji())+(o.chips!==false?g(96,92,.9,0,X.chips()):'')+(o.extra||'')+
    gs(o.x||158,o.y||112,o.s||1,o.r||0,prot)+steam((o.x||158)+6,(o.y||112)-52,1.1);},
  tray:(prot,o)=>{o=o||{};return BG.table+V.tray(o.paper!==false,o.metal)+(o.fries!==false?g(232,92,1,0,X.fries(9)):'')+
    (o.cup!==false?gs(96,74,1,0,X.cup()):'')+(o.extra||'')+gs(o.x||150,o.y||122,o.s||1,o.r||0,prot)+
    (o.lemon?g(o.lx||160,o.ly||112,.9,0,X.lemon()):'');},
  bowl:(content,grad)=>BG.table+V.bowl(grad)+gs(160,112,1,0,content)+steam(164,58,.9),
  small:(content,bg)=>(BG[bg||"marble"])+V.small()+gs(160,108,1,0,content),
  wbowl:(fill,content)=>BG.marble+V.wbowl(fill)+g(160,108,1,0,content||'')
};

/* ---------- drinks ---------- */
const DR={
  glass:(c,o)=>{o=o||{};return BG.sage+'<ellipse cx="160" cy="186" rx="52" ry="9" fill="#2E4420" opacity=".3" filter="url(#dSoft)"/>'+
    '<path d="M130 24h60l-6 152a8 8 0 0 1-8 8h-32a8 8 0 0 1-8-8z" fill="#FFFFFF" opacity=".45"/>'+
    '<path d="M132 '+(o.low?70:48)+'h56l-5 128a8 8 0 0 1-8 8h-30a8 8 0 0 1-8-8z" fill="'+c+'"/>'+
    '<path d="M132 '+(o.low?70:48)+'h56l-5 128a8 8 0 0 1-8 8h-30a8 8 0 0 1-8-8z" fill="url(#dSheen)" opacity=".45"/>'+
    (o.foam?'<path d="M132 48h56l-.4 9h-55.2z" fill="'+o.foam+'"/>':'')+
    '<path d="M138 30l4 142" stroke="#FFFFFF" stroke-width="4" opacity=".65"/>'+
    '<path d="M182 34l2 140" stroke="#FFFFFF" stroke-width="2" opacity=".35"/>'+
    (o.lemon?g(186,50,.9,0,X.lemon()):'')+(o.straw?'<rect x="170" y="4" width="5" height="70" rx="2.5" fill="#CE4230" transform="rotate(12 172 40)"/>':'');},
  carafe:(c,n)=>BG.sage+'<rect x="84" y="170" width="152" height="16" rx="3" fill="#7A4C28"/>'+
    '<ellipse cx="160" cy="170" rx="54" ry="8" fill="#2E4420" opacity=".3" filter="url(#dSoft)"/>'+
    '<path d="M138 26h44v22c18 10 24 28 24 48v64a10 10 0 0 1-10 10h-72a10 10 0 0 1-10-10v-64c0-20 6-38 24-48z" fill="#FFFFFF" opacity=".5"/>'+
    '<path d="M122 80h76c4 8 6 14 6 20v58a10 10 0 0 1-10 10h-68a10 10 0 0 1-10-10v-58c0-6 2-12 6-20z" fill="'+c+'"/>'+
    '<path d="M122 80h76c4 8 6 14 6 20v58a10 10 0 0 1-10 10h-68a10 10 0 0 1-10-10v-58c0-6 2-12 6-20z" fill="url(#dSheen)" opacity=".4"/>'+
    '<path d="M130 60v100" stroke="#FFFFFF" stroke-width="4" opacity=".6"/>'+
    '<circle cx="186" cy="150" r="9" fill="#F7F9F2"/><text x="186" y="153.5" text-anchor="middle" font-family="Karla,Arial,sans-serif" font-size="9" font-weight="700" fill="#1F4D3A">0'+n+'</text>',
  bottle:()=>BG.sage+'<ellipse cx="160" cy="186" rx="34" ry="7" fill="#2E4420" opacity=".3" filter="url(#dSoft)"/>'+
    '<path d="M146 18h28v18c10 6 16 18 16 30v106a10 10 0 0 1-10 10h-40a10 10 0 0 1-10-10v-106c0-12 6-24 16-30z" fill="#E4F1F5" opacity=".9"/>'+
    '<path d="M146 18h28v18c10 6 16 18 16 30v106a10 10 0 0 1-10 10h-40a10 10 0 0 1-10-10v-106c0-12 6-24 16-30z" fill="url(#dSheen)" opacity=".5"/>'+
    '<rect x="146" y="10" width="28" height="12" rx="3" fill="#2E6FB0"/><rect x="132" y="92" width="56" height="34" fill="#FFFFFF" opacity=".9"/>'+
    '<path d="M136 50v116" stroke="#FFFFFF" stroke-width="4" opacity=".8"/>'
};

const PH={"none": "{{datauri:assets/images/ph/none.webp}}", "set2": "{{datauri:assets/images/ph/set2.webp}}", "set5": "{{datauri:assets/images/ph/set5.webp}}", "cubes": "{{datauri:assets/images/ph/cubes.webp}}", "truffle": "{{datauri:assets/images/ph/truffle.webp}}", "collar": "{{datauri:assets/images/ph/collar.webp}}", "chop": "{{datauri:assets/images/ph/chop.webp}}", "cheesechicken": "{{datauri:assets/images/ph/cheesechicken.webp}}", "salmonprawn": "{{datauri:assets/images/ph/salmonprawn.webp}}", "nordic": "{{datauri:assets/images/ph/nordic.webp}}", "pesto": "{{datauri:assets/images/ph/pesto.webp}}", "trufflepork": "{{datauri:assets/images/ph/trufflepork.webp}}", "kidfried": "{{datauri:assets/images/ph/kidfried.webp}}", "fries": "{{datauri:assets/images/ph/fries.webp}}", "sweetpotato": "{{datauri:assets/images/ph/sweetpotato.webp}}", "mash": "{{datauri:assets/images/ph/mash.webp}}", "shimeji": "{{datauri:assets/images/ph/shimeji.webp}}", "noririce": "{{datauri:assets/images/ph/noririce.webp}}", "egg": "{{datauri:assets/images/ph/egg.webp}}", "cheddar": "{{datauri:assets/images/ph/cheddar.webp}}", "sausage": "{{datauri:assets/images/ph/sausage.webp}}", "karaage": "{{datauri:assets/images/ph/karaage.webp}}", "tempura": "{{datauri:assets/images/ph/tempura.webp}}", "deepgreen": "{{datauri:assets/images/ph/deepgreen.webp}}", "greenmelon": "{{datauri:assets/images/ph/greenmelon.webp}}", "sunrise": "{{datauri:assets/images/ph/sunrise.webp}}", "ruby": "{{datauri:assets/images/ph/ruby.webp}}", "redbalance": "{{datauri:assets/images/ph/redbalance.webp}}", "applewheat": "{{datauri:assets/images/ph/applewheat.webp}}", "lemonwheat": "{{datauri:assets/images/ph/lemonwheat.webp}}", "coconutwheat": "{{datauri:assets/images/ph/coconutwheat.webp}}", "wheatshort": "{{datauri:assets/images/ph/wheatshort.webp}}", "coconut": "{{datauri:assets/images/ph/coconut.webp}}", "apple": "{{datauri:assets/images/ph/apple.webp}}", "carrotjuice": "{{datauri:assets/images/ph/carrotjuice.webp}}", "water": "{{datauri:assets/images/ph/water.webp}}", "rolltoss": "{{datauri:assets/images/ph/rolltoss.webp}}", "superfood": "{{datauri:assets/images/ph/superfood.webp}}", "focaccia": "{{datauri:assets/images/ph/focaccia.webp}}", "bakeday": "{{datauri:assets/images/ph/bakeday.webp}}", "yogurt": "{{datauri:assets/images/ph/yogurt.webp}}", "soupday": "{{datauri:assets/images/ph/soupday.webp}}", "tokyosweet": "{{datauri:assets/images/ph/tokyosweet.webp}}", "pastaday": "{{datauri:assets/images/ph/pastaday.webp}}", "fruitcup": "{{datauri:assets/images/ph/fruitcup.webp}}"};
const STEAK_FRAMES=["{{b64:assets/frames/steak_frames/000.webp}}","{{b64:assets/frames/steak_frames/001.webp}}","{{b64:assets/frames/steak_frames/002.webp}}","{{b64:assets/frames/steak_frames/003.webp}}","{{b64:assets/frames/steak_frames/004.webp}}","{{b64:assets/frames/steak_frames/005.webp}}","{{b64:assets/frames/steak_frames/006.webp}}","{{b64:assets/frames/steak_frames/007.webp}}","{{b64:assets/frames/steak_frames/008.webp}}","{{b64:assets/frames/steak_frames/009.webp}}","{{b64:assets/frames/steak_frames/010.webp}}","{{b64:assets/frames/steak_frames/011.webp}}","{{b64:assets/frames/steak_frames/012.webp}}","{{b64:assets/frames/steak_frames/013.webp}}","{{b64:assets/frames/steak_frames/014.webp}}","{{b64:assets/frames/steak_frames/015.webp}}","{{b64:assets/frames/steak_frames/016.webp}}","{{b64:assets/frames/steak_frames/017.webp}}","{{b64:assets/frames/steak_frames/018.webp}}","{{b64:assets/frames/steak_frames/019.webp}}","{{b64:assets/frames/steak_frames/020.webp}}","{{b64:assets/frames/steak_frames/021.webp}}","{{b64:assets/frames/steak_frames/022.webp}}","{{b64:assets/frames/steak_frames/023.webp}}","{{b64:assets/frames/steak_frames/024.webp}}","{{b64:assets/frames/steak_frames/025.webp}}","{{b64:assets/frames/steak_frames/026.webp}}","{{b64:assets/frames/steak_frames/027.webp}}","{{b64:assets/frames/steak_frames/028.webp}}","{{b64:assets/frames/steak_frames/029.webp}}","{{b64:assets/frames/steak_frames/030.webp}}","{{b64:assets/frames/steak_frames/031.webp}}","{{b64:assets/frames/steak_frames/032.webp}}","{{b64:assets/frames/steak_frames/033.webp}}","{{b64:assets/frames/steak_frames/034.webp}}","{{b64:assets/frames/steak_frames/035.webp}}","{{b64:assets/frames/steak_frames/036.webp}}","{{b64:assets/frames/steak_frames/037.webp}}","{{b64:assets/frames/steak_frames/038.webp}}","{{b64:assets/frames/steak_frames/039.webp}}","{{b64:assets/frames/steak_frames/040.webp}}","{{b64:assets/frames/steak_frames/041.webp}}","{{b64:assets/frames/steak_frames/042.webp}}","{{b64:assets/frames/steak_frames/043.webp}}","{{b64:assets/frames/steak_frames/044.webp}}","{{b64:assets/frames/steak_frames/045.webp}}","{{b64:assets/frames/steak_frames/046.webp}}","{{b64:assets/frames/steak_frames/047.webp}}"];   /* cloud world: the steak plate among the clouds, 960x540, 12 per second */
const FARM_FRAMES=["{{b64:assets/frames/farm_frames/000.webp}}","{{b64:assets/frames/farm_frames/001.webp}}","{{b64:assets/frames/farm_frames/002.webp}}","{{b64:assets/frames/farm_frames/003.webp}}","{{b64:assets/frames/farm_frames/004.webp}}","{{b64:assets/frames/farm_frames/005.webp}}","{{b64:assets/frames/farm_frames/006.webp}}","{{b64:assets/frames/farm_frames/007.webp}}","{{b64:assets/frames/farm_frames/008.webp}}","{{b64:assets/frames/farm_frames/009.webp}}","{{b64:assets/frames/farm_frames/010.webp}}","{{b64:assets/frames/farm_frames/011.webp}}","{{b64:assets/frames/farm_frames/012.webp}}","{{b64:assets/frames/farm_frames/013.webp}}","{{b64:assets/frames/farm_frames/014.webp}}","{{b64:assets/frames/farm_frames/015.webp}}","{{b64:assets/frames/farm_frames/016.webp}}","{{b64:assets/frames/farm_frames/017.webp}}","{{b64:assets/frames/farm_frames/018.webp}}","{{b64:assets/frames/farm_frames/019.webp}}","{{b64:assets/frames/farm_frames/020.webp}}","{{b64:assets/frames/farm_frames/021.webp}}","{{b64:assets/frames/farm_frames/022.webp}}","{{b64:assets/frames/farm_frames/023.webp}}","{{b64:assets/frames/farm_frames/024.webp}}","{{b64:assets/frames/farm_frames/025.webp}}","{{b64:assets/frames/farm_frames/026.webp}}","{{b64:assets/frames/farm_frames/027.webp}}","{{b64:assets/frames/farm_frames/028.webp}}","{{b64:assets/frames/farm_frames/029.webp}}","{{b64:assets/frames/farm_frames/030.webp}}","{{b64:assets/frames/farm_frames/031.webp}}","{{b64:assets/frames/farm_frames/032.webp}}","{{b64:assets/frames/farm_frames/033.webp}}","{{b64:assets/frames/farm_frames/034.webp}}","{{b64:assets/frames/farm_frames/035.webp}}","{{b64:assets/frames/farm_frames/036.webp}}","{{b64:assets/frames/farm_frames/037.webp}}","{{b64:assets/frames/farm_frames/038.webp}}","{{b64:assets/frames/farm_frames/039.webp}}","{{b64:assets/frames/farm_frames/040.webp}}","{{b64:assets/frames/farm_frames/041.webp}}","{{b64:assets/frames/farm_frames/042.webp}}","{{b64:assets/frames/farm_frames/043.webp}}","{{b64:assets/frames/farm_frames/044.webp}}","{{b64:assets/frames/farm_frames/045.webp}}","{{b64:assets/frames/farm_frames/046.webp}}","{{b64:assets/frames/farm_frames/047.webp}}","{{b64:assets/frames/farm_frames/048.webp}}","{{b64:assets/frames/farm_frames/049.webp}}","{{b64:assets/frames/farm_frames/050.webp}}","{{b64:assets/frames/farm_frames/051.webp}}","{{b64:assets/frames/farm_frames/052.webp}}","{{b64:assets/frames/farm_frames/053.webp}}","{{b64:assets/frames/farm_frames/054.webp}}","{{b64:assets/frames/farm_frames/055.webp}}","{{b64:assets/frames/farm_frames/056.webp}}","{{b64:assets/frames/farm_frames/057.webp}}","{{b64:assets/frames/farm_frames/058.webp}}","{{b64:assets/frames/farm_frames/059.webp}}","{{b64:assets/frames/farm_frames/060.webp}}","{{b64:assets/frames/farm_frames/061.webp}}","{{b64:assets/frames/farm_frames/062.webp}}","{{b64:assets/frames/farm_frames/063.webp}}","{{b64:assets/frames/farm_frames/064.webp}}","{{b64:assets/frames/farm_frames/065.webp}}","{{b64:assets/frames/farm_frames/066.webp}}","{{b64:assets/frames/farm_frames/067.webp}}","{{b64:assets/frames/farm_frames/068.webp}}","{{b64:assets/frames/farm_frames/069.webp}}","{{b64:assets/frames/farm_frames/070.webp}}","{{b64:assets/frames/farm_frames/071.webp}}","{{b64:assets/frames/farm_frames/072.webp}}","{{b64:assets/frames/farm_frames/073.webp}}","{{b64:assets/frames/farm_frames/074.webp}}","{{b64:assets/frames/farm_frames/075.webp}}","{{b64:assets/frames/farm_frames/076.webp}}","{{b64:assets/frames/farm_frames/077.webp}}","{{b64:assets/frames/farm_frames/078.webp}}","{{b64:assets/frames/farm_frames/079.webp}}","{{b64:assets/frames/farm_frames/080.webp}}","{{b64:assets/frames/farm_frames/081.webp}}","{{b64:assets/frames/farm_frames/082.webp}}","{{b64:assets/frames/farm_frames/083.webp}}","{{b64:assets/frames/farm_frames/084.webp}}","{{b64:assets/frames/farm_frames/085.webp}}","{{b64:assets/frames/farm_frames/086.webp}}","{{b64:assets/frames/farm_frames/087.webp}}","{{b64:assets/frames/farm_frames/088.webp}}","{{b64:assets/frames/farm_frames/089.webp}}","{{b64:assets/frames/farm_frames/090.webp}}","{{b64:assets/frames/farm_frames/091.webp}}","{{b64:assets/frames/farm_frames/092.webp}}","{{b64:assets/frames/farm_frames/093.webp}}","{{b64:assets/frames/farm_frames/094.webp}}","{{b64:assets/frames/farm_frames/095.webp}}","{{b64:assets/frames/farm_frames/096.webp}}","{{b64:assets/frames/farm_frames/097.webp}}","{{b64:assets/frames/farm_frames/098.webp}}","{{b64:assets/frames/farm_frames/099.webp}}","{{b64:assets/frames/farm_frames/100.webp}}","{{b64:assets/frames/farm_frames/101.webp}}","{{b64:assets/frames/farm_frames/102.webp}}","{{b64:assets/frames/farm_frames/103.webp}}","{{b64:assets/frames/farm_frames/104.webp}}","{{b64:assets/frames/farm_frames/105.webp}}","{{b64:assets/frames/farm_frames/106.webp}}","{{b64:assets/frames/farm_frames/107.webp}}","{{b64:assets/frames/farm_frames/108.webp}}","{{b64:assets/frames/farm_frames/109.webp}}","{{b64:assets/frames/farm_frames/110.webp}}","{{b64:assets/frames/farm_frames/111.webp}}","{{b64:assets/frames/farm_frames/112.webp}}","{{b64:assets/frames/farm_frames/113.webp}}","{{b64:assets/frames/farm_frames/114.webp}}","{{b64:assets/frames/farm_frames/115.webp}}","{{b64:assets/frames/farm_frames/116.webp}}","{{b64:assets/frames/farm_frames/117.webp}}","{{b64:assets/frames/farm_frames/118.webp}}","{{b64:assets/frames/farm_frames/119.webp}}"];   /* the farm footage, 960x540, every second frame */
const PACK_FRAMES=["{{b64:assets/frames/pack_frames/000.webp}}","{{b64:assets/frames/pack_frames/001.webp}}","{{b64:assets/frames/pack_frames/002.webp}}","{{b64:assets/frames/pack_frames/003.webp}}","{{b64:assets/frames/pack_frames/004.webp}}","{{b64:assets/frames/pack_frames/005.webp}}","{{b64:assets/frames/pack_frames/006.webp}}","{{b64:assets/frames/pack_frames/007.webp}}","{{b64:assets/frames/pack_frames/008.webp}}","{{b64:assets/frames/pack_frames/009.webp}}","{{b64:assets/frames/pack_frames/010.webp}}","{{b64:assets/frames/pack_frames/011.webp}}","{{b64:assets/frames/pack_frames/012.webp}}","{{b64:assets/frames/pack_frames/013.webp}}","{{b64:assets/frames/pack_frames/014.webp}}","{{b64:assets/frames/pack_frames/015.webp}}","{{b64:assets/frames/pack_frames/016.webp}}","{{b64:assets/frames/pack_frames/017.webp}}","{{b64:assets/frames/pack_frames/018.webp}}","{{b64:assets/frames/pack_frames/019.webp}}","{{b64:assets/frames/pack_frames/020.webp}}","{{b64:assets/frames/pack_frames/021.webp}}","{{b64:assets/frames/pack_frames/022.webp}}","{{b64:assets/frames/pack_frames/023.webp}}","{{b64:assets/frames/pack_frames/024.webp}}","{{b64:assets/frames/pack_frames/025.webp}}","{{b64:assets/frames/pack_frames/026.webp}}","{{b64:assets/frames/pack_frames/027.webp}}","{{b64:assets/frames/pack_frames/028.webp}}","{{b64:assets/frames/pack_frames/029.webp}}","{{b64:assets/frames/pack_frames/030.webp}}","{{b64:assets/frames/pack_frames/031.webp}}","{{b64:assets/frames/pack_frames/032.webp}}","{{b64:assets/frames/pack_frames/033.webp}}","{{b64:assets/frames/pack_frames/034.webp}}","{{b64:assets/frames/pack_frames/035.webp}}","{{b64:assets/frames/pack_frames/036.webp}}","{{b64:assets/frames/pack_frames/037.webp}}","{{b64:assets/frames/pack_frames/038.webp}}","{{b64:assets/frames/pack_frames/039.webp}}","{{b64:assets/frames/pack_frames/040.webp}}","{{b64:assets/frames/pack_frames/041.webp}}","{{b64:assets/frames/pack_frames/042.webp}}","{{b64:assets/frames/pack_frames/043.webp}}","{{b64:assets/frames/pack_frames/044.webp}}","{{b64:assets/frames/pack_frames/045.webp}}","{{b64:assets/frames/pack_frames/046.webp}}","{{b64:assets/frames/pack_frames/047.webp}}","{{b64:assets/frames/pack_frames/048.webp}}","{{b64:assets/frames/pack_frames/049.webp}}","{{b64:assets/frames/pack_frames/050.webp}}","{{b64:assets/frames/pack_frames/051.webp}}","{{b64:assets/frames/pack_frames/052.webp}}","{{b64:assets/frames/pack_frames/053.webp}}","{{b64:assets/frames/pack_frames/054.webp}}","{{b64:assets/frames/pack_frames/055.webp}}","{{b64:assets/frames/pack_frames/056.webp}}","{{b64:assets/frames/pack_frames/057.webp}}","{{b64:assets/frames/pack_frames/058.webp}}","{{b64:assets/frames/pack_frames/059.webp}}","{{b64:assets/frames/pack_frames/060.webp}}","{{b64:assets/frames/pack_frames/061.webp}}","{{b64:assets/frames/pack_frames/062.webp}}","{{b64:assets/frames/pack_frames/063.webp}}","{{b64:assets/frames/pack_frames/064.webp}}","{{b64:assets/frames/pack_frames/065.webp}}","{{b64:assets/frames/pack_frames/066.webp}}","{{b64:assets/frames/pack_frames/067.webp}}","{{b64:assets/frames/pack_frames/068.webp}}","{{b64:assets/frames/pack_frames/069.webp}}","{{b64:assets/frames/pack_frames/070.webp}}","{{b64:assets/frames/pack_frames/071.webp}}","{{b64:assets/frames/pack_frames/072.webp}}","{{b64:assets/frames/pack_frames/073.webp}}","{{b64:assets/frames/pack_frames/074.webp}}","{{b64:assets/frames/pack_frames/075.webp}}","{{b64:assets/frames/pack_frames/076.webp}}","{{b64:assets/frames/pack_frames/077.webp}}","{{b64:assets/frames/pack_frames/078.webp}}","{{b64:assets/frames/pack_frames/079.webp}}","{{b64:assets/frames/pack_frames/080.webp}}","{{b64:assets/frames/pack_frames/081.webp}}","{{b64:assets/frames/pack_frames/082.webp}}","{{b64:assets/frames/pack_frames/083.webp}}","{{b64:assets/frames/pack_frames/084.webp}}","{{b64:assets/frames/pack_frames/085.webp}}","{{b64:assets/frames/pack_frames/086.webp}}","{{b64:assets/frames/pack_frames/087.webp}}","{{b64:assets/frames/pack_frames/088.webp}}","{{b64:assets/frames/pack_frames/089.webp}}","{{b64:assets/frames/pack_frames/090.webp}}","{{b64:assets/frames/pack_frames/091.webp}}","{{b64:assets/frames/pack_frames/092.webp}}","{{b64:assets/frames/pack_frames/093.webp}}","{{b64:assets/frames/pack_frames/094.webp}}","{{b64:assets/frames/pack_frames/095.webp}}","{{b64:assets/frames/pack_frames/096.webp}}","{{b64:assets/frames/pack_frames/097.webp}}","{{b64:assets/frames/pack_frames/098.webp}}","{{b64:assets/frames/pack_frames/099.webp}}","{{b64:assets/frames/pack_frames/100.webp}}","{{b64:assets/frames/pack_frames/101.webp}}","{{b64:assets/frames/pack_frames/102.webp}}","{{b64:assets/frames/pack_frames/103.webp}}","{{b64:assets/frames/pack_frames/104.webp}}","{{b64:assets/frames/pack_frames/105.webp}}","{{b64:assets/frames/pack_frames/106.webp}}","{{b64:assets/frames/pack_frames/107.webp}}","{{b64:assets/frames/pack_frames/108.webp}}","{{b64:assets/frames/pack_frames/109.webp}}","{{b64:assets/frames/pack_frames/110.webp}}","{{b64:assets/frames/pack_frames/111.webp}}","{{b64:assets/frames/pack_frames/112.webp}}","{{b64:assets/frames/pack_frames/113.webp}}","{{b64:assets/frames/pack_frames/114.webp}}","{{b64:assets/frames/pack_frames/115.webp}}","{{b64:assets/frames/pack_frames/116.webp}}","{{b64:assets/frames/pack_frames/117.webp}}","{{b64:assets/frames/pack_frames/118.webp}}","{{b64:assets/frames/pack_frames/119.webp}}","{{b64:assets/frames/pack_frames/120.webp}}","{{b64:assets/frames/pack_frames/121.webp}}","{{b64:assets/frames/pack_frames/122.webp}}","{{b64:assets/frames/pack_frames/123.webp}}","{{b64:assets/frames/pack_frames/124.webp}}","{{b64:assets/frames/pack_frames/125.webp}}","{{b64:assets/frames/pack_frames/126.webp}}","{{b64:assets/frames/pack_frames/127.webp}}","{{b64:assets/frames/pack_frames/128.webp}}","{{b64:assets/frames/pack_frames/129.webp}}","{{b64:assets/frames/pack_frames/130.webp}}","{{b64:assets/frames/pack_frames/131.webp}}","{{b64:assets/frames/pack_frames/132.webp}}","{{b64:assets/frames/pack_frames/133.webp}}","{{b64:assets/frames/pack_frames/134.webp}}","{{b64:assets/frames/pack_frames/135.webp}}","{{b64:assets/frames/pack_frames/136.webp}}","{{b64:assets/frames/pack_frames/137.webp}}","{{b64:assets/frames/pack_frames/138.webp}}","{{b64:assets/frames/pack_frames/139.webp}}","{{b64:assets/frames/pack_frames/140.webp}}","{{b64:assets/frames/pack_frames/141.webp}}","{{b64:assets/frames/pack_frames/142.webp}}","{{b64:assets/frames/pack_frames/143.webp}}","{{b64:assets/frames/pack_frames/144.webp}}","{{b64:assets/frames/pack_frames/145.webp}}","{{b64:assets/frames/pack_frames/146.webp}}","{{b64:assets/frames/pack_frames/147.webp}}","{{b64:assets/frames/pack_frames/148.webp}}","{{b64:assets/frames/pack_frames/149.webp}}","{{b64:assets/frames/pack_frames/150.webp}}","{{b64:assets/frames/pack_frames/151.webp}}","{{b64:assets/frames/pack_frames/152.webp}}","{{b64:assets/frames/pack_frames/153.webp}}","{{b64:assets/frames/pack_frames/154.webp}}","{{b64:assets/frames/pack_frames/155.webp}}","{{b64:assets/frames/pack_frames/156.webp}}","{{b64:assets/frames/pack_frames/157.webp}}","{{b64:assets/frames/pack_frames/158.webp}}","{{b64:assets/frames/pack_frames/159.webp}}","{{b64:assets/frames/pack_frames/160.webp}}","{{b64:assets/frames/pack_frames/161.webp}}","{{b64:assets/frames/pack_frames/162.webp}}","{{b64:assets/frames/pack_frames/163.webp}}","{{b64:assets/frames/pack_frames/164.webp}}","{{b64:assets/frames/pack_frames/165.webp}}","{{b64:assets/frames/pack_frames/166.webp}}","{{b64:assets/frames/pack_frames/167.webp}}","{{b64:assets/frames/pack_frames/168.webp}}","{{b64:assets/frames/pack_frames/169.webp}}","{{b64:assets/frames/pack_frames/170.webp}}","{{b64:assets/frames/pack_frames/171.webp}}","{{b64:assets/frames/pack_frames/172.webp}}","{{b64:assets/frames/pack_frames/173.webp}}","{{b64:assets/frames/pack_frames/174.webp}}","{{b64:assets/frames/pack_frames/175.webp}}","{{b64:assets/frames/pack_frames/176.webp}}","{{b64:assets/frames/pack_frames/177.webp}}","{{b64:assets/frames/pack_frames/178.webp}}","{{b64:assets/frames/pack_frames/179.webp}}","{{b64:assets/frames/pack_frames/180.webp}}","{{b64:assets/frames/pack_frames/181.webp}}","{{b64:assets/frames/pack_frames/182.webp}}","{{b64:assets/frames/pack_frames/183.webp}}","{{b64:assets/frames/pack_frames/184.webp}}","{{b64:assets/frames/pack_frames/185.webp}}","{{b64:assets/frames/pack_frames/186.webp}}","{{b64:assets/frames/pack_frames/187.webp}}","{{b64:assets/frames/pack_frames/188.webp}}","{{b64:assets/frames/pack_frames/189.webp}}","{{b64:assets/frames/pack_frames/190.webp}}","{{b64:assets/frames/pack_frames/191.webp}}","{{b64:assets/frames/pack_frames/192.webp}}","{{b64:assets/frames/pack_frames/193.webp}}","{{b64:assets/frames/pack_frames/194.webp}}","{{b64:assets/frames/pack_frames/195.webp}}","{{b64:assets/frames/pack_frames/196.webp}}","{{b64:assets/frames/pack_frames/197.webp}}","{{b64:assets/frames/pack_frames/198.webp}}","{{b64:assets/frames/pack_frames/199.webp}}","{{b64:assets/frames/pack_frames/200.webp}}","{{b64:assets/frames/pack_frames/201.webp}}","{{b64:assets/frames/pack_frames/202.webp}}","{{b64:assets/frames/pack_frames/203.webp}}","{{b64:assets/frames/pack_frames/204.webp}}","{{b64:assets/frames/pack_frames/205.webp}}","{{b64:assets/frames/pack_frames/206.webp}}","{{b64:assets/frames/pack_frames/207.webp}}","{{b64:assets/frames/pack_frames/208.webp}}","{{b64:assets/frames/pack_frames/209.webp}}","{{b64:assets/frames/pack_frames/210.webp}}","{{b64:assets/frames/pack_frames/211.webp}}","{{b64:assets/frames/pack_frames/212.webp}}","{{b64:assets/frames/pack_frames/213.webp}}","{{b64:assets/frames/pack_frames/214.webp}}","{{b64:assets/frames/pack_frames/215.webp}}","{{b64:assets/frames/pack_frames/216.webp}}","{{b64:assets/frames/pack_frames/217.webp}}","{{b64:assets/frames/pack_frames/218.webp}}","{{b64:assets/frames/pack_frames/219.webp}}","{{b64:assets/frames/pack_frames/220.webp}}","{{b64:assets/frames/pack_frames/221.webp}}","{{b64:assets/frames/pack_frames/222.webp}}","{{b64:assets/frames/pack_frames/223.webp}}","{{b64:assets/frames/pack_frames/224.webp}}","{{b64:assets/frames/pack_frames/225.webp}}","{{b64:assets/frames/pack_frames/226.webp}}","{{b64:assets/frames/pack_frames/227.webp}}","{{b64:assets/frames/pack_frames/228.webp}}","{{b64:assets/frames/pack_frames/229.webp}}","{{b64:assets/frames/pack_frames/230.webp}}","{{b64:assets/frames/pack_frames/231.webp}}","{{b64:assets/frames/pack_frames/232.webp}}","{{b64:assets/frames/pack_frames/233.webp}}","{{b64:assets/frames/pack_frames/234.webp}}","{{b64:assets/frames/pack_frames/235.webp}}","{{b64:assets/frames/pack_frames/236.webp}}","{{b64:assets/frames/pack_frames/237.webp}}","{{b64:assets/frames/pack_frames/238.webp}}","{{b64:assets/frames/pack_frames/239.webp}}","{{b64:assets/frames/pack_frames/240.webp}}","{{b64:assets/frames/pack_frames/241.webp}}","{{b64:assets/frames/pack_frames/242.webp}}","{{b64:assets/frames/pack_frames/243.webp}}","{{b64:assets/frames/pack_frames/244.webp}}","{{b64:assets/frames/pack_frames/245.webp}}","{{b64:assets/frames/pack_frames/246.webp}}","{{b64:assets/frames/pack_frames/247.webp}}","{{b64:assets/frames/pack_frames/248.webp}}","{{b64:assets/frames/pack_frames/249.webp}}","{{b64:assets/frames/pack_frames/250.webp}}","{{b64:assets/frames/pack_frames/251.webp}}","{{b64:assets/frames/pack_frames/252.webp}}","{{b64:assets/frames/pack_frames/253.webp}}","{{b64:assets/frames/pack_frames/254.webp}}","{{b64:assets/frames/pack_frames/255.webp}}","{{b64:assets/frames/pack_frames/256.webp}}","{{b64:assets/frames/pack_frames/257.webp}}","{{b64:assets/frames/pack_frames/258.webp}}","{{b64:assets/frames/pack_frames/259.webp}}","{{b64:assets/frames/pack_frames/260.webp}}","{{b64:assets/frames/pack_frames/261.webp}}","{{b64:assets/frames/pack_frames/262.webp}}","{{b64:assets/frames/pack_frames/263.webp}}","{{b64:assets/frames/pack_frames/264.webp}}","{{b64:assets/frames/pack_frames/265.webp}}","{{b64:assets/frames/pack_frames/266.webp}}","{{b64:assets/frames/pack_frames/267.webp}}","{{b64:assets/frames/pack_frames/268.webp}}","{{b64:assets/frames/pack_frames/269.webp}}","{{b64:assets/frames/pack_frames/270.webp}}","{{b64:assets/frames/pack_frames/271.webp}}","{{b64:assets/frames/pack_frames/272.webp}}","{{b64:assets/frames/pack_frames/273.webp}}","{{b64:assets/frames/pack_frames/274.webp}}"];   /* the packing film as 960x540 stills, 16 per second */
/* The packing film plays from embedded stills drawn on a canvas. The artifact viewer refuses
   video from blob: addresses, so a <video> never loads there; still images always do.
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
const SC={"sky": "{{datauri:assets/images/sc/sky.webp}}", "bank": "{{datauri:assets/images/sc/bank.webp}}", "floor": "{{datauri:assets/images/sc/floor.webp}}", "far": "{{datauri:assets/images/sc/far.webp}}", "ground": "{{datauri:assets/images/sc/ground.webp}}", "plate": "{{datauri:assets/images/sc/plate.webp}}", "field": "{{datauri:assets/images/sc/field.webp}}"};
/* =========================================================
   The menu: transcribed from the Grill & Ground menu book.
   Names, Thai names and prices match dine-in, so every channel
   shows the same thing.
   ========================================================= */
const S={jaew:"#7A2A18",bbq:"#4A1A0C",gravy:"#8A5A2A",red:"#C2361F",cream:"#E9DFC6",chimi:"#4E7A2A",mush:"#8A6A48"};
const M=(sec,id,it,nm,th,price,art,o)=>Object.assign({sec,id,it,nm,th,price,art},o||{});

const MAINS=[
  /* The chef's curated selection: twelve mains, hand-picked from the menu book */
  /* Kid's Menu */
  M("kids","kidfried","American Style Fried Rice","& Crispy Chicken","อเมริกันสไตล์ฟรายด์ไรซ์",199,
    ()=>BG.table+V.tray(false)+g(118,112,.8,0,'<ellipse rx="60" ry="34" fill="#B8542E"/>'+P.karaage(4))+g(186,92,1,0,X.egg())+
      g(232,124,1,0,X.fries(8)),{note:"For children under 140 cm, 12 or younger"}),
  /* Pasta */
  M("pasta","pesto","Pesto Homemade Pasta","with Grilled Salmon","กรีนเพสโต้แซลมอนพาสต้าโฮมเมด",439,
    ()=>BG.table+V.bowl("dBlue")+g(126,106,.9,0,P.pasta("#6E8E3A","#94B45C",7,TOM(-20,-12,.8)+TOM(16,-20,.8)+TOM(-40,8,.7)))+
      g(212,124,.62,-24,P.salmon())+g(182,70,.8,0,X.lemon())),
  /* Signature Grill Combo */
  M("combo","set2","Combo","Boston Pork BBQ & Texas Chicken Tenders","คอมโบบอสตันพอร์คบาร์บีคิว และเท็กซัสชิคเก้นเทนเดอร์",499,
    ()=>T.combo(P.tenders(),P.pork("bbq"),S.bbq),{tag:"SET 2"}),
  M("combo","set5","Combo","Creamy Mushroom Bacon Chicken & Boston Pork BBQ","คอมโบชิคเก้นสเต็กซอสครีมเห็ดเบคอน และบอสตันพอร์คบาร์บีคิว",469,
    ()=>T.combo(P.chicken("mush"),P.pork("bbq"),S.bbq,S.gravy),{tag:"SET 5"}),
  /* Beef Steak */
  M("beef","cubes","Shoyu Butter","Tenderloin Cubes","เทนเดอร์ลอยคิวบ์โชยุบัตเตอร์",479,
    ()=>BG.table+V.sizzler()+g(212,62,.9,-6,X.carrot())+TOM(214,78,1.1)+g(236,100,1.2,0,X.broc())+g(254,122,.8,-8,X.corn())+
      g(236,138,.8,0,X.chips())+g(128,108,1,0,P.cubes()),{note:"Beef 180g"}),
  /* Hamburg Steak */
  M("hamburg","truffle","Black Truffle Cheese","Kuroge Wagyu Hamburg","ฮัมเบิร์กวากิวคุโรเกะชีสแบล็กทรัฟเฟิล",549,
    ()=>BG.table+V.sizzler()+g(158,108,1,0,P.patty("truffle","cheese")),{note:"100% Japanese Wagyu. Beef 150g"}),
  /* Pork Steak */
  M("pork","collar","Spicy Prime","Pork Collar","สเต็กหมูสันคอซอสสไปซี่บาร์บีคิว",399,()=>T.plate(P.pork("bbq"),{sauce:S.bbq,corn:true})),
  M("pork","chop","Creamy Mushroom","Bacon Pork Chop","พอร์คชอปซอสครีมเห็ดเบคอน",479,
    ()=>T.plate(P.chop(),{carrot:false,x:188,y:130,extra:g(118,120,1,0,'<ellipse rx="44" ry="26" fill="#9A7650"/>'+X.shimeji())})),
  /* Chicken */
  M("chicken","cheesechicken","Spicy BBQ","Cheese Chicken","สไปซี่บาร์บีคิวชีสชิคเก้น",359,
    ()=>T.plate(P.chicken("cheese"),{sauce:S.bbq})),
  /* Seafood */
  M("seafood","salmonprawn","Fire Grilled Salmon","and King Prawn","แซลมอน และกุ้งตัวใหญ่ไฟร์กริลล์",599,
    ()=>BG.table+V.sizzler()+g(92,120,.9,0,X.shimeji())+g(116,96,.8,-6,X.corn())+TOM(98,70,1)+
      g(176,80,.75,-6,P.salmon())+g(186,132,1,0,P.prawns(2))),
  /* Ocean Grill */
  M("ocean","nordic","Nordic Truffle","Salmon","นอร์ดิกทรัฟเฟิลแซลมอน",599,
    ()=>BG.table+V.plate()+g(150,118,1,0,'<ellipse rx="96" ry="44" fill="#EDE4CE"/><ellipse rx="96" ry="44" fill="url(#dTruffle)"/>')+
      g(150,112,.95,-6,P.salmon())+g(180,76,1,-18,'<path d="M-30 0c20-8 44-6 60 2-18 6-40 6-60-2z" fill="#D0301E"/>')+g(226,96,1.1,0,X.broc()),
    {note:"Served with mashed potato"}),
  /* Rice Dish */
  M("rice","trufflepork","Black Truffle","Marbled Pork Fried Rice with Pickled Egg Yolk","ข้าวผัดทรัฟเฟิลมาร์เบิลพอร์คไข่ดอง",349,
    ()=>BG.table+V.bowl("dTeal")+g(184,114,.95,0,P.rice())+g(118,112,.8,-20,P.slices("#8A4A1E","#E9C49A",5)))
];

const SECTIONS=[["kids","Kid's menu"],["pasta","Pasta"],["combo","Signature grill combo"],["beef","Beef steak"],["hamburg","Hamburg steak"],
  ["pork","Pork steak"],["chicken","Chicken"],["seafood","Seafood"],["ocean","Ocean grill"],["rice","Rice dish"]];

/* the chef's notes for each curated main: badge, story, what goes into it, how it tastes, how often it is chosen */
const CURATE={
  kidfried:{badge:"Customer Favorite",pop:4,
    desc:"Buttery American-style fried rice with golden crispy chicken, a sunny egg and fries. A small plate built for small appetites.",
    ingr:["Jasmine rice","Crispy chicken","Fried egg","French fries"],
    flav:[["🍗","Crispy"],["🧈","Buttery"],["🙂","Mild"]]},
  pesto:{badge:"Chef Recommendation",pop:4,
    desc:"Pasta made in house, tossed in fresh basil pesto and finished with a fire-grilled salmon fillet and blistered cherry tomatoes.",
    ingr:["Homemade pasta","Basil pesto","Grilled salmon","Cherry tomato"],
    flav:[["🌿","Herbaceous"],["🐟","Ocean Fresh"],["🧄","Garlic"]]},
  set2:{badge:"Best Seller",pop:5,
    desc:"Slow-glazed Boston pork beside hand-breaded Texas chicken tenders. Two grill classics, one plate.",
    ingr:["Boston pork","House BBQ glaze","Texas chicken tenders"],
    flav:[["🔥","Smoky"],["🍖","BBQ"],["🍗","Crispy"]]},
  set5:{badge:"Customer Favorite",pop:4,
    desc:"Grilled chicken under a creamy mushroom and bacon sauce, paired with smoky BBQ Boston pork.",
    ingr:["Chicken steak","Mushroom cream","Smoked bacon","Boston pork BBQ"],
    flav:[["🍄","Creamy Mushroom"],["🥓","Bacon"],["🔥","Smoky"]]},
  cubes:{badge:"Premium Choice",pop:5,
    desc:"Bite-sized tenderloin seared hot and glossed in shoyu butter, served sizzling with garden vegetables.",
    ingr:["Beef tenderloin 180g","Japanese shoyu","Cultured butter","Garden vegetables"],
    flav:[["🥩","Premium Beef"],["🧄","Garlic Butter"],["♨️","Sizzling"]]},
  truffle:{badge:"Signature Dish",pop:5,
    desc:"100% Japanese Kuroge Wagyu, hand-formed and grilled, crowned with melting cheese and black truffle sauce.",
    ingr:["Kuroge Wagyu 150g","Black truffle","Melted cheese"],
    flav:[["🥩","Premium Beef"],["🧀","Cheesy"],["🍄","Truffle"]]},
  collar:{badge:"Customer Favorite",pop:4,
    desc:"Prime pork collar grilled for a juicy char and lacquered in our spicy BBQ sauce, with sweet grilled corn.",
    ingr:["Prime pork collar","Spicy BBQ sauce","Grilled corn"],
    flav:[["🌶️","Spicy"],["🔥","Smoky"],["🍖","BBQ"]]},
  chop:{badge:"Chef Recommendation",pop:3,
    desc:"A thick-cut pork chop off the grill, blanketed in creamy mushroom and smoked bacon sauce with shimeji.",
    ingr:["Thick-cut pork chop","Shimeji mushroom","Smoked bacon","Cream sauce"],
    flav:[["🍄","Creamy Mushroom"],["🥓","Bacon"],["🧄","Garlic"]]},
  cheesechicken:{badge:"Best Seller",pop:5,
    desc:"Tender grilled chicken brushed with spicy BBQ and finished under a blanket of melted cheese.",
    ingr:["Chicken steak","Spicy BBQ sauce","Melted cheese"],
    flav:[["🌶️","Spicy"],["🧀","Cheesy"],["🔥","Smoky"]]},
  salmonprawn:{badge:"Premium Choice",pop:4,
    desc:"A salmon fillet and king prawns over open flame, served sizzling with shimeji and sweet corn.",
    ingr:["Salmon fillet","King prawns","Shimeji","Sweet corn"],
    flav:[["🐟","Ocean Fresh"],["🦐","King Prawn"],["🔥","Fire Grilled"]]},
  nordic:{badge:"Signature Dish",pop:4,
    desc:"Nordic salmon on a silky black truffle cream, with buttery mashed potato and broccoli.",
    ingr:["Nordic salmon","Black truffle cream","Mashed potato"],
    flav:[["🐟","Ocean Fresh"],["🍄","Truffle"],["🧈","Creamy"]]},
  trufflepork:{badge:"Signature Dish",pop:4,
    desc:"Wok-fried rice perfumed with black truffle, topped with marbled pork and a soy-cured egg yolk to stir through.",
    ingr:["Marbled pork","Black truffle","Pickled egg yolk","Jasmine rice"],
    flav:[["🍄","Truffle"],["🥚","Rich Yolk"],["🔥","Wok-Fired"]]}
};
MAINS.forEach(m=>Object.assign(m,CURATE[m.id]||{}));

const I=(id,nm,th,price,art,o)=>Object.assign({id,it:"",nm,th,price,art},o||{});
const CATS=[
  {key:"main",label:"Main course",head:"The Chef's Selection",note:"Twelve mains, hand-picked by our chefs from the menu book, at menu prices. There are no wrong choices here.",items:MAINS,groups:[["all","All twelve"]].concat(SECTIONS),wide:true,lux:true},
  {key:"side",label:"Side dish",head:"Side dish",note:"One free side, exactly as with a steak in the restaurant.",items:[
    I("fries","French Fries","เฟรนช์ฟรายส์",0,()=>T.small(g(0,4,1.55,0,X.fries(12)))),
    I("sweetpotato","Crispy White Sweet Potato Fries","คริสปี้มันหวานญี่ปุ่นสีขาวทอด",0,()=>T.small(g(0,4,1.55,0,X.fries(12,"#F2E2B4")))),
    I("mash","Gravy Mashed Potato","มันบดเกรวี่ซอส",0,()=>T.small('<ellipse rx="58" ry="32" fill="#8A5A2A"/><path d="M-36 0c0-22 18-32 36-32s38 10 38 32c-10 10-60 10-74 0z" fill="#F3E8CC"/>'+g(-6,-24,.8,-10,X.herb()))),
    I("shimeji","Shimeji Shio Fries","เห็ดชิเมจิคั่วเกลือ",0,()=>T.small(rep(5,i=>g(i*20-40,(i%2)*12-6,1.9,i*18-28,X.shimeji())))),
    I("noririce","Multigrain Garlic Nori Rice","ข้าวธัญพืชกระเทียมโนริ",0,()=>T.small('<path d="M-44 10c0-30 20-44 44-44s44 14 44 44z" fill="#6E5A48"/><path d="M-44 10c0-30 20-44 44-44s44 14 44 44z" fill="url(#dGrain)"/>'+
      rep(6,i=>'<rect x="'+(i*12-34)+'" y="-24" width="4" height="14" fill="#1E2A1E" transform="rotate(20 '+(i*12-34)+' -24)"/>')+g(0,-30,.7,0,X.chips())))
  ],priceLabel:"Free"},
  {key:"salad",label:"Harvest salad",head:"Harvest salad bar",note:"Ohkajhu organic greens. The bar changes daily, so this is packed from what is on it today.",daily:true,items:[
    I("rolltoss","Roll & Toss organic salad","สลัดผักออร์แกนิก Roll & Toss",0,()=>T.wbowl("#EDEFEA",X.greens()+g(-30,10,.9,0,X.greens())+TOM(24,-8,1)+TOM(10,14,.9)+g(-14,-14,.5,20,X.carrot()))),
    I("superfood","Superfood salad bowl","สลัดซูเปอร์ฟู้ด",0,()=>T.wbowl("#EDEFEA",g(-20,0,1,0,X.greens())+'<ellipse cx="26" cy="4" rx="22" ry="14" fill="#E3D6B4"/>'+
      '<ellipse cx="26" cy="4" rx="22" ry="14" fill="url(#dGrain)"/>'+rep(8,i=>'<path d="M'+(i*5-10)+' 20l10-2" stroke="#8A3A7A" stroke-width="2.4"/>')))
  ]},
  {key:"soup",label:"Soup & comfort",head:"Soup & pasta",note:"From the soup and comfort-pasta station, changes daily.",daily:true,items:[
    I("soupday","Soup of the day","ซุปประจำวัน",0,()=>T.wbowl("#EAD7A8",'<path d="M-30-6c16-10 44-10 60 0" stroke="#F6E9C8" stroke-width="3" fill="none"/>'+rep(4,i=>'<rect x="'+(i*14-24)+'" y="'+(6-(i%2)*8)+'" width="8" height="8" rx="2" fill="#D9A45E"/>'))),
    I("pastaday","Comfort pasta of the day","พาสต้าประจำวัน",0,()=>T.wbowl("#EDEFEA",g(0,0,.8,0,P.pasta("#D0603A","#EFA06A",2.6))))
  ]},
  {key:"bake",label:"Fresh bake",head:"Fresh baked corner",note:"Natural-starter bread from the bakery corner.",daily:true,items:[
    I("focaccia","Grilled Corn Cheese Focaccia","โฟคาเชียกริลล์คอร์นชีส",0,()=>T.small('<rect x="-62" y="-36" width="124" height="70" rx="14" fill="#C98A3E"/><rect x="-58" y="-34" width="116" height="62" rx="12" fill="#E3AE5E"/>'+
      '<path d="M-44-20c20-6 60-6 88 4-4 16-40 22-70 18-12-2-20-10-18-22z" fill="#F4DB96"/>'+rep(14,i=>'<circle cx="'+((i*19)%96-48)+'" cy="'+((i*11)%44-24)+'" r="3.2" fill="#F2C33A"/>')+
      g(0,-4,.8,0,rep(6,i=>'<rect x="'+(i*14-40)+'" y="'+((i%2)*10-6)+'" width="8" height="2" fill="#FFFFFF" opacity=".8"/>'))),{tag:"SIGNATURE"}),
    I("bakeday","Freshly Baked Sourdough","ขนมปังซาวร์โดว์อบสด",0,()=>T.small('<ellipse rx="56" ry="36" fill="#B87434"/><ellipse cy="-4" rx="52" ry="30" fill="#D99A4E"/>'+
      '<g stroke="#F4D8A0" stroke-width="4" stroke-linecap="round"><path d="M-30-16l14 14"/><path d="M-6-20l14 16"/><path d="M18-16l12 12"/></g>'))
  ]},
  {key:"dessert",label:"Dessert",head:"Sweet bar",note:"From the Live Culture Yogurt Bar and the Tokyo Sweet Bar.",daily:true,items:[
    I("yogurt","Live culture yogurt ice cream","ไอศกรีมโยเกิร์ต",0,()=>BG.marble+'<ellipse cx="160" cy="184" rx="40" ry="7" fill="#000" opacity=".12"/>'+
      '<path d="M126 92h68l-8 88a6 6 0 0 1-6 6h-40a6 6 0 0 1-6-6z" fill="#FFFFFF"/><path d="M128 112h64l-2 20h-60z" fill="#6E9A58"/>'+
      '<path d="M160 22c20 0 30 16 26 30 12 4 16 20 6 30 8 6 6 14 0 14h-64c-6 0-8-8 0-14-10-10-6-26 6-30-4-14 6-30 26-30z" fill="#FBF8F0"/>'+
      '<path d="M140 60c10-8 30-8 40 0M136 80c14-8 34-8 48 0" stroke="#E6E0D0" stroke-width="3" fill="none"/>'),
    I("tokyosweet","Tokyo Sweet Bar dessert of the day","ขนมหวานประจำวัน",0,()=>T.small('<path d="M-50 20l50-44 50 44z" fill="#F4E4C6"/><path d="M-50 20h100v14h-100z" fill="#E3C38A"/>'+
      '<path d="M-50 4l50-10 50 10" stroke="#FFFFFF" stroke-width="5" fill="none"/>'+TOM(0,-26,1)+g(20,-14,.7,0,'<circle r="8" fill="#5A3A8A"/>')))
  ]},
  {key:"drink",label:"Beverage",head:"Beverage",note:"The organic juice bar, at menu prices.",groups:[["wheat","Organic green wheatgrass"],["cold","Cold pressed"],["juice","Juice"],["water","Water"]],items:[
    I("wheatshort","Wheatgrass Short","น้ำสกัดต้นข้าวอ่อน",59,()=>DR.glass("#2E5A1E",{foam:"#7FA23F",low:true}),{sec:"wheat"}),
    I("applewheat","Apple Green Wheatgrass","น้ำแอปเปิ้ลต้นข้าวอ่อน",89,()=>DR.glass("#7FA84A",{foam:"#B5CF7A"}),{sec:"wheat"}),
    I("lemonwheat","Lemon Honey Green Wheatgrass","น้ำผึ้งเลมอนต้นข้าวอ่อน",79,()=>DR.glass("#6E9A3A",{lemon:true}),{sec:"wheat"}),
    I("coconutwheat","Organic Coconut Green Wheatgrass","น้ำมะพร้าวออร์แกนิคต้นข้าวอ่อน",89,()=>DR.glass("#B7CF94",{foam:"#E3EDD0"}),{sec:"wheat"}),
    I("deepgreen","Deep Green","ดีพกรีน",129,()=>DR.carafe("#4E7A2A",1),{sec:"cold",note:"Kale, spinach, celery, cucumber, lemon, red apple"}),
    I("greenmelon","Green Melon","กรีนเมลอน",129,()=>DR.carafe("#B5CF5A",2),{sec:"cold",note:"Melon, cucumber, parsley, lemon, red apple"}),
    I("sunrise","Sunrise Carrot","ซันไรส์แครอท",129,()=>DR.carafe("#F29A3A",3),{sec:"cold",note:"Carrot, pineapple, red apple, lemon"}),
    I("ruby","Ruby Watermelon","รูบี้วอเตอร์เมลอน",129,()=>DR.carafe("#E0443A",4),{sec:"cold",note:"Watermelon, tomato, red apple, lemon"}),
    I("redbalance","Red Balance","เรดบาลานซ์",129,()=>DR.carafe("#E8583A",5),{sec:"cold",note:"Tomato, carrot, celery, lemon, pineapple"}),
    I("coconut","Organic Coconut Juice","น้ำมะพร้าวออร์แกนิค",89,()=>DR.glass("#F2F0E6",{}),{sec:"juice"}),
    I("apple","Apple Juice","น้ำแอปเปิ้ล",89,()=>DR.glass("#E8C46A",{}),{sec:"juice"}),
    I("carrotjuice","Carrot Juice","น้ำแครอท",89,()=>DR.glass("#EE8A2E",{}),{sec:"juice"}),
    I("water","Mineral Water","น้ำแร่",30,()=>DR.bottle(),{sec:"water"})
  ]},
  {key:"addon",label:"Add-on",head:"Add on",note:"Optional, at menu prices. Pick none if you do not want one.",items:[
    I("none","No add-on","ไม่รับเพิ่ม",0,()=>BG.marble+'<ellipse cx="160" cy="108" rx="96" ry="56" fill="none" stroke="#B9BDB4" stroke-width="3" stroke-dasharray="8 8"/>'),
    I("egg","Fried Egg","ไข่ดาว",19,()=>T.small(g(0,0,1.6,0,X.egg()))),
    I("cheddar","Cheddar Cheese","แผ่นเชดดาร์ชีส",29,()=>T.small('<rect x="-38" y="-30" width="76" height="60" rx="6" fill="#F2A23A" transform="rotate(-8)"/>')),
    I("karaage","Chicken Karaage","ไก่คาราอาเกะ",49,()=>T.small(g(4,4,1.3,0,P.karaage(5)))),
    I("tempura","Shrimp Tempura","กุ้งเทมปุระ",59,()=>T.small(g(0,6,.9,0,P.tempura(2)))),
    I("sausage","Smoked Sausage","ไส้กรอกรมควัน",69,()=>T.small('<rect x="-60" y="-14" width="120" height="26" rx="13" fill="#A8482A" transform="rotate(-8)"/>'+
      '<g stroke="#6A2410" stroke-width="2.4" transform="rotate(-8)"><path d="M-30-10l6 20"/><path d="M0-10l6 20"/><path d="M30-10l6 20"/></g>'))
  ]}
];
const BOX=259;
const BAR_CATS=["salad","soup","bake","dessert"];                 /* the buffet box covers these four */
/* the set's price from what is actually chosen; nothing is charged by default */
function setPrice(){
  const pr=k=>{ const c=CATS.find(x=>x.key===k), it=picks[k]?c.items.find(i=>i.id===picks[k]):null; return it?(it.price||0):0; };
  const box=0;                                                   /* the price is main + add-on + beverage only */
  const main=pr("main"), drink=pr("drink"), addon=pr("addon");
  return {main,box,drink,addon,total:main+box+drink+addon,n:CATS.filter(c=>picks[c.key]).length};
}
window.GGPrice=setPrice;
const ING={"main": "{{datauri:assets/images/ing/main.webp}}", "side": "{{datauri:assets/images/ing/side.webp}}", "salad": "{{datauri:assets/images/ing/salad.webp}}", "soup": "{{datauri:assets/images/ing/soup.webp}}", "bake": "{{datauri:assets/images/ing/bake.webp}}", "dessert": "{{datauri:assets/images/ing/dessert.webp}}", "drink": "{{datauri:assets/images/ing/drink.webp}}", "addon": "{{datauri:assets/images/ing/addon.webp}}"};
const LOGO_CREAM="{{datauri:assets/images/logo_cream/00.png}}";
const LOGO_GOLD="{{datauri:assets/images/logo_gold/00.png}}";
const QRM=["11111110111100001001101100010110001111111", "10000010101000111001001100010010001000001", "10111010011101011100011100111011101011101", "10111010110000110111000101011111001011101", "10111010110010010011101000011010001011101", "10000010100100010101101010110101101000001", "11111110101010101010101010101010101111111", "00000000010001000101000011111111100000000", "00010010001110111000100101101000000111011", "11101100011001111010011001001100111001110", "00100110111111001101100010000011000101110", "00001001100000101010011000011010010000101", "00111111000110101101100101001101001101001", "00101100100000011110101011010100011000010", "00100111011010001010110001011010101011011", "11000100110001000010100110001111001100001", "00100011001010110111110100011001100101001", "00100100011011111110000110100010001100111", "01110110001010000100110000000010101010111", "10101101110001100100101010011111010100010", "00011111010100100010010110000111011001110", "10001100001011011011011000111010101000111", "10000111100111010010000010101001011001010", "11010101110111110011100101101001111010100", "01000011101010101101111110011101111100101", "00010001011010101011001100100101001001001", "11010011000011001010101011000010101110011", "10110000101100100000001111111110110110010", "01111011110001101110101000101100100000010", "00110100011100010101110010110011010101011", "10011110101111011010011010100101100101111", "00010001101011011011111010111101110010011", "10100110100011110010010110000001111110111", "00000000100011000111001011011001100010011", "11111110011100111010101000000101101011000", "10000010001010011010011101001100100010100", "10111010010110001010110001111000111110011", "10111010110111001110100110101101111011100", "10111010010111001101111110101111000011001", "10000010011001101011001110011111100100010", "11111110001010000101111010101100100110110"];   /* the buffet box costs what the dine-in salad bar costs */
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
  const box=setPrice().box, total=main+box+drink+addon;
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

