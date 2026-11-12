/* Data: FILE.08 deductions (English) */
'use strict';

/* =========================================================
   Deductions (assembled in order as evidence comes together)
   ① not from outside (no bug, no peeking through the window) ② not from the minutes (words not in the minutes)
   ③ not someone at the table (the letters were written by ear) → ④ who, and how
   ========================================================= */
defCase('file08',{HYPS:[
  {id:'h1',no:'①',title:'The Outsider Theory',requires:['article','window','phoneBox'],
   summary:'An industrial spy, working for some company that wants Narumi Pen’s partnership to fail. Either they planted a bug in the boardroom, or they read lips through the window from the café in the office block across the street. Then they turned what they stole into anonymous letters and leaked them to the trade paper.',
   hint:'If it’s a professional, that makes things simple. ...But was there really a bug in this room? Could anyone see the meeting from outside?',
   claims:[
     {t:'What was said at the board meetings appeared word for word in the trade paper the next morning',truth:true,ev:['article'],why:'All three letters ran the morning after a Thursday board meeting, with what was said set down exactly.'},
     {t:'Nobody inside the boardroom recorded the meeting and leaked it',truth:true,ev:['phoneBox'],why:'Everyone leaves their phone in the box at the door. Only paper and pens go into the room.'},
     {t:'The boardroom table can be seen from the building across the street',truth:true,ev:['window'],why:'Six meters across the street. From the café’s window seats, you can see the whole table.'},
     {t:'A bug was planted in the boardroom',truth:false,ev:['sweep'],why:'Mori swept everything from the lights and sockets to the inside of the fireplace. Nothing that gives off a signal!'},
     {t:'Someone read the meeting through the window from across the street',truth:false,ev:['curtain'],why:'The blackout curtains stay closed for the whole meeting. No one outside can see in!'},
   ]},
  {id:'h2',no:'②',title:'The Secretary Theory',requires:['minutes','card'],
   summary:'The one who records the board’s words most exactly is the secretary who keeps the minutes: Mizuhara. And Mizuhara has been courted by Narumi’s rival, Sankyo Pen. After each meeting, she wrote a letter from the minutes and dropped it in the newspaper’s mailbox. If Narumi’s partnership collapses, that’s a fine gift to bring to Sankyo.',
   hint:'The one who writes the minutes knows everything that was said. ...But were the letters really written from the minutes?',
   claims:[
     {t:'Mizuhara, the secretary, writes the minutes of the board meetings',truth:true,ev:['minutes'],why:'Mizuhara takes them down at the table, writes them up clean, and keeps them in the safe in the president’s office.'},
     {t:'Mizuhara has been approached by the rival Sankyo Pen',truth:true,ev:['card'],why:'Under the pen tray on her desk: a card from “Sankyo Pen — Human Resources.” On the back, “Do let’s talk.”'},
     {t:'The letters were written from the minutes',truth:false,ev:['diff1'],why:'The second letter carries words of the president’s that aren’t in the minutes — spoken in the ten minutes Mizuhara was out of the room. They couldn’t have come from the minutes!'},
   ]},
  {id:'h3',no:'③',title:'The Managing Director Theory',requires:['oppose','stall'],
   summary:'Kusumi, the managing director, has opposed the Daito partnership from the start. His name isn’t on the board list for after the merger. Leak what was said at the table, word for word, and Daito pulls out. Sure enough, every time a letter came out, the talks stalled.',
   hint:'If the deal falls through, Kusumi gains the most. ...But was the letter writer really someone sitting at that table?',
   claims:[
     {t:'Managing Director Kusumi opposes the partnership',truth:true,ev:['oppose'],why:'His name isn’t on the board list for after the merger. He knows it.'},
     {t:'Every time a letter came out, the talks with Daito stalled',truth:true,ev:['stall'],why:'All three times, Daito’s head office halted the negotiations.'},
     {t:'Managing Director Kusumi wrote the letters',truth:false,ev:['diff2'],why:'The letter spells “Daito” as “Daytoe,” and writes Kusumi’s own phrase, “cost center,” as “cost sender.” That’s someone who never saw the words, only heard them!'},
   ]},
  {id:'h4',no:'④',title:'The Tatsumi Theory',requires:['pipeRoom','pipeShop','plan','wheelStop','paper','shihoJo','guardLog','seat','verdigris'],final:true,
   summary:'The boardroom on the second floor was once the founder’s office. From there, a speaking tube laid in the company’s first days still runs down to the nib workshop out back. A month ago, the chairman opened the boardroom end of the tube, closed for thirty years. On Thursday afternoons, during board meetings, Tatsumi, the workshop’s master, had the grinding wheels shut off and listened to the meetings with his ear to the tube. He wrote down what he heard on test-writing paper and dropped it in the Stationery Herald’s mailbox.',
   claims:[
     {t:'The voices of the meeting went straight down the speaking tube to the workshop',truth:true,ev:['pipeRoom','pipeShop','plan'],why:'The 1956 plan says “speaking tube.” One mouth above the boardroom fireplace, one behind the workshop’s tool shelf. Both caps open.'},
     {t:'On Thursday afternoons, during board meetings, the workshop’s grinding wheels were shut off',truth:true,ev:['wheelStop'],why:'A month ago, Tatsumi started saying “Thursday afternoons, we grind by hand.” With the wheels off, he shut himself away behind the tool shelf.'},
     {t:'The letters were written on the workshop’s test-writing paper',truth:true,ev:['paper'],why:'Ruled white paper for trying out nibs — the same as the letters. The same blue-black ink.'},
     {t:'Tatsumi from the nib workshop wrote the letters',truth:true,ev:['shihoJo'],why:'The letter calls the president “little Miss Shiho.” Only Tatsumi calls her that.'},
     {t:'Tatsumi never went into the boardroom',truth:true,ev:['guardLog'],why:'The only way into the main building is past the guard’s window. Tatsumi hasn’t set foot inside in ten years.'},
     {t:'The chairman opened the cap in the boardroom',truth:true,ev:['verdigris','seat'],why:'Brass rust — verdigris — on the fingertips of the chairman’s white gloves. And a month ago, he moved to the seat at the fireplace end.'},
   ]},
]});
