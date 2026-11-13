/* 背景：FILE.09（坂の町・桜ヶ丘三丁目の、春日家と通り／みはらし坂の神社と川べり）
   土曜の昼すぎから夕方。日が傾いていく色は、render.js の drawDusk が上から重ねる（MAPDEF の dusk）。
   札は bg-file08.js の f8Plate を使う。
   坂の上のベンチの足あとは、捜査が進んだら描き足す（MAPDEF.saka.overlay） */
'use strict';

/* ---------- 共通 ---------- */
// 地面に、細かい粒を散らす
function f9Speckle(g,x,y,w,h,cols,n,r){
  for(let i=0;i<n;i++){g.fillStyle=cols[(r()*cols.length)|0]; g.fillRect(x*TS+r()*w*TS,y*TS+r()*h*TS,1.5,1.5);}
}
// 生垣（上から見た、丸く刈りこんだ植え込み）
function f9Hedge(g,x,y,w,h,r){
  R(g,'#2c4626',x*TS,y*TS,w*TS,h*TS);
  for(let i=0;i<w*h*7;i++) C(g,r()<.5?'#3a5a30':'#33522c',x*TS+4+r()*(w*TS-8),y*TS+4+r()*(h*TS-8),5+r()*4);
  for(let i=0;i<w*h*3;i++) C(g,'rgba(160,200,120,.18)',x*TS+4+r()*(w*TS-8),y*TS+3+r()*(h*TS-8),2);
}
// 板塀（縦の板）
function f9Fence(g,x,y,w,h,c='#6a4a30'){
  R(g,c,x*TS,y*TS,w*TS,h*TS);
  if(w>=h){for(let xx=x*TS;xx<(x+w)*TS;xx+=6) R(g,'rgba(0,0,0,.22)',xx,y*TS,1,h*TS); R(g,'rgba(255,240,210,.1)',x*TS,y*TS,w*TS,2);}
  else{for(let yy=y*TS;yy<(y+h)*TS;yy+=6) R(g,'rgba(0,0,0,.22)',x*TS,yy,w*TS,1); R(g,'rgba(255,240,210,.1)',x*TS,y*TS,2,h*TS);}
  R(g,'rgba(0,0,0,.25)',x*TS,(y+h)*TS-2,w*TS,2);
}
// ブロック塀
function f9Block(g,x,y,w,h){
  R(g,'#a8a296',x*TS,y*TS,w*TS,h*TS);
  for(let yy=y*TS;yy<(y+h)*TS;yy+=8){
    R(g,'rgba(0,0,0,.16)',x*TS,yy,w*TS,1);
    for(let xx=x*TS+(((yy/8)|0)%2?8:0);xx<(x+w)*TS;xx+=16) R(g,'rgba(0,0,0,.14)',xx,yy,1,8);
  }
}
// 瓦屋根（上から見た姿）。棟は横向き
function f9Roof(g,x,y,w,h,c){
  R(g,c,x*TS,y*TS,w*TS,h*TS);
  for(let yy=y*TS+3;yy<(y+h)*TS;yy+=5) R(g,'rgba(0,0,0,.22)',x*TS,yy,w*TS,1.4);
  for(let xx=x*TS+4;xx<(x+w)*TS;xx+=7) R(g,'rgba(255,255,255,.05)',xx,y*TS,2,h*TS);
  R(g,shade(c,-30),x*TS,y*TS+h*TS/2-3,w*TS,6); R(g,'rgba(255,255,255,.12)',x*TS,y*TS+h*TS/2-3,w*TS,1.5);   // 棟
  R(g,'rgba(0,0,0,.35)',x*TS,(y+h)*TS-3,w*TS,3);   // 軒の影
}
// 縁側（板張り）
function f9Engawa(g,x,y,w){
  R(g,'#a07a50',x*TS,y*TS,w*TS,TS-6);
  for(let yy=y*TS;yy<y*TS+TS-6;yy+=5) R(g,'rgba(0,0,0,.16)',x*TS,yy,w*TS,1);
  R(g,'rgba(255,240,210,.18)',x*TS,y*TS,w*TS,2);
  R(g,'#6a4a2c',x*TS,y*TS+TS-6,w*TS,3); R(g,'rgba(0,0,0,.25)',x*TS,y*TS+TS-3,w*TS,3);   // 縁の下
}
// 松の木（上から）
function f9Pine(g,cx,cy,rad,r){
  E(g,'rgba(0,0,0,.28)',cx+6,cy+8,rad,rad*.6);
  for(let i=0;i<9;i++){const a=r()*Math.PI*2, d=r()*rad*.55; C(g,i%2?'#24402a':'#2c4c30',cx+Math.cos(a)*d,cy+Math.sin(a)*d,rad*.5+r()*rad*.2);}
  for(let i=0;i<7;i++){const a=r()*Math.PI*2, d=r()*rad*.5; C(g,'rgba(120,170,110,.25)',cx+Math.cos(a)*d-3,cy+Math.sin(a)*d-3,rad*.22);}
}

