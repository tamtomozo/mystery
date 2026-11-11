/* 背景：FILE.02（展示室・1階廊下・監視カメラの視点）と小道具 */
'use strict';

/* ---------- 小道具：スタンド花（cx,cy は中心のピクセル座標） ---------- */
function drawFlowerStand(g,cx,cy){
  E(g,'rgba(0,0,0,.35)',cx+2,cy+12,13,5);
  R(g,'#8a7a5a',cx-1,cy-2,2,14); R(g,'#8a7a5a',cx-9,cy+10,18,2);
  C(g,'#2c5228',cx,cy-4,13);
  const cols=['#e8a0b4','#f4f0e6','#e3c26a','#d97a8a','#f4f0e6'];
  for(let i=0;i<11;i++){const a=i/11*Math.PI*2, r=i%2?8:5; C(g,cols[i%cols.length],cx+Math.cos(a)*r,cy-4+Math.sin(a)*r,3.3);}
  C(g,'#f6f2e8',cx,cy-4,3.2);
  R(g,'#b22a3a',cx-2,cy+2,4,9); R(g,'#f6f0e2',cx+4,cy-1,6,11);   // リボンと「祝 開幕」の札
}
PROP_DRAW.flower=drawFlowerStand;

/* ---------- 共通の部品 ---------- */
// 石張りの床
function stoneFloor(g,x0,y0,w,h,c1,c2,seed){
  const r=rng(seed);
  for(let y=y0;y<y0+h;y+=TS) for(let x=x0;x<x0+w;x+=TS){
    R(g,((x/TS+y/TS)|0)%2?c1:c2,x,y,TS,TS);
    R(g,'rgba(255,255,255,.035)',x,y,TS,1); R(g,'rgba(0,0,0,.25)',x,y+TS-1,TS,1); R(g,'rgba(0,0,0,.18)',x+TS-1,y,1,TS);
    if(r()<.35) R(g,'rgba(255,255,255,.025)',x+r()*20,y+r()*20,6+r()*8,1);
  }
}
// 額縁つきの絵
function painting(g,x,y,w,h,c){
  RR(g,'#7a5a2a',x,y,w,h,1); R(g,'#2a2018',x+3,y+3,w-6,h-6); R(g,c,x+4,y+4,w-8,h-8);
  R(g,'rgba(255,255,255,.08)',x+4,y+4,w-8,3);
}

