/* Data: FILE.01 deductions (English) */
'use strict';

/* =========================================================
   Deductions (assembled in order as the evidence comes together)
   truth:true  → "cross-check" with supporting evidence
   truth:false → "cross-check" with contradicting evidence (refutes the deduction)
   ========================================================= */
defCase('file01',{HYPS:[
  {id:'h1',no:'1',title:'An Accident',requires:['key','window','body'],
   summary:'The master entered the study alone and locked the door from inside. Later he lost his footing, struck his head on the corner of the fireplace, and died.',
   hint:'Was the master really alone? Did he really just fall? Check that against the evidence.',
   claims:[
     {t:'The door and window were both locked from the inside',truth:true,ev:['key','window','door'],why:'The door was locked from inside, the key was in the room, and the window was latched. It was a locked room, no question.'},
     {t:'The master was alone in the study last night',truth:false,ev:['cup'],why:'There were two cups on the table. The master was with someone last night!'},
     {t:'He died after hitting his head on the corner of the fireplace',truth:false,ev:['statue'],why:'The wound matches the round base of the bronze statue — not the corner of the fireplace!'},
   ]},
  {id:'h2',no:'2',title:'The Visitor Did It',requires:['cup','statue'],
   summary:'A visitor drinking tea with the master struck him with the bronze statue, left by the door, locked it from outside, and slid the key back into the room through the gap under the door.',
   hint:'“Slid the key back through the gap under the door”... Was there even a gap?',
   claims:[
     {t:'The master was having tea with a visitor',truth:true,ev:['cup'],why:'Two cups. There was definitely a visitor.'},
     {t:'The weapon was the bronze statue under the bookcase',truth:true,ev:['statue','body'],why:'The blood on the base and the shape of the wound match. The statue was the weapon.'},
     {t:'The culprit left by the door and slid the key back inside',truth:false,ev:['door'],why:'There’s no gap between the door and the floor. The key couldn’t have been returned from outside!'},
   ]},
  {id:'h3',no:'3',title:'The Window-and-Line Trick',requires:['thread','scratch'],
   summary:'The culprit climbed out the window into the garden and used fishing line to fasten the crescent latch from outside, then crossed the garden and fled through the gate.',
   hint:'If it was an outsider, they’d have used the gate, or left footprints heading out.',
   claims:[
     {t:'The culprit left through the window into the garden',truth:true,ev:['scratch','footprint','thread'],why:'The scratch on the frame, the line and footprints below the window. The culprit went out the window.'},
     {t:'The latch was fastened from outside using a line',truth:true,ev:['thread','scratch'],why:'A fishing line with a loop, and a line-shaped scratch on the frame. The latch was fastened from outside.'},
     {t:'The culprit was an outsider who fled through the gate',truth:false,ev:['footprint','gate'],why:'The footprints lead to the back door, not the gate — and the gate was shut all night. The culprit is inside the manor!'},
   ]},
  {id:'h4',no:'4',title:'An Inside Job',requires:['footprint','button','ledger','rain'],final:true,
   summary:'Confronted about the doctored ledger, the secretary Kashiwagi struck the master with the bronze statue. He climbed out the window, fastened the latch with a line, and crossed the rain-soaked garden back into the manor through the back door.',
   claims:[
     {t:'The culprit is someone inside the manor who came back through the back door',truth:true,ev:['footprint','gate'],why:'The footprints lead to the back door, and no one passed through the gate. The culprit is someone inside the manor.'},
     {t:'The culprit went into the garden after the rain stopped at 22:00',truth:true,ev:['rain'],why:'The rain stopped at 22:00. Since the footprints weren’t washed away, it was after 22:00.'},
     {t:'The window was locked from outside using a line',truth:true,ev:['thread','scratch'],why:'A looped fishing line and a scratch on the frame. The locked room was made from outside.'},
     {t:'The culprit had a motive: the doctored ledger',truth:true,ev:['ledger'],why:'The ledger shows signs of tampering, with a note: “Question Kashiwagi about this.”'},
     {t:'The culprit’s initial is “K”',truth:true,ev:['button'],why:'The cufflink under the window is engraved “K.” — K for Kashiwagi.'},
   ]},
]});
