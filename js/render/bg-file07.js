/* 背景：FILE.07（港町の遊園地「汐見ランド」の観覧車広場・管理棟）
   観覧車は正面から見た姿で、広場の上に背景のように描く（客席のスクリーンと同じ考え方）。
   夕暮れの色は、時刻に合わせて render.js の drawDusk が上から重ねる。ここでは昼下がりの色で描く */
'use strict';

/* ---------- 共通 ---------- */
// 小さな札。x,y は左上
function f7Plate(g,text,x,y,w,bg='#2a3a4a',fg='#f4ecd8'){
  RR(g,'rgba(0,0,0,.45)',x-1,y-1,w+2,12,2); R(g,bg,x,y,w,10);
  g.save(); g.fillStyle=fg; g.font='bold 8px sans-serif'; g.textAlign='center'; g.textBaseline='middle';
  g.fillText(text,x+w/2,y+5.5,w-2); g.restore();
}
function f7Wall(g,x,y,w,h,c='#c9c2b2'){
  R(g,c,x*TS,y*TS,w*TS,h*TS);
  R(g,'rgba(255,255,255,.18)',x*TS,y*TS,w*TS,2); R(g,'rgba(0,0,0,.22)',x*TS,(y+h)*TS-3,w*TS,3);
}
// 観覧車の寸法（タイル単位）：輪の中心と半径、ゴンドラのぶら下がり
const F7W={cx:10,cy:.5,r:4.4,hang:.6};
// 角度（度。90＝真下）にあるゴンドラの中心（px）
const f7GondolaAt=a=>{const t=a*Math.PI/180; return [(F7W.cx+F7W.r*Math.cos(t))*TS,(F7W.cy+F7W.r*Math.sin(t)+F7W.hang)*TS];};
// ゴンドラ1台。x,y は中心。hl＝7番を目立たせる（推理シーンの小道具）
const F7COLS=['#e86a5a','#f0b84a','#6ab0d8','#7ac08a','#c88ad0','#f08aa8'];
function f7DrawGondola(g,x,y,num,hl){
  g.save();
  g.strokeStyle='#4a4e56'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x,y-14); g.lineTo(x,y-9); g.stroke();   // 吊り金具
  if(hl) glow(g,x,y,26,'rgba(255,214,120,.55)');
  const col=F7COLS[(num-1)%F7COLS.length];
  RR(g,'rgba(0,0,0,.25)',x-11,y-8,24,21,6);
  RR(g,col,x-12,y-9,24,20,6);
  R(g,'rgba(255,255,255,.18)',x-10,y-8,20,2);
  RR(g,'#cfe4ee',x-9,y-5,18,8,2); R(g,'rgba(255,255,255,.5)',x-8,y-4,6,2);   // 窓
  R(g,'rgba(0,0,0,.18)',x-12,y+5,24,2);
  RR(g,'#f4ecd8',x-4,y+5,8,6,1.5);
  g.fillStyle='#2a2a2a'; g.font='bold 6px sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(String(num),x,y+8.3);
  if(hl){g.strokeStyle='#ffd66a'; g.lineWidth=1.6; g.beginPath(); g.roundRect(x-13,y-10,26,22,7); g.stroke();}
  g.restore();
}
// 機械室の屋上の大きな看板（ゴンドラより手前に描く）
const F7BB={x:13.05,y:1.55,w:3.45,h:2.3};
function f7Billboard(g){
  const X=F7BB.x*TS, Y=F7BB.y*TS, Wd=F7BB.w*TS, Hd=F7BB.h*TS;
  for(const fx of [.2,.8]) R(g,'#5a5e66',X+Wd*fx-2,Y+Hd-4,4,14);   // 脚
  RR(g,'#2a4a7a',X,Y,Wd,Hd,4); RR(g,'#3a64a0',X+3,Y+3,Wd-6,Hd-6,3);
  for(let i=0;i<9;i++) C(g,'rgba(255,236,170,.75)',X+8+i*(Wd-16)/8,Y+5,1.4);
  for(let i=0;i<9;i++) C(g,'rgba(255,236,170,.75)',X+8+i*(Wd-16)/8,Y+Hd-5,1.4);
  g.save(); g.fillStyle='#ffe08a'; g.font='bold 15px sans-serif'; g.textAlign='center'; g.textBaseline='middle';
  g.strokeStyle='#1a2a4a'; g.lineWidth=3; g.strokeText(L.sign.shiomi,X+Wd/2,Y+Hd/2+1,Wd-14); g.fillText(L.sign.shiomi,X+Wd/2,Y+Hd/2+1,Wd-14); g.restore();
  // 小さな観覧車の絵
  g.strokeStyle='rgba(255,224,138,.8)'; g.lineWidth=1; g.beginPath(); g.arc(X+12,Y+Hd/2,7,0,Math.PI*2); g.stroke();
}

