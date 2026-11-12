/* Data: FILE.08 evidence, investigation phases, and the letter-vs-minutes cross-check (English) */
'use strict';

/* =========================================================
   Evidence
   ========================================================= */
defCase('file08',{EV:{
  article:   {k:'✉️',name:'The Three Letters',        desc:'The originals of three letters printed in the “Readers’ Voices” column of the trade paper, the Stationery Herald. No sender’s name; each was dropped straight into the newspaper’s mailbox. Each appeared the morning after a Thursday board meeting, and each sets down what was said in that meeting, word for word. Ruled white paper, fountain pen, blue-black ink.'},
  window:    {k:'🪟',name:'The Boardroom Window',     desc:'The boardroom’s west window. About six meters across the street is the second floor of an office block — a café. From its window seats you can look straight down onto the whole boardroom table.'},
  phoneBox:  {k:'📵',name:'The Phone Box',            desc:'A lockable wooden box at the boardroom door. During board meetings, everyone attending leaves their phone in it. Only paper and pens go into the room. It’s hard to believe someone inside recorded the meeting and leaked it.'},
  sweep:     {k:'📡',name:'The Bug Sweep',            desc:'Mori’s account. “I swept the boardroom with the detector — the lights, the sockets, the phone line, under the table, even inside the fireplace. Nothing that gives off a signal. Same for the president’s office and the secretary’s office.”'},
  curtain:   {k:'🎭',name:'The Blackout Curtains',   desc:'Mizuhara’s account. “At board meetings, Daito shows slides, so the blackout curtains stay closed the whole time. All three times. Nobody outside could see into the room.”'},
  minutes:   {k:'📒',name:'The Minutes',              desc:'The minutes of the board meetings. Mizuhara, the secretary, takes them down at the table, writes them up clean, and keeps them in the safe in the president’s office. No copies are made. The minutes of the second meeting read: “14:40–14:50 (no record: secretary out of the room).”'},
  card:      {k:'🪪',name:'The Sankyo Pen Card',      desc:'A business card under the pen tray on Mizuhara’s desk. “Sankyo Pen Co., Ltd. — Human Resources.” Handwritten on the back: “Do let’s talk.” Sankyo Pen is Narumi Pen’s rival.'},
  diff1:     {k:'🕳️',name:'Words Not in the Minutes', desc:'The president’s words in the second letter: “If it means losing the nib workshop, then this deal never happened.” The minutes for that time say “no record: secretary out of the room” — the ten minutes when Mizuhara was called away on the extension. Copying the minutes, no one could have written those words.'},
  oppose:    {k:'🙅',name:'Kusumi’s Opposition',      desc:'Chihaya’s account. “Mr. Kusumi has opposed our partnership from the very start. His name isn’t on the board list for after the merger. ...He knows that, too.”'},
  stall:     {k:'⏸️',name:'The Stalled Talks',        desc:'The president’s account. “Every time a letter came out in the paper, Daito’s head office halted the talks. All three times. If the deal falls through now, the one who’d be happiest is...”'},
  diff2:     {k:'👂',name:'“Daytoe Stationery”',      desc:'The first letter. It spells “Daito Stationery” as “Daytoe Stationery,” and writes Kusumi’s own phrase, “cost center,” as “cost sender.” Whoever wrote it had never seen the name in writing. They wrote the sounds down just as they heard them.'},
  pipeRoom:  {k:'🔔',name:'Speaking Tube (Boardroom)',desc:'Above the boardroom fireplace, behind the framed photo of the old house: a round brass cap. The mouth of a speaking tube. The rust on its wing screw has been rubbed through to bright metal. Someone opened it recently. It is open now.'},
  pipeShop:  {k:'📯',name:'Speaking Tube (Workshop)', desc:'Behind the tool shelf in the nib workshop, a brass tube juts from the wall, its cap open. In front of it, an old floor cushion and a folded apron. Someone sat here with their ear to the tube. Lean close, and the sounds of the boardroom upstairs come through astonishingly clearly.'},
  plan:      {k:'📐',name:'The Founding Floor Plan',  desc:'In the company-history case in the corridor: a 1956 floor plan of the house. From the second-floor “President’s Office” (today’s boardroom), a single line runs down to the back “Storeroom” (today’s nib workshop). “Speaking tube.”'},
  wheelStop: {k:'⚙️',name:'Hand-Grinding Day',        desc:'Kuramochi’s account. “A month ago, the master started saying ‘Thursday afternoons, we grind by hand.’ So we shut the grinding wheels off, two to three on Thursdays. With the wheels off, the workshop goes dead quiet... and the master shut himself away behind the tool shelf.”'},
  paper:     {k:'📄',name:'The Test-Writing Paper',   desc:'A stack of paper on the workshop’s test-writing stand, used to try out freshly ground nibs. Ruled white paper — the same as the letters. The ink bottle on the stand is blue-black.'},
  shihoJo:   {k:'🎀',name:'“Little Miss Shiho”',      desc:'The third letter calls the president “little Miss Shiho.” The president’s account: “The only one who calls me that is Uncle Tatsumi — the master of the nib workshop. He has since I was a little girl.”'},
  guardLog:  {k:'💂',name:'The Guard’s Log',          desc:'Noguchi’s account. The only way into the main building from the back is past the guard’s window. According to the guard, Tatsumi from the nib workshop hasn’t set foot in the main building once in ten years. “The master won’t cross the threshold. Something to do with the old boss, they say.”'},
  seat:      {k:'💺',name:'The Chairman’s New Seat', desc:'Mizuhara’s account. “The chairman always sat at the window end of the table. Then a month ago, all of a sudden, he moved to the fireplace end. He said, ‘I can hear better here.’”'},
  verdigris: {k:'🧤',name:'The Chairman’s Gloves',   desc:'The chairman’s white cotton gloves, left on the reception room table. The fingertips of the right glove are smudged blue-green. Brass rust — verdigris.'},
}});

