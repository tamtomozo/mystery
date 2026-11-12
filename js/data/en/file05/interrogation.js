/* Data: FILE.05 interrogation questions and layout (English) */
'use strict';

// Shirakawa never raises her voice. She turns each question back on you, the way she sets problems in class.
defCase('file05',{ROUNDS:[
  {stmt:'The Seven Mysteries are just children’s rumors. Not something grown-ups should take seriously.',ans:['speaker','sensor'],
   win:[[ME,'The 9 p.m. piano wasn’t a rumor. There was a speaker with a timer, deep inside the piano.'],
        [ME,'It started every night at 21:00, and Gen-san, searching for the source, was stuck outside the music room for nearly forty minutes.'],
        [ME,'The music room is at the far end of the north building. ...The farthest point from the schoolyard.'],
        ['Shirakawa','.........']]},
  {stmt:'Even if something was in the piano, anyone could have put it there. The music room isn’t locked during the day.',ans:['melody'],
   win:[[ME,'The recording on that speaker isn’t something you can buy. Children singing, and an audience coughing.'],
        [ME,'“The 77th Graduation Ceremony” — Tsukikagedai Elementary’s graduation, twenty-five years ago.'],
        [ME,'The only people who have that CD are that year’s five graduates.'],
        ['Shirakawa','...The accompanist for that “Furusato” was our music teacher back then. ...Lovely, isn’t it?']]},
  {stmt:'A will-o’-the-wisp? Yota must have imagined it. He loves the Seven Mysteries.',ans:['cellophane'],
   win:[[ME,'He didn’t imagine it. A circle of blue cellophane was caught in the hedge east of the stump.'],
        [ME,'It’s from Class 6-1’s science materials shelf. ...Only the blue sheet has a circle cut out of it.'],
        ['Okochi','...Taped over a headlamp, was it.'],
        ['Shirakawa','...The children really enjoyed the unit on light, you know.']]},
  {stmt:'If anyone knows where the capsule was, it’s Gen-san. He’s the one who buried it.',ans:['digs','boots'],
   win:[[ME,'That’s exactly why it wasn’t Gen-san. Around the stump, there were eleven refilled trial holes.'],
        [ME,'Whoever dug didn’t know the spot. And the soles of your rain boots carry red clay you’ll only find around that stump.'],
        ['Shirakawa','...All I remembered was “under the cherry tree.” It was such a big tree.']]},
  {stmt:'...Why would I need to dig up our own time capsule?',ans:['diary','bandage'],
   win:[[ME,'December, twenty-five years ago. A small fire in the old building’s science prep room. The school log says: “Genda’s careless cigarette.”'],
        [ME,'The next day, you came to school with your right hand bandaged. And you never talked about the Seven Mysteries again.'],
        [ME,'The day you wrote your capsule letters, you were the only one crying. The whole time.'],
        ['Shirakawa','.........'],
        ['Shirakawa','...Daichi remembered even that.']]},
]});

defCase('file05',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.shirakawa,dir:'down',label:'Shirakawa',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
