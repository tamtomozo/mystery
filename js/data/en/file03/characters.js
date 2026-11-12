/* Data: FILE.03 people at the scene (NPCs) (English) */
'use strict';

defCase('file03',{NPCS:{
  takizawa:{map:'office',x:6,y:5,dir:'right',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Inspector Okochi: the victim. Photo of the pudding */
  okochi:{map:'office',x:11,y:2,dir:'down',name:'Okochi (Inspector)',look:LOOK.okochi,alert:()=>!has('photo'),talk(){
    if(!has('photo')){
      say('Okochi','When did I last see the pudding? ...At noon. 12:05.');
      say('Okochi','I went to make sure it was still there before my meeting. ...I even took a photo.');
      say('Okochi','.........I was looking forward to it. Got a problem with that?','sad');
      give('photo');
    }else if(phase()>=3&&!S.flags.okochiDrawer){
      S.flags.okochiDrawer=1;
      say('Okochi','...You want to look in my desk drawer? The bottom one?');
      say('Okochi','...Fine. It’s an investigation.');
    }else if(phase()>=3){
      say('Okochi','.........','uneasy');
      say('Okochi','...Still don’t touch the bottom of the box.');
    }else if(!S.flags.okochiBox){
      S.flags.okochiBox=1;
      say('Okochi','I left the box in the fridge as it was. Preserving the scene.');
      say('Okochi','But don’t touch the bottom of the box. ...That has nothing to do with the case.');
    }else{
      const l=['Pilfering food in a room full of detectives... That takes nerve.','Only 20 a day, you hear me? I lined up from 7 a.m.','Find the culprit. ...We’ll talk after that.'];
      say('Okochi',l[phase()%l.length],'angry');
    }
  }},

  /* Mori, Forensics: sighting at 13:30, all-nighter, lab equipment log */
  mori:{map:'office',x:15,y:3,dir:'right',name:'Mori (Forensics)',look:LOOK.mori,alert:()=>findable('mori')||findable('allnight')||findable('lablog'),talk(){
    if(!avail('mori')){
      say('Mori','Mori, Forensics. Mr. Okochi called me in — “This is a job for Forensics,” he said...');
      say('Mori','Fingerprints on the fridge? The kitchenette fridge is covered in prints from the whole division.');
    }else if(!has('mori')){
      say('Mori','...Um, actually, I came to the kitchenette at lunch.','uneasy');
      say('Mori','13:30. I came to get my lunch, and the lid of that box was open a little. I could see the pudding.');
      say('Mori','It had that browned top... I remember thinking it looked delicious. Then I took my lunch back to Forensics.');
      give('mori');
      say('Mori','...Wait, you suspect me? Okay, I did pull an all-nighter, and I hadn’t eaten since morning, so I was starving, but...','surprise');
      sys('Mori shows you the Forensics duty roster.');
      give('allnight');
    }else if(findable('lablog')){
      say('Mori','I pulled the log for the analysis equipment in Forensics. Every time it was operated under my ID is on record.');
      say('Mori','From 13:35 to 15:10, I was operating it every few minutes. It was the composition analysis on the FILE.02 brooch — I couldn’t take my eyes off it.');
      say('Mori','The senior tech next to me says I was in my seat the whole time, too. ...I even ate my lunch in front of the machine.');
      give('lablog');
    }else if(phase()>=3&&!has('report')){
      say('Mori','I can tell you what’s in a caramel in no time. Stains, whatever — just bring it to me.');
    }else if(phase()>=3){
      say('Mori','That stain on the report is Miyako caramel, no doubt. They’re the only shop where it smells of liqueur.');
    }else{
      say('Mori','Fingerprints on the pudding... no, wait, puddings don’t hold fingerprints.','think');
    }
  }},

  /* Officer Noguchi: prior offense. Dispatch record */
  noguchi:{map:'office',x:4,y:10,dir:'up',name:'Noguchi (Officer)',look:LOOK.noguchi,alert:()=>findable('dispatch'),talk(){
    if(!avail('dispatch')){
      say('Noguchi','Officer Noguchi, reporting! I’m here today helping out with paperwork!');
      say('Noguchi','P-pudding!? I-it wasn’t me! I deeply regret the jelly incident last month!','surprise');
    }else if(!has('dispatch')){
      say('Noguchi','The early afternoon? At 13:20 I got orders to back up the station-front police box, and I headed straight out!');
      say('Noguchi','I got back at 14:55! It’s all on record at dispatch!');
      say('Noguchi','And what I was eating in the kitchenette was a convenience store pudding I bought myself! It was mine!','uneasy');
      give('dispatch');
    }else{
      const l=['I’m so glad my name’s been cleared!','Miyako’s baked pudding... I’d love to try it just once.','From now on, I’ll write my name on my pudding too!'];
      say('Noguchi',l[phase()%l.length],'happy');
    }
  }},

  /* Komatsu, Admin: in charge of the fridge. Sighting, entry log, call to reception */
  komatsu:{map:'office',x:16,y:11,dir:'left',name:'Komatsu (Admin)',look:LOOK.komatsu,
    alert:()=>!has('seen')||findable('gate')||findable('komatsu2')||findable('guestcard'),talk(){
    if(!has('seen')){
      say('Komatsu','I’m Komatsu, from Admin. Looking after the fridge is my job, you know.');
      say('Komatsu','Early afternoon? Let me think... Just after 13:00, I saw Noguchi come out of the kitchenette with a spoon in his mouth.');
      say('Komatsu','He looked awfully pleased with himself.','happy');
      give('seen');
    }else if(findable('gate')||findable('komatsu2')){
      if(!has('gate')){
        say('Komatsu','I’ve printed out the door’s card reader log for you. From half past one to 14:20.');
        sys('13:31 Mori in / 13:34 Mori out / 13:42 Visitor Card 07 in / 14:12 Visitor Card 07 out');
        say('Komatsu','So the only ones who came in at that time were Mori... and whoever had the visitor card.');
        give('gate');
      }
      if(!has('komatsu2')){
        say('Komatsu','...Oh, that reminds me. Around 14:20, I opened the fridge to put away some rice crackers someone brought in.','surprise');
        say('Komatsu','By then, the pudding box was already empty.');
        say('Komatsu','I thought Mr. Okochi had eaten it, so I didn’t say anything. I’m sorry, dear.','sad');
        give('komatsu2');
      }
    }else if(findable('guestcard')){
      say('Komatsu','Visitor Card 07? That’s one of the cards they lend out at reception on the first floor. I’ll have them check the lending log.');
      sys('— Komatsu calls reception on the internal line.');
      say('Komatsu','...Yes, yes. Thank you.');
      say('Komatsu','Lent out at 13:40, returned at 14:15. And the one who borrowed it was — “Major Crimes, Takizawa.” Forgot his card, apparently.');
      give('guestcard');
    }else if(phase()>=3){
      say('Komatsu','Mr. Takizawa’s always forgetting his card. He leaves it in the pocket of a coat he’s sent to the cleaners, that sort of thing.');
    }else{
      say('Komatsu','The fridge clean-out is every Friday at 17:00. I haven’t done it yet today.');
    }
  }},
}});
