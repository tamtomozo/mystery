/* 捜査ボード（仮定の検証） */
'use strict';

/* =========================================================
   捜査ボード（仮定の検証）
   ========================================================= */
const B={hyp:null,claim:null,ev:null,pick:false,round:0,msg:'',act:null,ret:'explore'};
function openBoard(pick,round){
  if(!['explore','interro'].includes(S.mode)) return;
  if(S.mode==='explore'&&pick) return;
  B.ret=S.mode; S.mode='board'; B.pick=!!pick; B.round=round||0;
  B.claim=null; B.ev=null; B.act=null;
  B.msg=pick?`${CASE.suspect}の問いに答える物証を選び、みせよう。`:'';
  $('#bqname').textContent=CASE.suspect;
  const ul=unlockedHyps();
  if(!B.hyp||!S.hyps[B.hyp]) B.hyp=ul.length?ul[ul.length-1].id:null;
  if(!pick&&ul.length){const last=ul[ul.length-1]; if(hypStatus(last)==='open') B.hyp=last.id;}
  const fin=HYPS.find(h=>h.final);
  if(!pick&&hypStatus(fin)==='proven') B.act={label:'▶ 取調室へ向かう',fn:()=>{hideBoard(); S.mode='explore'; goInterro();}};
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
  $('#btitle').textContent=B.pick?'物証をみせる':'捜査ボード';
  $('#bquote').classList.toggle('hidden',!B.pick);
  if(B.pick) $('#bqtext').textContent=ROUNDS[B.round].stmt;
  $('#hypsec').classList.toggle('hidden',B.pick);
  $('#bbody').classList.toggle('single',B.pick);
  if(!B.pick){
    const ul=unlockedHyps();
    $('#htabs').innerHTML=ul.map(h=>`<button class="htab ${h.id===B.hyp?'sel':''} ${hypStatus(h)}" data-h="${h.id}">仮定${h.no}</button>`).join('');
    if(!ul.length){
      $('#hview').innerHTML='<p class="empty">まだ仮定はない。<br>現場で物証を集めれば、何が起きたのか「仮定」が見えてくる。</p>';
    }else{
      const h=HYPS.find(x=>x.id===B.hyp), st=hypStatus(h), cs=S.hyps[h.id].claims;
      const left=h.claims.filter((c,i)=>!cs[i]).length;
      const guide= st==='refuted'?'この仮定は否定された。':
                   st==='proven'?'すべての主張が物証で裏付けられた。':
                   h.final?`すべての主張を、物証で裏付けよう（残り ${left}）。`:
                   '主張をひとつ選び、物証と照らし合わせて「かんがえる」。<br>誤った主張には「矛盾する物証」を、正しい主張には「裏付ける物証」を。';
      $('#hview').innerHTML=
        `<div class="hcard">${st==='refuted'?'<div class="stamp">否定</div>':st==='proven'?'<div class="stamp ok">確定</div>':''}
          <div class="hno">仮定${h.no}</div><h2>${h.title}</h2><p class="sum">${h.summary}</p>
          <button class="btn small" data-replay="${h.id}">▶ シーンを再生</button></div>
         <p class="guide">${guide}</p>
         <ul class="claims">${h.claims.map((c,i)=>{const r=cs[i];
           return `<li class="claim ${r||''} ${B.claim===i?'sel':''}" data-c="${i}"><span class="mark">${r==='ok'?'✔':r==='ng'?'✖':'？'}</span><div><div class="ct">${c.t}</div>${r?`<div class="why">${c.why}</div>`:''}</div></li>`;}).join('')}</ul>`;
    }
  }
  $('#evnum').textContent=`${S.ev.length}/${EV_TOTAL}`;
  $('#evgrid').innerHTML=S.ev.length?S.ev.map(id=>`<button class="evc ${B.ev===id?'sel':''} ${S.seenEv.has(id)?'':'new'}" data-e="${id}"><span class="k">${EV[id].k}</span><span>${EV[id].name}</span></button>`).join(''):'<p class="empty">まだ物証はない。</p>';
  $('#evdetail').innerHTML=B.ev?`<b>${EV[B.ev].name}</b><br>${EV[B.ev].desc}`:'<span class="muted">物証をタップすると詳細が表示される。</span>';
  let msg=B.msg;
  if(!msg&&!B.pick){
    if(B.claim!=null&&!B.ev) msg='<span class="muted">照らし合わせる物証を選んでください。</span>';
    else if(B.ev&&B.claim==null&&B.hyp&&hypStatus(HYPS.find(x=>x.id===B.hyp))==='open') msg='<span class="muted">主張を選ぶと、この物証と照らし合わせてかんがえられる。</span>';
  }
  $('#bmsg').innerHTML=msg||'';
  let btn='';
  if(B.act) btn=`<button class="btn gold" data-act>${B.act.label}</button>`;
  else if(B.pick&&B.ev) btn=`<button class="btn gold" data-present>「${EV[B.ev].name}」をみせる</button>`;
  else if(!B.pick&&B.claim!=null&&B.ev) btn=`<button class="btn gold" data-present>かんがえる</button>`;
  $('#bact').innerHTML=btn;
}
function doPresent(){
  const h=HYPS.find(x=>x.id===B.hyp), c=h.claims[B.claim], st=S.hyps[h.id];
  if(c.ev.includes(B.ev)){
    st.claims[B.claim]=c.truth?'ok':'ng';
    B.msg=c.truth?`<b class="okc">✔ 裏付け</b>　${c.why}`:`<b class="ngc">✖ 矛盾！</b>　${c.why}`;
    B.claim=null; B.ev=null;
    const s=hypStatus(h);
    AU.sfx(s==='proven'?'proven':c.truth?'support':'refute');
    saveGame();
    if(s==='refuted'){
      B.msg+=`<br>仮定${h.no}「${h.title}」は否定された。`;
      if(phase()>S.phaseShown){
        B.msg+='<br><span class="muted">捜査が進展した。現場に、新たに調べられる場所が現れる。</span>';
        B.act={label:'▶ 現場に戻る',fn:()=>closeBoard()};
      }
    }else if(s==='proven'){
      B.msg+='<br><b class="okc">すべての主張が裏付けられた。――これが真相だ。</b>';
      B.act={label:'▶ 取調室へ向かう',fn:()=>{hideBoard(); S.mode='explore'; goInterro();}};
    }
  }else{
    const ng=['……この物証では、主張を崩すことも、裏付けることもできない。','関係がなさそうだ。別の物証を考えよう。','うまく結びつかない。主張をよく読み直そう。'];
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

