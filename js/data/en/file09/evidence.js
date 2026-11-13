/* Data: FILE.09 evidence, investigation phases, the trail map, and the clock (English) */
'use strict';

/* =========================================================
   Evidence
   What really happened that morning (every piece of evidence and every sighting fits this)
     5:12 Kohei drives to the cemetery (back at 6:40)   5:25 Gondo comes in by the back gate and takes Mugi out
     5:33 past the tofu shop   5:35 Omori leaves for the market (Kotetsu gets out)   5:43 below the shrine
     5:50 Kotetsu runs through the station plaza   5:59 the bench at the top of the hill. Mugi collapses
     6:04 a bicycle crosses Miharashi Bridge (Omori, back from the market, passes it)   6:07 arrives at Ashida Animal Hospital
     6:00 Hinata is in bed   6:20 Satomi notices Mugi is gone
   ========================================================= */
defCase('file09',{EV:{
  letter:    {k:'✉️',name:'Hinata’s Letter',        desc:'A single sheet of letter paper, left at the front desk of police headquarters. “To the detectives of Division One. Please find Mugi.” In a little gift envelope: one 500-yen coin. Mugi is a girl Shiba, fourteen years old. A red collar with a bell. Her eyes are cloudy and her left back leg is bad. “She can only walk slowly. She can’t run.” She vanished from the yard on Saturday morning.'},
  theft:     {k:'🚐',name:'The Pet Thefts',          desc:'Noguchi’s account. In the past month there have been three pet thefts around Sakuragaoka — the work of a gang the community safety division is after. A white van was seen at every one.'},
  gate:      {k:'🚪',name:'The Open Back Gate',      desc:'The back gate that leads from the Kasugas’ yard into the alley. When Satomi found it at 6:20 on Saturday morning, it was standing half open. Mugi’s leash had been unclipped from the stake by the doghouse. Mugi was gone, collar and all.'},
  sighting:  {k:'🚉',name:'The Station Sighting',    desc:'What the kiosk clerk at the station told Noguchi. At 5:50 on Saturday morning, a Shiba in a red collar tore across the station plaza at full speed. Shortly after, a white van pulled out of the plaza.'},
  arrest:    {k:'🚔',name:'The Gang’s Arrest',       desc:'Word from the community safety division. All three members of the pet-theft gang were arrested in the next city at 11 p.m. on Friday. At dawn on Saturday, all three were in the cells. Their white van has been impounded. The van at the station was a bakery delivery van.'},
  otherDog:  {k:'🐕',name:'The Dog at the Station',  desc:'A dog climbing the slope below the shrine at 5:43 can’t be tearing across a station plaza more than a kilometer away seven minutes later. Mugi can’t run. The dog at the station was Kotetsu — Mr. Omori’s dog from the liquor store. A two-year-old Shiba in a red collar. He was picked up at the station police box at 6:20.'},
  satooya:   {k:'🤝',name:'The Adoption',            desc:'Onodera’s account. Through the rescue group Tail House, Mugi was to be collected tomorrow at 10 a.m. by a foster family in the next prefecture. Next week, the Kasugas move into company housing where dogs aren’t allowed.'},
  dadWords:  {k:'💬',name:'What Kohei Said',         desc:'Satomi’s account. “My husband said, ‘It’s better if Hinata doesn’t have to see the goodbye.’ ...That we should have them take Mugi while Hinata was still asleep.”'},
  dawnCar:   {k:'🚗',name:'The Car at Dawn',         desc:'Gondo’s account. “Saturday morning, a bit after five, the car next door went out. The engine woke me.” Kohei’s car came back just before seven. Kohei was driving, alone.'},
  dashcam:   {k:'📹',name:'The Dashcam',             desc:'Mori checked the dashcam in Kohei’s car. He left home at 5:12 on Saturday morning and drove straight to the cemetery in the hills. The car sat in the cemetery lot until 6:25. There is no dog in the footage from inside the car. The cemetery caretaker saw Kohei sitting alone in front of his mother’s grave.'},
  latch:     {k:'🔒',name:'The Gate Latch',          desc:'Mori’s account. The back gate’s latch is on the yard side only. There’s no gap to reach in from outside, and no sign it was forced. Only someone inside the yard could open it. It’s an old latch, but well oiled, and it slides as smoothly as if it were opened and closed every day.'},
  hideout:   {k:'🏚️',name:'The Shrine Hideout',     desc:'Under the floor of the Sakuragaoka Shrine hall. An old blanket, a bag of dog food, a dish of water, a photo of Mugi. On a board at the entrance, in a child’s writing: “MUGI’S HOUSE.” The dog food bag has never been opened.'},
  hinataWord:{k:'😢',name:'“I Won’t Give Her Up”', desc:'Kohei’s account. “Last week, when I told her about the foster family, Hinata cried, ‘I won’t give Mugi up. I’ll hide her somewhere.’ She wouldn’t come out of her room.”'},
  bike:      {k:'🚲',name:'The Bicycle on the Bridge',desc:'5:59: a person in red and a dog at the bench on top of the hill. Five minutes later, at 6:04, a bicycle with something brown in its front basket sped across Miharashi Bridge, 850 meters away (Mr. Omori, on his way back from the market). On Mugi’s legs, 850 meters in five minutes is impossible. Mugi was carried across the river by bicycle — the opposite direction from the shrine. At six, Hinata was asleep in her own bed (Satomi’s account).'},
  haruWalk:  {k:'👣',name:'“Kiyo’s” Walks',         desc:'From Mrs. Matsui at the tofu shop and Segawa the paperboy. All through the year since Kiyo died, every morning at half past five, someone in a red padded vest walked Mugi up to the bench on top of the hill. But that person’s wrists stuck out of the vest’s sleeves. On small Kiyo, the sleeves came down over the backs of her hands.'},
  chanchanko:{k:'🧥',name:'The Red Padded Vest',     desc:'A red padded vest, hung inside out on Gondo’s washing line. The front is thick with short brown dog hair — Mugi’s. Satomi’s account: “It’s my mother-in-law’s. ...When we shared out her things, it was the one thing we couldn’t find.”'},
  treats:    {k:'🦴',name:'The Toolbox on the Veranda',desc:'Inside the bonsai toolbox on Gondo’s veranda: a bag of chicken dog treats, and a well-worn red leash. The treats are the same brand Kiyo used to give Mugi.'},
  diary:     {k:'📔',name:'Hinata’s Diary',          desc:'Hinata’s diary. “Grandma comes to take Mugi for her walk. So before bed, I undo the latch on the back gate. It’s a secret from everybody.” All through the past year, nearly every night, the same words.'},
  bench:     {k:'🪑',name:'The Bench on the Hill',   desc:'The bench at the top of the hill, looking out to sea — where Kiyo’s walk always turned for home. In the mud at its feet, softened by last night’s rain: the hollow where a dog lay, and one small bell. Beside them, a bicycle’s tire tracks, and big rubber-boot prints.'},
  clinic:    {k:'🏥',name:'The Hospital Register',   desc:'The night and early-morning register at Ashida Animal Hospital, across the river. Saturday, 6:07 a.m. Shiba, female, about fourteen. Heart attack. Brought in by: “Gondo.” The dog’s name: left blank. The dog is still in the hospital.'},
}});

