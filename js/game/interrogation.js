/* 取調室〜自白〜エンディング */
'use strict';

/* =========================================================
   取調室
   ========================================================= */

let shakeT=0;
function goInterro(){
  fade(()=>{
    setMap('interro',10,9,'up'); S.mode='interro';
    $('#loc').textContent=L.interroRoom; $('#boardBtn').classList.add('hidden');
    band('event',{...CASE.interroBand,auto:2400});
    CASE.interroIntro();
    guideInterro();
    run(()=>round(0));
    startDialog();
  });
}
function round(i){
  S.round=i; saveGame();
  $('#loc').textContent=L.interroQ(i+1,ROUNDS.length);
  ask(CASE.suspect,ROUNDS[i].stmt,[
    {label:L.answerWithEv,fn:()=>{S.mode='interro'; openBoard(true,i); return 'hold';}},
    {label:L.reAsk,fn:()=>round(i)},
  ]);
}
function onPick(id){
  const i=B.round, R=ROUNDS[i];
  hideBoard(); S.mode='interro';
  sys(L.presented(EV[id].name));
  if(R.ans.includes(id)){
    AU.sfx('present');
    run(()=>{shakeT=0.6;});
    R.win.forEach(([n,t])=>say(n,t));
    if(i+1<ROUNDS.length) run(()=>round(i+1));
    else run(()=>confession());
  }else{
    const ng=CASE.interroNg;
    say(CASE.suspect,ng[(Math.random()*ng.length)|0]); AU.sfx('wrong');
    say(L.okochi,L.whisper);
    run(()=>round(i));
  }
  startDialog();
}
function confession(){
  $('#loc').textContent=L.interroRoom;
  S.flags.confess=true; clearSave(); S.firstClear=markCleared(CASE.id);
  CASE.confession();
  band('event',{...L.truthBand,auto:3000});
  run(()=>showEnding());
}
function showEnding(){
  S.mode='end'; hideDlg();
  const e=$('#ending');
  const f=FILES.find(x=>x.id===CASE.id);
  e.innerHTML=`<div class="einner">
    <h2>${L.solvedHead(f.no,f.title)}</h2>
    ${CASE.ending()}
    <h3>${L.record}</h3>
    ${L.collected(S.ev.length,EV_TOTAL)}
    <div class="enext">${L.endNext}</div>
  </div>`;
  e.classList.remove('hidden');
  endAt=performance.now();
}
// エンディング画面から先へ進む（FILE選択へ戻る。title.js の returnToFiles）
// 表示直後の操作（帯を閉じたクリックなど）で飛ばさないよう、少し待つ
let endAt=0;
function endingNext(){
  if(S.mode!=='end'||performance.now()-endAt<800) return;
  S.mode='leaving';
  const first=S.firstClear; S.firstClear=false;
  fade(()=>returnToFiles(CASE.id,first));
}
$('#ending').addEventListener('click',endingNext);

