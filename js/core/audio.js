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
  const BGM_VOL=.26, SE_VOL=.25;   // 音量（BGMと効果音は同じレベル）
  const mtof=m=>440*Math.pow(2,(m-69)/12);
  const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));

  function init(){
    if(ac){if(ac.state==='suspended') ac.resume().catch(()=>{}); return;}
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    try{ac=new AC();}catch(e){return;}
    const comp=ac.createDynamicsCompressor();
    comp.threshold.value=-15; comp.knee.value=18; comp.ratio.value=3; comp.attack.value=.005; comp.release.value=.22;
    master=ac.createGain(); master.gain.value=.9; master.connect(comp); comp.connect(ac.destination);

    // 温かく暗い木造の書斎〜ホールの残響（高域の金属的なざらつきを抑える）
    const rev=ac.createConvolver(); rev.buffer=impulse(2.1,2.9);
    const revLp=ac.createBiquadFilter(); revLp.type='lowpass'; revLp.frequency.value=2600; revLp.Q.value=.5;
    revSend=ac.createGain(); revSend.gain.value=.42;
    revSend.connect(revLp); revLp.connect(rev); rev.connect(master);

    bgmBus=ac.createGain(); bgmBus.gain.value=pref.bgm?BGM_VOL:0; bgmBus.connect(master);
    const br=ac.createGain(); br.gain.value=.36; bgmBus.connect(br); br.connect(revSend);
    sfxBus=ac.createGain(); sfxBus.gain.value=pref.se?SE_VOL:0; sfxBus.connect(master);
    const sr=ac.createGain(); sr.gain.value=.22; sfxBus.connect(sr); sr.connect(revSend);
    // ファミコン風の電子音用（残響なしで直接出す）
    chipBus=ac.createGain(); chipBus.gain.value=pref.se?SE_VOL:0; chipBus.connect(master);
    noiseBuf=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate);
    const nd=noiseBuf.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
    setInterval(schedule,50);
    document.addEventListener('visibilitychange',()=>{
      if(!ac) return;
      document.hidden?ac.suspend().catch(()=>{}):ac.resume().catch(()=>{});
    });
    if(want) start(want);
  }
  function impulse(sec,decay){
    const len=Math.floor(ac.sampleRate*sec), b=ac.createBuffer(2,len,ac.sampleRate);
    const early=Math.floor(ac.sampleRate*.045);
    for(let c=0;c<2;c++){
      const d=b.getChannelData(c); let lp=0;
      for(let i=0;i<len;i++){
        const raw=(Math.random()*2-1)*Math.pow(1-i/len,decay);
        lp=lp*.62+raw*.38;
        d[i]=lp*(i<early?.55:1);
      }
      for(const ms of [.011,.019,.028,.037]){
        const idx=Math.floor(ms*ac.sampleRate)+(c?17:0);
        if(idx<len) d[idx]+=(Math.random()*.4+.2)*(c?-1:1)*.35;
      }
    }
    return b;
  }
  /* ---- 楽器 ---- */
  function env(g,t,a,peak,dec){
    const p=Math.max(.0002,peak), atk=Math.max(.002,a), d=Math.max(.01,dec);
    g.gain.setValueAtTime(.0001,t);
    g.gain.exponentialRampToValueAtTime(p,t+atk);
    g.gain.exponentialRampToValueAtTime(.0001,t+atk+d);
  }
  function osc(type,f,t,stop,dest,detune=0){
    const o=ac.createOscillator(); o.type=type; o.frequency.setValueAtTime(Math.max(20,f),t);
    o.detune.value=detune; o.connect(dest); o.start(t); o.stop(stop); return o;
  }
  function gainTo(dest,v=1){const g=ac.createGain(); g.gain.value=v; g.connect(dest); return g;}
  function panTo(dest,p=0,v=1){
    if(p&&ac.createStereoPanner){
      const sp=ac.createStereoPanner(); sp.pan.value=clamp(p,-1,1); sp.connect(dest); return gainTo(sp,v);
    }
    return gainTo(dest,v);
  }
  function noise(dest,t,len,v,type='bandpass',freq=1000,q=.7,pan=0){
    const s=ac.createBufferSource(); s.buffer=noiseBuf; s.loop=true;
    const fl=ac.createBiquadFilter(); fl.type=type; fl.frequency.setValueAtTime(freq,t); fl.Q.value=q;
    const g=panTo(dest,pan); s.connect(fl); fl.connect(g); env(g,t,.004,v,len);
    s.start(t,Math.random()*1.2); s.stop(t+len+.12); return {fl,g};
  }
  const INST={
    // フェルトピアノ（陰影のあるローパス減衰と微かなハンマー音）
    piano(dest,t,f,dur,v,pan=0){
      const p=pan||clamp((f-350)/900,-.22,.22);
      const lp=ac.createBiquadFilter(); lp.type='lowpass';
      lp.frequency.setValueAtTime(Math.min(4600,f*4.5+900),t);
      lp.frequency.exponentialRampToValueAtTime(Math.max(360,f*1.55),t+Math.min(.75,dur*.65+.15));
      lp.connect(panTo(dest,p));
      const g=gainTo(lp); env(g,t,.005,v,dur+1.15);
      osc('triangle',f,t,t+dur+1.35,g);
      osc('sine',f*2,t,t+dur+1.35,gainTo(g,.24));
      const g3=gainTo(lp); env(g3,t,.004,v*.09,Math.min(.45,dur*.5+.12));
      osc('sine',f*3,t,t+.6,g3);
      noise(lp,t,.014,v*.15,'bandpass',Math.min(2400,f*2.2+400),1.2,p);
    },
    // 暗く重厚な室内楽ストリングス・パッド
    pad(dest,t,f,dur,v,pan=0){
      const lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=740; lp.Q.value=.45; lp.connect(dest);
      const atk=Math.min(.85,Math.max(.25,dur*.38)), hold=Math.max(atk+.05,dur-.15);
      for(const [dt,pn] of [[-7,-.22],[7,.22]]){
        const g=panTo(lp,pan+pn,0);
        g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(Math.max(.0002,v*.62),t+atk);
        g.gain.setValueAtTime(Math.max(.0002,v*.62),t+hold); g.gain.exponentialRampToValueAtTime(.0001,t+dur+1.05);
        osc('sawtooth',f,t,t+dur+1.2,g,dt);
      }
      const gt=panTo(lp,pan,0);
      gt.gain.setValueAtTime(.0001,t); gt.gain.exponentialRampToValueAtTime(Math.max(.0002,v*.45),t+atk);
      gt.gain.setValueAtTime(Math.max(.0002,v*.45),t+hold); gt.gain.exponentialRampToValueAtTime(.0001,t+dur+1.05);
      osc('triangle',f,t,t+dur+1.2,gt);
    },
    // ノワール・ウッドベース（指弾きのアタックと深い胴鳴り）
    bass(dest,t,f,dur,v,pan=0){
      const lp=ac.createBiquadFilter(); lp.type='lowpass';
      lp.frequency.setValueAtTime(760,t); lp.frequency.exponentialRampToValueAtTime(175,t+.16);
      lp.connect(panTo(dest,pan));
      const g=gainTo(lp); env(g,t,.008,v,dur+.45);
      osc('triangle',f,t,t+dur+.6,g);
      osc('sawtooth',f,t,t+dur+.6,gainTo(g,.22));
      const sub=panTo(dest,pan); env(sub,t,.01,v*.52,dur+.4);
      osc('sine',f,t,t+dur+.5,sub);
    },
    // 緊張感のある弦楽ピッツィカート（推理・思考・対峙用）
    pizz(dest,t,f,dur,v,pan=0){
      const p=pan||clamp((f-400)/800,-.25,.25);
      const lp=ac.createBiquadFilter(); lp.type='lowpass';
      lp.frequency.setValueAtTime(2200,t); lp.frequency.exponentialRampToValueAtTime(380,t+.13);
      lp.connect(panTo(dest,p));
      const g=gainTo(lp); env(g,t,.003,v,.26);
      osc('triangle',f,t,t+.36,g);
      osc('sawtooth',f,t,t+.36,gainTo(g,.28),4);
    },
    // 霧がかかったようなビブラフォン（トレモロ付きノワール鍵盤）
    vibes(dest,t,f,dur,v,pan=.14){
      const g=panTo(dest,pan); env(g,t,.006,v,dur+1.2);
      const trem=ac.createGain(); trem.gain.value=.84; trem.connect(g);
      const lfo=ac.createOscillator(); lfo.frequency.value=5.1;
      const lg=ac.createGain(); lg.gain.value=.16; lfo.connect(lg); lg.connect(trem.gain);
      lfo.start(t); lfo.stop(t+dur+1.4);
      osc('sine',f,t,t+dur+1.4,trem);
      const clk=panTo(dest,pan); env(clk,t,.002,v*.18,.07);
      osc('sine',f*4,t,t+.1,clk);
    },
    // 壊れかけたオルゴール／チェレスタ（回想・手紙用）
    box(dest,t,f,dur,v,pan=-.12){
      const g=panTo(dest,pan); env(g,t,.002,v,1.45);
      const dt=(Math.random()-.5)*11;
      osc('sine',f,t,t+1.65,g,dt);
      osc('sine',f*2,t,t+1.65,gainTo(g,.16),dt);
      const shimmer=panTo(dest,pan); env(shimmer,t,.002,v*.14,.32);
      osc('sine',f*2.756,t,t+.4,shimmer,dt);
    },
    // 夜露を帯びたハープ（庭・屋外の探索用）
    harp(dest,t,f,dur,v,pan=0){
      const p=pan||clamp((f-420)/750,-.28,.28);
      const lp=ac.createBiquadFilter(); lp.type='lowpass';
      lp.frequency.setValueAtTime(3000,t); lp.frequency.exponentialRampToValueAtTime(520,t+dur+.35);
      lp.connect(panTo(dest,p));
      const g=gainTo(lp); env(g,t,.004,v,dur+.75);
      osc('triangle',f,t,t+dur+.9,g);
      osc('sine',f*2,t,t+dur+.9,gainTo(g,.16));
    },
    // 懐中時計の秒針（Tick / Tock の2音色）
    clock(dest,t,f,dur,v,pan=.18){
      noise(dest,t,.014,v,'bandpass',3200,3.6,pan);
      const g=panTo(dest,pan); env(g,t,.001,v*.45,.014);
      const o=osc('sine',2200,t,t+.025,g); o.frequency.exponentialRampToValueAtTime(1300,t+.015);
    },
    tock(dest,t,f,dur,v,pan=.18){
      noise(dest,t,.016,v*.85,'bandpass',2150,3.2,pan);
      const g=panTo(dest,pan); env(g,t,.001,v*.38,.016);
      const o=osc('sine',1550,t,t+.028,g); o.frequency.exponentialRampToValueAtTime(960,t+.016);
    },
    // 鼓動・低音の衝撃（取調室・緊迫場面）
    heart(dest,t,f,dur,v,pan=0){
      const lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=155; lp.connect(panTo(dest,pan));
      const g=gainTo(lp); env(g,t,.006,v,.26);
      const o=osc('sine',82,t,t+.34,g); o.frequency.exponentialRampToValueAtTime(34,t+.19);
    },
    // 控えめなブラシスネアの揺らぎ
    brush(dest,t,f,dur,v,pan=-.16){
      noise(dest,t,.065,v,'bandpass',3400,.85,pan);
    },
    // 雨上がりの軒先から落ちる水滴
    drop(dest,t,f,dur,v,pan=0){
      const p=pan||(Math.random()-.5)*.55;
      const g=panTo(dest,p); env(g,t,.002,v,.08);
      const o=osc('sine',f,t,t+.1,g); o.frequency.exponentialRampToValueAtTime(f*1.46,t+.055);
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
    build((inst,step,midi=0,steps=1,v=.1,pan=0)=>ev[((step%len)+len)%len].push({inst,midi,steps,v,pan}));
    return {spb:60/bpm/div,len,ev};
  }
  const TRACKS={
    // タイトル：霧深い洋館の静寂と謎の始まり（Dm, 58 BPM, 8小節）
    title:track(58,2,64,add=>{
      const ch=[
        [38,[50,53,57,64]],[37,[49,53,57,64]],[34,[50,53,57,60]],[33,[49,55,58,64]],
        [38,[50,53,57,64]],[43,[50,52,55,58]],[40,[50,55,58,64]],[33,[52,55,57,61]],
      ];
      ch.forEach(([b,c],k)=>{
        const s=k*8;
        add('bass',s,b,7,.16);
        c.forEach(m=>add('pad',s,m,8,.026));
      });
      for(let i=0;i<64;i+=2) add(i%4===0?'clock':'tock',i,0,0,i%8===0?.05:.032);
      const mel=[
        [2,69,3,.11],[5,77,2,.10],[7,76,2,.09],[8,74,5,.12],[14,69,2,.09],
        [16,70,3,.11],[20,74,2,.10],[22,77,2,.11],[24,76,4,.12],[28,73,4,.10],
        [34,81,3,.11],[37,79,2,.10],[39,77,2,.10],[40,76,4,.11],[44,74,4,.10],
        [48,79,3,.11],[52,77,2,.10],[54,76,2,.10],[58,76,3,.10],[62,73,3,.09],
      ];
      mel.forEach(([st,m,l,v])=>add('piano',st,m,l,v));
      [[34,81],[39,77],[58,76],[62,73]].forEach(([st,m])=>add('box',st,m+12,2,.055));
    }),

    // 書斎（事件現場）：王道ノワール探偵のクロマチック・ベースライン（Dm, 68 BPM, 8小節）
    investigate:track(68,2,64,add=>{
      const bars=[
        {b:[38,45,50,49],p:[53,57,64],arp:[62,65,69,76,69,65]},
        {b:[37,45,49,48],p:[53,57,64],arp:[61,65,69,76,69,65]},
        {b:[36,45,48,47],p:[53,57,62],arp:[60,65,69,74,69,65]},
        {b:[35,43,47,46],p:[53,57,62],arp:[59,65,69,74,69,65]},
        {b:[34,41,45,43],p:[50,53,57],arp:[58,62,65,69,65,62]},
        {b:[31,38,43,41],p:[50,53,58],arp:[55,62,65,70,65,62]},
        {b:[40,46,43,41],p:[50,55,58],arp:[58,62,67,70,67,62]},
        {b:[33,40,43,40],p:[52,55,61],arp:[57,64,67,73,67,64]},
      ];
      bars.forEach((bar,k)=>{
        const s=k*8;
        add('bass',s,bar.b[0],3,.22);
        add('bass',s+3,bar.b[1],1,.13);
        add('bass',s+4,bar.b[2],3,.19);
        add('bass',s+7,bar.b[3],1,.14);
        bar.p.forEach(m=>add('pad',s,m,8,.028));
        [[1,0],[2,1],[3,2],[5,3],[6,4],[7,5]].forEach(([st,idx])=>add('piano',s+st,bar.arp[idx],1.5,.065));
        add('brush',s+2,0,0,.028); add('brush',s+6,0,0,.032);
        add('clock',s,0,0,.042);
      });
      const mel=[
        [2,69,3,.13],[5,77,2,.13],[7,76,2,.12],
        [8,77,4,.14],[12,76,2,.12],[14,73,2,.12],
        [16,74,5,.14],[22,69,2,.11],
        [24,71,4,.13],[28,74,2,.12],[30,77,2,.13],
        [32,76,3,.13],[35,74,3,.12],[38,72,2,.11],
        [40,74,4,.14],[44,70,2,.12],[46,69,2,.11],
        [48,67,4,.13],[52,70,2,.12],[54,74,2,.13],
        [56,73,5,.14],[62,76,2,.12],
      ];
      mel.forEach(([st,m,l,v])=>{
        add('piano',st,m,l,v);
        if(st%8===0||st===5||st===30||st===56) add('vibes',st,m,l,.075);
      });
    }),

    // 庭（雨上がりの夜）：湿った夜気とハープ、水滴の響き（Em, 60 BPM, 8小節）
    garden:track(60,2,64,add=>{
      const bars=[
        {b:40,p:[55,59,66],h:[64,71,78,79,71,78]},
        {b:36,p:[55,59,64],h:[60,67,71,76,78,76]},
        {b:33,p:[52,55,60],h:[57,64,71,72,76,71]},
        {b:35,p:[54,57,63],h:[59,66,69,75,69,66]},
        {b:40,p:[55,59,66],h:[64,71,78,79,83,78]},
        {b:38,p:[54,59,62],h:[62,69,71,78,74,71]},
        {b:37,p:[55,59,64],h:[61,67,71,76,79,76]},
        {b:42,p:[57,60,63],h:[66,69,72,75,72,69]},
      ];
      bars.forEach((bar,k)=>{
        const s=k*8;
        add('bass',s,k===7?35:bar.b,7,.17);
        if(k===7) add('bass',s,42,3,.15);
        bar.p.forEach(m=>add('pad',s,m,8,.03));
        [0,1,2,4,5,6].forEach((st,j)=>add('harp',s+st,bar.h[j],2.5,.085));
      });
      const cel=[
        [3,83,3,.095],[6,79,2,.085],[8,78,4,.10],[14,76,2,.085],
        [18,72,3,.095],[21,71,3,.09],[26,76,3,.095],[30,75,3,.09],
        [34,76,3,.095],[38,79,2,.09],[40,78,4,.10],[45,74,3,.09],
        [48,76,4,.095],[53,79,3,.09],[56,78,4,.10],[60,75,4,.095],
      ];
      cel.forEach(([st,m,l,v])=>add('box',st,m,l,v));
      [[5,88],[19,86],[29,91],[43,88],[55,83]].forEach(([st,m])=>add('drop',st,m,1,.045));
    }),

    // 仮定の再現：セピア色の記憶を辿る懐中時計とオルゴール（Am, 58 BPM, 8小節）
    scene:track(58,2,64,add=>{
      const ch=[
        [33,[57,60,64]],[32,[56,60,64]],[31,[55,60,64]],[30,[54,60,64]],
        [29,[53,57,64]],[38,[53,57,59]],[35,[53,57,62]],[40,[52,56,62]],
      ];
      ch.forEach(([b,c],k)=>{
        const s=k*8;
        add('bass',s,b,7,.18);
        c.forEach(m=>add('pad',s,m-12,8,.032));
        if(k%2===0) add('piano',s,b+12,4,.09);
      });
      for(let i=0;i<64;i+=2) add(i%4===0?'clock':'tock',i,0,0,i%8===0?.068:.042);
      const bx=[
        81,0,84,0,88,0,83,0, 84,0,80,0,76,0,83,0,
        81,0,79,0,76,0,79,0, 78,0,81,0,84,0,81,0,
        76,0,81,0,84,0,83,0, 81,0,77,0,74,0,77,0,
        76,0,74,0,71,0,74,0, 76,0,77,0,80,0,83,0,
      ];
      bx.forEach((m,i)=>{if(m) add('box',i,m,2.5,.135);});
    }),

    // 取調室：心音・秒針・不協和な低音で追い詰める心理戦（Cm, 84 BPM, 8小節）
    interro:track(84,4,128,add=>{
      const drones=[
        [0,[36,43,51],36],[16,[36,43,51],36],[32,[36,42,51],36],[48,[36,42,51],35],
        [64,[32,39,50],32],[80,[32,41,50],32],[96,[31,38,53],31],[112,[31,38,56],31],
      ];
      drones.forEach(([s,ch,b],k)=>{
        add('heart',s,0,0,k%2===0?.34:.28);
        add('heart',s+3,0,0,k%2===0?.20:.16);
        ch.forEach(m=>add('pad',s,m,16,.032));
        for(let q=0;q<4;q++) add(q%2===0?'clock':'tock',s+q*4,0,0,q===0?.068:.042);
        for(let e=0;e<8;e++){
          const vel=k>=4?(e%2===0?.105:.075):(e%4===0?.085:.048);
          add('pizz',s+e*2,b+12+(k===7&&e>=4?7:0),1,vel);
        }
        add('bass',s,b,6,.21);
        if(k===3) add('bass',s+12,35,3,.16);
      });
      const stabs=[
        [10,79,4,.10],[14,75,3,.09],
        [26,78,5,.11],
        [40,72,3,.095],[44,75,3,.10],[46,78,4,.11],
        [52,79,6,.105],
        [70,80,4,.11],[76,79,4,.10],
        [86,78,4,.11],[92,77,4,.10],
        [102,75,4,.105],[108,74,4,.10],
        [116,71,4,.105],[122,74,4,.11],[126,77,3,.115],
      ];
      stabs.forEach(([st,m,l,v])=>add('piano',st,m,l,v));
    }),

    // 思考：捜査ボード／取調べで物証を選ぶとき。思考を研ぎ澄ますピッツィカートと時計（Cm, 88 BPM, 8小節）
    think:track(88,4,128,add=>{
      const bars=[
        {b:36,p:[60,63,67,70],ost:[60,67,63,67,62,67,63,67]},
        {b:32,p:[56,60,63,67],ost:[56,63,60,63,67,63,60,63]},
        {b:29,p:[53,56,60,67],ost:[53,60,56,60,67,60,56,60]},
        {b:31,p:[55,59,62,68],ost:[55,62,59,68,67,65,62,59]},
        {b:36,p:[60,63,67,70],ost:[60,67,63,70,67,63,62,67]},
        {b:34,p:[58,63,67,70],ost:[58,67,63,67,70,67,63,67]},
        {b:32,p:[56,60,63,68],ost:[56,63,60,63,62,68,65,68]},
        {b:31,p:[55,60,62,65],ost:[55,62,60,62,55,62,59,65]},
      ];
      bars.forEach((bar,k)=>{
        const s=k*16;
        add('bass',s,bar.b,4,.20);
        add('bass',s+6,bar.b+12,2,.14);
        add('bass',s+8,bar.b,4,.18);
        add('bass',s+12,bar.b+7,3,.14);
        bar.p.forEach(m=>add('pad',s,m-12,14,.022));
        for(let j=0;j<8;j++) add('pizz',s+j*2,bar.ost[j],1,j%2===0?.095:.068);
        for(let q=0;q<4;q++) add(q%2===0?'clock':'tock',s+q*4,0,0,q===0?.068:.042);
        add('brush',s+4,0,0,.026); add('brush',s+12,0,0,.030);
      });
      const vMel=[
        [16,79,4,.09],[22,75,3,.085],[26,74,4,.085],
        [48,84,4,.09],[54,82,3,.085],[58,79,4,.085],
        [80,80,4,.09],[86,79,3,.085],[90,77,4,.085],
        [112,74,4,.09],[118,71,3,.085],[122,67,4,.085],
      ];
      vMel.forEach(([st,m,l,v])=>add('vibes',st,m,l,v));
    }),

    // 自白〜エンディング：哀切と救済のピアノバラード（Dm -> F, 60 BPM, 16小節）
    ending:track(60,2,128,add=>{
      const bars=[
        {b:38,arp:[62,69,76,77,69,76],p:[50,53,57]},
        {b:34,arp:[58,65,69,74,65,69],p:[50,53,58]},
        {b:31,arp:[55,62,65,70,62,65],p:[50,55,58]},
        {b:33,arp:[57,64,69,74,64,73],p:[49,55,57]},
        {b:38,arp:[62,69,76,77,69,76],p:[50,53,57]},
        {b:40,arp:[60,64,69,72,64,69],p:[52,55,60]},
        {b:34,arp:[58,65,69,74,65,69],p:[50,53,58]},
        {b:36,arp:[60,67,70,74,67,72],p:[52,55,58]},
        {b:41,arp:[65,69,72,76,69,72],p:[53,57,60,64]},
        {b:40,arp:[60,67,72,76,67,72],p:[52,55,60]},
        {b:38,arp:[62,65,69,72,65,69],p:[50,53,57,60]},
        {b:36,arp:[60,64,67,72,64,67],p:[48,52,57]},
        {b:34,arp:[58,62,65,69,62,65],p:[50,53,58,60]},
        {b:33,arp:[57,60,65,69,60,65],p:[48,53,57]},
        {b:31,arp:[55,62,65,70,60,67],p:[50,53,58]},
        {b:41,arp:[65,69,72,76,61,69],p:[53,57,61]},
      ];
      bars.forEach((bar,k)=>{
        const s=k*8;
        add('bass',s,bar.b,7,.18);
        if(k===14) add('bass',s+4,36,3,.16);
        if(k===15) add('bass',s+4,37,3,.16);
        bar.p.forEach(m=>add('pad',s,m,8,k>=8?.032:.024));
        [0,1,2,4,5,6].forEach((st,j)=>add('piano',s+st,bar.arp[j],2,.075));
      });
      const mel=[
        [2,81,3,.13],[6,79,2,.12],[7,77,2,.12],
        [8,76,4,.13],[12,74,4,.12],
        [16,74,4,.13],[20,77,2,.12],[22,76,2,.12],
        [24,76,4,.13],[28,73,4,.12],
        [34,81,3,.135],[37,82,2,.13],[39,81,2,.12],
        [40,79,4,.13],[44,84,2,.135],[46,79,2,.12],
        [48,77,4,.13],[52,74,2,.12],[54,77,2,.12],
        [56,79,4,.13],[60,76,4,.12],
        [64,81,4,.14],[68,79,2,.13],[70,77,2,.13],
        [72,79,4,.14],[76,84,2,.14],[78,76,2,.12],
        [80,77,4,.14],[84,81,2,.135],[86,79,2,.13],
        [88,76,4,.135],[92,72,4,.12],
        [96,74,4,.135],[100,77,2,.13],[102,82,2,.14],
        [104,81,4,.14],[108,77,2,.13],[110,72,2,.12],
        [112,74,4,.135],[116,77,2,.13],[118,79,2,.13],
        [120,76,4,.135],[124,77,2,.13],[126,76,2,.12],
      ];
      mel.forEach(([st,m,l,v])=>{
        add('piano',st,m,l,v);
        if(st>=96&&st%4===0) add('box',st,m,2.5,.065);
      });
    }),
  };
  function start(name){
    const def=TRACKS[name]; if(!def) return;
    const now=ac.currentTime, g=ac.createGain();
    const fadeIn=(name==='think'||name==='interro')?.65:1.15;
    g.gain.setValueAtTime(.0001,now);
    g.gain.exponentialRampToValueAtTime(1,now+fadeIn); g.connect(bgmBus);
    cur={name,def,g,step:0,next:now+.1};
  }
  // name が null のときは無音（流れている曲をフェードアウト）
  function setTrack(name){
    want=name; if(!ac) return;
    if(cur&&cur.name===name) return;
    if(!cur&&!name) return;
    if(cur){
      const o=cur, now=ac.currentTime;
      o.g.gain.cancelScheduledValues(now); o.g.gain.setTargetAtTime(0,now,.2);
      setTimeout(()=>{try{o.g.disconnect();}catch(e){}},2600);
      cur=null;
    }
    if(name) start(name);
  }
  function schedule(){
    if(!cur||ac.state!=='running') return;
    const d=cur.def;
    if(cur.next<ac.currentTime) cur.next=ac.currentTime+.05;
    while(cur.next<ac.currentTime+.3){
      const jitter=Math.random()*.005;
      for(const e of d.ev[cur.step]){
        const jt=(e.inst==='clock'||e.inst==='tock'||e.inst==='heart'||e.inst==='metro')?0:jitter;
        INST[e.inst](cur.g,cur.next+jt,e.midi?mtof(e.midi):0,e.steps*d.spb,e.v,e.pan||0);
      }
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
const VOICE={'滝沢':300,'森':440,'野口':494,'柏木':370,'大河内':262,'あなた':392,'早瀬':523,'岩田':277,'久我':330,'館長':247,'小松':587};
const voiceOf=name=>{if(!name) return 0; for(const k in VOICE) if(name.startsWith(k)) return VOICE[k]; return 0;};

