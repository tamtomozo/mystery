/* 会話システム（台詞キュー・ダイアログ・吹き出し・帯） */
'use strict';

/* =========================================================
   会話システム
   ========================================================= */
const dq=[]; let dlgCur=null, typing=null, blipF=0;
function say(name,text,cls){dq.push({name,text,cls})}
function sys(text){dq.push({name:'',text,cls:'sys'})}
function ask(name,text,choices){dq.push({name,text,choices})}
function run(fn){dq.push({fn})}
function give(id){run(()=>addEv(id)); sys(L.got(EV[id].name))}
// 帯：kind='event'（演出。autoミリ秒で自動で閉じる）／'guide'（操作説明。クリックで閉じる）
function band(kind,o){dq.push({band:{kind,...o}})}
function guide(title,rows,note){band('guide',{title,rows,note})}



let bandAt=0, bandTimer=0;
function showBand(b){
  hideDlg();
  const el=$('#band'); el.className=b.kind;
  $('#bandLabel').textContent=b.kind==='guide'?L.guideLabel:'';
  $('#bandTitle').textContent=b.title||'';
  $('#bandSub').textContent=b.sub||'';
  $('#bandRows').innerHTML=(b.rows||[]).map(([k,v])=>`<span class="k">${k}</span><span>${v}</span>`).join('');
  $('#bandNote').textContent=b.note||'';
  // アニメーションを毎回やり直す
  el.querySelector('.strip').style.animation='none'; void el.offsetWidth; el.querySelector('.strip').style.animation='';
  bandAt=performance.now();
  AU.sfx(b.kind==='event'?'reveal':'guide');
  clearTimeout(bandTimer);
  if(b.auto) bandTimer=setTimeout(closeBand,b.auto);
}
function closeBand(){
  if($('#band').classList.contains('hidden')) return;
  clearTimeout(bandTimer); $('#band').classList.add('hidden');
  dlgCur=null; nextDialog();
}

function startDialog(){
  if(S.mode!=='dialog'){S.dlgReturn=S.mode; S.mode='dialog';}
  nextDialog();
}
function nextDialog(){
  while(dq.length&&dq[0].fn){dq.shift().fn(); if(S.mode!=='dialog') return;}
  if(!dq.length){endDialog(); return;}
  dlgCur=dq.shift();
  if(dlgCur.band) showBand(dlgCur.band); else showLine(dlgCur,false);
}
function endDialog(){
  hideDlg(); dlgCur=null; S.mode=S.dlgReturn||'explore';
  if(S.mode==='explore'){saveGame(); checkUnlock();}
}
function renderChoices(d){
  d.choices.forEach((c,i)=>{
    const b=document.createElement('button'); b.className='btn'; b.textContent=`${i+1}. ${c.label}`;
    b.onclick=e=>{e.stopPropagation(); pickChoice(i);}; $('#dchoices').appendChild(b);
  });
}
function showLine(d,scene){
  const dlg=$('#dlg');
  $('#dchoices').innerHTML=''; $('#dnext').classList.add('hidden');
  blipF=scene?0:voiceOf(d.name);
  // 自キャラ以外で、画面上にいる人物のセリフは吹き出しで表示
  // （縦持ちでは画面の下の会話ウィンドウに出し、話し手の頭上に印を付ける。印は render.js の drawTalkMark）
  const onScreen=!scene&&d.name&&d.name!==ME&&speakerAnchor(d.name);
  if(onScreen&&!PORTRAIT.matches){
    hideBox(); showBubble(d); return;
  }
  hideBubble(); talkSpeaker=onScreen?d.name:null;
  dlg.classList.remove('hidden','chonly'); dlg.classList.toggle('scene',!!scene);
  let top=false;
  if(scene&&SCN){const ys=Object.values(SCN.actors).map(a=>a.y); top=ys.length>0&&ys.reduce((a,b)=>a+b,0)/ys.length>7.5;}
  dlg.classList.toggle('top',top);
  $('#dname').textContent=d.name||'';
  const t=$('#dtext'); t.className=d.cls||'';
  typeText(t,d.text,()=>{
    if(d.choices) renderChoices(d); else $('#dnext').classList.remove('hidden');
  });
}

