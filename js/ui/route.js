/* 足取りの地図（FILE.09 の町内会の掲示板で使う） */
'use strict';

/* =========================================================
   openRoute(pair) で、町の地図（左）と証言のカード（右）を並べて出す。pair は事件データの ROUTE の一組：
     {ev,need,title,ask,legend,cards:[{time,place,who,saw,tag?,ref?,ok?,note?}],hint,found()}
   地図は事件データの ROUTE_BG（SVG の図形）と ROUTE_XY（場所の座標 [x,y,名前を書く側]。1 は 10 メートル）、
   場所の名前は ROUTE_PLACES。カードは時刻の順に並べておく。
     place のあるカードは地図にピンを立て、ref でないカードどうしを順に線でつなぐ（線には道のりと、かかった時間）
     ref のカードは、比べるための参考（ピンは点線、線ではつながない）
   カードを選ぶと、
     ok のカード … 閉じて found() を呼ぶ（台詞と give を積めば、そのまま会話になる）
     それ以外    … 「つじつまは合っている」（note があればその独り言）。二度外すと、hint を出す
   「やめる」／Esc では、何もせずに閉じる。
   操作：カードをタップ／←→（↑↓・A D W S）でカードを選び、Enter で決める
   ========================================================= */
const RT={pair:null,cur:0,miss:0,msg:'',bad:-1};

