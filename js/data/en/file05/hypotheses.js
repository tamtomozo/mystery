/* Data: FILE.05 deductions (English) */
'use strict';

/* =========================================================
   Deductions (each one is assembled once its evidence is in)
   1 “Not the kids (no way into the building)” 2 “Not the streamer (the hole was already empty)”
   3 “Not Genda (he was outside the music room)”, then 4 names who
   ========================================================= */
defCase('file05',{HYPS:[
  {id:'h1',no:'1',title:'A Kids’ Prank',requires:['hole','notebook','yota'],
   summary:'Yota and the other sixth graders, who love the Seven Mysteries, spent two weeks making them “really” happen. They snuck into the music room at night to play the piano, and made a will-o’-the-wisp with a flashlight. Last night, for the grand finale — number seven — they made the time capsule vanish.',
   hint:'It’s all happening in the order in his notebook, huh. ...But could a kid get into that building at night?',
   claims:[
     {t:'The Seven Mysteries are happening in the order of Yota’s notebook',truth:true,ev:['notebook'],why:'In the past two weeks, numbers 1 to 6 have each been marked “IT HAPPENED!” in the notebook’s order.'},
     {t:'Yota said he would find out what the seventh mystery is',truth:true,ev:['notebook'],why:'It’s written in big letters on the last page of his notebook.'},
     {t:'Last night, a blue light appeared by the stump',truth:true,ev:['yota'],why:'Yota saw it from his bedroom window around 21:10.'},
     {t:'The kids snuck into the music room at night and played the piano',truth:false,ev:['security'],why:'The building’s alarm is set at 20:00 every night. Until Gen-san switches it off, no door or window opens and no motion sensor triggers. No child could be in the music room at 9 p.m.!'},
   ]},
  {id:'h2',no:'2',title:'The Streamer Did It',requires:['stream','caught'],
   summary:'Ghost-hunting streamer Yomisaka has been staging the Seven Mysteries for two weeks to boost his views. Last night, for his “number seven” livestream, he dug up the capsule himself and showed off the empty hole as “the mark of the seventh mystery.”',
   hint:'He was in the schoolyard last night, no doubt about that. ...But since when has he had his eye on this school?',
   claims:[
     {t:'Yomisaka boosts his views with Seven Mysteries streams',truth:true,ev:['stream'],why:'Last night’s livestream had more than 3,000 people watching live.'},
     {t:'Yomisaka was in the schoolyard last night',truth:true,ev:['stream','caught'],why:'He climbed the fence and started streaming at 22:00, and Gen-san threw him out at 22:30.'},
     {t:'Yomisaka has been staging the Seven Mysteries for two weeks',truth:false,ev:['posts'],why:'His first video about this school went up five days ago. Before that, he was filming in the next prefecture. He couldn’t have started mysteries that began two weeks ago!'},
     {t:'Yomisaka dug up the capsule',truth:false,ev:['frame'],why:'At 22:04, when his camera showed the hole, it was already empty. It was dug before Yomisaka arrived!'},
   ]},
  {id:'h3',no:'3',title:'Genda Did It',requires:['sale','buried'],
   summary:'Gen-san, the caretaker, was the only one who opposed the closure and the sale of the site. He used the Seven Mysteries rumors to make the school a “haunted spot” and scare buyers off. At 21:00 last night, he dug up the capsule he had buried himself and set off the “number seven” uproar.',
   hint:'Gen-san has a motive, the keys, and he knows where the capsule was. ...But where was he at nine last night?',
   claims:[
     {t:'Gen-san opposed the closure and the sale of the site',truth:true,ev:['sale'],why:'He was the only one to object strongly at the city’s meeting. “This school is like my home.”'},
     {t:'Gen-san buried the capsule himself and knows the spot',truth:true,ev:['buried'],why:'Twenty-five years ago, it was Gen-san who dug the hole for the capsule.'},
     {t:'Gen-san can switch off the building’s alarm',truth:true,ev:['security'],why:'He switches it off with his caretaker card for his rounds every night.'},
     {t:'It was Gen-san digging in the schoolyard at 21:00 last night',truth:false,ev:['sensor'],why:'From 21:02 to 21:38, the motion sensor outside the music room, at the far end of the north building, kept triggering. At 21:10, when the will-o’-the-wisp appeared, Gen-san wasn’t in the schoolyard!'},
   ]},
  {id:'h4',no:'4',title:'Shirakawa Did It',requires:['digs','melody','cellophane','boots','diary','bandage','program'],final:true,
   summary:'Haruka Shirakawa, homeroom teacher of Class 6-1, is one of the graduates who buried the capsule twenty-five years ago. To take back her own letter before it was read aloud at the closing ceremony, she used a speaker hidden in the piano to lure Gen-san on his rounds to the far end of the north building. Meanwhile, with a light covered in blue cellophane, she dug trial holes around the stump night after night — and last night, she finally struck the capsule.',
   claims:[
     {t:'The 9 p.m. piano is a trick to lure Gen-san, on his rounds, to the far end of the north building',truth:true,ev:['speaker','sensor'],why:'Every night at 21:00, the speaker inside the piano starts playing. Gen-san, searching for the source, was stuck outside the music room for nearly 40 minutes.'},
     {t:'The schoolyard will-o’-the-wisp is a light covered in blue cellophane',truth:true,ev:['cellophane'],why:'A circle of blue cellophane, cut to the size of a flashlight, was caught in the hedge east of the stump.'},
     {t:'Whoever set it up is one of the graduates who buried the capsule twenty-five years ago',truth:true,ev:['melody'],why:'The speaker’s recording is from the graduation ceremony twenty-five years ago. The CD went only to that year’s five graduates.'},
     {t:'The digger didn’t know exactly where the capsule was',truth:true,ev:['digs'],why:'Eleven refilled trial holes around the stump. Gen-san, who knew the spot, would have hit it first time.'},
     {t:'Shirakawa’s rain boots have red clay from around the stump',truth:true,ev:['boots'],why:'The schoolyard is all sand. The only red clay is around the stump, where the cherry tree once stood.'},
     {t:'Shirakawa had a reason not to want her capsule letter read',truth:true,ev:['diary','bandage','program'],why:'The fire twenty-five years ago was blamed on Gen-san. The next day, Haruka’s hand was bandaged. And at the ceremony, her letter would be read aloud — in front of Gen-san.'},
   ]},
]});
