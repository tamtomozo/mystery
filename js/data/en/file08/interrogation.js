/* Data: FILE.08 interrogation questions and layout (English) */
'use strict';

// Tatsumi covers for the chairman, trying to make it all his own doing. Break each “lie” with evidence, one by one.
defCase('file08',{ROUNDS:[
  {stmt:'From morning till night, my workshop roars with grinding wheels. You think I could hear people talking upstairs?',ans:['wheelStop','pipeShop'],
   win:[[ME,'For a month now, Thursday afternoons have been “hand-grinding day.” From two to three, during the board meeting, the wheels were shut off. And it was your idea.'],
        [ME,'Behind the tool shelf is the mouth of a speaking tube. Its cap open, a cushion and an apron in front of it. ...Put your ear to it, and you can hear upstairs clearly.'],
        ['Tatsumi','...']]},
  {stmt:'Letters? Don’t know anything about them. I hardly write a word.',ans:['paper','shihoJo'],
   win:[[ME,'The letters were written on the workshop’s test-writing paper. In the same blue-black ink as on the test-writing stand.'],
        [ME,'And the letters call the president “little Miss Shiho.” You’re the only one who calls her that.'],
        ['Okochi','A nib grinder’s hand, this. ...Neat writing, the kind you use to test a nib.'],
        ['Tatsumi','...']]},
  {stmt:'...All right, then. I snuck into the boardroom one night and opened the cap myself.',ans:['guardLog'],
   win:[[ME,'The only way into the main building is past the guard’s window.'],
        [ME,'By the guard’s log, you haven’t set foot in the main building once in ten years. “The master won’t cross the threshold,” he said.'],
        [ME,'You couldn’t have opened that cap.'],
        ['Tatsumi','...']]},
  {stmt:'The chairman knows nothing. He’s deaf as a post — he can’t hear a word of those meetings.',ans:['verdigris','seat'],
   win:[[ME,'There was verdigris on the fingertips of the chairman’s white gloves. And a white cotton thread caught on the cap’s wing screw.'],
        [ME,'And a month ago, the chairman gave up his seat by the window and moved to the fireplace end. “I can hear better here,” he said.'],
        [ME,'It was the chairman who opened the cap, closed for thirty years.'],
        ['Tatsumi','...Shuzo, you old fool.','sad']]},
  {stmt:'Little miss sold out the workshop. I couldn’t forgive her for it. ...That’s all.',ans:['diff1','minutes'],
   win:[[ME,'At the second meeting, in the ten minutes Ms. Mizuhara was out of the room, the president said this.'],
        [ME,'“If it means losing the nib workshop, then this deal never happened.” ...Words that aren’t in the minutes.'],
        [ME,'Your letter printed those words without cutting a single one. In all three letters, every word the president said is there.'],
        [ME,'It wasn’t that you couldn’t forgive her. You wanted to carry her voice out into the world.'],
        ['Tatsumi','...']]},
]});

defCase('file08',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.tatsumi,dir:'down',label:'Tatsumi',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
