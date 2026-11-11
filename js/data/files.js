/* データ：事件ファイル（FILE選択画面に並ぶ事件） */
'use strict';

/* =========================================================
   事件ファイル
   ready:false のファイルは「準備中」として鍵がかかった状態で並ぶ。
   新しい事件を追加したら、js/data/fileXX/ にデータを置き（defCase で登録）、
   ここで caseFile(...) を並べる（ready:true と save / start / resume が付く）。
     save   … 途中の記録を返す（なければ null）
     start  … はじめから
     resume … 続きから（save の記録を受け取る）
   ========================================================= */
const caseFile=(id,no,title,lead)=>({id,no,title,lead,ready:true,
  save:()=>readSave(id), start:()=>newGame(id), resume:d=>continueGame(id,d)});
const FILES=[
  caseFile('file01','FILE.01','密室の書斎',
    '館の主人・黒崎宗一郎が、書斎で死んでいた。ドアは内側から施錠、窓も施錠済み、鍵は机の上。――これは事故か、それとも。'),
  caseFile('file02','FILE.02','蒼の雫',
    '開幕を翌朝に控えた白鷺美術館。目玉の宝石「蒼の雫」が、ガラスの偽物にすり替えられていた。――いつ、誰が。'),
  caseFile('file03','FILE.03','最後のひと匙',
    '県警本部・捜査一課の冷蔵庫から、大河内警部のプリンが消えた。1日20個限定、朝7時から並んで買ったものだという。――これは、事件だ。'),
  {id:'file04',no:'FILE.04',title:'？？？',ready:false},
  {id:'file05',no:'FILE.05',title:'？？？',ready:false},
  {id:'file06',no:'FILE.06',title:'？？？',ready:false},
];
