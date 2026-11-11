/* 取調室〜自白〜エンディング */
'use strict';

/* =========================================================
   取調室
   ========================================================= */

let shakeT=0;
function goInterro(){
  fade(()=>{
    setMap('interro',10,9,'up'); S.mode='interro';
    $('#loc').textContent='取調室'; $('#boardBtn').classList.add('hidden');
    band('event',{title:'翌日',sub:'県警本部 ・ 取調室',auto:2400});
    say('大河内','捜査一課の大河内だ。柏木圭介さん、黒崎宗一郎さんが亡くなった夜のことを聞かせてもらう。');
    say('柏木','…………。');
    say('柏木','……私からお話しすることは、ありません。');
    say('柏木','あなた方が、私が何をしたとお考えなのか。……それを、示していただけますか。');
    say('大河内','（小声で）嘘はつかん男だ。だが、自分からは何も語らない。');
    say('大河内','（小声で）こいつの問いに、物証で一つずつ答えていけ。事実を積み上げるんだ。');
    guideInterro();
    run(()=>round(0));
    startDialog();
  });
}
function round(i){
  S.round=i; saveGame();
  $('#loc').textContent=`取調室 ― 問い ${i+1}/${ROUNDS.length}`;
  ask('柏木',ROUNDS[i].stmt,[
    {label:'物証で答える',fn:()=>{S.mode='interro'; openBoard(true,i); return 'hold';}},
    {label:'問いを聞き直す',fn:()=>round(i)},
  ]);
}
function onPick(id){
  const i=B.round, R=ROUNDS[i];
  hideBoard(); S.mode='interro';
  sys(`《${EV[id].name}》をみせた。`);
  if(R.ans.includes(id)){
    AU.sfx('present');
    run(()=>{shakeT=0.6;});
    R.win.forEach(([n,t])=>say(n,t));
    if(i+1<ROUNDS.length) run(()=>round(i+1));
    else run(()=>confession());
  }else{
    const ng=[['柏木','……それは、私の問いへの答えになっていません。'],['柏木','……それで、何が示せるんです？'],['柏木','……その物証と、私の問いと。どう結びつくんです？']];
    const l=ng[(Math.random()*ng.length)|0]; say(l[0],l[1]); AU.sfx('wrong');
    say('大河内','（小声で）……問いに、まっすぐ答えられる物証を選べ。');
    run(()=>round(i));
  }
  startDialog();
}
function confession(){
  $('#loc').textContent='取調室';
  S.flags.confess=true; clearSave();
  say('柏木','…………。');
  say('柏木','……母が、病気なんです。治療費が、どうしても足りなかった。');
  say('柏木','少しずつ、会社の金を……。昨夜、旦那様に帳簿を突きつけられて――もう終わりだと思った。');
  say('柏木','気づいたら、像を振り下ろしていました。窓の細工は……推理小説の真似事です。');
  say('大河内','……柏木さん。その帳簿の最後のページに、封筒が挟まっていた。宛名は、あんただ。');
  sys('―― 大河内警部が、封を切る。');
  say('','柏木君へ。','letter');
  say('','君が会社の金に手をつけていることには、気づいていた。理由も調べた。お母上の病のことも。','letter');
  say('','金は返さなくていい。治療費は、私が出そう。','letter');
  say('','明日、帳簿のことをきちんと話したい。叱るためではない。君を失いたくないからだ。――黒崎','letter');
  say('柏木','………………あ……');
  say('柏木','旦那様は……私を……');
  sys('柏木は机に突っ伏し、声を上げて泣いた。');
  band('event',{title:'真実があきらかになった',sub:'―― すべての問いに、物証が答えた',auto:3000});
  run(()=>showEnding());
}
function showEnding(){
  S.mode='end'; hideDlg();
  const e=$('#ending');
  e.innerHTML=`<div class="einner">
    <h2>FILE.01 密室の書斎 ― 解決</h2>
    <h3>真相</h3>
    秘書・柏木圭介は、会社の金の横領を主人に問いただされ、衝動的にブロンズ像で殴打した。<br>
    窓から庭へ出て、輪のついた釣り糸でクレセント錠を掛け、密室を作り上げた。<br>
    雨上がりの庭に足跡を残し、勝手口から自室へ戻った。
    <h3>隠された真実</h3>
    昨夜、主人が柏木を呼んだのは、罰するためではなかった。<br>
    封の切られることのなかった一通の手紙――それが、密室に隠されたもう一つの真実だった。
    <h3>捜査記録</h3>
    集めた物証：${S.ev.length} / ${EV_TOTAL}
    <div class="enext">クリック / Space で次へ ▼</div>
  </div>`;
  e.classList.remove('hidden');
  endAt=performance.now();
}
// エンディング画面から先へ進む（タイトルへ戻る）
// 表示直後の操作（帯を閉じたクリックなど）で飛ばさないよう、少し待つ
let endAt=0;
function endingNext(){
  if(S.mode!=='end'||performance.now()-endAt<800) return;
  location.reload();
}
$('#ending').addEventListener('click',endingNext);

