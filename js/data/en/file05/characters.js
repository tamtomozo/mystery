/* Data: FILE.05 people at the scene (NPCs) (English) */
'use strict';

/* Naming: everyone calls Genda “Gen-san.” Only her classmate Daichi calls Haruka Shirakawa “Haruka.”
   Genda has noticed that Shirakawa was the one digging, but never says a word (the seventh mystery). */
defCase('file05',{NPCS:{
  takizawa:{map:'schoolyard',x:12,y:7,dir:'right',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Yota: sixth grader. The notebook, last night's sighting, the streamer's upload history */
  yota:{map:'schoolyard',x:7,y:10,dir:'down',name:'Yota (6th Grader)',look:LOOK.yota,
    alert:()=>!has('notebook')||findable('yota')||findable('posts'),talk(){
    if(!has('notebook')){
      say('Yota','A detective? A real one? Awesome!','surprise');
      say('Yota','I’m Yota. Sixth grade. I’ve been investigating this school’s Seven Mysteries.');
      say('Yota','Look, here! My investigation notebook. In the last two weeks, number one through number six ALL happened!');
      sys('Yota proudly flips open his notebook.');
      give('notebook');
      say('Yota','Nobody knows the seventh one. They say whoever finds out disappears from the school.');
    }else if(findable('yota')){
      say('Yota','Last night? I saw it! My house is right across the fence from the schoolyard.');
      say('Yota','Around 9:10. I was looking out my window at the corner of the schoolyard, and by the stump, there was a blue light floating around.');
      say('Yota','A will-o’-the-wisp, for sure! ...I got scared and shut the curtains right away, though.','uneasy');
      give('yota');
    }else if(findable('posts')){
      say('Yota','Yomisaka? I know him! I’ve watched ALL his videos.');
      say('Yota','But his first video about our school only came out five days ago. Before that, it was an abandoned hospital and a tunnel in the next prefecture.');
      say('Yota','I bet he heard the rumors and came. I wrote “Come to Tsukikagedai Elementary!” in his comments.','happy');
      give('posts');
    }else if(phase()>=3){
      const l=['Ms. Shirakawa seems kinda down today. ...Is it because of number seven?','What do you think number seven is? Do detectives know stuff like that?'];
      say('Yota',l[S.ev.length%l.length]);
    }else{
      const l=['I counted the thirteen steps, for real. At night, with a flashlight. ...When I counted in the daytime, there were twelve.','The anatomy model faces the window every morning. It walks around at night, I bet.','There are only six of us in my class. They say we’re the last graduates ever.'];
      say('Yota',l[phase()%l.length]);
    }
  }},

  /* Genda: caretaker. Last night's streamer, his rounds. He protects Shirakawa and says little */
  genda:{map:'schoolyard',x:5,y:9,dir:'down',name:'Gen-san (Caretaker)',look:LOOK.genda,alert:()=>findable('caught'),talk(){
    if(findable('caught')){
      say('Gen-san','Last night? Around half past ten, I heard voices in the schoolyard, so I went out. Young fellow with a camera.');
      say('Gen-san','I asked him what he thought he was doing in someone else’s school in the middle of the night, and saw him out the gate.','angry');
      say('Gen-san','My rounds were the same as always. Went into the north building just before nine, made my circuit, got home at 9:40.');
      give('caught');
    }else if(!S.flags.gendaMet){
      S.flags.gendaMet=1;
      say('Gen-san','Genda, the caretaker. Everyone calls me “Gen-san.” Forty-two years I’ve been at this school.');
      say('Gen-san','...So the capsule’s gone, eh.');
      say('Gen-san','I live in the caretaker’s house there. The window looks right out on the schoolyard. Any noise in the night, and I’m up.');
    }else if(phase()>=3){
      const l=['...I didn’t see anything. Nothing at all.','They’re giving me “words of thanks” at the ceremony. ...Not really my style.'];
      say('Gen-san',l[S.ev.length%l.length]);
    }else if(phase()>=2){
      say('Gen-san','Selling off the school... sure, it’s lonely. This place is like my home.');
      say('Gen-san','...But you can’t stop it with ghosts.','sad');
    }else if(phase()>=1){
      say('Gen-san','The anatomy model? Oh, I turn that toward the window every morning.');
      say('Gen-san','Stuck standing in a dark corner all day — poor thing. ...Didn’t know it had become one of the Seven Mysteries.','happy');
    }else{
      say('Gen-san','The Seven Mysteries, eh. ...Kids in every generation love that sort of thing.');
    }
  }},

  /* Daichi: builder. A graduate from twenty-five years ago. The burial day, that winter */
  daichi:{map:'schoolyard',x:16,y:4,dir:'left',name:'Daichi (Builder)',look:LOOK.daichi,
    alert:()=>findable('buried')||findable('bandage'),talk(){
    if(findable('buried')){
      say('Daichi','The day we buried the capsule? Graduation day. There were only five of us in sixth grade.');
      say('Daichi','Gen-san, the caretaker, dug the hole. All we did was put our letters in the can and solder the lid shut.');
      say('Daichi','Where exactly? ...All I remember is “under the cherry tree.” They cut the tree down ten years ago. It was sick.');
      give('buried');
    }else if(findable('bandage')){
      say('Daichi','The winter twenty-five years ago? ...Oh, the fire in the old building. Yeah, that happened.');
      say('Daichi','The day after, Haruka — Ms. Shirakawa, I mean — came in with her right hand bandaged. Said she burned it on a stove.');
      say('Daichi','After that, she never talked about the Seven Mysteries again. And she used to love them.');
      say('Daichi','The day we wrote our capsule letters, Haruka was the only one crying. The whole time. ...I’ve always wondered why.','think');
      give('bandage');
    }else if(phase()>=3){
      say('Daichi','Haruka really loved the Seven Mysteries back then. Knew more about them than anyone in our class.','happy');
    }else if(!S.flags.daichiMet){
      S.flags.daichiMet=1;
      say('Daichi','I’m Daichi, from the building firm. Graduated from this school twenty-five years ago.');
      say('Daichi','The principal asked me to handle digging up the capsule for the closing ceremony. I came by this morning to check the spot, and... this hole.','uneasy');
    }else{
      const l=['After the ceremony, tearing this building down might end up being our job, too. ...Mixed feelings.','A letter from twenty-five years ago... I wonder what I wrote.'];
      say('Daichi',l[phase()%l.length]);
    }
  }},

  /* Mori (forensics): the stream frame, the trial holes, the speaker's recording */
  mori:{map:'schoolyard',x:14,y:4,dir:'right',name:'Mori (Forensics)',look:LOOK.mori,
    alert:()=>(findable('frame')&&has('stream'))||findable('digs')||(findable('melody')&&has('speaker')),talk(){
    if(findable('frame')&&has('stream')){
      say('Mori','The stream archive? ...Let me borrow it. I’ll find the shot with the hole.');
      sys('— Mori steps through the footage, frame by frame.');
      say('Mori','Here. 22:04. His light sweeps across the stump... see? There’s already a hole on the north side.','surprise');
      say('Mori','He’s yelling “Whoa, a hole! It’s number seven!” — but the hole is already empty. By the time he got here, it had already been dug.');
      give('frame');
    }else if(findable('digs')){
      say('Mori','I’m done with the ground around the stump. ...Take a look at this.');
      sys('— Little flags stand here and there in the soil where Mori has marked them. Eleven in all.');
      say('Mori','Wherever the soil is a different color — eleven refilled holes. All shallow, each one shifted a little from the last.');
      say('Mori','Someone who knew the spot would hit it first time. This person only had a rough idea, and searched for night after night.');
      say('Mori','And see how only this patch is red? That’s red clay, brought in when they planted the cherry tree. Everywhere else in the schoolyard is sand.');
      give('digs');
    }else if(findable('melody')&&has('speaker')){
      say('Mori','I listened to the recording on the speaker from the piano.');
      say('Mori','It’s not a store-bought CD. Behind the piano there’s a crowd of children singing... and people coughing in an audience.');
      sys('— From the speaker, the last line of “Furusato.” Then a voice over a microphone.');
      sys('“...This concludes the 77th Graduation Ceremony.”');
      say('Mori','I checked with the principal. It’s this school’s graduation, twenty-five years ago. The CD of the recording went only to that year’s five graduates, as a keepsake.');
      give('melody');
    }else if(phase()>=3){
      say('Mori','Funny how the Seven Mysteries feel kind of sad once you know what they really are.','sad');
    }else if(phase()>=2){
      say('Mori','I counted the west stairs myself. Twelve steps. Count the landing too, and you get thirteen.');
      say('Mori','...Mystery number five, solved.','happy');
    }else if(phase()>=1){
      say('Mori','Judging by the rust print at the bottom, the can was about 30 cm across. Heavy, for a kid.');
    }else{
      say('Mori','Mori, forensics. I’m going over the area around the hole.');
      say('Mori','A can from twenty-five years ago... I wonder what letters were inside.');
    }
  }},

  /* Yomisaka: ghost-hunting streamer. Last night's livestream */
  yomisaka:{map:'schoolyard',x:11,y:13,dir:'up',name:'Yomisaka (Streamer)',look:LOOK.yomisaka,alert:()=>findable('stream'),talk(){
    if(findable('stream')){
      say('Yomisaka','Oh, detective. Last night’s stream? Sure, it’s all in the archive.');
      sys('Yomisaka shows you his phone. “[FOR REAL] Testing ALL Seven Mysteries at a School About to Close.”');
      say('Yomisaka','Ten o’clock on the dot, I hopped that fence and went live from the schoolyard. Over 3,000 watching live. My best ever.','happy');
      say('Yomisaka','...Okay, the trespassing, I do regret that. The old caretaker chewed me out big time.','uneasy');
      give('stream');
    }else if(phase()>=3){
      say('Yomisaka','This school got the most views on my whole channel. ...Kind of a shame it’s going away.');
    }else if(phase()>=1){
      say('Yomisaka','Me, dig the hole? No way, man — it was already there when I showed up!','surprise');
    }else{
      say('Yomisaka','Hey. Yomisaka. I do ghost-hunting videos.');
      say('Yomisaka','They told me to stick around because of last night. ...I’ll tell you whatever you want, later.');
    }
  }},

  /* Haruka Shirakawa: Class 6-1 homeroom teacher, graduate of twenty-five years ago. The culprit. Gives no evidence */
  shirakawa:{map:'schoolyard',x:8,y:4,dir:'down',name:'Shirakawa (Teacher)',look:LOOK.shirakawa,alert:()=>false,talk(){
    if(phase()>=3){
      const l=['...I have to get ready for the closing ceremony. Excuse me.','I hope you find the capsule. ...Everyone’s letters are in it.'];
      say('Shirakawa',l[S.ev.length%l.length]);
    }else if(phase()>=2){
      say('Shirakawa','Gen-san...? Surely not.','surprise');
      say('Shirakawa','Gen-san cares about the children more than anyone. I know that better than anyone.');
    }else if(phase()>=1){
      say('Shirakawa','A streamer... sneaking into a school at night. I hope the children don’t copy him.');
    }else if(!S.flags.shirakawaMet){
      S.flags.shirakawaMet=1;
      say('Shirakawa','I’m Shirakawa, homeroom teacher for Class 6-1. ...I hope Yota isn’t causing you any trouble.');
      say('Shirakawa','I graduated from this school too. Twenty-five years ago. ...My letter was in that capsule.','sad');
    }else{
      say('Shirakawa','The Seven Mysteries are just children’s rumors. But the capsule vanishing... What am I going to tell the other graduates?','uneasy');
    }
  }},

  /* ---------- North building ---------- */

  /* Principal Nonomura: reported the case. Plans to sell the site */
  kocho:{map:'school',x:9,y:4,dir:'right',name:'Nonomura (Principal)',look:LOOK.nonomura,alert:()=>findable('sale'),talk(){
    if(findable('sale')){
      say('Nonomura','About Gen-san? ...Yes, I suppose I’d better tell you.');
      say('Nonomura','After the closure, the building will be demolished, and the land sold to a private buyer.');
      say('Nonomura','At the city’s public meeting, only one person objected strongly — Gen-san. “This school is like my home,” he said.');
      sys('On the principal’s desk, a letter from a real-estate firm: “If rumors spread that the site is haunted, finding a buyer will become difficult.”');
      say('Nonomura','...If anyone is troubled by these Seven Mysteries rumors, it’s me.','uneasy');
      give('sale');
    }else if(!S.flags.kochoMet){
      S.flags.kochoMet=1;
      say('Nonomura','I’m Nonomura, the principal. I’m the one who called you.');
      say('Nonomura','Tsukikagedai Elementary closes next Saturday. The last day of a hundred and two years.','sad');
      say('Nonomura','At the closing ceremony, we were going to open the capsule from twenty-five years ago and have the graduates read their letters.');
      say('Nonomura','...I suppose this Seven Mysteries business is the children feeling unsettled. Their school is disappearing.');
    }else if(phase()>=3){
      say('Nonomura','The log from twenty-five years ago? The old building was still standing back then.');
    }else{
      const l=['Local TV is coming to the ceremony. ...Without the capsule, I don’t know what we’ll do.','The archive in this office holds a hundred and two years of school logs, you know.'];
      say('Nonomura',l[phase()%l.length]);
    }
  }},
}});