/* ---------- 展示室 ---------- */
function drawGallery(g){
  const r=rng(23);
  stoneFloor(g,0,0,PW,PH,'#2b2832','#26232c',23);
  // 壁
  const wc='#3a3341';
  R(g,wc,0,0,PW,TS); R(g,wc,0,14*TS,PW,TS); R(g,wc,0,0,TS,PH); R(g,wc,19*TS,0,TS,PH);
  R(g,'#4a3a2c',TS,TS-7,PW-2*TS,7); R(g,'#5a4634',TS,TS-7,PW-2*TS,2);
  R(g,'#1d1a22',TS,14*TS,PW-2*TS,4); R(g,'#2c2733',TS-4,TS,4,PH-2*TS); R(g,'#2c2733',19*TS,TS,4,PH-2*TS);
  // 壁の絵とポスター
  painting(g,5.2*TS,4,TS*1.5,TS-12,'#4a5a3a'); painting(g,12.3*TS,4,TS*1.5,TS-12,'#5a3a3a');
  R(g,'#16223e',9*TS+3,3,TS-6,TS-9); C(g,'#3a6bd0',9.5*TS,TS*.42,5); C(g,'#9cc0ff',9.5*TS-1.5,TS*.42-1.5,1.5);
  R(g,'#d6b061',9*TS+6,TS-11,TS-12,1.5);
  // 窓（左の壁・はめ殺し）
  R(g,'#bfb6a4',4,6*TS+4,TS-14,2*TS-8); R(g,'#5d7f95',7,6*TS+8,TS-20,2*TS-16); R(g,'#bfb6a4',4,7*TS-1,TS-14,2);
  g.fillStyle='rgba(170,200,225,.05)'; g.beginPath(); g.moveTo(TS,6*TS+4); g.lineTo(4*TS,5*TS); g.lineTo(4*TS,9*TS); g.lineTo(TS,8*TS-4); g.fill();
  // 出入口（下の壁 → 廊下）
  R(g,'#121016',9*TS+2,14*TS+2,TS-4,TS-2); R(g,'#c9a45a',9*TS,14*TS,2,TS); R(g,'#c9a45a',10*TS-2,14*TS,2,TS);
  glow(g,9.5*TS,14.4*TS,30,'rgba(255,240,210,.08)');
  // 小さな展示ケース（上の壁ぎわ）
  for(const [x,w] of [[2,3],[15,3]]){
    RR(g,'#1c1a20',x*TS+2,TS+4,w*TS-4,TS-8,3); R(g,'rgba(170,200,230,.16)',x*TS+5,TS+7,w*TS-10,TS-14);
    for(let i=0;i<w*2;i++) C(g,['#d6b061','#c9c9d6','#b0485a'][i%3],x*TS+14+i*14,1.5*TS,2.2);
  }
  // 観葉植物
  for(const [px,py] of [[1,13],[18,1]]){C(g,'#5e4226',(px+.5)*TS,(py+.5)*TS,10); for(let i=0;i<7;i++){const a=i/7*Math.PI*2; E(g,i%2?'#2f5a2c':'#3d7037',(px+.5)*TS+Math.cos(a)*8,(py+.5)*TS+Math.sin(a)*8,8,4,a);}}
  // ケースの台（濃紺の絨毯）とロープ
  RR(g,'#1b2340',7.6*TS,4.7*TS,4.8*TS,3.6*TS,6);
  g.strokeStyle='rgba(201,164,90,.55)'; g.lineWidth=1.5; g.strokeRect(7.6*TS+5,4.7*TS+5,4.8*TS-10,3.6*TS-10);
  const posts=[[7.9,5],[12.1,5],[7.9,8],[12.1,8]];
  g.strokeStyle='#8a2a2a'; g.lineWidth=2; g.beginPath();
  g.moveTo(posts[0][0]*TS,posts[0][1]*TS); g.quadraticCurveTo(10*TS,5.25*TS,posts[1][0]*TS,posts[1][1]*TS);
  g.moveTo(posts[2][0]*TS,posts[2][1]*TS); g.quadraticCurveTo(10*TS,8.25*TS,posts[3][0]*TS,posts[3][1]*TS); g.stroke();
  for(const [px,py] of posts){C(g,'#5a4a2a',px*TS,py*TS,4); C(g,'#d6b061',px*TS,py*TS,2.6);}
  // スポットライト
  glow(g,10*TS,6.5*TS,110,'rgba(255,238,200,.13)');
  // 展示ケース（9〜10,6）
  RR(g,'#15131a',9*TS+3,6*TS+3,2*TS-6,TS-4,4);
  RR(g,'#24212b',9*TS+5,6*TS+2,2*TS-10,TS-8,3);
  R(g,'rgba(180,215,240,.22)',9*TS+7,6*TS+4,2*TS-14,TS-12); R(g,'rgba(255,255,255,.25)',9*TS+8,6*TS+5,2*TS-16,1.5);
  RR(g,'#3a3058',10*TS-9,6.5*TS-6,18,12,3);
  C(g,'#d8d0e8',10*TS,6.5*TS,6.5); C(g,'#2f5fcf',10*TS,6.5*TS,5); C(g,'#7aa8ff',10*TS-1.5,6.5*TS-1.5,2); C(g,'#e6f0ff',10*TS-2,6.5*TS-2.4,.9);
  R(g,'#d6b061',9*TS+5,7*TS-5,2*TS-10,2);
  R(g,'#2a2630',10*TS-5,7*TS-3,10,3); C(g,'#5ad07a',10*TS+3,7*TS-1.5,1);   // 電子錠のパネル
  // 布をかけたパネル（イーゼル）
  R(g,'#5a4026',12*TS+6,5*TS+20,2,11); R(g,'#5a4026',13*TS-8,5*TS+20,2,11);
  RR(g,'#e9e4d8',12*TS+3,5*TS+2,TS-6,TS-8,2);
  g.strokeStyle='rgba(120,110,95,.4)'; g.lineWidth=1; g.beginPath();
  g.moveTo(12*TS+9,5*TS+4); g.lineTo(12*TS+7,6*TS-7); g.moveTo(12*TS+17,5*TS+4); g.lineTo(12*TS+18,6*TS-7); g.moveTo(12*TS+24,5*TS+4); g.lineTo(12*TS+26,6*TS-7); g.stroke();
  // ベンチ
  RR(g,'#4a3626',4*TS+3,10*TS+8,2*TS-6,TS-16,3); for(let x=4*TS+8;x<6*TS-6;x+=7) R(g,'rgba(0,0,0,.25)',x,10*TS+8,1,TS-16);
  // ミュージアムショップ（棚とレジ）
  R(g,'#2e2a26',13.6*TS,11.6*TS,5.4*TS,2.4*TS);
  RR(g,'#4a3626',14*TS+2,13*TS+2,3*TS-4,TS-4,2);
  for(let i=0;i<10;i++){const x=14*TS+10+i*8.6; C(g,'#d8d0e8',x,13*TS+11,3); C(g,'#3a6bd0',x,13*TS+11,2.2); C(g,'#d8d0e8',x+4,13*TS+21,3); C(g,'#3a6bd0',x+4,13*TS+21,2.2);}
  RR(g,'#5a4430',18*TS+3,12*TS+2,TS-6,2*TS-4,3); R(g,'#1d1d22',18*TS+8,12*TS+8,TS-16,10); R(g,'#7cd28a',18*TS+10,12*TS+10,TS-20,3);
  g.fillStyle='#d6b061'; g.font='bold 9px sans-serif'; g.fillText('MUSEUM SHOP',14.2*TS,12.1*TS);
  for(let i=0;i<40;i++) R(g,'rgba(255,240,210,.03)',r()*PW,r()*PH,1.5,1.5);
  vignette(g,.4);
}

