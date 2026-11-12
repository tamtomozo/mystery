/* Data: FILE.06 interrogation questions and staging (English) */
'use strict';

// Goda says little and gives nothing. Short, flat answers that push you away.
defCase('file06',{ROUNDS:[
  {stmt:'Old place like this. Blackouts are nothing new.',ans:['breaker','panelKey'],
   win:[[ME,'If the breaker had tripped from a short or an overload, the lever would have stopped halfway. That lever was pushed all the way to OFF, by hand.'],
        [ME,'The breaker panel was padlocked. There are only two keys. One is in the safe at Yaeko’s house. The other — is on your key ring.'],
        ['Goda','.........']]},
  {stmt:'I was in the booth the whole time. A projectionist doesn’t leave his projector.',ans:['boothEmpty'],
   win:[[ME,'At 22:20, when Akari walked into the projection room, you weren’t there. The 35mm was running on its own.'],
        [ME,'Ten minutes to the changeover. The blackout came five minutes before it.'],
        ['Goda','...Akari was in there?'],
        ['Okochi','The man who never leaves the booth, left the booth. ...That says plenty on its own.']]},
  {stmt:'I don’t know anything about the lock on that exit. Don’t know whose it is.',ans:['bikelock'],
   win:[[ME,'In the staff room, the hook under your nameplate was empty. That’s where you always hang your red combination lock.'],
        [ME,'The lock on the emergency exit was a red combination lock too. The combination was 0412 — April 12, 1966. The day the Ginseiza opened.'],
        ['Goda','...I can’t remember numbers. Mine are all that one.']]},
  {stmt:'The phone’s dead because of the blackout, surely.',ans:['phoneCut'],
   win:[[ME,'A pink payphone draws its power from the phone line. It should have worked through a blackout.'],
        [ME,'The line was cut behind its stand. A straight cut, with black projector oil on it.'],
        ['Okochi','The film scissors in the booth, right? ...Same oil on the blades.'],
        ['Goda','.........']]},
  {stmt:'...And why would I do a thing like that?',ans:['can','logbook','refusal'],
   win:[[ME,'In the drawer of the booth workbench, there was a 16mm can. “On the day we close, watch this together with Yaeko. — Minoru.”'],
        [ME,'Last week, you asked Yaeko to watch it with you on closing day. And Yaeko said, “I won’t.”'],
        [ME,'Then there’s the last line of your projection log. “I’ll run it at dawn.”'],
        ['Goda','.........'],
        ['Goda','...That Akari. Doesn’t miss a thing.']]},
]});

defCase('file06',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.goda,dir:'down',label:'Goda',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
