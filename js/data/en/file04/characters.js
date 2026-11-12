/* Data: FILE.04 people at the scene (NPCs) (English) */
'use strict';

/* Everyone calls Juho something different (evidence “What They Call Juho”). Keep it consistent in dialogue:
     Takanashi “Sensei” / Miyauchi “Juho-sensei” / Chizuru “Father” / Kenta “Grandpa Sensei” / Kuroda “Mr. Kiryu” */
defCase('file04',{NPCS:{
  takizawa:{map:'dojo',x:8,y:12,dir:'right',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Chizuru Kiryu: Juho's daughter, who called the police. Letter #3, last night's visitor, what people call Juho */
  chizuru:{map:'dojo',x:16,y:2,dir:'down',name:'Chizuru (Daughter)',look:LOOK.chizuru,
    alert:()=>!has('letter3')||findable('kurodaseen')||(findable('callname')&&has('infrared')),talk(){
    if(!has('letter3')){
      say('Chizuru','I’m Chizuru Kiryu. Juho’s daughter. I run the school’s office.');
      say('Chizuru','This morning I opened the mailbox, and this was inside...');
      sys('Chizuru empties the envelope. A brush snapped in two, and a single sheet of paper.');
      say('Chizuru','That’s the brush Father has used for fifty years. It was missing from the brush rack in the alcove.');
      say('Chizuru','Father told me to ignore the first two, so I kept quiet... but this is too much.','uneasy');
      give('letter3');
      say('Chizuru','I’ve laid the first two out on that desk over there.');
    }else if(findable('kurodaseen')){
      say('Chizuru','Last night? ...Now that you mention it, Mr. Kuroda came to the front around 20:30. The realtor across the lane.','think');
      say('Chizuru','Asking us to sell the townhouse again. Father refused to see him, so I sent him away at the entrance.');
      give('kurodaseen');
    }else if(findable('callname')&&has('infrared')){
      say(ME,'Ms. Chizuru. What does everyone call your father?');
      say('Chizuru','Father? Well... Ms. Miyauchi says “Juho-sensei.” The children call him “Grandpa Sensei.”');
      say('Chizuru','I call him “Father,” of course, and Mr. Kuroda says “Mr. Kiryu.”');
      say('Chizuru','The only one who calls him plain “Sensei” is... Mr. Takanashi. For thirty-six years.');
      give('callname');
    }else if(phase()>=3){
      say('Chizuru','...Ever since Father’s hand started to shake, Mr. Takanashi has been the one holding him up.','sad');
    }else if(phase()>=1){
      say('Chizuru','The exhibition is on Sunday. Father says it’s going ahead no matter what.');
    }else{
      const l=['Father says he “has a fair idea who wrote them.” ...I wonder if he really does.','The successor announcement? ...I can’t say anything about that before the exhibition.'];
      say('Chizuru',l[S.ev.length%l.length]);
    }
  }},

  /* Juho Kiryu: the master. The letters were addressed to him. Stroke order of 必 */
  juho:{map:'dojo',x:8,y:2,dir:'down',name:'Juho (Master)',look:LOOK.juho,alert:()=>findable('order'),talk(){
    if(findable('order')){
      say('Juho','...Show me the first letter.');
      sys('With a trembling hand, Juho picks up a loupe and peers at the character 必.');
      say('Juho','必 is a character with several schools of stroke order. Where the strokes cross, the ink tells you which way the brush went.');
      say('Juho','...This order is the one I taught until thirty years ago. When I started the children’s class, I changed to the textbook order.','think');
      say('Juho','The only one who still writes 必 this way is—');
      say('Juho','.........','sad');
      sys('Juho put the loupe down and said nothing more.');
      say(ME,'On the wall beside the alcove hangs the register of pupils, names listed by the year they joined.');
      sys('At the top: “Makoto Takanashi — joined 36 years ago.” Second: “joined 18 years ago.”');
      give('order');
    }else if(phase()>=3){
      say('Juho','...The exhibition goes ahead as planned.');
    }else if(!S.flags.juhoMet){
      S.flags.juhoMet=1;
      say('Juho','...The police. Sorry to trouble you.');
      sys('On his knee, Juho’s right hand is trembling slightly.');
      say('Juho','Writing is the person. However hard the writer hides, the hand stays in the writing.');
      say('Juho','Who wrote them is for you to find out. I have an exhibition to prepare.');
    }else{
      const l=['One broken brush is not going to stop my exhibition.','Writing is the person. ...Perhaps one day you’ll show me yours.','Fifty years I’ve held a brush here. ...Just a little longer.'];
      say('Juho',l[phase()%l.length]);
    }
  }},

  /* Makoto Takanashi: senior instructor. The culprit. Gives no evidence, but nudges suspicion toward Miyauchi */
  takanashi:{map:'dojo',x:13,y:3,dir:'down',name:'Takanashi (Senior)',look:LOOK.takanashi,alert:()=>false,talk(){
    if(phase()>=3){
      say('Takanashi','The master’s room? ...Go ahead. It’s a mess with the exhibition preparations.');
      say('Takanashi','I need to check the mounting on Sensei’s pieces. I’ll be right here.');
    }else if(phase()>=2){
      say('Takanashi','So Letter #3 does look like Ms. Miyauchi’s writing, I hear.');
      say('Takanashi','...No, I’m not saying anything. I can’t believe she would do that to Sensei.');
    }else if(phase()>=1){
      say('Takanashi','Not an outsider, you say. ...I see.');
      say('Takanashi','Um... this may just be my imagination. But doesn’t Letter #3 look rather like Ms. Miyauchi’s writing?');
      say('Takanashi','...No, forget it. I spoke out of turn.','uneasy');
    }else{
      say('Takanashi','I’m Takanashi, the senior instructor. I’ve been with Sensei for thirty-six years.');
      say('Takanashi','Sensei says there’s “nothing to worry about,” but... with the exhibition this Sunday, of all times.','sad');
      say('Takanashi','If there’s anything I can do, please just say.');
    }
  }},

  /* Akari Miyauchi: assistant instructor. Teaches the children's class. Reads the expert's line */
  miyauchi:{map:'dojo',x:16,y:7,dir:'left',name:'Miyauchi (Assistant)',look:LOOK.miyauchi,alert:()=>!has('line')&&has('letter1'),talk(){
    if(!has('line')&&!has('letter1')){
      say('Miyauchi','I’m Miyauchi, the assistant instructor. I teach the children’s class.');
      say('Miyauchi','Have you seen the letters yet? Ms. Chizuru laid them out on the desk.');
    }else if(!has('line')){
      say('Miyauchi','The handwriting on the letters? ...Let me see.');
      sys('Miyauchi lays the first and second letters side by side and studies them.');
      say('Miyauchi','...They’re made to look like a child’s writing. But they aren’t.','think');
      say('Miyauchi','The shapes have been broken on purpose. But not the way the brush enters the paper, or the way the sweeps lift off.');
      say('Miyauchi','A child can’t put a brush to paper like this. This is the line of someone who has held a brush for twenty years.');
      give('line');
    }else if(phase()>=3){
      say('Miyauchi','Letter #3 was traced from my writing...?');
      say('Miyauchi','...Who would do such a thing?','sad');
    }else if(has('paris')){
      say('Miyauchi','About Paris... no one at the school knows except Juho-sensei.');
      say('Miyauchi','I meant to tell everyone after the exhibition.');
    }else if(phase()>=2){
      say('Miyauchi','It looks like my writing...? That can’t be.','surprise');
      say('Miyauchi','...I’d be grateful if you didn’t look at my desk too closely.');
    }else{
      const l=['Juho-sensei always says he can tell who wrote something just by looking.','The children are all good kids. None of them could write like this.'];
      say('Miyauchi',l[phase()%l.length]);
    }
  }},

  /* Mori, Forensics: handwriting of Letter #3, overlay, infrared */
  mori:{map:'dojo',x:16,y:12,dir:'right',name:'Mori (Forensics)',look:LOOK.mori,
    alert:()=>findable('likeness')||(findable('overlay')&&has('kaiho'))||findable('infrared'),talk(){
    if(findable('likeness')){
      say('Mori','I compared the handwriting on Letter #3 with Ms. Miyauchi’s fair copies.');
      say('Mori','The stops, the hooks, even the slant... it’s exactly like hers. A completely different person from the childish first two.');
      give('likeness');
    }else if(findable('overlay')&&has('kaiho')){
      say('Mori','The newsletter, great. Let me overlay Ms. Miyauchi’s works on Letter #3.');
      sys('— Mori lays a clear sheet traced from Letter #3 over the newsletter page, one character at a time.');
      say('Mori','...Huh. 社, 中, 展... every single one matches to the hair.','surprise');
      say('Mori','That’s wrong. When someone writes, even the same character wobbles a little every time. A match this perfect — it was copied.');
      give('overlay');
    }else if(findable('overlay')){
      say('Mori','“Too exactly,” you think? ...To check, I’d want more samples of Ms. Miyauchi’s writing.');
      say('Mori','Is there some booklet her works were printed in?');
    }else if(findable('infrared')){
      say('Mori','I photographed the blot on Letter #2 under infrared.');
      say('Mori','The ink painted on top is a different kind from the ink underneath. So under infrared, the word below shows through.');
      sys('— In the photo, the blotted-out word floats up in white: “Sensei’s.”');
      say('Mori','They started writing it, then hurried to paint it out. The name they always use just slipped out.');
      give('infrared');
    }else if(phase()>=3){
      say('Mori','So handwriting really is like a fingerprint. ...Maybe I should take a look at my own.','happy');
    }else if(phase()>=1){
      say('Mori','The back-door handle is covered in the pupils’ prints. They use that door every day.');
    }else{
      say('Mori','Mori, Forensics. I’m going over the paper and ink of the letters.');
      say('Mori','Handwriting isn’t my specialty... but I can at least compare samples.');
    }
  }},

  /* ---------- Front lane ---------- */

  /* Kuroda: realtor. Purchase offer */
  kuroda:{map:'alley',x:6,y:11,dir:'up',name:'Kuroda (Realtor)',look:LOOK.kuroda,alert:()=>findable('kuroda'),talk(){
    if(findable('kuroda')){
      say('Kuroda','Kuroda, of Kuroda Realty. ...Ah, this is about Mr. Kiryu’s place.');
      say('Kuroda','Yes, I’ve asked whether they’d sell me the townhouse. For six months now. Here’s a copy of the offer.');
      give('kuroda');
      say('Kuroda','Threatening letters? Don’t be ridiculous. I ask properly, to their face.','angry');
      say('Kuroda','I’ve heard that calligraphy school has some kind of show coming up. What goes on inside, I couldn’t tell you.');
    }else{
      const l=['Mr. Kiryu isn’t getting any younger. He can’t keep a school in that old townhouse forever.','Last night? I stopped by at 20:30, the daughter sent me off, and I went back to my office.','Me, I’m hopeless with a brush. I couldn’t tell good writing from bad.'];
      say('Kuroda',l[phase()%l.length]);
    }
  }},

  /* Kenta: pupil in the children's class. Saw someone at 21:00 */
  kenta:{map:'alley',x:14,y:8,dir:'left',name:'Kenta (Pupil)',look:LOOK.kenta,alert:()=>findable('kenta'),talk(){
    if(findable('kenta')){
      say('Kenta','Are you a police officer? ...No — a detective? Cool.','surprise');
      say('Kenta','I go to the kids’ class at Bokkokai. Grandpa Sensei’s scary, but his writing is super good.');
      say('Kenta','Last night? I came by here around 9, on my way home from cram school.');
      say('Kenta','And a grown-up came out of the narrow path next to Bokkokai, put something in the mailbox, and went back down the path.');
      say('Kenta','It was too dark to see a face. ...That path only goes to the school’s back door, right?','think');
      give('kenta');
    }else{
      const l=['Last week Grandpa Sensei told me my “stops are sloppy.” Stops are hard.','Ms. Miyauchi is nice. She always praises my writing.','My writing’s bad, but I don’t write letters. Too much work.'];
      say('Kenta',l[phase()%l.length]);
    }
  }},

  /* Officer Noguchi: guarding the mailbox (talk only) */
  noguchi:{map:'alley',x:11,y:4,dir:'down',name:'Noguchi (Officer)',look:LOOK.noguchi,alert:()=>false,talk(){
    const l=[
      ['I am guarding the mailbox, sir! No fourth letter gets past me!'],
      ['I went to a calligraphy class myself in elementary school, sir!','I wrote “Perseverance” and won a bronze prize!'],
      ['Apparently only one streetlight works in this lane at night, sir.'],
    ];
    l[phase()%l.length].forEach(t=>say('Noguchi',t));
  }},
}});
