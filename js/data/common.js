/* データ：全事件で共通（人物の見た目・取調室・滝沢のヒント会話） */
'use strict';

/* ---------- 登場人物の見た目 ---------- */
const LOOK={
  player:  {coat:'#2b3a58',coat2:'#22304a',hair:'#18161a'},
  takizawa:{coat:'#776247',coat2:'#5f4e38',hat:'#3a3026'},
  mori:    {coat:'#3f6385',coat2:'#335270',cap:'#25384c'},
  noguchi: {coat:'#1f2c4a',coat2:'#18233c',cap:'#152038',badge:true},
  okochi:  {coat:'#3b3b3e',coat2:'#2f2f32',hair:'#8a8a8a',tie:'#2a3a5a'},
  // FILE.01
  kashiwagi:{coat:'#55585f',coat2:'#46494f',hair:'#2a2420',tie:'#7a2a2a'},
  // FILE.02
  hayase:  {coat:'#7d6a58',coat2:'#685645',hair:'#3a2620'},
  iwata:   {coat:'#4d5862',coat2:'#3f4851',cap:'#323b45',badge:true},
  kuga:    {coat:'#2f2b27',coat2:'#25221f',hair:'#c4c4c4',tie:'#6a1f2a'},
  washio:  {coat:'#4b4038',coat2:'#3d342d',hair:'#e6e6e6',tie:'#2a4a3a'},
  // FILE.03
  komatsu: {coat:'#8a6a78',coat2:'#735866',hair:'#4a3328'},
};

/* ---------- マップ（取調室は全事件で共通。現場のマップは各事件のフォルダで足す） ---------- */
const MAPDEF={
  interro:{name:L.interroRoom,border:true,solids:[[8,6,4,2]]},
};
const INTERRO_Z=1.75, INTERRO_CY=0.5;   // 取調室の拡大率と、机を置く画面上の高さ（割合）
const SOLID={};
function solidOf(id){
  if(SOLID[id]) return SOLID[id];
  const m=MAPDEF[id], g=Array.from({length:H},()=>Array(W).fill(false));
  if(m.border){for(let x=0;x<W;x++){g[0][x]=g[H-1][x]=true}for(let y=0;y<H;y++){g[y][0]=g[y][W-1]=true}}
  for(const [x,y,w,h] of m.solids) for(let j=0;j<h;j++) for(let i=0;i<w;i++) g[y+j][x+i]=true;
  return SOLID[id]=g;
}

/* =========================================================
   滝沢（先輩刑事）のヒント
   ========================================================= */
function talkTakizawa(){
  const ul=unlockedHyps(), n=ul.length, cur=ul[n-1];
  if(n===0){
    const miss=HYPS[0].requires.filter(id=>!has(id));
    say(L.tak,CASE.hint0);
    if(miss.length) say(L.tak,EVHINT[miss[0]]);
    return;
  }
  const st=hypStatus(cur);
  if(cur.final){
    if(st==='proven'){
      say(L.tak,CASE.provenLine);
      ask('',L.askInterro,[{label:L.goInterro,fn:()=>goInterro()},{label:L.stayScene,fn:()=>{}}]);
    }else if(CASE.finalOpen) CASE.finalOpen.forEach(l=>say(L.tak,l));   // 事件ごとに差し替えられる
    else say(L.tak,L.takFinal(cur.no));
    return;
  }
  if(st==='open'){
    say(L.tak,L.takOpen(cur.no,cur.title));
    say(L.tak,cur.hint);
    const falses=cur.claims.filter(c=>!c.truth);
    if(!falses.some(c=>c.ev.some(has))) say(L.tak,EVHINT[falses[0].ev.find(id=>!has(id))||falses[0].ev[0]]);
    else say(L.tak,L.takReady);
    return;
  }
  const next=HYPS[n], miss=next.requires.filter(id=>!has(id));
  say(L.tak,L.takBroken(cur.no));
  if(miss.length) say(L.tak,EVHINT[miss[0]]);
}
