/* Data: FILE.06 evidence, investigation phases, Takizawa's hints (English) */
'use strict';

/* =========================================================
   Evidence
   ========================================================= */
defCase('file06',{EV:{
  shutter:   {k:'🚧',name:'The Lowered Fire Shutter',desc:'At the top of the stairs from the lobby up to the street, a steel fire shutter has come all the way down to the floor. It’s an old model that closes automatically when the power fails. On the pillar beside it is a socket for a hand crank to wind it up. The hook below, where the crank should hang, is empty.'},
  padlock:   {k:'🔒',name:'The Emergency Exit Lock',desc:'The emergency exit in the right wall of the auditorium. Its push bar and the railing beside it are wound round and round with a red wire lock — a four-digit combination lock. It was put on from the inside, from the auditorium side of the door.'},
  petition:  {k:'✍️',name:'The Petition to Save It',desc:'A box of signatures on the kiosk counter. “Save the Ginseiza — 3,012 signatures.” Organizer: Akari Hoshino, the owner’s granddaughter. Tucked in with it, notes from regulars: “We won’t let it close,” “On the last day, I’ll sit in front of the shutter and refuse to move.”'},
  breaker:   {k:'⚡',name:'The Main Breaker',desc:'The cramped machine room in the left wing of the stage. The breaker panel door is padlocked, but you can see inside through the wire mesh. The main breaker lever is at OFF. If it had tripped from a short or an overload, the lever would have stopped halfway, between OFF and ON. Someone pushed it all the way to OFF by hand. This panel is the only place the building’s power can be cut.'},
  contract:  {k:'📄',name:'The Sale Contract',desc:'A copy of the sale contract for the Ginseiza’s land and building, from Mashiba’s briefcase. The buyer is Mashiba’s real estate company. “Handover: 0:00 on the day after closing, upon delivery of the keys.” “Should the handover be delayed for reasons on the seller’s side, the seller shall pay ¥300,000 per day.”'},
  mashibaOut:{k:'🚬',name:'Mashiba Left His Seat',desc:'Yaeko’s statement: “Mr. Mashiba got up partway through. Around 10:15, I’d say. He had his cigarettes in his hand, so the smoking corner in the lobby, I suppose. He wasn’t in the auditorium when the lights went out.”'},
  schedule:  {k:'🏗️',name:'The Demolition Schedule',desc:'The demolition schedule for the Ginseiza, clipped to Mashiba’s clipboard. “Day 1, 7:00 — heavy machinery arrives, crew of twenty.” Day 1 is the morning of the handover. According to Mashiba, if the handover is delayed and the work stops for a day, his company loses nearly a million yen in idle machines and workers. A ¥300,000 penalty doesn’t come close to covering that.'},
  akariSkill:{k:'🎞️',name:'Akari’s Job',desc:'Yaeko’s statement: “Akari works in film and video, out in Tokyo. She learned to run film projectors at vocational school, too. With 16mm, she might even be handier than Goda.”'},
  akariOut:  {k:'🚶',name:'Mashiba on Akari',desc:'Mashiba’s statement: “Ms. Akari? I passed her in the lobby around 10:20. She came out from the auditorium, holding something flat and round, and went on toward the back. She wasn’t in the auditorium when the power went, I’m sure of it.”'},
  projector16:{k:'📽️',name:'The 16mm Projector',desc:'A small 16mm projector at the back of the projection room. Film is threaded through it, and the lamp switch is still ON. The film has stopped on the white leader at its head. The power died at the very moment someone was about to start it. Beside it, a note in Akari’s handwriting: “Switch over right after the screening! On Grandma’s signal.”'},
  akariPlan: {k:'💡',name:'Akari on the 16mm',desc:'Akari’s statement: “Grandma asked me to. Right after the screening, run this 16mm, she said. And don’t tell Goda. I don’t know what’s on it. She only gave me the reel — she kept the can.” “At 10:24 I switched on the lamp to give it a test run, and... blackout. It stopped my screening too.”'},
  boothEmpty:{k:'🪑',name:'Akari on the Booth',desc:'Akari’s statement: “When I walked into the projection room at 10:20, Goda wasn’t there. The 35mm was running all by itself. It was near the end of reel two — about ten minutes to the changeover. I’ve never once seen Goda leave a projector running alone.”'},
  bikelock:  {k:'🪝',name:'The Empty Hook',desc:'A locker in the staff room. The hook below the nameplate “Goda” is empty. According to Yaeko, Goda always hangs his red combination wire lock for his bicycle there. The same make, and the same color, as the lock on the emergency exit.'},
  handle:    {k:'🔧',name:'The Shutter Crank',desc:'Stuffed inside a film can marked “SCREENED” on the projection room shelf: the crank handle for the fire shutter. But a shutter that drops in a power cut won’t wind up by hand until it’s reset at the control panel. Without power, even with the crank, it won’t open.'},
  phoneCut:  {k:'☎️',name:'The Cut Phone Line',desc:'The pink payphone in the lobby. It draws its power from the phone line itself, so it should work even in a blackout. Behind its stand, the line had been cut — a perfectly straight cut. On the cut end: black oil, the same oil used on projectors. On the projection room workbench are the scissors used to cut film.'},
  panelKey:  {k:'🔑',name:'The Breaker Panel Keys',desc:'Yaeko’s statement: “The key to the breaker panel? There are only two. One is locked in the safe at my house. The other is on Goda’s key ring. I’ve always left the electrics to Goda.”'},
  can:       {k:'🥫',name:'Goda’s Film Can',desc:'In the drawer of the projection room workbench: an old 16mm film can. Faded tape on the lid. “On the day we close, watch this together with Yaeko. — Minoru.” Minoru was Yaeko’s late husband, the founder and first owner of the Ginseiza. He died twenty years ago.'},
  logbook:   {k:'📓',name:'The Projection Log',desc:'Goda’s projection log, on the workbench. Page one: “April 12, 1966. The Ginseiza opens. First projection.” For sixty years after that, every single day, the films shown and their times. The last line carries last night’s date. “Final screening. ...I’ll run it at dawn.”'},
  refusal:   {k:'🙅',name:'Yaeko’s Answer',desc:'Akari’s statement: “Last week, I heard Goda say to Grandma, ‘On the day we close... how about we watch something with Minoru in it?’ Grandma said ‘I won’t,’ just like that. And then: ‘When the screening’s over, I hand the keys back at midnight, and I never come here again.’”'},
}});