/* ---------- 桜ヶ丘三丁目 ---------- */
function drawSakura(g){
  const r=rng(91);
  // 下地
  R(g,'#9a948a',0,0,PW,PH);
  // 通り（8〜9）。右の端は、みはらし坂へ続く
  R(g,'#66645f',0,8*TS,PW,2*TS);
  f9Speckle(g,0,8,20,2,['#5a5854','#74716b','#6c6a65'],900,r);
  R(g,'rgba(240,240,232,.75)',TS,8*TS+3,18*TS,2); R(g,'rgba(240,240,232,.75)',TS,10*TS-5,18*TS,2);
  C(g,'#4e4c48',6.5*TS,8.9*TS,8); g.strokeStyle='rgba(0,0,0,.35)'; g.lineWidth=1; for(let i=-6;i<=6;i+=3){g.beginPath(); g.moveTo(6.5*TS+i,8.9*TS-6); g.lineTo(6.5*TS+i,8.9*TS+6); g.stroke();}   // マンホール
  // 通りの下の舗道と裏の小道
  R(g,'#a59f93',0,10*TS,PW,4*TS); f9Speckle(g,0,10,20,4,['#99938a','#b0aa9e'],700,r);
  // 春日家の庭（芝と土）
  R(g,'#5f7a46',TS,TS,8*TS,6*TS); f9Speckle(g,1,1,8,6,['#6c8a50','#52703c','#678446'],1300,r);
  for(const [x,y] of [[3.5,4.3],[3.4,5.3],[3.5,6.3],[4.6,4.4],[5.6,4.1],[6.6,3.8],[7.6,4.3],[8.5,4.5]]){   // 飛び石
    E(g,'#7a766c',x*TS,y*TS+1,9,6); E(g,'#a8a294',x*TS,y*TS,9,6);
  }
  // 路地（10,1〜7）
  R(g,'#8c8478',10*TS,TS,TS,7*TS); f9Speckle(g,10,1,1,7,['#7a7268','#9a9286'],160,r);
  for(let y=TS+4;y<8*TS;y+=12) R(g,'rgba(0,0,0,.12)',10*TS+2,y,TS-4,1);
  // 権藤家の庭（玉砂利）
  R(g,'#b8b0a0',12*TS,2*TS,7*TS,5*TS); f9Speckle(g,12,2,7,5,['#a8a090','#c8c0b0','#d0c8b8'],1100,r);
  for(let x=12*TS+6;x<19*TS;x+=14) R(g,'rgba(0,0,0,.05)',x,2*TS,1,5*TS);   // 砂利の掃き目
  for(const [x,y] of [[16.5,6.4],[16.5,5.4],[16.2,4.4]]){E(g,'#7a766c',x*TS,y*TS+1,9,6); E(g,'#a8a294',x*TS,y*TS,9,6);}
  // 上の生垣、左右と下の塀
  f9Hedge(g,0,0,20,1,r);
  f9Block(g,0,1,1,7); f9Block(g,0,10,1,5); f9Block(g,19,1,1,7); f9Block(g,19,10,1,5); f9Block(g,1,14,18,1);
  R(g,'#66645f',0,8*TS,TS,2*TS); R(g,'#5a5854',0,8*TS,4,2*TS);   // 左の端は塀の切れ目
  R(g,'#66645f',19*TS,8*TS,TS,2*TS);
  // ---- 春日家 ----
  f9Roof(g,1,1,5,2,'#4a4e58');
  R(g,'#e8e0cc',TS+2,3*TS-4,5*TS-4,3);   // 障子の白
  f9Engawa(g,1,3,5);
  R(g,'#5a3a22',2.2*TS,3*TS+TS-8,TS*.8,4);   // 沓脱ぎ石の下駄
  E(g,'#8a8478',2.6*TS,4*TS-2,12,5);
  // 犬小屋（7,1）と杭
  RR(g,'#7a5030',7*TS+3,TS+4,TS-6,TS-6,2);
  g.fillStyle='#4a3020'; g.beginPath(); g.moveTo(7*TS+1,TS+3); g.lineTo(7.5*TS,TS-2); g.lineTo(8*TS-1,TS+3); g.lineTo(8*TS-1,TS+14); g.lineTo(7*TS+1,TS+14); g.closePath(); g.fill();
  R(g,'rgba(0,0,0,.25)',7.5*TS-1,TS-2,2,16);   // 屋根の棟
  RR(g,'#1e1612',7*TS+9,2*TS-11,TS-18,9,3);   // 入口
  f8Plate(g,L.sign.mugi,7*TS+6,TS+15,TS-12,'#5a3a22');
  C(g,'#5a4a3a',8*TS-4,2*TS+4,2.5); C(g,'#9aa0a8',8*TS-4,2*TS+4,1.2);   // 杭と、リードの留め金
  RR(g,'#e8d8b0',6*TS+6,TS+8,10,13,2); R(g,'#c8302a',6*TS+6,TS+11,10,3);   // ささみのおやつの袋
  // 右の垣根（板塀）と、半分開いた裏木戸（9,4）
  f9Fence(g,9,1,1,3); f9Fence(g,9,5,1,3);
  R(g,'#2a2018',9*TS+2,4*TS,TS-4,3); R(g,'#2a2018',9*TS+2,5*TS-3,TS-4,3);
  g.save(); g.translate(10*TS-3,4*TS+2); g.rotate(.95); R(g,'#7a5434',0,-3,TS-4,6); for(let i=4;i<TS-4;i+=5) R(g,'rgba(0,0,0,.25)',i,-3,1,6); g.restore();   // 路地へ開いた木戸
  R(g,'#9aa0a8',9*TS+3,4.5*TS-2,5,4);   // 掛け金（庭の側）
  // 下の生垣と表の門（3,7）
  f9Hedge(g,1,7,2,1,r); f9Hedge(g,4,7,5,1,r);
  R(g,'#5a3a22',3*TS-2,7*TS+2,4,TS-4); R(g,'#5a3a22',4*TS-2,7*TS+2,4,TS-4);
  f8Plate(g,L.sign.kasuga,4.2*TS,7*TS+11,1.5*TS,'#3a3a3e');
  // ---- 権藤家 ----
  f9Fence(g,11,1,1,7,'#5a4030');
  // 物干し（12〜13,1）：手ぬぐい・作業着・裏返しの綿入れ
  R(g,'#7a7468',12*TS+3,TS+2,3,TS-6); R(g,'#7a7468',14*TS-6,TS+2,3,TS-6); R(g,'#9aa0a8',12*TS+3,TS+5,2*TS-6,2);
  R(g,'#f0ece2',12*TS+9,TS+7,9,14); R(g,'#2a3450',12*TS+21,TS+7,14,18); R(g,'#222a40',12*TS+24,TS+7,8,4);
  RR(g,'#8a6440',13*TS+6,TS+7,16,17,3); R(g,'rgba(0,0,0,.18)',13*TS+13,TS+7,2,17);   // 茶色い裏地
  f9Roof(g,14,1,5,2,'#5a5048');
  R(g,'#e8e0cc',14*TS+2,3*TS-4,5*TS-4,3);
  f9Engawa(g,14,3,5);
  RR(g,'#6a5432',18*TS+4,3*TS+6,TS-8,TS-14,2); R(g,'#8a7048',18*TS+4,3*TS+4,TS-8,5); R(g,'#3a2a1a',18*TS+6,3*TS+9,TS-12,2);   // 道具箱（ふたが少し開いている）
  E(g,'#2a2a2e',15.4*TS,4*TS+2,6,3); E(g,'#2a2a2e',15.8*TS,4*TS+3,6,3);   // ゴム長靴
  // 盆栽棚（12〜14,5）
  R(g,'#6a5032',12*TS+2,5*TS+10,3*TS-4,10); R(g,'rgba(0,0,0,.3)',12*TS+2,5*TS+19,3*TS-4,2);
  for(const [x,c] of [[12.5,'#2c5030'],[13.3,'#a84a2a'],[14.2,'#3a6038']]){
    RR(g,'#4a5a6a',x*TS-6,5*TS+8,12,8,2); C(g,c,x*TS,5*TS+6,7); C(g,shade(c,20),x*TS-2,5*TS+4,3.5);
  }
  // 自転車（18,5）：前に針金のかご
  g.strokeStyle='#1a1a1e'; g.lineWidth=2;
  g.beginPath(); g.ellipse(18.5*TS,5*TS+9,2.4,7,0,0,Math.PI*2); g.stroke();
  g.beginPath(); g.ellipse(18.5*TS,6*TS-7,2.4,7,0,0,Math.PI*2); g.stroke();
  R(g,'#2a2a30',18.5*TS-1,5*TS+9,2,TS-16); R(g,'#2a2a30',18.5*TS-7,5*TS+12,14,2);
  g.strokeStyle='#8a8e94'; g.lineWidth=1; g.strokeRect(18.5*TS-6,5*TS+1,12,8);
  for(let i=1;i<4;i++){g.beginPath(); g.moveTo(18.5*TS-6+i*3,5*TS+1); g.lineTo(18.5*TS-6+i*3,5*TS+9); g.stroke();}
  // 下の板塀と門（16,7）
  f9Fence(g,12,7,4,1,'#5a4030'); f9Fence(g,17,7,2,1,'#5a4030');
  R(g,'#3a2a1e',16*TS-2,7*TS+2,4,TS-4); R(g,'#3a2a1e',17*TS-2,7*TS+2,4,TS-4);
  f8Plate(g,L.sign.gondo,14.2*TS,7*TS+11,1.4*TS,'#3a3a3e');
  f8Plate(g,L.sign.toSaka,17.05*TS,7*TS+11,1.9*TS,'#2a3a4a');
  // ---- 大森酒店（1〜5,10〜12） ----
  f9Roof(g,1,11,5,2,'#5a4a3e');
  R(g,'#3a2a20',TS,10*TS,5*TS,TS);   // 店の奥の暗がり
  for(let x=TS;x<6*TS;x+=12){R(g,x%24?'#2a4a7a':'#e8e6e0',x,10*TS,12,8);}   // 日よけ
  R(g,'rgba(0,0,0,.3)',TS,10*TS+8,5*TS,2);
  for(const x of [1.3,1.9,4.3,5.0]){RR(g,'#c8a03a',x*TS,10*TS+14,14,14,2); for(let i=0;i<3;i++) for(let j=0;j<3;j++) C(g,'#4a3a1a',x*TS+3.5+i*3.5,10*TS+17.5+j*3.5,1.2);}   // ビールケース
  f8Plate(g,L.sign.sakaya,2*TS,11*TS+12,3*TS,'#2a4a7a');
  // ---- 町内会の掲示板（8〜9,10） ----
  R(g,'#4a3a2a',8*TS+6,11*TS-6,3,6); R(g,'#4a3a2a',10*TS-9,11*TS-6,3,6);
  RR(g,'#5a3a22',8*TS+2,10*TS+2,2*TS-4,TS-8,2); R(g,'#b08a5a',8*TS+5,10*TS+5,2*TS-10,TS-14);
  R(g,'#efe6cc',8*TS+7,10*TS+7,22,13); g.strokeStyle='rgba(120,90,60,.6)'; g.lineWidth=.7;
  g.beginPath(); g.moveTo(8*TS+8,10*TS+15); g.lineTo(8*TS+28,10*TS+13); g.moveTo(8*TS+15,10*TS+7); g.lineTo(8*TS+18,10*TS+20); g.stroke();   // 町内の地図
  C(g,'#c8302a',8*TS+20,10*TS+12,1.3);
  R(g,'#f6f2e8',9*TS+12,10*TS+6,12,15); C(g,'#c8843a',9*TS+18,10*TS+11,3.4); R(g,'#c8302a',9*TS+14,10*TS+17,8,1.5);   // 迷い犬のポスター
  f8Plate(g,L.sign.keiji,8*TS+12,11*TS+2,TS+8,'#3a2a1e');
  // 自販機（11,10）
  RR(g,'#c8302a',11*TS+3,10*TS+2,TS-6,TS-6,2); R(g,'#eef0f2',11*TS+6,10*TS+5,TS-12,10);
  for(let i=0;i<4;i++) R(g,['#3a6ab8','#e8c23a','#3a8a4a','#c8602a'][i],11*TS+7+i*4.5,10*TS+7,3,6);
  R(g,'#2a2a2e',11*TS+8,10*TS+19,TS-16,4);
  // ---- 松井豆腐店（13〜18,10〜12） ----
  f9Roof(g,13,11,6,2,'#4a4a52');
  R(g,'#3a3430',13*TS,10*TS,6*TS,TS);
  for(let x=13*TS+2;x<19*TS-2;x+=10) R(g,'#2a3a6a',x,10*TS,8,11);   // のれん
  R(g,'rgba(255,255,255,.5)',13*TS+2,10*TS+4,6*TS-4,1);
  RR(g,'#7a9ab0',16.2*TS,10*TS+13,2.6*TS,14,2); R(g,'#a8c8d8',16.2*TS+2,10*TS+15,2.6*TS-4,10);   // 水槽
  for(let i=0;i<5;i++) R(g,'#f6f4ec',16.3*TS+4+i*15,10*TS+17,10,6);   // 豆腐
  for(let i=0;i<4;i++) R(g,'#d8a24a',13.3*TS+i*12,10*TS+17,10,7);   // 油揚げ
  f8Plate(g,L.sign.tofu,14.4*TS,11*TS+12,3.2*TS,'#2a3a6a');
  vignette(g,.2);
}

