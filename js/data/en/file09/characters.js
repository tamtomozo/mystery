/* Data: FILE.09 people at the scene (NPCs) (English) */
'use strict';

/* Sakuragaoka 3-chome. The Kasugas: father Kohei (42), mother Satomi (40), daughter Hinata (10). Mugi was the dog of Kohei’s mother, Kiyo, who died last spring.
   Next door lives Tetsuji Gondo (76), a retired sailor. He and Kiyo were neighbors across the hedge for forty years.
   Hinata calls Gondo “Grandpa Gondo” and Kiyo “Grandma.” Gondo calls Hinata “missy,” Kiyo “Kiyo,” and Kohei “the Kasuga boy.”
   Satomi calls Kiyo “my mother-in-law” and Kohei “my husband.” Mrs. Matsui calls Hinata “Hina.”
   Gondo never volunteers that Hinata undid the latch. Hinata never says she knows who “Grandma” really is — not until the very end. */
const f9Proven=()=>{const h=HYPS.find(x=>x.id==='h4'); return !!h&&hypStatus(h)==='proven';};

defCase('file09',{NPCS:{
  /* Takizawa: on the street, in front of Gondo's gate */
  takizawa:{map:'sakura',x:12,y:8,dir:'down',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Noguchi: on the street, by the notice board. The thefts, the station sighting, the gang's arrest */
  noguchi:{map:'sakura',x:7,y:9,dir:'right',name:'Noguchi (Officer)',look:LOOK.noguchi,
    alert:()=>findable('theft')||findable('sighting')||(findable('arrest')&&has('sighting')),talk(){
    if(findable('theft')){
      say('Noguchi','I’ve brought the files from community safety, sir!');
      say('Noguchi','Three pet thefts around Sakuragaoka in the past month. They think it’s a gang.');
      say('Noguchi','And at every one, sir, somebody saw a white van!','uneasy');
      give('theft');
    }else if(findable('sighting')){
      say('Noguchi','I’ve been asking around at the station, sir!');
      say('Noguchi','The kiosk clerk says that at 5:50 on Saturday morning, a Shiba in a red collar tore across the station plaza at full speed.');
      say('Noguchi','And right after that, a white van pulled out of the plaza, sir!','surprise');
      give('sighting');
      say('Noguchi','I’ve pinned all the sightings on the map on that neighborhood notice board, sir — in time order!');
      guide('Follow Mugi’s Trail on the Map',[
        ['Notice board','Examine the notice board on the street'],
        ['Choose','Tap the sighting card that doesn’t connect (or ← → to choose, then Enter)'],
      ],'Each line on the map shows the distance and the time it took. Check whether Mugi could have walked it.');
    }else if(findable('arrest')&&has('sighting')){
      say('Noguchi','Radio from community safety, sir!');
      say('Noguchi','All three of the pet-theft gang were arrested in the next city — Friday night, at eleven!');
      say('Noguchi','At dawn on Saturday, all three of them were in the cells. Their white van’s been impounded too.');
      say('Noguchi','The van at the station was... a bakery delivery van, sir.','uneasy');
      give('arrest');
    }else if(f9Proven()){
      say('Noguchi','Mr. Gondo... When I was a boy, the night our dog died, I cried till morning, sir.','sad');
      say('Noguchi','Mr. Gondo went off across the river on his bicycle a little while ago.');
    }else if(phase()>=3){
      say('Noguchi','The animal hospital across the river takes emergencies at night and early morning, sir. From the top of the hill, five minutes by bike.');
    }else if(phase()>=2){
      say('Noguchi','I heard the kids have built a “secret base” under the floor of the shrine, sir.');
    }else if(phase()>=1){
      say('Noguchi','Mr. Kohei drove off somewhere at dawn on Saturday, sir. ...His wife doesn’t know where to.','think');
    }else if(!S.flags.noguchiMet){
      S.flags.noguchiMet=1;
      say('Noguchi','Officer Noguchi, sir! Today I’m on door-to-door questions and liaison with community safety!');
      say('Noguchi','Go right along the street and you reach Miharashi Hill, sir. They say you can see the sea from the top!');
    }else{
      const l=['I put up one of the lost-dog posters on the notice board myself, sir!','This town is all hills, sir. Hard on the bicycle brakes, I should think.'];
      say('Noguchi',l[S.ev.length%l.length]);
    }
  }},

  /* Mori: forensics. In the Kasugas' yard, by the back gate. The dashcam, the latch */
  mori:{map:'sakura',x:8,y:5,dir:'up',name:'Mori (Forensics)',look:LOOK.mori,
    alert:()=>(findable('dashcam')&&has('dawnCar'))||findable('latch'),talk(){
    if(findable('dashcam')&&has('dawnCar')){
      say('Mori','I took a look at the dashcam in Mr. Kohei’s car. With his permission.');
      say('Mori','He left home at 5:12 on Saturday morning and drove straight to the cemetery in the hills. The car sat in the lot until 6:25.');
      say('Mori','There’s no dog in the footage from inside the car. ...The cemetery caretaker saw him sitting alone in front of a grave.','think');
      give('dashcam');
    }else if(findable('latch')){
      say('Mori','I checked the back gate’s latch.');
      say('Mori','It’s on the yard side only. There’s no gap to reach in from outside, and no sign it was forced.');
      say('Mori','Only someone inside the yard could open it. ...Someone in this house.','uneasy');
      say('Mori','It’s an old latch, but it’s well oiled. Slides right open. Like someone opens and closes it every day.');
      give('latch');
    }else if(f9Proven()){
      say('Mori','Rubber-boot prints, twenty-six centimeters long. ...Quite a big “grandma,” wasn’t she.','sad');
    }else if(phase()>=3){
      say('Mori','Have you seen the bench at the top of the hill? Last night’s rain left the ground muddy there. ...Something might still be there.','think');
    }else if(phase()>=1&&!has('dawnCar')){
      say('Mori','If someone went out at dawn, their car’s dashcam might have caught something.');
    }else if(!S.flags.moriMet){
      S.flags.moriMet=1;
      say('Mori','Mori, forensics. First time I’ve been called out to look for a dog.');
      say('Mori','But a trail is a trail, people or dogs. ...I’ll do it properly.');
    }else{
      const l=['The cushion in the doghouse was her mother-in-law’s, apparently. It’s gone completely brown with Mugi’s hair.','Last night’s rain washed out any footprints in the alley past the gate.'];
      say('Mori',l[S.ev.length%l.length]);
    }
  }},

  /* Hinata: the client. In front of the doghouse. Her diary */
  hinata:{map:'sakura',x:7,y:2,dir:'up',name:'Hinata',look:LOOK.hinata,
    alert:()=>findable('diary')||!S.flags.hinataMet,talk(){
    if(findable('diary')){
      say('Hinata','...Detective. Can you keep a secret?','uneasy');
      sys('Hinata quietly opens a diary with a rabbit on the cover.');
      say('Hinata','Grandma came every morning to take Mugi for her walk.');
      say('Hinata','So before bed, I undid the latch on the back gate. So Grandma could get in.');
      say('Hinata','Don’t tell Mom or Dad. ...I felt like if I told, Grandma wouldn’t come anymore.','sad');
      give('diary');
    }else if(f9Proven()){
      say('Hinata','Mugi’s in the hospital...? Grandpa Gondo took her?','surprise');
    }else if(phase()>=3){
      say('Hinata','Grandma walked Mugi to the bench on top of the hill every morning. Where you can see the sea.');
      say('Hinata','Mugi can’t see, but she loves the smell of the sea.');
    }else if(phase()>=2){
      say('Hinata','I won’t give Mugi up. ...But I didn’t hide her. I didn’t! Really!','angry');
    }else if(phase()>=1){
      say('Hinata','Dad doesn’t like Mugi. He never takes her for walks — not once since Grandma died.','sad');
    }else if(!S.flags.hinataMet){
      S.flags.hinataMet=1;
      say('Hinata','Oh... are you the detective? Did you read my letter?','surprise');
      say('Hinata','I’m Hinata Kasuga. ...Grandma took Mugi.');
      say(ME,'...Your grandma?');
      say('Hinata','Grandma died last year. But she still comes every morning and takes Mugi for a walk. In her red padded vest.');
      say('Hinata','So she must have taken Mugi. ...Because tomorrow, Mugi’s going to be given away, far away.','sad');
    }else{
      const l=['Mugi can’t see, but she can tell by smell. Grandma’s smell.','Mugi’s bell goes ting-a-ling. Grandma bought it at a festival, a long time ago.'];
      say('Hinata',l[S.ev.length%l.length]);
    }
  }},

  /* Satomi: the mother. On the veranda. What Kohei said */
  satomi:{map:'sakura',x:2,y:3,dir:'down',name:'Satomi (Mother)',look:LOOK.satomi,
    alert:()=>findable('dadWords'),talk(){
    if(findable('dadWords')){
      say('Satomi','My husband? ...It was his decision to give Mugi to a foster family.');
      say('Satomi','He said, “It’s better if Hinata doesn’t have to see the goodbye.” ...That we should have them take Mugi while Hinata was still asleep.');
      say('Satomi','Whenever it comes to Mugi, he just won’t talk to me.','uneasy');
      give('dadWords');
    }else if(f9Proven()){
      say('Satomi','My mother-in-law’s vest... Mr. Gondo had it?','surprise');
      say('Satomi','...Do you think she asked him to?','sad');
    }else if(phase()>=3){
      say('Satomi','When we shared out my mother-in-law’s things, the one thing we couldn’t find was her red padded vest.');
      say('Satomi','She was so small, the sleeves came down over her hands. ...Hinata used to laugh and say it was cute.','sad');
    }else if(phase()>=2){
      say('Satomi','That morning, when I went to wake Hinata at six, she was sound asleep in her own bed.');
      say('Satomi','...Unless she was only pretending.','uneasy');
    }else if(!S.flags.satomiMet){
      S.flags.satomiMet=1;
      say('Satomi','I’m Mrs. Kasuga. ...Hinata went all the way to the police. I’m so sorry.');
      say('Satomi','At 6:20 I went out to give Mugi her breakfast, and the doghouse was empty. The back gate was half open.');
      say('Satomi','Around dawn, still in bed, I thought I heard Mugi’s bell. ...Just like any other morning.','think');
    }else{
      const l=['It’s been a year since my mother-in-law passed. Mugi was always her dog.','We’re moving next week — my husband’s been transferred. Dogs aren’t allowed in the company housing.'];
      say('Satomi',l[S.ev.length%l.length]);
    }
  }},

  /* Kohei: the father. In the yard. "I won't give her up" */
  kohei:{map:'sakura',x:5,y:5,dir:'left',name:'Kohei (Father)',look:LOOK.kohei,
    alert:()=>findable('hinataWord'),talk(){
    if(findable('hinataWord')){
      say('Kohei','Hinata...?');
      say('Kohei','Last week, when I told her about the foster family, she cried. “I won’t give Mugi up. I’ll hide her somewhere.”');
      say('Kohei','She wouldn’t come out of her room after that. ...Surely she didn’t really—','uneasy');
      give('hinataWord');
    }else if(f9Proven()){
      say('Kohei','Mr. Gondo... every morning, in my mother’s place?','surprise');
      say('Kohei','...I said something terrible to him. “I can’t give my mother’s dog to a man who does nothing but complain.”','sad');
    }else if(has('dashcam')&&phase()>=2){
      say('Kohei','...I went to the grave. It was the day before I gave Mugi away. I went to apologize to my mother.','sad');
      say('Kohei','I never once walked my mother’s route. Every time I saw Mugi, it reminded me she was gone.');
    }else if(phase()>=1){
      say('Kohei','At dawn? ...Where I went is none of your business. What has it got to do with Mugi?','angry');
    }else if(!S.flags.koheiMet){
      S.flags.koheiMet=1;
      say('Kohei','Kasuga. ...I’m sorry my daughter has troubled you.');
      say('Kohei','I’ll be honest. Mugi was going to a foster family tomorrow. Dogs aren’t allowed in the company housing we’re moving into.');
      say('Kohei','It was my decision. ...Hinata hates me for it.','sad');
    }else{
      say('Kohei','My mother walked Mugi every morning. To the bench at the top of the hill. ...I can’t go up that hill.');
    }
  }},

  /* Onodera: the rescue group Tail House. At the Kasugas' front gate. The adoption */
  onodera:{map:'sakura',x:2,y:8,dir:'up',name:'Onodera (Tail House)',look:LOOK.onodera,
    alert:()=>findable('satooya'),talk(){
    if(findable('satooya')){
      say('Onodera','The foster family? Yes.');
      say('Onodera','A foster family from the next prefecture was going to drive over and collect Mugi tomorrow morning at ten.');
      say('Onodera','The Kasugas move into company housing next week, and dogs aren’t allowed. ...Foster homes for fourteen-year-old Shibas are very hard to find.','think');
      give('satooya');
    }else if(f9Proven()){
      say('Onodera','I see... I’ll explain things to the foster family myself.');
      say('Onodera','...For a dog, the best thing of all is to walk the roads it knows.','happy');
    }else if(phase()>=2){
      say('Onodera','If Mugi isn’t found, I’ll have to tell the foster family it’s off. ...I do hope she’s found, though.');
    }else if(!S.flags.onoderaMet){
      S.flags.onoderaMet=1;
      say('Onodera','I’m Onodera, from the rescue group Tail House. The Kasugas asked me to find a foster home for Mugi.');
      say('Onodera','When I heard she was missing, I came straight over. ...Old dogs weaken so fast in places they don’t know.','uneasy');
    }else{
      say('Onodera','Blind dogs remember the way by smell and sound. On a road they’ve walked every day, they never get lost.');
    }
  }},

  /* Gondo: next door. On his veranda. The car at dawn. Once the truth is proven, he moves to the animal hospital across the river */
  gondo:{get map(){return f9Proven()?'saka':'sakura';},get x(){return f9Proven()?11:15;},get y(){return f9Proven()?13:3;},
    dir:'down',name:'Gondo',look:LOOK.gondo,
    alert:()=>findable('dawnCar')||f9Proven(),talk(){
    if(f9Proven()){f9Arrest(); return;}
    if(findable('dawnCar')){
      say('Gondo','What, another detective? ...The car next door?','angry');
      say('Gondo','Aye. Saturday morning, a bit after five, the car next door went out. The engine woke me.');
      say('Gondo','Came back just before seven. Him alone. ...What of it?');
      give('dawnCar');
    }else if(phase()>=3){
      say('Gondo','...What are you staring at? You’ve no business with my washing line or my veranda.','angry');
    }else if(phase()>=2){
      say('Gondo','The little miss hid the dog? ...Don’t talk nonsense.','angry');
      say('Gondo','That child couldn’t do a thing like that. ...Not that it’s any business of mine.');
    }else if(!S.flags.gondoMet){
      S.flags.gondoMet=1;
      say('Gondo','What, a detective? All this fuss over the dog next door running off.');
      say('Gondo','That dog howls at night. Can’t stand it. I complained to the neighborhood association.','angry');
      say('Gondo','...Nice and quiet now. Good riddance.');
    }else{
      const l=['I’m seeing to my bonsai. Don’t get in my way.','You can see the sea from the top of the hill. ...Forty years I was out on that sea.'];
      say('Gondo',l[S.ev.length%l.length]);
    }
  }},

  /* Omori: at the front of the liquor store. Kotetsu's owner. Gives no evidence */
  omori:{map:'sakura',x:3,y:10,dir:'down',name:'Omori (Liquor Store)',look:LOOK.omori,alert:()=>false,talk(){
    if(f9Proven()){
      say('Omori','Old Gondo, was it? ...So he went all the way up that hill every morning.');
    }else if(phase()>=2){
      say('Omori','Oh, right — Saturday morning, on my way back from the market, a bicycle passed me on Miharashi Bridge. Just after six.');
      say('Omori','Something brown in the front basket. Came flying down from the hill. Someone in a red top... an old woman, maybe?','think');
    }else if(has('otherDog')){
      say('Omori','Kotetsu turned up at the station police box. Red collar — they say he got mistaken for Mugi.');
      say('Omori','He’s young, you know. Fast as anything. ...Mugi could never run like that.');
    }else if(!S.flags.omoriMet){
      S.flags.omoriMet=1;
      say('Omori','Omori, the liquor store. That’s Kotetsu there — my two-year-old Shiba.');
      say('Omori','Saturday morning I left for the market a bit after half five. Got back and this one had run off. ...What a morning.');
    }else{
      say('Omori','The market’s across the river. Every morning I come back over Miharashi Bridge.');
    }
  }},

  /* Kotetsu: the liquor store's Shiba. Doesn't talk */
  kotetsu:{map:'sakura',x:6,y:11,dir:'left',name:'Kotetsu',look:LOOK.kotetsu,alert:()=>false,talk(){
    sys('Kotetsu from the liquor store. A two-year-old Shiba. A red collar, no bell. His tail is going like mad.');
    if(has('otherDog')) sys('...He looks a lot like Mugi. Except this one can run flat out.');
  }},

  /* Matsui: at the front of the tofu shop. Gives no evidence (her sightings go on the notice-board map) */
  matsui:{map:'sakura',x:15,y:10,dir:'down',name:'Matsui (Tofu Shop)',look:LOOK.matsui,alert:()=>false,talk(){
    if(f9Proven()){
      say('Matsui','It was Mr. Gondo... Now you mention it, he’s got a bent back, but he’s ever so tall.','surprise');
    }else if(phase()>=3){
      say('Matsui','Up to last year, Kiyo bought one piece of fried tofu here every morning and gave half to Mugi.');
      say('Matsui','This year’s “Kiyo”... come to think of it, walks straight past. Just tips the hat a little.','think');
    }else if(phase()>=1){
      say('Matsui','Saturday morning? Mugi went past the shop a bit after half five. Slow as always, toward the hill.');
      say('Matsui','With someone in a red padded vest beside her. ...Kiyo, of course. Same as every morning.');
    }else if(!S.flags.matsuiMet){
      S.flags.matsuiMet=1;
      say('Matsui','Matsui, from the tofu shop. I open at five every morning, so I see everything that goes on in this street.');
      say('Matsui','Mugi? She goes by every morning with Kiyo.');
      say('Matsui','...Kiyo died last year? I know that, dear, I went to the funeral. But she still comes by. In her red padded vest.','uneasy');
    }else{
      say('Matsui','The news last night said they caught some pet thieves in the next city. Dreadful, isn’t it.');
    }
  }},

  /* ---------- Miharashi Hill ---------- */

  /* Segawa: student paperboy. On the slope below the shrine. Gives no evidence (his sightings go on the notice-board map) */
  segawa:{map:'saka',x:7,y:8,dir:'down',name:'Segawa (Paperboy)',look:LOOK.segawa,alert:()=>false,talk(){
    if(f9Proven()){
      say('Segawa','That “old lady” was Mr. Gondo? ...Every morning they bowed at the foot of the shrine steps.');
    }else if(phase()>=3){
      say('Segawa','The one in the red vest? I see them every morning at the bench on top of the hill. Reaching over to stroke the dog’s head.');
      say('Segawa','...The vest’s sleeves were a bit short, though. Wrists poking right out.','think');
    }else if(phase()>=1){
      say('Segawa','Saturday morning, at 5:43, I saw someone in red and a Shiba right here. My round runs like clockwork.');
      say('Segawa','Then at 5:59, at the top of the hill. That person was crouched down by the bench.');
    }else if(!S.flags.segawaMet){
      S.flags.segawaMet=1;
      say('Segawa','Segawa — I deliver the morning paper while I’m at university. Today I’m doing the collection round.');
      say('Segawa','A Shiba? I see her on this slope every morning. Goes up nice and slow. Dragging her left back leg.');
    }else{
      say('Segawa','It’s all hills round here. Hard going, even on a scooter.');
    }
  }},

  /* Ashida: the vet at Ashida Animal Hospital. In front of the hospital. The register */
  ashida:{map:'saka',x:13,y:12,dir:'left',name:'Ashida (Vet)',look:LOOK.ashida,
    alert:()=>findable('clinic'),talk(){
    if(findable('clinic')){
      say('Ashida','A Shiba? ...Yes, one came in on Saturday morning.');
      sys('Ashida opens the night and early-morning register.');
      say('Ashida','6:07. Female Shiba, about fourteen. A heart attack. Brought in a bicycle basket.');
      say('Ashida','The man with her said “Gondo.” When I asked the dog’s name, he just went quiet. ...I assumed he was the owner.','uneasy');
      say('Ashida','She’s still in, at the back.');
      give('clinic');
    }else if(f9Proven()){
      say('Ashida','Mugi opened her eyes just now.');
      say('Ashida','Mr. Gondo sat in the waiting room all morning. He went home once at noon and came straight back. ...To that bench.','sad');
    }else if(!S.flags.ashidaMet){
      S.flags.ashidaMet=1;
      say('Ashida','I’m Ashida, from Ashida Animal Hospital. We see emergencies at night and early morning too, so I’m short on sleep today.');
      say('Ashida','A lost dog? ...Nobody’s reported a lost dog to us.');
    }else{
      say('Ashida','Old dogs’ hearts get weak. ...A walk every day is the best medicine there is.');
    }
  }},
}});