/* =========================================================
   Investigation phases: each refuted deduction advances the phase and opens up more evidence
   ========================================================= */
defCase('file09',{EV_PHASE:{
  letter:0, theft:0, gate:0, sighting:0, arrest:0, otherDog:0,   // build ① (letter, thefts, back gate, station sighting) + break ① (arrest, dog at the station)
  satooya:1, dadWords:1, dawnCar:1, dashcam:1,                  // build ② (adoption, Kohei's words, car at dawn) + break ② (dashcam)
  latch:2, hideout:2, hinataWord:2, bike:2,                      // build ③ (latch, hideout, "I won't give her up") + break ③ (bicycle on the bridge)
  haruWalk:3, chanchanko:3, treats:3, diary:3, bench:3, clinic:3,   // needed for Deduction ④
}});

/* =========================================================
   The trail map (js/ui/route.js)
   At the neighborhood notice board on the street, lay the sightings on the town map in time order, and pick the one that doesn't connect.
   A set opens once its "need" evidence is in hand and its "ev" evidence's phase has been reached.
   ========================================================= */
defCase('file09',{ROUTE_PLACES:{kasuga:'Kasugas’',sakaya:'Liquor',tofu:'Tofu shop',shrine:'Below shrine',bench:'Hilltop bench',
  bridge:'Bridge',clinic:'Animal hospital',station:'Station'}});
