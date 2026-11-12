/* Data: FILE.04 deductions (English) */
'use strict';

defCase('file04',{HYPS:[
  {id:'h1',no:'1',title:'A Child’s Prank',requires:['letter1','letter2','hanshi'],
   summary:'A pupil in the children’s class, sore at being scolded, wrote the threats on class practice paper. Written in clumsy, hiragana-only writing, the letters were slipped into the mailbox in secret.',
   hint:'The writing does look childish. But was it really a child’s hand? Ask someone who knows writing.',
   claims:[
     {t:'The letters were put directly into the mailbox',truth:true,ev:['letter1','letter2','letter3'],why:'No stamps, no postmarks. Someone put them in the mailbox by hand.'},
     {t:'The letters are written on children’s class paper',truth:true,ev:['hanshi'],why:'The size and paper grain match the sheets on the children’s class shelf.'},
     {t:'The writing is clumsy and nearly all hiragana',truth:true,ev:['letter1','letter2'],why:'Almost no kanji, misshapen strokes. At a glance, it looks like a child’s writing.'},
     {t:'The writer was a child unused to the brush',truth:false,ev:['line'],why:'The shapes are broken, but the entries and sweeps are the line of someone with twenty years at the brush. No child could draw that!'},
   ]},
  {id:'h2',no:'2',title:'Kuroda Did It',requires:['kuroda','kurodaseen'],
   summary:'Kuroda the realtor, wanting the townhouse, wrote the letters to force the school to close. Last night he called at the front at 20:30, was turned away, and then put Letter #3 in the mailbox.',
   hint:'Kuroda had motive and opportunity. But could Kuroda have known what the letters say?',
   claims:[
     {t:'Kuroda wants to buy this townhouse',truth:true,ev:['kuroda'],why:'He has made offers almost weekly for six months.'},
     {t:'Kuroda was at the front of Bokkokai last night',truth:true,ev:['kurodaseen'],why:'Chizuru sent him away at the entrance around 20:30.'},
     {t:'Kuroda knew a successor would be announced at the exhibition',truth:false,ev:['meeting'],why:'The announcement was a secret shared by four people at the instructors’ meeting — “not a word outside.” Kuroda couldn’t have known!'},
     {t:'Whoever delivered Letter #3 came along the street',truth:false,ev:['kenta'],why:'The person came out of the narrow path beside Bokkokai — from the back door — and went back the same way!'},
   ]},
  {id:'h3',no:'3',title:'Miyauchi Did It',requires:['likeness','paris'],
   summary:'Assistant instructor Miyauchi had decided to go to Paris next month. Named successor, she could never leave. To stop the announcement she wrote the threats on children’s paper — and Letter #3, without thinking, in her own usual hand.',
   hint:'Letter #3 looks exactly like Ms. Miyauchi’s writing. ...Too exactly, maybe?',
   claims:[
     {t:'Letter #3 looks exactly like Miyauchi’s writing',truth:true,ev:['likeness'],why:'Stops, hooks, even the slant match her fair copies.'},
     {t:'Miyauchi teaches the children’s class and has a back-door key',truth:true,ev:['hanshi','kenta'],why:'The children’s class is hers, and she is one of the four key holders.'},
     {t:'Miyauchi had a reason to stop the announcement',truth:true,ev:['paris'],why:'Next month she leaves for a year in Paris. She has told no one at the school.'},
     {t:'Miyauchi wrote Letter #3 with her own hand',truth:false,ev:['overlay'],why:'Every character in Letter #3 matches her printed works to the hair. Real handwriting always wobbles. It’s a traced forgery!'},
   ]},
  {id:'h4',no:'4',title:'Takanashi Did It',requires:['order','infrared','callname','tracing','notebook'],final:true,
   summary:'Senior instructor Takanashi became convinced Juho had chosen Miyauchi as successor. To stop the announcement, he wrote threats disguised as a child’s writing. Letter #3 he traced on the light table in the master’s room from Miyauchi’s printed works, to turn suspicion on her. At 21:00 last night he snapped Juho’s brush, sealed it in the envelope, slipped out the back door and put it in the mailbox.',
   claims:[
     {t:'The writer is an expert who broke the writing on purpose',truth:true,ev:['line'],why:'The entries and sweeps are the line of someone with twenty years or more at the brush.'},
     {t:'The writer learned the stroke order of thirty years ago',truth:true,ev:['order'],why:'The 必 in Letter #1 follows the order Juho taught until thirty years ago. Only Takanashi has been there that long.'},
     {t:'The writer calls Juho plain “Sensei”',truth:true,ev:['infrared','callname'],why:'Under the blot in Letter #2: “Sensei’s.” Only Takanashi calls him that.'},
     {t:'Letter #3 was traced from Miyauchi’s works on the master’s light table',truth:true,ev:['tracing','overlay'],why:'The light table’s drawer held a newsletter with pencil outlines around exactly the characters in Letter #3.'},
     {t:'Takanashi had a reason to stop the announcement',truth:true,ev:['notebook'],why:'His practice book, in a shaky hand: “The inkstone, to Miyauchi.” He saw his teacher give her the inkstone.'},
   ]},
]});
