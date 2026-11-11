/* 背景（書斎・庭・取調室）とキャッシュ */
'use strict';

/* ---------- 書斎 ---------- */
function drawStudy(g){
  const r=rng(11);
  for(let y=0;y<PH;y+=12){
    R(g,(y/12)%2?'#573927':'#4e3322',0,y,PW,12);
    let x=-r()*90; while(x<PW){x+=70+r()*90; R(g,'rgba(0,0,0,.3)',x,y,1.2,12);}
    R(g,'rgba(0,0,0,.22)',0,y+11,PW,1); R(g,'rgba(255,220,180,.05)',0,y,PW,1);
  }
  // 絨毯
  const rx=10*TS+4, ry=8*TS+4, rw=6*TS-8, rh=5*TS-8;
  R(g,'#5c1f22',rx,ry,rw,rh);
  g.strokeStyle='#a07a3a'; g.lineWidth=3; g.strokeRect(rx+7,ry+7,rw-14,rh-14);
  g.lineWidth=1; g.strokeStyle='rgba(160,122,58,.55)'; g.strokeRect(rx+14,ry+14,rw-28,rh-28);
  g.save(); g.translate(rx+rw/2,ry+rh/2); g.rotate(Math.PI/4); g.strokeRect(-18,-18,36,36); g.restore();
  // 窓からの光
  g.fillStyle='rgba(200,222,240,.07)'; g.beginPath();
  g.moveTo(9*TS,14*TS); g.lineTo(11*TS,14*TS); g.lineTo(12.6*TS,10.4*TS); g.lineTo(7.4*TS,10.4*TS); g.fill();
  // 壁
  const wc='#29262f';
  R(g,wc,0,0,PW,TS); R(g,wc,0,14*TS,PW,TS); R(g,wc,0,0,TS,PH); R(g,wc,19*TS,0,TS,PH);
  for(let x=0;x<PW;x+=8){R(g,'rgba(255,255,255,.025)',x,0,3,TS-4);}
  R(g,'#3d3946',TS,TS-5,PW-2*TS,5); R(g,'#1d1b22',TS,14*TS,PW-2*TS,4);
  R(g,'#36323e',TS-4,TS,4,PH-2*TS); R(g,'#36323e',19*TS,TS,4,PH-2*TS);
  // ドア（破られて開いている）
  R(g,'#121014',9*TS+2,0,TS-4,TS-4); R(g,'#5a3a22',9*TS-2,TS-6,TS+4,5);
  g.save(); g.translate(9*TS+3,TS-2); g.rotate(1.15); R(g,'#7a5131',0,-2,TS-5,5); R(g,'#c9a45a',TS-12,-1,3,3); g.restore();
  g.strokeStyle='rgba(230,200,150,.5)'; g.beginPath(); g.moveTo(10*TS-4,TS-6); g.lineTo(10*TS-1,TS-12); g.moveTo(10*TS-8,TS-6); g.lineTo(10*TS-6,TS-11); g.stroke();
  // 窓
  R(g,'#cfc6b4',9*TS+2,14*TS+3,2*TS-4,14); R(g,'#7ba1b6',9*TS+5,14*TS+5,2*TS-10,9);
  R(g,'#cfc6b4',10*TS-1,14*TS+3,2,14); C(g,'#d6b061',10*TS,14*TS+4,3);
  // 暖炉
  RR(g,'#6c665f',18*TS+18,6*TS-8,TS+14,3*TS+16,3);
  for(let y=6*TS-6;y<9*TS+8;y+=10) R(g,'rgba(0,0,0,.18)',18*TS+18,y,TS+14,1);
  R(g,'#151211',18*TS+26,6*TS+10,26,3*TS-20); E(g,'#4b4744',18*TS+40,7.5*TS,8,16);
  R(g,'#8a837a',18*TS+16,6*TS-8,4,3*TS+16);
  // 本棚
  const shelf=(x,y,w)=>{
    RR(g,'#3a2416',x*TS+1,y*TS+1,w*TS-2,TS-5,2);
    let bx=x*TS+4; const pal=['#7a2e2e','#2e4a6a','#6a5a2e','#2e5a3e','#5a3a5a','#8a7a5a','#3a3a3a'];
    while(bx<(x+w)*TS-6){const bw=4+r()*4; R(g,pal[(r()*pal.length)|0],bx,y*TS+4+r()*4,bw-1,TS-14); bx+=bw;}
    R(g,'#2a180e',x*TS+1,y*TS+TS-8,w*TS-2,4);
  };
  shelf(1,1,4); shelf(14,1,5);
  E(g,'#7b5d33',17.5*TS,2*TS-3,6,3);
  // 机
  RR(g,'#4a2d18',4*TS+1,3*TS+3,4*TS-2,2*TS-5,4); RR(g,'#62402a',4*TS+4,3*TS+5,4*TS-8,2*TS-11,3);
  g.save(); g.translate(6.4*TS,3.7*TS); g.rotate(.12); R(g,'#e9e2d0',-12,-9,24,18); R(g,'#cfc7b2',-9,-5,16,1); R(g,'#cfc7b2',-9,-1,14,1); R(g,'#cfc7b2',-9,3,12,1); g.restore();
  E(g,'#2f6b4a',4.45*TS,3.45*TS,9,6); glow(g,4.45*TS,3.7*TS,40,'rgba(255,220,140,.18)');
  R(g,'#c9a45a',5.35*TS,3.45*TS,9,2); C(g,'#c9a45a',5.35*TS,3.5*TS,3);
  C(g,'#1b1b1b',7.4*TS,3.4*TS,3);
  R(g,'#3a2414',4*TS+6,5*TS-6,4*TS-12,2); C(g,'#c9a45a',5*TS,5*TS-5,1.6); C(g,'#c9a45a',7.5*TS,5*TS-5,1.6);
  // 椅子
  RR(g,'#2e1d16',5*TS+5,5*TS+3,TS-10,TS-8,6); RR(g,'#4a2e24',5*TS+7,5*TS+5,TS-14,TS-14,5);
  // テーブル＋カップ
  E(g,'#2a1a10',13*TS,10*TS+3,TS-2,TS-6); E(g,'#6b4a2e',13*TS,10*TS,TS-2,TS-6); E(g,'#7c5838',13*TS,10*TS-2,TS-8,TS-12);
  for(const [cx,cy] of [[12.55,9.75],[13.45,10.2]]){E(g,'#e8e2d6',cx*TS,cy*TS,7,6); C(g,'#f3efe8',cx*TS,cy*TS,4.5); C(g,'#8a4f22',cx*TS,cy*TS,3);}
  C(g,'#d9d2c4',13.1*TS,9.45*TS,6); C(g,'#bfb6a4',13.1*TS,9.45*TS,2);
  // ソファ
  RR(g,'#3e1e1d',11*TS+2,11*TS+2,4*TS-4,TS-2,6); RR(g,'#5a2a28',11*TS+6,11*TS+2,4*TS-12,TS-12,5);
  R(g,'rgba(0,0,0,.25)',13*TS-1,11*TS+4,2,TS-16);
  // 飾り棚
  RR(g,'#3d2818',TS+1,6*TS+2,TS-6,3*TS-4,2); R(g,'rgba(170,200,220,.15)',TS+4,6*TS+6,TS-12,3*TS-12);
  for(let i=0;i<5;i++) C(g,['#6a3a1a','#2a4a2a','#7a6a2a'][i%3],1.5*TS-2,6.4*TS+i*16,4);
  // 観葉植物
  for(const [px,py] of [[1,13],[18,13]]){C(g,'#6e4426',(px+.5)*TS,(py+.5)*TS,10); for(let i=0;i<7;i++){const a=i/7*Math.PI*2; E(g,i%2?'#2f5a2c':'#3d7037',(px+.5)*TS+Math.cos(a)*8,(py+.5)*TS+Math.sin(a)*8,8,4,a);}}
  // スタンドライト
  glow(g,18.5*TS,3.5*TS,70,'rgba(255,214,140,.16)'); C(g,'#2a2420',18.5*TS,3.5*TS,8); C(g,'#e8d39a',18.5*TS,3.5*TS,5);
  // 遺体のチョーク跡
  g.strokeStyle='rgba(240,240,235,.85)'; g.lineWidth=1.6; g.lineCap='round';
  const bx=17.9*TS, by=7.5*TS;
  g.beginPath(); g.arc(bx,by,7,0,Math.PI*2); g.stroke();
  g.beginPath(); g.roundRect(bx-42,by-10,34,20,8); g.stroke();
  g.beginPath(); g.moveTo(bx-14,by-10); g.lineTo(bx-4,by-22); g.moveTo(bx-14,by+10); g.lineTo(bx-6,by+20);
  g.moveTo(bx-42,by-6); g.lineTo(bx-68,by-12); g.moveTo(bx-42,by+6); g.lineTo(bx-66,by+12); g.stroke();
  E(g,'rgba(90,20,18,.55)',bx+4,by+6,7,4);
  vignette(g,.28);
}