defCase('file09',{ROUTE:[
  {ev:'otherDog',need:['sighting'],title:'Dawn, Saturday — Sightings of a Dog Like Mugi',
   ask:'These sightings are in time order. Pick the one that doesn’t fit Mugi’s trail. (Tap a chosen card again to confirm.)',
   legend:'Mugi: fourteen. Bad left back leg. Walking slowly, about 40 meters a minute (Hinata’s letter).',
   cards:[
     {time:'5:25',place:'kasuga',who:'Satomi (Kasuga house)',saw:'“From my bed, I thought I heard Mugi’s bell. ...Just like any other morning.”',note:'The Kasugas’ yard. This is where Mugi’s trail begins.'},
     {time:'5:33',place:'tofu',who:'Matsui (tofu shop)',saw:'“Mugi went by the shop in her red collar. Slow as always, toward the hill.”',note:'340 meters in eight minutes. Mugi could manage that, walking slowly.'},
     {time:'5:43',place:'shrine',who:'Segawa (paperboy)',saw:'“A Shiba was going up the slope below the shrine. Dragging its left back leg.”',note:'390 meters in ten minutes. A dragging leg — that’s how Mugi walks.'},
     {time:'5:50',place:'station',who:'Kiosk clerk at the station',saw:'“A Shiba in a red collar tore across the plaza at full speed. Then a white van pulled out.”',ok:true},
   ],
   hint:'Compare the distance and the time on each line. Could Mugi get that far on her legs?',
   found(){
     say(ME,'This one. From below the shrine to the station is over a kilometer. In seven minutes.');
     say(ME,'Mugi’s left back leg is bad. She can’t run. Hinata’s letter said so too.');
     say(ME,'...And Mugi was climbing the hill. She wouldn’t suddenly turn around and race down to the station. The dog at the station was a different Shiba.');
     sys('Noguchi comes in over the radio.');
     say('Noguchi','From the station police box, sir! At 6:20 on Saturday morning, they took in a Shiba in a red collar!');
     say('Noguchi','It’s Kotetsu, sir — Mr. Omori’s dog from the liquor store! He got out while Mr. Omori was off at the morning market.');
     give('otherDog');
   }},
  {ev:'bike',need:[],title:'Dawn, Saturday — Beyond the Top of the Hill',
   ask:'Follow Mugi’s trail past the top of the hill. Pick the place she couldn’t have reached on her own legs.',
   legend:'Mugi: fourteen. Bad left back leg. Walking slowly, about 40 meters a minute (Hinata’s letter).',
   cards:[
     {time:'5:33',place:'tofu',who:'Matsui (tofu shop)',saw:'“Next to Mugi there was someone in a red padded vest, with a bent back. I thought it was Kiyo.”',note:'We’ve already confirmed the trail this far.'},
     {time:'5:43',place:'shrine',who:'Segawa (paperboy)',saw:'“Someone in red and a Shiba were going slowly up the slope below the shrine.”',note:'390 meters in ten minutes. Mugi’s pace.'},
     {time:'5:59',place:'bench',who:'Segawa (paperboy)',saw:'“At the bench on top of the hill, the person in red was crouched down. The dog was lying at their feet, I think.”',note:'620 meters in sixteen minutes. Even uphill, Mugi could make it.'},
     {time:'6:04',place:'bridge',who:'Omori (liquor store)',saw:'“On the way back from the market, a bicycle passed me on Miharashi Bridge. Something brown in the front basket — came flying down from the hill.”',ok:true},
     {time:'6:00',place:'kasuga',tag:'At home',ref:true,who:'Satomi (Kasuga house)',saw:'“At six I went to wake Hinata. She was sound asleep in her own bed.”',note:'At six, Hinata was at home. ...But that’s a separate question from Mugi’s trail.'},
   ],
   hint:'How long did it take from the top of the hill to the bridge? Could Mugi move that fast?',
   found(){
     say(ME,'From the bench on the hill to Miharashi Bridge is 850 meters. In five minutes.');
     say(ME,'On Mugi’s legs that would take twenty. ...The “something brown” in the basket was Mugi. She was carried, on a bicycle.');
     say(ME,'Across the bridge is the other side of the river — the opposite direction from the shrine’s floor.');
     say(ME,'And at six, Hinata was asleep in her own bed. Whoever rode across that bridge, it wasn’t Hinata.');
     give('bike');
   }},
  {ev:'haruWalk',need:[],title:'This Past Year — “Kiyo’s” Walks',
   ask:'The real Kiyo, up to last year — and this year’s “Kiyo.” Pick the sighting that can’t be Kiyo.',
   legend:'Kiyo: Kohei’s mother. Died last spring. A small old woman with a bent back.',
   cards:[
     {time:'5:33',place:'tofu',tag:'Till last year',ref:true,who:'Matsui (tofu shop)',saw:'“Every morning Kiyo bought one piece of fried tofu here and gave half to Mugi.”',note:'That’s Kiyo’s walk, up to last year.'},
     {time:'5:33',place:'tofu',tag:'This year',who:'Matsui (tofu shop)',saw:'“The one in the vest just tips their hat a little as they pass the shop. Call out, and they never answer.”',note:'Never speaks. ...But that alone doesn’t prove it isn’t Kiyo.'},
     {time:'5:43',place:'shrine',tag:'This year',who:'Segawa (paperboy)',saw:'“They always stop at the foot of the shrine steps and bow. The dog sticks right by their feet.”',note:'Mugi trusts this person completely. ...The smell of the vest, maybe.'},
     {time:'5:59',place:'bench',tag:'This year',who:'Segawa (paperboy)',saw:'“They sit on the bench and reach over to stroke the dog’s head. Their wrists poke right out of the vest’s sleeves.”',ok:true},
     {tag:'Till last year',ref:true,who:'Satomi (Kasuga house)',saw:'“My mother-in-law was tiny. On her, that vest’s sleeves came down over the backs of her hands.”',note:'That’s how Kiyo wore the vest.'},
   ],
   hint:'Compare how the vest is worn with how Kiyo wore it.',
   found(){
     say(ME,'The wrists stuck out of the sleeves. ...On small Kiyo, the sleeves came down over the backs of her hands.');
     say(ME,'For this past year, the person in the vest has had much longer arms than Kiyo.');
     say(ME,'And at the tofu shop they never speak — just tip their hat. ...Because one word, and everyone would know it wasn’t Kiyo.');
     give('haruWalk');
   }},
]});

/* =========================================================
   The clock (used by drawCaseClock / drawDusk in js/render/render.js)
   The investigation starts at 13:10. Each piece of evidence found lets time slip by (it never goes past sunset at 17:40)
   ========================================================= */
const f9Min=()=>Math.min(17*60+40,13*60+10+S.ev.length*13);
defCase('file09',{clock(){
  const m=f9Min(), gone=m-(5*60+25), p2=n=>String(n).padStart(2,'0');
  return {main:`${Math.floor(m/60)}:${p2(m%60)}`,sub:`Mugi missing for ${Math.floor(gone/60)}h ${p2(gone%60)}m`,warn:false,dusk:Math.min(1,(m-13*60-10)/270)};
}});
// Each refuted deduction tips the sun lower (shown as a band by checkPhase in js/game/progress.js)
defCase('file09',{phaseBand:{
  get 1(){return {title:CASE.clock().main,sub:'— The evening shoppers start passing the tofu shop'};},
  get 2(){return {title:CASE.clock().main,sub:'— The sea beyond the hilltop begins to shine gold'};},
  get 3(){return {title:CASE.clock().main,sub:'— One hour until sunset'};},
}});
