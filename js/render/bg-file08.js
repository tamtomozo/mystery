/* 背景：FILE.08（万年筆メーカー「鳴海万年筆」の本館二階・中庭と研ぎ場）
   本館は昭和初期の洋館。雨の夕方。中庭の雨は render.js の drawRain が上から重ねる。
   会議室の暖炉の上の額は、伝声管の蓋を見つけたら外した姿に描き替える（MAPDEF.honkan.overlay） */
'use strict';

/* ---------- 共通 ---------- */
// 小さな札。x,y は左上
function f8Plate(g,text,x,y,w,bg='#3a2a1e',fg='#f0e2c0'){
  RR(g,'rgba(0,0,0,.45)',x-1,y-1,w+2,12,2); R(g,bg,x,y,w,10);
  R(g,'rgba(214,176,97,.6)',x,y,w,1); R(g,'rgba(214,176,97,.6)',x,y+9,w,1);
  g.save(); g.fillStyle=fg; g.font='bold 8px sans-serif'; g.textAlign='center'; g.textBaseline='middle';
  g.fillText(text,x+w/2,y+5.5,w-2); g.restore();
}
// 洋館の壁：漆喰と、下に腰板
function f8Wall(g,x,y,w,h,c='#d6c9ad'){
  R(g,c,x*TS,y*TS,w*TS,h*TS);
  R(g,'rgba(255,255,255,.16)',x*TS,y*TS,w*TS,2);
  R(g,'#5a3e2a',x*TS,(y+h)*TS-7,w*TS,7); R(g,'rgba(0,0,0,.25)',x*TS,(y+h)*TS-2,w*TS,2);
}
// 板の床（横張り）
function f8Planks(g,x,y,w,h,c1,c2,r){
  for(let yy=y*TS;yy<(y+h)*TS;yy+=8){
    R(g,((yy/8)|0)%2?c1:c2,x*TS,yy,w*TS,8); R(g,'rgba(0,0,0,.14)',x*TS,yy+7,w*TS,1);
    let xx=x*TS-r()*60; while(xx<(x+w)*TS){xx+=40+r()*60; if(xx>x*TS&&xx<(x+w)*TS) R(g,'rgba(0,0,0,.2)',xx,yy,1,7);}
  }
}
// 寄せ木の床
function f8Parquet(g,x,y,w,h,c1,c2){
  for(let yy=y*TS;yy<(y+h)*TS;yy+=16) for(let xx=x*TS;xx<(x+w)*TS;xx+=16){
    const k=((xx+yy)/16)%2;
    R(g,k?c1:c2,xx,yy,16,16);
    for(let i=4;i<16;i+=4) k?R(g,'rgba(0,0,0,.12)',xx,yy+i,16,1):R(g,'rgba(0,0,0,.12)',xx+i,yy,1,16);
  }
}
// じゅうたん（ふち飾りつき）
function f8Carpet(g,x,y,w,h,c,edge,r){
  R(g,c,x*TS,y*TS,w*TS,h*TS);
  for(let i=0;i<w*h*14;i++) R(g,'rgba(0,0,0,.07)',x*TS+r()*w*TS,y*TS+r()*h*TS,2,2);
  g.strokeStyle=edge; g.lineWidth=2; g.strokeRect(x*TS+6,y*TS+6,w*TS-12,h*TS-12);
  g.lineWidth=1; g.strokeRect(x*TS+10,y*TS+10,w*TS-20,h*TS-20);
}
// 椅子（上から見た姿）。dir：背もたれの向き
function f8Chair(g,cx,cy,dir,c='#4a2e1e',seat='#7a3a30'){
  const [dx,dy]=DIRV[dir];
  RR(g,c,cx-9,cy-9,18,18,4); RR(g,seat,cx-7,cy-7,14,14,3);
  R(g,c,cx-9+(dx>0?14:0),cy-9+(dy>0?14:0),dx?4:18,dy?4:18);
}
// 窓（上の壁）：雨に濡れたガラス
function f8WindowTop(g,x,w){
  R(g,'#4a3424',x*TS+3,3,w*TS-6,TS-10);
  const gl=g.createLinearGradient(0,6,0,TS-10); gl.addColorStop(0,'#5a6a7e'); gl.addColorStop(1,'#3a4658');
  g.fillStyle=gl; g.fillRect(x*TS+6,6,w*TS-12,TS-16);
  for(let i=0;i<w*5;i++){const xx=x*TS+8+((i*37)%(w*TS-16)); R(g,'rgba(200,215,235,.35)',xx,8+(i*13)%10,1,6+(i%3)*3);}
  R(g,'#4a3424',x*TS+w*TS/2-1,6,2,TS-16); R(g,'#4a3424',x*TS+6,TS/2-4,w*TS-12,2);
}

