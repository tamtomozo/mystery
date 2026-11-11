/* データ：マップ定義と当たり判定 */
'use strict';

/* =========================================================
   マップ定義
   ========================================================= */
const MAPDEF={
  study:{name:'書斎 ― 事件現場',border:true,
    solids:[[1,1,4,1],[14,1,5,1],[4,3,4,2],[5,5,1,1],[12,9,2,2],[11,11,4,1],[1,6,1,3],[1,13,1,1],[18,13,1,1],[18,3,1,1]]},
  garden:{name:'庭 ― 書斎の窓の外',border:false,
    solids:[[0,0,20,3],[7,3,2,1],[11,3,2,1],[2,5,4,3],[14,9,4,3],[1,11,1,1],[3,13,1,1],[18,6,1,1],[18,13,1,1],[6,11,2,1],[0,3,1,12],[19,3,1,12],[0,14,20,1]]},
  interro:{name:'取調室',border:true,solids:[[8,6,4,2]]},
};
const SOLID={};
function solidOf(id){
  if(SOLID[id]) return SOLID[id];
  const m=MAPDEF[id], g=Array.from({length:H},()=>Array(W).fill(false));
  if(m.border){for(let x=0;x<W;x++){g[0][x]=g[H-1][x]=true}for(let y=0;y<H;y++){g[y][0]=g[y][W-1]=true}}
  for(const [x,y,w,h] of m.solids) for(let j=0;j<h;j++) for(let i=0;i<w;i++) g[y+j][x+i]=true;
  return SOLID[id]=g;
}

