/* Data: FILE.07 evidence, investigation phases, Takizawa's hints (English) */
'use strict';

/* =========================================================
   Evidence
   ========================================================= */
defCase('file07',{EV:{
  callMemo:  {k:'📞',name:'The Kidnapper’s Calls',desc:'Two calls, saved on the recorder in the office’s meeting room. The voice has been run through a machine. 14:02: “I have Minato. The ransom is 3,120,000 yen. Don’t tell the police.” 15:32: “Four o’clock, the Ferris wheel. The father rides gondola 7, alone. Leave the bag under the seat and get off. Then let the gondola go round once more. Once I’ve checked the money, at five o’clock, I’ll tell you where Minato is.”'},
  emptyGondola:{k:'🚡',name:'The Empty Gondola',desc:'Gondola 7, back from its extra turn. The latch on the outside of the door was still fastened. The blue sports bag that was left under the seat is gone. The only window that opens is the little one at the top, and only a crack — far too small for an adult to get through.'},
  stop3min:  {k:'⏸️',name:'The Three-Minute Stop',desc:'Mori’s account. “The wheel stopped at 16:14 — two minutes after Mr. Asakura got off. It stayed stopped for three minutes and started again at 16:17. The red lamp at the control booth said HIGH WIND STOP. When it stopped, gondola 7 was low down, to the right of the boarding platform.”'},
  callLog:   {k:'📋',name:'The Call Records',desc:'Noguchi’s account. According to the phone company, both of the kidnapper’s calls (14:02 and 15:32) were made from inside Shiomi Land — from the public phone right beside the Ferris wheel’s boarding platform.'},
  anemometer:{k:'🌬️',name:'The Wind Chart',desc:'The chart from the anemometer in the control booth. The Ferris wheel stops automatically when the wind goes over 15 meters per second. But around four o’clock, the needle crawls along at about 3 meters the whole time. There’s no sign of any strong wind at 16:14.'},
  debt:      {k:'✉️',name:'Toru’s Demand Letter',desc:'A letter from a consumer loan company that slipped out of Toru’s jacket pocket. “Outstanding balance: ¥2,980,000. Please pay in full by March 15.” Almost exactly the same as the 3,120,000-yen ransom.'},
  toruLeft:  {k:'🚶',name:'Haru on Toru',desc:'Haru’s account. “Around half past one, Mr. Toru said, ‘I’m just going to make a call,’ and went off on his own. The young master disappeared about ten minutes after that. Mr. Toru didn’t come back until after the lost-child announcement.”'},
  toruJob:   {k:'🎫',name:'Kaji on Toru',desc:'Kaji’s account. “Toru? Back when he was a student, he had a part-time job here, on the wheel. I taught him the lot — how to stop it, how to get up onto the machine house roof.”'},
  toruAlibi: {k:'🕓',name:'Toru’s Alibi',desc:'Noguchi’s account. “From four o’clock to half past, I was questioning Mr. Toru myself, in the office meeting room. At 16:14, when the wheel stopped, he was sitting right in front of me.”'},
  aloneInsist:{k:'🙅',name:'Riding Alone',desc:'Noguchi’s account. “When we told Mr. Asakura a detective would ride with him, he flatly refused. ‘The kidnapper said to ride alone. What if something happens to Minato?’ Mr. Asakura was the only one in gondola 7.”'},
  company:   {k:'💴',name:'Money Trouble',desc:'Toru’s account. “My brother’s company, Asakura Transport, has been in trouble since last year. He’s been going round the banks, bowing and scraping. I heard the 3,120,000 for the ransom came out of the company safe.”'},
  photo:     {k:'📷',name:'The 16:12 Photo',desc:'A telephoto shot Mori took at 16:12. Mr. Asakura stepping out of gondola 7. His coat hangs open, and his hands are empty. Through the window, the handle of the blue bag sticks out from under the seat. And the lid of the storage box under the seat is very slightly raised.'},
  stopLog:   {k:'🎛️',name:'The Control Panel Log',desc:'The log from the control panel in the booth. “16:14:05 MANUAL STOP (MAIN PANEL)” “16:17:10 RESTART (MAIN PANEL).” A wind stop would be logged “HIGH WIND STOP (AUTO)”; the emergency button on the platform would be logged “EMERGENCY STOP (PLATFORM).” The red lamp can be switched by hand. And the main panel is only inside the control booth.'},
  blindSpot: {k:'👁️',name:'Behind the Billboard',desc:'The spot where the detectives stood watching gondola 7 at 16:14. From here, the low part of the wheel to the right of the platform is hidden behind the big billboard on the machine house roof. When the wheel stopped, gondola 7 was right there, out of sight. It’s also where the gondolas pass close enough to touch the machine house roof.'},
  seatBox:   {k:'📦',name:'Under the Seat',desc:'The storage box under gondola 7’s seat, where the lap blankets are kept. The lid can be pushed open from inside too. Inside: a hollow in the blankets, the shape of someone curled up, and three wrappers from the park kiosk’s “strawberry drops.” Haru says Minato always has them in his pocket. A child could hide in there, curled up tight.'},
  tracker:   {k:'📡',name:'The Removed Tracker',desc:'A tracker Mori found under the floor mat of gondola 7. The police had clipped it inside the bag’s inner pocket. Because the signal never left the Ferris wheel, the detectives assumed the bag was still inside the gondola. The bag was opened inside the gondola.'},
  roofPrints:{k:'👟',name:'Footprints on the Roof',desc:'The machine house roof. In the dust behind the billboard, small sneaker prints — about 21 centimeters. They run straight from the railing, right where the gondolas pass, to the inspection hatch in the middle of the roof. Caught on the railing: blue synthetic fibers. There are no adult footprints.'},
  voiceToy:  {k:'🎙️',name:'Kaji’s Locker',desc:'In the staff room of the office building, in the locker marked “Kaji”: a children’s voice changer, a prize from the park’s game corner. On the inside of the door, today’s shift sheet. Kaji’s breaks: “13:55–14:10” and “15:25–15:40.” They match the times of the kidnapper’s calls exactly.'},
  ledger:    {k:'📒',name:'The Booking Ledger',desc:'The booking ledger in the office. “Sun., March 12, 17:00. Ferris wheel, private after closing, one turn. Mr. Kyosuke Asakura. *Son’s birthday.*” A line has been drawn through it: “3/10 Cancelled by Mr. Asakura.” In the “taken by” column: Kaji’s seal.'},
  quarrel:   {k:'🌙',name:'Friday Night',desc:'Haru’s account. “On Friday night, the young master quarreled with Mr. Asakura because he hadn’t come to the school play... ‘I hate you, Papa. Even on my birthday, being with you is boring.’ Mr. Asakura went into his study without a word. On Saturday, the young master went to Shiomi Land by himself, and talked with Mr. Kaji from the Ferris wheel for a long time.”'},
}});

