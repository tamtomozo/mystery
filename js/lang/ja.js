/* UIの文言：日本語（事件ごとの台詞は js/data/fileXX/ にある） */
'use strict';

const L={
  // index.html の固定の文言（日本語は index.html に直接書いてあるので、上書きしない）
  html:{}, htmlTitle:{},
  gameTitle:'隠された真実',
  locale:'ja-JP',
  langBtn:'English', langBtnTitle:'Switch to English',

  /* 人物名（エンジンが直接使うもの） */
  me:'あなた', tak:'滝沢', takRadio:'滝沢（無線）', okochi:'大河内',
  // NPC の表示名「森（鑑識）」から、セリフの話し手名「森」を取り出す
  speakerOf:name=>name.split('（')[0],

  /* マップ */
  interroRoom:'取調室',
  mapShort:name=>name.split(' ―')[0],
  sceneFallback:'現場',

  /* 会話・HUD */
  got:name=>`《物証》「${name}」を手に入れた。`,
  guideLabel:'操作ガイド',
  evCount:(n,t)=>`物証 ${n}/${t}`,

  /* 操作ガイド */
  g:(()=>{
    const MOVE=['移動','矢印キー / WASD　・　行き先をタップ'];
    const LOOK=['調べる・話す','Space / Enter　・　対象をタップ'];
    const NEXT=['会話を進める','Space / Enter　・　クリック'];
    const BOARD=['捜査ボード','B キー　・　画面右上のボタン'];
    const GLOW='光っている場所は、まだ調べていない手がかり。';
    return {
      basic:['現場を調べる',[MOVE,LOOK,NEXT],GLOW],
      all:['操作方法',[MOVE,LOOK,NEXT,BOARD,['推理の検証','捜査ボードで「主張」→「物証」を選んで「突き合わせる」']],GLOW],
      board:['推理を検証する ― 捜査ボード',[
        ['開く','B キー　・　画面右上の「捜査ボード」'],
        ['①','推理の「主張」をひとつ選ぶ'],
        ['②','物証を選ぶ'],
        ['③','「突き合わせる」で検証する'],
      ],'誤った主張には「矛盾する物証」、正しい主張には「裏付ける物証」。矛盾が見つかると、その推理は否定される。'],
      garden:['庭へ出る',[['書斎 → 庭','書斎のドアを調べる'],['庭 → 書斎','勝手口を調べる']]],
      hall:['廊下へ出る',[['展示室 → 廊下','展示室の出入口を調べる'],['廊下 → 展示室','展示室の入口を調べる'],['監視カメラの映像','警備室のモニターを調べる']]],
      roof:['屋上へ上がる',[['捜査一課 → 屋上','捜査一課の出入口を調べる'],['屋上 → 捜査一課','階段室の扉を調べる']]],
      alley:['表の路地へ出る',[['稽古場 → 路地','玄関を調べる'],['路地 → 稽古場','格子戸を調べる'],['裏口','稽古場の裏口 ⇔ 路地の細い道']]],
      final:['真相を確定する',[['最後の推理','すべての主張を、物証で「裏付け」る'],['確定すると','取調室へ向かえる']]],
      interro:['取調べ',[
        ['答える','「物証で答える」→ 物証を選ぶ → みせる'],
        ['聞き直す','「問いを聞き直す」で、問いをもう一度聞ける'],
        ['間違えたら','同じ問いに戻るだけ。何度でも答えられる'],
      ]],
    };
  })(),

  /* タイトル・FILE選択 */
  caseFiles:'事件ファイル',
  unknown:'？？？',
  fstatus:{locked:'準備中',progress:'捜査中',solved:'解決済',fresh:'未着手'},
  actContinue:'続きから', actRestart:'はじめから', actReplay:'もう一度 捜査する', actStart:'捜査をはじめる', actReview:'捜査ボードを見る',
  lockedTitle:'― 準備中 ―', lockedLead:'この事件ファイルは、まだ開くことができない。',
  solvedStamp:'解決', statusLabel:'状態：', lastSave:'前回の記録：',
  restartNote:'※「はじめから」を選ぶと、記録は上書きされます',
  saveEv:(n,t)=>`物証 ${n}/${t}`,
  hintList:'↑↓ 選ぶ ・ Space / Enter 決定 ・ Esc タイトルへ',
  hintAct:'←→ 選ぶ ・ Space / Enter 決定 ・ Esc もどる',
  files:{
    file01:{title:'密室の書斎',
      lead:'館の主人・黒崎宗一郎が、書斎で死んでいた。ドアは内側から施錠、窓も施錠済み、鍵は机の上。――これは事故か、それとも。'},
    file02:{title:'蒼の雫',
      lead:'開幕を翌朝に控えた白鷺美術館。目玉の宝石「蒼の雫」が、ガラスの偽物にすり替えられていた。――いつ、誰が。'},
    file03:{title:'最後のひと匙',
      lead:'県警本部・捜査一課の冷蔵庫から、大河内警部のプリンが消えた。1日20個限定、朝7時から並んで買ったものだという。――これは、事件だ。'},
    file04:{title:'消印のない手紙',
      lead:'書道教室「墨香会」の主宰・桐生寿峰のもとに、消印のない脅迫状が三通届いた。たどたどしい字と、ある弟子にそっくりな字。――書いたのは、誰の手か。'},
    file05:{title:'七つ目の不思議',
      lead:'閉校を一週間後に控えた月影台小学校。この二週間、夜ごとに七不思議が“本当に”起きている。そして今朝、二十五年前に埋めたタイムカプセルが消えていた。――七つ目は、誰も知らない。'},
  },

  /* 滝沢のヒント（common.js） */
  takFinal:no=>`推理${no}の主張を、すべて物証で裏付けろ。捜査ボード［B］だ。`,
  askInterro:'取調室へ向かいますか？', goInterro:'取調室へ', stayScene:'まだ現場を見る',
  takOpen:(no,title)=>`推理${no}「${title}」か……。`,
  takReady:'物証はそろってる。捜査ボード［B］で、主張と突き合わせてみろ。',
  takBroken:no=>`推理${no}は崩れた。だが、まだ次の筋が見えない。`,

  /* 推理シーン */
  cctvName:'映像', sceneName:'推理',
  addedToBoard:(no,title)=>`捜査ボードに 推理${no}「${title}」を追加`,
  firstHyp:[
    '……今のが、ここまでの物証から組み立てた「推理」だ。',
    '推理の主張を、一つずつ物証で確かめろ。矛盾が見つかれば、その推理は崩れる。',
    '崩れた推理に新しい物証が加われば、推理は真実に近づいていく。',
  ],
  sceneHeader:(no,title)=>`推理${no}  ${title}　― 再現 ―`,
  click:'カチッ',

  /* 進行 */
  nudge:'新たな物証がそろった。捜査ボード［B］で、今の推理を検証しよう',
  hypBand:{title:'推理がうかびあがる',sub:'―― 物証が、ひとつの筋につながった'},
  newSpots:'新たな調査ポイントが現れた',

  /* 捜査ボード */
  b:{
    pickMsg:suspect=>`${suspect}の問いに答える物証を選び、みせよう。`,
    backToScene:'▶ 現場に戻る',
    titlePick:'物証をみせる', title:'捜査ボード',
    titleReview:(no,t)=>`捜査ボード ― ${no}「${t}」`,
    reviewNote:when=>`${when} に解決したときの捜査ボード。`,
    reviewNoteAll:'解決したときの記録がないため、すべての推理と物証を表示している。',
    tab:no=>`推理${no}`,
    noHyp:'まだ推理はない。<br>現場で物証を集めれば、何が起きたのか「推理」が見えてくる。',
    refuted:'この推理は否定された。',
    proven:'すべての主張が物証で裏付けられた。',
    finalLeft:left=>`すべての主張を、物証で裏付けよう（残り ${left}）。`,
    howTo:'主張をひとつ選び、物証と「突き合わせる」。<br>誤った主張には「矛盾する物証」を、正しい主張には「裏付ける物証」を。',
    stampNg:'否定', stampOk:'確定', unchecked:'？',
    replay:'▶ シーンを再生',
    noEv:'まだ物証はない。',
    evHint:'物証をタップすると詳細が表示される。',
    pickEv:'突き合わせる物証を選んでください。',
    pickClaim:'主張を選ぶと、この物証と突き合わせられる。',
    present:name=>`「${name}」をみせる`,
    think:'突き合わせる',
    ok:'✔ 裏付け', ng:'✖ 矛盾！',
    hypRefuted:(no,title)=>`推理${no}「${title}」は否定された。`,
    progressed:'捜査が進展した。現場に、新たに調べられる場所が現れる。',
    allProven:'すべての主張が裏付けられた。――これが真相だ。',
    goTak:'滝沢に報告すれば、取調室へ向かえる。',
    miss:['……この物証では、主張を崩すことも、裏付けることもできない。','関係がなさそうだ。別の物証を考えよう。','うまく結びつかない。主張をよく読み直そう。'],
  },

  /* 取調べ・エンディング */
  interroQ:(i,n)=>`取調室 ― 問い ${i}/${n}`,
  answerWithEv:'物証で答える', reAsk:'問いを聞き直す',
  presented:name=>`《${name}》をみせた。`,
  whisper:'（小声で）……問いに、まっすぐ答えられる物証を選べ。',
  truthBand:{title:'真実があきらかになった',sub:'―― すべての問いに、物証が答えた'},
  solvedHead:(no,title)=>`${no} ${title} ― 解決`,
  record:'捜査記録',
  collected:(n,t)=>`集めた物証：${n} / ${t}`,
  endNext:'クリック / Space で次へ ▼',
  resumeInterro:'―― 取調べを再開する。',
  resumed:'前回の続きから再開します',
  proNext:'クリック / Space で 捜査をはじめる ▼',

  /* 背景に描く看板 */
  sign:{security:'警備室',curator:'学芸員室',staffExit:'通用口',gallery:'展示室',lobby:'← ロビー',
        kitchen:'給湯室',exit:'出入口',stairs:'階段室',
        shihan:'師範室',genkan:'玄関',backdoor:'裏口',bokko:'墨香会',fudosan:'黒田不動産',juku:'学習塾',
        school:'月影台小学校',shoko:'昇降口',yomuin:'用務員室',shokuin:'職員室',kocho:'校長室',ongaku:'音楽室',
        hoso:'放送室',rika:'理科室',class6:'6年1組',staffDoor:'職員玄関',stairs2:'西階段'},
};
