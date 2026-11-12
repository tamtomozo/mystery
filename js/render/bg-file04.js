/* 背景：FILE.04（墨香会の稽古場・表の路地） */
'use strict';

/* ---------- 稽古場 ---------- */
// 書いた字に見える、短い墨の線（半紙や掛け軸の上に）
function inkMarks(g,r,x,y,w,h,n,col='#1b1b1f'){
  g.fillStyle=col;
  for(let i=0;i<n;i++){
    const cx=x+w*(.2+.6*r()), cy=y+h*(i+.5)/n;
    g.fillRect(cx-w*.25,cy-.6,w*.5*(.4+r()*.6),1.3); g.fillRect(cx-.6,cy-h/n*.35,1.3,h/n*.7*(.4+r()*.6));
  }
}
function drawDojo(g){
  const r=rng(41);
  // 畳：1畳＝2マス。段ごとに縦横をずらして敷く
  R(g,'#a9a36c',0,0,PW,PH);
  for(let y=1;y<14;y++){
    const off=y%2;
    for(let x=1-off;x<19;x+=2){
      const x0=Math.max(1,x), x1=Math.min(19,x+2);
      R(g,(x+y)%4<2?'#aea86f':'#a49e66',x0*TS,y*TS,(x1-x0)*TS,TS);
      for(let yy=y*TS+3;yy<(y+1)*TS;yy+=3) R(g,'rgba(80,72,30,.12)',x0*TS,yy,(x1-x0)*TS,1);
      R(g,'#2c3326',x0*TS,y*TS,(x1-x0)*TS,2); R(g,'#2c3326',x0*TS,(y+1)*TS-2,(x1-x0)*TS,2);
      if(x0===x) R(g,'rgba(40,40,20,.35)',x0*TS,y*TS,1,TS);
    }
  }
  // 師範室の板の間（1〜5,1〜3）
  for(let y=TS;y<4*TS;y+=8){
    R(g,(y/8)%2?'#7a5a3a':'#73553a',TS,y,5*TS,8); R(g,'rgba(0,0,0,.18)',TS,y+7,5*TS,1);
    let x=TS-r()*40; while(x<6*TS){x+=40+r()*50; if(x<6*TS) R(g,'rgba(0,0,0,.2)',x,y,1,8);}
  }
  // 玄関の土間（8〜11,13）
  R(g,'#6a645a',8*TS,13*TS,4*TS,TS); for(let i=0;i<60;i++) R(g,r()<.5?'rgba(0,0,0,.12)':'rgba(255,255,255,.06)',8*TS+r()*4*TS,13*TS+r()*TS,2,2);
  R(g,'#4a3828',8*TS,13*TS-3,4*TS,4);   // 上がり框
  // 外壁：上は土壁と長押、左右と下は焦げ茶の板壁
  const wc='#3a2a1e';
  R(g,'#b5a483',0,0,PW,TS); for(let i=0;i<220;i++) R(g,'rgba(90,70,40,.12)',r()*PW,r()*TS,2,2);
  R(g,'#4a3626',0,TS-6,PW,6); R(g,'#5e4632',0,TS-6,PW,1.5);
  R(g,wc,0,0,TS,PH); R(g,wc,19*TS,0,TS,PH); R(g,wc,0,14*TS,PW,TS);
  R(g,'#2a1e15',TS-4,TS,4,PH-2*TS); R(g,'#2a1e15',19*TS,TS,4,PH-2*TS); R(g,'#2a1e15',TS,14*TS,PW-2*TS,4);
  for(const x of [0,19]) for(let y=TS;y<14*TS;y+=TS) R(g,'rgba(0,0,0,.25)',x*TS,y,TS,1);
  // 左の壁の格子窓（0,6〜8）
  R(g,'#d8d0b8',4,6*TS+4,TS-10,3*TS-8); for(let y=6*TS+4;y<9*TS-4;y+=5) R(g,'#5a4430',4,y,TS-10,1.6);
  glow(g,TS,7.5*TS,70,'rgba(255,240,200,.10)');
  // 師範室の襖（MAPDEF.dojo の solids と同じ位置。入口は 4,4）
  const fusuma=(x,y,w,h)=>{
    RR(g,'#3e2c1e',x*TS,y*TS,w*TS,h*TS,1); RR(g,'#e6dcc2',x*TS+3,y*TS+3,w*TS-6,h*TS-6,1);
    if(h===1) for(let i=1;i<w;i++) R(g,'#3e2c1e',(x+i)*TS-1,y*TS,2,TS);
    E(g,'rgba(120,140,110,.25)',(x+w/2)*TS,(y+h/2)*TS,w*TS*.3,h*TS*.25);
  };
  fusuma(1,4,3,1); fusuma(5,4,1,1); fusuma(6,1,1,4);
  R(g,'#2a1e15',4*TS,4*TS+TS-3,TS,3);   // 敷居
  g.fillStyle='#3a2a1e'; g.font='bold 10px serif'; g.fillText(L.sign.shihan,1.35*TS,4.66*TS);
  // 写し台（1〜2,1）：すりガラスの天板、下から灯り
  RR(g,'#4a3626',TS+2,TS+2,2*TS-4,TS-4,2); RR(g,'#f2f0e6',TS+6,TS+5,2*TS-12,TS-12,2);
  glow(g,2*TS,1.5*TS,30,'rgba(255,250,220,.35)');
  R(g,'rgba(60,60,60,.25)',TS+14,TS+10,10,1); R(g,'rgba(60,60,60,.25)',TS+18,TS+8,1,10);
  // 高梨の文机（4〜5,1）：稽古帳の山・硯
  RR(g,'#3a2416',4*TS+1,TS+3,2*TS-2,TS-7,2); RR(g,'#5a3a24',4*TS+3,TS+4,2*TS-6,TS-10,2);
  for(let i=0;i<4;i++) R(g,i%2?'#e9e2cc':'#d9d0b4',4*TS+6,TS+16-i*3,14,3);
  RR(g,'#18181c',5*TS+6,TS+7,16,11,2); R(g,'#2a2a30',5*TS+8,TS+9,12,5);
  // 師範室の本棚（5,1 の脇の壁）
  // 床の間（9〜12,1）：床板・掛け軸・筆架・作品・違い棚の文箱
  R(g,'#5a3e26',9*TS,TS,4*TS,TS-2); R(g,'#6e4c30',9*TS,TS,4*TS,3); R(g,'#2a1c12',9*TS,2*TS-3,4*TS,3);
  R(g,'#3a2a1e',9*TS,0,2,TS); R(g,'#3a2a1e',13*TS-2,0,2,TS);   // 床柱
  R(g,'#d8ccaa',9*TS+12,2,TS+8,TS-6); R(g,'#f4efe2',9*TS+16,5,TS,TS-12);   // 掛け軸「一字一生」
  inkMarks(g,r,9*TS+16,7,TS,TS-16,4);
  R(g,'#3a2a1e',9*TS+10,1,TS+12,2); R(g,'#3a2a1e',9*TS+10,TS-5,TS+12,2);
  R(g,'#2a1c12',10*TS+4,TS+6,TS-8,2); for(let i=0;i<6;i++) if(i!==3) R(g,['#c9a45a','#7a5a3a','#1a1a1a'][i%3],10*TS+6+i*4,TS+8,1.6,12);   // 筆架（一本ぶん空き）
  R(g,'#e9e2cc',11*TS+6,TS+8,TS-12,8); C(g,'#7a3a2a',11*TS+6,TS+12,4); C(g,'#7a3a2a',12*TS-6,TS+12,4);   // 巻いた作品
  R(g,'#4a3020',12*TS+2,TS+3,TS-4,3); RR(g,'#1a1012',12*TS+8,TS+8,TS-16,12,2); R(g,'#a03a2a',12*TS+15,TS+8,2,12);   // 文箱と紐
  // 門人名簿（床の間の右の壁）
  R(g,'#e8e0c8',13*TS+6,3,TS-12,TS-10); for(let i=0;i<5;i++) R(g,'#3a3a3a',13*TS+9+i*3.5,6,1.2,TS-17);
  // 千鶴の事務机（15〜16,1）
  RR(g,'#5a4430',15*TS+1,TS+2,2*TS-2,TS-5,2); RR(g,'#6e5440',15*TS+3,TS+3,2*TS-6,TS-9,2);
  R(g,'#2a3a5a',15*TS+6,TS+8,14,16); R(g,'#e9e2cc',15*TS+8,TS+10,10,12);   // 稽古日誌
  RR(g,'#1a1a1c',16*TS+8,TS+7,14,10,3); C(g,'#2a2a2c',16*TS+15,TS+12,3);   // 黒電話
  R(g,'#f2ede0',16*TS+6,TS+20,16,6);
  // 子ども教室の棚（18,1〜3）と、上の壁の作品
  RR(g,'#6a4a30',18*TS+2,TS+1,TS-4,3*TS-2,2);
  for(let i=0;i<6;i++) R(g,'#f2eee2',18*TS+6,2*TS+4+i*2.4,TS-12,2);
  R(g,'rgba(0,0,0,.2)',18*TS+2,2*TS,TS-4,1.5); R(g,'rgba(0,0,0,.2)',18*TS+2,3*TS,TS-4,1.5);
  for(let i=0;i<3;i++){C(g,'#1a1a1a',18*TS+9+i*7,3*TS+10,2.5); R(g,'#c9a45a',18*TS+8+i*7,3*TS+14,1.5,8);}
  for(let i=0;i<4;i++){const px=16*TS+6+i*15; R(g,'#f6f2e6',px,4,12,16); inkMarks(g,r,px,6,12,12,2,'#2a2a2a');}
  // 文机（2列）
  const desk=(x,y,ink)=>{
    E(g,'rgba(0,0,0,.25)',(x+1)*TS,(y+1)*TS-2,TS-2,5);
    RR(g,'#3a2416',x*TS+2,y*TS+5,2*TS-4,TS-10,2); RR(g,'#4e3220',x*TS+3,y*TS+6,2*TS-6,TS-13,2);
    R(g,'#1f1f24',x*TS+12,y*TS+7,TS+6,TS-15);   // 下敷き
    if(ink){R(g,'#f4efe2',x*TS+15,y*TS+8,TS,TS-17); inkMarks(g,r,x*TS+15,y*TS+9,TS,TS-19,3);}
    RR(g,'#18181c',x*TS+4,y*TS+8,8,13,2); R(g,'#2e2e34',x*TS+5,y*TS+9,6,6);   // 硯
    R(g,'#5a4a3a',(x+2)*TS-8,y*TS+8,2,TS-17);   // 文鎮
  };
  for(const y of [7,10]) for(const x of [2,6,10,14]) desk(x,y,r()<.6);
  // 脅迫状の並んだ文机（10〜11,7）
  for(const [ox,rot] of [[10.4,-.08],[11.15,.06]]){
    g.save(); g.translate(ox*TS,7.5*TS); g.rotate(rot); R(g,'#f6f2e6',-9,-7,18,14); g.strokeStyle='rgba(0,0,0,.2)'; g.lineWidth=.8; g.strokeRect(-9,-7,18,14);
    R(g,'#2a2a2a',-5,-3,8,1.4); R(g,'#2a2a2a',-3,1,7,1.4); g.restore();
  }
  // 宮内の文机（14〜15,7）：紫がかった硯と封書
  RR(g,'#3e2e3e',14*TS+3,7*TS+7,10,15,2); R(g,'#4e3a4e',14*TS+5,7*TS+9,6,7);
  R(g,'#f2ede0',15*TS+4,7*TS+16,13,8); R(g,'#3a6ab0',15*TS+4,7*TS+16,13,1.5); R(g,'#c94a3a',15*TS+4,7*TS+22.5,13,1.5);
  // 会報の棚（1,12）
  RR(g,'#5a3e26',TS+2,12*TS+2,TS-4,TS-4,2);
  for(let i=0;i<6;i++) R(g,['#c8b890','#e2d6b4','#b8a880'][i%3],TS+5+i*3.6,12*TS+5,3,TS-12);
  // 下駄箱（5〜6,13）と傘立て（13,13）
  RR(g,'#5a3e26',5*TS+2,13*TS+3,2*TS-4,TS-6,2); for(let i=1;i<4;i++) R(g,'#3a2a1e',5*TS+2+i*15,13*TS+3,1.5,TS-6);
  C(g,'#4a4a4a',13.5*TS,13.5*TS,9); C(g,'#2a2a2a',13.5*TS,13.5*TS,6.5);
  for(const [dx,c] of [[-3,'#2a4a8a'],[2,'#8a2a2a'],[0,'#3a3a3a']]) C(g,c,13.5*TS+dx,13.5*TS+dx/2,2.2);
  // 玄関（9〜10,14）：格子戸
  R(g,'#2a1e15',9*TS,14*TS+2,2*TS,TS-2); R(g,'#e0d6bc',9*TS+3,14*TS+4,2*TS-6,TS-6);
  for(let x=9*TS+5;x<11*TS-3;x+=4) R(g,'#4a3626',x,14*TS+4,1.6,TS-6);
  g.fillStyle='#e8dcc0'; g.font='bold 9px serif'; g.fillText(L.sign.genkan,9.45*TS,13.82*TS);
  // 裏口（19,12）
  R(g,'#5a4430',19*TS+4,12*TS+1,TS-8,TS-2); R(g,'#3a2a1e',19*TS+4,12*TS+TS/2,TS-8,1.5); C(g,'#c9a45a',19*TS+8,12.5*TS+4,1.6);
  g.save(); g.translate(18.9*TS,11.7*TS); g.fillStyle='#e8dcc0'; g.font='bold 9px serif'; g.textAlign='right'; g.fillText(L.sign.backdoor,0,0); g.restore();
  // 灯り（天井の照明）
  for(const [x,y] of [[6,6],[13,6],[6,11],[13,11]]) glow(g,x*TS,y*TS,120,'rgba(255,236,190,.05)');
  R(g,'rgba(255,230,190,.04)',0,0,PW,PH);
  vignette(g,.32);
}