/* =========================================================
   Investigation phases: each refuted deduction advances the phase and opens up more evidence
   ========================================================= */
defCase('file07',{EV_PHASE:{
  callMemo:0, emptyGondola:0, stop3min:0, callLog:0, anemometer:0,
  debt:1, toruLeft:1, toruJob:1, toruAlibi:1,
  aloneInsist:2, company:2, photo:2,
  stopLog:3, blindSpot:3, seatBox:3, tracker:3, roofPrints:3, voiceToy:3, ledger:3, quarrel:3,
}});

/* =========================================================
   The clock until five (used by drawCaseClock / drawDusk in js/render/render.js)
   The investigation starts at 16:28. Each piece of evidence found lets time slip by (it never goes past 16:57)
   ========================================================= */
const f7Min=()=>S.flags.rescued?60:Math.min(57,28+Math.floor(S.ev.length*1.45));
defCase('file07',{clock(){
  const m=f7Min(), left=60-m;
  return {main:`16:${String(m).padStart(2,'0')}`,sub:left>0?`${left} min until 5:00`:'5:00',warn:left<=10,dusk:Math.min(1,(m-28)/32)};
}});
// Each refuted deduction, the sun sinks lower (shown as a band by checkPhase in js/game/progress.js)
defCase('file07',{phaseBand:{
  get 1(){return {title:CASE.clock().main,sub:'— Still no call from the kidnapper'};},
  get 2(){return {title:CASE.clock().main,sub:'— The western sky is turning red'};},
  get 3(){return {title:CASE.clock().main,sub:'— The closing announcement has begun'};},
}});
defCase('file07',{PHASE_MSG:{
  1:['Not someone outside. The calls came from the public phone inside the park. And the wheel didn’t stop because of the wind.',
     '...The kidnapper is here, inside the park.',
     'Minato’s uncle, Toru — apparently he’s in debt. And he went off alone just before Minato vanished. Talk to Toru, and to Haru in the office building. Kaji too.'],
  2:['Toru has an alibi. When the wheel stopped, he was in the office, right in front of Noguchi.',
     '...Who was it who rode gondola 7 alone, with the ransom?',
     'Ask Noguchi why Mr. Asakura insisted on riding alone. Toru should know about the company. And Mori photographed him getting off.'],
  3:['Not Mr. Asakura either. At 16:12, the bag was definitely under the seat.',
     '...Which means someone opened that bag up in the air. And yet no one should have been in gondola 7 after he got off.',
     'The control booth log, under gondola 7’s seat, the spot where we stood watching, the machine house roof. The staff room and the booking ledger in the office. And talk to Haru and Mori again.'],
}});
// Takizawa's lines while the final deduction is being checked (used by talkTakizawa in common.js)
defCase('file07',{finalOpen:[
  'Back up every claim in Deduction ④ with evidence. Use the Case Board [B].',
  '...Before five o’clock.',
]});

