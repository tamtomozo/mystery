/* Data: FILE.09 interrogation questions and staging (English) */
'use strict';

// Gondo, shielding Hinata, tries to make it all his own "theft." Knock down each lie, one piece of evidence at a time.
defCase('file09',{ROUNDS:[
  {stmt:'I hate dogs. The howling at night drove me mad — I’m the one who complained. Walk that dog? Not on your life.',ans:['treats','haruWalk'],
   win:[[ME,'In the toolbox on your veranda: chicken dog treats, and a well-worn red leash. The same treats Kiyo used to give Mugi.'],
        [ME,'And for the past year, someone has walked Mugi to the top of the hill every morning at half past five. Mrs. Matsui at the tofu shop saw them. So did Segawa, the paperboy.'],
        ['Okochi','Pretty dutiful walking, for a man who hates dogs.'],
        ['Gondo','...']]},
  {stmt:'That morning I was in bed. The car next door woke me, I went back to sleep. That’s all.',ans:['bench','bike'],
   win:[[ME,'At the foot of the bench on the hill: Mugi’s bell, and the hollow where a dog lay. Beside them, big rubber-boot prints and a bicycle’s tire tracks.'],
        [ME,'At 6:04, a bicycle with something brown in its basket crossed Miharashi Bridge. Mr. Omori passed it on his way back from the market.'],
        [ME,'On her own legs, Mugi couldn’t get from the hilltop to the bridge in five minutes. ...You carried her, on your bicycle.'],
        ['Gondo','...']]},
  {stmt:'The back gate? ...Aye. I forced it from outside with a bit of wire.',ans:['latch','diary'],
   win:[[ME,'The latch is on the yard side only. There’s no gap to reach in from outside, and no sign it was forced.'],
        [ME,'It was Hinata who undid the latch. “Grandma comes to take Mugi for her walk. So before bed, I undo the latch.”'],
        [ME,'Nearly every night for a year. ...You knew that. And you’re protecting her.'],
        ['Gondo','...The child’s got nothing to do with it.','sad']]},
  {stmt:'I gave the dog to an acquaintance. Far away. ...She won’t be back.',ans:['clinic'],
   win:[[ME,'Ashida Animal Hospital, across the river. At 6:07 on Saturday morning, a Shiba with a heart attack was brought in. By “Gondo.”'],
        [ME,'Mugi is still there, in the back. And you sat in the waiting room all morning.'],
        ['Okochi','An acquaintance far away, eh. ...Across the river is five minutes by bike.'],
        ['Gondo','...']]},
  {stmt:'I wanted to take that dog away from the Kasugas. ...That’s all.',ans:['satooya'],
   win:[[ME,'Tomorrow at ten, Mugi was going to be collected by a foster family in the next prefecture.'],
        [ME,'Fourteen, and blind. In a strange town, in a house with none of Kiyo’s smell. ...And her heart had only just given out.'],
        [ME,'You didn’t want to take her away from anyone. You just couldn’t let her be taken off this hill.'],
        ['Gondo','...']]},
]});

defCase('file09',{INTERRO_ACTORS:[
  {x:10,y:5.2,look:LOOK.gondo,dir:'down',label:'Gondo',suspect:true},
  {x:12.7,y:7.3,look:LOOK.okochi,dir:'left',label:'Okochi'},
  {x:10,y:8.95,look:LOOK.player,dir:'up',label:ME},
]});