/* ---------- 本館二階 ---------- */
// 暖炉の上の額（洋館の写真）。x,y は左上
const F8FRAME={x:8*TS+10,y:3,w:2*TS-20,h:TS-8};
function f8Frame(g){
  const {x,y,w,h}=F8FRAME;
  RR(g,'#3a2414',x-2,y-1,w+4,h+2,2); R(g,'#c9a45a',x,y+1,w,h-2);
  R(g,'#b8a07a',x+3,y+4,w-6,h-8);
  R(g,'#8a7458',x+8,y+9,w-16,h-15); R(g,'#6a5a44',x+12,y+7,w-24,4);   // 洋館の写真
  C(g,'#4a3a2a',x+w/2-6,y+h-7,2); C(g,'#4a3a2a',x+w/2+6,y+h-7,2);    // 二人
}
// 伝声管の真鍮の蓋（開いている）。cx,cy は口の中心
function f8PipeMouth(g,cx,cy,r=7){
  glow(g,cx,cy,r*2.4,'rgba(214,176,97,.25)');
  C(g,'#5a4a2a',cx,cy,r+2); C(g,'#c9a45a',cx,cy,r); C(g,'#e8d08a',cx-r*.3,cy-r*.3,r*.35);
  C(g,'#1a1410',cx,cy,r*.55);
  E(g,'#b8943a',cx+r*1.6,cy+1,r*.75,r*.95); C(g,'#7a9a7a',cx+r*1.6,cy+1,r*.3);   // 横にずらした蓋（緑青）
  C(g,'#8a6a2a',cx+r*.9,cy-r*.9,1.6);   // 蝶ねじ
}
function drawHonkan(g){
  const r=rng(81);
  // 床：廊下・階段の広間は板張り、会議室は寄せ木、社長室は緑、応接室はえんじのじゅうたん、秘書室は明るい板
  f8Planks(g,0,0,20,15,'#7a5a3e','#725438',r);
  f8Parquet(g,1,1,10,5,'#6a4a30','#5e4128');
  f8Carpet(g,12,1,7,5,'#2e4a3a','rgba(201,164,90,.45)',r);
  f8Planks(g,1,10,5,4,'#a0805a','#987852',r);
  f8Carpet(g,13,10,6,4,'#5a2228','rgba(201,164,90,.45)',r);
  // 廊下の赤いじゅうたん
  R(g,'#7a2a2a',2*TS,7*TS+6,17*TS,2*TS-12); R(g,'#c9a45a',2*TS,7*TS+8,17*TS,1.5); R(g,'#c9a45a',2*TS,9*TS-10,17*TS,1.5);
  for(let x=2*TS+10;x<19*TS;x+=24) R(g,'rgba(201,164,90,.25)',x,8*TS-2,6,4);
  // 壁（MAPDEF.honkan と同じ位置）
  for(const [x,y,w,h] of [[0,0,20,1],[0,0,1,15],[19,0,1,15],[0,14,20,1],
    [1,6,4,1],[6,6,5,1],[11,1,1,6],[12,6,3,1],[16,6,3,1],
    [1,9,2,1],[4,9,3,1],[6,10,1,4],[12,9,3,1],[16,9,3,1],[12,10,1,4]]) f8Wall(g,x,y,w,h);
  // 戸口（敷居）
  for(const [x,y] of [[5,6],[15,6],[3,9],[15,9]]) R(g,'#4a3020',x*TS+2,y*TS+TS/2-2,TS-4,4);
  // 上の壁の窓
  f8WindowTop(g,3,2); f8WindowTop(g,5.5,1.5); f8WindowTop(g,13.5,1.5); f8WindowTop(g,16,2);
  // 右の壁の窓（廊下の東）
  R(g,'#4a3424',19*TS+3,7*TS+3,TS-10,2*TS-6); R(g,'#4a5a6e',19*TS+6,7*TS+6,TS-16,2*TS-12);
  for(let i=0;i<8;i++) R(g,'rgba(200,215,235,.35)',19*TS+8+(i*5)%14,7*TS+8+i*7,1,7);
  // ---- 役員会議室 ----
  // 西の窓と暗幕（1,2〜4）
  R(g,'#4a3424',2,2*TS,TS-8,3*TS); R(g,'#3e4c60',4,2*TS+4,TS-12,3*TS-8);
  for(let i=0;i<8;i++) R(g,'rgba(200,215,235,.3)',6+(i*7)%14,2*TS+8+i*11,1,7);
  for(const [y0,y1] of [[2*TS,2*TS+30],[5*TS-30,5*TS]]){   // 左右に寄せた暗幕
    R(g,'#1e2230',TS,y0,TS,y1-y0);
    for(let x=TS+3;x<2*TS;x+=5) R(g,'rgba(255,255,255,.06)',x,y0,2,y1-y0);
  }
  R(g,'#1e2230',TS+TS-6,2*TS,6,3*TS); R(g,'#8a6a3a',TS,2*TS-3,TS,3);   // 暗幕の端とカーテンレール
  // 暖炉（8〜9,1）と、上の額
  RR(g,'#8a8478',8*TS+2,TS-2,2*TS-4,TS,3); R(g,'#a8a294',8*TS,TS-4,2*TS,6);
  R(g,'#1e1a18',8*TS+12,TS+6,2*TS-24,TS-10); E(g,'#3a3430',9*TS,2*TS-6,10,3);
  f8Frame(g);
  // スクリーン（10,2〜4）
  R(g,'#2a2a2e',10*TS+18,2*TS-4,8,3*TS+8); R(g,'#ecece6',10*TS+20,2*TS,6,3*TS);
  // 長机（3〜8,3〜4）と椅子
  for(const x of [4,5,6,7]){f8Chair(g,x*TS+TS/2+(x-5.5)*4,2*TS+18,'up'); f8Chair(g,x*TS+TS/2+(x-5.5)*4,5*TS+14,'down');}
  f8Chair(g,2*TS+16,4*TS,'left'); f8Chair(g,9*TS+16,4*TS,'right');
  R(g,'#8a6a4a',9*TS+8,4*TS-9,6,18);   // 会長の席のひざ掛け
  RR(g,'#2a160c',3*TS+2,3*TS+4,6*TS-4,2*TS-6,5); RR(g,'#4a2a18',3*TS+4,3*TS+2,6*TS-8,2*TS-8,4);
  R(g,'rgba(255,240,210,.08)',3*TS+8,3*TS+5,6*TS-16,2);
  R(g,'#2e4a3a',3*TS+12,3*TS+10,6*TS-24,2*TS-24);   // 緑のフェルト
  RR(g,'#3a3a3e',5.6*TS,3.65*TS,16,12,2); C(g,'#9ac8dc',5.6*TS+15,3.65*TS+6,2.5);   // プロジェクター
  for(const [x,y] of [[4.3,3.3],[6.6,3.4],[4.4,4.5],[7.3,4.4]]){R(g,'#ece6d6',x*TS-6,y*TS-4,12,9); R(g,'#cfc7b2',x*TS-4,y*TS-1,8,1);}
  for(const [x,y] of [[3.6,3.5],[8.3,3.6]]) C(g,'rgba(220,235,245,.7)',x*TS,y*TS,3);   // 水のグラス
  f8Plate(g,L.sign.kaigi,3.6*TS,6*TS+11,1.9*TS);
  // ---- 社長室 ----
  RR(g,'#3a2416',12*TS+1,TS+1,2*TS-2,TS-4,2);   // 本棚
  { let bx=12*TS+4; const pal=['#7a2e2e','#2e4a6a','#6a5a2e','#2e5a3e','#3a3a3a','#8a7a5a'];
    while(bx<14*TS-6){const bw=4+r()*4; R(g,pal[(r()*pal.length)|0],bx,TS+4+r()*3,bw-1,TS-14); bx+=bw;} }
  RR(g,'#3a2414',14*TS+2,2*TS+3,3*TS-4,TS-6,3); RR(g,'#5a3a22',14*TS+4,2*TS+4,3*TS-8,TS-10,3);   // 机
  for(let i=0;i<4;i++) R(g,'#ece6d6',14.3*TS+i*5,2*TS+8+i*2,14,9);   // 手紙の束
  RR(g,'#2a2a2e',16*TS+4,2*TS+8,12,8,2); C(g,'#c9a45a',16*TS+14,2*TS+10,1.4);   // 万年筆のケース
  f8Chair(g,15*TS+TS/2,TS+14,'up','#2a1a10','#3a5a4a');
  RR(g,'#3a3e44',18*TS+3,TS+2,TS-6,TS-4,2); RR(g,'#4a5058',18*TS+5,TS+4,TS-10,TS-8,2);   // 金庫
  C(g,'#9aa0a8',18*TS+TS/2,TS+TS/2-1,5); C(g,'#3a3e44',18*TS+TS/2,TS+TS/2-1,2); R(g,'#c9a45a',18*TS+TS-11,TS+TS/2+5,5,2);
  f8Plate(g,L.sign.shacho,14*TS+2,6*TS+11,TS*.9);
  // ---- 廊下 ----
  RR(g,'#3a2414',TS+2,7*TS+2,TS-4,2*TS-4,2); R(g,'rgba(180,210,230,.25)',TS+5,7*TS+5,TS-10,2*TS-10);   // 社史のケース
  for(let i=0;i<5;i++){R(g,['#1a1a1a','#7a2a2a','#2a3a5a','#1a1a1a','#3a5a3a'][i],TS+8+(i%2)*8,7*TS+10+i*9,12,3); C(g,'#c9a45a',TS+20+(i%2)*8,7*TS+11+i*9,1.2);}
  RR(g,'#5a3a22',4*TS+3,7*TS+2,TS-6,TS-6,2);   // 携帯の預かり箱
  for(let i=0;i<3;i++) for(let j=0;j<2;j++){R(g,'#7a5232',4*TS+6+j*11,7*TS+5+i*7,9,5); C(g,'#c9a45a',4*TS+10+j*11,7*TS+7.5+i*7,1);}
  // ---- 秘書室 ----
  RR(g,'#6a6e74',TS+2,10*TS+2,TS-4,TS-4,2); for(let i=0;i<3;i++) R(g,'#8a8e94',TS+5,10*TS+5+i*8,TS-10,5);   // 書類棚
  RR(g,'#6a4a2e',2*TS+2,12*TS+3,2*TS-4,TS-6,3); RR(g,'#7a5a3a',2*TS+4,12*TS+4,2*TS-8,TS-10,2);   // 机
  R(g,'#ece6d6',2*TS+8,12*TS+8,16,12); R(g,'#2a2a2e',3*TS+6,12*TS+8,14,10); C(g,'#c84a3a',3*TS+16,12*TS+10,1.4);   // メモ帳と内線電話
  E(g,'#c9a45a',2*TS+30,12*TS+18,5,2);   // ペン皿
  f8Chair(g,2*TS+TS,11*TS+16,'up','#3a3a3e','#5a5a62');
  f8Plate(g,L.sign.hisho,1.4*TS,9*TS+11,1.4*TS);
  // ---- 階段の広間（9〜10,13〜14：下りる階段） ----
  for(let k=0;k<6;k++){const y=12.6*TS+k*6.4; R(g,`rgb(${110-k*12},${80-k*9},${54-k*6})`,9*TS,y,2*TS,6.4); R(g,'rgba(0,0,0,.3)',9*TS,y+5.6,2*TS,.8);}
  R(g,'#3a2414',9*TS-4,12.4*TS,4,2.6*TS); R(g,'#3a2414',11*TS,12.4*TS,4,2.6*TS);   // 手すり
  C(g,'#c9a45a',9*TS-2,12.4*TS,3); C(g,'#c9a45a',11*TS+2,12.4*TS,3);
  for(const [x,y] of [[7,13],[11,13]]){RR(g,'#6a4a2e',x*TS+8,y*TS+12,TS-16,TS-16,3); for(let k=0;k<7;k++){const a=k/7*Math.PI*2; E(g,k%2?'#3a6a32':'#2f5a2c',x*TS+TS/2+Math.cos(a)*7,y*TS+12+Math.sin(a)*6,6,3,a);}}
  f8Plate(g,L.sign.kaidan,8.6*TS,12*TS+2,2.8*TS,'#2a3a4a');
  // ---- 応接室 ----
  for(const [x,c] of [[14,'#6a3a2a'],[17,'#6a3a2a']]){RR(g,c,x*TS+3,11*TS-2,TS-6,TS+4,6); RR(g,'#8a5a3a',x*TS+6,11*TS+2,TS-12,TS-6,4);}   // ひじかけ椅子
  RR(g,'#3a2414',15*TS+2,11*TS+5,2*TS-4,TS-10,4); RR(g,'#5a3a22',15*TS+4,11*TS+6,2*TS-8,TS-13,3);   // 低いテーブル
  for(const x of [15.4,16.6]){E(g,'#ece6d6',x*TS,11.5*TS,5,4); C(g,'#8a4a22',x*TS,11.5*TS,2.4);}
  R(g,'#f4f2ec',15.9*TS-4,11.3*TS,9,6); R(g,'#f4f2ec',15.9*TS+6,11.3*TS+1,9,6);   // 白い手袋
  RR(g,'#4a2e1e',13*TS+4,13*TS+4,2*TS,TS-8,4);   // 長椅子
  f8Plate(g,L.sign.osetsu8,14*TS+2,9*TS+11,TS*.9);
  // 夕方の薄暗さ
  R(g,'rgba(20,24,36,.12)',0,0,PW,PH);
  vignette(g,.22);
}
// 伝声管の蓋を見つけたら、額を外して、真鍮の口を見せる（render.js が探索中に毎フレーム呼ぶ）
function f8HonkanOverlay(g){
  if(!has('pipeRoom')) return;
  const {x,y,w,h}=F8FRAME;
  R(g,'#d6c9ad',x-3,y-2,w+6,h+3); R(g,'rgba(0,0,0,.08)',x,y,w,h);   // 額のあとの、日焼けしていない壁
  f8PipeMouth(g,x+w/2,y+h/2+1,7);
  g.save(); g.translate(10*TS+4,TS+18); g.rotate(-.25); f8FrameAt(g,-12,-8,24,16); g.restore();   // 外した額は、暖炉の脇に立てかける
}
function f8FrameAt(g,x,y,w,h){RR(g,'#3a2414',x-1,y-1,w+2,h+2,2); R(g,'#c9a45a',x,y,w,h); R(g,'#8a7458',x+3,y+3,w-6,h-6);}