/* ---------- 観覧車広場 ---------- */
function drawWheelMap(g,scene){
  const r=rng(71);
  // 空（上の段）と海の水平線
  const sky=g.createLinearGradient(0,0,0,5*TS);
  sky.addColorStop(0,'#7aa8d0'); sky.addColorStop(.7,'#d8c8a8'); sky.addColorStop(1,'#e8c890');
  g.fillStyle=sky; g.fillRect(0,0,PW,5*TS);
  R(g,'#5a86a8',0,4.2*TS,PW,.8*TS); for(let i=0;i<40;i++) R(g,'rgba(255,255,255,.25)',r()*PW,4.25*TS+r()*.7*TS,6+r()*10,1);
  for(const [x,y,w] of [[1.5,.9,2.4],[16.6,.5,2.2],[6,.3,1.6]]) E(g,'rgba(255,255,255,.55)',x*TS,y*TS,w*TS/2,9);
  // 地面：広場の敷石
  for(let y=5;y<15;y++) for(let x=0;x<20;x++){
    R(g,(x+y)%2?'#d8cbb0':'#cfc2a6',x*TS,y*TS,TS,TS);
    R(g,'rgba(0,0,0,.06)',x*TS,y*TS+TS-1,TS,1); R(g,'rgba(0,0,0,.05)',x*TS+TS-1,y*TS,1,TS);
  }
  for(let i=0;i<260;i++) R(g,r()<.5?'rgba(0,0,0,.05)':'rgba(255,255,255,.08)',r()*PW,5*TS+r()*10*TS,2,2);
  // 芝生（左上・広場のふち）
  for(const [x,y,w,h] of [[1,1,3,4],[1,6,3,1],[18,7,1,6]]){
    R(g,'#7aa05a',x*TS,y*TS,w*TS,h*TS);
    for(let i=0;i<w*h*10;i++) R(g,r()<.5?'#6a9050':'#8ab06a',x*TS+r()*w*TS,y*TS+r()*h*TS,2,3);
  }
  // 観覧車：支柱
  const hub=[F7W.cx*TS,F7W.cy*TS];
  g.strokeStyle='#8a9098'; g.lineWidth=6; g.lineCap='round';
  for(const fx of [6.6,13.4]){g.beginPath(); g.moveTo(...hub); g.lineTo(fx*TS,5.2*TS); g.stroke();}
  g.strokeStyle='#6a7078'; g.lineWidth=2;
  for(const fx of [6.6,13.4]) for(let k=1;k<4;k++){const t=k/4; g.beginPath(); g.moveTo(hub[0]+(fx*TS-hub[0])*t-8,hub[1]+(5.2*TS-hub[1])*t); g.lineTo(hub[0]+(fx*TS-hub[0])*t+8,hub[1]+(5.2*TS-hub[1])*t); g.stroke();}
  // 輪とスポーク
  const R0=F7W.r*TS;
  g.strokeStyle='#e8e4dc'; g.lineWidth=4; g.beginPath(); g.arc(...hub,R0,0,Math.PI*2); g.stroke();
  g.strokeStyle='#c8c4bc'; g.lineWidth=2; g.beginPath(); g.arc(...hub,R0-10,0,Math.PI*2); g.stroke();
  g.lineWidth=1.4;
  for(let k=0;k<24;k++){const a=k/24*Math.PI*2; g.beginPath(); g.moveTo(...hub); g.lineTo(hub[0]+Math.cos(a)*R0,hub[1]+Math.sin(a)*R0); g.stroke();}
  for(let k=0;k<12;k++){const a=(90+k*30)*Math.PI/180; C(g,'#f4d06a',hub[0]+Math.cos(a)*R0,hub[1]+Math.sin(a)*R0,2.2);}   // 電飾（消えている）
  C(g,'#9aa0a8',...hub,14); C(g,'#6a7078',...hub,8);
  // ゴンドラ：12台。探索では7番が乗り場（真下）に止まっている。推理シーンでは、7番は小道具として別に描く
  for(let k=0;k<12;k++){
    const a=90+k*30+(scene?15:0), [x,y]=f7GondolaAt(a);
    if(y<-12) continue;
    const num=((7-1-k)%12+12)%12+1;   // 真下が7番。時計回りに番号が下がる
    f7DrawGondola(g,x,y,num,false);
  }
  // 乗り場（8〜11,5〜6）：板張りの床と、黄色いふち
  R(g,'#a88a62',8*TS,5*TS,4*TS,2*TS); for(let x=8*TS;x<12*TS;x+=8) R(g,'rgba(0,0,0,.12)',x,5*TS,1,2*TS);
  R(g,'#f0c840',8*TS,5*TS+2,4*TS,3); R(g,'rgba(0,0,0,.25)',8*TS,7*TS-2,4*TS,2);
  R(g,'#8a6a42',8*TS,5*TS-6,4*TS,6);   // 屋根のふち
  f7Plate(g,L.sign.noriba,10*TS-26,6*TS+16,52,'#c83a2a');
  if(!scene){
    // 7番（乗り場に止めてある）
    const [x,y]=f7GondolaAt(90); f7DrawGondola(g,x,y,7,false);
  }
  // 操作室（5〜6,5〜6）：小屋・窓・赤いランプ・風速計
  RR(g,'#e8e0cc',5*TS+2,5*TS-2,2*TS-4,2*TS,3); R(g,'#c84a3a',5*TS,5*TS-8,2*TS,8);   // 壁と屋根
  R(g,'#a83a2a',5*TS,5*TS-2,2*TS,2);
  RR(g,'#9ac8dc',5*TS+8,5*TS+6,2*TS-16,14,2); R(g,'rgba(255,255,255,.5)',5*TS+10,5*TS+8,10,3);   // 窓
  R(g,'#3a3a3e',5*TS+10,6*TS+6,12,10); R(g,'#e8e4d8',5*TS+12,6*TS+8,8,6); g.strokeStyle='#c83a2a'; g.lineWidth=1; g.beginPath(); g.moveTo(5*TS+12,6*TS+12); g.lineTo(5*TS+15,6*TS+11); g.lineTo(5*TS+20,6*TS+12); g.stroke();   // 記録紙
  R(g,'#4a4e56',6*TS+4,6*TS+6,22,12); C(g,'#e04a3a',6*TS+10,6*TS+12,2.5); C(g,'#3ac06a',6*TS+18,6*TS+12,2.5);   // 操作盤
  C(g,'#e04a3a',5.5*TS,5*TS-12,4); glow(g,5.5*TS,5*TS-12,12,'rgba(255,80,60,.4)');   // 赤いランプ
  R(g,'#6a7078',6.4*TS,4*TS-4,2,TS-2);   // 風速計の柱
  g.strokeStyle='#6a7078'; g.lineWidth=1.2; g.beginPath(); g.moveTo(6.4*TS-8,4*TS-4); g.lineTo(6.4*TS+10,4*TS-4); g.moveTo(6.4*TS+1,4*TS-12); g.lineTo(6.4*TS+1,4*TS+4); g.stroke();
  for(const [dx,dy] of [[-8,0],[10,0],[1,-8],[1,8]]) C(g,'#c8ccd2',6.4*TS+dx,4*TS-4+dy,2.4);
  f7Plate(g,L.sign.sousa,5*TS+4,7*TS+2,2*TS-8);
  // 公衆電話（12,6）
  R(g,'#5a5e66',12*TS+14,6*TS+14,4,TS-14);
  RR(g,'#2a7a4a',12*TS+5,6*TS+2,TS-10,16,3); RR(g,'#3a9a5a',12*TS+8,6*TS+5,TS-16,10,2); R(g,'#1a4a2a',12*TS+9,6*TS+4,4,12);
  R(g,'#d8d0b8',12*TS+3,6*TS-2,TS-6,4);
  // 機械室（13〜17,1〜6）：平らな屋根と点検口、正面の壁と扉（15,6）
  R(g,'#8a8e94',13*TS,1*TS,5*TS,3*TS); for(let i=0;i<120;i++) R(g,'rgba(0,0,0,.08)',13*TS+r()*5*TS,TS+r()*3*TS,2,2);
  R(g,'#a8acb2',13*TS,1*TS,5*TS,3); R(g,'#6a6e74',13*TS,4*TS-3,5*TS,3);
  RR(g,'#5a5e64',16.5*TS,2.1*TS,TS*.9,TS*.8,2); R(g,'#3a3e44',16.5*TS+4,2.1*TS+4,TS*.9-8,TS*.8-8);   // 点検口
  g.strokeStyle='#d8dce2'; g.lineWidth=1.5; g.beginPath(); g.moveTo(13*TS+2,1*TS+2); g.lineTo(13*TS+2,4*TS-2); g.stroke();   // 手すり（観覧車の側）
  for(let y=1*TS+6;y<4*TS;y+=10) R(g,'#d8dce2',13*TS,y,5,1.4);
  f7Wall(g,13,4,5,3,'#b8b2a4');
  for(let y=4*TS+8;y<7*TS;y+=12) R(g,'rgba(0,0,0,.08)',13*TS,y,5*TS,1);
  R(g,'#5a6068',15*TS+3,5.6*TS,TS-6,1.4*TS); R(g,'#6a7078',15*TS+5,5.6*TS+2,TS-10,1.4*TS-4); C(g,'#c8ccd2',15.75*TS,6.4*TS,1.6);   // 鉄の扉
  R(g,'#e8d040',15*TS+6,5.35*TS,TS-12,5); for(let x=15*TS+6;x<16*TS-6;x+=6) R(g,'#2a2a2a',x,5.35*TS,3,5);   // 注意の帯
  f7Plate(g,L.sign.kikai,13.4*TS,4.4*TS,1.6*TS,'#4a4e56');
  for(let k=0;k<3;k++) R(g,'#8a9098',13.6*TS+k*14,5.5*TS,10,8);   // 換気口
  // 屋上へのはしご（18,3〜5）
  for(const dx of [6,TS-6]) R(g,'#7a7e86',18*TS+dx-1,2.4*TS,2,3.6*TS);
  for(let y=2.6*TS;y<6*TS;y+=7) R(g,'#7a7e86',18*TS+6,y,TS-12,1.6);
  // 看板（屋上の左。観覧車の右下を通るゴンドラを隠す）
  f7Billboard(g);
  // 時計塔（2,4〜5）
  R(g,'#5a4a3a',2*TS+12,3.4*TS,8,2.6*TS); C(g,'#3a2e24',2.5*TS,3.6*TS,12); C(g,'#f4ecd8',2.5*TS,3.6*TS,10);
  g.strokeStyle='#2a2a2a'; g.lineWidth=1.6; g.beginPath(); g.moveTo(2.5*TS,3.6*TS); g.lineTo(2.5*TS-3,3.6*TS+5); g.moveTo(2.5*TS,3.6*TS); g.lineTo(2.5*TS+1,3.6*TS-8); g.stroke();
  // 見張りの場所（9,10）：チョークの印
  g.strokeStyle='rgba(255,255,255,.7)'; g.lineWidth=1.5; g.beginPath();
  g.moveTo(9*TS+9,10*TS+9); g.lineTo(9*TS+23,10*TS+23); g.moveTo(9*TS+23,10*TS+9); g.lineTo(9*TS+9,10*TS+23); g.stroke();
  // メリーゴーラウンド（1〜4,10〜13）：上から見た縞の屋根
  const mx=3*TS, my=12*TS, mr=1.9*TS;
  for(let k=0;k<16;k++){
    const a0=k/16*Math.PI*2, a1=(k+1)/16*Math.PI*2;
    g.fillStyle=k%2?'#f4ecd8':'#e05a6a'; g.beginPath(); g.moveTo(mx,my); g.arc(mx,my,mr,a0,a1); g.closePath(); g.fill();
  }
  g.strokeStyle='#c9a45a'; g.lineWidth=2; g.beginPath(); g.arc(mx,my,mr,0,Math.PI*2); g.stroke();
  for(let k=0;k<16;k++){const a=k/16*Math.PI*2; C(g,'#ffe08a',mx+Math.cos(a)*mr,my+Math.sin(a)*mr,1.6);}
  C(g,'#c9a45a',mx,my,6); C(g,'#e05a6a',mx,my,3);
  // ソフトクリームの売店（6〜7,13）
  RR(g,'#f4ecd8',6*TS+2,13*TS,2*TS-4,TS-2,3); R(g,'#e88aa8',6*TS,13*TS-4,2*TS,7);
  for(let x=6*TS;x<8*TS;x+=8) R(g,'#f4ecd8',x,13*TS-4,4,7);
  E(g,'#d8b070',7*TS,13*TS+16,4,6); C(g,'#fff8ec',7*TS,13*TS+9,5); C(g,'#fff8ec',7*TS,13*TS+5,3.4);
  f7Plate(g,L.sign.softcream,6*TS+6,12*TS+18,2*TS-12,'#e88aa8','#3a2a2a');
  // ベンチ（15〜17,11）
  RR(g,'#8a5a3a',15*TS+3,11*TS+8,3*TS-6,TS-14,3); for(let x=15*TS+12;x<18*TS-6;x+=12) R(g,'rgba(0,0,0,.2)',x,11*TS+8,1,TS-14);
  for(let i=0;i<3;i++) R(g,'#e8e4dc',15.6*TS+i*9,12*TS+4,5,1.4);   // 吸いがら
  // 花壇（13〜18,13）
  R(g,'#8a6a4a',13*TS,13*TS+2,6*TS,TS-4);
  for(let i=0;i<36;i++){const x=13*TS+6+(i%18)*10.4, y=13*TS+9+((i/18)|0)*10; C(g,'#4a8a3a',x,y+2,2.4); C(g,['#e85a6a','#f0c840','#f4ecd8'][i%3],x,y,2.2);}
  // 街灯
  for(const [x,y] of [[8,8],[12,8],[8,12],[12,12]]){C(g,'rgba(0,0,0,.2)',x*TS,y*TS+4,5); R(g,'#3a4a5a',x*TS-1.5,y*TS-14,3,18); C(g,'#f4ecd8',x*TS,y*TS-15,4);}
  // 柵（左右と下）と、管理棟への門（9〜10,14）
  for(const x of [0,19]){R(g,'#b8c4cc',x*TS,5*TS,TS,10*TS); for(let y=5*TS;y<15*TS;y+=8) R(g,'#f4f4f0',x*TS+10,y,TS-20,6);}
  R(g,'#b8c4cc',0,14*TS,PW,TS); for(let x=0;x<PW;x+=8) if(x<9*TS||x>=11*TS) R(g,'#f4f4f0',x,14*TS+8,6,TS-14);
  R(g,'#8a9aa4',9*TS,14*TS,2*TS,TS); R(g,'#5a6a74',9*TS+2,14*TS+4,2*TS-4,TS-6);
  for(let x=9*TS+6;x<11*TS-4;x+=6) R(g,'#c8d4dc',x,14*TS+6,2,TS-10);
  f7Plate(g,L.sign.kanri,9*TS+6,13*TS+18,2*TS-12,'#2a4a6a');
  vignette(g,.22);
}
// シーン用の観覧車に置く7番のゴンドラ（看板の陰に入ったら、看板を上に描き直して隠す）
PROP_DRAW.gondola=(g,x,y)=>{
  f7DrawGondola(g,x,y,7,true);
  const b=F7BB;
  if(x>b.x*TS-14&&x<(b.x+b.w)*TS+14&&y>b.y*TS-12&&y<(b.y+b.h)*TS+12){
    // 看板の陰：看板を半分透かして描き直し、ゴンドラの輪郭だけを点線で残す（見張りからは見えない、と分かるように）
    g.save(); g.globalAlpha=.7; f7Billboard(g); g.restore();
    g.save(); g.setLineDash([3,3]); g.strokeStyle='#ffd66a'; g.lineWidth=1.4;
    g.beginPath(); g.roundRect(x-13,y-10,26,22,7); g.stroke(); g.restore();
  }
};

