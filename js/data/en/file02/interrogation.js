/* Data: FILE.02 interrogation questions and seating (English) */
'use strict';

// Hayase doesn't lie. She neither denies nor evades — she only asks questions that demand proof.
defCase('file02',{ROUNDS:[
  {stmt:'Last night, the only person who entered the gallery was the Director. ...That’s what the entrance camera shows, isn’t it?',ans:['flower'],
   win:[[ME,'The 20:12 footage doesn’t show the flower stand that should be beside the entrance.'],
        [ME,'The flowers arrived at 19:30. You can be seen setting them up in the 19:32 footage. ...The footage from the 20:00s is from before the flowers arrived — the night before.'],
        ['Hayase','...Yes. It’s footage from the same time, the night before.']]},
  {stmt:'To swap the recording, I’d have to go into the security office. ...Wasn’t Mr. Iwata there?',ans:['patrol'],
   win:[[ME,'Mr. Iwata was on patrol from 20:00 to 20:35. The third-floor checkpoints recorded it.'],
        [ME,'The whole time, the security office was empty. The recorder and the maintenance key were both within your reach.'],
        ['Hayase','...Yes.']]},
  {stmt:'Then during that time... where are you saying I was?',ans:['pc'],
   win:[[ME,'Your computer wasn’t touched from 20:06 until 20:41.'],
        [ME,'Thirty-six minutes. You weren’t in the curators’ office.'],
        ['Hayase','.........']]},
  {stmt:'The fake in the case. ...Where do you say I got it?',ans:['order'],
   win:[[ME,'This is the replica order form. Besides the 20 for the shop, there was one spare. You were in charge of it, and it was kept in the curators’ office.'],
        [ME,'That spare’s box was empty.'],
        ['Hayase','...It was in my keeping.']]},
  {stmt:'Mr. Iwata checked my bag when I left. ...So where is the real one, then?',ans:['real'],
   win:[[ME,'In the museum shop display. There should have been 20 replicas, but there were 21.'],
        [ME,'Among them, just one weighed 38.2 grams — the real Azure Drop.'],
        ['Okochi','Hide a tree in a forest, huh. ...You never meant to take it out of the museum at all.'],
        ['Hayase','.........Yes.']]},
]});

defCase('file02',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.hayase,dir:'down',label:'Hayase',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
