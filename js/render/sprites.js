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
  // 持ち物：体の前に抱える（panel＝布をかけたパネル／flower＝スタンド花／pudding＝プリン／letter＝封筒／capsule＝錆びた缶／reel＝16ミリのリール／handle＝シャッターの巻き上げハンドル）
  if(o.carry){
    g.save(); g.shadowBlur=0; g.globalAlpha=1;
    const cx=dx*10, cy=dy*9+3;
    if(o.carry==='panel'){
      const w=dy?24:8, h=dy?8:22;
      RR(g,'#e9e4d8',cx-w/2,cy-h/2,w,h,2); R(g,'rgba(0,0,0,.12)',cx-w/2,cy+h/2-2,w,2);
    }else if(o.carry==='flower'){
      C(g,'#2f5a2c',cx,cy,8);
      for(let i=0;i<7;i++){const a=i/7*Math.PI*2; C(g,['#e8a0b4','#f4f0e6','#e3c26a'][i%3],cx+Math.cos(a)*5,cy+Math.sin(a)*5,2.6);}
      C(g,'#f4f0e6',cx,cy,2.4);
    }else if(o.carry==='pudding'){
      E(g,'#f2ead8',cx,cy+1,6,4.5); E(g,'#e8c470',cx,cy,4.6,3.4); E(g,'#7a3e16',cx,cy-.6,2.8,1.9);
    }else if(o.carry==='letter'){
      R(g,'#f4f0e4',cx-6,cy-4,12,8); g.strokeStyle='rgba(0,0,0,.25)'; g.lineWidth=.8; g.strokeRect(cx-6,cy-4,12,8);
      g.beginPath(); g.moveTo(cx-6,cy-4); g.lineTo(cx,cy); g.lineTo(cx+6,cy-4); g.stroke();
    }else if(o.carry==='capsule'){
      C(g,'#6e5a48',cx,cy,7); C(g,'#8a6e52',cx,cy,5.6); C(g,'#a0563a',cx+2,cy-1.5,2); C(g,'#7a4a30',cx-2.5,cy+2,1.6);
    }else if(o.carry==='reel'){
      C(g,'#9aa0a8',cx,cy,7); C(g,'#3a3a3e',cx,cy,5.4); C(g,'#9aa0a8',cx,cy,1.8);
      for(let i=0;i<3;i++){const a=i/3*Math.PI*2+.5; C(g,'#c8ccd2',cx+Math.cos(a)*3.6,cy+Math.sin(a)*3.6,1.3);}
    }else if(o.carry==='handle'){
      g.strokeStyle='#5a5e66'; g.lineWidth=2.4; g.lineCap='round';
      g.beginPath(); g.moveTo(cx-7,cy+3); g.lineTo(cx+5,cy-3); g.lineTo(cx+5,cy+3); g.stroke();
      C(g,'#8a3a2a',cx+5,cy+4,2.2);
    }
    g.restore();
  }
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

