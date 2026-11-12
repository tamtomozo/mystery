/* 番号錠のダイヤル（FILE.06 の非常口で使う） */
'use strict';

/* =========================================================
   openDial({answer,onOk,onNg}) で、answer の桁数ぶんのダイヤルを出す。
   「開ける」で answer と同じなら onOk、ちがえば onNg を呼んでから閉じる（どちらも台詞を積めば、そのまま会話になる）。
   「やめる」／Esc では、何もせずに閉じる。
   操作：▲▼ で数字を回す（↑↓・W S）／←→（A D）で桁を選ぶ／数字キーで直接入れる／Enter で開ける
   ========================================================= */
const DIAL={vals:[],cur:0,answer:'',onOk:null,onNg:null};

function openDial(o){
  Object.assign(DIAL,{vals:Array(o.answer.length).fill(0),cur:0,answer:o.answer,onOk:o.onOk,onNg:o.onNg});
  hideDlg(); P.path=[]; P.pending=null;
  S.mode='dial';
  renderDial(); $('#dial').classList.remove('hidden');
  AU.sfx('guide');
}
function renderDial(){
  $('#dial').innerHTML=`<div class="dwrap">
    <div class="dtitle">${L.dial.title}</div>
    <div class="dnums">${DIAL.vals.map((v,i)=>`<div class="dcol${i===DIAL.cur?' cur':''}">
      <button data-i="${i}" data-d="1" aria-label="+1">▲</button>
      <div class="dv" data-i="${i}">${v}</div>
      <button data-i="${i}" data-d="-1" aria-label="-1">▼</button></div>`).join('')}</div>
    <div class="dacts"><button class="btn gold" data-ok>${L.dial.open}</button><button class="btn" data-cancel>${L.dial.cancel}</button></div>
    <div class="dhint">${L.dial.hint}</div>
  </div>`;
}
function dialTurn(i,d){
  DIAL.cur=i; DIAL.vals[i]=(DIAL.vals[i]+d+10)%10;
  AU.sfx('blip',560+DIAL.vals[i]*40); renderDial();
}
function dialSet(n){
  DIAL.vals[DIAL.cur]=n; AU.sfx('blip',560+n*40);
  DIAL.cur=Math.min(DIAL.vals.length-1,DIAL.cur+1); renderDial();
}
function closeDial(){
  $('#dial').classList.add('hidden'); $('#dial').innerHTML='';
  S.mode='explore';
}
function dialTry(){
  const ok=DIAL.vals.join('')===DIAL.answer, fn=ok?DIAL.onOk:DIAL.onNg;
  closeDial();
  AU.sfx(ok?'lock':'wrong');
  if(fn) fn();
  if(dq.length) startDialog();
}
function dialCancel(){closeDial(); AU.sfx('select');}

// キー操作（main.js の keydown から呼ばれる）
function dialKey(k){
  const n=DIAL.vals.length;
  if(k==='ArrowLeft'||k==='a'){DIAL.cur=(DIAL.cur+n-1)%n; AU.sfx('blip',520); renderDial();}
  else if(k==='ArrowRight'||k==='d'){DIAL.cur=(DIAL.cur+1)%n; AU.sfx('blip',520); renderDial();}
  else if(k==='ArrowUp'||k==='w') dialTurn(DIAL.cur,1);
  else if(k==='ArrowDown'||k==='s') dialTurn(DIAL.cur,-1);
  else if(/^[0-9]$/.test(k)) dialSet(+k);
  else if(k==='Enter'||k===' '||k==='z') dialTry();
  else if(k==='Escape'||k==='x') dialCancel();
}

$('#dial').addEventListener('click',e=>{
  e.stopPropagation();
  const b=e.target.closest('button'), v=e.target.closest('.dv');
  if(v){DIAL.cur=+v.dataset.i; renderDial(); return;}
  if(!b) return;
  if(b.dataset.d) dialTurn(+b.dataset.i,+b.dataset.d);
  else if(b.hasAttribute('data-ok')) dialTry();
  else if(b.hasAttribute('data-cancel')) dialCancel();
});
