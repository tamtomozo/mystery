/* 取調室〜自白〜エンディング */
'use strict';

/* =========================================================
   取調室
   ========================================================= */

let shakeT=0;
function goInterro(){
  // 暗転のあいだは操作を受け付けない（ここで捜査ボードを開けると、取調べが進まなくなる）
  // 選択肢から呼ばれても run から呼ばれても、mode が dialog でなくなるので、会話の続きは送られない
  S.mode='leaving'; hideDlg(); P.path=[]; P.pending=null;
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
  S.flags.confess=true; saveBoard(); clearSave(); S.firstClear=markCleared(CASE.id);
  CASE.confession();
  band('event',{...L.truthBand,auto:3000});
  run(()=>showEnding());
}
/* エンディング：プロローグ（js/ui/prologue.js）と同じように、一段ずつ浮かびあがらせる
   解決の見出し → 真相 → 隠された真実（→ 事件によってはその後の話）→ 捜査記録 の順。
   段は事件データの ending() の <h3> ごとに分ける。全部出たあとにもう一度送ると、FILE選択へ戻る */
const END={step:0,parts:[],at:0};
function showEnding(){
  S.mode='end'; hideDlg();
  const e=$('#ending');
  const f=FILES.find(x=>x.id===CASE.id);
  const secs=CASE.ending().split(/(?=<h3>)/).map(s=>s.trim()).filter(Boolean);
  e.innerHTML=`<div class="einner">
    <h2>${L.solvedHead(f.no,f.title)}</h2>
    ${secs.map(s=>`<section class="esec">${s}</section>`).join('')}
    <section class="esec erec"><h3>${L.record}</h3>${L.collected(S.ev.length,EV_TOTAL)}</section>
    <div class="enext">${L.endNext}</div>
  </div><div class="pro-tap">▼</div>`;
  END.parts=[...e.querySelectorAll('.einner>*')]; END.step=0; END.at=0;
  e.scrollTop=0; e.classList.remove('hidden','last');
  setTimeout(()=>{if(S.mode==='end'&&END.step===0) endingStep();},500);   // 帯が消えてから、解決の見出しを出す
}
function endingStep(){
  const part=END.parts[END.step++];
  part.classList.add('on');
  // 捜査記録を出したら「次へ」の案内も続けて出す
  if(part.classList.contains('erec')) END.parts[END.step++].classList.add('on');
  $('#ending').classList.toggle('last',END.step>=END.parts.length);
  // 隠された真実（2つ目の段）だけ、推理が浮かぶときの音にする
  AU.sfx(part.classList.contains('esec')&&part===END.parts[2]?'reveal':'paper');
  // 狭い画面では、最後に出したもの（捜査記録のあとは案内）が見えるところまで送る
  END.parts[END.step-1].scrollIntoView({block:'nearest',behavior:'smooth'});
}
// クリック / Space で次の段へ。全部出たら FILE選択へ戻る（title.js の returnToFiles）
// 連打で読み飛ばさないよう、少し待つ（表示直後の、帯を閉じたクリックなども）
function endingNext(){
  if(S.mode!=='end'||END.step===0) return;
  const now=performance.now();
  if(now-END.at<300) return;
  END.at=now;
  if(END.step<END.parts.length){endingStep(); return;}
  S.mode='leaving';
  const first=S.firstClear; S.firstClear=false;
  fade(()=>returnToFiles(CASE.id,first));
}
$('#ending').addEventListener('click',endingNext);

