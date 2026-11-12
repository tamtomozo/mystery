/* 背景：FILE.06（地下の映画館「銀星座」の客席・ロビー）
   探索中は停電で暗いので、render.js の drawDark が上から闇を重ねる。ここでは灯りのついた姿で描く（推理シーンはこのまま） */
'use strict';

/* ---------- 共通 ---------- */
// 小さな札。x,y は左上
function f6Plate(g,text,x,y,w,bg='#2a2420',fg='#e8d8b0'){
  RR(g,'#0e0c0a',x-1,y-1,w+2,12,2); R(g,bg,x,y,w,10);
  g.save(); g.fillStyle=fg; g.font='bold 8px sans-serif'; g.textAlign='center'; g.textBaseline='middle';
  g.fillText(text,x+w/2,y+5.5,w-2); g.restore();
}
// 緑の非常口の灯り（走る人の絵）。x,y は中心
function f6ExitSign(g,x,y){
  glow(g,x,y,26,'rgba(80,220,120,.25)');
  RR(g,'#1f9a4a',x-11,y-6,22,12,2); R(g,'#e8fff0',x-9,y-4,8,8);
  g.fillStyle='#1f9a4a'; C(g,'#1f9a4a',x-5,y-2.2,1.2);
  g.fillRect(x-5.5,y-1,1.5,3); g.fillRect(x-7,y+1.5,1.5,1.5); g.fillRect(x-4,y+1.5,1.5,1.5);
  g.fillStyle='#e8fff0'; g.beginPath(); g.moveTo(x+1,y-3); g.lineTo(x+8,y); g.lineTo(x+1,y+3); g.closePath(); g.fill();
}
// 赤い絨毯（金の小さな模様つき）
function f6Carpet(g,r,x,y,w,h,c1='#5a1c22',c2='#4e1820'){
  R(g,c1,x*TS,y*TS,w*TS,h*TS);
  for(let yy=y*TS;yy<(y+h)*TS;yy+=16) for(let xx=x*TS+((yy/16)%2)*8;xx<(x+w)*TS;xx+=16){
    R(g,c2,xx,yy,8,8); C(g,'rgba(200,160,80,.12)',xx+4,yy+4,1.2);
  }
  for(let i=0;i<w*h*4;i++) R(g,'rgba(0,0,0,.08)',x*TS+r()*w*TS,y*TS+r()*h*TS,2,2);
}
function f6Wall(g,x,y,w,h,c='#2a2228'){
  R(g,c,x*TS,y*TS,w*TS,h*TS);
  R(g,'rgba(255,240,220,.06)',x*TS,y*TS,w*TS,2); R(g,'rgba(0,0,0,.3)',x*TS,(y+h)*TS-3,w*TS,3);
}
function f6Concrete(g,r,x,y,w,h,c='#4a4846'){
  R(g,c,x*TS,y*TS,w*TS,h*TS);
  for(let i=0;i<w*h*14;i++) R(g,r()<.5?'rgba(0,0,0,.1)':'rgba(255,255,255,.05)',x*TS+r()*w*TS,y*TS+r()*h*TS,2,2);
}

