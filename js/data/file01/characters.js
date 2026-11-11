/* データ：FILE.01 の現場の人物（NPC） */
'use strict';

/* ---------- NPC（現場の捜査官たち） ---------- */
defCase('file01',{NPCS:{
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
}});
