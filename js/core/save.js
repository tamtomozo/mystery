/* セーブ（localStorage） */
'use strict';

/* =========================================================
   セーブ（ブラウザの localStorage に自動保存）
   ========================================================= */
// 事件ごとに別の場所へ保存する（保存先は事件データの saveKey）
function readSave(id){
  try{const d=JSON.parse(localStorage.getItem(CASES[id].saveKey)||'null'); return d&&d.v===1?d:null;}catch(e){return null;}
}
function clearSave(){if(CASE) try{localStorage.removeItem(CASE.saveKey);}catch(e){}}

/* 解決済みの事件ファイル（FILE選択画面の「解決」印に使う） */
const CLEAR_KEY='hidden-truth-cleared';
function clearedFiles(){
  try{const a=JSON.parse(localStorage.getItem(CLEAR_KEY)||'[]'); return Array.isArray(a)?a:[];}catch(e){return [];}
}
const isCleared=id=>clearedFiles().includes(id);
// 初めて解決したときは true を返す
function markCleared(id){
  const a=clearedFiles(); if(a.includes(id)) return false;
  a.push(id); try{localStorage.setItem(CLEAR_KEY,JSON.stringify(a));}catch(e){}
  return true;
}

/* 解決したときの捜査ボード（FILE選択画面の「捜査ボードを見る」で振り返る）
   クリア時にセーブは消えるので、ボード（集めた物証と推理の判定）だけを事件ごとに残しておく。
   もう一度解決したら、新しいボードで上書きする */
const BOARD_KEY='hidden-truth-boards';
function readBoards(){
  try{const o=JSON.parse(localStorage.getItem(BOARD_KEY)||'{}'); return o&&typeof o==='object'?o:{};}catch(e){return {};}
}
const readBoard=id=>{const d=readBoards()[id]; return d&&d.v===1?d:null;};
function saveBoard(){
  const o=readBoards(); o[CASE.id]={v:1,time:Date.now(),ev:S.ev.slice(),hyps:S.hyps};
  try{localStorage.setItem(BOARD_KEY,JSON.stringify(o));}catch(e){}
}

/* ---------- セーブ／ロード ---------- */
let savedT=0;
function saveGame(){
  if(!CASE||S.review||S.mode==='title'||S.mode==='files'||S.mode==='end'||S.flags.confess) return;
  const interro=S.map==='interro';
  const data={v:1,time:Date.now(),ev:S.ev,hyps:S.hyps,flags:S.flags,phaseShown:S.phaseShown,seen:[...S.seenEv],
    map:S.map,x:P.moving?P.tx:P.x,y:P.moving?P.ty:P.y,dir:P.dir,round:interro?(S.round||0):null};
  try{localStorage.setItem(CASE.saveKey,JSON.stringify(data));}catch(e){return;}
  const el=$('#saved'); el.classList.add('on'); clearTimeout(savedT); savedT=setTimeout(()=>el.classList.remove('on'),1400);
}

