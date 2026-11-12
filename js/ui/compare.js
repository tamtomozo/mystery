/* 投書と議事録の照合（FILE.08 の会議室の長机で使う） */
'use strict';

/* =========================================================
   openCompare(pair) で、投書（左）と議事録（右）を並べて出す。pair は事件データの COMPARE の一組：
     {ev,title,letter:[{t,ok?,note?}],minutes:[[時刻,文]],hint,found()}
   投書の文を選ぶと、
     ok の文 … 閉じて found() を呼ぶ（台詞と give を積めば、そのまま会話になる）
     それ以外 … 「議事録と食い違いはない」（note があればその独り言）。二度外すと、hint を出す
   「やめる」／Esc では、何もせずに閉じる。
   操作：文をタップ／←→（↑↓・A D W S）で文を選び、Enter で決める
   ========================================================= */
const CMP={pair:null,cur:0,miss:0,msg:'',bad:-1};

function openCompare(p){
  Object.assign(CMP,{pair:p,cur:0,miss:0,msg:'',bad:-1});
  hideDlg(); P.path=[]; P.pending=null;
  S.mode='compare';
  renderCompare(); $('#compare').classList.remove('hidden');
  $('#compare .cbody').scrollTop=0;
  AU.sfx('paper');
}
function renderCompare(){
  const p=CMP.pair, C=L.compare;
  // 描き直しても、紙の読んでいた位置は保つ
  const tops=[...document.querySelectorAll('#compare .cbody')].map(el=>el.scrollTop);
  $('#compare').innerHTML=`<div class="cwrap">
    <div class="ctitle">${C.title}</div>
    <div class="csub">${p.title}</div>
    <div class="ccols">
      <div class="cpaper letter"><div class="chead">${C.letter}</div>
        <div class="cbody">${p.letter.map((s,i)=>`<span class="cseg${i===CMP.cur?' cur':''}${i===CMP.bad?' bad':''}" data-i="${i}">${s.t}</span>`).join('')}</div></div>
      <div class="cpaper minutes"><div class="chead">${C.minutes}</div>
        <div class="cbody">${p.minutes.map(([t,s])=>`<div class="crow"><span class="ctime">${t}</span><span>${s}</span></div>`).join('')}</div></div>
    </div>
    <div class="cmsg">${CMP.msg||C.ask}</div>
    <div class="cacts"><button class="btn gold" data-ok>${C.pick}</button><button class="btn" data-cancel>${C.cancel}</button></div>
    <div class="chint">${C.keys}</div>
  </div>`;
  document.querySelectorAll('#compare .cbody').forEach((el,i)=>{if(tops[i]) el.scrollTop=tops[i];});
}
function closeCompare(){
  $('#compare').classList.add('hidden'); $('#compare').innerHTML='';
  S.mode='explore';
}
function comparePick(i){
  const p=CMP.pair, s=p.letter[i]; if(!s) return;
  CMP.cur=i;
  if(s.ok){
    closeCompare(); AU.sfx('support');
    p.found();
    if(dq.length) startDialog();
    return;
  }
  CMP.miss++; CMP.bad=i; AU.sfx('wrong');
  const ng=L.compare.miss;
  CMP.msg=s.note||ng[(Math.random()*ng.length)|0];
  if(CMP.miss>=2) CMP.msg+=`<br><span class="chintline">${p.hint}</span>`;
  renderCompare();
}
function compareMove(d){
  const n=CMP.pair.letter.length;
  CMP.cur=(CMP.cur+d+n)%n; CMP.bad=-1; AU.sfx('blip',520); renderCompare();
  const el=$('#compare .cseg.cur'); if(el) el.scrollIntoView({block:'nearest'});
}
function compareCancel(){closeCompare(); AU.sfx('paper');}

// キー操作（main.js の keydown から呼ばれる）
function compareKey(k){
  if(k==='ArrowLeft'||k==='ArrowUp'||k==='a'||k==='w') compareMove(-1);
  else if(k==='ArrowRight'||k==='ArrowDown'||k==='d'||k==='s') compareMove(1);
  else if(k==='Enter'||k===' '||k==='z') comparePick(CMP.cur);
  else if(k==='Escape'||k==='x') compareCancel();
}

$('#compare').addEventListener('click',e=>{
  e.stopPropagation();
  const seg=e.target.closest('.cseg'), b=e.target.closest('button');
  if(seg){
    const i=+seg.dataset.i;
    // 選んでいる文をもう一度タップしたら決める。ほかの文なら、まず選ぶ（スマホでの押しまちがいを防ぐ）
    if(i===CMP.cur&&CMP.bad!==i) comparePick(i);
    else{CMP.cur=i; CMP.bad=-1; AU.sfx('blip',560); renderCompare();}
    return;
  }
  if(!b) return;
  if(b.hasAttribute('data-ok')) comparePick(CMP.cur);
  else if(b.hasAttribute('data-cancel')) compareCancel();
});
