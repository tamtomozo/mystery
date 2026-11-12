/* 進行管理：推理の解放と捜査段階 */
'use strict';

/* =========================================================
   推理の解放 → シーン再生
   ========================================================= */
function checkUnlock(){
  if(S.mode!=='explore') return;
  const n=unlockedHyps().length, next=HYPS[n]; if(!next) return;
  const cur=HYPS[n-1];
  if(!next.requires.every(has)) return;
  if(cur&&hypStatus(cur)!=='refuted'){
    if(!S.flags['nudge'+n]){S.flags['nudge'+n]=1; toast(L.nudge,4200);}
    return;
  }
  S.hyps[next.id]={claims:{}};
  band('event',{...L.hypBand,auto:2600});
  run(()=>startScene(next.id,true));
  startDialog();
}

// 推理が否定されて段階が進んだら、滝沢が新しい調査ポイントを知らせる
function checkPhase(){
  const p=phase();
  if(p<=S.phaseShown) return false;
  S.phaseShown=p; AU.sfx('phase');
  // 段階が進むたびに、時刻などの帯を出す事件もある（FILE.06：夜が更けていく）
  if(CASE.phaseBand&&CASE.phaseBand[p]) band('event',{...CASE.phaseBand[p],auto:2400});
  const name=S.map===NPCS.takizawa.map?L.tak:L.takRadio;
  (PHASE_MSG[p]||[]).forEach(l=>say(name,l));
  if(CASE.phaseGuide&&CASE.phaseGuide[p]) CASE.phaseGuide[p]();
  run(()=>toast(L.newSpots,3200));
  startDialog();
  return true;
}

