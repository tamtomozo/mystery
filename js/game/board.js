/* 捜査ボード（推理の検証） */
'use strict';

/* =========================================================
   捜査ボード（推理の検証）
   ========================================================= */
const B={hyp:null,claim:null,ev:null,pick:false,round:0,msg:'',act:null,ret:'explore',slam:null};   // slam：判を押す演出をする推理のID
function openBoard(pick,round){
  if(!['explore','interro'].includes(S.mode)) return;
  if(S.mode==='explore'&&pick) return;
  B.ret=S.mode; S.mode='board'; B.pick=!!pick; B.round=round||0;
  B.claim=null; B.ev=null; B.act=null;
  B.msg=pick?L.b.pickMsg(CASE.suspect):'';
  $('#bqname').textContent=CASE.suspect;
  const ul=unlockedHyps();
  if(!B.hyp||!S.hyps[B.hyp]) B.hyp=ul.length?ul[ul.length-1].id:null;
  if(!pick&&ul.length){const last=ul[ul.length-1]; if(hypStatus(last)==='open') B.hyp=last.id;}
  renderBoard(); $('#board').classList.remove('hidden'); AU.sfx('paper');
}
function hideBoard(){$('#board').classList.add('hidden')}
function closeBoard(cancel){
  hideBoard(); S.mode=B.ret||'explore'; AU.sfx('paper');
  for(const id of S.ev) S.seenEv.add(id);
  if(B.pick){ if(cancel){round(B.round); startDialog();} return; }
  saveGame();
  if(!checkPhase()) checkUnlock();
}

