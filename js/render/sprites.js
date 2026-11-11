/* 人物・ラベル・きらめきの描画 */
'use strict';

/* ---------- 人物（見下ろし） ---------- */
function drawPerson(g,x,y,o,t){
  g.save(); g.translate(x,y);
  const sh=!!o.shadow;
  if(o.fallen){E(g,sh?'rgba(0,0,0,.25)':'rgba(0,0,0,.3)',0,3,18,9); g.rotate(Math.PI/2);}
  else E(g,'rgba(0,0,0,.35)',0,9,12,5);
  if(o.walking) g.translate(0,-Math.abs(Math.sin(t*12))*1.6);
  const coat=sh?'#07070b':o.coat, coat2=sh?'#0e0e14':(o.coat2||shade(o.coat)),
        skin=sh?'#121218':(o.skin||'#e3bb96'), hair=sh?'#07070b':(o.hair||'#222');
  if(sh){g.shadowColor='rgba(190,50,35,.75)'; g.shadowBlur=12; g.globalAlpha=.92;}
  C(g,coat2,-11,2,4); C(g,coat2,11,2,4);
  RR(g,coat,-11,-5,22,15,7);
  if(o.tie&&!sh){R(g,'#eee',-3,-5,6,4); R(g,o.tie,-1,-3,2,7);}
  const dir=o.fallen?'down':(o.dir||'down'), [dx,dy]=DIRV[dir];
  const hx=dx*1.8, hy=-7+dy*1.2;
  C(g,skin,hx,hy,7);
  if(o.hat&&!sh){C(g,o.hat,hx,hy,10.5); C(g,shade(o.hat,-18),hx,hy,6.5); g.strokeStyle='#1d1610'; g.lineWidth=1.2; g.beginPath(); g.arc(hx,hy,6.8,0,Math.PI*2); g.stroke();}
  else if(o.cap&&!sh){
    g.fillStyle=o.cap; g.beginPath(); const a=Math.atan2(dy,dx); g.arc(hx,hy,7.4,a+Math.PI*.3,a+Math.PI*1.7); g.closePath(); g.fill();
    E(g,shade(o.cap,-22),hx+dx*5.5,hy+dy*5.5,dx?2.6:6,dy?2.6:6);
    if(o.badge) C(g,'#d6b061',hx-dx*2,hy-dy*2,1.6);
  }else{
    g.fillStyle=hair; g.beginPath();
    if(dir==='up') g.arc(hx,hy,7.4,0,Math.PI*2);
    else{const a=Math.atan2(dy,dx); g.arc(hx,hy,7.4,a+Math.PI*.42,a+Math.PI*1.58); g.closePath();}
    g.fill();
  }
  g.restore();
}
function drawLabel(g,text,x,y,col='#f0e6cf',bg='rgba(0,0,0,.6)'){
  g.font='bold 10px sans-serif'; const w=g.measureText(text).width+8;
  RR(g,bg,x-w/2,y-8,w,13,3); g.fillStyle=col; g.textAlign='center'; g.textBaseline='middle'; g.fillText(text,x,y-1.5);
  g.textAlign='start'; g.textBaseline='alphabetic';
}
function drawSparkle(g,x,y,t){
  const a=.5+.5*Math.sin(t*4+x*.1), s=3+a*3;
  glow(g,x,y,14,`rgba(255,220,120,${.18+a*.2})`);
  g.fillStyle=`rgba(255,236,170,${.55+a*.45})`; g.beginPath();
  g.moveTo(x,y-s*1.8); g.lineTo(x+s*.4,y-s*.4); g.lineTo(x+s*1.8,y); g.lineTo(x+s*.4,y+s*.4);
  g.lineTo(x,y+s*1.8); g.lineTo(x-s*.4,y+s*.4); g.lineTo(x-s*1.8,y); g.lineTo(x-s*.4,y-s*.4); g.closePath(); g.fill();
}
function drawBubble(g,x,y,t){
  const b=Math.sin(t*5)*1.5;
  RR(g,'#d6b061',x-6,y-30+b,12,13,4); g.fillStyle='#1a1408'; g.font='bold 11px sans-serif'; g.textAlign='center'; g.fillText('!',x,y-19.5+b); g.textAlign='start';
}

