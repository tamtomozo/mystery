/* Data: FILE.04 evidence, investigation phases, Takizawa's hints (English) */
'use strict';

/* =========================================================
   Evidence
   ========================================================= */
defCase('file04',{EV:{
  letter1:  {k:'✉️',name:'Threatening Letter #1',desc:'An envelope found in the mailbox on Monday morning, 12 days ago. No stamp, no postmark. On a small children’s practice sheet, in clumsy brush strokes: “Stop the announcement of the successor, or you will surely regret it.” It is written almost entirely in hiragana, the simplest script. The only kanji is 必 — “surely.”'},
  letter2:  {k:'📨',name:'Threatening Letter #2',desc:'Arrived 6 days ago. The same paper, the same clumsy hand: “Hand over the sign, and I will tell the world the secret of your brush.” Just before “your,” a word about two characters long has been blacked out with ink.'},
  letter3:  {k:'🖌️',name:'Letter #3 and the Broken Brush',desc:'Found in the mailbox this morning. Inside: Juho’s favorite brush, snapped in two. The sheet reads: “On the day of the exhibition, you will break your brush.” Unlike the first two, the characters are neat and flowing.'},
  hanshi:   {k:'📄',name:'Children’s Practice Paper',desc:'Small practice sheets from the children’s class shelf in the hall. Same size and same paper grain as all three letters. Children’s class runs Wednesdays and Saturdays, taught by assistant instructor Miyauchi. Anyone can take paper from the shelf.'},
  line:     {k:'〰️',name:'Miyauchi’s Assessment',desc:'Assistant instructor Miyauchi’s assessment: “The shapes have been deliberately broken. But not the way the brush enters the paper, or the way the sweeping strokes lift off. That is the line of someone who has held a brush for twenty years at least. A child could never draw that line.”'},
  kuroda:   {k:'🏠',name:'Kuroda’s Purchase Offer',desc:'A written offer from Kuroda, a local realtor, to the Kiryu family: “We wish to purchase the townhouse, land and building.” Kuroda has been visiting the school almost weekly for six months. Juho keeps refusing.'},
  kurodaseen:{k:'🚪',name:'Chizuru’s Statement (Last Night)',desc:'Statement from Chizuru, Juho’s daughter: “Mr. Kuroda came to the front again last night, around 20:30. Father refused to see him, so I sent him away at the entrance.”'},
  meeting:  {k:'📓',name:'Practice Journal',desc:'The practice journal on the office desk. The entry for the instructors’ meeting three weeks ago: “The successor shall be announced at the exhibition. Not a word outside this meeting.” Present: Juho, Takanashi, Miyauchi, Chizuru — only those four knew about the announcement.'},
  kenta:    {k:'👦',name:'Kenta’s Sighting',desc:'Statement from Kenta (4th grade), a pupil in the children’s class: “Last night around 9, on my way home from cram school, a grown-up came out of the narrow path beside Bokkokai, put something in the mailbox, and went back down the path. It was too dark to see a face.” The narrow path leads only to the school’s back door. Four people hold the back-door key: Juho, Chizuru, Takanashi and Miyauchi.'},
  likeness: {k:'🔍',name:'Handwriting of Letter #3',desc:'Mori from Forensics compared Letter #3 with Miyauchi’s fair copies: “The stops, the hooks, even the slant of each character — it’s exactly like Ms. Miyauchi’s hand.” Nothing like the clumsy writing of the first two letters.'},
  paris:    {k:'🗼',name:'Invitation from Paris',desc:'A letter found on Miyauchi’s desk. From a calligraphy institute in Paris: “We would be honored to welcome you as an instructor for one year, starting next month.” Miyauchi has told no one at the school. Resting on top of the letter was Juho’s treasured inkstone.'},
  kaiho:    {k:'📚',name:'Back Issues of the Newsletter',desc:'The Bokkokai newsletter, kept on the shelf by the entrance. Every issue prints pupils’ works. Miyauchi’s work appeared four times this year. Every kanji in Letter #3 — 社, 中, 展, 日, 前, 筆, 折 — appears somewhere in her printed works.'},
  overlay:  {k:'🧩',name:'Overlay Analysis',desc:'Mori’s analysis. Laid character by character over Miyauchi’s works in the newsletter, every character in Letter #3 matches to the hair. “When a person writes, even the same character wobbles a little each time. A perfect match means it was copied.” Letter #3 was assembled from characters taken from Miyauchi’s works and traced — a technique called shuji.'},
  order:    {k:'✍️',name:'Stroke Order of 必',desc:'Juho examined the 必 in Letter #1 through a loupe. Where strokes overlap, the ink shows the order the brush passed. “This is the stroke order I taught until thirty years ago. When I started the children’s class, I switched to the textbook order.” According to the register of pupils, only Takanashi has been at the school that long.'},
  infrared: {k:'🔦',name:'The Word Under the Ink',desc:'Mori photographed the blacked-out word in Letter #2 under infrared. The ink painted over it is a different kind from the ink beneath, so the hidden word shows through: “Sensei’s.” The writer started to write the name they always use, then blotted it out.'},
  callname: {k:'🗣️',name:'What They Call Juho',desc:'Chizuru’s statement: “Ms. Miyauchi calls him ‘Juho-sensei.’ The children call him ‘Grandpa Sensei.’ I call him ‘Father,’ and Mr. Kuroda says ‘Mr. Kiryu.’ ...The only one who calls him plain ‘Sensei’ is Mr. Takanashi.”'},
  tracing:  {k:'💡',name:'Light Table and Newsletter',desc:'The light table in the master’s room — a frosted glass top lit from below, used to trace models. In its drawer: one newsletter. On the page with Miyauchi’s work, faint pencil outlines have been drawn around just these characters: 社, 中, 展, 日, 前, 筆, 折.'},
  notebook: {k:'📒',name:'Takanashi’s Practice Book',desc:'A practice book on Takanashi’s desk in the master’s room — thirty years of copying his teacher’s hand, page after page. On one page dated two weeks ago, a single shaky line: “The inkstone, to Miyauchi.”'},
}});