defCase('file07',{EVHINT:{
  callMemo:'The kidnapper’s calls were recorded in the office meeting room. Go and listen again. The office is through the gate at the bottom of the plaza.',
  emptyGondola:'Gondola 7 first. It’s stopped at the boarding platform.',
  stop3min:'Ask Mori, on the platform, about when the wheel stopped.',
  callLog:'Noguchi in the office has asked the phone company where the calls came from.',
  anemometer:'Did the wind really stop it? There should be a wind record in the control booth.',
  debt:'Ask Toru about money. ...It might have something to do with the ransom amount.',
  toruLeft:'Where was Toru before Minato disappeared? Ask Haru — she was with them.',
  toruJob:'Toru knows this park oddly well. Ask Kaji about the old days.',
  toruAlibi:'Where was Toru at 16:14, when the wheel stopped? Ask Noguchi in the office.',
  aloneInsist:'Why did Mr. Asakura ride alone? Noguchi in the office was there at the time.',
  company:'Ask Toru about Mr. Asakura’s company.',
  photo:'Mori took a telephoto shot of Mr. Asakura getting out of gondola 7. Ask to see it.',
  stopLog:'There should be a record of the stop on the control panel in the booth.',
  blindSpot:'Where were we standing at 16:14, watching gondola 7? Go and stand on that spot in the plaza.',
  seatBox:'Search gondola 7 again. Under the seat, too.',
  tracker:'We put a tracker in the bag. Mori’s going back over the inside of the gondola.',
  roofPrints:'The machine house roof. You can climb the ladder on the right. With the sun this low, you might see something now.',
  voiceToy:'The kidnapper disguised their voice. There are staff lockers in the office building’s staff room.',
  ledger:'Why did the kidnapper say “five o’clock”? There’s a booking ledger for the wheel in the office.',
  quarrel:'Did something happen between Minato and his father? Ask Haru again.',
}});
