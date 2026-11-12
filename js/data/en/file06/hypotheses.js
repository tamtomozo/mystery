/* Data: FILE.06 deductions (English) */
'use strict';

/* =========================================================
   Deductions (assembled in order as evidence comes together)
   ① not someone outside (power and lock were inside) ② not Mashiba (a delay costs him)
   ③ not Akari (the blackout stopped her own screening) → ④ who, and why
   ========================================================= */
defCase('file06',{HYPS:[
  {id:'h1',no:'①',title:'The Outsider Theory',requires:['shutter','padlock','petition'],
   summary:'The shopping street was full of regulars who opposed the Ginseiza’s closing. On the night of the last screening, one of them cut the building’s power from outside. The fire shutter dropped in the blackout, and the emergency exit was blocked from outside too. Spite, from someone who couldn’t stop the closing.',
   hint:'There’s no shortage of people angry about the closing. ...But where was the power actually cut?',
   claims:[
     {t:'Many regulars opposed the closing',truth:true,ev:['petition'],why:'The “Save the Ginseiza” petition topped three thousand signatures, with notes like “We won’t let it close.”'},
     {t:'The fire shutter is down, and there’s no way out the front',truth:true,ev:['shutter'],why:'The old shutter, which closes automatically in a power cut, is all the way down.'},
     {t:'Someone cut the building’s power from outside',truth:false,ev:['breaker'],why:'The main breaker lever was pushed all the way to OFF by hand — and the panel is only in the machine room, in the wing of the stage. The power was cut from inside!'},
     {t:'The emergency exit was blocked from outside, too',truth:false,ev:['padlock'],why:'The combination lock was put on from the inside of the door, the auditorium side. Whoever locked it was in here!'},
   ]},
  {id:'h2',no:'②',title:'The Mashiba Theory',requires:['contract','mashibaOut'],
   summary:'Mashiba of the real estate company was due to receive the Ginseiza’s keys at midnight. If the handover ran late, Yaeko, the seller, would owe a penalty. At 22:15, using his cigarettes as an excuse, Mashiba left his seat, locked the emergency exit, and threw the breaker in the machine room.',
   hint:'A penalty, huh. ...But does Mashiba’s company really come out ahead if the handover runs late?',
   claims:[
     {t:'Mashiba was due to receive the keys at midnight',truth:true,ev:['contract'],why:'The contract says: “Handover: 0:00 on the day after closing, upon delivery of the keys.”'},
     {t:'If the handover is late, Yaeko pays a penalty',truth:true,ev:['contract'],why:'“Should the handover be delayed for reasons on the seller’s side, the seller shall pay ¥300,000 per day.”'},
     {t:'Mashiba left his seat before the blackout',truth:true,ev:['mashibaOut'],why:'Around 22:15, he left the auditorium holding his cigarettes. He wasn’t in his seat when the power went.'},
     {t:'Delaying the handover benefits Mashiba’s company',truth:false,ev:['schedule'],why:'Machinery and a crew of twenty arrive at 7 a.m. Every day the work is held up costs his company nearly a million yen. A ¥300,000 penalty doesn’t come close!'},
   ]},
  {id:'h3',no:'③',title:'The Akari Theory',requires:['akariSkill','akariOut'],
   summary:'Three thousand signatures couldn’t stop the closing. So the owner’s granddaughter, Akari, decided to stop the handover night itself. At 22:20 she left her seat for the lobby, then doubled back along the dark edge of the auditorium to the machine room. Knowing her way around projection equipment, she threw the breaker and shut everyone in until morning.',
   hint:'Akari has every reason to want the closing stopped. ...But was she really in the machine room when the power went?',
   claims:[
     {t:'Akari organized the petition against the closing',truth:true,ev:['petition'],why:'The organizer of “Save the Ginseiza” is Akari Hoshino.'},
     {t:'Akari knows how to run a projector',truth:true,ev:['akariSkill'],why:'She works in film and video in Tokyo, and learned film projection at vocational school.'},
     {t:'Akari had left her seat before the blackout',truth:true,ev:['akariOut'],why:'Around 22:20, Mashiba saw her heading to the back of the lobby, holding something flat and round.'},
     {t:'Akari threw the breaker to stop the handover',truth:false,ev:['projector16','akariPlan'],why:'When the power died, Akari was in the projection room, switching on the lamp of the 16mm projector. Cutting the power would have killed her own screening!'},
   ]},
  {id:'h4',no:'④',title:'The Goda Theory',requires:['boothEmpty','bikelock','handle','phoneCut','panelKey','can','logbook','refusal'],final:true,
   summary:'Goda the projectionist wanted Yaeko to see the 16mm film left behind by her late husband, Minoru. But Yaeko said “I won’t,” and declared she’d hand back the keys after the screening and never come again. In the middle of the last screening, Goda left the 35mm running and slipped out of the booth. He cut the payphone line, chained the emergency exit with his bicycle lock, and, just before the reel change, threw the main breaker in the machine room. So that no one could leave before dawn.',
   claims:[
     {t:'The blackout was caused by a key holder throwing the main breaker by hand',truth:true,ev:['breaker','panelKey'],why:'The lever was pushed to OFF by hand, and the panel is padlocked. There are only two keys: one in the safe at Yaeko’s house, the other on Goda’s key ring.'},
     {t:'Goda was away from the projection room when the power went',truth:true,ev:['boothEmpty'],why:'When Akari walked into the booth at 22:20, Goda wasn’t there. The 35mm was running on its own, ten minutes from the changeover.'},
     {t:'The lock on the emergency exit is Goda’s bicycle lock',truth:true,ev:['bikelock'],why:'The hook under “Goda” in the staff room is empty. The red combination lock he always hangs there is the same make and color as the one on the exit.'},
     {t:'The payphone line was cut with the projection room scissors',truth:true,ev:['phoneCut'],why:'A straight cut with black projector oil on it. The scissors for cutting film are on the projection room workbench.'},
     {t:'The shutter crank was hidden in the projection room',truth:true,ev:['handle'],why:'It was stuffed into a can marked “SCREENED” on the projection room shelf.'},
     {t:'Goda had a reason to keep Yaeko from leaving before dawn',truth:true,ev:['can','logbook','refusal'],why:'Minoru’s can: “On the day we close, watch this together with Yaeko.” Yaeko’s answer: “I won’t.” And the last line of the projection log: “I’ll run it at dawn.”'},
   ]},
]});