/* =========================================================
   Phases: each refuted deduction advances the phase and unlocks more evidence
   ========================================================= */
defCase('file04',{EV_PHASE:{
  letter1:0, letter2:0, letter3:0, hanshi:0, line:0,
  kuroda:1, kurodaseen:1, meeting:1, kenta:1,
  likeness:2, paris:2, kaiho:2, overlay:2,
  order:3, infrared:3, callname:3, tracing:3, notebook:3,
}});
defCase('file04',{PHASE_MSG:{
  1:['Not a child. ...An adult who knows writing inside out wrote badly on purpose.',
     'The letters were put in the mailbox out front. Go out the entrance to the lane and ask around.',
     'The realtor across the lane wants this townhouse, I hear. And ask Ms. Chizuru about last night.'],
  2:['Not an outsider. ...Someone on the inside, with a key to the back door.',
     'Mori says he’s finished with the handwriting on Letter #3. Go hear what he found.',
     '...And take a look at Ms. Miyauchi’s desk.'],
  3:['Letter #3 was traced. ...Someone tried to pin this on Ms. Miyauchi.',
     'Go back to Letters #1 and #2. You can disguise the shape, but not the habits in your hand. Have Mori — and Master Juho — look at them again.',
     'And then — the master’s room.'],
}});
// Takizawa's lines while the final deduction is being tested (used by talkTakizawa in common.js)
defCase('file04',{finalOpen:[
  'Back up every claim in Deduction 4 with evidence. Open the Case Board.',
  '...Thirty-six years of handwriting. Handle it with care, rookie.',
]});

defCase('file04',{EVHINT:{
  letter1:'Ms. Chizuru laid the first two letters out on a desk. Look at them with your own eyes.',
  letter2:'Ms. Chizuru laid the first two letters out on a desk. Look at them with your own eyes.',
  letter3:'Ms. Chizuru has this morning’s letter. Go talk to her.',
  hanshi:'That small paper... where’s it from? Check the children’s class shelf.',
  line:'Ask someone who knows writing. Have Ms. Miyauchi, the assistant instructor, look at the letters.',
  kuroda:'Talk to the realtor across the lane.',
  kurodaseen:'Ask Ms. Chizuru about last night. Did anyone come by?',
  meeting:'Who knew about the successor announcement? There’s a practice journal on Ms. Chizuru’s desk.',
  kenta:'Talk to the kid in the lane. He might have seen something last night.',
  likeness:'Mori says he’s finished with the handwriting on Letter #3.',
  paris:'Take a look at Ms. Miyauchi’s desk.',
  kaiho:'We need more samples of Ms. Miyauchi’s writing. Something with her works printed in it... check the shelf by the entrance.',
  overlay:'Once you have the newsletter, show it to Mori. Have him overlay it on Letter #3.',
  order:'Have Master Juho look at Letter #1. Nobody knows a pupil’s habits like the teacher.',
  infrared:'What was written under the blot in Letter #2? Have Mori check.',
  callname:'The word under the ink... Ask Ms. Chizuru what everyone calls her father.',
  tracing:'Search the master’s room. There should be a tool called a light table.',
  notebook:'Look at Mr. Takanashi’s desk in the master’s room.',
}});
