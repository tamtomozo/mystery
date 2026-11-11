/* サウンド（BGM・効果音）と話者ごとの文字送り音 */
'use strict';

/* =========================================================
   サウンド（Web Audio APIで合成。音声ファイル不要）
   ========================================================= */
const AU=(()=>{
  const PREF_KEY='hidden-truth-audio';
  const pref={bgm:true,se:true};
  try{Object.assign(pref,JSON.parse(localStorage.getItem(PREF_KEY)||'{}'));}catch(e){}
  let ac=null, master, bgmBus, sfxBus, chipBus, revSend, noiseBuf, cur=null, want=null;
  const BGM_VOL=.25, SE_VOL=.25;   // 音量（BGMと効果音は同じレベル）
  const mtof=m=>440*Math.pow(2,(m-69)/12);

  function init(){
    if(ac){if(ac.state==='suspended') ac.resume(); return;}
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    try{ac=new AC();}catch(e){return;}
    const comp=ac.createDynamicsCompressor(); comp.threshold.value=-16; comp.ratio.value=3;
    master=ac.createGain(); master.gain.value=.9; master.connect(comp); comp.connect(ac.destination);
    const rev=ac.createConvolver(); rev.buffer=impulse(2.6,2.4);
    revSend=ac.createGain(); revSend.gain.value=.5; revSend.connect(rev); rev.connect(master);
    bgmBus=ac.createGain(); bgmBus.gain.value=pref.bgm?BGM_VOL:0; bgmBus.connect(master);
    const br=ac.createGain(); br.gain.value=.45; bgmBus.connect(br); br.connect(revSend);
    sfxBus=ac.createGain(); sfxBus.gain.value=pref.se?SE_VOL:0; sfxBus.connect(master);
    const sr=ac.createGain(); sr.gain.value=.22; sfxBus.connect(sr); sr.connect(revSend);
    // ファミコン風の電子音用（残響なしで直接出す）
    chipBus=ac.createGain(); chipBus.gain.value=pref.se?SE_VOL:0; chipBus.connect(master);
    noiseBuf=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);
    const nd=noiseBuf.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
    setInterval(schedule,50);
    document.addEventListener('visibilitychange',()=>{document.hidden?ac.suspend():ac.resume();});
    if(want) start(want);
  }
  function impulse(sec,decay){
    const len=Math.floor(ac.sampleRate*sec), b=ac.createBuffer(2,len,ac.sampleRate);
    for(let c=0;c<2;c++){const d=b.getChannelData(c); for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay);}
    return b;
  }
  /* ---- 楽器 ---- */
  function env(g,t,a,peak,dec){g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(peak,t+a); g.gain.exponentialRampToValueAtTime(.0001,t+a+dec);}
  function osc(type,f,t,stop,dest,detune=0){const o=ac.createOscillator(); o.type=type; o.frequency.setValueAtTime(f,t); o.detune.value=detune; o.connect(dest); o.start(t); o.stop(stop); return o;}
  function gainTo(dest,v=1){const g=ac.createGain(); g.gain.value=v; g.connect(dest); return g;}
  function noise(dest,t,len,v,type='bandpass',freq=1000,q=.7){
    const s=ac.createBufferSource(); s.buffer=noiseBuf;
    const fl=ac.createBiquadFilter(); fl.type=type; fl.frequency.setValueAtTime(freq,t); fl.Q.value=q;
    const g=ac.createGain(); s.connect(fl); fl.connect(g); g.connect(dest); env(g,t,.004,v,len);
    s.start(t,Math.random()*.5); s.stop(t+len+.1); return {fl,g};
  }
  const INST={
    piano(dest,t,f,dur,v){
      const lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2600; lp.connect(dest);
      const g=gainTo(lp); env(g,t,.006,v,dur+1.3);
      osc('triangle',f,t,t+dur+1.5,g); osc('sine',f*2,t,t+dur+1.5,gainTo(g,.22));
    },
    pad(dest,t,f,dur,v){
      const lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=850; lp.Q.value=.4; lp.connect(dest);
      const g=gainTo(lp,0); const hold=Math.max(.9,dur-.2);
      g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(v,t+.8);
      g.gain.setValueAtTime(v,t+hold); g.gain.exponentialRampToValueAtTime(.0001,t+dur+1.1);
      for(const dt of [-8,7]) osc('sawtooth',f,t,t+dur+1.2,g,dt);
    },
    bass(dest,t,f,dur,v){
      const g=gainTo(dest); env(g,t,.012,v,dur+.5);
      osc('sine',f,t,t+dur+.7,g); osc('triangle',f*2,t,t+dur+.7,gainTo(g,.25));
    },
    box(dest,t,f,dur,v){
      const g=gainTo(dest); env(g,t,.003,v,1.5); const dt=(Math.random()-.5)*16;
      osc('sine',f,t,t+1.7,g,dt); osc('sine',f*2.76,t,t+1.7,gainTo(g,.16),dt);
    },
    thump(dest,t,f,dur,v){
      const g=gainTo(dest); env(g,t,.004,v,.32);
      const o=ac.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(95,t); o.frequency.exponentialRampToValueAtTime(40,t+.2);
      o.connect(g); o.start(t); o.stop(t+.45);
    },
    tick(dest,t,f,dur,v){noise(dest,t,.035,v,'highpass',5500);},
    // 短くはじく音（思考のリズム用）
    pluck(dest,t,f,dur,v){
      const lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.setValueAtTime(1600,t); lp.frequency.exponentialRampToValueAtTime(300,t+.18); lp.connect(dest);
      const g=gainTo(lp); env(g,t,.003,v,.2);
      osc('triangle',f,t,t+.3,g); osc('square',f,t,t+.3,gainTo(g,.12));
    },
    // メトロノームのクリック音。v=1 が1拍目（高く強い音）
    metro(dest,t,f,dur,v){
      const acc=v>=1, g=gainTo(dest);
      env(g,t,.001,acc?.24:.16,.035);
      osc('sine',acc?1760:1320,t,t+.06,g);
      noise(dest,t,.012,acc?.1:.07,'highpass',4000);
    },
  };
  /* ---- BGM（8分/16分音符のステップ・シーケンサ） ---- */
  function track(bpm,div,len,build){
    const ev=Array.from({length:len},()=>[]);
    build((inst,step,midi,steps,v)=>ev[((step%len)+len)%len].push({inst,midi,steps,v}));
    return {spb:60/bpm/div,len,ev};
  }
  // 捜査（Dm - B♭ - Gm - A）。garden は全体を2半音上げ、オルゴールを足した版
  function investigate(off,bright){
    return track(70,2,32,add=>{
      const ch=[[50,[62,65,69]],[46,[62,65,70]],[43,[62,67,70]],[45,[61,64,69]]];
      ch.forEach(([b,c],k)=>{
        const s=k*8, o=off;
        if(!bright) add('bass',s,b-12+o,8,.3);
        c.forEach(m=>add('pad',s,m-12+o,8,.045));
        [[0,c[0]],[1,c[2]],[2,c[1]+12],[3,c[2]],[4,c[0]+12],[6,c[1]+12]].forEach(([st,m])=>add('piano',s+st,m+o,2,.12));
      });
      const mel=bright?[[5,86],[14,84],[21,83],[29,81]]:[[6,81],[13,77],[20,79],[28,76],[30,73]];
      mel.forEach(([st,m])=>add(bright?'box':'piano',st,m+off,3,bright?.09:.11));
    });
  }
  const TRACKS={
    investigate:investigate(0,false),
    garden:investigate(2,true),
    // 仮定の再現：オルゴールと時計の音（Am - F - C - E）
    scene:track(56,2,32,add=>{
      [81,0,84,0,88,0,83,0, 81,0,76,0,79,0,77,0, 76,0,77,0,79,0,84,0, 83,0,0,0,80,0,0,0]
        .forEach((m,i)=>{if(m) add('box',i,m,2,.2);});
      [[0,[57,60,64]],[8,[53,57,60]],[16,[55,60,64]],[24,[52,56,59]]].forEach(([s,c])=>c.forEach(m=>add('pad',s,m-12,8,.035)));
      for(let i=0;i<32;i+=2) add('tick',i,0,0,i%8===0?.05:.025);
    }),
    // 取調室：心音のような低音と時計、不協和なドローン
    interro:track(80,4,64,add=>{
      for(let b=0;b<64;b+=16){add('thump',b,0,0,.5); add('thump',b+2,0,0,.32);}
      for(let i=0;i<64;i+=4) add('tick',i,0,0,.022);
      [48,51,54].forEach(m=>add('pad',0,m-12,32,.04));
      [44,48,50].forEach(m=>add('pad',32,m-12,32,.04));
      [[12,79],[28,78],[44,80],[58,78]].forEach(([s,m])=>add('piano',s,m,4,.07));
    }),
    // 自白〜エンディング（F - C/E - Dm - B♭）
    // 思考：捜査ボード／取調べで物証を選ぶとき。メトロノームだけ（4拍子・1拍目を強く）
    think:track(96,1,4,add=>{
      add('metro',0,0,0,1);
      for(let i=1;i<4;i++) add('metro',i,0,0,0);
    }),
    ending:track(64,2,32,add=>{
      const ch=[[41,[65,69,72]],[40,[64,67,72]],[38,[62,65,69]],[34,[62,65,70]]];
      ch.forEach(([b,c],k)=>{
        const s=k*8; add('bass',s,b,8,.26); c.forEach(m=>add('pad',s,m-12,8,.035));
        [0,2,4,6].forEach((st,j)=>add('piano',s+st,[c[0],c[1],c[2],c[1]][j],2,.1));
      });
      [[0,81],[3,79],[4,77],[8,79],[11,76],[12,72],[16,77],[19,74],[20,77],[24,79],[26,77],[28,77]]
        .forEach(([st,m])=>add('piano',st,m+12,3,.1));
    }),
  };
  function start(name){
    const def=TRACKS[name]; if(!def) return;
    const g=ac.createGain(); g.gain.setValueAtTime(.0001,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(1,ac.currentTime+1.4); g.connect(bgmBus);
    cur={name,def,g,step:0,next:ac.currentTime+.12};
  }
  // name が null のときは無音（流れている曲をフェードアウト）
  function setTrack(name){
    want=name; if(!ac) return;
    if(cur&&cur.name===name) return;
    if(!cur&&!name) return;
    if(cur){
      const o=cur, now=ac.currentTime;
      o.g.gain.cancelScheduledValues(now); o.g.gain.setValueAtTime(o.g.gain.value,now); o.g.gain.linearRampToValueAtTime(0,now+1.1);
      setTimeout(()=>o.g.disconnect(),4000);
      cur=null;
    }
    if(name) start(name);
  }
  function schedule(){
    if(!cur||ac.state!=='running') return;
    const d=cur.def;
    if(cur.next<ac.currentTime) cur.next=ac.currentTime+.05;
    while(cur.next<ac.currentTime+.3){
      for(const e of d.ev[cur.step]) INST[e.inst](cur.g,cur.next,mtof(e.midi),e.steps*d.spb,e.v);
      cur.next+=d.spb; cur.step=(cur.step+1)%d.len;
    }
  }
  /* ---- 効果音 ---- */
  /* ---- 効果音 ----
     発見（物証を見つけた・矛盾を見つけた）→「ピピピ」
     足音・会話の文字送り → それぞれ専用の音
     それ以外 → ファミコン風の「ピ」 */
  const FIND=new Set(['evidence','refute']);
  const KEEP=new Set(['blip','step_in','step_out']);
  // ピの高さ（Hz）と音量。音色・長さ・音量は文字送りの音と同じ（三角波・短く減衰）
  const PI_HZ=880, PI_VOL=.12, PI_LEN=.045;
  function beep(t,f,len,v){
    const g=ac.createGain(); g.connect(sfxBus);
    env(g,t,.003,v,len);
    osc('triangle',f,t,t+len+.03,g);
  }
  function sfx(name,arg){
    if(!ac||!pref.se||ac.state!=='running') return;
    const t=ac.currentTime+.01;
    if(KEEP.has(name)) return sfxRich(name,arg);
    if(FIND.has(name)){ for(let i=0;i<3;i++) beep(t+i*.085,PI_HZ,PI_LEN,PI_VOL); return; }  // ピピピ
    beep(t,PI_HZ,PI_LEN,PI_VOL);  // ピ
  }
  // 合成した効果音（今は足音と文字送りだけで使用。ほかの音も残してある）
  function sfxRich(name,arg){
    if(!ac||!pref.se||ac.state!=='running') return;
    const t=ac.currentTime+.01, D=sfxBus;
    switch(name){
      // 文字送りの音（音量 .07）
      case 'blip':{const g=gainTo(D); env(g,t,.003,.07,.045); osc('triangle',arg||400,t,t+.07,g); break;}
      case 'inspect': INST.piano(D,t,mtof(84),.05,.1); break;
      case 'select':{const g=gainTo(D); env(g,t,.004,.1,.12); const o=osc('triangle',880,t,t+.18,g); o.frequency.exponentialRampToValueAtTime(1320,t+.08); break;}
      case 'evidence': [72,76,79,84].forEach((m,i)=>INST.box(D,t+i*.07,mtof(m+12),.2,.2)); break;
      case 'paper':{const n=noise(D,t,.16,.09,'bandpass',1800,.8); n.fl.frequency.exponentialRampToValueAtTime(4200,t+.14); break;}
      case 'whoosh':{
        const s=ac.createBufferSource(); s.buffer=noiseBuf; const fl=ac.createBiquadFilter(); fl.type='bandpass'; fl.Q.value=1.2;
        fl.frequency.setValueAtTime(250,t); fl.frequency.exponentialRampToValueAtTime(2200,t+.45);
        const g=gainTo(D,0); g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.16,t+.3); g.gain.exponentialRampToValueAtTime(.0001,t+.7);
        s.connect(fl); fl.connect(g); s.start(t); s.stop(t+.8); break;}
      case 'support': INST.box(D,t,mtof(79),.2,.22); INST.box(D,t+.12,mtof(84),.3,.22); break;
      case 'refute':
        INST.thump(D,t,0,0,.7); noise(D,t,.3,.22,'highpass',1800);
        [60,63,66,71].forEach(m=>INST.piano(D,t,mtof(m),.5,.15)); break;
      case 'present':
        sfx('whoosh'); INST.thump(D,t+.18,0,0,.8); noise(D,t+.18,.35,.25,'highpass',1500);
        [55,61,66,72].forEach(m=>INST.piano(D,t+.18,mtof(m),.6,.16)); break;
      case 'wrong':{const g=gainTo(D); env(g,t,.01,.09,.35); const lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=700; g.disconnect(); g.connect(lp); lp.connect(D);
        const o=osc('sawtooth',196,t,t+.45,g); o.frequency.setValueAtTime(147,t+.15); break;}
      case 'proven': [65,69,72,77,81,84].forEach((m,i)=>INST.piano(D,t+i*.07,mtof(m),.9,.12)); break;
      case 'phase': [79,84,91].forEach((m,i)=>INST.box(D,t+i*.1,mtof(m),.3,.16)); break;
      case 'reveal':
        INST.pad(D,t,mtof(45),1.6,.07); INST.pad(D,t,mtof(52),1.6,.05);
        [84,80,77,72].forEach((m,i)=>INST.box(D,t+.15+i*.17,mtof(m),.3,.14)); break;
      case 'guide': INST.box(D,t,mtof(84),.2,.09); INST.box(D,t+.08,mtof(91),.2,.07); break;
      // 足音：室内（木の床）。arg で左右の足の音色を少し変える
      case 'step_in':{
        const r=(arg%2?1:.9)*(.95+Math.random()*.1);
        noise(D,t,.045,.16,'bandpass',1900*r,1.6);
        const g=gainTo(D); env(g,t,.002,.1,.07);
        const o=osc('sine',150*r,t,t+.1,g); o.frequency.exponentialRampToValueAtTime(85,t+.07); break;}
      // 足音：屋外（土と草）
      case 'step_out':{
        const r=(arg%2?1:.88)*(.92+Math.random()*.16);
        noise(D,t,.09,.13,'bandpass',800*r,.9);
        noise(D,t+.012,.05,.05,'highpass',3800*r);
        break;}
      case 'hypo':{
        INST.thump(D,t+.6,0,0,.7);
        const s=ac.createBufferSource(); s.buffer=noiseBuf; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(400,t); fl.frequency.exponentialRampToValueAtTime(5000,t+.6);
        const g=gainTo(D,0); g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.18,t+.6); g.gain.exponentialRampToValueAtTime(.0001,t+.66);
        s.connect(fl); fl.connect(g); s.start(t); s.stop(t+.7);
        INST.pad(D,t+.6,mtof(45),1.2,.08); break;}
      case 'hit': INST.thump(D,t,0,0,.9); noise(D,t,.22,.35,'lowpass',900); break;
      case 'lock': INST.tick(D,t,0,0,.3); INST.tick(D,t+.07,0,0,.22); INST.piano(D,t+.07,mtof(96),.05,.04); break;
      case 'sparkle': [88,91,96].forEach((m,i)=>INST.box(D,t+i*.05,mtof(m),.2,.07)); break;
      case 'keyslide': noise(D,t,1.1,.05,'bandpass',3500,5); INST.tick(D,t+1.2,0,0,.25); break;
      case 'thread':{const g=gainTo(D,0); g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.035,t+.3); g.gain.exponentialRampToValueAtTime(.0001,t+1.3);
        const o=osc('sine',1700,t,t+1.4,g); o.frequency.linearRampToValueAtTime(2300,t+1.2); break;}
    }
  }
  function setPref(k,v){
    pref[k]=v; try{localStorage.setItem(PREF_KEY,JSON.stringify(pref));}catch(e){}
    if(!ac) return;
    const buses=k==='bgm'?[bgmBus]:[sfxBus,chipBus];
    for(const bus of buses) bus.gain.setTargetAtTime(v?(k==='bgm'?BGM_VOL:SE_VOL):0,ac.currentTime,.08);
  }
  return {init,setTrack,sfx,pref,setPref,state:()=>ac?ac.state:'none'};
})();
const VOICE={'滝沢':300,'森':440,'野口':494,'柏木':370,'大河内':262,'あなた':392};
const voiceOf=name=>{if(!name) return 0; for(const k in VOICE) if(name.startsWith(k)) return VOICE[k]; return 0;};

