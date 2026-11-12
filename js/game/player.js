/* プレイヤー移動・調べる・経路探索 */
'use strict';

/* =========================================================
   プレイヤー移動
   ========================================================= */
const P={x:9,y:2,dir:'left',moving:false,fx:9,fy:2,tx:9,ty:2,prog:0,path:[],pending:null,walkT:0};
const DIRV={down:[0,1],up:[0,-1],left:[-1,0],right:[1,0]};
const dirName=(dx,dy)=>Math.abs(dx)>=Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');
function npcAt(x,y){return Object.values(NPCS).find(n=>n.map===S.map&&n.x===x&&n.y===y)}
function hotspotAt(x,y){return (HS[S.map]||[]).find(h=>h.x===x&&h.y===y)}
function walkable(x,y){
  if(x<0||y<0||x>=W||y>=H) return false;
  return !solidOf(S.map)[y][x]&&!npcAt(x,y);
}
function setMap(id,x,y,dir){
  S.map=id; Object.assign(P,{x,y,fx:x,fy:y,tx:x,ty:y,dir,moving:false,path:[],pending:null,prog:0});
  $('#loc').textContent=MAPDEF[id].name;
  if(S.mode==='explore') saveGame();
}
function stepTo(nx,ny){
  P.dir=dirName(nx-P.x,ny-P.y);
  if(!walkable(nx,ny)) return false;
  Object.assign(P,{fx:P.x,fy:P.y,tx:nx,ty:ny,prog:0,moving:true});
  P.stepN=(P.stepN||0)+1;
  AU.sfx(OUTDOOR.has(S.map)?'step_out':'step_in',P.stepN);
  return true;
}
const OUTDOOR=new Set(['garden','roof','alley','schoolyard','wheel','togiba']);   // 屋外のマップ（足音が土と草になる）
function keyDir(){
  const k=S.keys;
  if(k.has('ArrowUp')||k.has('w')) return [0,-1];
  if(k.has('ArrowDown')||k.has('s')) return [0,1];
  if(k.has('ArrowLeft')||k.has('a')) return [-1,0];
  if(k.has('ArrowRight')||k.has('d')) return [1,0];
  return null;
}
function updatePlayer(dt){
  if(P.moving){
    P.prog+=dt*6.5; P.walkT+=dt;
    if(P.prog>=1){P.x=P.tx;P.y=P.ty;P.moving=false;} else return;
  }
  if(S.mode!=='explore') return;
  const kd=keyDir();
  if(kd){P.path=[];P.pending=null; stepTo(P.x+kd[0],P.y+kd[1]); return;}
  if(P.path.length){const [nx,ny]=P.path.shift(); if(!stepTo(nx,ny)){P.path=[];P.pending=null;} return;}
  if(P.pending){const t=P.pending; P.pending=null; interactAt(t.x,t.y);}
}
function face(x,y){if(x!==P.x||y!==P.y) P.dir=dirName(x-P.x,y-P.y)}
function interactAt(x,y){
  face(x,y);
  const h=hotspotAt(x,y), n=npcAt(x,y);
  if(h||n) AU.sfx('inspect');
  if(n){n.dir=dirName(P.x-n.x,P.y-n.y); n.talk();}
  else if(h) h.act();
  if(dq.length) startDialog();
}
function keyInteract(){
  const [dx,dy]=DIRV[P.dir], fx=P.x+dx, fy=P.y+dy;
  if(hotspotAt(fx,fy)||npcAt(fx,fy)) interactAt(fx,fy);
  else if(hotspotAt(P.x,P.y)) interactAt(P.x,P.y);
}
function bfs(sx,sy,goals){
  const K=(x,y)=>y*W+x, gs=new Set(goals.map(([x,y])=>K(x,y)));
  if(gs.has(K(sx,sy))) return [];
  const prev=new Map([[K(sx,sy),-1]]), q=[[sx,sy]];
  while(q.length){
    const [x,y]=q.shift();
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const nx=x+dx,ny=y+dy,k=K(nx,ny);
      if(prev.has(k)||!walkable(nx,ny)) continue;
      prev.set(k,K(x,y));
      if(gs.has(k)){const path=[];let c=k;while(c!==K(sx,sy)){path.unshift([c%W,(c/W)|0]);c=prev.get(c);}return path;}
      q.push([nx,ny]);
    }
  }
  return null;
}
function onTap(tx,ty){
  const target=hotspotAt(tx,ty)||npcAt(tx,ty);
  const cx=P.moving?P.tx:P.x, cy=P.moving?P.ty:P.y;
  if(target){
    const goals=walkable(tx,ty)?[[tx,ty]]:[[tx+1,ty],[tx-1,ty],[tx,ty+1],[tx,ty-1]].filter(([x,y])=>walkable(x,y)||(x===cx&&y===cy));
    if(!P.moving&&goals.some(([x,y])=>x===P.x&&y===P.y)){interactAt(tx,ty);return;}
    const path=bfs(cx,cy,goals);
    if(path){P.path=path;P.pending={x:tx,y:ty};}
  }else if(walkable(tx,ty)){
    const path=bfs(cx,cy,[[tx,ty]]); if(path){P.path=path;P.pending=null;}
  }
}

