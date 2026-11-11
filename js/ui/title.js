/* タイトル画面と FILE選択画面 */
'use strict';

/* =========================================================
   タイトル → FILE選択 → 「続きから／はじめから」
   FILE選択は2段：list（ファイルを選ぶ）→ act（続きから／はじめからを選ぶ）
   ========================================================= */
const FS={sel:0,level:'list',act:0,busy:false};

function showTitle(){
  S.mode='title';
  $('#files').classList.add('hidden'); $('#title').classList.remove('hidden');
  $('#loc').textContent='隠された真実';
}
function openFiles(){
  if(S.mode!=='title') return;
  AU.init(); AU.sfx('select');
  S.mode='files'; FS.level='list'; FS.act=0;
  $('#title').classList.add('hidden'); $('#files').classList.remove('hidden');
  $('#loc').textContent='事件ファイル';
  renderFiles();
}

const FSTATUS={locked:'準備中',progress:'捜査中',solved:'解決済',fresh:'未着手'};
function fileStatus(f){
  if(!f.ready) return 'locked';
  if(f.save&&f.save()) return 'progress';
  if(isCleared(f.id)) return 'solved';
  return 'fresh';
}
function fileActs(f){
  if(!f.ready) return [];
  const d=f.save&&f.save(), a=[];
  if(d) a.push({label:'続きから',fn:()=>f.resume(d)});
  a.push({label:d?'はじめから':isCleared(f.id)?'もう一度 捜査する':'捜査をはじめる',fn:f.start});
  return a;
}
function saveSummary(f,d){
  const when=new Date(d.time).toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
  const where=d.map==='interro'?'取調室':MAPDEF[d.map]?MAPDEF[d.map].name.split(' ―')[0]:'現場';
  return `${when}　${where}　物証 ${(d.ev||[]).length}/${evTotalOf(f.id)}`;
}

function renderFiles(){
  const list=$('#flist'); list.innerHTML='';
  FILES.forEach((f,i)=>{
    const st=fileStatus(f), b=document.createElement('button');
    b.className=`fcard ${st}`+(i===FS.sel?' sel':'')+(i===FS.sel&&FS.level==='list'?' cur':'');
    b.innerHTML=`<span class="no">${f.no}</span><span class="tt">${f.ready?f.title:'？？？'}</span><span class="badge">${FSTATUS[st]}</span>`;
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
    el.innerHTML=`<div class="fd-no">${f.no}</div><h2>― 準備中 ―</h2>
      <p class="fd-lead">この事件ファイルは、まだ開くことができない。</p>`;
  }else{
    const d=f.save&&f.save();
    const slam=FS.justSolved===f.id; FS.justSolved=null;
    el.innerHTML=`${isCleared(f.id)?`<div class="fstamp${slam?' slam':''}">解決</div>`:''}
      <div class="fd-no">${f.no}</div><h2>${f.title}</h2>
      <p class="fd-lead">${f.lead}</p>
      <div class="fd-stat">状態：<b>${FSTATUS[st]}</b></div>
      ${d?`<div class="fd-save">前回の記録：${saveSummary(f,d)}</div>`:''}
      <div class="fd-acts"></div>
      ${d?'<div class="fd-note">※「はじめから」を選ぶと、記録は上書きされます</div>':''}`;
    fileActs(f).forEach((a,i)=>{
      const b=document.createElement('button');
      b.className='btn gold'+(FS.level==='act'&&i===FS.act?' cur':'');
      b.textContent=a.label;
      b.onclick=e=>{e.stopPropagation(); startFile(a);};
      el.querySelector('.fd-acts').appendChild(b);
    });
  }
  $('#files .fhint').textContent=FS.level==='list'
    ?'↑↓ 選ぶ ・ Space / Enter 決定 ・ Esc タイトルへ'
    :'←→ 選ぶ ・ Space / Enter 決定 ・ Esc もどる';
}

function startFile(a){
  if(FS.busy) return; FS.busy=true;
  AU.init();
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
(function fromEnding(){
  const m=/^#solved=(\w+)$/.exec(location.hash); if(!m) return;
  try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}
  const i=FILES.findIndex(f=>f.id===m[1]);
  if(i>=0){FS.sel=i; FS.justSolved=m[1];}
  openFiles();
})();
$('#fback').addEventListener('click',e=>{e.stopPropagation(); if(!FS.busy) showTitle();});
