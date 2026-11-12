/* フレーム描画（探索・取調室・推理シーン） */
'use strict';

/* ---------- フレーム描画 ---------- */

function render(t){
  ctx.setTransform(SC,0,0,SC,0,0);
  if(S.mode==='title'||S.mode==='files'||(S.review&&!SCN)){renderTitle(t); return;}
  if(SCN){renderScene(t); return;}
  ctx.drawImage(getStatic(S.map),0,0,PW,PH);
  for(const h of HS[S.map]||[]) if(h.glow&&h.glow()) drawSparkle(ctx,(h.x+.5)*TS,(h.y+.5)*TS,t);
  if(S.map==='interro'){
    ctx.setTransform(1,0,0,1,0,0); ctx.fillStyle='#000'; ctx.fillRect(0,0,cv.width,cv.height);
    const Z=INTERRO_Z; ctx.setTransform(SC*Z,0,0,SC*Z,SC*(PW/2-10*TS*Z),SC*(PH*INTERRO_CY-7*TS*Z));
    ctx.drawImage(getStatic('interro'),0,0,PW,PH);
    const list=INTERRO_ACTORS.slice().sort((a,b)=>a.y-b.y);
    for(const a of list){
      const ox=a.suspect&&shakeT>0?Math.sin(t*80)*3*shakeT:0;
      drawPerson(ctx,a.x*TS+ox,a.y*TS,{...a.look,dir:a.dir},t);
      drawLabel(ctx,a.label,a.x*TS+ox,a.y*TS-22);
    }
    const gr=ctx.createRadialGradient(10*TS,7*TS,60,10*TS,7*TS,330);
    gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,0,.8)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,PW,PH);
    glow(ctx,11.4*TS,6.4*TS,80,'rgba(255,225,160,.12)');
    return;
  }
  const list=[];
  for(const n of Object.values(NPCS)) if(n.map===S.map) list.push({x:(n.x+.5)*TS,y:(n.y+.5)*TS,o:{...n.look,dir:n.dir},label:n.name,npc:n});
  const pp=P.moving?P.prog:0;
  const px=(P.moving?P.fx+(P.tx-P.fx)*pp:P.x)+.5, py=(P.moving?P.fy+(P.ty-P.fy)*pp:P.y)+.5;
  list.push({x:px*TS,y:py*TS,o:{...LOOK.player,dir:P.dir,walking:P.moving},player:true});
  list.sort((a,b)=>a.y-b.y);
  for(const a of list) drawPerson(ctx,a.x,a.y,a.o,t);
  for(const a of list){
    if(a.label) drawLabel(ctx,a.label,a.x,a.y-22);
    if(a.npc&&a.npc.alert()) drawBubble(ctx,a.x,a.y-12,t);
  }
}
// タイトル背景：灯りの落ちた深夜の書斎。暖炉と卓上ランプがゆらぎ、埃が舞う
function renderTitle(t){
  const g=ctx;
  g.drawImage(getStatic('study'),0,0,PW,PH);
  R(g,'rgba(4,5,9,.66)',0,0,PW,PH);
  const fl=.85+Math.sin(t*6.1)*.06+Math.sin(t*13.7)*.04+Math.sin(t*2.3)*.05;
  g.globalCompositeOperation='lighter';
  glow(g,19*TS,7.5*TS,170*fl,`rgba(255,120,40,${.13*fl})`);   // 暖炉
  glow(g,4.45*TS,3.7*TS,110,'rgba(255,214,150,.09)');         // 卓上ランプ
  g.globalCompositeOperation='source-over';
  // 舞う埃（ランプの光の中だけ、ゆっくり漂う）
  for(let i=0;i<46;i++){
    const sp=4+(i%5)*1.6, ph=i*2.399;
    const x=((i*137.5+t*sp+Math.sin(t*.4+ph)*14)%PW+PW)%PW;
    const y=((i*89.3-t*sp*.55)%PH+PH)%PH;
    const a=(.04+.07*((i*37)%10)/10)*(.6+.4*Math.sin(t*.9+ph));
    g.fillStyle=`rgba(255,228,186,${a})`; g.fillRect(x,y,1.5,1.5);
  }
  vignette(g,.9,110,420);
}
function renderScene(t){
  const g=ctx;
  g.drawImage(getStatic(SCN.map),0,0,PW,PH);
  for(const [k,p] of Object.entries(SCN.props)) if(PROP_DRAW[k]) PROP_DRAW[k](g,p.x*TS,p.y*TS);
  const acts=Object.values(SCN.actors).sort((a,b)=>a.y-b.y);
  if(SCN.cctv){renderCctv(g,t,acts); return;}
  g.globalCompositeOperation='saturation'; g.fillStyle='#808080'; g.fillRect(0,0,PW,PH);
  g.globalCompositeOperation='multiply'; g.fillStyle='#cdb083'; g.fillRect(0,0,PW,PH);
  g.globalCompositeOperation='source-over'; g.fillStyle='rgba(25,15,5,.25)'; g.fillRect(0,0,PW,PH);
  for(const a of acts) drawPerson(g,a.x*TS,a.y*TS,{shadow:true,dir:a.dir,walking:a.walking,fallen:a.fallen,carry:a.carry},t);
  for(const a of acts) if(a.label) drawLabel(g,a.label,a.x*TS,a.y*TS-(a.fallen?16:22),'#f3d9b0','rgba(40,10,5,.7)');
  for(const f of SCN.fx){
    const p=Math.min(1,f.t/f.dur), X=f.x*TS, Y=f.y*TS;
    if(f.type==='hit'){
      g.strokeStyle=`rgba(220,40,30,${1-p})`; g.lineWidth=3; g.beginPath(); g.arc(X,Y,6+34*p,0,Math.PI*2); g.stroke();
      g.lineWidth=2; for(let i=0;i<8;i++){const a=i/8*Math.PI*2; g.beginPath(); g.moveTo(X+Math.cos(a)*(8+20*p),Y+Math.sin(a)*(8+20*p)); g.lineTo(X+Math.cos(a)*(14+30*p),Y+Math.sin(a)*(14+30*p)); g.stroke();}
      if(p<.2){g.fillStyle=`rgba(255,240,230,${.5-p*2.5})`; g.fillRect(0,0,PW,PH);}
    }else if(f.type==='lock'){
      const s=1+Math.max(0,.4-p)*1.5, al=p<.8?1:(1-p)*5;
      g.save(); g.translate(X,Y-6); g.scale(s,s); g.globalAlpha=al;
      g.strokeStyle='#e8c46a'; g.lineWidth=2; g.beginPath(); g.arc(0,-5,4,Math.PI,0); g.stroke();
      RR(g,'#e8c46a',-6,-5,12,9,2); g.restore();
      g.globalAlpha=al; g.fillStyle='#f6e2a8'; g.font='bold 11px sans-serif'; g.textAlign='center'; g.fillText(L.click,X+18,Y-14-p*6); g.textAlign='start'; g.globalAlpha=1;
    }else if(f.type==='sparkle'){
      g.strokeStyle=`rgba(255,220,130,${1-p})`; g.lineWidth=2; g.beginPath(); g.arc(X,Y,4+18*p,0,Math.PI*2); g.stroke();
      drawSparkle(g,X,Y,t*3);
    }else if(f.type==='keyslide'){
      const e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2, kx=X+(f.x2*TS-X)*e, ky=Y+(f.y2*TS-Y)*e;
      glow(g,kx,ky,16,'rgba(255,220,120,.4)'); C(g,'#e8c46a',kx-4,ky,3.5); R(g,'#e8c46a',kx-1,ky-1,10,2.4);
    }else if(f.type==='thread'){
      const ex=X+(f.x2*TS-X)*p, ey=Y+(f.y2*TS-Y)*p;
      g.strokeStyle='rgba(240,240,250,.95)'; g.lineWidth=1; g.beginPath(); g.moveTo(X,Y); g.quadraticCurveTo((X+ex)/2+6,(Y+ey)/2,ex,ey); g.stroke();
      C(g,'rgba(240,240,250,.95)',X,Y,1.8);
    }
  }
  for(let i=0;i<50;i++){g.fillStyle=`rgba(255,240,210,${Math.random()*.06})`; g.fillRect(Math.random()*PW,Math.random()*PH,1.5,1.5);}
  if(Math.random()<.3){g.fillStyle='rgba(255,240,210,.06)'; g.fillRect(Math.random()*PW,0,1,PH);}
  vignette(g,.75,140,400);
  const blink=Math.sin(t*4)>0;
  g.fillStyle=blink?'#d23a2a':'rgba(210,58,42,.35)'; g.beginPath(); g.arc(18,18,4,0,Math.PI*2); g.fill();
  const h=HYPS.find(x=>x.id===SCN.id);
  if(h){g.fillStyle='#f0dcb4'; g.font='bold 12px serif'; g.fillText(L.sceneHeader(h.no,h.title),28,22);}
  // 時刻（時間が鍵になる事件で、再現の「いつ」を見せる）
  if(SCN.clock){
    g.font='bold 15px serif'; const w=g.measureText(SCN.clock).width+22;
    RR(g,'rgba(20,12,4,.72)',PW-w-12,10,w,26,4); g.strokeStyle='rgba(232,207,160,.6)'; g.lineWidth=1; g.strokeRect(PW-w-11.5,10.5,w-1,25);
    g.fillStyle='#f0dcb4'; g.textAlign='center'; g.fillText(SCN.clock,PW-12-w/2,28); g.textAlign='start';
  }
  if(SCN.title&&SCN.title.t<2.6){
    const tt=SCN.title.t, al=tt<.4?tt/.4:tt>2?Math.max(0,(2.6-tt)/.6):1;
    g.globalAlpha=al; R(g,'rgba(0,0,0,.75)',0,PH/2-52,PW,104);
    R(g,'#a8865a',0,PH/2-52,PW,1); R(g,'#a8865a',0,PH/2+51,PW,1);
    g.textAlign='center'; g.fillStyle='#e8cfa0'; g.font='bold 34px serif'; g.fillText(SCN.title.text,PW/2,PH/2+2);
    g.font='15px serif'; g.fillStyle='#cdb790'; g.fillText(SCN.title.sub,PW/2,PH/2+32);
    g.textAlign='start'; g.globalAlpha=1;
  }
}
// 監視カメラの映像：白黒＋緑がかった色、走査線とノイズ、カメラ名・時刻・REC
function renderCctv(g,t,acts){
  const c=SCN.cctv;
  for(const a of acts) drawPerson(g,a.x*TS,a.y*TS,{...(a.look||{coat:'#555'}),dir:a.dir,walking:a.walking,carry:a.carry},t);
  g.globalCompositeOperation='saturation'; g.fillStyle='#808080'; g.fillRect(0,0,PW,PH);
  g.globalCompositeOperation='multiply'; g.fillStyle='#b4c9b6'; g.fillRect(0,0,PW,PH);
  g.globalCompositeOperation='source-over';
  for(let y=0;y<PH;y+=3) R(g,'rgba(0,0,0,.16)',0,y,PW,1);
  const by=(t*50)%(PH+40)-20; R(g,'rgba(220,255,225,.05)',0,by,PW,20);
  for(let i=0;i<90;i++){g.fillStyle=`rgba(230,255,235,${Math.random()*.08})`; g.fillRect(Math.random()*PW,Math.random()*PH,1.5,1);}
  vignette(g,.7,150,420);
  for(const a of acts) if(a.label) drawLabel(g,a.label,a.x*TS,a.y*TS-22,'#e6f4e8','rgba(10,25,15,.7)');
  if(c.flash>0){g.fillStyle=`rgba(220,240,225,${c.flash*.9})`; g.fillRect(0,0,PW,PH);}
  const sec=Math.floor(c.base+c.el), p2=n=>String(n).padStart(2,'0');
  const time=`${p2(Math.floor(sec/3600)%24)}:${p2(Math.floor(sec/60)%60)}:${p2(sec%60)}`;
  g.font='bold 13px monospace'; g.fillStyle='rgba(0,0,0,.55)';
  g.fillText(c.cam,15,25); g.fillText(time,PW-91,25);
  g.fillStyle='#e8f6ea'; g.fillText(c.cam,14,24); g.fillText(time,PW-92,24);
  if(Math.sin(t*5)>0){C(g,'#e04a3a',PW-108,20,4.5);}
  g.font='bold 11px monospace'; g.fillStyle='#e8f6ea'; g.fillText('REC',PW-138,24);
}