/* =========================================================
   Investigation phases: each refuted deduction opens up new evidence
   ========================================================= */
defCase('file06',{EV_PHASE:{
  shutter:0, padlock:0, petition:0, breaker:0,
  contract:1, mashibaOut:1, schedule:1,
  akariSkill:2, akariOut:2, projector16:2, akariPlan:2,
  boothEmpty:3, bikelock:3, handle:3, phoneCut:3, panelKey:3, can:3, logbook:3, refusal:3,
}});
// The night wears on with every refuted deduction (shown as a band by checkPhase in js/game/progress.js)
defCase('file06',{phaseBand:{
  1:{title:'23:40',sub:'— Over an hour since we were shut in'},
  2:{title:'1:50',sub:'— The underground auditorium has gone cold'},
  3:{title:'4:10',sub:'— Two hours until dawn'},
}});
defCase('file06',{PHASE_MSG:{
  1:['This wasn’t someone outside. The breaker was thrown in here, and the exit was locked from the inside.',
     '...Whoever did this is one of us. Locked in here with us.',
     'Mr. Mashiba was supposed to get the keys at midnight. Ask him about the contract. And ask Yaeko who left their seat before the blackout.'],
  2:['It’s not Mashiba. A late handover costs him, not the other way around.',
     '...Goda. Sorry, but we’re going to have a look in the projection room. This is an emergency.',
     'Sounds like Akari wasn’t in her seat when the power went, either. Ask Mashiba and Yaeko about her.'],
  3:['Not Akari, either. The blackout wrecked her plans.',
     '...Hang on. When Akari walked into the projection room, where was the person who should have been in there?',
     'The staff room lockers, the payphone line, the shelf and workbench in the booth. Ask Yaeko about the breaker panel keys. And talk to Akari again.'],
}});
// Takizawa’s lines while the final deduction is being verified (used by talkTakizawa in common.js)
defCase('file06',{finalOpen:[
  'Back up every claim in Deduction ④ with evidence. Open the Case Board [B].',
  '...Before the sun comes up.',
]});

defCase('file06',{EVHINT:{
  shutter:'Start with the way out front. At the back of the lobby, at the top of the stairs to the street, there’s a fire shutter.',
  padlock:'There’s an emergency exit in the right wall of the auditorium. See if it opens.',
  petition:'I hear there were people dead set against the closing. There’s a petition box on the kiosk counter in the lobby.',
  breaker:'Find out what caused the blackout. The breaker panel is in the machine room, in the left wing of the stage.',
  contract:'Mashiba was supposed to get the keys at midnight. Ask him about the contract.',
  mashibaOut:'Who left their seat before the blackout? Yaeko was in the front row — she’d have seen.',
  schedule:'What happens to Mashiba’s company if the handover runs late? Ask him about the work schedule.',
  akariSkill:'What does Akari do for a living? Ask Yaeko.',
  akariOut:'Sounds like Akari wasn’t in her seat either. Mashiba was in the lobby — ask him.',
  projector16:'Search the projection room. There should be a small 16mm projector at the back.',
  akariPlan:'That film threaded on the 16mm... Go ask Akari what she was planning.',
  boothEmpty:'When Akari went into the projection room, what did she find? Ask her again.',
  bikelock:'Find out whose lock that is on the exit. Try the lockers in the staff room, bottom right of the lobby.',
  handle:'Where did the shutter crank go? Look on the projection room shelf.',
  phoneCut:'That payphone should work even in a blackout. Take a good look at it — behind the stand, too.',
  panelKey:'The breaker panel was padlocked. Ask Yaeko who has the keys.',
  can:'Search the workbench in the projection room. The drawer, too.',
  logbook:'There should be a projection log on the workbench. Read the last line.',
  refusal:'Did Goda ever ask Yaeko for anything? Ask Akari.',
}});
