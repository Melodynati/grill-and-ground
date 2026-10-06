
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
