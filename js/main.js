/* メインループ・入力・タイトル・ニューゲーム／コンティニュー */
'use strict';

/* =========================================================
   ループ・入力
   ========================================================= */
let last=0;
function loop(ts){
  const t=ts/1000, dt=Math.min(.05,t-last); last=t;
  if(SCN) updateScene(dt);
  updatePlayer(dt);
  if(shakeT>0) shakeT=Math.max(0,shakeT-dt);
  AU.setTrack(wantedBgm());
  if(bubbleSpeaker) positionBubble();
  render(t);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

cv.addEventListener('pointerdown',e=>{
  if(S.mode==='scene'){sceneAdvance(); return;}
  if(S.mode==='dialog'){advance(); return;}
  if(S.mode!=='explore') return;
  const r=cv.getBoundingClientRect();
  onTap(Math.floor((e.clientX-r.left)/r.width*W),Math.floor((e.clientY-r.top)/r.height*H));
});
$('#dlg').addEventListener('click',e=>{e.stopPropagation(); advance();});
$('#bubble').addEventListener('click',e=>{e.stopPropagation(); advance();});
// 帯が出た直後のクリック（前の会話を送ったクリック）で閉じないよう、少し待つ
$('#band').addEventListener('click',e=>{e.stopPropagation(); if(performance.now()-bandAt>400) advance();});
$('#skip').addEventListener('click',e=>{e.stopPropagation(); if(S.mode==='prologue') endPrologue(); else endScene();});
$('#boardBtn').addEventListener('click',()=>{if(S.mode==='explore') openBoard(false);});
$('#helpBtn').addEventListener('click',()=>{
  if(S.mode!=='explore') return;
  guideAll();
  startDialog();
});

/* ---------- 事件に入る（はじめから／続きから） ---------- */
function enterCase(id){
  useCase(id); S.review=null;
  $('#title').classList.add('hidden'); $('#files').classList.add('hidden'); $('#app').classList.remove('menu');
  $('#boardBtn').classList.remove('hidden');
  S.ev=[]; S.hyps={}; S.flags={}; S.phaseShown=0; S.seenEv=new Set(); S.round=0;
  B.hyp=null; dq.length=0; SCN=null; hideDlg();
}
function continueGame(id,d){
  enterCase(id);
  S.ev=(d.ev||[]).filter(id=>EV[id]);
  S.hyps=d.hyps||{}; S.flags=d.flags||{}; S.phaseShown=d.phaseShown||0; S.seenEv=new Set(d.seen||[]);
  updateHud();
  if(d.map==='interro'){
    setMap('interro',10,9,'up'); S.mode='interro'; $('#boardBtn').classList.add('hidden');
    sys(L.resumeInterro);
    round(d.round||0); startDialog();
    return;
  }
  S.mode='explore';
  if(MAPDEF[d.map]&&HS[d.map]) setMap(d.map,d.x,d.y,d.dir||'down');
  else setMap(...CASE.start);
  if(!walkable(P.x,P.y)) setMap(...CASE.start);
  toast(L.resumed);
  if(!checkPhase()) checkUnlock();
}
function newGame(id){
  enterCase(id);
  S.mode='explore'; setMap(...CASE.start); updateHud();
  const begin=()=>{
    S.mode='explore';
    CASE.intro();
    guideBasic();
    startDialog();
  };
  // プロローグのある事件は、捜査の前にプロローグを見せる（js/ui/prologue.js）
  if(CASE.prologue) startPrologue(CASE.prologue,begin); else begin();
}
// タイトル・FILE選択の画面は js/ui/title.js

/* ---------- サウンド切り替え ---------- */
function soundButtons(){
  $('#bgmBtn').classList.toggle('off',!AU.pref.bgm);
  $('#seBtn').classList.toggle('off',!AU.pref.se);
}
$('#bgmBtn').addEventListener('click',()=>{AU.init(); AU.setPref('bgm',!AU.pref.bgm); soundButtons();});
$('#seBtn').addEventListener('click',()=>{AU.init(); AU.setPref('se',!AU.pref.se); soundButtons(); AU.sfx('select');});
soundButtons();
// ブラウザの制約で、最初の操作のあとに音が鳴り始める
window.addEventListener('pointerdown',()=>AU.init(),{once:true});
window.addEventListener('keydown',()=>AU.init(),{once:true});
// BGMはタイトル／FILE選択、回想（推理シーン）、考えているとき（捜査ボード／取調べで物証を選ぶとき）だけ。ほかの場面（プロローグも）は無音
function wantedBgm(){
  if(S.mode==='title'||S.mode==='files') return performance.now()<FS.bgmAt?null:'title';   // 解決の判を押した直後は、少し間をおく
  if(SCN) return SCN.cctv?null:'scene';   // 監視カメラの映像は無音
  if(S.mode==='board') return 'think';
  return null;
}

document.addEventListener('click',e=>{const b=e.target.closest('button'); if(b) setTimeout(()=>b.blur(),0);});
window.addEventListener('keydown',e=>{
  const k=e.key.length===1?e.key.toLowerCase():e.key;
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Tab'].includes(e.key)) e.preventDefault();
  if(S.mode==='title'||S.mode==='files'){if(!e.repeat||e.key.startsWith('Arrow')) menuKey(k); return;}
  if(S.mode==='board'){if(k==='Escape'||k==='b'||k==='Tab') closeBoard(true); return;}
  if(S.mode==='prologue'){
    if(e.repeat) return;
    if(k===' '||k==='Enter'||k==='z') prologueNext(); else if(k==='Escape') endPrologue();
    return;
  }
  if(k===' '||k==='Enter'||k==='z'){
    if(e.repeat) return;
    if(S.mode==='explore') keyInteract();
    else if(S.mode==='end') endingNext();
    else advance();
    return;
  }
  if(S.mode==='dialog'&&/^[1-9]$/.test(k)){pickChoice(+k-1); return;}
  if((k==='b'||k==='Tab')&&S.mode==='explore'){openBoard(false); return;}
  S.keys.add(k);
});
window.addEventListener('keyup',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key; S.keys.delete(k);});
window.addEventListener('blur',()=>S.keys.clear());