/* ---------- 吹き出し ---------- */
let bubbleSpeaker=null;
// 縦持ちかどうか（css/base.css の縦持ちレイアウトと同じ条件）と、縦持ちで会話ウィンドウに出しているセリフの話し手
const PORTRAIT=matchMedia('(orientation:portrait)');
let talkSpeaker=null;
// 話し手の頭上(top)と足元(bottom)の位置（キャンバス座標）。画面上にいなければ null
function speakerAnchor(name){
  if(S.map==='interro'){
    const a=INTERRO_ACTORS.find(x=>name===x.label); if(!a) return null;
    const Z=INTERRO_Z, ox=PW/2-10*TS*Z, oy=PH*INTERRO_CY-7*TS*Z;
    const sx=a.x*TS*Z+ox, sy=a.y*TS*Z+oy;
    return {x:sx,top:sy-31*Z,bottom:sy+14*Z};
  }
  const n=Object.values(NPCS).find(n=>n.map===S.map&&L.speakerOf(n.name)===name);
  if(!n) return null;
  const cx=(n.x+.5)*TS, cy=(n.y+.5)*TS;
  return {x:cx,top:cy-31,bottom:cy+14};
}
function showBubble(d){
  bubbleSpeaker=d.name;
  const b=$('#bubble'); b.classList.remove('hidden','below');
  $('#bname').textContent=d.name; $('#bnext').classList.add('hidden');
  positionBubble();
  typeText($('#btyped'),d.text,()=>{
    if(d.choices){
      const dlg=$('#dlg'); dlg.classList.remove('hidden','scene','top'); dlg.classList.add('chonly');
      $('#dname').textContent=''; $('#dtext').textContent='';
      renderChoices(d);
    }else $('#bnext').classList.remove('hidden');
    positionBubble();
  },$('#brest'));
  positionBubble();
}
function positionBubble(){
  const b=$('#bubble');
  if(b.classList.contains('hidden')||!bubbleSpeaker) return;
  const a=speakerAnchor(bubbleSpeaker); if(!a) return;
  // ゲーム画面（キャンバス）を基準にする。縦持ちでは #stage がキャンバスより縦に長いため
  const sw=cv.clientWidth, sh=cv.clientHeight, kx=sw/PW, ky=sh/PH;
  const bw=b.offsetWidth, bh=b.offsetHeight, gap=12;
  const ax=a.x*kx, upTop=a.top*ky-bh-gap;
  const above=upTop>sh*0.02;
  const top=above?upTop:a.bottom*ky+gap;
  const left=Math.max(6,Math.min(sw-bw-6,ax-bw/2));
  b.style.left=left+'px'; b.style.top=top+'px';
  b.classList.toggle('below',!above);
  $('#btail').style.left=Math.max(12,Math.min(bw-26,ax-left-7))+'px';
}
function hideBubble(){$('#bubble').classList.add('hidden'); bubbleSpeaker=null;}
function hideBox(){$('#dlg').classList.add('hidden')}
function pickChoice(i){
  if(!dlgCur||!dlgCur.choices||typing) return;
  const c=dlgCur.choices[i]; if(!c) return;
  $('#dchoices').innerHTML=''; AU.sfx('select');
  $('#dlg').classList.remove('chonly');
  const r=c.fn();
  if(r==='hold'){hideDlg(); return;}
  if(S.mode==='dialog') nextDialog();
}
function hideDlg(){hideBox(); hideBubble(); talkSpeaker=null;}
// rest：まだ表示していない文字を透明で置いておき、吹き出しの大きさを最初から確定させる
function typeText(el,text,done,rest){
  if(typing) clearInterval(typing.iv);
  let i=0; el.textContent=''; if(rest) rest.textContent=text;
  const iv=setInterval(()=>{
    i+=1; el.textContent=text.slice(0,i); if(rest) rest.textContent=text.slice(i);
    if(blipF&&i%3===1) AU.sfx('blip',blipF);
    if(i>=text.length) finishTyping();
  },24);
  typing={iv,el,text,done,rest};
}
function finishTyping(){
  if(!typing) return; clearInterval(typing.iv);
  typing.el.textContent=typing.text; if(typing.rest) typing.rest.textContent='';
  const d=typing.done; typing=null; d&&d();
}
function advance(){
  if(S.mode==='dialog'){
    if(dlgCur&&dlgCur.band){closeBand(); return;}
    if(typing){finishTyping(); return;}
    if(dlgCur&&!dlgCur.choices) nextDialog();
  }else if(S.mode==='scene') sceneAdvance();
}

