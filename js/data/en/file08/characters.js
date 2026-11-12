/* Data: FILE.08 people at the scene (NPCs) (English) */
'use strict';

/* Narumi Pen, seventy years old. Its founder is the chairman, Shuzo Narumi (90). Kihei Tatsumi (88), master of the nib workshop, has ground nibs there since day one.
   Tatsumi calls the president “little miss” and the chairman “Shuzo.” The president calls Tatsumi “Uncle Tatsumi” (“Mr. Tatsumi” in front of others).
   Kuramochi and Mizuhara call Tatsumi “the master.” The chairman is hard of hearing, and his answers drift a little.
   Tatsumi never says the chairman opened the cap — not until the very end. The chairman writes why only on his note. */
const f8Proven=()=>{const h=HYPS.find(x=>x.id==='h4'); return !!h&&hypStatus(h)==='proven';};

defCase('file08',{NPCS:{
  /* Takizawa: in the corridor, by the boardroom door */
  takizawa:{map:'honkan',x:9,y:8,dir:'left',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Mori: forensics. Sweeping the boardroom for bugs */
  mori:{map:'honkan',x:4,y:2,dir:'down',name:'Mori (Forensics)',look:LOOK.mori,
    alert:()=>findable('sweep'),talk(){
    if(findable('sweep')){
      say('Mori','The bug sweep? Done.');
      say('Mori','Lights, sockets, phone line, under the table, even inside the fireplace — all of it, with the detector. I did the president’s office and the secretary’s office too.');
      say('Mori','Nothing that gives off a signal. ...Clean as a whistle.','think');
      give('sweep');
    }else if(f8Proven()){
      say('Mori','A speaking tube, huh. It doesn’t give off a signal, so no detector would ever catch it. ...You got me.','sad');
    }else if(has('pipeRoom')){
      say('Mori','I checked the cap above the fireplace. There’s a white cotton thread caught on the wing screw.');
      say('Mori','From a glove, maybe. ...Touch brass rust with bare hands and your fingers go green — verdigris.','think');
    }else if(phase()>=3){
      say('Mori','There’s one thing in this room that bugs me. The frame above the fireplace. ...It sits just a little off the wall.','think');
    }else if(phase()>=1){
      say('Mori','If it isn’t a signal... then it’s a person, I guess. Someone who knows what goes on in these meetings.','uneasy');
    }else if(!S.flags.moriMet){
      S.flags.moriMet=1;
      say('Mori','Mori, forensics. Hunting for bugs — feels like a TV drama, doesn’t it?');
      say('Mori','It’s an old Western-style house. Plenty of places to hide things in the walls and ceiling. ...I’ll check them all.');
    }else{
      const l=['They say the building’s from the early Showa years. High ceilings — voices really carry in this room.','The fireplace hasn’t been used in decades. The chimney’s blocked off at the top.'];
      say('Mori',l[S.ev.length%l.length]);
    }
  }},

  /* Noguchi: in the stair hall. The original letters, the guard's log */
  noguchi:{map:'honkan',x:8,y:11,dir:'right',name:'Noguchi (Officer)',look:LOOK.noguchi,
    alert:()=>findable('article')||findable('guardLog'),talk(){
    if(findable('article')){
      say('Noguchi','I have borrowed the original letters from the Stationery Herald, sir!');
      sys('Noguchi holds out three sheets of notepaper in plastic sleeves. Ruled white paper; fountain pen in blue-black.');
      say('Noguchi','No sender’s name on any of them. They were dropped straight into the mailbox at the newspaper’s front door, during the night.');
      say('Noguchi','Every one ran the morning after a Thursday board meeting. ...Word for word, they say.','uneasy');
      give('article');
    }else if(findable('guardLog')){
      say('Noguchi','I have checked the guard room’s entry log, sir!');
      say('Noguchi','To enter the main building from the back, you must pass the guard’s window. The front entrance is in front of reception.');
      say('Noguchi','According to the guard, Mr. Tatsumi of the nib workshop has not once entered the main building in ten years.');
      say('Noguchi','“The master won’t cross the threshold. Something to do with the old boss, they say.” ...So he says, sir.');
      give('guardLog');
    }else if(f8Proven()){
      say('Noguchi','The workshop master... I got a Narumi fountain pen when I started high school, sir.','sad');
    }else if(phase()>=2){
      say('Noguchi','The Stationery Herald’s letter box closes at seven every night, sir. ...If tonight’s letter goes in...','uneasy');
    }else if(!S.flags.noguchiMet){
      S.flags.noguchiMet=1;
      say('Noguchi','Officer Noguchi, sir! Liaison with the newspaper and the guard room!');
      say('Noguchi','Down the stairs are the courtyard and the nib workshop out back, sir. It’s slippery in the rain!');
    }else{
      say('Noguchi','The letters are in blue-black ink, sir. ...Apparently everyone at the Narumi works has some.');
    }
  }},

  /* Shiho: the president. In her office. The minutes, the stalled talks */
  shiho:{map:'honkan',x:16,y:4,dir:'left',name:'Shiho (President)',look:LOOK.shiho,
    alert:()=>findable('minutes')||findable('stall'),talk(){
    if(findable('minutes')){
      say('Shiho','The minutes. ...I’ll take them out of the safe. We don’t make copies, so please read them here.');
      sys('The president opens the safe and hands over a black binder. “Board Meeting Minutes — recorded by Mizuhara.”');
      say('Shiho','Ms. Mizuhara takes them down at the table and writes them up clean the same day.');
      say('Shiho','Only she and I have the key.','uneasy');
      give('minutes');
    }else if(findable('stall')){
      say('Shiho','The talks with Daito? ...Every time a letter came out in the paper, Daito’s head office halted the talks. All three times.');
      say('Shiho','“We can’t join hands with a company that can’t keep a secret.” ...And every time, Ms. Chihaya talked her head office round again.');
      say('Shiho','If the deal falls through now, the one who’d be happiest is... No. I shouldn’t say.','uneasy');
      give('stall');
    }else if(f8Proven()){
      say('Shiho','Uncle Tatsumi...','surprise');
      say('Shiho','...So he still writes me as “little Miss Shiho.”','sad');
    }else if(phase()>=3){
      say('Shiho','The nib workshop? ...As a child, I practically grew up in there.');
      say('Shiho','My father was always busy. Uncle Tatsumi used to help me with my homework, right beside the grinding wheel.','sad');
    }else if(phase()>=1){
      say('Shiho','What to do about the workshop... I can’t tell you that yet. I gave Daito my final answer today.');
    }else if(!S.flags.shihoMet){
      S.flags.shihoMet=1;
      say('Shiho','I’m Shiho Narumi, the president. ...I’m the one who called the police. Daito made it a condition of the deal.');
      say('Shiho','The boardroom is locked. Everyone leaves their phones at the door. And still...','uneasy');
      say('Shiho','If today’s meeting leaks, Narumi Pen — seventy years of it — won’t be able to stand on its own.');
    }else{
      const l=['My father rented this house when he was twenty. It’s where the company began.','Every nib from our workshop is ground by hand, one at a time. ...You can feel the difference when you write.'];
      say('Shiho',l[S.ev.length%l.length]);
    }
  }},

  /* Shuzo: the chairman. In the reception room. Hard of hearing. Gives no evidence */
  shuzo:{map:'honkan',x:17,y:11,dir:'left',name:'Shuzo (Chairman)',look:LOOK.shuzo,alert:()=>false,talk(){
    if(f8Proven()){
      say('Shuzo','...Hm? Ah, the detective.');
      say('Shuzo','I see. ...So Tatsumi was listening.','sad');
    }else if(phase()>=3){
      say('Shuzo','Hm? ...Gloves? Ah, I left them there. Old men get cold fingers.');
      say('Shuzo','...Detective. Tatsumi, at the workshop. Is he keeping well?','think');
    }else if(phase()>=2){
      say('Shuzo','Kusumi? ...Ah, he came to us from the bank. Good with numbers.');
      say('Shuzo','...Not that the feel of a nib is something you can put in numbers.');
    }else if(!S.flags.shuzoMet){
      S.flags.shuzoMet=1;
      say('Shuzo','Hm? ...Sorry, my ears aren’t what they were. A little louder, please.');
      say('Shuzo','The meeting? I just sit there. I don’t decide anything anymore. The company is Shiho’s.');
      say('Shuzo','...My car’s late today. The rain.');
    }else{
      const l=['Hm? ...Ah, the rain. The workshop’s at its quietest on rainy days.','I rented this house when I was twenty, you know. ...The two of us did.'];
      say('Shuzo',l[S.ev.length%l.length]);
    }
  }},

  /* Chihaya: Daito Stationery's negotiator. In the reception room. Kusumi's opposition */
  chihaya:{map:'honkan',x:14,y:11,dir:'right',name:'Chihaya (Daito)',look:LOOK.chihaya,
    alert:()=>findable('oppose'),talk(){
    if(findable('oppose')){
      say('Chihaya','Mr. Kusumi? ...I’ll be honest. He has opposed our partnership from the very start.');
      say('Chihaya','His name isn’t on the board list for after the merger. He came from the bank, and we already have someone in that role.');
      say('Chihaya','...He knows that, too.','uneasy');
      give('oppose');
    }else if(f8Proven()){
      say('Chihaya','The workshop master... I see.');
      say('Chihaya','...To be honest, without those letters, keeping the workshop would never have got past our head office.','think');
    }else if(phase()>=3){
      say('Chihaya','Letters have been arriving at our head office. From people who use Narumi fountain pens — people who read those letters in the paper.');
      say('Chihaya','More than two thousand of them now. ...“If Narumi’s hand-ground nibs are gone, I’ll never buy another fountain pen.”');
    }else if(!S.flags.chihayaMet){
      S.flags.chihayaMet=1;
      say('Chihaya','I’m Chihaya, from Daito Stationery. I’m in charge of this partnership.');
      say('Chihaya','I’ll be blunt. If today’s meeting is in tomorrow morning’s paper, the deal is off. Our head office won’t wait any longer.','angry');
      say('Chihaya','...I want this deal to happen. We could never make Narumi’s nibs ourselves.');
    }else{
      say('Chihaya','At today’s meeting, I gave them our final terms. ...I can’t tell you what they were yet.');
    }
  }},

  /* Kusumi: managing director. By the corridor window. Gives no evidence */
  kusumi:{map:'honkan',x:17,y:8,dir:'left',name:'Kusumi (Managing Dir.)',look:LOOK.kusumi,alert:()=>false,talk(){
    if(f8Proven()){
      say('Kusumi','The workshop master...? A speaking tube? ...Ridiculous. So every word we said went straight down that pipe?','surprise');
    }else if(phase()>=2){
      say('Kusumi','You suspect me? ...I’ve never hidden that I oppose the deal. I’ve said so plainly at the table.','angry');
      say('Kusumi','But I don’t go running to the papers. If you’re against something, you say so in the meeting.');
    }else if(phase()>=1){
      say('Kusumi','Only the president and Ms. Mizuhara have the minutes, don’t they?');
      say('Kusumi','...I’ve seen Ms. Mizuhara meeting someone from Sankyo Pen in a café. Don’t say you heard it from me.','think');
    }else if(!S.flags.kusumiMet){
      S.flags.kusumiMet=1;
      say('Kusumi','Kusumi, managing director. ...So they’ve even called the police.');
      say('Kusumi','That café across the street — you can see right into the boardroom from its window. If I were an industrial spy, that’s where I’d sit.');
    }else{
      say('Kusumi','The workshop is a cost center. I understand the sentiment, but numbers don’t lie.');
    }
  }},

  /* Mizuhara: secretary. In the secretary's office. The curtains, the chairman's seat */
  mizuhara:{map:'honkan',x:4,y:12,dir:'left',name:'Mizuhara (Secretary)',look:LOOK.mizuhara,
    alert:()=>findable('curtain')||findable('seat'),talk(){
    if(findable('curtain')){
      say('Mizuhara','The boardroom window? ...At board meetings, Daito shows slides, so the blackout curtains stay closed the whole time.');
      say('Mizuhara','All three times. I’m the one who closes and opens them. Nobody outside could see into the room.');
      give('curtain');
    }else if(findable('seat')){
      say('Mizuhara','The chairman’s seat? ...Now that you mention it.','think');
      say('Mizuhara','The chairman always sat at the window end of the table. Then a month ago, all of a sudden, he moved to the fireplace end.');
      say('Mizuhara','He said, “I can hear better here.” ...Though the fireplace end is farther from whoever’s speaking.');
      give('seat');
    }else if(f8Proven()){
      say('Mizuhara','The chairman... After every meeting, he always stayed behind in the room, last of all.','sad');
      say('Mizuhara','I thought he was just tired...');
    }else if(has('card')&&!S.flags.cardTalk){
      S.flags.cardTalk=1;
      say('Mizuhara','...So you found the card. Yes, Sankyo Pen has approached me.','uneasy');
      say('Mizuhara','But I’m going to turn them down. ...I didn’t write any letters.');
      say('Mizuhara','At the second meeting, I was called away on the extension at 14:40, for about ten minutes. ...When I came back, everyone had gone very quiet.');
    }else if(phase()>=1){
      say('Mizuhara','I write the minutes. I take them down at the table, write them up clean the same day, and hand them to the president.');
    }else if(!S.flags.mizuharaMet){
      S.flags.mizuharaMet=1;
      say('Mizuhara','I’m Mizuhara, the secretary. I take the minutes at board meetings.');
      say('Mizuhara','I keep the key to the phone box, too. ...During a meeting, there’s nothing in that room but paper and fountain pens.');
    }else{
      say('Mizuhara','During meetings, the chairman just sits with his eyes closed. ...You’d almost think he was asleep.');
    }
  }},

  /* ---------- Courtyard & nib workshop ---------- */

  /* Kuramochi: young nib grinder. Hand-grinding day */
  kuramochi:{map:'togiba',x:6,y:6,dir:'left',name:'Kuramochi (Grinder)',look:LOOK.kuramochi,
    alert:()=>findable('wheelStop'),talk(){
    if(findable('wheelStop')){
      say('Kuramochi','The grinding wheels? ...A month ago, the master started saying “Thursday afternoons, we grind by hand.”');
      say('Kuramochi','Two to three on Thursdays, the wheels go off and we grind on whetstones, by hand. Like training, he says.');
      say('Kuramochi','With the wheels off, the workshop goes dead quiet... And the whole time, the master shuts himself away behind the tool shelf.','think');
      give('wheelStop');
    }else if(f8Proven()){
      say('Kuramochi','The master... I cut those letters out of the paper. I’ve still got them.','sad');
      say('Kuramochi','“The nib workshop is still here.” ...I cried when I read that.');
    }else if(phase()>=3){
      say('Kuramochi','The master? He still calls the president “little miss.” ...Never to her face, though.');
    }else if(phase()>=1){
      say('Kuramochi','We found out from the paper that the workshop’s closing. Not a word from the company.','angry');
      say('Kuramochi','...But the master read those letters and just went on grinding nibs, without a word.');
    }else if(!S.flags.kuramochiMet){
      S.flags.kuramochiMet=1;
      say('Kuramochi','Kuramochi, from the workshop. I’ve been grinding nibs under the master for six years.');
      say('Kuramochi','You grind every nib to suit how the person writes. A machine can’t give you that feel.');
    }else{
      const l=['The master never goes into the main building. When he needs something there, I take the message.','The workshop radio’s always on the baseball. Except Thursday afternoons — then it’s off.'];
      say('Kuramochi',l[S.ev.length%l.length]);
    }
  }},

  /* Tatsumi: master of the nib workshop. Gives no evidence. Once the truth is proven, to the interrogation */
  tatsumi:{map:'togiba',x:3,y:5,dir:'down',name:'Tatsumi (Master)',look:LOOK.tatsumi,
    alert:()=>f8Proven(),talk(){
    if(f8Proven()){f8Arrest(); return;}
    if(phase()>=3){
      say('Tatsumi','...What does a detective want in my workshop?');
      say('Tatsumi','Behind the tool shelf? ...Just old things back there. Leave them be.','angry');
    }else if(phase()>=2){
      say('Tatsumi','The president? ...She means to sell off the workshop. Never tells us a thing.','angry');
    }else if(!S.flags.tatsumiMet){
      S.flags.tatsumiMet=1;
      say('Tatsumi','Tatsumi. I run the workshop. ...What does a detective want here?');
      say('Tatsumi','The meetings in the main building? Nothing to do with us craftsmen. I grind nibs, that’s all.');
    }else{
      const l=['You can tell a good grind by the sound a nib makes on paper. ...My ears are still sharp.','Rainy days, the workshop’s nice and quiet.'];
      say('Tatsumi',l[S.ev.length%l.length]);
    }
  }},
}});
