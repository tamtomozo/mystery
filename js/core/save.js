/* セーブ（localStorage） */
'use strict';

/* =========================================================
   セーブ（ブラウザの localStorage に自動保存）
   ========================================================= */
const SAVE_KEY='hidden-truth-file01-save';
function readSave(){
  try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null'); return d&&d.v===1?d:null;}catch(e){return null;}
}
function clearSave(){try{localStorage.removeItem(SAVE_KEY);}catch(e){}}

/* ---------- セーブ／ロード ---------- */
let savedT=0;
function saveGame(){
  if(S.mode==='title'||S.mode==='end'||S.flags.confess) return;
  const interro=S.map==='interro';
  const data={v:1,time:Date.now(),ev:S.ev,hyps:S.hyps,flags:S.flags,phaseShown:S.phaseShown,seen:[...S.seenEv],
    map:S.map,x:P.moving?P.tx:P.x,y:P.moving?P.ty:P.y,dir:P.dir,round:interro?(S.round||0):null};
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(data));}catch(e){return;}
  const el=$('#saved'); el.classList.add('on'); clearTimeout(savedT); savedT=setTimeout(()=>el.classList.remove('on'),1400);
}

