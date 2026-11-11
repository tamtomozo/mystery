/* 仮定シーンの再生 */
'use strict';

let SCN=null;
function startScene(id,isNew){
  P.path=[];P.pending=null;
  SCN={id,isNew,steps:SCENES[id](),i:-1,actors:{},fx:[],map:'study',wait:null,timer:0,title:null};
  S.mode='scene'; $('#skip').classList.remove('hidden');
  nextStep();
}
function nextStep(){
  if(!SCN) return;
  SCN.i++;
  if(SCN.i>=SCN.steps.length){endScene(); return;}
  const s=SCN.steps[SCN.i];
  if(s.map){SCN.map=s.map; SCN.actors={}; SCN.fx=[]; return nextStep();}
  if(s.spawn){SCN.actors[s.spawn]={x:s.x,y:s.y,label:s.label,fallen:!!s.fallen,path:[],dir:'down',walking:false}; return nextStep();}
  if(s.remove){delete SCN.actors[s.remove]; return nextStep();}
  if(s.move){const a=SCN.actors[s.move]; a.path=s.to.map(p=>[p[0],p[1]]); SCN.wait='move'; SCN.waitActor=a; return;}
  if(s.text){showLine({name:'仮定',text:s.text},true); SCN.wait='click'; return;}
  if(s.fx){SCN.fx.push({type:s.fx,x:s.x,y:s.y,x2:s.x2,y2:s.y2,t:0,dur:s.dur||0.9,persist:!!s.persist}); AU.sfx(s.fx); SCN.wait='time'; SCN.timer=s.dur||0.9; return;}
  if(s.fall){SCN.actors[s.fall].fallen=true; SCN.wait='time'; SCN.timer=0.6; return;}
  if(s.title){SCN.title={text:s.title,sub:s.sub,t:0}; AU.sfx('hypo'); SCN.wait='time'; SCN.timer=2.3; return;}
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
  if(SCN.wait==='move'&&!SCN.waitActor.path.length){SCN.wait=null; nextStep();}
  else if(SCN.wait==='time'){SCN.timer-=dt; if(SCN.timer<=0){SCN.wait=null; nextStep();}}
}
function endScene(){
  if(!SCN) return;
  const {id,isNew}=SCN; SCN=null;
  hideDlg(); $('#skip').classList.add('hidden'); S.mode='explore';
  saveGame();
  if(!isNew){ if(!checkPhase()) checkUnlock(); return; }
  const h=HYPS.find(x=>x.id===id);
  toast(`捜査ボードに 仮定${h.no}「${h.title}」を追加`,3600);
  if(id==='h1'){
    say('滝沢','……今のが、ここまでの物証から組み立てた「仮定」だ。');
    say('滝沢','仮定の主張を、一つずつ物証で確かめろ。矛盾が見つかれば、その仮定は崩れる。');
    say('滝沢','崩れた仮定に新しい物証が加われば、仮定は真実に近づいていく。');
    guideBoard();
    startDialog();
  }else if(h.final){
    say('滝沢','内部犯行……か。この仮定の主張を、すべて物証で裏付けろ。それができれば、取調べだ。');
    guideFinal();
    startDialog();
  }
}

