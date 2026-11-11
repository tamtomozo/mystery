/* 背景：FILE.03（捜査一課・屋上） */
'use strict';

/* ---------- 捜査一課 ---------- */
function drawOffice(g){
  const r=rng(31);
  // 床：タイルカーペット。給湯室は明るい塩ビタイル
  for(let y=0;y<PH;y+=TS) for(let x=0;x<PW;x+=TS){
    R(g,((x/TS+y/TS)|0)%2?'#3e4550':'#3a414b',x,y,TS,TS);
    R(g,'rgba(0,0,0,.18)',x,y+TS-1,TS,1); R(g,'rgba(0,0,0,.12)',x+TS-1,y,1,TS);
    if(r()<.3) R(g,'rgba(255,255,255,.03)',x+r()*24,y+r()*24,5,1);
  }
  const hs=TS/2;
  for(let y=TS;y<5*TS;y+=hs) for(let x=14*TS;x<19*TS;x+=hs){
    R(g,((x+y)/hs)%2?'#8a867c':'#807c73',x,y,hs,hs); R(g,'rgba(0,0,0,.12)',x,y+hs-1,hs,1);
  }
  // 窓からの光
  g.fillStyle='rgba(255,226,170,.05)'; g.beginPath();
  g.moveTo(2*TS,TS); g.lineTo(7*TS,TS); g.lineTo(9*TS,6*TS); g.lineTo(3*TS,6*TS); g.fill();
  // 外壁
  const wc='#2c2f36';
  R(g,wc,0,0,PW,TS); R(g,wc,0,14*TS,PW,TS); R(g,wc,0,0,TS,PH); R(g,wc,19*TS,0,TS,PH);
  R(g,'#3c4049',TS,TS-5,PW-2*TS,5); R(g,'#1f2126',TS,14*TS,PW-2*TS,4);
  R(g,'#353840',TS-4,TS,4,PH-2*TS); R(g,'#353840',19*TS,TS,4,PH-2*TS);
  // 窓（ブラインド）
  for(const wx of [2,5]){
    R(g,'#c8ccd0',wx*TS+2,3,2*TS-4,TS-9); R(g,'#a9bccb',wx*TS+4,5,2*TS-8,TS-13);
    for(let y=6;y<TS-9;y+=3) R(g,'rgba(236,240,244,.8)',wx*TS+4,y,2*TS-8,1.6);
  }
  // 給湯室の仕切り（MAPDEF.office の solids と同じ位置）
  const wall=(x,y,w,h)=>{R(g,'#2e3138',x*TS,y*TS,w*TS,h*TS); R(g,'#4a4e57',x*TS,y*TS,w*TS,4);};
  wall(13,1,1,5); wall(14,5,2,1); wall(17,5,2,1);
  g.fillStyle='#cfc8b8'; g.font='bold 10px sans-serif'; g.fillText(L.sign.kitchen,14.15*TS,5.65*TS);
  // 冷蔵庫の貼り紙（上の壁）
  R(g,'#f2eee2',16*TS+9,5,15,19); for(let i=0;i<4;i++) R(g,'#9a9488',16*TS+11,9+i*3.5,11-(i%2)*3,1);
  C(g,'#c94a3a',16*TS+16.5,6,1.4);
  // 掲示板（上の壁）
  RR(g,'#9a7448',12*TS+1,3,TS-2,TS-8,2); R(g,'#7a5a36',12*TS+1,TS-7,TS-2,2);
  for(const [px,py,w,h] of [[4,5,9,11],[15,6,11,8],[6,17,8,6],[17,15,9,8]]){R(g,'#efe9da',12*TS+px,py,w,h); C(g,'#d23a2a',12*TS+px+w/2,py+1,1.2);}
  // 流し台とコーヒーメーカー
  RR(g,'#b8b4aa',14*TS,TS,2*TS,TS-3,2); R(g,'#9a968c',14*TS,2*TS-5,2*TS,2);
  RR(g,'#7c838a',14*TS+5,TS+5,TS-10,TS-14,3); R(g,'#c8ccd0',14*TS+14,TS+2,3,6); C(g,'#e9e2d0',14*TS+24,TS+20,3.5);
  RR(g,'#2a2a2e',15*TS+8,TS+2,16,20,2); C(g,'#5a3a22',15*TS+16,TS+15,4); C(g,'#d23a2a',15*TS+20,TS+6,1.2);
  // 冷蔵庫
  RR(g,'#e6e6e2',18*TS+2,TS+1,TS-4,2*TS-3,3); R(g,'rgba(0,0,0,.08)',18*TS+TS-6,TS+1,4,2*TS-3);
  R(g,'#bdbdb8',18*TS+2,TS+22,TS-4,1.5); R(g,'#9a9a9a',18*TS+5,TS+8,2,10); R(g,'#9a9a9a',18*TS+5,TS+28,2,14);
  C(g,'#e3a23a',18*TS+20,TS+12,2); C(g,'#3a8ad0',18*TS+14,TS+40,2); R(g,'#f6f2e6',18*TS+12,TS+30,10,8);
  // 給湯室のゴミ箱
  C(g,'rgba(0,0,0,.3)',14.5*TS+1,4.5*TS+3,9); C(g,'#5a6068',14.5*TS,4.5*TS,9); C(g,'#2f3338',14.5*TS,4.5*TS,6.5);
  // 大河内の机（8〜10,2）と椅子
  RR(g,'#1f2126',9*TS+5,TS+4,TS-10,TS-6,6); RR(g,'#2c2f35',9*TS+8,TS+6,TS-16,TS-14,4);
  RR(g,'#4f3b28',8*TS+1,2*TS+2,3*TS-2,TS-3,3); RR(g,'#6b5139',8*TS+3,2*TS+3,3*TS-6,TS-8,2);
  R(g,'#2a2d33',8*TS+5,2*TS+6,20,15); R(g,'#efe9da',8*TS+7,2*TS+7,16,12); R(g,'#c9c2b2',8*TS+9,2*TS+10,11,1); R(g,'#c9c2b2',8*TS+9,2*TS+13,9,1);
  R(g,'#1a1c20',9*TS+7,2*TS+4,18,12); R(g,'#4d6680',9*TS+9,2*TS+6,14,8);
  R(g,'#d6b061',9*TS+8,3*TS-9,16,4);
  C(g,'#5e7055',10*TS+19,2*TS+11,4.5); C(g,'#8a6a3a',10*TS+19,2*TS+11,3);
  R(g,'#3e2e1f',10*TS+6,3*TS-6,TS-12,2); C(g,'#c9a45a',10*TS+16,3*TS-5,1.3);
  // ホワイトボード（行動予定表）
  R(g,'#8a8e96',TS+2,4*TS+1,TS-8,2*TS-2); R(g,'#e4e8ea',TS+4,4*TS+3,TS-12,2*TS-6);
  for(let i=0;i<7;i++) R(g,i===5?'#c94a3a':'#2f4a8a',TS+7,4*TS+8+i*7,8+r()*8,1.5);
  R(g,'#6a6e76',TS+4,6*TS-5,TS-12,2);
  // 島型の机
  const island=(x,y,w,h)=>{
    for(let i=0;i<w;i++){
      RR(g,'#1f2126',(x+i)*TS+8,y*TS-11,TS-16,11,5);
      RR(g,'#1f2126',(x+i)*TS+8,(y+h)*TS,TS-16,11,5);
    }
    RR(g,'#7d828a',x*TS+1,y*TS+1,w*TS-2,h*TS-2,3); R(g,'#6a6f77',x*TS+1,(y+1)*TS-1,w*TS-2,2);
    for(let i=0;i<w;i++){
      const cx=(x+i)*TS;
      R(g,'#1a1c20',cx+8,(y+1)*TS-12,16,10); R(g,'#465a70',cx+10,(y+1)*TS-10,12,6);
      R(g,'#1a1c20',cx+8,(y+1)*TS+2,16,10); R(g,'#465a70',cx+10,(y+1)*TS+4,12,6);
      R(g,'#2a2c30',cx+9,y*TS+5,14,4); R(g,'#2a2c30',cx+9,(y+2)*TS-9,14,4);
      if(r()<.7) R(g,'#efe9da',cx+2+r()*6,y*TS+11,9,8);
      if(r()<.7) R(g,'#efe9da',cx+18+r()*6,(y+2)*TS-20,9,8);
    }
  };
  island(2,7,4,2); island(8,7,4,2);
  for(let i=0;i<3;i++){C(g,'#6a4a2a',2*TS+6+i*6,7*TS+18,2.6); C(g,'#9a7a4a',2*TS+6+i*6,7*TS+18,1.4);}   // 滝沢の机の空き缶
  R(g,'#efe9da',5*TS+3,7*TS+3,14,10); R(g,'#e6dfcc',5*TS+5,7*TS+1,14,10);                              // あなたの机の資料の山
  // 小松の机
  RR(g,'#1f2126',16*TS-4,11*TS+8,8,TS-16,3);
  RR(g,'#7d828a',14*TS+1,11*TS+2,2*TS-2,TS-4,3);
  R(g,'#1a1c20',14*TS+6,11*TS+4,16,11); R(g,'#465a70',14*TS+8,11*TS+6,12,7);
  RR(g,'#c94a3a',15*TS+4,11*TS+5,14,18,2); R(g,'#f2d27a',15*TS+7,11*TS+10,8,6);
  R(g,'#efe9da',14*TS+24,11*TS+16,8,10);
  // コピー機
  RR(g,'#d4d4cc',18*TS+2,8*TS+2,TS-4,2*TS-4,3); R(g,'#2a2a2e',18*TS+5,8*TS+6,TS-10,6);
  R(g,'#b8b8b0',18*TS+4,9*TS+6,TS-8,1.5); C(g,'#e3a23a',18*TS+22,8*TS+18,1.6);
  // 観葉植物
  {const px=1,py=13; C(g,'#6e4426',(px+.5)*TS,(py+.5)*TS,10); for(let i=0;i<7;i++){const a=i/7*Math.PI*2; E(g,i%2?'#2f5a2c':'#3d7037',(px+.5)*TS+Math.cos(a)*8,(py+.5)*TS+Math.sin(a)*8,8,4,a);}}
  // 出入口とカードリーダー（下の壁）
  R(g,'#1b1d22',9*TS+2,14*TS+2,TS-4,TS-2); R(g,'#8a8e96',9*TS,14*TS,2,TS); R(g,'#8a8e96',10*TS-2,14*TS,2,TS);
  RR(g,'#3a3d44',10*TS+11,14*TS+6,10,15,2); R(g,'#1a1c20',10*TS+13,14*TS+9,6,4); C(g,'#5ad07a',10*TS+16,14*TS+17,1.5);
  g.fillStyle='#cfc8b8'; g.font='bold 9px sans-serif'; g.fillText(L.sign.exit,9.1*TS,13.85*TS);
  R(g,'rgba(255,240,215,.03)',0,0,PW,PH);
  vignette(g,.3);
}

