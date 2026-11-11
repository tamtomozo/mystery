/* トースト・物証カウント・フェード */
'use strict';

let toastT=0;
function toast(msg,ms=2600){
  const t=$('#toast'); t.textContent=msg; t.classList.add('on');
  clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),ms);
}
function addEv(id){
  if(has(id)) return; S.ev.push(id); updateHud(); AU.sfx('evidence');
}
function updateHud(){$('#evcount').textContent=L.evCount(S.ev.length,EV_TOTAL)}
function fade(cb){
  const f=$('#fade'); f.classList.add('on'); AU.sfx('whoosh');
  setTimeout(()=>{cb(); setTimeout(()=>f.classList.remove('on'),60);},420);
}

