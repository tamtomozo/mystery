/* 定数・キャンバス・共通ヘルパー */
'use strict';

const TS=32, W=20, H=15, SC=2, PW=W*TS, PH=H*TS;
const $=s=>document.querySelector(s);
const cv=$('#cv'), ctx=cv.getContext('2d');
cv.width=PW*SC; cv.height=PH*SC;
const ME='あなた';

if(!CanvasRenderingContext2D.prototype.roundRect){
  CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h){this.rect(x,y,w,h);};
}