function renderBoard(){
  $('#btitle').textContent=B.pick?L.b.titlePick:L.b.title;
  $('#bquote').classList.toggle('hidden',!B.pick);
  if(B.pick) $('#bqtext').textContent=ROUNDS[B.round].stmt;
  $('#hypsec').classList.toggle('hidden',B.pick);
  $('#bbody').classList.toggle('single',B.pick);
  if(!B.pick){
    const ul=unlockedHyps();
    $('#htabs').innerHTML=ul.map(h=>`<button class="htab ${h.id===B.hyp?'sel':''} ${hypStatus(h)}" data-h="${h.id}">${L.b.tab(h.no)}</button>`).join('');
    if(!ul.length){
      $('#hview').innerHTML=`<p class="empty">${L.b.noHyp}</p>`;
    }else{
      const h=HYPS.find(x=>x.id===B.hyp), st=hypStatus(h), cs=S.hyps[h.id].claims;
      const slam=B.slam===h.id?' slam':''; B.slam=null;
      const left=h.claims.filter((c,i)=>!cs[i]).length;
      const guide= st==='refuted'?L.b.refuted:
                   st==='proven'?L.b.proven:
                   h.final?L.b.finalLeft(left):
                   L.b.howTo;
      $('#hview').innerHTML=
        `<div class="hcard">${st==='refuted'?`<div class="stamp${slam}">${L.b.stampNg}</div>`:st==='proven'?`<div class="stamp ok${slam}">${L.b.stampOk}</div>`:''}
          <div class="hno">${L.b.tab(h.no)}</div><h2>${h.title}</h2><p class="sum">${h.summary}</p>
          <button class="btn small" data-replay="${h.id}">${L.b.replay}</button></div>
         <p class="guide">${guide}</p>
         <ul class="claims">${h.claims.map((c,i)=>{const r=cs[i];
           return `<li class="claim ${r||''} ${B.claim===i?'sel':''}" data-c="${i}"><span class="mark">${r==='ok'?'✔':r==='ng'?'✖':L.b.unchecked}</span><div><div class="ct">${c.t}</div>${r?`<div class="why">${c.why}</div>`:''}</div></li>`;}).join('')}</ul>`;
      if(slam) slamStamp();
    }
  }
  $('#evnum').textContent=`${S.ev.length}/${EV_TOTAL}`;
  $('#evgrid').innerHTML=S.ev.length?S.ev.map(id=>`<button class="evc ${B.ev===id?'sel':''} ${S.seenEv.has(id)?'':'new'}" data-e="${id}"><span class="k">${EV[id].k}</span><span>${EV[id].name}</span></button>`).join(''):`<p class="empty">${L.b.noEv}</p>`;
  $('#evdetail').innerHTML=B.ev?`<b>${EV[B.ev].name}</b><br>${EV[B.ev].desc}`:`<span class="muted">${L.b.evHint}</span>`;
  let msg=B.msg;
  if(!msg&&!B.pick){
    if(B.claim!=null&&!B.ev) msg=`<span class="muted">${L.b.pickEv}</span>`;
    else if(B.ev&&B.claim==null&&B.hyp&&hypStatus(HYPS.find(x=>x.id===B.hyp))==='open') msg=`<span class="muted">${L.b.pickClaim}</span>`;
  }
  $('#bmsg').innerHTML=msg||'';
  let btn='';
  if(B.act) btn=`<button class="btn gold" data-act>${B.act.label}</button>`;
  else if(B.pick&&B.ev) btn=`<button class="btn gold" data-present>${L.b.present(EV[B.ev].name)}</button>`;
  else if(!B.pick&&B.claim!=null&&B.ev) btn=`<button class="btn gold" data-present>${L.b.think}</button>`;
  $('#bact').innerHTML=btn;
}
// 推理が確定／否定された瞬間：判が降ってきて、ぽん！と押される
// （css の .stamp.slam：0.25秒待って 0.55秒で押す。紙に当たるのは 60% の時点 ≒ 0.58秒。音と揺れをそこに合わせる）
function slamStamp(){
  const card=$('#hview .hcard'), body=$('#bbody');
  body.scrollTo({top:0,behavior:'smooth'});   // 推理のカードはボードの先頭にある（スマホの1列表示でも）
  body.classList.add('stamping');   // 大きく降ってくる判で、スクロールバーが出ないように
  setTimeout(()=>{AU.sfx('stamp'); card.classList.remove('thud'); void card.offsetWidth; card.classList.add('thud');},580);
  setTimeout(()=>body.classList.remove('stamping'),1300);
}
function doPresent(){
  const h=HYPS.find(x=>x.id===B.hyp), c=h.claims[B.claim], st=S.hyps[h.id];
  if(c.ev.includes(B.ev)){
    st.claims[B.claim]=c.truth?'ok':'ng';
    B.msg=c.truth?`<b class="okc">${L.b.ok}</b>　${c.why}`:`<b class="ngc">${L.b.ng}</b>　${c.why}`;
    B.claim=null; B.ev=null;
    const s=hypStatus(h);
    if(s==='refuted'||s==='proven') B.slam=h.id;
    AU.sfx(s==='proven'?'proven':c.truth?'support':'refute');
    saveGame();
    if(s==='refuted'){
      B.msg+=`<br>${L.b.hypRefuted(h.no,h.title)}`;
      if(phase()>S.phaseShown){
        B.msg+=`<br><span class="muted">${L.b.progressed}</span>`;
        B.act={label:L.b.backToScene,fn:()=>closeBoard()};
      }
    }else if(s==='proven'){
      B.msg+=`<br><b class="okc">${L.b.allProven}</b><br><span class="muted">${L.b.goTak}</span>`;
    }
  }else{
    const ng=L.b.miss;
    B.msg=`<span class="muted">${ng[(Math.random()*ng.length)|0]}</span>`;
    AU.sfx('wrong');
  }
  renderBoard();
}
$('#board').addEventListener('click',e=>{
  const t=e.target.closest('[data-h],[data-c],[data-e],[data-present],[data-act],[data-replay],#bclose');
  if(!t) return;
  if(t.id==='bclose'){closeBoard(true); return;}
  if(t.dataset.h||t.dataset.c!=null||t.dataset.e) AU.sfx('inspect');
  if(t.dataset.h){B.hyp=t.dataset.h; B.claim=null; B.msg=''; renderBoard(); return;}
  if(t.dataset.c!=null){
    const h=HYPS.find(x=>x.id===B.hyp), i=+t.dataset.c;
    if(hypStatus(h)!=='open'||S.hyps[h.id].claims[i]) return;
    B.claim=B.claim===i?null:i; B.msg=''; renderBoard(); return;
  }
  if(t.dataset.e){B.ev=t.dataset.e; S.seenEv.add(B.ev); if(!B.act||B.pick) B.msg=B.pick?B.msg:''; renderBoard(); return;}
  if(t.hasAttribute('data-present')){B.pick?onPick(B.ev):doPresent(); return;}
  if(t.hasAttribute('data-act')){const f=B.act.fn; B.act=null; f(); return;}
  if(t.dataset.replay){hideBoard(); S.mode='explore'; startScene(t.dataset.replay,false); return;}
});

