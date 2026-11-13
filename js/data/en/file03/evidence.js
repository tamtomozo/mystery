/* Data: FILE.03 evidence, investigation phases, Takizawa's hints (English) */
'use strict';

/* =========================================================
   Evidence
   ========================================================= */
defCase('file03',{EV:{
  box:      {k:'📦',name:'Empty Box',            desc:'A box from Patisserie Miyako, left on the middle shelf of the fridge with its lid half open. Empty except for an ice pack. A sticky note on the lid reads “OKOCHI” in big letters. Something is stuck to the bottom of the box, but Inspector Okochi told you not to touch it.'},
  photo:    {k:'📷',name:'Inspector Okochi’s Photo',desc:'A photo on Inspector Okochi’s smartphone, taken today at 12:05. A single baked custard pudding with a browned top sits in the box. “I was looking forward to it, so I took a picture” (his words).'},
  rule:     {k:'📌',name:'Fridge Notice',        desc:'A notice in the kitchenette: “The fridge is cleared out every Friday at 17:00. Unlabeled items will be thrown away. — Komatsu, Admin.” Today is Friday. Inspector Okochi noticed the pudding was gone at 15:00.'},
  seen:     {k:'👀',name:'Komatsu’s Statement (Noon)',desc:'Statement from Komatsu in Admin: “Just after 13:00, I saw Noguchi come out of the kitchenette with a spoon in his mouth. He looked very pleased with himself.”'},
  jelly:    {k:'📝',name:'Noguchi’s Written Apology',desc:'Last month’s written apology, pinned to the bulletin board: “I ate the jelly the Section Chief was keeping in the fridge, having mistaken it for a gift for everyone. I deeply regret my actions. — Officer Noguchi”'},
  conbini:  {k:'🏪',name:'Convenience Store Pudding',desc:'An empty “Melty Pudding” cup from a convenience store, and its receipt (12:58, the store in front of HQ), found in the kitchenette trash. Noguchi says: “That was my own pudding! I bought it myself!”'},
  mori:     {k:'🍱',name:'Mori’s Statement',     desc:'Statement from Mori, Forensics: “At 13:30 I went to the kitchenette to get my lunch. The box lid was open a little, and I could see the pudding. I remember thinking it looked delicious.” Mori was the last to see the pudding.'},
  dispatch: {k:'📻',name:'Noguchi’s Dispatch Record',desc:'Dispatch center record. Noguchi was sent out at 13:20 to back up the station-front police box. He didn’t return to the division until 14:55.'},
  allnight: {k:'🌙',name:'Forensics Duty Roster',desc:'The Forensics duty roster. Mori worked through the night analyzing evidence for FILE.02. In his words: “I hadn’t eaten a thing since morning. I was starving.”'},
  lablog:   {k:'🔬',name:'Lab Equipment Log',    desc:'The operation log for the analysis equipment in Forensics (3F). Under Mori’s ID, it was operated every few minutes without a break from 13:35 to 15:10. A colleague in the same room also confirms Mori never left his seat.'},
  gate:     {k:'💳',name:'Division Entry Log',   desc:'The card reader log for the division door (printed out by Komatsu in Admin). 13:31 Mori in, 13:34 out. 13:42 “Visitor Card 07” in, 14:12 out. These are the only two entries between 13:30 and 14:20.'},
  komatsu2: {k:'🍘',name:'Komatsu’s Statement (Afternoon)',desc:'Statement from Komatsu in Admin: “At 14:20 I opened the fridge to put away some rice crackers someone brought in, and the pudding box was empty. I assumed Mr. Okochi had already eaten it, so I didn’t say anything.”'},
  guestcard:{k:'🎫',name:'Visitor Card Lending Log',desc:'The lending log at the 1F reception desk: “13:40 Visitor Card 07 — Major Crimes, Takizawa (forgot card) — returned 14:15”'},
  report:   {k:'📑',name:'Caramel-Stained Report',desc:'The FILE.02 investigation report from Inspector Okochi’s in-tray. Written by Takizawa, stamped received at 14:10. One brown stain in the bottom right of page 3. According to Mori, it’s burnt caramel with a hint of liqueur — from Miyako’s baked pudding.'},
  cup:      {k:'🥄',name:'Pudding Cup on the Roof',desc:'An empty pudding cup and a wooden spoon, found in the trash bin beside the rooftop vending machine. The bottom of the cup bears the “Patisserie Miyako” brand. Eaten clean.'},
  memo:     {k:'🗒️',name:'Torn Notebook Page',   desc:'The paper the rooftop cup was wrapped in — a page torn from a notebook, with a pencil scrawl: “Shirasagi Museum — Iwata patrol 20:00–20:35.” A note from the FILE.02 interviews. The handwriting is Takizawa’s.'},
  album:    {k:'📘',name:'Police Academy Yearbook',desc:'A yearbook from 30 years ago, found in the bottom drawer of Inspector Okochi’s desk. On the messages page, in blocky handwriting: “To Okochi — I’ll never forgive you for the dorm pudding. Takizawa.”'},
}});

