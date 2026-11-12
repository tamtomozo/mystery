/* Data: FILE.07 interrogation questions and layout (English) */
'use strict';

// Kaji is covering for Minato and tries to take all the blame himself. Break each of his "lies" with evidence.
defCase('file07',{ROUNDS:[
  {stmt:'The wind stopped it. Happens all the time, by the sea.',ans:['stopLog','anemometer'],
   win:[[ME,'At 16:14 the wind was about 3 meters per second. The wheel only stops by itself at 15.'],
        [ME,'The panel log says “MANUAL STOP (MAIN PANEL).” And the red lamp had been switched to HIGH WIND STOP by hand.'],
        ['Kaji','.........']]},
  {stmt:'Phone calls? Don’t know a thing. I never left my post.',ans:['voiceToy'],
   win:[[ME,'The kidnapper called at 14:02 and 15:32. Both from the public phone beside the platform.'],
        [ME,'Your breaks started at 13:55 and 15:25. And in your locker, there was a prize voice changer.'],
        ['Kaji','...Leftover from the game corner, that’s all.']]},
  {stmt:'...All right, fine. I took the boy, and I took the bag myself. There. Happy?',ans:['seatBox','tracker'],
   win:[[ME,'At 16:14 and again at 16:17, you were at the main panel inside the control booth. You had no time to get onto that roof.'],
        [ME,'The bag was opened in midair, inside gondola 7. The tracker was left under the floor mat.'],
        [ME,'And in the box under the seat: the hollow where a child had curled up, and wrappers from Minato’s strawberry drops. ...It was Minato who opened that bag.'],
        ['Kaji','.........']]},
  {stmt:'The boy was scared stiff, crying. I dragged him off the roof into the machine room.',ans:['roofPrints'],
   win:[[ME,'The only footprints on the roof were 21-centimeter sneakers. Straight from the railing to the hatch. No hesitating, no stumbling.'],
        [ME,'There isn’t a single adult footprint up there. ...Minato walked there on his own.'],
        ['Okochi','Those aren’t the prints of a kid being dragged anywhere.'],
        ['Kaji','.........']]},
  {stmt:'...I wanted the money. That’s all. Just an old man after cash.',ans:['ledger','quarrel'],
   win:[[ME,'The bag in the machine room still held all 3,120,000 yen. Untouched.'],
        [ME,'And the booking ledger in the office. “March 12, 17:00, private after closing. Mr. Kyosuke Asakura. Son’s birthday.” You took the booking, and you took the cancellation.'],
        [ME,'On Friday night, Minato and his father quarreled. On Saturday, Minato came here on his own, to see you.'],
        [ME,'“At five o’clock, I’ll tell you where he is.” ...You meant to bring the two of them together on the wheel at five, didn’t you?'],
        ['Kaji','.........']]},
]});

defCase('file07',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.kaji,dir:'down',label:'Kaji',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
