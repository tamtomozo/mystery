/* 推理シーン・監視カメラ映像の再生 */
'use strict';

/* =========================================================
   シーンの台本（SCENES[id]() が返す手順の配列）
     {map}                マップを切り替える（人物・効果・小道具はリセット）
     {spawn,x,y,label,look?,fallen?,carry?,small?,dog?}   人物を出す（look があれば影でなく本人の姿で描く。small は子ども、dog は犬）
     {remove}             人物を消す
     {move,to:[[x,y]..]}  人物を歩かせる（歩き終わるまで待つ。nowait:true なら待たずに次へ）
     {text,name?}         台詞（クリックで進む）
     {fx,x,y,…}           効果（hit/lock/sparkle/keyslide/thread）
     {fall}               人物を倒れさせる
     {title,sub}          タイトル帯
     {clock}              画面右上の時刻表示（null で消す）
     {prop,x,y}／{unprop} 小道具を置く／片づける
     {carry,item}         人物に物を持たせる（item:null で手放す）
     {wait}               秒数だけ待つ
     {cctv:{cam,time}}    監視カメラ映像として再生する（time は 'HH:MM:SS'。以後、時刻が進む）
     {cut}                映像の時刻を飛ばす（'HH:MM:SS'）
   ========================================================= */
let SCN=null;
const toSec=s=>{const [h,m,x]=s.split(':').map(Number); return h*3600+m*60+(x||0);};
// opt.after … 再生し終わったとき（スキップしたときも）に呼ぶ
function startScene(id,isNew,opt){
  P.path=[];P.pending=null;
  SCN={id,isNew,steps:SCENES[id](),i:-1,actors:{},fx:[],props:{},map:'study',wait:null,timer:0,title:null,clock:null,cctv:null,after:opt&&opt.after};
  S.mode='scene'; $('#skip').classList.remove('hidden'); $('#app').classList.add('scene');
  nextStep();
}
function nextStep(){
  if(!SCN) return;
  SCN.i++;
  if(SCN.i>=SCN.steps.length){endScene(); return;}
  const s=SCN.steps[SCN.i];
  if(s.map){SCN.map=s.map; SCN.actors={}; SCN.fx=[]; SCN.props={}; return nextStep();}
  if(s.cctv){SCN.cctv={cam:s.cctv.cam,base:toSec(s.cctv.time),el:0,flash:.4}; return nextStep();}
  if(s.cut){SCN.cctv.base=toSec(s.cut); SCN.cctv.el=0; SCN.cctv.flash=.4; SCN.wait='time'; SCN.timer=.5; return;}
  if('clock' in s){SCN.clock=s.clock; return nextStep();}
  if(s.prop){SCN.props[s.prop]={x:s.x,y:s.y}; return nextStep();}
  if(s.unprop){delete SCN.props[s.unprop]; return nextStep();}
  if(s.spawn){SCN.actors[s.spawn]={x:s.x,y:s.y,label:s.label,look:s.look,carry:s.carry||null,small:!!s.small,dog:!!s.dog,fallen:!!s.fallen,path:[],dir:s.dir||'down',walking:false}; return nextStep();}
  if(s.carry){SCN.actors[s.carry].carry=s.item; return nextStep();}
  if(s.remove){delete SCN.actors[s.remove]; return nextStep();}
  if(s.move){const a=SCN.actors[s.move]; a.path=s.to.map(p=>[p[0],p[1]]); if(s.nowait) return nextStep(); SCN.wait='move'; SCN.waitActor=a; return;}
  if(s.text){showLine({name:s.name||(SCN.cctv?L.cctvName:L.sceneName),text:s.text},true); SCN.wait='click'; return;}
  if(s.fx){SCN.fx.push({type:s.fx,x:s.x,y:s.y,x2:s.x2,y2:s.y2,t:0,dur:s.dur||0.9,persist:!!s.persist}); AU.sfx(s.fx); SCN.wait='time'; SCN.timer=s.dur||0.9; return;}
  if(s.fall){SCN.actors[s.fall].fallen=true; SCN.wait='time'; SCN.timer=0.6; return;}
  if(s.title){SCN.title={text:s.title,sub:s.sub,t:0}; AU.sfx('hypo'); SCN.wait='time'; SCN.timer=2.3; return;}
  if(s.wait){SCN.wait='time'; SCN.timer=s.wait; return;}
  nextStep();
}
function sceneAdvance(){
  if(!SCN) return;
  if(typing){finishTyping(); return;}
  if(SCN.wait==='click'){SCN.wait=null; hideDlg(); nextStep();}
}
function updateScene(dt){
  for(const a of Object.values(SCN.actors)){
    a.walking=false;
    if(a.path.length){
      const [tx,ty]=a.path[0], dx=tx-a.x, dy=ty-a.y, d=Math.hypot(dx,dy), sp=3.3*dt;
      if(d<=sp){a.x=tx;a.y=ty;a.path.shift();} else {a.x+=dx/d*sp; a.y+=dy/d*sp;}
      a.walking=true; if(d>0.01) a.dir=dirName(dx,dy);
    }
  }
  for(const f of SCN.fx) f.t+=dt;
  SCN.fx=SCN.fx.filter(f=>f.persist||f.t<f.dur+0.3);
  if(SCN.title) SCN.title.t+=dt;
  if(SCN.cctv){SCN.cctv.el+=dt; SCN.cctv.flash=Math.max(0,SCN.cctv.flash-dt);}
  if(SCN.wait==='move'&&!SCN.waitActor.path.length){SCN.wait=null; nextStep();}
  else if(SCN.wait==='time'){SCN.timer-=dt; if(SCN.timer<=0){SCN.wait=null; nextStep();}}
}
function endScene(){
  if(!SCN) return;
  const {id,isNew,after}=SCN; SCN=null;
  hideDlg(); $('#skip').classList.add('hidden'); $('#app').classList.remove('scene'); S.mode='explore';
  saveGame();
  if(after){after(); if(dq.length) startDialog(); else if(!checkPhase()) checkUnlock(); return;}
  if(!isNew){ if(!checkPhase()) checkUnlock(); return; }
  const h=HYPS.find(x=>x.id===id);
  toast(L.addedToBoard(h.no,h.title),3600);
  if(id===HYPS[0].id){
    L.firstHyp.forEach(l=>say(L.tak,l));
    guideBoard();
    startDialog();
  }else if(h.final){
    say(L.tak,CASE.finalIntro);
    guideFinal();
    startDialog();
  }
}
