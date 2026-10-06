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
/* The set's price: main course + beverage + add-on. Side, salad, soup, bake and dessert are included. */
function setPrice(){
  const pr=k=>{ const c=CATS.find(x=>x.key===k), it=picks[k]?c.items.find(i=>i.id===picks[k]):null; return it?(it.price||0):0; };
  const main=pr("main"), drink=pr("drink"), addon=pr("addon");
  return {main,drink,addon,total:main+drink+addon,n:CATS.filter(c=>picks[c.key]).length};
}
window.GGPrice=setPrice;