/* ---------- 中庭と研ぎ場 ---------- */
function drawTogiba(g){
  const r=rng(82);
  // 中庭：濡れた石畳
  for(let y=0;y<15;y++) for(let x=0;x<20;x++){
    const v=(r()*14)|0;
    R(g,`rgb(${84+v},${88+v},${92+v})`,x*TS,y*TS,TS,TS);
    R(g,'rgba(0,0,0,.18)',x*TS,y*TS+TS-1,TS,1); R(g,'rgba(0,0,0,.14)',x*TS+TS-1,y*TS,1,TS);
    if(r()<.4) R(g,'rgba(255,255,255,.05)',x*TS+3,y*TS+3,TS-8,3);
  }
  for(const [x,y,w,h] of [[11.2,4.6,1.8,.9],[6.5,10.4,2.4,1.1],[13.6,12.3,1.6,.7],[17.2,9.6,1.4,.8]]){   // 水たまり
    E(g,'rgba(40,52,70,.55)',x*TS,y*TS,w*TS/2,h*TS/2); E(g,'rgba(180,200,220,.12)',x*TS-6,y*TS-3,w*TS/4,h*TS/6);
  }
  // 上の壁：本館の裏。裏口（9〜10,0）
  R(g,'#8a7a64',0,0,PW,TS); for(let x=0;x<PW;x+=16) R(g,'rgba(0,0,0,.12)',x,0,1,TS); R(g,'rgba(0,0,0,.3)',0,TS-4,PW,4);
  R(g,'#5a5e66',0,TS-8,PW,3);   // 雨どい
  R(g,'#3a2414',9*TS+2,2,2*TS-4,TS-6); R(g,'#5a3a22',9*TS+5,5,2*TS-10,TS-12); R(g,'#3a2414',10*TS-1,5,2,TS-12);
  C(g,'#c9a45a',10*TS-6,TS/2,1.6); C(g,'#c9a45a',10*TS+6,TS/2,1.6);
  glow(g,10*TS,TS-2,26,'rgba(255,214,150,.25)');
  f8Plate(g,L.sign.honkan,9*TS+8,TS+3,2*TS-16);
  // 左右と下の塀、裏門（9〜10,14）
  for(const x of [0,19]){R(g,'#6a4a3a',x*TS,TS,TS,14*TS); for(let y=TS;y<PH;y+=8){R(g,'rgba(0,0,0,.22)',x*TS,y,TS,1); R(g,'rgba(0,0,0,.18)',x*TS+((y/8)%2?16:8),y,1,8);}}
  R(g,'#6a4a3a',0,14*TS,PW,TS); for(let x=0;x<PW;x+=16){R(g,'rgba(0,0,0,.2)',x,14*TS,1,TS);} R(g,'rgba(0,0,0,.2)',0,14.5*TS,PW,1);
  R(g,'#2a2a2e',9*TS,14*TS,2*TS,TS); for(let x=9*TS+4;x<11*TS-2;x+=6) R(g,'#5a5e66',x,14*TS+2,2,TS-4);
  R(g,'#5a5e66',9*TS,14*TS+6,2*TS,2);
  f8Plate(g,L.sign.uramon,9*TS+12,13*TS+18,2*TS-24,'#2a3a4a');
  // ---- 研ぎ場（1〜7,1〜7） ----
  f8Planks(g,1,1,7,7,'#8a7254','#806a4e',r);
  for(let i=0;i<40;i++) C(g,'rgba(200,205,210,.18)',TS+r()*7*TS,TS+r()*7*TS,1);   // 金属の削りくず
  for(const [x,y,w,h] of [[8,1,1,4],[8,6,1,3],[1,8,7,1]]){
    R(g,'#5a4634',x*TS,y*TS,w*TS,h*TS); for(let k=0;k<w*h*4;k++) R(g,'rgba(0,0,0,.18)',x*TS+(k%(w*4))*8,y*TS,1,h*TS);
    R(g,'rgba(255,255,255,.08)',x*TS,y*TS,w*TS,2);
  }
  R(g,'#3a2a1e',8*TS+2,5*TS+TS/2-2,TS-4,4);   // 敷居
  f8Plate(g,L.sign.togiba,8.9*TS,4*TS+2,TS*1.5);
  glow(g,4.5*TS,4*TS,120,'rgba(255,214,150,.14)');   // 裸電球の灯り
  C(g,'#ffe8b0',4.5*TS,4*TS-12,3);
  // 道具棚（2〜3,1）と、その右の伝声管
  RR(g,'#4a3422',2*TS+1,TS+1,2*TS-6,TS-4,2);
  for(let i=0;i<6;i++) RR(g,['#6a5a48','#8a7a5a','#5a5e66','#7a6a52','#6a6e74','#8a7254'][i],2*TS+4+i*9,TS+4+(i%2)*10,8,9,1);
  R(g,'#a8843a',3.78*TS,0,5,1.35*TS); R(g,'rgba(255,240,200,.35)',3.78*TS+1,0,1.5,1.35*TS);   // 壁を下りてくる真鍮の管
  f8PipeMouth(g,3.78*TS+2.5,1.45*TS,5.5);
  RR(g,'#6a3a3a',3.2*TS,2.05*TS,20,16,5); RR(g,'#7a4a46',3.2*TS+3,2.05*TS+3,14,10,4);   // 座布団
  R(g,'#3e4a5a',3.2*TS+22,2.15*TS,10,8);   // たたんだ前掛け
  // 作業台（5〜7,1）とラジオ
  RR(g,'#5a3e28',5*TS+1,TS+3,3*TS-2,TS-7,2); R(g,'#6a4a32',5*TS+3,TS+5,3*TS-6,TS-12);
  for(let i=0;i<7;i++) R(g,'#d8c890',5*TS+8+i*6,TS+10,2,6);   // 研ぎかけのペン先
  C(g,'#2a2a2a',6*TS+10,TS+14,5); C(g,'#9ac8dc',6*TS+10,TS+14,3);   // ルーペ
  RR(g,'#6a4a2a',7*TS+4,TS+6,22,14,2); R(g,'#d8c8a0',7*TS+7,TS+9,10,6); C(g,'#3a2a1a',7*TS+21,TS+13,3);   // ラジオ
  // 研ぎ盤（2〜3,3・5〜6,3）
  for(const x of [2,5]){
    RR(g,'#4a5058',x*TS+2,3*TS+2,2*TS-4,TS-4,3); RR(g,'#5a6068',x*TS+4,3*TS+4,2*TS-8,TS-8,2);
    C(g,'#2a2a2e',x*TS+TS,3*TS+TS/2,11); C(g,'#9a9488',x*TS+TS,3*TS+TS/2,9); C(g,'#6a645a',x*TS+TS,3*TS+TS/2,3);
    R(g,'#c84a3a',x*TS+2*TS-12,3*TS+6,5,5);   // 電源の赤いボタン
  }
  // 試し書きの台（1〜2,6）
  RR(g,'#5a3e28',TS+1,6*TS+3,2*TS-2,TS-6,2);
  for(let i=0;i<4;i++) R(g,'#f4efe2',TS+5+i*2,6*TS+6+i,22,16);
  g.strokeStyle='rgba(31,47,79,.6)'; g.lineWidth=.8;
  for(let i=0;i<3;i++){g.beginPath(); g.arc(TS+16+i*3,6*TS+14,3+i,0,Math.PI*2); g.stroke();}
  RR(g,'#1f2f4f',2*TS+10,6*TS+8,9,10,2); R(g,'#2a2a2e',2*TS+11,6*TS+5,7,4);   // インク壺
  // ---- 守衛室（12〜14,1〜2） ----
  RR(g,'#7a7468',12*TS,TS,3*TS,2*TS,2); R(g,'#5a5448',12*TS,TS,3*TS,5);
  R(g,'#ffe8b0',12*TS+8,2*TS+4,3*TS-16,TS-12); R(g,'rgba(0,0,0,.18)',12*TS+8,2*TS+4,3*TS-16,4);   // 灯りのついた窓口
  glow(g,13.5*TS,3*TS,46,'rgba(255,214,150,.22)');
  f8Plate(g,L.sign.shuei,12.6*TS,TS+8,1.8*TS,'#2a3a4a');
  // ---- 自転車置き場（17〜18,1） ----
  R(g,'#5a5e66',17*TS,TS-4,2*TS,3);
  g.strokeStyle='#2a2a2e'; g.lineWidth=2;
  for(const cx of [17.3,18.6]){g.beginPath(); g.ellipse(cx*TS,1.5*TS,4,11,0,0,Math.PI*2); g.stroke();}
  R(g,'#6a3a2a',17.3*TS,1.5*TS-1,1.3*TS,3); R(g,'#2a2a2e',17.5*TS,1.5*TS-7,3,14);
  // ---- イチョウ（15〜16,6〜7） ----
  E(g,'rgba(0,0,0,.3)',16*TS+6,7.6*TS,36,14);
  C(g,'#6a4a2a',16*TS,7*TS+4,6);
  for(let i=0;i<22;i++){const a=r()*Math.PI*2, d=r()*26; C(g,i%3?'#d8b030':'#c89a20',16*TS+Math.cos(a)*d,7*TS+Math.sin(a)*d,8+r()*6);}
  for(let i=0;i<70;i++){const x=10*TS+r()*9*TS, y=4*TS+r()*10*TS; E(g,r()<.5?'#d8b030':'#e0bc40',x,y,2.4,1.6,r()*3);}   // 散った葉
  // ---- ベンチ（9〜11,11） ----
  RR(g,'#5a4430',9*TS+3,11*TS+7,3*TS-6,TS-14,3); for(let x=9*TS+10;x<12*TS-6;x+=8) R(g,'rgba(0,0,0,.25)',x,11*TS+7,1,TS-14);
  R(g,'rgba(180,200,220,.18)',9*TS+5,11*TS+9,3*TS-10,2);
  // ---- 花壇（1〜4,12〜13） ----
  RR(g,'#5a4434',TS,12*TS+2,4*TS,2*TS-4,3);
  for(let i=0;i<24;i++){const x=TS+8+(i%8)*14, y=12*TS+10+((i/8)|0)*14; C(g,'#3a6a32',x,y+3,3); C(g,['#e8c84a','#f4f0e6','#c86a8a'][i%3],x,y,3);}
  // 夕方の雨の薄暗さ
  R(g,'rgba(20,26,40,.18)',0,0,PW,PH);
  vignette(g,.28);
}

Object.assign(DRAWERS,{honkan:drawHonkan,togiba:drawTogiba});
MAPDEF.honkan.overlay=f8HonkanOverlay;