function openRoute(p){
  Object.assign(RT,{pair:p,cur:0,miss:0,msg:'',bad:-1});
  hideDlg(); P.path=[]; P.pending=null;
  S.mode='route';
  renderRoute(); $('#route').classList.remove('hidden');
  $('#route .rlist').scrollTop=0;
  AU.sfx('paper');
}
const rtMin=s=>{const [h,m]=s.split(':').map(Number); return h*60+m;};
// 地図：下絵の上に、つなぐ線（道のり・時間）と、カードのピンを重ねる
function routeSvg(p){
  const XY=CASE.ROUTE_XY, NM=CASE.ROUTE_PLACES, Lr=L.route;
  let lines='', labels='', pins='';
  const on=p.cards.map((c,i)=>({c,i})).filter(o=>o.c.place&&!o.c.ref);
  for(let k=1;k<on.length;k++){
    const a=on[k-1].c, b=on[k].c, [x1,y1]=XY[a.place], [x2,y2]=XY[b.place];
    const m=Math.round(Math.hypot(x2-x1,y2-y1))*10, min=rtMin(b.time)-rtMin(a.time);
    const hot=RT.cur===on[k].i||RT.cur===on[k-1].i;
    lines+=`<line class="rseg${hot?' hot':''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    // 道のりの札は、線の上から、線と直角に少し離して置く
    // （1本目・3本目…は上の側、2本目・4本目…は下の側。続く線の札どうしが、つなぎ目で重ならないように）
    const len=Math.hypot(x2-x1,y2-y1)||1; let nx=-(y2-y1)/len, ny=(x2-x1)/len;
    if(ny>0||(Math.abs(ny)<.25&&nx<0)){nx=-nx; ny=-ny;}
    if(k%2===0){nx=-nx; ny=-ny;}
    const mx=x1+(x2-x1)*.6, my=y1+(y2-y1)*.6;   // 真ん中より少し先（出発のピンから離す）
    // 事件データの ROUTE_LAB に「出発>到着」の札の位置があれば、そちらを使う
    const [lx,ly]=(CASE.ROUTE_LAB||{})[a.place+'>'+b.place]||[mx+nx*9,my+ny*9+2];
    labels+=`<text class="rlen${hot?' hot':''}" x="${lx}" y="${ly}">${Lr.seg(m,min)}</text>`;
  }
  // 同じ場所に重なるピンは、少しずつずらす
  const used={};
  p.cards.forEach((c,i)=>{
    if(!c.place) return;
    const n=used[c.place]=(used[c.place]||0)+1, [x,y]=XY[c.place], ox=(n-1)*9;
    pins+=`<g class="rpin${c.ref?' ref':''}${i===RT.cur?' cur':''}${i===RT.bad?' bad':''}" data-i="${i}"><circle cx="${x+ox}" cy="${y}" r="5"/><text x="${x+ox}" y="${y+2}">${i+1}</text></g>`;
  });
  // 場所の名前は、ROUTE_XY の3つ目（up／down／left／right）の側に書く
  const names=Object.keys(NM).map(k=>{
    const [x,y,side='down']=XY[k];
    const [tx,ty,a]={up:[x,y-7.5,'middle'],down:[x,y+11,'middle'],left:[x-7.5,y+2,'end'],right:[x+7.5,y+2,'start']}[side];
    return `<text class="rname" x="${tx}" y="${ty}" text-anchor="${a}">${NM[k]}</text>`;
  }).join('');
  return `<svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">${CASE.ROUTE_BG}${names}${lines}${labels}${pins}</svg>`;
}
function renderRoute(){
  const p=RT.pair, Lr=L.route, NM=CASE.ROUTE_PLACES;
  const top=($('#route .rlist')||{}).scrollTop||0;   // 描き直しても、カードの一覧の位置は保つ
  $('#route').innerHTML=`<div class="rwrap">
    <div class="rtitle">${Lr.title}</div>
    <div class="rsub">${p.title}</div>
    <div class="rcols">
      <div class="rmap">${routeSvg(p)}<div class="rlegend">${p.legend||''}</div></div>
      <div class="rlist">${p.cards.map((c,i)=>`<button class="rcard${c.ref?' ref':''}${i===RT.cur?' cur':''}${i===RT.bad?' bad':''}" data-i="${i}">
        <div class="rtop"><span class="rnum">${i+1}</span><span class="rtime">${c.time||''}</span><span class="rplace">${c.place?NM[c.place]:''}</span>${c.tag?`<span class="rtag">${c.tag}</span>`:''}</div>
        <div class="rsaw">${c.saw}</div><div class="rwho">― ${c.who}</div></button>`).join('')}</div>
    </div>
    <div class="rmsg">${RT.msg||p.ask}</div>
    <div class="racts"><button class="btn gold" data-ok>${Lr.pick}</button><button class="btn" data-cancel>${Lr.cancel}</button></div>
    <div class="rhint">${Lr.keys}</div>
  </div>`;
  $('#route .rlist').scrollTop=top;
}
function closeRoute(){
  $('#route').classList.add('hidden'); $('#route').innerHTML='';
  S.mode='explore';
}
function routePick(i){
  const p=RT.pair, c=p.cards[i]; if(!c) return;
  RT.cur=i;
  if(c.ok){
    closeRoute(); AU.sfx('support');
    p.found();
    if(dq.length) startDialog();
    return;
  }
  RT.miss++; RT.bad=i; AU.sfx('wrong');
  const ng=L.route.miss;
  RT.msg=c.note||ng[(Math.random()*ng.length)|0];
  if(RT.miss>=2) RT.msg+=`<br><span class="rhintline">${p.hint}</span>`;
  renderRoute();
}
function routeSelect(i,sfx=520){
  RT.cur=i; RT.bad=-1; AU.sfx('blip',sfx); renderRoute();
  const el=$('#route .rcard.cur'); if(el) el.scrollIntoView({block:'nearest'});
}
function routeMove(d){const n=RT.pair.cards.length; routeSelect((RT.cur+d+n)%n);}
function routeCancel(){closeRoute(); AU.sfx('paper');}

// キー操作（main.js の keydown から呼ばれる）
function routeKey(k){
  if(k==='ArrowLeft'||k==='ArrowUp'||k==='a'||k==='w') routeMove(-1);
  else if(k==='ArrowRight'||k==='ArrowDown'||k==='d'||k==='s') routeMove(1);
  else if(k==='Enter'||k===' '||k==='z') routePick(RT.cur);
  else if(k==='Escape'||k==='x') routeCancel();
}

$('#route').addEventListener('click',e=>{
  e.stopPropagation();
  const card=e.target.closest('.rcard,.rpin'), b=e.target.closest('button:not(.rcard)');
  if(card){
    const i=+card.dataset.i;
    // 選んでいるカードをもう一度タップしたら決める。ほかのカードなら、まず選ぶ（スマホでの押しまちがいを防ぐ）
    if(i===RT.cur&&RT.bad!==i&&card.classList.contains('rcard')) routePick(i);
    else routeSelect(i,560);
    return;
  }
  if(!b) return;
  if(b.hasAttribute('data-ok')) routePick(RT.cur);
  else if(b.hasAttribute('data-cancel')) routeCancel();
});
