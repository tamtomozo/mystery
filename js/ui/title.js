/* タイトル画面と FILE選択画面 */
'use strict';

/* =========================================================
   タイトル → FILE選択 → 「続きから／はじめから」
   FILE選択は2段：list（ファイルを選ぶ）→ act（続きから／はじめからを選ぶ）
   ========================================================= */
const FS={sel:0,level:'list',act:0,busy:false,bgmAt:0};   // bgmAt：この時刻（performance.now）まで BGM を待たせる

function showTitle(){
  S.mode='title';
  $('#files').classList.add('hidden'); $('#title').classList.remove('hidden');
  $('#loc').textContent=L.gameTitle;
}
function openFiles(){
  if(S.mode!=='title') return;
  AU.init(); AU.sfx('select');
  S.mode='files'; FS.level='list'; FS.act=0;
  $('#title').classList.add('hidden'); $('#files').classList.remove('hidden');
  $('#loc').textContent=L.caseFiles;
  renderFiles();
}

const FSTATUS=L.fstatus;
// 事件は FILE.01 から順番に開く：ひとつ前の事件を解決すると、次の事件が開く
// （すでに途中の記録があるか、解決済みの事件は、そのまま開いておく）
function prevFile(f){const i=FILES.indexOf(f); return i>0?FILES[i-1]:null;}
function isOpen(f){
  if(!f.ready) return false;
  const p=prevFile(f);
  return !p||isCleared(p.id)||isCleared(f.id)||!!(f.save&&f.save());
}
function fileStatus(f){
  if(!f.ready) return 'locked';
  if(!isOpen(f)) return 'sealed';
  if(f.save&&f.save()) return 'progress';
  if(isCleared(f.id)) return 'solved';
  return 'fresh';
}
function fileActs(f){
  if(!isOpen(f)) return [];
  const d=f.save&&f.save(), a=[];
  if(d) a.push({label:L.actContinue,fn:()=>f.resume(d)});
  a.push({label:d?L.actRestart:isCleared(f.id)?L.actReplay:L.actStart,fn:f.start});
  if(isCleared(f.id)) a.push({label:L.actReview,fn:()=>openReview(f.id),overlay:true});
  return a;
}
function saveSummary(f,d){
  const when=new Date(d.time).toLocaleString(L.locale,{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
  const where=d.map==='interro'?L.interroRoom:MAPDEF[d.map]?L.mapShort(MAPDEF[d.map].name):L.sceneFallback;
  return `${when}　${where}　${L.saveEv((d.ev||[]).length,evTotalOf(f.id))}`;
}

function renderFiles(){
  const list=$('#flist'); list.innerHTML='';
  FILES.forEach((f,i)=>{
    const st=fileStatus(f), b=document.createElement('button');
    b.className=`fcard ${st}`+(i===FS.sel?' sel':'')+(i===FS.sel&&FS.level==='list'?' cur':'');
    b.innerHTML=`<span class="no">${f.no}</span><span class="tt">${isOpen(f)?f.title:L.unknown}</span><span class="badge">${FSTATUS[st]}</span>`;
    b.onclick=e=>{
      e.stopPropagation(); if(FS.busy) return;
      if(FS.sel!==i) AU.sfx('blip',520);
      FS.sel=i; FS.level='list'; FS.act=0; renderFiles();
    };
    list.appendChild(b);
  });

  const f=FILES[FS.sel], st=fileStatus(f), el=$('#fdetail');
  el.className=st;
  if(!f.ready){
    el.innerHTML=`<div class="fd-no">${f.no}</div><h2>${L.lockedTitle}</h2>
      <p class="fd-lead">${L.lockedLead}</p>`;
  }else if(st==='sealed'){
    el.innerHTML=`<div class="fd-no">${f.no}</div><h2>${L.sealedTitle}</h2>
      <p class="fd-lead">${L.sealedLead(prevFile(f).no)}</p>`;
  }else{
    const d=f.save&&f.save();
    const slam=FS.firstSolved===f.id; FS.firstSolved=null;
    el.innerHTML=`${isCleared(f.id)?`<div class="fstamp${slam?' slam':''}">${L.solvedStamp}</div>`:''}
      <div class="fd-no">${f.no}</div><h2>${f.title}</h2>
      <p class="fd-lead">${f.lead}</p>
      <div class="fd-stat">${L.statusLabel}<b>${FSTATUS[st]}</b></div>
      ${d?`<div class="fd-save">${L.lastSave}${saveSummary(f,d)}</div>`:''}
      <div class="fd-acts"></div>
      ${d?`<div class="fd-note">${L.restartNote}</div>`:''}`;
    // 判が紙に当たる瞬間（css の stampFirst：0.6秒待って 0.55秒の 60% の時点）に、音と揺れを合わせる
    if(slam){
      el.classList.add('stamping');   // 大きく降ってくる判で、スクロールバーが出ないように
      FS.bgmAt=performance.now()+930+1000;   // 判を押してから1秒おいて、BGM を始める
      setTimeout(()=>{AU.sfx('stamp'); el.classList.remove('thud'); void el.offsetWidth; el.classList.add('thud');},930);
      setTimeout(()=>el.classList.remove('stamping'),1700);
    }
    fileActs(f).forEach((a,i)=>{
      const b=document.createElement('button');
      b.className='btn gold'+(FS.level==='act'&&i===FS.act?' cur':'');
      b.textContent=a.label;
      b.onclick=e=>{e.stopPropagation(); startFile(a);};
      el.querySelector('.fd-acts').appendChild(b);
    });
  }
  $('#files .fhint').textContent=FS.level==='list'
    ?L.hintList
    :L.hintAct;
}

function startFile(a){
  if(FS.busy) return;
  AU.init();
  if(a.overlay){a.fn(); return;}
  FS.busy=true;
  fade(()=>{ $('#files').classList.add('hidden'); FS.busy=false; a.fn(); });
}

// タイトル／FILE選択でのキー操作（main.js の keydown から呼ばれる）
function menuKey(k){
  const ok=k===' '||k==='Enter'||k==='z', back=k==='Escape'||k==='x';
  if(S.mode==='title'){ if(ok) openFiles(); return; }
  if(FS.busy) return;
  const up=k==='ArrowUp'||k==='w', dn=k==='ArrowDown'||k==='s';
  const lf=k==='ArrowLeft'||k==='a', rt=k==='ArrowRight'||k==='d';
  const acts=fileActs(FILES[FS.sel]);
  if(FS.level==='list'){
    if(up||dn){FS.sel=(FS.sel+(dn?1:-1)+FILES.length)%FILES.length; AU.sfx('blip',520); renderFiles();}
    else if(ok||rt){
      if(!acts.length){AU.sfx('wrong'); return;}
      FS.level='act'; FS.act=0; AU.sfx('blip',660); renderFiles();
    }
    else if(back){AU.sfx('blip',400); showTitle();}
  }else{
    if(up||dn||lf||rt){FS.act=(FS.act+(rt||dn?1:-1)+acts.length)%acts.length; AU.sfx('blip',520); renderFiles();}
    else if(ok) startFile(acts[FS.act]);
    else if(back){FS.level='list'; AU.sfx('blip',400); renderFiles();}
  }
}

$('#title').addEventListener('click',openFiles);

// 事件を解決してエンディングから戻ってきたら、タイトルを飛ばして FILE選択を開く（解決した事件を選んだ状態で）
// 初めての解決なら、「解決」の判を押す演出をする。
// ページを読み込み直すとブラウザの制限で音が止まる（判の音も BGM も鳴らない）ので、その場で画面を切り替える
function returnToFiles(id,first){
  S.mode='files'; FS.level='list'; FS.act=0; FS.busy=false;
  const i=FILES.findIndex(f=>f.id===id);
  if(i>=0){FS.sel=i; if(first) FS.firstSolved=id;}
  $('#ending').classList.add('hidden'); $('#title').classList.add('hidden'); $('#files').classList.remove('hidden');
  $('#app').classList.add('menu'); $('#loc').textContent=L.caseFiles; $('#evcount').textContent='';
  renderFiles();
}
$('#fback').addEventListener('click',e=>{e.stopPropagation(); if(!FS.busy) showTitle();});

// 言語の切り替え（タイトル／FILE選択のあいだだけ出す。切り替えると読み込み直す）
$('#langBtn').textContent=L.langBtn; $('#langBtn').title=L.langBtnTitle;
$('#langBtn').addEventListener('click',e=>{e.stopPropagation(); if(FS.busy) return; setLang(LANG==='ja'?'en':'ja');});
