/* ゲーム状態と判定ヘルパー */
'use strict';

/* =========================================================
   状態
   ========================================================= */
const S={mode:'title',map:'study',ev:[],seenEv:new Set(),hyps:{},flags:{},keys:new Set(),dlgReturn:'explore',phaseShown:0,review:null};
const has=id=>S.ev.includes(id);
const unlockedHyps=()=>HYPS.filter(h=>S.hyps[h.id]);
function hypStatus(h){
  const st=S.hyps[h.id]; if(!st) return 'locked';
  if(h.claims.some((c,i)=>!c.truth&&st.claims[i]==='ng')) return 'refuted';
  if(h.final&&h.claims.every((c,i)=>st.claims[i]==='ok')) return 'proven';
  return 'open';
}
const phase=()=>HYPS.filter(h=>hypStatus(h)==='refuted').length;
const avail=id=>EV_PHASE[id]<=phase();
const findable=id=>avail(id)&&!has(id);

