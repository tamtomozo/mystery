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
$('#skip').addEventListener('click',e=>{e.stopPropagation(); endScene();});
$('#boardBtn').addEventListener('click',()=>{if(S.mode==='explore') openBoard(false);});
$('#helpBtn').addEventListener('click',()=>{
  if(S.mode!=='explore') return;
  guideAll();
  startDialog();
});

function continueGame(d){
  $('#title').classList.add('hidden');
  S.ev=(d.ev||[]).filter(id=>EV[id]);
  S.hyps=d.hyps||{}; S.flags=d.flags||{}; S.phaseShown=d.phaseShown||0; S.seenEv=new Set(d.seen||[]);
  updateHud();
  if(d.map==='interro'){
    setMap('interro',10,9,'up'); S.mode='interro'; $('#boardBtn').classList.add('hidden');
    sys('―― 取調べを再開する。');
    round(d.round||0); startDialog();
    return;
  }
  S.mode='explore';
  const map=MAPDEF[d.map]?d.map:'study';
  setMap(map,d.x,d.y,d.dir||'down');
  if(!walkable(P.x,P.y)) setMap('study',9,2,'down');
  toast('前回の続きから再開します');
  if(!checkPhase()) checkUnlock();
}
function newGame(){
  $('#title').classList.add('hidden');
  setMap('study',9,2,'left'); S.mode='explore'; updateHud();
  say('滝沢','来たか、新人。ここが現場――館の主人、黒崎宗一郎の書斎だ。');
  say('滝沢','今朝、秘書の柏木から「書斎のドアが開かない、旦那様の返事がない」と通報があった。ドアは内側から施錠。警官が体当たりで破った。');
  say('滝沢','窓も施錠済み。鍵は机の上。……つまり、密室だ。');
  say('滝沢','遺体はもう運び出してある。現場を調べて、物証を集めてくれ。物証がつながれば、何が起きたのか「仮定」が見えてくるはずだ。');
  guideBasic();
  startDialog();
}
$('#startBtn').addEventListener('click',()=>{AU.init(); AU.sfx('select'); newGame();});
$('#contBtn').addEventListener('click',()=>{AU.init(); AU.sfx('select'); const d=readSave(); d?continueGame(d):newGame();});
(function initTitle(){
  const d=readSave(); if(!d) return;
  $('#contBtn').classList.remove('hidden');
  const when=new Date(d.time).toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
  const where=d.map==='interro'?'取調室':(MAPDEF[d.map]||MAPDEF.study).name.split(' ―')[0];
  $('#saveinfo').innerHTML=`前回の記録：${when}　${where}　物証 ${(d.ev||[]).length}/${EV_TOTAL}<br>※「はじめから」を選ぶと、記録は上書きされます`;
})();

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
// BGMは回想（仮定シーン）と、考えているとき（捜査ボード／取調べで物証を選ぶとき）だけ。ほかの場面は無音
function wantedBgm(){
  if(SCN) return 'scene';
  if(S.mode==='board') return 'think';
  return null;
}

document.addEventListener('click',e=>{const b=e.target.closest('button'); if(b) setTimeout(()=>b.blur(),0);});
window.addEventListener('keydown',e=>{
  const k=e.key.length===1?e.key.toLowerCase():e.key;
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Tab'].includes(e.key)) e.preventDefault();
  if(S.mode==='board'){if(k==='Escape'||k==='b'||k==='Tab') closeBoard(true); return;}
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