/* ---------- 客席 ---------- */
function drawTheater(g){
  const r=rng(61);
  // 床：通路は赤い絨毯
  f6Carpet(g,r,0,0,20,15);
  // 外まわりの壁（布張り）
  for(const [x,y,w,h] of [[0,0,20,1],[0,0,1,15],[19,0,1,15],[0,14,20,1]]) f6Wall(g,x,y,w,h,'#2e2026');
  for(let y=TS;y<14*TS;y+=TS){R(g,'rgba(0,0,0,.25)',TS-3,y,3,TS-4); R(g,'rgba(0,0,0,.25)',19*TS,y,3,TS-4);}
  // 舞台（4〜15,2）とスクリーン（4〜15,1）、両脇の赤い幕
  R(g,'#5e4430',4*TS,2*TS,12*TS,TS); for(let x=4*TS;x<16*TS;x+=12) R(g,'rgba(0,0,0,.2)',x,2*TS,1,TS);
  R(g,'#3e2c20',4*TS,3*TS-4,12*TS,4);
  R(g,'#0c0c0e',4*TS,TS,12*TS,TS);
  R(g,'#e9e6dc',4.5*TS,TS+4,11*TS,TS-8); R(g,'rgba(0,0,0,.08)',4.5*TS,TS+4,11*TS,3);
  for(const x of [4,15]){
    R(g,'#7a1820',x*TS,TS,TS,2*TS-4);
    for(let i=0;i<5;i++) R(g,i%2?'#661418':'#8a2028',x*TS+i*6+1,TS,4,2*TS-4);
  }
  R(g,'#8a2028',4*TS,TS-2,12*TS,6); for(let x=4*TS;x<16*TS;x+=8) R(g,'rgba(0,0,0,.2)',x,TS-2,1,6);   // 上の幕
  // 機械室（1〜2,1〜4）：コンクリートの床と壁、分電盤（1,1）
  f6Concrete(g,r,1,1,2,4);
  f6Wall(g,3,1,1,4,'#3a3438'); f6Wall(g,1,5,1,1,'#3a3438'); f6Wall(g,3,5,1,1,'#3a3438');
  R(g,'#3a3a3c',2*TS+2,5*TS+TS/2-1,TS-4,2);   // 入口の敷居
  RR(g,'#6a6e74',TS+3,TS+1,TS-6,TS-4,2); R(g,'#4a4e54',TS+6,TS+4,TS-12,TS-10);
  g.strokeStyle='rgba(200,200,200,.35)'; g.lineWidth=.6;
  for(let i=0;i<5;i++){g.beginPath(); g.moveTo(TS+6+i*4,TS+4); g.lineTo(TS+6+i*4,2*TS-6); g.stroke();}   // 金網
  R(g,'#1a1a1c',TS+12,TS+10,6,10); R(g,'#c83a2a',TS+13,TS+17,4,3);   // 主ブレーカー（下＝切）
  RR(g,'#c9a45a',TS+22,TS+12,4,6,1);   // 南京錠
  for(let i=0;i<3;i++) R(g,'#5a4a3a',TS+4,2.4*TS+i*TS*0.7,TS*1.6,4);   // 壁ぎわの古い看板の板
  f6Plate(g,L.sign.kikai,TS+4,5*TS+12,TS*1.6);
  // 右の舞台袖（16〜18,1〜2）
  R(g,'#3e3026',16*TS,TS,3*TS,2*TS); for(let x=16*TS;x<19*TS;x+=10) R(g,'rgba(0,0,0,.2)',x,TS,1,2*TS);
  R(g,'#8a7a5a',18*TS+6,TS+4,4,TS-8); R(g,'#c8b88a',18*TS+4,TS+6,8,3);   // 緞帳の綱
  // 非常口（19,3）：扉と緑の灯り、赤いワイヤー錠
  R(g,'#5a5e64',19*TS+2,3*TS-4,TS-4,TS+8); R(g,'#7a7e84',19*TS+4,3*TS-2,TS-8,TS+4);
  R(g,'#b8bcc2',19*TS+5,3.5*TS-2,TS-12,4);   // 押し開けるレバー
  g.strokeStyle='#d02a24'; g.lineWidth=2;
  g.beginPath(); g.ellipse(19*TS+10,3.5*TS,6,5,0,0,Math.PI*2); g.stroke();
  g.beginPath(); g.ellipse(19*TS+16,3.5*TS+1,6,4,.4,0,Math.PI*2); g.stroke();
  RR(g,'#a01e1a',19*TS+8,3.5*TS+4,9,6,1); R(g,'#e8e0c8',19*TS+9,3.5*TS+6,7,2);
  f6ExitSign(g,18.6*TS,2.3*TS);
  // 客席：3列（y=7・9・11）。背もたれは手前（下）側。客はスクリーン（上）を向く
  for(const y of [7,9,11]) for(const [x0,x1] of [[2,8],[11,17]]) for(let x=x0;x<=x1;x++){
    const X=x*TS, Y=y*TS;
    R(g,'rgba(0,0,0,.35)',X+1,Y+4,TS-2,TS-2);
    RR(g,'#8a2430',X+2,Y+3,TS-4,TS-12,3);            // 座面
    RR(g,'#6a1a24',X+2,Y+TS-11,TS-4,9,3);            // 背もたれ
    R(g,'rgba(255,200,180,.08)',X+4,Y+5,TS-8,2);
    R(g,'#2a1a14',X,Y+6,2,TS-10); R(g,'#2a1a14',X+TS-2,Y+6,2,TS-10);   // ひじ掛け
  }
  // 通路の足もと灯り
  for(const y of [8,10,12]) for(const x of [1,9,10,18]) C(g,'rgba(255,214,140,.5)',x*TS+TS/2,y*TS+TS-3,1.4);
  // 「館主席」の札（5,7）
  R(g,'#e8dcc0',5*TS+10,7*TS+TS-9,12,5);
  // 下の壁：ロビーへの扉（9〜10,14）と映写窓（15,14）
  R(g,'#3a2a20',9*TS,14*TS+2,2*TS,TS-2); R(g,'#5a4030',9*TS+3,14*TS+4,2*TS-6,TS-6); R(g,'#2a1e16',10*TS-1,14*TS+4,2,TS-6);
  C(g,'#c9a45a',10*TS-5,14.5*TS,1.6); C(g,'#c9a45a',10*TS+5,14.5*TS,1.6);
  f6Plate(g,L.sign.lobby6,9*TS+6,13*TS+18,2*TS-12);
  R(g,'#0a0a0c',15*TS+8,14*TS+6,TS-16,10); R(g,'rgba(140,160,190,.25)',15*TS+10,14*TS+8,TS-20,3);
  // 壁の非常灯（0,8）と消火器（19,12）
  R(g,'#e8f0e0',4,8*TS+8,TS-12,TS-16); glow(g,TS/2,8.5*TS,22,'rgba(200,255,210,.2)');
  R(g,'#c83a2a',19*TS+10,12*TS+8,10,16); R(g,'#2a2a2a',19*TS+12,12*TS+5,6,4);
  // 天井のシャンデリア風の灯り（消えている）
  for(const x of [5,10,15]) C(g,'rgba(255,240,200,.05)',x*TS,8*TS,60);
  vignette(g,.35);
}