/* ---------- 表の路地 ---------- */
function drawAlley(g){
  const r=rng(73);
  // 石畳
  R(g,'#77736a',0,0,PW,PH);
  for(let y=3*TS;y<12*TS;y+=16){
    const off=((y/16)%2)*12;
    for(let x=-off;x<PW;x+=24){
      R(g,r()<.5?'#7d7970':'#716d65',x+1,y+1,22,14);
      R(g,'rgba(0,0,0,.18)',x,y+15,24,1); R(g,'rgba(0,0,0,.14)',x+23,y,1,16);
    }
  }
  for(let i=0;i<500;i++){g.fillStyle=r()<.5?'rgba(0,0,0,.06)':'rgba(255,255,255,.04)'; g.fillRect(r()*PW,3*TS+r()*9*TS,2,2);}
  // 側溝（上下）
  R(g,'#55524c',TS,3*TS,18*TS,5); for(let x=TS;x<19*TS;x+=8) R(g,'#3e3c38',x,3*TS+1,5,3);
  R(g,'#55524c',TS,12*TS-5,18*TS,5); for(let x=TS;x<19*TS;x+=8) R(g,'#3e3c38',x,12*TS-4,5,3);
  // 両端の塀（マップの縁）
  R(g,'#4a4640',0,0,TS,PH); R(g,'#4a4640',19*TS,0,TS,PH); R(g,'#3a3732',0,14*TS,PW,TS);
  // 上：墨香会の町家（1〜12）と隣家（13〜18）。瓦屋根＋格子
  R(g,'#3a3e44',0,0,PW,TS-4); for(let x=0;x<PW;x+=10) R(g,'rgba(0,0,0,.25)',x,0,1.5,TS-4);
  R(g,'#2a2d32',0,TS-6,PW,3);
  R(g,'#3a2a1e',3*TS,TS-3,10*TS,2*TS+3);
  for(let x=3*TS+3;x<13*TS;x+=5) R(g,'#5a4430',x,TS,2.4,2*TS-6);
  R(g,'#2a1e15',3*TS,3*TS-4,10*TS,4);
  R(g,'#8a8478',13*TS,TS-3,6*TS,2*TS+3); for(let i=0;i<120;i++) R(g,'rgba(0,0,0,.08)',13*TS+r()*6*TS,TS+r()*2*TS,2,2);
  R(g,'#6a645a',13*TS,3*TS-4,6*TS,4);
  // 細い道（1〜2）：奥に裏口の木戸
  R(g,'#4a4640',TS,TS-3,2*TS,2*TS+3); R(g,'#5e5a52',TS+6,TS,2*TS-12,2*TS);
  R(g,'#6a5038',TS+14,TS+2,2*TS-28,TS-6); R(g,'#4a3626',TS+14,TS+TS/2-1,2*TS-28,1.5);
  R(g,'rgba(0,0,0,.25)',TS+6,TS,2*TS-12,6);
  // 格子窓（6,2）
  R(g,'#d8d0b8',5*TS+20,TS+10,2*TS-8,TS); for(let x=5*TS+22;x<7*TS+10;x+=4) R(g,'#3a2a1e',x,TS+10,1.6,TS);
  // 看板（8,2）
  RR(g,'#5a3e26',7*TS+18,TS+4,TS+4,2*TS-12,2); R(g,'#e8dcc0',7*TS+21,TS+7,TS-2,2*TS-18);
  g.save(); g.fillStyle='#1a1a1a'; g.font='bold 11px serif'; g.textAlign='center';
  [...L.sign.bokko].forEach((ch,i,a)=>g.fillText(ch,8.15*TS-2,TS+20+i*(2*TS-26)/Math.max(1,a.length-1)*.9));
  g.restore();
  // 格子戸（9〜10,2）
  R(g,'#2a1e15',9*TS,TS+4,2*TS,2*TS-4); R(g,'#e0d6bc',9*TS+3,TS+6,2*TS-6,2*TS-8);
  for(let x=9*TS+5;x<11*TS-3;x+=4) R(g,'#4a3626',x,TS+6,1.6,2*TS-8);
  R(g,'#2a1e15',10*TS-1,TS+6,2,2*TS-8);
  // 郵便受け（12,2）
  RR(g,'#6a4a30',12*TS+6,2*TS-2,TS-12,TS-6,2); R(g,'#2a1e15',12*TS+10,2*TS+4,TS-20,2.5); R(g,'#c9a45a',12*TS+14,2*TS+14,4,1.5);
  // 社中展のポスター（15,2）
  R(g,'#f4efe2',15*TS+5,TS+8,TS-10,TS+8); R(g,'#a03a2a',15*TS+7,TS+11,TS-14,4); inkMarks(g,r,15*TS+8,TS+18,TS-16,TS-4,3,'#2a2a2a');
  // 隣家の玄関と植木鉢（17,2）
  R(g,'#5a5048',17*TS+4,TS+6,TS-8,2*TS-6);
  for(const px of [16.3,16.6,18.4]){RR(g,'#8a5a3a',px*TS,2*TS+12,10,10,2); C(g,'#3d6a34',px*TS+5,2*TS+11,6);}
  // 下：向かいの店（黒田不動産 2〜7／学習塾 12〜17）
  R(g,'#5c5a56',TS,12*TS,18*TS,2*TS);
  RR(g,'#3a3e44',2*TS,12*TS+2,6*TS,2*TS-2,2); R(g,'#9ab0bc',2*TS+4,12*TS+6,6*TS-8,TS-4);
  for(let i=0;i<8;i++) R(g,'#f2eee2',2*TS+8+i*22,12*TS+9,16,20);
  for(let i=0;i<8;i++) R(g,'#a03a2a',2*TS+10+i*22,12*TS+11,12,2);
  R(g,'#e8e0c8',2*TS+4,13*TS+6,6*TS-8,14); g.fillStyle='#2a3a5a'; g.font='bold 11px sans-serif'; g.fillText(L.sign.fudosan,2.3*TS,13*TS+17);
  RR(g,'#e2ddd2',12*TS,12*TS+2,6*TS,2*TS-2,2); R(g,'#9ab0bc',12*TS+4,12*TS+6,6*TS-8,TS-4);
  R(g,'#3a6aaa',12*TS+4,13*TS+6,6*TS-8,14); g.fillStyle='#f4f0e4'; g.font='bold 11px sans-serif'; g.fillText(L.sign.juku,12.3*TS,13*TS+17);
  R(g,'#6a645a',8*TS,12*TS,4*TS,2*TS); for(let x=8*TS;x<12*TS;x+=12) R(g,'rgba(0,0,0,.2)',x,12*TS,1,2*TS);   // 塀
  // 電柱（15,6）と電線
  E(g,'rgba(0,0,0,.3)',15.5*TS+4,6.5*TS+6,12,6);
  C(g,'#8a8478',15.5*TS,6.5*TS,9); C(g,'#9a9488',15.5*TS-2,6.5*TS-2,5);
  g.strokeStyle='rgba(30,30,30,.45)'; g.lineWidth=1; g.beginPath();
  g.moveTo(0,4.6*TS); g.quadraticCurveTo(8*TS,5.6*TS,15.5*TS,6.4*TS); g.lineTo(PW,7.2*TS);
  g.moveTo(0,5.2*TS); g.quadraticCurveTo(8*TS,6.2*TS,15.5*TS,6.6*TS); g.lineTo(PW,8*TS); g.stroke();
  RR(g,'#e8e4d0',15.5*TS+6,6*TS-4,10,6,2); glow(g,15.5*TS+11,6*TS,24,'rgba(255,245,200,.15)');   // 街灯
  // 自転車（7,9）
  g.strokeStyle='#2a2a2e'; g.lineWidth=2;
  for(const dy of [-8,8]){g.beginPath(); g.arc(7.5*TS,9.5*TS+dy,6,0,Math.PI*2); g.stroke();}
  R(g,'#3a6aaa',7.5*TS-1.5,9.5*TS-8,3,16); R(g,'#5a5a5a',7.5*TS-6,9.5*TS-14,12,5);
  // 水たまり
  E(g,'rgba(70,80,90,.35)',11*TS,9*TS,26,8); E(g,'rgba(210,220,230,.12)',10.8*TS,8.9*TS,14,3);
  R(g,'rgba(255,236,200,.05)',0,0,PW,PH);
  vignette(g,.3);
}

Object.assign(DRAWERS,{dojo:drawDojo,alley:drawAlley});
