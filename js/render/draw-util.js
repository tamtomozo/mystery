/* 描画ユーティリティ */
'use strict';

/* =========================================================
   描画ユーティリティ
   ========================================================= */
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646}}
function R(g,c,x,y,w,h){g.fillStyle=c;g.fillRect(x,y,w,h)}
function C(g,c,x,y,r){g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill()}
function E(g,c,x,y,rx,ry,rot=0){g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,rot,0,Math.PI*2);g.fill()}
function RR(g,c,x,y,w,h,r){g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()}
function shade(hex,a=-30){
  if(hex[0]!=='#') return hex;
  const n=parseInt(hex.slice(1),16), cl=v=>Math.max(0,Math.min(255,v));
  return `rgb(${cl((n>>16)+a)},${cl((n>>8&255)+a)},${cl((n&255)+a)})`;
}
function vignette(g,a,r0=180,r1=430){
  const gr=g.createRadialGradient(PW/2,PH/2,r0,PW/2,PH/2,r1);
  gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,`rgba(0,0,0,${a})`);
  g.fillStyle=gr; g.fillRect(0,0,PW,PH);
}
function glow(g,x,y,r,col){
  const gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,col); gr.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=gr; g.fillRect(x-r,y-r,r*2,r*2);
}