/* ---------- 庭 ---------- */
function drawGarden(g){
  const r=rng(5);
  R(g,'#33502c',0,0,PW,PH);
  for(let i=0;i<2600;i++){g.fillStyle=r()<.5?'#3d5e34':'#2a4425'; g.fillRect(r()*PW,r()*PH,1.5,3);}
  // 飛び石
  const stones=[[16,5],[16,6],[16,7],[16,8],[15,8],[14,8],[13,8],[12,8],[11,8],[10,8],[10,9],[10,10],[10,11],[10,12],[10,13]];
  for(const [x,y] of stones){const ox=r()*4,oy=r()*4; RR(g,'#5f5e58',x*TS+4+ox,y*TS+6+oy,TS-10,TS-10,7); RR(g,'#83827a',x*TS+4+ox,y*TS+4+oy,TS-10,TS-11,7);}
  // ぬかるみ
  RR(g,'#4d3c2b',8*TS+4,4*TS+3,9.4*TS,TS-5,10); R(g,'#4d3c2b',9*TS+3,3*TS,2*TS-6,TS+6);
  for(let i=0;i<30;i++) R(g,'rgba(160,180,200,.08)',8.3*TS+r()*9*TS,4.2*TS+r()*20,6+r()*10,1);
  // 足跡
  const pts=[[9.5,3.4],[9.5,4.5],[16.5,4.5],[16.5,3.25]];
  let side=1;
  for(let s=0;s<pts.length-1;s++){
    const [ax,ay]=pts[s],[bx2,by2]=pts[s+1]; const len=Math.hypot(bx2-ax,by2-ay)*TS, n=Math.floor(len/9);
    const ang=Math.atan2(by2-ay,bx2-ax);
    for(let i=0;i<n;i++){
      const t=i/n, x=(ax+(bx2-ax)*t)*TS, y=(ay+(by2-ay)*t)*TS;
      E(g,'#2a1f15',x-Math.sin(ang)*3*side,y+Math.cos(ang)*3*side,3.6,2.2,ang); side*=-1;
    }
  }
  // 館
  R(g,'#3a3441',0,0,PW,2*TS);
  for(let y=4;y<2*TS;y+=8){R(g,'rgba(0,0,0,.25)',0,y,PW,1); for(let x=((y/8)%2)*10;x<PW;x+=20) R(g,'rgba(0,0,0,.18)',x,y-7,1,7);}
  R(g,'#4a4352',0,2*TS-6,PW,6);
  R(g,'#857c6c',0,2*TS,PW,TS);
  for(let x=0;x<PW;x+=22){R(g,'rgba(0,0,0,.15)',x,2*TS,1,TS);} R(g,'rgba(0,0,0,.15)',0,2.5*TS,PW,1);
  R(g,'rgba(0,0,0,.35)',0,2*TS,PW,5);
  R(g,'#d8d0c0',9*TS+3,2*TS+5,2*TS-6,TS-9); R(g,'#6d93a8',9*TS+6,2*TS+8,2*TS-12,TS-15); R(g,'#d8d0c0',10*TS-1,2*TS+5,2,TS-9);
  R(g,'#d8d0c0',3*TS+3,2*TS+5,2*TS-6,TS-9); R(g,'#3a4a55',3*TS+6,2*TS+8,2*TS-12,TS-15);
  R(g,'#d8d0c0',13*TS+6,2*TS+5,TS*1.6,TS-9); R(g,'#4e6676',13*TS+9,2*TS+8,TS*1.6-6,TS-15);
  R(g,'#5a3c24',16*TS+5,2*TS+2,TS-10,TS-2); C(g,'#c9a45a',16*TS+TS-9,2.55*TS,1.8); R(g,'#8d8a82',16*TS+2,3*TS,TS-4,5);
  // 植え込み
  for(const bx of [7,8,11,12]){
    for(let i=0;i<5;i++) C(g,i%2?'#24401f':'#2e5228',bx*TS+6+r()*20,3*TS+6+r()*18,8+r()*3);
    for(let i=0;i<3;i++) C(g,r()<.5?'#e7c3cf':'#f1efe6',bx*TS+5+r()*22,3*TS+5+r()*20,1.6);
  }
  // 池
  E(g,'#5a6650',3.95*TS,6.5*TS,2.1*TS,1.55*TS); E(g,'#2d5a6e',3.95*TS,6.5*TS,1.9*TS,1.35*TS);
  E(g,'rgba(255,255,255,.08)',3.5*TS,6.1*TS,30,6,-.2); C(g,'#3c6a36',4.6*TS,6.9*TS,6); C(g,'#d36f3c',3.2*TS,6.8*TS,2.5);
  // 物置
  RR(g,'#3e3026',14*TS+2,9*TS+2,4*TS-4,3*TS-4,3);
  for(let x=14*TS+6;x<18*TS-4;x+=9) R(g,'rgba(0,0,0,.25)',x,9*TS+4,1,3*TS-8);
  R(g,'#5a4636',14*TS+2,9*TS+2,4*TS-4,6);
  // 木
  for(const [tx,ty] of [[1,11],[3,13],[18,6],[18,13]]){
    E(g,'rgba(0,0,0,.3)',(tx+.6)*TS,(ty+.75)*TS,22,10);
    C(g,'#1f3a1c',(tx+.5)*TS,(ty+.4)*TS,22); C(g,'#2b4f26',(tx+.4)*TS,(ty+.3)*TS,17); C(g,'#3a6532',(tx+.3)*TS,(ty+.2)*TS,9);
  }
  // ベンチ
  RR(g,'#5a4430',6*TS+3,11*TS+8,2*TS-6,TS-16,3); for(let x=6*TS+8;x<8*TS-6;x+=7) R(g,'rgba(0,0,0,.25)',x,11*TS+8,1,TS-16);
  // 塀と門
  R(g,'#4f4033',0,3*TS,TS,12*TS); R(g,'#4f4033',19*TS,3*TS,TS,12*TS); R(g,'#4f4033',0,14*TS,PW,TS);
  for(let y=3*TS;y<PH;y+=8){R(g,'rgba(0,0,0,.25)',0,y,TS,1); R(g,'rgba(0,0,0,.25)',19*TS,y,TS,1);}
  for(let x=0;x<PW;x+=8) R(g,'rgba(0,0,0,.25)',x,14*TS,1,TS);
  R(g,'#1d1d20',10*TS-2,14*TS,TS+4,TS); for(let x=10*TS+2;x<11*TS;x+=6) R(g,'#5a5a60',x,14*TS+2,2,TS-4);
  g.save(); g.translate(10.5*TS,14.5*TS); g.rotate(-.12); R(g,'#e3c22e',-TS*1.2,-3,TS*2.4,6);
  g.fillStyle='#111'; g.font='bold 5px sans-serif'; g.fillText('KEEP OUT  KEEP OUT',-TS*1.1,2); g.restore();
  R(g,'rgba(60,80,100,.12)',0,0,PW,PH);
  vignette(g,.32);
}

