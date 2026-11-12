/* 事件のプロローグ（「はじめから」捜査するときだけ、捜査開始の前に出す） */
'use strict';

/* =========================================================
   事件データの prologue（js/data/fileXX/story.js）を、4段で一段ずつ見せる。
     prehead … プリヘッド：どんな人に向けた事件かを示し、その人の目を引く
     catch   … キャッチコピー：このあとに続く物語の広告。先を読ませる
     deck[]  … デッキコピー：キャッチの衝撃を補強し、好奇心をそそる
     lead[]  … リード：この事件を解くと何が得られるのかを明かす
   クリック / Space で次の段へ。全部出たあとにもう一度送ると、捜査（CASE.intro）がはじまる。
   「スキップ」/ Esc でいつでも飛ばせる。
   ========================================================= */
const PRO={step:0,parts:[],done:null,at:0,closing:false};

function startPrologue(p,done){
  const el=$('#prologue');
  el.innerHTML=`<div class="pinner">
    <div class="pro-pre"><span>${p.prehead}</span></div>
    <h2 class="pro-catch">${p.catch}</h2>
    <div class="pro-deck">${p.deck.map(t=>`<p>${t}</p>`).join('')}</div>
    <div class="pro-lead">${p.lead.map(t=>`<p>${t}</p>`).join('')}</div>
    <div class="pro-next">${L.proNext}</div>
  </div><div class="pro-tap">▼</div>`;
  PRO.parts=[...el.querySelectorAll('.pinner>*')];
  PRO.step=0; PRO.done=done; PRO.at=0; PRO.closing=false;
  S.mode='prologue';
  el.scrollTop=0; el.classList.remove('hidden','last');
  $('#app').classList.add('scene'); $('#skip').classList.remove('hidden');
  setTimeout(()=>{if(PRO.step===0) prologueNext(true);},500);   // 暗転が明けてから、プリヘッドを出す
}

function prologueNext(force){
  if(S.mode!=='prologue'||PRO.closing) return;
  const now=performance.now();
  if(!force&&now-PRO.at<300) return;   // 連打で読み飛ばさないように
  PRO.at=now;
  if(PRO.step>=PRO.parts.length){endPrologue(); return;}
  const part=PRO.parts[PRO.step++];
  part.classList.add('on');
  // リードを出したら「捜査をはじめる」の案内も続けて出す
  if(part.classList.contains('pro-lead')) PRO.parts[PRO.step++].classList.add('on');
  const last=PRO.step>=PRO.parts.length;
  $('#prologue').classList.toggle('last',last);
  AU.sfx(part.classList.contains('pro-catch')?'reveal':'paper');
  // 狭い画面では、最後に出したもの（リードのあとは案内）が見えるところまで送る
  PRO.parts[PRO.step-1].scrollIntoView({block:'nearest',behavior:'smooth'});
}

function endPrologue(){
  if(S.mode!=='prologue'||PRO.closing) return;
  PRO.closing=true;
  fade(()=>{
    $('#prologue').classList.add('hidden'); $('#prologue').innerHTML='';
    $('#app').classList.remove('scene'); $('#skip').classList.add('hidden');
    const d=PRO.done; PRO.done=null; PRO.closing=false;
    d&&d();
  });
}

$('#prologue').addEventListener('click',e=>{e.stopPropagation(); prologueNext();});
