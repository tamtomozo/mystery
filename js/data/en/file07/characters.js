/* Data: FILE.07 people at the scene (NPCs) (English) */
'use strict';

/* The kidnapped boy is Minato Asakura (10). Today, March 12, is his birthday.
   Kaji never says that Minato came to him and asked for help — not until the very end.
   Mr. Asakura never says that he realized the ransom amount was Minato’s birthday — not until the very end. */
const f7Proven=()=>{const h=HYPS.find(x=>x.id==='h4'); return !!h&&hypStatus(h)==='proven';};

defCase('file07',{NPCS:{
  /* Takizawa: in the plaza, looking up at the wheel */
  takizawa:{map:'wheel',x:11,y:8,dir:'up',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Mori: forensics. Beside gondola 7. The stop, the 16:12 photo, the tracker */
  mori:{map:'wheel',x:11,y:5,dir:'left',name:'Mori (Forensics)',look:LOOK.mori,
    alert:()=>findable('stop3min')||findable('photo')||findable('tracker'),talk(){
    if(findable('stop3min')){
      say('Mori','When the wheel stopped? I made a note of it.');
      say('Mori','16:14. Two minutes after Mr. Asakura got off. It stayed stopped for three minutes and started up again at 16:17.');
      say('Mori','The red lamp on the control booth said HIGH WIND STOP. When it stopped, gondola 7 was low down, to the right of the platform.');
      give('stop3min');
    }else if(findable('photo')){
      say('Mori','Mr. Asakura getting off? Got it. Telephoto, 16:12. ...Here.');
      sys('In the photo, Mr. Asakura has his coat hanging open and his empty hands at his sides. Through the window, the handle of the blue bag pokes out from under the seat.');
      say('Mori','The bag’s definitely under the seat. ...And look here. The lid of the storage box under the seat is sitting a little high.','think');
      give('photo');
    }else if(findable('tracker')){
      say('Mori','Rookie, look at this. It turned up under the floor mat in gondola 7.','surprise');
      sys('On Mori’s gloved palm, a small black tracker — the one clipped inside the bag’s inner pocket.');
      say('Mori','The signal never left the Ferris wheel, so we all assumed the bag was still inside gondola 7...');
      say('Mori','That bag was opened up in the air. And nobody should’ve been in gondola 7 after Mr. Asakura got off.');
      give('tracker');
    }else if(f7Proven()){
      say('Mori','I took casts of the prints on the roof. Twenty-one centimeters. ...A child’s shoes.','sad');
    }else if(phase()>=3){
      say('Mori','The blankets in the box under the seat were all scrunched up. ...Like someone had been wrapped up in them.','think');
    }else if(phase()>=1){
      say('Mori','That latch only opens from the outside. From inside, there’s no way. ...Normally, anyway.');
    }else if(!S.flags.moriMet){
      S.flags.moriMet=1;
      say('Mori','Mori, Forensics. Haven’t done a plainclothes stakeout in ages.');
      say('Mori','From four o’clock on, we were all watching gondola 7. Takizawa, you, me. ...And it still vanished.','uneasy');
    }else{
      const l=['The only window that opens is the little one at the top. An adult couldn’t even get an arm in up to the elbow.','One turn of the wheel takes twelve minutes. Add the three-minute stop, and gondola 7 got back down at 16:27.'];
      say('Mori',l[S.ev.length%l.length]);
    }
  }},

  /* Kaji: the Ferris wheel operator. In front of the booth. Toru's old job. Hands over the machine room key once the truth is proven */
  kaji:{map:'wheel',x:7,y:6,dir:'right',name:'Kaji (Wheel Operator)',look:LOOK.kaji,
    alert:()=>findable('toruJob')||(f7Proven()&&!S.flags.kajiKey),talk(){
    if(f7Proven()){
      if(S.flags.rescued){say('Kaji','.........','sad'); return;}
      if(S.flags.kajiKey){say('Kaji','...The machine room. Go to him. Hurry.'); return;}
      say('Kaji','.........');
      say('Kaji','...Yeah. That’s right.');
      sys('Kaji takes a ring of keys from his jacket pocket and holds it out without a word.');
      say('Kaji','The machine room. Mind the gears, and wake him gently. ...He’s probably asleep.','sad');
      S.flags.kajiKey=1;
      sys('Received the machine room key.');
    }else if(findable('toruJob')){
      say('Kaji','Toru? Sure, I know Toru. When he was a student he worked here part-time, on the wheel.');
      say('Kaji','I taught him the lot. How to stop it, how to get up on the machine house roof. ...He was scared of that ladder, mind.');
      say('Kaji','He’s always been hopeless with money. ...But he’s not the kind to snatch a kid. Not him.','angry');
      give('toruJob');
    }else if(phase()>=3){
      const l=['...Almost five. Closing time.','Minato came every Sunday. Always gondola 7. ...“At the very top, I feel like I can see Mama,” he’d say.'];
      say('Kaji',l[S.ev.length%l.length]);
    }else if(phase()>=2){
      say('Kaji','Mr. Asakura? ...Used to come all the time, him and his wife and the boy. After she passed, not once.');
    }else if(phase()>=1){
      say('Kaji','Not the wind? ...You can’t trust an anemometer. Sea wind blows clean through before it gets measured.','uneasy');
    }else if(!S.flags.kajiMet){
      S.flags.kajiMet=1;
      say('Kaji','Kaji. I run the wheel. Forty years, me and this old thing.');
      say('Kaji','It stopped because of the wind. A Ferris wheel by the sea — happens all the time. The lamp said HIGH WIND STOP, didn’t it?');
      say('Kaji','...Minato rides every Sunday. Find him quick, would you.','sad');
    }else{
      say('Kaji','The control booth’s my post. You want something, ask from out here.');
    }
  }},

  /* Toru: Minato's uncle. The demand letter, the company rumors */
  toru:{map:'wheel',x:16,y:10,dir:'left',name:'Toru (Uncle)',look:LOOK.toru,
    alert:()=>findable('debt')||findable('company'),talk(){
    if(findable('debt')){
      say('Toru','Money? ...W-why ask me about money?','uneasy');
      sys('As Toru tugs his jacket straight, an envelope slides out of the pocket. A demand letter from a consumer loan company.');
      say('Toru','...You saw that. Yeah, fine. Two million nine hundred eighty thousand. Due this Wednesday.');
      say('Toru','When I went off at half past one, I was calling the loan people, begging them to wait. ...Pathetic, huh.','sad');
      give('debt');
    }else if(findable('company')){
      say('Toru','My brother’s company? ...Asakura Transport’s been in trouble since last year. He’s been going round the banks, bowing and scraping.');
      say('Toru','I heard the 3,120,000 for the ransom came out of the company safe. ...When I went to borrow money, he wouldn’t give me a single yen.','angry');
      say('Toru','But for Minato, he’ll pay. ...He just never says it out loud.');
      give('company');
    }else if(f7Proven()){
      say('Toru','Old man Kaji...? No way. He treats Minato like his own grandkid...','surprise');
    }else if(phase()>=3){
      say('Toru','It wasn’t games or toys Minato wanted. ...He just wanted to ride the Ferris wheel with his dad.');
    }else if(phase()>=2){
      say('Toru','So I’m in the clear? ...Then hurry up and find Minato. The sun’s going down.','uneasy');
    }else if(!S.flags.toruMet){
      S.flags.toruMet=1;
      say('Toru','I’m Toru Asakura, Minato’s uncle. My big brother’s his father.');
      say('Toru','It’s Minato’s birthday today. My brother said he had work, so Haru and I brought him. ...And then this.','sad');
    }else{
      const l=['I took my eyes off him for one second, right in front of the merry-go-round...','He loves the Ferris wheel. His mom loved it.'];
      say('Toru',l[S.ev.length%l.length]);
    }
  }},

  /* ---------- Office building ---------- */

  /* Kyosuke Asakura: Minato's father. Waiting in the meeting room. Gives no evidence */
  asakura:{map:'parkOffice',x:14,y:3,dir:'right',name:'Asakura (Father)',look:LOOK.asakura,alert:()=>false,talk(){
    if(f7Proven()){
      say('Asakura','Mr. Kaji...?','surprise');
      say('Asakura','...Detective. Is Minato safe?');
    }else if(phase()>=3){
      say('Asakura','“At five o’clock, I’ll tell you where he is.” ...That’s what the kidnapper said.');
      say('Asakura','...Five o’clock.','think');
    }else if(phase()>=2){
      say('Asakura','I hear you suspect me. ...That’s fine. If it brings Minato back, suspect me of anything you like.');
      say('Asakura','I rode alone because the kidnapper told me to. ...That’s all.');
    }else if(!S.flags.asakuraMet){
      S.flags.asakuraMet=1;
      say('Asakura','Kyosuke Asakura. ...Minato’s father.');
      say('Asakura','I did exactly as I was told. I rode gondola 7, put the bag under the seat, and got off. ...So why?','uneasy');
      say('Asakura','I’ll pay whatever it takes. Just bring Minato...');
    }else if(phase()>=1){
      say('Asakura','Toru? ...He’s hopeless with money, but he’s always adored Minato.');
    }else{
      const l=['3,120,000... Why would a kidnapper ask for such an odd amount?','...I’m sorry. Could you leave me alone for a moment?'];
      say('Asakura',l[S.ev.length%l.length]);
    }
  }},

  /* Haru: the housekeeper. Toru going off, Friday night */
  haru:{map:'parkOffice',x:2,y:8,dir:'right',name:'Haru (Housekeeper)',look:LOOK.haru,
    alert:()=>findable('toruLeft')||findable('quarrel'),talk(){
    if(findable('toruLeft')){
      say('Haru','Mr. Toru? ...It was around half past one. He said, “I’m just going to make a call,” and went off by himself.');
      say('Haru','The young master disappeared about ten minutes later. While I was buying him a soft serve...','sad');
      say('Haru','Mr. Toru didn’t come back until after the lost-child announcement.');
      give('toruLeft');
    }else if(findable('quarrel')){
      say('Haru','Mr. Asakura and the young master? ...The truth is, they quarreled on Friday night.','uneasy');
      say('Haru','Mr. Asakura couldn’t come to the school play. The young master had practiced his lines dozens of times, all by himself.');
      say('Haru','“I hate you, Papa. Even on my birthday, being with you is boring.” ...Mr. Asakura went into his study without a word.');
      say('Haru','On Saturday, the young master went to Shiomi Land on his own. He talked with Mr. Kaji from the Ferris wheel for a long, long time.');
      give('quarrel');
    }else if(f7Proven()){
      say('Haru','Mr. Kaji...? But Mr. Kaji was always so kind to the young master...','sad');
    }else if(phase()>=3){
      say('Haru','The young master always has strawberry drops in his pocket. The ones from the kiosk here. His mother loved them.');
    }else if(!S.flags.haruMet){
      S.flags.haruMet=1;
      say('Haru','I’m Haru Kosaka. I keep house for the Asakura family.');
      say('Haru','It’s been three years since Mrs. Asakura passed, and I’ve looked after the young master ever since. I bring him here every Sunday. He loves the Ferris wheel.');
      say('Haru','If only I hadn’t taken my eyes off him...','sad');
    }else{
      const l=['At 13:40, in front of the merry-go-round, I lost sight of him... They made the lost-child announcement for us, too.','The young master turns ten today. ...I even baked him a cake.'];
      say('Haru',...(S.ev.length%2?[l[1],'sad']:[l[0]]));
    }
  }},

  /* Noguchi: in the office corridor. Call records, Toru's alibi, riding alone */
  noguchi:{map:'parkOffice',x:11,y:7,dir:'down',name:'Noguchi (Officer)',look:LOOK.noguchi,
    alert:()=>findable('callLog')||findable('toruAlibi')||findable('aloneInsist'),talk(){
    if(findable('callLog')){
      say('Noguchi','The phone company got back to us, sir!');
      say('Noguchi','Both of the kidnapper’s calls, 14:02 and 15:32. Both came from inside Shiomi Land!');
      say('Noguchi','From the public phone right beside the Ferris wheel platform!','surprise');
      give('callLog');
    }else if(findable('toruAlibi')){
      say('Noguchi','Mr. Toru, sir? From four o’clock to half past, I was questioning him myself, in the meeting room.');
      say('Noguchi','At 16:14, when the wheel stopped, he was right in front of me, telling me about his debts — er, his life story, sir.');
      give('toruAlibi');
    }else if(findable('aloneInsist')){
      say('Noguchi','When Mr. Asakura boarded gondola 7, sir?');
      say('Noguchi','Detective Takizawa told him a detective would ride along. And Mr. Asakura flatly refused.');
      say('Noguchi','“The kidnapper said to ride alone. What if something happens to Minato?” ...I never thought he could raise his voice like that.','surprise');
      give('aloneInsist');
    }else if(f7Proven()){
      say('Noguchi','The machine room, sir! I’ll head over right away!');
    }else if(!S.flags.noguchiMet){
      S.flags.noguchiMet=1;
      say('Noguchi','Officer Noguchi, reporting! On guard and on communications here in the office!');
      say('Noguchi','I’ve been told not to go outside in uniform, in case the kidnapper spots me...','uneasy');
    }else{
      say('Noguchi','Not long now until five o’clock, sir...!','uneasy');
    }
  }},
}});