/* ---------- 取調室 ---------- */
function drawInterro(g){
  R(g,'#393c41',0,0,PW,PH);
  for(let x=0;x<PW;x+=TS) R(g,'rgba(0,0,0,.18)',x,0,1,PH);
  for(let y=0;y<PH;y+=TS) R(g,'rgba(0,0,0,.18)',0,y,PW,1);
  const wc='#1c1e22';
  R(g,wc,0,0,PW,TS); R(g,wc,0,14*TS,PW,TS); R(g,wc,0,0,TS,PH); R(g,wc,19*TS,0,TS,PH);
  R(g,'#2b2e34',TS,TS-4,PW-2*TS,4);
  R(g,'#101a22',6*TS,5,8*TS,TS-12);
  g.strokeStyle='rgba(255,255,255,.07)'; g.beginPath();
  for(let i=0;i<6;i++){g.moveTo(6*TS+20+i*40,TS-8); g.lineTo(6*TS+40+i*40,6);} g.stroke();
  R(g,'#45484e',19*TS+4,7*TS,TS-8,TS*1.3); C(g,'#9a9a9a',19*TS+8,7.6*TS,2);
  RR(g,'#2b2d31',9.5*TS,4.6*TS,TS,TS*0.9,6);
  RR(g,'#2b2d31',9.5*TS,8.5*TS,TS,TS*0.9,6);
  RR(g,'#4b4f56',8*TS,6*TS+2,4*TS,2*TS-2,4); RR(g,'#5d6168',8*TS+2,6*TS,4*TS-4,2*TS-6,4);
  g.save(); g.translate(9*TS,7*TS); g.rotate(-.1); R(g,'#e5e0d4',-10,-8,22,16); g.restore();
  R(g,'#222',10.6*TS,6.5*TS,14,9); C(g,'#c33',10.6*TS+11,6.5*TS+3,1.5);
  C(g,'#2a2a2a',11.4*TS,6.4*TS,5); C(g,'#f3e3b0',11.4*TS,6.4*TS,3);
}

const DRAWERS={study:drawStudy,garden:drawGarden,interro:drawInterro};
const STATIC={};
function getStatic(id){
  if(STATIC[id]) return STATIC[id];
  const c=document.createElement('canvas'); c.width=PW*SC; c.height=PH*SC;
  const g=c.getContext('2d'); g.setTransform(SC,0,0,SC,0,0); DRAWERS[id](g);
  return STATIC[id]=c;
}