/* ---------- 管理棟 ---------- */
function f7Floor(g,x,y,w,h,c1,c2,s=16){
  for(let yy=y*TS;yy<(y+h)*TS;yy+=s) for(let xx=x*TS;xx<(x+w)*TS;xx+=s) R(g,((xx+yy)/s)%2?c1:c2,xx,yy,s,s);
}
function drawParkOffice(g){
  const r=rng(72);
  // 床：廊下は市松のリノリウム、事務室は板、応接室はじゅうたん、控室・放送室はリノリウム
  f7Floor(g,0,0,20,15,'#d8d4c8','#c8c4b8');
  for(let yy=TS;yy<5*TS;yy+=8){R(g,(yy/8)%2?'#a8865e':'#9e7e58',TS,yy,5*TS,8); R(g,'rgba(0,0,0,.12)',TS,yy+7,5*TS,1);}
  R(g,'#6a3a3a',14*TS,1*TS,5*TS,4*TS); for(let i=0;i<160;i++) R(g,'rgba(0,0,0,.08)',14*TS+r()*5*TS,TS+r()*4*TS,2,2);
  f7Floor(g,1,11,5,3,'#b8c4c8','#a8b4b8'); f7Floor(g,14,11,5,3,'#c4bca8','#b4ac98');
  // 壁（MAPDEF.office と同じ位置）
  for(const [x,y,w,h] of [[0,0,20,1],[0,0,1,15],[19,0,1,15],[0,14,20,1],
    [6,1,1,5],[1,5,2,1],[4,5,2,1],[13,1,1,5],[14,5,2,1],[17,5,2,1],
    [1,10,6,1],[6,11,1,1],[6,13,1,1],[13,10,6,1],[13,11,1,1],[13,13,1,1]]) f7Wall(g,x,y,w,h);
  for(const [x,y] of [[3,5],[16,5]]) R(g,'#8a8478',x*TS+2,y*TS+TS/2-1,TS-4,2);
  for(const [x,y] of [[6,12],[13,12]]) R(g,'#8a8478',x*TS+TS/2-1,y*TS+2,2,TS-4);
  // 広場への扉（9〜10,0）
  R(g,'#5a7a8a',9*TS,0,2*TS,TS-2); R(g,'#9ac8dc',9*TS+4,3,2*TS-8,TS-8); R(g,'#5a7a8a',10*TS-1,3,2,TS-8);
  f7Plate(g,L.sign.toWheel,9*TS+4,TS+2,2*TS-8);
  // 事務室：受付の机と予約帳（2,1）・書類棚（5,1）
  RR(g,'#7a5a3a',TS+2,TS+2,3*TS-4,TS-4,2);
  R(g,'#2a4a6a',2*TS+6,TS+7,18,13); R(g,'#f4ecd8',2*TS+8,TS+9,14,9); R(g,'#c83a2a',2*TS+22,TS+7,2,13);   // 予約帳
  for(let i=0;i<4;i++) R(g,['#e8c84a','#6ab0d8','#e86a5a','#7ac08a'][i],3*TS+4+i*6,TS+8,4,12);   // パンフレット
  RR(g,'#6a6e74',5*TS+3,TS+1,TS-6,TS-3,2); for(let i=0;i<3;i++) R(g,'#8a8e94',5*TS+6,TS+5+i*8,TS-12,5);
  f7Plate(g,L.sign.jimu7,1.4*TS,4*TS+18,1.8*TS);
  // 応接室：ソファ（14,1）・机と録音機（15〜16,2）・窓の下の棚（18,1〜3）
  RR(g,'#4a3a5a',14*TS+3,TS+3,TS-6,TS-4,4); RR(g,'#5a4a6a',14*TS+6,TS+6,TS-12,TS-12,3);
  RR(g,'#5a3a24',15*TS+2,2*TS+3,2*TS-4,TS-6,3); R(g,'rgba(255,255,255,.08)',15*TS+4,2*TS+5,2*TS-8,2);
  RR(g,'#2a2a2e',15*TS+10,2*TS+8,20,13,2); C(g,'#8a8e94',15*TS+15,2*TS+14,3); C(g,'#8a8e94',15*TS+25,2*TS+14,3); C(g,'#e04a3a',15*TS+28,2*TS+10,1.3);   // 録音機
  RR(g,'#e8e4dc',16*TS+12,2*TS+10,10,8,1);   // 湯のみ
  R(g,'#6a5a48',18*TS+4,TS+2,TS-8,3*TS-4); for(let i=0;i<3;i++) R(g,'#7a6a58',18*TS+6,TS+6+i*TS,TS-12,TS-12);
  R(g,'#9ac8dc',19*TS+4,TS+4,TS-8,3*TS-8); R(g,'rgba(255,200,140,.35)',19*TS+4,TS+4,TS-8,3*TS-8);   // 窓（夕日）
  f7Plate(g,L.sign.ousetsu,13.6*TS,4*TS+18,1.8*TS);
  // 廊下：迷子センター（1〜3,7）・自動販売機（18,7）・観葉植物・掲示板
  RR(g,'#e8c84a',TS+1,7*TS+3,3*TS-2,TS-6,3); R(g,'#f4ecd8',TS+4,7*TS+6,3*TS-8,TS-14);
  R(g,'#2a2a2e',2*TS+2,7*TS+8,10,8);   // マイク台
  f7Plate(g,L.sign.maigo,TS+6,6*TS+12,3*TS-12,'#c86a2a');
  RR(g,'#c83a3a',18*TS+3,7*TS-6,TS-6,TS+4,2); R(g,'#e8e4dc',18*TS+6,7*TS-2,TS-12,10);
  for(let i=0;i<4;i++) R(g,['#6ab0d8','#e8c84a','#7ac08a','#e86a5a'][i],18*TS+7+i*5,7*TS,3,6);
  for(const [x,y] of [[8,9],[11,9]]){RR(g,'#8a5a3a',x*TS+8,y*TS+14,TS-16,TS-16,3); for(let k=0;k<7;k++){const a=k/7*Math.PI*2; E(g,'#4a8a3a',x*TS+TS/2+Math.cos(a)*7,y*TS+12+Math.sin(a)*6,5,3,a);}}
  R(g,'#8a6a4a',14*TS,6*TS-10,3*TS,8);   // 掲示板の枠
  for(let i=0;i<4;i++) R(g,['#f4ecd8','#e8c84a','#9ac8dc','#f4ecd8'][i],14*TS+6+i*22,6*TS-9,16,6);
  // 控室：机（2〜3,11）・ロッカー（1〜4,13）
  RR(g,'#8a8478',2*TS+2,11*TS+5,2*TS-4,TS-10,2); RR(g,'#e8e4dc',2.6*TS,11.4*TS,8,7,1);
  for(let x=1;x<5;x++){RR(g,'#7a8a9a',x*TS+2,13*TS+1,TS-4,TS-3,1); R(g,'#5a6a7a',x*TS+TS/2-1,13*TS+4,2,TS-8); R(g,'#f4ecd8',x*TS+8,13*TS+4,12,5);}
  f7Plate(g,L.sign.hikae,1.4*TS,9*TS+20,2*TS);
  // 放送室：机とマイク（15〜16,11）・景品の棚（18,11〜12）
  RR(g,'#5a4a3a',15*TS+2,11*TS+4,2*TS-4,TS-8,2); R(g,'#2a2a2e',15*TS+10,11*TS+8,24,10); C(g,'#8a8e94',16.5*TS,11*TS+10,3);
  R(g,'#6a5a48',18*TS+3,11*TS,TS-6,2*TS);
  for(let i=0;i<6;i++) RR(g,['#e88aa8','#6ab0d8','#e8c84a','#7ac08a','#c88ad0','#f4ecd8'][i],18*TS+6+(i%2)*10,11*TS+4+((i/2)|0)*20,8,14,2);
  f7Plate(g,L.sign.hoso,14.4*TS,9*TS+20,2*TS);
  // 正面玄関（9〜10,14）：ガラスの扉
  R(g,'#5a7a8a',9*TS,14*TS,2*TS,TS); R(g,'#9ac8dc',9*TS+4,14*TS+3,2*TS-8,TS-6); R(g,'#5a7a8a',10*TS-1,14*TS+3,2,TS-6);
  R(g,'rgba(255,200,140,.3)',9*TS+4,14*TS+3,2*TS-8,TS-6);
  vignette(g,.18);
}

Object.assign(DRAWERS,{wheel:g=>drawWheelMap(g,false),wheelS:g=>drawWheelMap(g,true),parkOffice:drawParkOffice});