/* =========================================================
   Phases: each refuted deduction advances the phase and unlocks more evidence
   ========================================================= */
defCase('file03',{EV_PHASE:{
  box:0, photo:0, rule:0, seen:0, jelly:0,
  conbini:1, mori:1, dispatch:1, allnight:1,
  lablog:2, gate:2, komatsu2:2,
  guestcard:3, report:3, cup:3, memo:3, album:3,
}});
defCase('file03',{PHASE_MSG:{
  1:['It wasn’t thrown out in a clean-up. ...Somebody ate it.',
     'Did you check the kitchenette trash? Also, Mori went to the kitchenette at lunch. Go hear what he saw.',
     'And ask Noguchi what he was doing in the early afternoon.'],
  2:['It was still there at 13:30. ...So it vanished after that.',
     'Ms. Komatsu says she’ll print out the door’s card reader log for us.',
     'And confirm with Mori himself the record of when he was back in Forensics.'],
  3:['Not Mori. ...The visitor card at 13:42, huh.',
     'The reception log, where the cup went, and the report. ...The evidence is still somewhere in this division, and somewhere in this building.',
     'If the cup isn’t in any trash on this floor, check next to the vending machine on the roof. ...That’s where I always go to throw out my cans.'],
}});
// Takizawa's lines while the final deduction is being tested (used by talkTakizawa in common.js)
defCase('file03',{finalOpen:[
  'Back up every claim in Deduction 4 with evidence. Open the Case Board.',
  '...The evidence is all there. It’s all there, isn’t it, rookie.',
]});

defCase('file03',{EVHINT:{
  box:'Start with the fridge. See for yourself what state the box is in.',
  photo:'Ask Mr. Okochi when he last saw the pudding. ...He probably has a photo.',
  rule:'Did you read the notice in the kitchenette? It has the rules for the fridge.',
  seen:'Ms. Komatsu in Admin keeps a close eye on who goes in and out of the kitchenette. Go talk to her.',
  jelly:'Check the bulletin board. ...Noguchi has a record.',
  conbini:'Search the kitchenette trash.',
  mori:'Mori went to the kitchenette at lunch. Ask him what he saw.',
  dispatch:'Ask Noguchi what he was doing in the early afternoon.',
  allnight:'Apparently Mori pulled an all-nighter. Get him to show you the Forensics duty roster. Ask Mori.',
  lablog:'Confirm with Mori himself the record of when he was back in Forensics.',
  gate:'Ms. Komatsu says she’ll print out the door’s card reader log for us.',
  komatsu2:'Seems Ms. Komatsu opened the fridge again in the afternoon. Talk to her once more.',
  guestcard:'Visitor cards are lent out at the 1F reception desk. Ask Ms. Komatsu to check the lending log for you.',
  report:'Go look at the in-tray on Mr. Okochi’s desk. ...What was handed in today?',
  cup:'If the cup isn’t in any trash on this floor, check next to the vending machine on the roof.',
  memo:'Take another good look at the rooftop trash. Was the cup wrapped in something?',
  album:'...The bottom drawer of Okochi’s desk. There’s an old photo in there.',
}});
