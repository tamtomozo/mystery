/* Data: FILE.09 deductions (English) */
'use strict';

/* =========================================================
   Deductions (built in order as the evidence comes together)
   ① "Not an outsider (the gang was in custody; the dog at the station was another dog)" ② "Not the father (Mugi wasn't in his car)"
   ③ "Not Hinata (Mugi was carried across the river)" narrow it down, and ④ answers who, how, and why
   ========================================================= */
defCase('file09',{HYPS:[
  {id:'h1',no:'①',title:'The Outsider Theory',requires:['letter','theft','gate','sighting'],
   summary:'For the past month, pets have been going missing around Sakuragaoka. The culprits: a gang that cruises the town in a white van. At dawn on Saturday they opened the Kasugas’ back gate, slipped into the yard, and took Mugi. She broke free once at the station, but they caught her, put her in the van, and sold her on somewhere.',
   hint:'A professional gang would keep it simple. ...But was the dog that ran through the station really Mugi?',
   claims:[
     {t:'Mugi vanished from the yard at dawn on Saturday',truth:true,ev:['letter','gate'],why:'When Satomi found it at 6:20 on Saturday morning, the doghouse was empty. The leash was off the stake, and the back gate stood half open.'},
     {t:'Pets are being stolen around Sakuragaoka',truth:true,ev:['theft'],why:'Three in the past month. A white van was seen at every one.'},
     {t:'At dawn on Saturday, a Shiba and a white van were at the station',truth:true,ev:['sighting'],why:'At 5:50, a Shiba in a red collar tore across the station plaza, and then a white van pulled out.'},
     {t:'The gang took Mugi',truth:false,ev:['arrest'],why:'All three members of the gang were arrested on Friday night. At dawn on Saturday, every one of them was in a cell!'},
     {t:'The Shiba that ran through the station was Mugi',truth:false,ev:['otherDog'],why:'Mugi can’t run. The dog that tore through the station was Kotetsu from the liquor store — picked up at the station police box at 6:20!'},
   ]},
  {id:'h2',no:'②',title:'The Father Theory',requires:['satooya','dadWords','dawnCar'],
   summary:'Mugi was to go to a foster family in the next prefecture tomorrow morning. Her father, Kohei, didn’t want Hinata to see the goodbye. At dawn on Saturday, while Hinata slept, he took the car out alone, put Mugi in it, and delivered her to the foster family a day early.',
   hint:'Her father would know the gate and know how to handle Mugi. ...But was Mugi in that car that morning?',
   claims:[
     {t:'Mugi was to be handed to a foster family tomorrow',truth:true,ev:['satooya'],why:'Through the rescue group Tail House, a foster family from the next prefecture is coming at 10 a.m. tomorrow.'},
     {t:'Kohei didn’t want Hinata to see the goodbye',truth:true,ev:['dadWords'],why:'He told his wife, “Let’s have them take Mugi while Hinata is still asleep.”'},
     {t:'Kohei took the car out alone at dawn on Saturday',truth:true,ev:['dawnCar','dashcam'],why:'The car went out a bit after five and came back just before seven. Kohei was driving, alone.'},
     {t:'Kohei took Mugi away in his car',truth:false,ev:['dashcam'],why:'There’s no dog in the dashcam footage from inside the car. He drove straight to the cemetery and sat alone in front of his mother’s grave!'},
   ]},
  {id:'h3',no:'③',title:'The Hinata Theory',requires:['latch','hideout','hinataWord'],
   summary:'The back gate’s latch can only be opened from inside the yard — no outsider could have done it. Hinata, who didn’t want Mugi handed to a foster family, crept out of bed at dawn, undid the latch herself, and hid Mugi in her secret den under the shrine floor. “Grandma took Mugi” is just a story she made up to cover it.',
   hint:'Just the sort of thing a kid would think of. ...But did Mugi really go toward the shrine? Follow her trail past the top of the hill.',
   claims:[
     {t:'The back gate’s latch can only be opened from inside',truth:true,ev:['latch'],why:'The latch is on the yard side only. There’s no gap to reach in from outside, and no sign it was forced.'},
     {t:'Hinata didn’t want Mugi handed to a foster family',truth:true,ev:['hinataWord'],why:'She cried, “I won’t give Mugi up. I’ll hide her somewhere.”'},
     {t:'Somewhere to hide Mugi was ready under the shrine floor',truth:true,ev:['hideout'],why:'A blanket, dog food, a water dish, a photo of Mugi. At the entrance: “MUGI’S HOUSE.”'},
     {t:'Hinata hid Mugi under the shrine floor',truth:false,ev:['bike'],why:'Mugi rode across Miharashi Bridge in a bicycle’s front basket, to the far side of the river — the opposite direction from the shrine. At that time, Hinata was asleep in her own bed!'},
   ]},
  {id:'h4',no:'④',title:'The Gondo Theory',requires:['haruWalk','chanchanko','treats','diary','bench','clinic'],final:true,
   summary:'For the year since Kiyo died, the one walking Mugi every morning at half past five, in Kiyo’s red padded vest, was Gondo from next door. Every night, Hinata undid the back gate’s latch from inside. That morning, Mugi collapsed at the bench at the top of the hill, where the walk turned for home. Gondo put her in his bicycle basket, took her across the river to the animal hospital, and checked her in under his own name. And he told no one.',
   claims:[
     {t:'This past year’s “Kiyo,” walking Mugi, was not Kiyo',truth:true,ev:['haruWalk'],why:'Their wrists stuck out of the vest’s sleeves. On small Kiyo, the sleeves came down over the backs of her hands.'},
     {t:'The one wearing the red padded vest was Gondo',truth:true,ev:['chanchanko'],why:'Kiyo’s vest was hanging inside out on Gondo’s washing line, the front thick with Mugi’s hair.'},
     {t:'Gondo is no dog-hater',truth:true,ev:['treats'],why:'In the toolbox on his veranda: chicken dog treats and a well-worn red leash. The same treats Kiyo used to give her.'},
     {t:'Hinata undid the back gate’s latch from inside',truth:true,ev:['diary','latch'],why:'“Grandma comes to take Mugi for her walk. So before bed, I undo the latch.” Nearly every night for a year.'},
     {t:'That morning, Mugi collapsed at the bench on the hill',truth:true,ev:['bench'],why:'In the mud: the hollow where a dog lay, and Mugi’s bell. Beside them, bicycle tracks and big rubber-boot prints.'},
     {t:'Gondo took Mugi to the animal hospital across the river',truth:true,ev:['clinic','bike'],why:'At 6:07, a Shiba with a heart attack was brought into Ashida Animal Hospital by “Gondo.” Mugi is still there.'},
   ]},
]});
