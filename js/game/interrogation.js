/* 取調室〜自白〜エンディング */
'use strict';

/* =========================================================
   取調室
   ========================================================= */

let shakeT=0;
function goInterro(){
  fade(()=>{
    setMap('interro',10,9,'up'); S.mode='interro';
    $('#loc').textContent='取調室'; $('#boardBtn').classList.add('hidden');
    band('event',{...CASE.interroBand,auto:2400});
    CASE.interroIntro();
    guideInterro();
    run(()=>round(0));
    startDialog();
  });
}
function round(i){
  S.round=i; saveGame();
  $('#loc').textContent=`取調室 ― 問い ${i+1}/${ROUNDS.length}`;
  ask(CASE.suspect,ROUNDS[i].stmt,[
    {label:'物証で答える',fn:()=>{S.mode='interro'; openBoard(true,i); return 'hold';}},
    {label:'問いを聞き直す',fn:()=>round(i)},
  ]);
}
function onPick(id){
  const i=B.round, R=ROUNDS[i];
  hideBoard(); S.mode='interro';
  sys(`《${EV[id].name}》をみせた。`);
  if(R.ans.includes(id)){
    AU.sfx('present');
    run(()=>{shakeT=0.6;});
    R.win.forEach(([n,t])=>say(n,t));
    if(i+1<ROUNDS.length) run(()=>round(i+1));
    else run(()=>confession());
  }else{
    const ng=CASE.interroNg;
    say(CASE.suspect,ng[(Math.random()*ng.length)|0]); AU.sfx('wrong');
    say('大河内','（小声で）……問いに、まっすぐ答えられる物証を選べ。');
    run(()=>round(i));
  }
  startDialog();
}
function confession(){
  $('#loc').textContent='取調室';
  S.flags.confess=true; clearSave(); markCleared(CASE.id);
  CASE.confession();
  band('event',{title:'真実があきらかになった',sub:'―― すべての問いに、物証が答えた',auto:3000});
  run(()=>showEnding());
}
function showEnding(){
  S.mode='end'; hideDlg();
  const e=$('#ending');
  const f=FILES.find(x=>x.id===CASE.id);
  e.innerHTML=`<div class="einner">
    <h2>${f.no} ${f.title} ― 解決</h2>
    ${CASE.ending()}
    <h3>捜査記録</h3>
    集めた物証：${S.ev.length} / ${EV_TOTAL}
    <div class="enext">クリック / Space で次へ ▼</div>
  </div>`;
  e.classList.remove('hidden');
  endAt=performance.now();
}
// エンディング画面から先へ進む（FILE選択へ戻る。#solved=… を付けて読み込み直すと title.js がFILE選択を開く）
// 表示直後の操作（帯を閉じたクリックなど）で飛ばさないよう、少し待つ
let endAt=0;
function endingNext(){
  if(S.mode!=='end'||performance.now()-endAt<800) return;
  S.mode='leaving';
  location.hash='solved='+CASE.id;
  location.reload();
}
$('#ending').addEventListener('click',endingNext);