/* ---------- 1階廊下（管理エリア） ---------- */
function drawHall(g){
  // 床：廊下はリノリウム、警備室はタイル、学芸員室は木
  stoneFloor(g,0,0,PW,PH,'#4a4a47','#454542',41);
  stoneFloor(g,TS,6*TS,6*TS,8*TS,'#3b4045','#363b40',42);
  for(let y=6*TS;y<14*TS;y+=10){R(g,(y/10)%2?'#5c4834':'#56432f',13*TS,y,6*TS,10); R(g,'rgba(0,0,0,.2)',13*TS,y+9,6*TS,1);}
  // 外壁
  const wc='#2c2b31';
  R(g,wc,0,0,PW,TS); R(g,wc,0,14*TS,PW,TS); R(g,wc,0,0,TS,PH); R(g,wc,19*TS,0,TS,PH);
  R(g,'#3c3a42',TS,TS-5,PW-2*TS,5);
  // 仕切りの壁（MAPDEF.hall の solids と同じ位置）
  const wall=(x,y,w,h)=>{R(g,'#2a292f',x*TS,y*TS,w*TS,h*TS); R(g,'#45434c',x*TS,y*TS,w*TS,4);};
  wall(1,5,3,1); wall(5,5,3,1); wall(12,5,3,1); wall(16,5,3,1); wall(7,6,1,8); wall(12,6,1,8);
  g.fillStyle='#cfc8b8'; g.font='bold 10px sans-serif';
  g.fillText(L.sign.security,1.3*TS,5.65*TS); g.fillText(L.sign.curator,16.15*TS,5.65*TS);
  // 展示室の入口（上の壁）
  R(g,'#141218',9*TS+2,2,TS-4,TS-4); R(g,'#c9a45a',9*TS,0,2,TS); R(g,'#c9a45a',10*TS-2,0,2,TS);
  glow(g,9.5*TS,.6*TS,30,'rgba(255,240,210,.1)');
  // 監視カメラ（上の壁）
  RR(g,'#d0d0d4',13*TS+8,6,16,9,2); R(g,'#1d1d22',13*TS+5,8,4,5); C(g,'#e04a3a',13*TS+20,10,1.5);
  // スタンド花
  drawFlowerStand(g,11.5*TS,1.5*TS);
  // 階段（右端）
  R(g,'#38363c',18*TS,TS,TS,3*TS); for(let y=TS+4;y<4*TS;y+=8) R(g,'#55525a',18*TS+2,y,TS-4,3);
  // 警備室：モニターの机・録画装置・キーボックス・ロッカー
  RR(g,'#4a4f56',TS+2,7*TS+2,3*TS-4,TS-4,2);
  for(const x of [1.5,2.5]){R(g,'#1a1d20',x*TS-10,7*TS+3,20,14); R(g,'#4d6e5a',x*TS-8,7*TS+5,16,10); R(g,'rgba(200,255,210,.15)',x*TS-8,7*TS+5,16,2);}
  R(g,'#1d1f24',3*TS+4,7*TS+6,TS-10,16); C(g,'#e04a3a',3*TS+9,7*TS+11,1.4); C(g,'#5ad07a',3*TS+14,7*TS+11,1.4); R(g,'#e9e2d0',3*TS+8,7*TS+17,12,3);
  RR(g,'#2a2d33',2*TS+6,8*TS+4,TS-12,TS-12,5);
  RR(g,'#6a6050',2,10*TS+4,10,TS-8,2); for(let i=0;i<3;i++){C(g,'#d6b061',6,10*TS+10+i*6,1.5);}
  RR(g,'#5a6068',6*TS+3,6*TS+2,TS-6,TS-4,2); R(g,'rgba(0,0,0,.3)',6.5*TS-.5,6*TS+4,1,TS-8);
  // 学芸員室：机とパソコン・ファックス・資料棚
  RR(g,'#6b5238',14*TS+2,7*TS+3,2*TS-4,TS-6,3);
  R(g,'#1a1c20',14*TS+6,7*TS+4,18,13); R(g,'#5a7ea0',14*TS+8,7*TS+6,14,9);
  R(g,'#e9e2d0',15*TS+2,7*TS+8,12,14); R(g,'#e9e2d0',15*TS+6,7*TS+6,12,14); R(g,'#c9c2b2',15*TS+8,7*TS+10,8,1); R(g,'#c9c2b2',15*TS+8,7*TS+13,8,1);
  RR(g,'#2a2d33',14.5*TS-6,8*TS+4,TS-12,TS-12,5);
  RR(g,'#d4d0c6',18*TS+3,7*TS+5,TS-6,TS-10,2); R(g,'#2a2a2e',18*TS+6,7*TS+8,TS-12,4); R(g,'#f4f0e6',18*TS+8,7*TS+2,TS-16,6);
  RR(g,'#4a3626',18*TS+2,10*TS+1,TS-4,3*TS-2,2);
  for(let j=0;j<3;j++) for(let i=0;i<4;i++) R(g,['#7a2e2e','#2e4a6a','#6a5a2e','#d8d0c0'][(i+j)%4],18*TS+5+i*5.5,10*TS+5+j*TS,4,TS-10);
  // 通用口（下の壁）と出入りの記録簿
  R(g,'#1b1a1e',9*TS+2,14*TS+2,2*TS-4,TS-2); R(g,'#6a6a72',10*TS-1,14*TS+2,2,TS-2);
  R(g,'#e9e2d0',11*TS-12,14*TS+4,9,12); R(g,'#8a7a5a',11*TS-10,14*TS+3,5,2);
  g.fillStyle='#cfc8b8'; g.font='bold 9px sans-serif'; g.fillText(L.sign.staffExit,9.55*TS,13.85*TS);
  R(g,'rgba(255,250,235,.03)',0,0,PW,PH);
  vignette(g,.32);
}

