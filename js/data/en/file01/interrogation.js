/* Data: FILE.01 interrogation questions and seating (English) */
'use strict';

// Kashiwagi doesn't lie. He neither denies nor evades — he only asks questions that demand proof.
// The player answers them one at a time with evidence.
defCase('file01',{ROUNDS:[
  {stmt:'You want to say I went out into the garden last night... Why do you say that?',ans:['footprint'],
   win:[[ME,'After the rain stopped at 22:00, someone left footprints running from below the study window to the back door.'],
        [ME,'Right next to the back door is your room. And the prints are size 26 cm leather shoes — the same size as yours.'],
        ['Kashiwagi','...Yes. I did go out into the garden last night.']]},
  {stmt:'The garden is large. That I was under the study window... how would you know that?',ans:['button'],
   win:[[ME,'This was in the shrubs directly below the study window. A cufflink engraved with the initial “K.”'],
        ['Okochi','Mr. Kashiwagi. Looks like your right cuff is missing a link.'],
        ['Kashiwagi','...It’s mine.']]},
  {stmt:'I heard the study’s door and window were both locked from inside. ...Then how did anyone inside get out?',ans:['thread','scratch'],
   win:[[ME,'Under the window was a fishing line with a loop at the end. And on the frame, a fresh scratch where a line had rubbed.'],
        [ME,'You climb out the window, hook the crescent latch with the line, and pull it shut. — The locked room was made from outside.'],
        ['Kashiwagi','.........']]},
  {stmt:'The master was always so good to me. ...Why would I, of all people, hurt him?',ans:['ledger'],
   win:[[ME,'This ledger was in the study desk. Altered figures circled in red. And a note: “Question Kashiwagi about this.”'],
        [ME,'Last night, he confronted you about the ledger. Didn’t he?'],
        ['Kashiwagi','...Yes.']]},
]});

defCase('file01',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.kashiwagi,dir:'down',label:'Kashiwagi',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
