/* Data: FILE.03 interrogation questions and seating (English) */
'use strict';

// Takizawa doesn't lie. Just as he taught the rookie, he throws out questions that say "show me the evidence."
defCase('file03',{ROUNDS:[
  {stmt:'First, the time. When did the pudding disappear? ...And I won’t accept “sometime before 15:00.”',ans:['komatsu2','mori'],
   win:[[ME,'At 13:30, Mori saw the pudding in the box.'],
        [ME,'And at 14:20, when Ms. Komatsu opened the fridge, the box was already empty. It vanished in those 50 minutes.'],
        ['Takizawa','...Yeah. Nicely narrowed down.']]},
  {stmt:'For those 50 minutes, I was out doing fieldwork. ...There shouldn’t be any record of my card entering the division.',ans:['guestcard'],
   win:[[ME,'That’s right. There’s no record for your card — because you went out and left it behind.'],
        [ME,'At 13:40, you borrowed Visitor Card 07 at the reception desk on the first floor. Two minutes later, Visitor Card 07 opened the division door.'],
        ['Takizawa','...The lending log, huh. I did write my name down.']]},
  {stmt:'Walking into the room doesn’t mean I ate anything. I just came back to write a report.',ans:['report'],
   win:[[ME,'That report. The FILE.02 report, handed in at 14:10. In the bottom right of page 3, there’s a brown stain.'],
        [ME,'Mori confirmed it. Burnt caramel with liqueur — the caramel from Miyako’s baked pudding.'],
        ['Okochi','...You ate my pudding on top of the report you were handing in to me?'],
        ['Takizawa','...So a drop fell, did it.']]},
  {stmt:'Then where’s the cup? It didn’t turn up in any trash in this room, did it?',ans:['memo','cup'],
   win:[[ME,'In the trash next to the vending machine on the roof. The place you always go to throw out your coffee cans.'],
        [ME,'The cup was wrapped in a torn notebook page. The patrol times at the Shirasagi Museum — in your handwriting.'],
        ['Takizawa','...Threw it out in the very place I taught you about, huh.']]},
  {stmt:'...So. Why would I go out of my way to touch Okochi’s pudding?',ans:['album'],
   win:[[ME,'This is the police academy yearbook from Mr. Okochi’s desk.'],
        [ME,'On the messages page, in your handwriting: “To Okochi — I’ll never forgive you for the dorm pudding.”'],
        ['Okochi','.........'],
        ['Takizawa','...That was thirty years ago.']]},
]});

defCase('file03',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.takizawa,dir:'down',label:'Takizawa',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
