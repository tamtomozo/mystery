/* 背景：FILE.05（月影台小学校の校庭・北校舎） */
'use strict';

/* ---------- 共通 ---------- */
// 名札（壁に掛ける小さな板）。x,y は板の左上
function f5Plate(g,text,x,y,w,bg='#f4f0e4',fg='#2a2a2a'){
  RR(g,'#5a4a3a',x-1,y-1,w+2,12,2); R(g,bg,x,y,w,10);
  g.save(); g.fillStyle=fg; g.font='bold 8px sans-serif'; g.textAlign='center'; g.textBaseline='middle';
  g.fillText(text,x+w/2,y+5.5,w-2); g.restore();
}

/* ---------- 校庭 ---------- */
function drawSchoolyard(g){
  const r=rng(51);
  // 砂の校庭
  R(g,'#cdbb92',0,0,PW,PH);
  for(let i=0;i<1400;i++){g.fillStyle=r()<.5?'rgba(120,96,60,.10)':'rgba(255,250,235,.12)'; g.fillRect(r()*PW,r()*PH,2,2);}
  // トラックの白線
  g.strokeStyle='rgba(250,248,240,.55)'; g.lineWidth=2;
  g.beginPath(); g.ellipse(10*TS,8.6*TS,5.4*TS,2.7*TS,0,0,Math.PI*2); g.stroke();
  g.strokeStyle='rgba(250,248,240,.3)'; g.setLineDash([6,6]);
  g.beginPath(); g.ellipse(10*TS,8.6*TS,4.4*TS,1.9*TS,0,0,Math.PI*2); g.stroke(); g.setLineDash([]);
  // 東の隅：桜の切り株のまわりの赤土と、埋め戻した跡
  E(g,'#a8603e',15.5*TS,4.9*TS,2.3*TS,1.7*TS); E(g,'#b06844',15.5*TS,4.8*TS,1.8*TS,1.3*TS);
  for(let i=0;i<260;i++){const a=r()*Math.PI*2, d=Math.sqrt(r()); g.fillStyle=r()<.5?'rgba(70,30,15,.18)':'rgba(240,170,120,.12)'; g.fillRect(15.5*TS+Math.cos(a)*d*2.2*TS,4.9*TS+Math.sin(a)*d*1.6*TS,2,2);}
  for(const [x,y] of [[14.2,3.7],[16.6,3.9],[14.0,5.6],[16.9,5.3],[15.1,6.2],[16.3,6.1],[13.9,4.6],[17.1,4.6],[14.6,6.3],[16.0,3.5],[14.9,3.4]])
    E(g,'rgba(90,40,20,.22)',x*TS,y*TS,9,6);
  // 外まわり：左右と下は植え込みの帯と緑のフェンス
  for(const [x,y,w,h] of [[0,0,TS,PH],[19*TS,0,TS,PH],[0,14*TS,PW,TS]]){
    R(g,'#6f8a4e',x,y,w,h);
    for(let i=0;i<w*h/90;i++){g.fillStyle=r()<.5?'rgba(30,60,20,.25)':'rgba(180,220,140,.15)'; g.fillRect(x+r()*w,y+r()*h,2,2);}
  }
  g.strokeStyle='rgba(60,90,70,.55)'; g.lineWidth=1;
  for(let y=TS;y<14*TS;y+=6){g.beginPath(); g.moveTo(TS-3,y); g.lineTo(TS-3,y+3); g.moveTo(19*TS+3,y); g.lineTo(19*TS+3,y+3); g.stroke();}
  R(g,'#4e6a58',TS-4,3*TS,2,11*TS); R(g,'#4e6a58',19*TS+2,3*TS,2,11*TS); R(g,'#4e6a58',TS,14*TS+2,PW-2*TS,2);
  // 東のフェンスの向こう：陽太の家の屋根の端
  R(g,'#6a4e44',19*TS+8,4*TS,TS-8,4*TS); for(let y=4*TS;y<8*TS;y+=6) R(g,'rgba(0,0,0,.2)',19*TS+8,y,TS-8,1.5);
  R(g,'#b8c8d4',19*TS+12,5.6*TS,TS-16,10);   // 二階の窓
  // 北校舎（上の 1〜2 段）
  R(g,'#55565c',0,0,PW,8); R(g,'#e2ddd0',0,8,PW,3*TS-8); R(g,'#c8c2b4',0,3*TS-6,PW,6);
  for(let x=TS;x<19*TS;x+=TS){
    if(x===9*TS||x===10*TS) continue;
    R(g,'#7a8a90',x+3,TS+2,TS-6,TS-6); R(g,'#a8c2ce',x+5,TS+4,TS-10,TS-10); R(g,'#7a8a90',x+TS/2-1,TS+4,2,TS-10);
    R(g,'rgba(255,255,255,.35)',x+6,TS+5,5,TS-14);
  }
  // 時計
  C(g,'#5a5a60',10*TS,TS*.62,11); C(g,'#f6f4ee',10*TS,TS*.62,9);
  g.strokeStyle='#222'; g.lineWidth=1.5; g.beginPath(); g.moveTo(10*TS,TS*.62); g.lineTo(10*TS,TS*.62-6); g.moveTo(10*TS,TS*.62); g.lineTo(10*TS+5,TS*.62+1); g.stroke();
  // 昇降口（9〜10,2）
  R(g,'#4a5a62',9*TS,TS+8,2*TS,2*TS-8); R(g,'#8aa4b0',9*TS+3,TS+12,2*TS-6,2*TS-14);
  for(const x of [9.5,10,10.5]) R(g,'#4a5a62',x*TS-1,TS+12,2,2*TS-14);
  R(g,'#9a948a',8.8*TS,3*TS-4,2.4*TS,4);
  f5Plate(g,L.sign.shoko,9.25*TS,TS*1.05-2,TS*1.5);
  // 体育倉庫（2〜3,4〜5）
  RR(g,'#5c6168',2*TS+1,4*TS+1,2*TS-2,2*TS-2,2); R(g,'#8a9098',2*TS+4,4*TS+4,2*TS-8,2*TS-8);
  for(let y=4*TS+8;y<6*TS-4;y+=5) R(g,'rgba(0,0,0,.14)',2*TS+4,y,2*TS-8,1);
  R(g,'#4a4e54',3*TS-1,4*TS+4,2,2*TS-8);
  // 学級菜園（5〜7,6）
  RR(g,'#6a4a32',5*TS+1,6*TS+3,3*TS-2,TS-6,2); R(g,'#3a2a1e',5*TS+4,6*TS+6,3*TS-8,TS-12);
  for(let x=5*TS+9;x<8*TS-6;x+=10){C(g,'#5a9a40',x,6*TS+13,4); C(g,'#7ab85a',x+2,6*TS+11,2.4); C(g,'#5a9a40',x-1,6*TS+21,3.5);}
  R(g,'#e8e0c8',7*TS+16,6*TS-6,10,9); R(g,'#6a4a32',7*TS+20,6*TS+3,2,6);
  // 空っぽの穴（15,4）とまわりの立入禁止テープ、桜の切り株（15,5）
  E(g,'#2a1c14',15.5*TS,4.45*TS,12,9); E(g,'#3e2a1e',15.5*TS,4.35*TS,10,6); E(g,'rgba(140,70,40,.6)',15.5*TS,4.6*TS,6,3);
  for(const [x,y] of [[14.65,3.7],[16.35,3.7],[14.65,5.75],[16.35,5.75]]){E(g,'rgba(0,0,0,.25)',x*TS+2,y*TS+4,4,2); g.fillStyle='#e8762a'; g.beginPath(); g.moveTo(x*TS,y*TS-7); g.lineTo(x*TS-4,y*TS+3); g.lineTo(x*TS+4,y*TS+3); g.fill();}
  // 黄と黒の立入禁止テープ（コーンの頭を結ぶ）
  g.lineWidth=2; g.strokeStyle='#f2c21a'; g.strokeRect(14.65*TS,3.7*TS-3,1.7*TS,2.05*TS);
  g.setLineDash([5,5]); g.strokeStyle='#2a2a2a'; g.strokeRect(14.65*TS,3.7*TS-3,1.7*TS,2.05*TS); g.setLineDash([]);
  C(g,'#5a3e28',15.5*TS,5.5*TS,12); C(g,'#9a7448',15.5*TS,5.5*TS,10);
  g.strokeStyle='rgba(90,60,30,.6)'; g.lineWidth=1; for(const rr of [7,4.5,2]){g.beginPath(); g.arc(15.5*TS,5.5*TS,rr,0,Math.PI*2); g.stroke();}
  // 二宮金次郎像（17,7）
  E(g,'rgba(0,0,0,.25)',17.5*TS+4,7.5*TS+8,14,6);
  R(g,'#8a8a86',17*TS+3,7*TS+5,TS-6,TS-8); R(g,'#a4a4a0',17*TS+5,7*TS+7,TS-10,TS-12);
  R(g,'#6a5a3a',17*TS+8,7*TS+3,TS-16,9);   // 背負った薪
  C(g,'#7e7e78',17.5*TS,7.5*TS+1,6); C(g,'#8e8e88',17.5*TS,7.5*TS-4,4.5); R(g,'#5e5e58',17.5*TS-4,7.5*TS+3,8,3);   // 本
  E(g,'rgba(150,80,50,.35)',17.5*TS,8.5*TS-6,13,5);   // 台座の前の、ならした土
  // 植え込み（18,9〜11）
  for(let y=9;y<12;y++) for(const [dx,dy,rr] of [[10,10,11],[22,14,10],[14,24,10],[24,26,8]]) C(g,y%2?'#4a7a3a':'#527f40',18*TS+dx,y*TS+dy,rr);
  for(let i=0;i<60;i++) C(g,'rgba(160,210,120,.25)',18*TS+4+r()*24,9*TS+r()*3*TS,1.6);
  R(g,'rgba(80,130,220,.55)',18*TS+5,10*TS+9,3,2);   // 枝に引っかかった青いもの
  // 用務員住宅（1〜4,10〜13）：見下ろした瓦屋根、北側の戸口
  E(g,'rgba(0,0,0,.25)',3*TS,14*TS-2,2.2*TS,8);
  R(g,'#7a4a3a',TS,10*TS+6,4*TS,4*TS-6);
  for(let y=10*TS+10;y<14*TS;y+=6) R(g,'rgba(0,0,0,.2)',TS,y,4*TS,1.5);
  R(g,'#5a3428',TS,12*TS,4*TS,3);   // 棟
  R(g,'#d8cfb8',TS+4,10*TS,4*TS-8,8);
  R(g,'#5a4430',3*TS+4,10*TS,TS-8,8);   // 戸口
  R(g,'#b8c8d4',TS+10,10*TS+1,TS-6,6);   // 校庭向きの窓
  f5Plate(g,L.sign.yomuin,TS*1.15,9.45*TS-4,TS*1.7);
  // 鉄棒（6〜8,11）
  for(const [i,h] of [[0,6],[1,9],[2,12]]){
    const x=(6+i)*TS; E(g,'rgba(0,0,0,.2)',x+TS/2,11*TS+TS-6,14,3);
    R(g,'#3a6aa0',x+3,11*TS+10-h,3,TS-12+h); R(g,'#3a6aa0',x+TS-6,11*TS+10-h,3,TS-12+h);
    R(g,'#c8ccd0',x+3,11*TS+10-h,TS-6,2.4);
  }
  // 百葉箱（12,12）
  E(g,'rgba(0,0,0,.25)',12.5*TS+4,12.5*TS+10,12,5);
  for(const dx of [6,TS-8]) R(g,'#e8e6e0',12*TS+dx,12*TS+12,2,TS-12);
  RR(g,'#f2f0ea',12*TS+4,12*TS+2,TS-8,TS-12,2); for(let y=12*TS+6;y<13*TS-10;y+=3) R(g,'rgba(0,0,0,.12)',12*TS+6,y,TS-12,1);
  // 校門（9〜10,14）と表札
  R(g,'#9a948a',9*TS,14*TS,2*TS,TS);
  for(const x of [8.6,11.1]){R(g,'#7a7468',x*TS,14*TS-6,10,TS+6); R(g,'#a29c90',x*TS+1,14*TS-6,8,3);}
  R(g,'#5a6068',9*TS,14*TS+12,4,TS-12); for(let x=9*TS+4;x<9*TS+18;x+=4) R(g,'#5a6068',x,14*TS+14,1.5,TS-14);   // 開けた門扉
  f5Plate(g,L.sign.school,4.4*TS,14*TS+10,4*TS,'#e8e4da','#1a1a1a');
  // 光と影
  R(g,'rgba(255,248,225,.06)',0,0,PW,PH);
  vignette(g,.25);
}