/* ---------- ロビー ---------- */
function drawLobby(g){
  const r=rng(62);
  // 床：広間は絨毯、事務所は板、映写室・控室はコンクリート、階段はタイル
  f6Carpet(g,r,0,0,20,15,'#4a2a22','#42241e');
  for(let yy=TS;yy<5*TS;yy+=8){R(g,(yy/8)%2?'#6a4a32':'#62442e',TS,yy,5*TS,8); R(g,'rgba(0,0,0,.14)',TS,yy+7,5*TS,1);}   // 事務所
  f6Concrete(g,r,14,1,5,4,'#4c4a48');   // 映写室
  f6Concrete(g,r,14,11,5,3,'#55585a');  // 控室
  // 外まわりと仕切りの壁（MAPDEF.lobby と同じ位置）
  for(const [x,y,w,h] of [[0,0,20,1],[0,0,1,15],[19,0,1,15],[0,14,20,1],
    [6,1,1,5],[1,5,2,1],[4,5,2,1],[13,1,1,5],[14,5,2,1],[17,5,2,1],[13,10,6,1],[13,11,1,1],[13,13,1,1]]) f6Wall(g,x,y,w,h,'#3a2c2a');
  for(const [x,y] of [[3,5],[16,5],[13,12]]) R(g,'#2a1e18',x*TS+2,y*TS+TS/2-1,TS-4,2);   // 入口の敷居
  // 客席への扉（9〜10,0）
  R(g,'#3a2a20',9*TS,0,2*TS,TS-2); R(g,'#5a4030',9*TS+3,2,2*TS-6,TS-6); R(g,'#2a1e16',10*TS-1,2,2,TS-6);
  C(g,'#c9a45a',10*TS-5,TS/2,1.6); C(g,'#c9a45a',10*TS+5,TS/2,1.6);
  f6Plate(g,L.sign.seats,9*TS+6,TS+2,2*TS-12);
  // 天井の看板「銀星座」
  f6Plate(g,L.sign.ginsei,7.2*TS,4*TS+8,5.6*TS,'#14182a','#e8d070');
  for(let i=0;i<9;i++) C(g,'rgba(232,208,112,.5)',7.4*TS+i*TS*0.65,4*TS+4,1.2);
  // 事務所：机（1〜2,1）と金庫（5,1）、札
  RR(g,'#4a2d18',TS+2,TS+2,2*TS-4,TS-4,2); R(g,'#f4f0e4',TS+8,TS+8,14,10); R(g,'#2a2420',TS+28,TS+7,10,8);
  RR(g,'#3a3c40',5*TS+3,TS+2,TS-6,TS-4,2); C(g,'#9a9ea4',5.5*TS,1.5*TS,4); R(g,'#1a1a1c',5.5*TS-1,1.5*TS-4,2,8);
  f6Plate(g,L.sign.jimu,1.1*TS,4*TS+16,1.8*TS);
  // 壁のポスター（事務所の壁・下側）
  for(const x of [1,2,4,5]){
    const c=['#7a3a2a','#2a4a6a','#6a5a2a','#3a5a3a'][x%4];
    R(g,'#c9a45a',x*TS+4,5*TS+4,TS-8,TS-6); R(g,c,x*TS+6,5*TS+6,TS-12,TS-10);
    R(g,'rgba(255,240,200,.5)',x*TS+8,5*TS+9,TS-16,3);
  }
  // 映写室：35ミリ（14〜15,1）・16ミリ（17,1）・缶の棚（18,2〜3）・作業机（14〜15,3）・映写窓（上の壁）
  for(const x of [14.5,16.5]) R(g,'#0a0a0c',x*TS-6,4,12,TS-14);   // 映写窓
  RR(g,'#5a6068',14*TS+3,TS+2,2*TS-6,TS-4,4); RR(g,'#7a8088',14*TS+8,TS+5,2*TS-16,TS-12,3);
  C(g,'#3a3e44',14.5*TS,TS+6,9); C(g,'#9aa0a8',14.5*TS,TS+6,3); C(g,'#3a3e44',15.5*TS,TS+6,9); C(g,'#9aa0a8',15.5*TS,TS+6,3);   // リール
  R(g,'#2a2e34',15*TS-3,TS-2,6,6);   // レンズ
  RR(g,'#6a6e78',17*TS+5,TS+5,TS-10,TS-10,3); C(g,'#2a2a2e',17.5*TS,TS+8,6); C(g,'#a8acb4',17.5*TS,TS+8,2);   // 16ミリ
  R(g,'#e8e4d8',17*TS+14,TS+16,3,10);   // 白いリーダー
  R(g,'#4a3a2a',18*TS+2,2*TS,TS-4,2*TS);
  for(let i=0;i<6;i++){C(g,'#8a8e94',18.5*TS,2*TS+6+i*9,6); C(g,'#6a6e74',18.5*TS,2*TS+6+i*9,2);}   // フィルム缶
  RR(g,'#5a4430',14*TS+2,3*TS+3,2*TS-4,TS-6,2); R(g,'#e8dcc0',14*TS+6,3*TS+7,14,11); R(g,'#3a2a1a',14*TS+7,3*TS+8,12,1);   // 日誌
  R(g,'#8a8e94',15*TS+6,3*TS+10,10,2); R(g,'#2a2a2a',15*TS+18,3*TS+8,6,6);   // ハサミ・油差し
  f6Plate(g,L.sign.eisha,13.2*TS,5*TS+14,2.6*TS,'#5a1a1a','#f4e0c0');
  // 売店（1〜4,7）：カウンター・ポップコーン機・署名箱
  RR(g,'#6a4a30',TS+1,7*TS+3,4*TS-2,TS-6,2); R(g,'#8a6a48',TS+3,7*TS+5,4*TS-6,4);
  RR(g,'#c83a2a',TS+5,7*TS+8,TS-10,TS-14,2); R(g,'#f4e8b0',TS+8,7*TS+10,TS-16,6);   // ポップコーン機
  R(g,'#b89a6a',2*TS+5,7*TS+8,TS-10,TS-14); R(g,'#2a2420',2*TS+10,7*TS+10,TS-20,2);   // 署名箱
  for(let i=0;i<5;i++) R(g,['#6ab0d0','#e0c050','#d06a8a'][i%3],3*TS+6+i*8,7*TS+10,4,10);   // ラムネの瓶
  f6Plate(g,L.sign.baiten,1.6*TS,6*TS+6,2*TS);
  // ベンチ（6〜8,9）
  RR(g,'#5a2a2a',6*TS+3,9*TS+6,3*TS-6,TS-12,4); for(let x=6*TS+12;x<9*TS-6;x+=12) R(g,'rgba(0,0,0,.25)',x,9*TS+6,1,TS-12);
  // 喫煙所（14,7）とピンク電話（18,7）
  C(g,'#5a5e64',14.5*TS,7.5*TS,8); C(g,'#2a2a2c',14.5*TS,7.5*TS,5); R(g,'#e8e4dc',14.5*TS+5,7.5*TS+8,5,1.5);
  f6Plate(g,L.sign.kitsuen,13.6*TS,6*TS+4,1.8*TS);
  RR(g,'#4a3020',18*TS+2,7*TS+4,TS-4,TS-8,2); RR(g,'#e88aa0',18*TS+6,7*TS+6,TS-12,TS-12,3);
  R(g,'#c86a80',18*TS+8,7*TS+8,TS-16,5); C(g,'#2a2a2a',18.5*TS,7.5*TS+4,2);
  // 切符売り場（1〜3,11〜13）
  RR(g,'#5a3a24',TS+1,11*TS+1,3*TS-2,3*TS-2,3); R(g,'#3a2414',TS+4,11*TS+4,3*TS-8,3*TS-8);
  R(g,'#9ab4c4',4*TS-8,11.6*TS,5,1.8*TS);   // 窓口のガラス
  C(g,'#d8b070',2.3*TS,12.5*TS,5);   // 座布団
  f6Plate(g,L.sign.kippu,TS+10,10*TS+14,2*TS);
  // 地上への階段（9〜10,10〜13）と手すり（8・11）
  for(let i=0;i<8;i++){const y=10*TS+i*TS/2; R(g,i%2?'#8a847a':'#7e786e',9*TS,y,2*TS,TS/2); R(g,'rgba(0,0,0,.2)',9*TS,y+TS/2-2,2*TS,2);}
  for(const x of [8,11]){R(g,'#3a2a20',x*TS+10,10*TS,TS-20,4*TS); R(g,'#c9a45a',x*TS+14,10*TS,4,4*TS);}
  // 防火シャッター（9〜10,14）
  R(g,'#6a6e74',9*TS-4,14*TS,2*TS+8,TS); for(let y=14*TS+2;y<15*TS;y+=4) R(g,'rgba(0,0,0,.28)',9*TS-4,y,2*TS+8,1.5);
  R(g,'#4a4e54',11*TS+6,13*TS+8,6,6); C(g,'#2a2a2c',11*TS+9,13*TS+11,1.6);   // ハンドルの差し込み口
  // 控室（14〜18,11〜13）：ロッカー（15〜18,13）・机
  for(let x=15;x<19;x++){RR(g,'#6a7480',x*TS+2,13*TS+1,TS-4,TS-3,1); R(g,'#4a5460',x*TS+TS/2-1,13*TS+4,2,TS-8); R(g,'#e8e4d8',x*TS+8,13*TS+4,12,5);}
  C(g,'#8a8e94',18*TS+4,12*TS+24,1.6);   // 空のフック
  RR(g,'#6a5a48',15*TS+4,11*TS+6,2*TS-8,TS-12,2); C(g,'#e8e4dc',15.6*TS,11.5*TS,4);   // 机と湯のみ
  f6Plate(g,L.sign.hikae,13.6*TS,9*TS+20,2*TS);
  // 非常灯
  f6ExitSign(g,0.9*TS,9*TS); f6ExitSign(g,18.1*TS,9.6*TS);
  vignette(g,.32);
}

Object.assign(DRAWERS,{theater:drawTheater,lobby:drawLobby});