/* ---------- 監視カメラの視点（展示室入口の前の廊下。シーン専用） ---------- */
function drawCam(g){
  // 奥の壁（展示室側）
  R(g,'#5a5560',0,0,PW,3.6*TS);
  for(let x=0;x<PW;x+=TS) R(g,'rgba(0,0,0,.12)',x,0,1,3.6*TS);
  R(g,'#6e5a44',0,3.1*TS,PW,.5*TS); R(g,'#806a52',0,3.1*TS,PW,3);
  // 展示室の入口（両開きの扉が開いている）
  R(g,'#17151b',8.5*TS,.9*TS,2*TS,2.7*TS); R(g,'#c9a45a',8.5*TS-3,.8*TS,3,2.8*TS); R(g,'#c9a45a',10.5*TS,.8*TS,3,2.8*TS); R(g,'#c9a45a',8.5*TS-3,.8*TS,2*TS+6,3);
  R(g,'#2a2730',8.6*TS,2.3*TS,1.8*TS,1.3*TS);
  g.fillStyle='#e8dcc0'; g.font='bold 9px sans-serif'; g.fillText(L.sign.gallery,9.05*TS,.62*TS);
  // ポスター
  R(g,'#16223e',3*TS,.7*TS,1.6*TS,2.1*TS); C(g,'#3a6bd0',3.8*TS,1.6*TS,8); C(g,'#9cc0ff',3.8*TS-2,1.6*TS-2,2.5);
  R(g,'#d6b061',3.2*TS,2.4*TS,1.2*TS,2);
  painting(g,15.3*TS,.9*TS,1.8*TS,1.5*TS,'#4a5a3a');
  // 廊下の床
  for(let y=3.6*TS;y<12*TS;y+=TS*.75){R(g,((y/(TS*.75))|0)%2?'#6a6964':'#64635e',0,y,PW,TS*.75); R(g,'rgba(0,0,0,.18)',0,y,PW,1);}
  R(g,'rgba(255,255,255,.05)',0,7*TS,PW,1.2*TS);
  // 手前の壁とベンチ
  R(g,'#3c3a42',0,12*TS,PW,3*TS); R(g,'#4a4852',0,12*TS,PW,4);
  RR(g,'#5a4430',5*TS,11.2*TS,3*TS,.7*TS,3);
  // 左右の案内
  g.fillStyle='#d8d4c8'; g.font='bold 10px sans-serif';
  g.fillText(L.sign.lobby,.4*TS,11.6*TS); g.fillText('STAFF ONLY →',16.4*TS,11.6*TS);
  vignette(g,.25);
}

Object.assign(DRAWERS,{gallery:drawGallery,hall:drawHall,cam:drawCam});
