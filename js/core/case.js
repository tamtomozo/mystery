/* 事件ファイルごとのデータの登録と切り替え */
'use strict';

/* =========================================================
   事件（FILE）ごとのデータは js/data/fileXX/ に分けて置き、
   defCase('fileXX',{...}) で登録する（複数のファイルから少しずつ足してよい）。
   useCase(id) を呼ぶと、その事件のデータが下のグローバル変数に入り、
   ゲーム本体（会話・ボード・取調べ・シーン）はそれを使って動く。

   事件データに用意するもの
     EV / EV_PHASE / PHASE_MSG / EVHINT … 物証・捜査段階・滝沢のヒント
     HYPS / SCENES                       … 推理とその再現シーン
     NPCS / HS                           … 現場の人物・調べられる場所（HS はマップIDごと）
     ROUNDS / INTERRO_ACTORS             … 取調べの問いと配置
     saveKey  … セーブの保存先
     start    … はじめの位置 [map,x,y,dir]（続きからで位置が壊れていたときもここへ）
     prologue … （任意）はじめから捜査するとき、intro の前に見せるプロローグ（js/ui/prologue.js）
     intro()  … 捜査開始のセリフ
     hint0 / provenLine / finalIntro     … 滝沢のセリフ（最初・真相確定・最後の推理）
     phaseGuide{段階:fn}                 … 捜査段階が進んだときに出す操作ガイド
     suspect / interroBand / interroIntro() / interroNg[] … 取調べ
     confession() / ending()             … 自白とエンディング
   ========================================================= */
const CASES={};
function defCase(id,o){CASES[id]=Object.assign(CASES[id]||{id},o);}

let CASE=null, EV={}, EV_TOTAL=0, EV_PHASE={}, PHASE_MSG={}, EVHINT={}, HYPS=[], SCENES={},
    NPCS={}, HS={}, ROUNDS=[], INTERRO_ACTORS=[];
function useCase(id){
  CASE=CASES[id];
  ({EV,EV_PHASE,PHASE_MSG,EVHINT,HYPS,SCENES,NPCS,HS,ROUNDS,INTERRO_ACTORS}=CASE);
  EV_TOTAL=Object.keys(EV).length;
}
const evTotalOf=id=>Object.keys(CASES[id].EV).length;