/* ---------- みはらし坂 ---------- */
function drawSaka(g){
  const r=rng(92);
  // 草地
  R(g,'#6a8a4c',0,0,PW,PH); f9Speckle(g,0,0,20,15,['#76984f','#5c7a40','#6e9048','#80a058'],3000,r);
  // 神社の境内（玉砂利）
  R(g,'#c4baa4',TS,TS,6*TS,7*TS); f9Speckle(g,1,1,6,7,['#b0a690','#d4cab4'],900,r);
  // 上の端：左は木立、右は海と柵
  f9Hedge(g,0,0,10,1,r);
  const sea=g.createLinearGradient(0,0,0,TS); sea.addColorStop(0,'#4a7aa0'); sea.addColorStop(1,'#7aa8c4');
  g.fillStyle=sea; g.fillRect(10*TS,0,10*TS,TS);
  for(let i=0;i<16;i++) R(g,'rgba(240,248,255,.4)',10*TS+((i*61)%(10*TS)),4+(i*7)%20,8+(i%3)*4,1);
  R(g,'#8a6a44',10*TS,TS-5,10*TS,3); for(let x=10*TS+4;x<PW;x+=20) R(g,'#6a4a2c',x,TS-9,3,9);   // 柵
  f9Block(g,0,1,1,11); f9Block(g,19,1,1,14); f9Block(g,1,14,18,1); f9Block(g,0,14,1,1);
  // 坂道（土）：左下の入口から、右上の坂の上へ
  const way=[[-.5,12.9],[3.5,9.6],[7,7.4],[11,5.2],[15.5,2.6]];
  g.lineCap='round'; g.lineJoin='round';
  for(const [w,c] of [[1.6*TS,'#8e7a5a'],[1.3*TS,'#b49c74']]){
    g.strokeStyle=c; g.lineWidth=w; g.beginPath(); way.forEach(([x,y],i)=>i?g.lineTo(x*TS,y*TS):g.moveTo(x*TS,y*TS)); g.stroke();
  }
  for(let i=0;i<60;i++){const k=r()*(way.length-1), j=Math.floor(k), f=k-j, [x1,y1]=way[j], [x2,y2]=way[j+1]; C(g,'rgba(90,70,40,.25)',(x1+(x2-x1)*f)*TS+(r()-.5)*28,(y1+(y2-y1)*f)*TS+(r()-.5)*28,1.4);}
  // 坂の上から、橋へ下りる小道
  g.strokeStyle='#a89070'; g.lineWidth=.8*TS; g.beginPath(); g.moveTo(12.4*TS,4.6*TS); g.quadraticCurveTo(11.2*TS,7.4*TS,11.9*TS,9.8*TS); g.stroke();
  // 入口の道（0,12〜13）と、川向こうの道
  R(g,'#a49c8a',0,12*TS,TS,2*TS);
  R(g,'#a49c8a',TS,12*TS,13*TS,2*TS); f9Speckle(g,1,12,13,2,['#99917e','#b2aa98'],400,r);
  f8Plate(g,L.sign.toSakura,TS+2,11*TS+12,2.4*TS,'#2a3a4a');
  // ---- 桜ヶ丘神社 ----
  f9Roof(g,1,1,5,2,'#5a4a3e');
  R(g,'#7a2a22',TS,3*TS,5*TS,6);   // 朱の縁
  R(g,'#1a1410',TS+2,3*TS+6,5*TS-4,TS-12);   // 床下の暗がり
  for(let x=TS+8;x<6*TS-4;x+=10) R(g,'#3a2a20',x,3*TS+6,3,TS-12);   // 束
  RR(g,'#6a4a2c',2.7*TS,3*TS+5,TS*.6,10,2); for(let i=0;i<4;i++) R(g,'#3a2a1a',2.7*TS+3+i*4.5,3*TS+7,2,6);   // 賽銭箱
  R(g,'#c8a03a',3*TS-1,2*TS,2,TS); C(g,'#e8c46a',3*TS,3*TS-2,3);   // 鈴の緒
  f8Plate(g,L.sign.jinja,1.5*TS,TS+3,4*TS,'#5a2a1e');
  // 狛犬（1,5・5,5）
  for(const x of [1,5]){RR(g,'#7a7a74',x*TS+5,5*TS+8,TS-10,TS-12,3); C(g,'#9a9a92',x*TS+TS/2,5*TS+10,7); C(g,'#6a6a64',x*TS+TS/2-2,5*TS+9,1.4); C(g,'#6a6a64',x*TS+TS/2+2,5*TS+9,1.4);}
  // 石段（2〜4,8〜9）
  for(let k=0;k<6;k++){const y=8*TS+k*10.6; R(g,k%2?'#a8a294':'#b8b2a4',2*TS,y,3*TS,10.6); R(g,'rgba(0,0,0,.22)',2*TS,y+9.6,3*TS,1);}
  // 鳥居（柱 2,7・4,7。笠木は横に渡す）
  for(const x of [2,4]){C(g,'rgba(0,0,0,.3)',x*TS+TS/2+3,7*TS+TS/2+3,6); C(g,'#b8402e',x*TS+TS/2,7*TS+TS/2,6); C(g,'#d8604a',x*TS+TS/2-2,7*TS+TS/2-2,2);}
  R(g,'rgba(0,0,0,.25)',1.4*TS+3,7*TS+3,3.2*TS,6); R(g,'#1e1a18',1.4*TS,7*TS-1,3.2*TS,6); R(g,'#b8402e',1.6*TS,7*TS+6,2.8*TS,3);
  // 松の木
  f9Pine(g,8*TS,2*TS,30,r); f9Pine(g,18.5*TS,2*TS,22,r); f9Pine(g,6.2*TS,5.4*TS,14,r);
  // ---- 坂の上のベンチ（14〜16,1）。足もとはぬかるみ ----
  E(g,'#6a5438',15.5*TS,2.5*TS,1.6*TS,.42*TS); E(g,'rgba(120,140,160,.25)',15*TS,2.45*TS,.6*TS,.12*TS);
  RR(g,'#6a4a2c',14*TS+3,TS+6,3*TS-6,TS-12,3); for(let x=14*TS+8;x<17*TS-4;x+=8) R(g,'rgba(0,0,0,.25)',x,TS+6,1,TS-12);
  R(g,'#4a3420',14*TS+3,TS+4,3*TS-6,4);   // 背もたれ（海の側）
  f8Plate(g,L.sign.miharashi,12*TS+2,TS+12,1.8*TS,'#3a2a1e');
  // 瀬川の原付（8,8）
  RR(g,'#c8302a',8*TS+10,8*TS+3,12,TS-6,5); C(g,'#1a1a1e',8*TS+16,8*TS+4,3.5); C(g,'#1a1a1e',8*TS+16,9*TS-4,3.5);
  R(g,'#2a2a2e',8*TS+8,8*TS+9,16,3); RR(g,'#e8e2d0',8*TS+11,9*TS-13,10,8,1);
  // ---- みはらし川（6〜18,10〜11）と、みはらし橋（11〜12） ----
  R(g,'#5a6a4a',5.6*TS,10*TS-4,13.4*TS,2*TS+8);   // 土手
  const riv=g.createLinearGradient(0,10*TS,0,12*TS); riv.addColorStop(0,'#4a7090'); riv.addColorStop(.5,'#5a88a8'); riv.addColorStop(1,'#46688a');
  g.fillStyle=riv; g.fillRect(6*TS,10*TS+2,13*TS,2*TS-4);
  for(let i=0;i<34;i++) R(g,'rgba(220,235,245,.3)',6*TS+((i*83)%(13*TS)),10*TS+6+((i*29)%(2*TS-14)),6+(i%4)*3,1);
  RR(g,'#7a7a74',5.6*TS,10*TS+4,TS*.6,2*TS-8,3); RR(g,'#2a2a2e',5.9*TS,10.5*TS,TS*.3,TS,6);   // 土管の口
  R(g,'#8a7458',11*TS,10*TS-6,2*TS,2*TS+12); for(let y=10*TS-6;y<12*TS+6;y+=6) R(g,'rgba(0,0,0,.2)',11*TS,y,2*TS,1);   // 橋板
  R(g,'#5a4430',11*TS-2,10*TS-6,4,2*TS+12); R(g,'#5a4430',13*TS-2,10*TS-6,4,2*TS+12);   // 欄干
  f8Plate(g,L.sign.bridge,13.1*TS,9*TS+14,2.4*TS,'#3a3a3e');
  // ---- あしだ動物病院（14〜18,12〜13。入口 14,13） ----
  R(g,'#e6e4dc',14*TS,12*TS,5*TS,2*TS); R(g,'#9aaab4',14*TS,12*TS,5*TS,TS-4); for(let yy=12*TS+3;yy<13*TS-4;yy+=5) R(g,'rgba(0,0,0,.12)',14*TS,yy,5*TS,1);
  R(g,'rgba(0,0,0,.25)',14*TS,13*TS-4,5*TS,3);
  R(g,'#a8c8d8',14*TS+2,13*TS+2,6,TS-6); R(g,'rgba(255,255,255,.5)',14*TS+3,13*TS+4,2,TS-12);   // ガラス戸
  RR(g,'#f4f4f0',16.3*TS,13*TS+4,22,22,3); R(g,'#c8302a',16.3*TS+9,13*TS+8,4,14); R(g,'#c8302a',16.3*TS+4,13*TS+13,14,4);   // 赤十字
  f8Plate(g,L.sign.clinic,14.5*TS,12*TS+6,4*TS,'#2a4a6a');
  f8Plate(g,L.sign.kyukan,16.9*TS,13*TS+16,2*TS,'#6a2a2a');
  // 病院の前の、小さな木のベンチ（11,13）
  RR(g,'#6a4a2c',10.6*TS,13*TS+16,TS*.8,9,2);
  vignette(g,.2);
}
// 推理③が崩れたら、坂の上のベンチのぬかるみに、足あととタイヤの跡を描き足す（render.js が探索中に毎フレーム呼ぶ）
function f9SakaOverlay(g,t){
  if(phase()<3) return;
  g.save();
  // ゴム長靴の足あとと、犬の足あと：坂をのぼって、ベンチまで
  for(let i=0;i<9;i++){
    const f=i/8, x=(12.6+(15.2-12.6)*f)*TS, y=(4.2+(2.75-4.2)*f)*TS, s=i%2?4:-4;
    E(g,'rgba(50,36,22,.55)',x-s*.6,y+s,3.4,2,-.5);
    C(g,'rgba(50,36,22,.45)',x+7,y+6-s*.4,1.4); C(g,'rgba(50,36,22,.45)',x+9,y+4-s*.4,1.1);
  }
  // 自転車のタイヤの跡：ベンチから、坂を下る向きに
  g.strokeStyle='rgba(40,28,16,.5)'; g.lineWidth=1.6;
  g.beginPath(); g.moveTo(15*TS,2.8*TS); g.quadraticCurveTo(13*TS,3.8*TS,12.4*TS,5*TS); g.stroke();
  // ぬかるみに落ちた鈴（拾うまで）
  if(!has('bench')){const a=.6+.4*Math.sin(t*4); C(g,`rgba(232,196,106,${a})`,15.6*TS,2.55*TS,2.2); C(g,'#7a5a1a',15.6*TS,2.55*TS+.8,.7);}
  g.restore();
}

Object.assign(DRAWERS,{sakura:drawSakura,saka:drawSaka});
MAPDEF.saka.overlay=f9SakaOverlay;