/* ---------- 屋上 ---------- */
function drawRoof(g){
  const r=rng(57);
  // コンクリートの床
  R(g,'#77756f',0,0,PW,PH);
  for(let i=0;i<1800;i++){g.fillStyle=r()<.5?'rgba(0,0,0,.06)':'rgba(255,255,255,.04)'; g.fillRect(r()*PW,r()*PH,2,2);}
  for(let x=TS;x<PW;x+=2*TS) R(g,'rgba(0,0,0,.16)',x,0,1,PH);
  for(let y=TS;y<PH;y+=2*TS) R(g,'rgba(0,0,0,.16)',0,y,PW,1);
  // 水たまりと染み
  E(g,'rgba(60,72,84,.4)',12.3*TS,10.4*TS,42,13); E(g,'rgba(200,215,230,.12)',12*TS,10.2*TS,22,4);
  E(g,'rgba(0,0,0,.08)',5*TS,6*TS,30,18,.4);
  // 胸壁とフェンス（上・左・右）
  const pc='#5d5b56';
  R(g,pc,0,0,PW,TS); R(g,pc,0,0,TS,PH); R(g,pc,19*TS,0,TS,PH); R(g,pc,0,14*TS,PW,TS);
  R(g,'rgba(0,0,0,.25)',TS,TS,PW-2*TS,4); R(g,'rgba(0,0,0,.2)',TS,TS,4,PH-2*TS); R(g,'rgba(0,0,0,.2)',19*TS-4,TS,4,PH-2*TS);
  g.strokeStyle='rgba(70,120,92,.55)'; g.lineWidth=1; g.beginPath();
  for(let x=0;x<PW;x+=6){g.moveTo(x,4); g.lineTo(x+6,TS-6); g.moveTo(x+6,4); g.lineTo(x,TS-6);}
  for(let y=TS;y<14*TS;y+=6){g.moveTo(4,y); g.lineTo(TS-6,y+6); g.moveTo(4,y+6); g.lineTo(TS-6,y); g.moveTo(19*TS+6,y); g.lineTo(PW-4,y+6); g.moveTo(19*TS+6,y+6); g.lineTo(PW-4,y);}
  g.stroke();
  R(g,'#3f6a52',0,3,PW,2); R(g,'#3f6a52',0,TS-7,PW,2);
  R(g,'#3f6a52',3,0,2,14*TS); R(g,'#3f6a52',TS-7,0,2,14*TS); R(g,'#3f6a52',19*TS+5,0,2,14*TS); R(g,'#3f6a52',PW-5,0,2,14*TS);
  // 階段室（下の壁）
  R(g,'#4a4c52',7*TS,14*TS,5*TS,TS); R(g,'#5c5e64',7*TS,14*TS,5*TS,3);
  R(g,'#2a3a4a',9*TS+3,14*TS+3,TS-6,TS-3); C(g,'#c9c2b2',9*TS+TS-8,14.55*TS,1.6);
  g.fillStyle='#e0dace'; g.font='bold 9px sans-serif'; g.fillText(L.sign.stairs,10.2*TS,14.6*TS);
  // 自販機（2〜3,1）とゴミ箱（4,1）
  glow(g,3*TS,1.8*TS,60,'rgba(255,250,220,.12)');
  for(const [x,c] of [[2,'#b8302c'],[3,'#2c5cae']]){
    RR(g,c,x*TS+1,TS+1,TS-2,TS-3,2); R(g,'#e8eef2',x*TS+4,TS+4,TS-8,12);
    for(let i=0;i<4;i++){R(g,['#7a5a3a','#d23a2a','#3a8a5a','#e3c26a'][i],x*TS+6+i*5.5,TS+6,3.5,8);}
    R(g,'#1a1c20',x*TS+8,2*TS-9,TS-16,4);
  }
  RR(g,'#3a6a8a',4*TS+2,TS+4,13,TS-8,2); RR(g,'#6a6a66',4*TS+17,TS+4,13,TS-8,2);
  C(g,'#1d2a33',4*TS+8.5,TS+9,3); R(g,'#2a2a28',4*TS+19,TS+7,9,3);
  R(g,'#efe9da',4*TS+21,TS+3,6,4);
  // 給水塔（14〜17,1〜3）
  E(g,'rgba(0,0,0,.25)',16*TS,4*TS-2,2*TS,12);
  for(const lx of [14.4,17.4]) R(g,'#5a5550',lx*TS,2.6*TS,5,1.3*TS);
  RR(g,'#9aa3a8',14*TS+4,TS+2,4*TS-8,2.4*TS,20); RR(g,'#b4bcc0',14*TS+8,TS+4,4*TS-16,10,8);
  for(const by of [1.9,2.7]) R(g,'rgba(0,0,0,.15)',14*TS+4,by*TS,4*TS-8,2);
  R(g,'#a05a3a',14*TS+12,TS+40,3,30); for(let y=TS+44;y<4*TS-2;y+=6) R(g,'#a05a3a',14*TS+10,y,9,1.5);
  // ベンチ（8〜10,7）
  E(g,'rgba(0,0,0,.25)',9.5*TS,8*TS-4,1.4*TS,6);
  RR(g,'#6a4a30',8*TS+2,7*TS+7,3*TS-4,TS-14,3);
  for(let x=8*TS+8;x<11*TS-6;x+=8) R(g,'rgba(0,0,0,.25)',x,7*TS+7,1,TS-14);
  R(g,'#3a3a3a',8*TS+6,8*TS-7,3,5); R(g,'#3a3a3a',11*TS-9,8*TS-7,3,5);
  C(g,'#7a5a3a',10*TS+20,7*TS+16,2.6);   // 置き忘れの空き缶
  // プランター
  for(const px of [1,18]){
    RR(g,'#6a5040',px*TS+3,12*TS+4,TS-6,TS-8,3);
    for(let i=0;i<5;i++) C(g,i%2?'#3d6a34':'#4a7a3e',px*TS+8+r()*16,12*TS+8+r()*12,5);
  }
  // 夕方の光
  R(g,'rgba(255,190,120,.08)',0,0,PW,PH);
  vignette(g,.3);
}

Object.assign(DRAWERS,{office:drawOffice,roof:drawRoof});
