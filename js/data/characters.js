/* データ：登場人物（見た目・NPC・滝沢のヒント会話） */
'use strict';

/* ---------- 登場人物の見た目 ---------- */
const LOOK={
  player:  {coat:'#2b3a58',coat2:'#22304a',hair:'#18161a'},
  takizawa:{coat:'#776247',coat2:'#5f4e38',hat:'#3a3026'},
  mori:    {coat:'#3f6385',coat2:'#335270',cap:'#25384c'},
  noguchi: {coat:'#1f2c4a',coat2:'#18233c',cap:'#152038',badge:true},
  kashiwagi:{coat:'#55585f',coat2:'#46494f',hair:'#2a2420',tie:'#7a2a2a'},
  okochi:  {coat:'#3b3b3e',coat2:'#2f2f32',hair:'#8a8a8a',tie:'#2a3a5a'},
};

/* ---------- NPC（現場の捜査官たち） ---------- */
const NPCS={
  takizawa:{map:'study',x:8,y:2,dir:'right',name:'滝沢',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},
  mori:{map:'garden',x:7,y:6,dir:'down',name:'森（鑑識）',look:LOOK.mori,alert:()=>findable('rain'),talk(){
    if(!avail('rain')){
      say('森','鑑識の森です。いま、地面の足跡を確認してるところです。');
      say('森','昨夜の天気？ 気象台に問い合わせ中なんで、分かったらお知らせしますね。');
    }else if(!has('rain')){
      say('森','鑑識の森です。いやあ、庭は足跡が残ってて助かりますよ。');
      say('森','昨夜の雨は、22時ちょうどに止んでます。それより前の足跡は、全部流されちゃってるはずです。');
      say('森','つまり今残ってる足跡は、22時以降についたものってことですね。');
      give('rain');
    }else if(has('thread')&&!has('scratch')){
      say('森','釣り糸ですか？ 先端の輪……何かに引っかけるための細工かもしれませんね。');
      say('森','書斎の窓の鍵、もう一度見てみたらどうです？');
    }else if(!has('button')||!has('thread')){
      say('森','窓の下の植え込み、まだちゃんと見てないんですよ。お願いできます？');
    }else{
      say('森','足跡は26cmの革靴。くっきり残ってますよ。雨上がりさまさまです。');
    }
  }},
  noguchi:{map:'garden',x:10,y:13,dir:'up',name:'野口（巡査）',look:LOOK.noguchi,alert:()=>findable('gate'),talk(){
    if(!avail('gate')){
      say('野口','巡査の野口です！ 正門の警備をしております。');
      say('野口','防犯カメラの映像は、ただいま確認中であります！');
    }else if(!has('gate')){
      say('野口','巡査の野口です！ 正門の警備をしております。');
      say('野口','正門は一晩中施錠されていました。防犯カメラも確認しましたが、出入りした人物は映っていません！');
      say('野口','昨夜この館にいたのは、ご主人と、住み込みの秘書の柏木さんだけです。');
      give('gate');
    }else say('野口','門に異常はありません！ 誰も通しておりません！');
  }},
};

/* =========================================================
   滝沢（先輩刑事）のヒント
   ========================================================= */
function talkTakizawa(){
  const ul=unlockedHyps(), n=ul.length, cur=ul[n-1];
  if(n===0){
    const miss=['key','window','body'].filter(id=>!has(id));
    say('滝沢','まずは密室の基本だ。鍵、窓、それから遺体の状況。');
    if(miss.length) say('滝沢',EVHINT[miss[0]]);
    return;
  }
  const st=hypStatus(cur);
  if(cur.final){
    if(st==='proven'){
      say('滝沢','……よくやった。これで柏木を呼べる。');
      ask('','取調室へ向かいますか？',[{label:'取調室へ',fn:()=>goInterro()},{label:'まだ現場を見る',fn:()=>{}}]);
    }else say('滝沢',`仮定${cur.no}の主張を、すべて物証で裏付けろ。捜査ボード［B］だ。`);
    return;
  }
  if(st==='open'){
    say('滝沢',`仮定${cur.no}「${cur.title}」か……。`);
    say('滝沢',cur.hint);
    const falses=cur.claims.filter(c=>!c.truth);
    if(!falses.some(c=>c.ev.some(has))) say('滝沢',EVHINT[falses[0].ev[0]]);
    else say('滝沢','物証はそろってる。捜査ボード［B］で、主張と照らし合わせてかんがえてみろ。');
    return;
  }
  const next=HYPS[n], miss=next.requires.filter(id=>!has(id));
  say('滝沢',`仮定${cur.no}は崩れた。だが、まだ次の筋が見えない。`);
  if(miss.length) say('滝沢',EVHINT[miss[0]]);
}

