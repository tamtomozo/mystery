/* Data: FILE.04 interrogation questions and layout (English) */
'use strict';

// Takanashi won't lie. He has firm views on writing, and quietly asks you to “show him.”
defCase('file04',{ROUNDS:[
  {stmt:'That is a child’s writing, surely. Would someone who has held a brush for thirty-six years write like that?',ans:['line'],
   win:[[ME,'The shapes were broken on purpose. But the entries and the sweeps weren’t.'],
        [ME,'Ms. Miyauchi saw through it. “The line of someone who has held a brush for twenty years,” she said.'],
        ['Takanashi','...Ms. Miyauchi did. ...She has a sure eye.']]},
  {stmt:'There are plenty of experts at the school. Why me?',ans:['order'],
   win:[[ME,'The 必 in Letter #1. Where the ink overlaps, you can see the order the brush went.'],
        [ME,'It’s the stroke order Master Juho taught until thirty years ago. Of all his current pupils, only one has been there that long — you.'],
        ['Takanashi','...You can change the shape of a character as much as you like. But the order of the strokes... the hand remembers.']]},
  {stmt:'I heard the third letter was in Ms. Miyauchi’s handwriting.',ans:['overlay','tracing'],
   win:[[ME,'It isn’t her handwriting. Every character matches her works in the newsletter, to the hair.'],
        [ME,'And in the drawer of the light table in the master’s room was a newsletter with pencil outlines around exactly those characters. You gathered them and traced them.'],
        ['Okochi','...You tried to pin it on a fellow pupil?'],
        ['Takanashi','.........']]},
  {stmt:'Whoever wrote those letters, there is no writer’s name anywhere in them.',ans:['infrared','callname'],
   win:[[ME,'No name. But there was a form of address.'],
        [ME,'Under the blot in Letter #2: “Sensei’s.” The only one at the school who calls Master Juho plain “Sensei” is you.'],
        ['Takanashi','...I meant to write “your,” but my hand moved first. I’ve called him that for thirty-six years.']]},
  {stmt:'...And what reason would I have to threaten Sensei?',ans:['notebook'],
   win:[[ME,'Your practice book. Thirty years of copying — and on the page from two weeks ago, a single line.'],
        [ME,'“The inkstone, to Miyauchi.”'],
        ['Takanashi','.........'],
        ['Takanashi','...I saw it, you see.']]},
]});

defCase('file04',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.takanashi,dir:'down',label:'Takanashi',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
