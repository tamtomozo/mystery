/* Data: FILE.07 deductions (English) */
'use strict';

/* =========================================================
   Deductions (assembled in order as evidence comes together)
   ① not someone outside (the calls and the stop came from inside) ② not Toru (alibi)
   ③ not Mr. Asakura (the bag was under the seat) → ④ who, and how
   ========================================================= */
defCase('file07',{HYPS:[
  {id:'h1',no:'①',title:'The Outsider Theory',requires:['callMemo','emptyGondola','stop3min'],
   summary:'A kidnapper out for ransom gave his orders by phone from outside the park. At 16:14, a strong wind off the sea stopped the Ferris wheel. While gondola 7 was hidden behind the billboard on the machine house, the kidnapper climbed the ladder to the roof, took the bag from the gondola, and escaped over the fence on the sea side.',
   hint:'If it’s a professional, that makes things simple. ...But where did those calls come from? And did the wind really stop the wheel?',
   claims:[
     {t:'The kidnapper told them to put the money in gondola 7 and send it round again',truth:true,ev:['callMemo'],why:'The 15:32 call. “Leave the bag under the seat and get off. Then let the gondola go round once more.”'},
     {t:'When gondola 7 came back round, the bag was gone',truth:true,ev:['emptyGondola'],why:'The latch was still fastened from outside. Only the bag under the seat had vanished.'},
     {t:'The kidnapper called from outside the park',truth:false,ev:['callLog'],why:'Both calls were made inside the park, from the public phone beside the boarding platform. The kidnapper was inside!'},
     {t:'The Ferris wheel was stopped by a strong wind',truth:false,ev:['anemometer'],why:'It only stops by itself at 15 meters per second. At 16:14 the wind was about 3. No wind stopped that wheel!'},
   ]},
  {id:'h2',no:'②',title:'The Toru Theory',requires:['debt','toruLeft','toruJob'],
   summary:'Minato’s uncle, Toru, was being hounded to repay nearly three million yen. At half past one he went off “to make a call,” and snatched Minato in front of the merry-go-round. Toru had worked on the Ferris wheel as a student, so he knew how to stop it and how to get onto the machine house roof. At 16:14 he hit the emergency button on the platform, then took the bag from gondola 7 behind the billboard.',
   hint:'Debt, and he knows the place. ...But when the wheel stopped, was Toru actually free to move?',
   claims:[
     {t:'Toru owes almost exactly the ransom amount',truth:true,ev:['debt'],why:'The demand letter shows ¥2,980,000 outstanding, due March 15.'},
     {t:'Toru went off alone ten minutes before Minato vanished',truth:true,ev:['toruLeft'],why:'Around half past one he said “I’m just going to make a call,” and didn’t come back until after the lost-child announcement.'},
     {t:'Toru knows how to stop the Ferris wheel',truth:true,ev:['toruJob'],why:'He worked on the wheel here as a student, and was taught how to stop it and how to get up on the roof.'},
     {t:'At 16:14, Toru stopped the wheel and took the bag',truth:false,ev:['toruAlibi'],why:'From four to half past, Toru was in the office meeting room being questioned by Noguchi. He couldn’t go near the wheel or the roof!'},
   ]},
  {id:'h3',no:'③',title:'The Asakura Theory',requires:['aloneInsist','company'],
   summary:'Asakura Transport has been struggling for money since last year. Its president, Kyosuke Asakura, faked his own son’s kidnapping and drew the ransom from the company safe. He refused to let a detective ride with him and boarded gondola 7 alone. He only pretended to leave the bag under the seat, and got off with it hidden under his coat. Gondola 7 went round again empty from the start. Minato is with someone he trusts.',
   hint:'The only one in gondola 7 was Mr. Asakura. ...But when he got off, was the bag really not under the seat?',
   claims:[
     {t:'Mr. Asakura refused a detective and rode gondola 7 alone',truth:true,ev:['aloneInsist'],why:'“The kidnapper said to ride alone.” He flatly refused to let a detective go with him.'},
     {t:'Mr. Asakura’s company was struggling for money',truth:true,ev:['company'],why:'Asakura Transport has been in trouble since last year, and the ransom came out of the company safe.'},
     {t:'Mr. Asakura got off with the bag hidden under his coat',truth:false,ev:['photo'],why:'The 16:12 photo: his coat is open and his hands are empty. Through the window, the handle of the bag shows under the seat. The bag stayed in gondola 7!'},
   ]},
  {id:'h4',no:'④',title:'The Kaji Theory',requires:['stopLog','blindSpot','seatBox','tracker','roofPrints','voiceToy','ledger','quarrel'],final:true,
   summary:'During his breaks, Ferris wheel operator Kaji demanded the ransom from the public phone in the park, using a voice changer. Before the handover, he hid Minato in the storage box under the seat of gondola 7. After Mr. Asakura got off, the bag was opened inside the gondola and the tracker removed. At 16:14, as gondola 7 slipped behind the machine house billboard, Kaji stopped the wheel from the control booth. Minato carried the bag onto the roof, and gondola 7 came back down empty. Five o’clock — the time of the birthday ride Mr. Asakura booked two weeks ago, then cancelled.',
   claims:[
     {t:'The Ferris wheel was stopped by hand, from the control booth',truth:true,ev:['stopLog','anemometer'],why:'The panel log says “MANUAL STOP (MAIN PANEL).” The main panel is only inside the booth, and the wind at 16:14 was about 3 meters.'},
     {t:'The kidnapper’s calls were made on Kaji’s breaks, with a voice changer',truth:true,ev:['voiceToy'],why:'A prize voice changer in Kaji’s locker. His breaks: 13:55–14:10 and 15:25–15:40. The calls: 14:02 and 15:32, from the phone beside the platform.'},
     {t:'Minato was hiding under the seat of gondola 7',truth:true,ev:['seatBox'],why:'In the blanket box, the hollow of a curled-up child, and wrappers from the strawberry drops Minato always carries.'},
     {t:'The bag was opened inside the gondola',truth:true,ev:['tracker'],why:'The tracker clipped inside the bag’s pocket was left under gondola 7’s floor mat.'},
     {t:'Behind the billboard, Minato carried the bag onto the machine house roof',truth:true,ev:['blindSpot','roofPrints'],why:'The billboard hides that spot from where we watched. On the roof: 21-cm sneaker prints from the railing to the hatch, and blue fibers.'},
     {t:'Kaji had a reason to bring Minato and his father together on the wheel at five',truth:true,ev:['ledger','quarrel'],why:'The ledger: “March 12, 17:00, private after closing. Mr. Kyosuke Asakura. Son’s birthday.” Cancelled after Friday night’s quarrel. The next day, Minato talked with Kaji for a long time.'},
   ]},
]});
