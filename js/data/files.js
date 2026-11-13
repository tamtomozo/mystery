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
// 題名と導入文は、言語ごとの L.files にある
const caseFile=(id,no)=>({id,no,title:L.files[id].title,lead:L.files[id].lead,ready:true,
  save:()=>readSave(id), start:()=>newGame(id), resume:d=>continueGame(id,d)});
const FILES=[
  caseFile('file01','FILE.01'),
  caseFile('file02','FILE.02'),
  caseFile('file03','FILE.03'),
  caseFile('file04','FILE.04'),
  caseFile('file05','FILE.05'),
  caseFile('file06','FILE.06'),
  caseFile('file07','FILE.07'),
  caseFile('file08','FILE.08'),
  caseFile('file09','FILE.09'),
];
