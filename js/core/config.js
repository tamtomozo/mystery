/* 定数・キャンバス・共通ヘルパー */
'use strict';

const TS=32, W=20, H=15, SC=2, PW=W*TS, PH=H*TS;
const $=s=>document.querySelector(s);
const cv=$('#cv'), ctx=cv.getContext('2d');
cv.width=PW*SC; cv.height=PH*SC;
const ME=L.me;

// index.html の固定の文言を、選んだ言語に差し替える（data-l は中身、data-lt は title 属性）
document.title=L.gameTitle;
document.querySelectorAll('[data-l]').forEach(el=>{const v=L.html[el.dataset.l]; if(v!=null) el.textContent=v;});
document.querySelectorAll('[data-lt]').forEach(el=>{const v=L.htmlTitle[el.dataset.lt]; if(v!=null) el.title=v;});

if(!CanvasRenderingContext2D.prototype.roundRect){
  CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h){this.rect(x,y,w,h);};
}

