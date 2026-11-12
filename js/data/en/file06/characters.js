/* Data: FILE.06 people at the scene (NPCs) (English) */
'use strict';

/* Six people are shut in: you, Takizawa, Yaeko, Goda, Akari and Mashiba.
   Yaeko never mentions that she, too, holds a can of Minoru’s film (the other half) — not until the very end. */
const f6Proven=()=>{const h=HYPS.find(x=>x.id==='h4'); return !!h&&hypStatus(h)==='proven';};

defCase('file06',{NPCS:{
  /* Takizawa: shut in with you. Always on whichever map you’re on */
  takizawa:{get map(){return S.map==='lobby'?'lobby':'theater';},
    get x(){return S.map==='lobby'?11:12;}, get y(){return S.map==='lobby'?2:4;},
    dir:'left',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Yaeko: the owner. Mashiba leaving his seat, Akari’s job, the panel keys, the hint to Goda’s combination */
  yaeko:{map:'theater',x:7,y:4,dir:'right',name:'Yaeko (Owner)',look:LOOK.yaeko,
    alert:()=>findable('mashibaOut')||findable('akariSkill')||findable('panelKey'),talk(){
    if(findable('mashibaOut')){
      say('Yaeko','Who left their seat before the lights went? ...That would be Mr. Mashiba.');
      say('Yaeko','Around 10:15, I’d say. He went out the back doors with his cigarettes. The smoking corner in the lobby, I suppose.');
      say('Yaeko','He wasn’t in here when it went dark. That was him out in the lobby, shouting “The shutter!”');
      give('mashibaOut');
    }else if(findable('akariSkill')){
      say('Yaeko','Akari’s job? She works in film and video, out in Tokyo. Television, something or other... behind the scenes, anyway.');
      say('Yaeko','She learned to run film projectors at vocational school. She practically lived in that booth when she was little.');
      say('Yaeko','With 16mm, she might be handier than Goda. ...Don’t tell him I said that.');
      give('akariSkill');
    }else if(findable('panelKey')){
      say('Yaeko','The key to the breaker panel? ...There are only two.');
      say('Yaeko','One is in the safe at my house. The other is on Goda’s key ring. For sixty years, I’ve left the electrics to Goda.');
      say('Yaeko','...Detective. What are you thinking?');
      give('panelKey');
    }else if(f6Proven()){
      say('Yaeko','...Goda, of all people.');
      say('Yaeko','His numbers? His bicycle lock, his bank PIN — that man uses the same date for everything. The day this place opened.');
      say('Yaeko','Says he can’t remember anything else. ...And yet he never forgets a single other thing.');
    }else if(has('projector16')&&!S.flags.yaekoReel){
      S.flags.yaekoReel=1;
      say('Yaeko','The 16mm? ...Yes, I’m the one who asked Akari.');
      say('Yaeko','What’s on it? ...I’ll tell you later. Not yet.');
    }else if(!S.flags.yaekoMet){
      S.flags.yaekoMet=1;
      say('Yaeko','I’m Yaeko Hoshino, the owner. ...Some night this has turned out to be, Detective.');
      say('Yaeko','My late husband Minoru and I opened the Ginseiza sixty years ago. We said goodbye to our customers at the farewell show this afternoon. Tonight’s screening was the real last one.');
      say('Yaeko','Just family, on the last night. I invited little Takizawa too. As a boy he was forever sneaking in through the back emergency exit, that one.');
      say('Takizawa','...Mrs. Hoshino, must you.');
    }else if(phase()>=3){
      const l=['Goda has been in this place since he was twelve. ...Fifty years, and he’s only ever seen the audience through that little booth window.','Twenty years since Minoru died. ...I haven’t watched a single frame with him in it. I felt that if I did, he’d really be gone.'];
      say('Yaeko',l[S.ev.length%l.length]);
    }else if(phase()>=2){
      say('Yaeko','Akari went around collecting all those signatures. Three thousand. ...I’m grateful. But this old woman hasn’t got the strength to keep the place going.');
    }else if(phase()>=1){
      say('Yaeko','Mr. Mashiba? He’s not a bad man. I’m the one who decided to sell.');
    }else{
      const l=['We used to have blackouts all the time. Minoru and Goda would walk the customers out by flashlight.','The dark doesn’t bother me. I’ve spent sixty years living in it, more or less.'];
      say('Yaeko',l[S.ev.length%l.length]);
    }
  }},

  /* ---------- Lobby ---------- */

  /* Goda: the projectionist. Blocks the booth door at first (steps aside in phase 2). Gives no evidence */
  goda:{map:'lobby',get x(){return phase()>=2?12:16;},get y(){return phase()>=2?6:5;},
    dir:'down',name:'Goda (Projectionist)',look:LOOK.goda,alert:()=>false,talk(){
    if(f6Proven()){
      say('Goda','.........');
      say('Goda','Couldn’t wait for dawn, could you. ...Impatient lot, detectives.');
    }else if(phase()>=3){
      const l=['...When the sun comes up, you’ll get out. Wait till then.','A projectionist doesn’t leave the booth till the audience goes home. ...That’s how I’ve always done it.'];
      say('Goda',l[S.ev.length%l.length]);
    }else if(phase()>=2){
      say('Goda','...If you want to see the booth, see it. It’s an emergency.');
      say('Goda','But don’t touch the projectors. Those belong to me and Minoru.');
    }else if(!S.flags.godaMet){
      S.flags.godaMet=1;
      say('Goda','Goda. Projectionist. ...Nobody goes in the booth. Projectionist’s rule.');
      say('Goda','Blackout? Old place like this. Nothing new. I was in the booth, getting ready for the changeover.');
    }else if(phase()>=1){
      say('Goda','Phone’s dead too, eh. ...Someone’ll notice come morning.');
    }else{
      say('Goda','Nobody goes in the booth. ...How many times do I have to say it.');
    }
  }},

  /* Akari: the owner’s granddaughter. The 16mm plan, the empty booth, Yaeko’s answer */
  akari:{map:'lobby',x:5,y:8,dir:'left',name:'Akari (Granddaughter)',look:LOOK.akari,
    alert:()=>(findable('akariPlan')&&has('projector16'))||findable('boothEmpty')||findable('refusal'),talk(){
    if(findable('akariPlan')&&has('projector16')){
      say('Akari','...So you saw the 16mm. Yeah, I threaded that.');
      say('Akari','Grandma asked me to. Right after the screening, run this 16mm, she said. “And don’t tell Goda.”');
      say('Akari','I don’t know what’s on it. She only gave me the reel. She kept the can.');
      say('Akari','At 10:24 I switched on the lamp to give it a test run, and... blackout. It stopped my screening too.');
      say('Akari','If I’d cut the power, I’d have killed my own screening. ...Pretty stupid, right?');
      give('akariPlan');
    }else if(findable('boothEmpty')){
      say('Akari','When I went into the booth? ...Actually, it was weird.');
      say('Akari','10:20. Goda wasn’t there. The 35mm was running all by itself. Near the end of reel two — maybe ten minutes to the changeover.');
      say('Akari','I have never, ever seen Goda leave a projector running alone. Not once in my life.');
      give('boothEmpty');
    }else if(findable('refusal')){
      say('Akari','Goda and Grandma? ...Now that you mention it, last week I overheard them outside the booth.');
      say('Akari','Goda said, “On the day we close... how about we watch something with Minoru in it?” And Grandma said “I won’t,” just like that.');
      say('Akari','Then: “When the screening’s over, I hand the keys back at midnight, and I never come here again.” ...Goda went back into the booth without a word.');
      give('refusal');
    }else if(!S.flags.akariMet){
      S.flags.akariMet=1;
      say('Akari','I’m Akari, the granddaughter. I came back from Tokyo for the closing.');
      say('Akari','I collected three thousand signatures to save this place. ...The box is still on the kiosk counter.');
      say('Akari','Never thought we’d end up locked in on the last night, though.');
    }else if(phase()>=3){
      say('Akari','Why did Grandma want to keep the 16mm a secret from Goda, I wonder.');
    }else if(phase()>=2){
      say('Akari','Me, lock everyone in? ...Okay, yes, I wanted to stop the closing. But not like this.');
    }else{
      const l=['When I was little, I loved looking through the booth window at all the heads lined up in the seats.','If they tear this place down, I feel like half my childhood goes with it.'];
      say('Akari',l[S.ev.length%l.length]);
    }
  }},

  /* Mashiba: real estate. The contract, the schedule, passing Akari */
  mashiba:{map:'lobby',x:15,y:8,dir:'left',name:'Mashiba (Realtor)',look:LOOK.mashiba,
    alert:()=>findable('contract')||(findable('schedule')&&has('contract'))||findable('akariOut'),talk(){
    if(findable('contract')){
      say('Mashiba','The contract? ...Here. I brought a copy.');
      sys('Mashiba takes a document from his briefcase: a copy of the sale contract for the Ginseiza’s land and building.');
      say('Mashiba','The handover was set for midnight. Keys in hand, and done. ...Well past that now.');
      say('Mashiba','There’s a penalty for late handover in there too. If it’s on the seller’s side, that is.');
      give('contract');
    }else if(findable('schedule')&&has('contract')){
      say('Mashiba','My company profits if the handover’s late? ...You’re joking. Look at this.');
      sys('Clipped to Mashiba’s board: the demolition schedule. “Day 1, 7:00 — heavy machinery arrives, crew of twenty.”');
      say('Mashiba','At seven a.m., machines and twenty workers show up here. Every day the work’s held up, we lose close to a million yen just paying them to stand around.');
      say('Mashiba','A ¥300,000 penalty is a drop in the bucket. ...Nobody wants out of here faster than I do.');
      give('schedule');
    }else if(findable('akariOut')){
      say('Mashiba','Ms. Akari? ...Yes, I passed her in the lobby around 10:20. I was at the smoking corner.');
      say('Mashiba','She came out from the auditorium holding something flat and round, and went on toward the back. The projection room, I think.');
      say('Mashiba','She wasn’t in the auditorium when the power went, I’m sure of it.');
      give('akariOut');
    }else if(!S.flags.mashibaMet){
      S.flags.mashibaMet=1;
      say('Mashiba','Mashiba, from the real estate company. We’re buying the Ginseiza site.');
      say('Mashiba','I was supposed to get the keys from Mrs. Hoshino at midnight. That’s why I was sitting in on the screening...');
      say('Mashiba','When the power went, I was at the smoking corner in the lobby. And then the shutter came crashing down.');
    }else if(phase()>=3){
      say('Mashiba','I had no idea projectors were that big. ...I’m starting to feel a bit bad about tearing it all down.');
    }else if(phase()>=2){
      say('Mashiba','Am I cleared, then? ...In that case, let’s figure out how to get out of here.');
    }else{
      const l=['The shutter crank? I looked for it too. It’s nowhere.','We’re underground, so no signal. ...And that pink payphone is completely dead.'];
      say('Mashiba',l[S.ev.length%l.length]);
    }
  }},
}});