/* =========================================================
   Investigation phases: each refuted deduction unlocks more evidence
   ========================================================= */
defCase('file08',{EV_PHASE:{
  article:0, window:0, phoneBox:0, sweep:0, curtain:0,
  minutes:1, card:1, diff1:1,
  oppose:2, stall:2, diff2:2,
  pipeRoom:3, pipeShop:3, plan:3, wheelStop:3, paper:3, shihoJo:3, guardLog:3, seat:3, verdigris:3,
}});

/* =========================================================
   Letter vs. minutes cross-check (js/ui/compare.js). See js/data/file08/evidence.js
   ========================================================= */
defCase('file08',{COMPARE:[
  {ev:'diff1',title:'The Second Board Meeting (two weeks ago)',
   letter:[
     {t:'At the Narumi Pen board meeting, this is what was said.',note:'That’s just the opening. It isn’t what was said in the meeting.'},
     {t:'The other company said the nib workshop would close next March, and the nibs would be made by machine.'},
     {t:'The president asked what would become of the workshop’s craftsmen.'},
     {t:'The president said it plainly: “If it means losing the nib workshop, then this deal never happened.”',ok:true},
     {t:'And she asked them to wait until the next meeting for her answer.'},
     {t:'To everyone who uses a Narumi pen: the nib workshop is still here.',note:'Those are the writer’s own words. Not what was said in the meeting.'},
   ],
   minutes:[
     ['14:00','Meeting opened. Present: the Chairman, the President, Managing Director Kusumi, Ms. Chihaya (Daito Stationery)'],
     ['14:05','Ms. Chihaya explained the terms of the partnership. The nib workshop to close next March; nib production to move to machines.'],
     ['14:20','The President asked about the treatment of the workshop’s craftsmen.'],
     ['14:40','(Until 14:50, no record: secretary out of the room)'],
     ['14:50','The President stated that she would answer on the terms by the next meeting.'],
     ['15:00','Meeting closed.'],
   ],
   hint:'Look at the gap in the minutes.',
   found(){
     say(ME,'Here. The president’s words: “If it means losing the nib workshop, then this deal never happened.”');
     say(ME,'The minutes for that time say “no record: secretary out of the room.” The ten minutes when Ms. Mizuhara was called away on the extension.');
     say(ME,'Copying the minutes, no one could have written this. ...Whoever wrote the letter heard the meeting as it happened.');
     give('diff1');
   }},
  {ev:'diff2',title:'The First Board Meeting (three weeks ago)',
   letter:[
     {t:'There is talk of Narumi Pen joining hands with Daytoe Stationery.',ok:true},
     {t:'That company has proposed a capital partnership with Narumi.'},
     {t:'The managing director said the nib workshop is a “cost sender.”',ok:true},
     {t:'He said the partnership was the time to rethink the workshop.'},
     {t:'The president said the workshop is the heart of Narumi, and she wants to think it over carefully.'},
     {t:'To everyone who loves the workshop’s nibs: please, know that this is happening.',note:'Those are the writer’s own words. Not what was said in the meeting.'},
   ],
   minutes:[
     ['14:00','Meeting opened. Present: the Chairman, the President, Managing Director Kusumi, Ms. Chihaya (Daito Stationery)'],
     ['14:05','Ms. Chihaya presented Daito Stationery’s proposal for a capital partnership.'],
     ['14:30','MD Kusumi: The nib workshop is a cost center and should be reviewed on the occasion of the partnership.'],
     ['14:45','The President: The nib workshop is the heart of Narumi. She wishes to consider carefully.'],
     ['15:00','Meeting closed.'],
   ],
   hint:'It says the same things — but some words are written differently. Compare the spelling.',
   found(){
     say(ME,'“Daytoe Stationery.” ...The minutes say “Daito.”');
     say(ME,'And the managing director’s own words — “cost center” — written as “cost sender.”');
     say(ME,'Kusumi trades business cards with Daito people every day. He’d never misspell the name. And he’d never write his own words like that.');
     say(ME,'...This writer never saw the words. They wrote down the sounds, just as they heard them.');
     give('diff2');
   }},
  {ev:'shihoJo',title:'The Third Board Meeting (last week)',
   letter:[
     {t:'I am writing about the third meeting.',note:'That’s just the opening. It isn’t what was said in the meeting.'},
     {t:'Because it was in the paper, the other company said it wanted to halt the talks for a while.'},
     {t:'Little Miss Shiho said that even so, she wanted to join hands with the workshop kept as it is.',ok:true},
     {t:'The managing director said that with the workshop in the way, the deal would never come together.'},
     {t:'Next Thursday will be the last meeting.'},
     {t:'Little Miss Shiho is fighting all alone.',ok:true},
   ],
   minutes:[
     ['14:00','Meeting opened. Present: the Chairman, the President, Managing Director Kusumi, Ms. Chihaya (Daito Stationery)'],
     ['14:05','Ms. Chihaya: Owing to the letters, Daito’s head office wishes to halt negotiations for the time being.'],
     ['14:15','The President: Proposed once more a partnership that keeps the nib workshop.'],
     ['14:40','MD Kusumi: Keeping the nib workshop stands in the way of the partnership.'],
     ['14:55','The President: Will give her final answer at the next meeting.'],
     ['15:00','Meeting closed.'],
   ],
   hint:'What was said matches. ...But the way someone is named doesn’t match the minutes.',
   found(){
     say(ME,'“Little Miss Shiho”... In the minutes, of course, it’s “the President.”');
     sys('I check with the president on the extension.');
     say('Shiho','...Little Miss Shiho. The only one who calls me that is Uncle Tatsumi — the master of the nib workshop. He has since I was a little girl.','surprise');
     say('Shiho','...Not that we’ve spoken in years.','sad');
     give('shihoJo');
   }},
]});
