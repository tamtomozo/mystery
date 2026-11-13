/* スタッフクレジット（タイトルから開く。FILE を一つでも解決すると開ける） */
'use strict';

/* =========================================================
   解決した FILE の登場人物（L.credits.cast）→ 警察側の人物（L.credits.police）→ 開発スタッフ →「遊んでくれて ありがとう」
   の順に、下から上へ流す。最後の一言が画面の真ん中に来たら止まる。
     クリック / Space を押している間 … 早送り
     スキップ                       … 最後の一言まで飛ばす
     Esc                            … タイトルへ戻る
   止まったあとは、クリック / Space / Esc でタイトルへ戻る。
   ========================================================= */
const CR={y:0,fast:false,done:false,doneAt:0,closing:false,last:0,raf:0};   // last：前のフレームの時刻　doneAt：止まった時刻

// FILE を一つでも解決していれば、タイトルに「スタッフクレジット」を出す
const creditsUnlocked=()=>FILES.some(f=>isCleared(f.id));

function creditsHtml(){
  const C=L.credits;
  const rows=list=>list.map(([role,name])=>`<div class="c-row"><dt>${role}</dt><dd>${name}</dd></div>`).join('');
  const files=FILES.filter(f=>isCleared(f.id)&&C.cast[f.id]).map(f=>`<section class="c-file">
      <div class="c-no">${f.no}</div><h2>${f.title}</h2><dl>${rows(C.cast[f.id])}</dl>
    </section>`).join('');
  return `<div class="cview"><div class="croll">
      <div class="c-head"><div class="c-series">${$('#title .tseries').textContent}</div><h1>${L.gameTitle}</h1><div class="c-sub">${C.head}</div></div>
      <div class="c-sec">${C.castHead}</div>
      ${files}
      <section class="c-file c-police"><h2>${C.policeHead}</h2><dl>${rows(C.police)}</dl></section>
      <div class="c-sec">${C.staffHead}</div>
      <section class="c-staff">${C.staff.map(([role,name])=>`<div class="c-role">${role}</div><div class="c-name">${name}</div>`).join('')}</section>
      <div class="c-thanks">${C.thanks}</div>
    </div></div>
    <div class="c-back">${C.back}</div>`;
}

function openCredits(){
  if(S.mode!=='title'||!creditsUnlocked()) return;
  AU.init(); AU.sfx('select');
  S.mode='credits'; CR.closing=true;
  fade(()=>{
    const el=$('#credits');
    el.innerHTML=creditsHtml(); el.classList.remove('hidden','done');
    $('#title').classList.add('hidden');
    $('#app').classList.add('credits'); $('#skip').classList.remove('hidden');
    CR.y=el.clientHeight; CR.fast=false; CR.done=false; CR.closing=false; CR.last=performance.now();
    cancelAnimationFrame(CR.raf); CR.raf=requestAnimationFrame(creditsTick);
  });
}

// 最後の一言が画面の真ん中に来る位置（流し終わり）
function creditsEndY(){
  const el=$('#credits'), th=el.querySelector('.c-thanks');
  return el.clientHeight/2-(th.offsetTop+th.offsetHeight/2);
}
function placeCredits(){ $('#credits .croll').style.transform=`translateY(${CR.y}px)`; }

function creditsTick(now){
  if(S.mode!=='credits') return;
  const dt=Math.min(.05,(now-CR.last)/1000); CR.last=now;
  if(!CR.done){
    const h=$('#credits').clientHeight;
    CR.y-=h/11*(CR.fast?6:1)*dt;   // ふつうは 11秒でひと画面ぶん。押している間は 6倍
    const end=creditsEndY();
    if(CR.y<=end){CR.y=end; creditsFinish();}
    placeCredits();
  }else{
    CR.y=creditsEndY(); placeCredits();   // 止まったあとも、画面の大きさが変わったら真ん中に合わせ直す
  }
  CR.raf=requestAnimationFrame(creditsTick);
}

function creditsFinish(){
  if(CR.done) return;
  CR.done=true; CR.fast=false; CR.doneAt=performance.now();
  $('#credits').classList.add('done'); $('#skip').classList.add('hidden');
}

// スキップ：暗転して、最後の一言のところへ
function creditsSkip(){
  if(S.mode!=='credits'||CR.done||CR.closing) return;
  CR.closing=true;
  fade(()=>{CR.closing=false; CR.y=creditsEndY(); placeCredits(); creditsFinish();});
}

function closeCredits(){
  if(S.mode!=='credits'||CR.closing) return;
  CR.closing=true; AU.sfx('blip',400);
  fade(()=>{
    cancelAnimationFrame(CR.raf);
    const el=$('#credits'); el.classList.add('hidden'); el.innerHTML='';
    $('#app').classList.remove('credits'); $('#skip').classList.add('hidden');
    CR.closing=false; CR.fast=false;
    showTitle(); FS.tsel=1; titleMenu();   // 戻ったら「スタッフクレジット」を選んだままにする
  });
}

// キー操作（main.js の keydown / keyup から呼ばれる）
function creditsKey(k,repeat){
  if(CR.closing) return;
  const ok=k===' '||k==='Enter'||k==='z', back=k==='Escape'||k==='x';
  if(back){closeCredits(); return;}
  if(!ok||repeat) return;
  // 止まったあとに押してすぐ戻らないよう、少し待つ
  if(CR.done){if(performance.now()-CR.doneAt>600) closeCredits();}
  else CR.fast=true;
}
function creditsKeyUp(k){ if(k===' '||k==='Enter'||k==='z') CR.fast=false; }

$('#credits').addEventListener('pointerdown',e=>{
  e.stopPropagation(); if(S.mode!=='credits'||CR.closing) return;
  if(CR.done){if(performance.now()-CR.doneAt>600) closeCredits();}
  else CR.fast=true;
});
window.addEventListener('pointerup',()=>{CR.fast=false;});
window.addEventListener('pointercancel',()=>{CR.fast=false;});
titleMenu();   // 起動したときのタイトル
