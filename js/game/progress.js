/* 進行管理：仮定の解放と捜査段階 */
'use strict';

/* =========================================================
   仮定の解放 → シーン再生
   ========================================================= */
function checkUnlock(){
  if(S.mode!=='explore') return;
  const n=unlockedHyps().length, next=HYPS[n]; if(!next) return;
  const cur=HYPS[n-1];
  if(!next.requires.every(has)) return;
  if(cur&&hypStatus(cur)!=='refuted'){
    if(!S.flags['nudge'+n]){S.flags['nudge'+n]=1; toast('新たな物証がそろった。捜査ボード［B］で、今の仮定を検証しよう',4200);}
    return;
  }
  S.hyps[next.id]={claims:{}};
  band('event',{title:'仮定がうかびあがる',sub:'―― 物証が、ひとつの筋につながった',auto:2600});
  run(()=>startScene(next.id,true));
  startDialog();
}

// 仮定が否定されて段階が進んだら、滝沢が新しい調査ポイントを知らせる
function checkPhase(){
  const p=phase();
  if(p<=S.phaseShown) return false;
  S.phaseShown=p; AU.sfx('phase');
  const name=S.map===NPCS.takizawa.map?'滝沢':'滝沢（無線）';
  (PHASE_MSG[p]||[]).forEach(l=>say(name,l));
  if(CASE.phaseGuide&&CASE.phaseGuide[p]) CASE.phaseGuide[p]();
  run(()=>toast('新たな調査ポイントが現れた',3200));
  startDialog();
  return true;
}