/* ---------- 北校舎 ---------- */
function f5Wall(g,x,y,w,h){
  R(g,'#cfc8b6',x*TS,y*TS,w*TS,h*TS);
  R(g,'#ebe6d8',x*TS,y*TS,w*TS,3); R(g,'rgba(0,0,0,.18)',x*TS,(y+h)*TS-3,w*TS,3);
}
function f5Floor(g,r,x,y,w,h,c1,c2,plank){
  R(g,c1,x*TS,y*TS,w*TS,h*TS);
  if(plank) for(let yy=y*TS;yy<(y+h)*TS;yy+=8){
    R(g,(yy/8)%2?c1:c2,x*TS,yy,w*TS,8); R(g,'rgba(0,0,0,.14)',x*TS,yy+7,w*TS,1);
    let xx=x*TS-r()*40; while(xx<(x+w)*TS){xx+=36+r()*44; if(xx<(x+w)*TS) R(g,'rgba(0,0,0,.16)',xx,yy,1,8);}
  }else for(let yy=y*TS;yy<(y+h)*TS;yy+=16) for(let xx=x*TS;xx<(x+w)*TS;xx+=16){
    R(g,((xx+yy)/16)%2?c1:c2,xx,yy,16,16); R(g,'rgba(0,0,0,.08)',xx,yy,16,1); R(g,'rgba(0,0,0,.08)',xx,yy,1,16);
  }
}
function drawSchoolNorth(g){
  const r=rng(67);
  R(g,'#cfc8b6',0,0,PW,PH);
  // 床：廊下と昇降口はリノリウム、教室は板、校長室は絨毯
  f5Floor(g,r,1,7,18,2,'#a9b0a4','#a2a99d',false);
  f5Floor(g,r,9,9,2,5,'#a9b0a4','#a2a99d',false);
  f5Floor(g,r,1,1,7,5,'#b4946a','#ab8c62',true);      // 職員室
  f5Floor(g,r,9,1,3,5,'#7a3c3a','#743836',false);     // 校長室
  for(let i=0;i<40;i++) R(g,'rgba(0,0,0,.06)',9*TS+r()*3*TS,TS+r()*5*TS,2,2);
  f5Floor(g,r,13,1,6,5,'#bc9c70','#b39468',true);     // 音楽室
  f5Floor(g,r,1,10,3,4,'#8e8a80','#87837a',false);    // 職員玄関
  f5Floor(g,r,5,10,2,4,'#5a6274','#566070',false);    // 放送室
  f5Floor(g,r,12,10,3,4,'#9aa0a0','#949a9a',false);   // 理科室
  f5Floor(g,r,16,10,3,4,'#b4946a','#ab8c62',true);    // 6年1組
  // 壁（MAPDEF.school と同じ位置）
  for(const [x,y,w,h] of [[0,0,20,1],[0,0,1,15],[19,0,1,15],[0,14,20,1],
    [8,1,1,5],[12,1,1,5],[1,6,3,1],[5,6,5,1],[11,6,4,1],[16,6,3,1],
    [1,9,1,1],[3,9,2,1],[6,9,1,1],[11,9,2,1],[14,9,3,1],[18,9,1,1],
    [4,10,1,4],[11,10,1,4],[15,10,1,4]]) f5Wall(g,x,y,w,h);
  // 戸口のレール
  for(const [x,y] of [[4,6],[10,6],[15,6],[2,9],[5,9],[13,9],[17,9]]){R(g,'#6a6458',x*TS+2,y*TS+TS/2-1,TS-4,2); R(g,'rgba(0,0,0,.1)',x*TS,y*TS,TS,TS);}
  // 部屋の名札（廊下側の壁に）
  f5Plate(g,L.sign.shokuin,1.2*TS,6*TS+12,2.6*TS);
  f5Plate(g,L.sign.kocho,6.4*TS,6*TS+12,2.4*TS);
  f5Plate(g,L.sign.ongaku,12.2*TS,6*TS+12,2.6*TS);
  f5Plate(g,L.sign.staffDoor,0.6*TS+20,9*TS+12,TS*1.1);
  f5Plate(g,L.sign.hoso,3*TS+2,9*TS+12,TS*1.9);
  f5Plate(g,L.sign.rika,11*TS+2,9*TS+12,TS*1.9);
  f5Plate(g,L.sign.class6,14*TS+2,9*TS+12,TS*2.8);
  // 窓（上の壁は北向きの窓）
  for(let x=1;x<19;x++) if(x!==8&&x!==12){R(g,'#8a9aa0',x*TS+4,4,TS-8,TS-12); R(g,'#b4cad4',x*TS+6,6,TS-12,TS-16);}
  // 職員室：警備盤・キーボックス・ホワイトボード・コピー機・机の島
  RR(g,'#6a6e74',TS+3,TS+2,TS-6,TS-6,2); R(g,'#2a2e34',TS+7,TS+6,TS-14,8);
  for(let i=0;i<4;i++) C(g,i===0?'#e04a3a':'#4ad06a',TS+9+i*4,TS+18,1.6);
  RR(g,'#8a8e94',2*TS+4,TS+2,TS-8,TS-6,2); for(let i=0;i<3;i++) for(let j=0;j<2;j++) R(g,'#d6b061',2*TS+8+i*6,TS+8+j*8,2,5);
  R(g,'#9a9ea4',4*TS+2,TS+2,2*TS-4,TS-8); R(g,'#f8f8f4',4*TS+4,TS+4,2*TS-8,TS-12);
  for(let i=0;i<3;i++) R(g,i?'#3a4a8a':'#c83a3a',4*TS+8,TS+7+i*5,30-i*6,1.6);
  RR(g,'#b8bcc0',7*TS+3,TS+3,TS-6,TS-6,2); R(g,'#6a6e74',7*TS+6,TS+6,TS-12,6);
  for(let x=2;x<7;x++){
    RR(g,'#7a8088',x*TS+1,3*TS+2,TS-2,TS-4,1); R(g,'#c8ccd0',x*TS+3,3*TS+4,TS-6,TS-8);
    R(g,'#f4f2ea',x*TS+6,3*TS+8,12,9); R(g,'#2a2e34',x*TS+19,3*TS+6,8,6);
  }
  R(g,'#e8d090',6*TS+20,3*TS+16,7,6); R(g,'#3a3a3a',6*TS+21,3*TS+17,5,4);   // 白川の机の写真立て
  // 校長室：書庫・歴代校長の写真・机
  R(g,'#4a3626',9*TS+2,TS+1,2*TS-4,TS-4);
  for(let i=0;i<14;i++) R(g,['#2a3a5a','#5a2a2a','#2a4a3a','#6a5a3a'][i%4],9*TS+5+i*4,TS+4,3,TS-10);
  for(let i=0;i<3;i++){R(g,'#3a2a1e',11*TS+3+i*9,TS+6,7,9); R(g,'#b8b0a0',11*TS+4+i*9,TS+7,5,7);}
  RR(g,'#5a3a24',9*TS+2,3*TS+3,2*TS-4,TS-6,2); RR(g,'#6e4a30',9*TS+4,3*TS+4,2*TS-8,TS-10,2); R(g,'#f4f0e4',9*TS+10,3*TS+8,16,11);
  // 音楽室：黒板（五線）・グランドピアノ・肖像画
  R(g,'#2e4a3a',13*TS+4,4,3*TS,TS-10); for(let i=0;i<5;i++) R(g,'rgba(255,255,255,.45)',13*TS+8,9+i*3,3*TS-8,1);
  E(g,'rgba(0,0,0,.3)',15*TS+4,4*TS-2,TS+6,8);
  g.fillStyle='#16161a'; g.beginPath(); g.moveTo(14*TS+3,2*TS+4); g.lineTo(16*TS-3,2*TS+4); g.lineTo(16*TS-3,3*TS+6);
  g.quadraticCurveTo(16*TS-4,4*TS-3,15*TS+2,4*TS-3); g.quadraticCurveTo(14*TS+16,4*TS-3,14*TS+12,3*TS+16); g.lineTo(14*TS+3,3*TS+12); g.closePath(); g.fill();
  R(g,'#2a2a30',14*TS+3,2*TS+4,2*TS-6,4); for(let x=14*TS+4;x<16*TS-4;x+=3) R(g,x%6<3?'#f4f2ea':'#18181c',x,2*TS+5,2,3);   // 鍵盤
  R(g,'rgba(255,255,255,.12)',14*TS+14,2*TS+12,24,2);
  for(let i=0;i<4;i++){R(g,'#5a4430',17*TS+2+i*15,TS+3,12,15); R(g,'#c8b89a',17*TS+4+i*15,TS+5,8,11); C(g,'#e3c8a8',17*TS+8+i*15,TS+9,2.5);}
  // 放送室：放送卓
  R(g,'#3a3e48',5*TS+2,12*TS+3,2*TS-4,TS-6); R(g,'#4e5462',5*TS+4,12*TS+5,2*TS-8,TS-14);
  for(let i=0;i<8;i++){R(g,'#22252c',5*TS+7+i*6,12*TS+8,2,9); R(g,'#c8ccd0',5*TS+6+i*6,12*TS+10+(i*5)%7,4,2);}
  C(g,'#22252c',6*TS+16,12*TS+22,3); R(g,'#22252c',6*TS+15,12*TS+12,2,10);   // マイク
  for(let i=0;i<30;i++) C(g,'rgba(255,255,255,.08)',5*TS+r()*2*TS,10*TS+r()*2*TS,1);
  // 西階段（7〜8,10〜13）
  for(let i=0;i<12;i++){const y=10*TS+i*TS*4/12; R(g,i%2?'#b2b8ac':'#a6ac9f',7*TS,y,2*TS,TS/3+1); R(g,'rgba(0,0,0,.18)',7*TS,y+TS/3-1,2*TS,1.5);}
  R(g,'#7a6a4a',7*TS+2,10*TS,3,4*TS); R(g,'#7a6a4a',9*TS-5,10*TS,3,4*TS);   // 手すり
  f5Plate(g,L.sign.stairs2,7*TS+8,9*TS+2,TS+16);
  // 昇降口のガラス戸（9〜10,14）
  R(g,'#4a5a62',9*TS,14*TS,2*TS,TS); R(g,'#8aa4b0',9*TS+3,14*TS+3,2*TS-6,TS-6); R(g,'#4a5a62',10*TS-1,14*TS+3,2,TS-6);
  R(g,'#6a7458',9*TS+4,13*TS+6,2*TS-8,TS-10);   // 足ふきマット
  // 職員玄関：下駄箱・通用口
  R(g,'#6a4e34',TS+2,10*TS+1,TS-4,3*TS-2);
  for(let i=0;i<6;i++){R(g,'#3a2a1e',TS+2,10*TS+1+i*16,TS-4,1.5);}
  for(const [y,c] of [[10*TS+5,'#d8d8d0'],[10*TS+21,'#3a3a40'],[11*TS+5,'#2a4a3a'],[11*TS+21,'#3a3a40'],[12*TS+5,'#d8d8d0']]){R(g,c,TS+6,y,8,9); R(g,c,TS+16,y,8,9);}
  R(g,'#7a7468',2*TS+3,14*TS+2,TS-6,TS-4); R(g,'#9a948a',2*TS+5,14*TS+4,TS-10,TS-8); C(g,'#c9a45a',2*TS+22,14.5*TS,1.6);
  // 理科室：人体模型・実験台
  E(g,'rgba(0,0,0,.25)',14.5*TS+3,10.5*TS+10,10,4);
  R(g,'#6a6a6a',14*TS+14,10*TS+20,4,8); RR(g,'#e3bb96',14*TS+8,10*TS+6,8,16,3); RR(g,'#c84a3a',14*TS+16,10*TS+6,8,16,3);
  C(g,'#e3bb96',14*TS+14,10*TS+5,5); g.fillStyle='#c84a3a'; g.beginPath(); g.arc(14*TS+18,10*TS+5,5,-Math.PI/2,Math.PI/2); g.fill();
  R(g,'#1e1e22',12*TS+2,12*TS+3,2*TS-4,TS-6); R(g,'#2e2e34',12*TS+4,12*TS+5,2*TS-8,TS-10);
  R(g,'#8a9aa4',12*TS+24,12*TS+8,14,10);   // 流し
  for(let i=0;i<3;i++){C(g,'#d8e4ea',12*TS+8+i*6,12*TS+20,2.6); R(g,'#c9a45a',12*TS+7.4+i*6,12*TS+16,1.2,3);}
  // 6年1組：掃除用具入れ・教材棚・机
  RR(g,'#8a9098',16*TS+3,10*TS+2,TS-6,TS-4,2); R(g,'#6a7078',16*TS+TS/2-1,10*TS+4,2,TS-8); R(g,'#4a4e54',16*TS+7,10*TS+12,4,1.5);
  R(g,'#6a4e34',18*TS+2,10*TS+1,TS-4,2*TS-2); R(g,'#3a2a1e',18*TS+2,11*TS,TS-4,1.5);
  for(const [y,c] of [[10*TS+5,'rgba(220,60,60,.7)'],[10*TS+16,'rgba(60,110,220,.7)'],[11*TS+5,'rgba(240,210,60,.7)']]) R(g,c,18*TS+6,y,TS-12,8);
  for(let x=16;x<19;x++){RR(g,'#b08a5a',x*TS+3,12*TS+4,TS-6,TS-12,2); R(g,'#c8a070',x*TS+5,12*TS+6,TS-10,TS-16); R(g,'#7a8088',x*TS+8,13*TS-4,TS-16,4);}
  // 廊下：掲示板・消火器
  R(g,'#8a6a44',2,7*TS+4,TS-6,2*TS-8); R(g,'#c8a06a',4,7*TS+6,TS-10,2*TS-12);
  for(const [y,c] of [[7*TS+9,'#f4f0e4'],[7*TS+24,'#f4e0a0'],[8*TS+10,'#e0f0f4']]) R(g,c,7,y,TS-16,11);
  R(g,'#c83a2a',19*TS+8,7*TS+10,10,16); R(g,'#2a2a2a',19*TS+10,7*TS+7,6,4);
  // 天井の灯り
  for(const [x,y] of [[4,3],[10,3],[16,3],[5,8],[10,8],[15,8],[17,12]]) glow(g,x*TS,y*TS,110,'rgba(255,250,235,.06)');
  vignette(g,.28);
}

Object.assign(DRAWERS,{schoolyard:drawSchoolyard,school:drawSchoolNorth});
