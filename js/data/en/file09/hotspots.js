/* Data: FILE.09 places to examine (hotspots) (English) */
'use strict';

/* Every case’s data shares the same globals, so function names get the f9 prefix */

/* ---------- Sakuragaoka 3-chome ---------- */
function f9ToSaka(){
  ask('','Go right along the street, to Miharashi Hill?',[
    {label:'To Miharashi Hill',fn:()=>fade(()=>setMap('saka',1,12,'right'))},
    {label:'Not now',fn:()=>{}}]);
}
// The neighborhood notice board: lay the sightings out on the town map (js/ui/route.js)
const f9NextRoute=()=>CASE.ROUTE.find(p=>findable(p.ev)&&p.need.every(has));
const f9CanRoute=()=>!!f9NextRoute();
function f9Board(){
  const p=f9NextRoute();
  if(!p){
    if(!has('sighting')){
      say(ME,'The neighborhood notice board. A map of Sakuragaoka 3-chome, and a poster: “LOST DOG.” Mugi’s photo is on it.');
      say(ME,'Once the sightings are in, I can lay them out on this map and follow Mugi’s trail.');
    }else if(CASE.ROUTE.every(r=>has(r.ev))){
      say(ME,'The map on the notice board. Mugi’s trail is joined up in red.');
      if(!f9Proven()) say(ME,'From the Kasugas’, past the tofu shop, below the shrine, to the bench on the hill. ...And from there, over the bridge and across the river.');
    }else{
      say(ME,'The map on the notice board. I’ve already laid out every sighting we have.');
      if(phase()<2) say(ME,'The Shiba at the station wasn’t Mugi. ...Mugi walked toward the hill.');
    }
    return;
  }
  sys('I lay the sighting cards on the map on the notice board, in time order.');
  run(()=>{openRoute(p); return;});
}
function f9Gate(){
  if(!has('gate')){
    say(ME,'The back gate, leading from the Kasugas’ yard into the alley.');
    sys('The wooden gate is still standing half open. Last night’s rain has washed the alley clean — no footprints.');
    say(ME,'Mrs. Kasuga says it was like this when she found it at 6:20. Mugi’s leash had been unclipped from the stake by the doghouse.');
    give('gate');
  }else{
    say(ME,'The back gate, opening onto the alley.');
    if(has('latch')) say(ME,'The latch is on the yard side only. ...Only someone inside could open it.');
  }
}
function f9Kennel(){
  say(ME,'An empty doghouse. An old cushion inside. Over the door, a board that says “MUGI.”');
  sys('The leash clip is still on the stake. Beside it, a bag of chicken dog treats.');
  if(phase()>=3) say(ME,'...The doghouse she should have come home to, after her walk.');
}
function f9Laundry(){
  if(!avail('chanchanko')){
    say(ME,'The washing line in Gondo’s yard next door. A hand towel, navy work clothes.');
    sys('At the end, something thick hangs inside out. All you can see is a brown lining.');
    return;
  }
  if(!has('chanchanko')){
    say(ME,'The thick thing hanging inside out at the end of the line. ...I turn it the right way round.');
    sys('A red padded vest. The front is thick with short brown hairs.');
    say(ME,'...Mugi’s hair.');
    say(ME,'Mrs. Kasuga said Kiyo’s red padded vest went missing when they shared out her things.');
    give('chanchanko');
  }else say(ME,'Kiyo’s red padded vest. Hung inside out on Mr. Gondo’s washing line.');
}
function f9Toolbox(){
  if(!avail('treats')){say(ME,'A bonsai toolbox on Mr. Gondo’s veranda. ...Better not touch it without asking.'); return;}
  if(!has('treats')){
    say(ME,'The toolbox on the veranda. The lid’s a little open — I can see inside.');
    sys('Under the bonsai shears and wire: a bag of chicken dog treats. And a red leash, faded from years of use.');
    say(ME,'The same brand of treats as the bag by the Kasugas’ doghouse.');
    say(ME,'...That doesn’t look like a dog-hater’s toolbox.');
    give('treats');
  }else say(ME,'The bonsai toolbox. Chicken treats and a red leash.');
}
function f9Bike(){
  say(ME,'Mr. Gondo’s bicycle. An old black delivery bike, with a big wire basket on the front.');
  if(phase()>=2) sys('A single short brown hair is caught in the mesh of the basket.');
  if(f9Proven()) say(ME,'...It’s gone now. Looks like Mr. Gondo rode it across the river.');
}
// Once the truth is proven, face Gondo in front of the animal hospital across the river, then straight to the interrogation
function f9Arrest(){
  sys('In front of Ashida Animal Hospital. Gondo sits alone on the bench by the door, a bag of chicken treats on his knee.');
  say(ME,'Mr. Gondo. ...Mugi’s in here, isn’t she.');
  say('Gondo','...');
  sys('The glass door opens, and Dr. Ashida looks out.');
  say('Ashida','Mr. Gondo. Mugi’s opened her eyes.');
  say('Gondo','...Has she.','sad');
  say('Gondo','...Has she, now.');
  band('event',{title:CASE.clock().main,sub:'— The sun goes down into the sea beyond the hill',auto:2600});
  say(L.tak,'Mr. Gondo. We’ll talk at the police box.');
  say('Gondo','...Aye.');
  say('Gondo','Before that — can I let Mugi see my face, just once more?');
  say(L.tak,'...Five minutes.');
  sys('Gondo grips the bag of treats and goes in through the glass door.');
  run(()=>goInterro());
}

/* ---------- Miharashi Hill ---------- */
function f9ToSakura(){
  ask('','Go back down the hill to the street in Sakuragaoka 3-chome?',[
    {label:'Back to the street',fn:()=>fade(()=>setMap('sakura',18,9,'left'))},
    {label:'Not now',fn:()=>{}}]);
}
function f9Hideout(){
  if(!avail('hideout')){
    say(ME,'The hall of Sakuragaoka Shrine. Old, but swept clean.');
    sys('It’s too dark under the floor to see much.');
    return;
  }
  if(!has('hideout')){
    say(ME,'I crouch down and look under the floor of the hall.');
    sys('An old blanket. A bag of dog food and a dish of water. A photo of Mugi taped to a post.');
    sys('On a board at the entrance, in a child’s writing: “MUGI’S HOUSE.”');
    say(ME,'...Hinata’s secret den.');
    say(ME,'But the dog food bag has never been opened. And there isn’t a single dog hair on the blanket.');
    give('hideout');
  }else say(ME,'“MUGI’S HOUSE.” The blanket and the dish have never been used.');
}
function f9Bench(){
  if(!avail('bench')){
    say(ME,'A wooden bench at the top of the hill. The sea spreads out in front of it.');
    say(ME,'The ground at its feet is still muddy from last night’s rain.');
    return;
  }
  if(!has('bench')){
    say(ME,'The bench at the top of the hill. This is where Kiyo’s walk turned for home.');
    sys('In the mud at the foot of the bench, a hollow, as if a dog had lain there. In the mud, one small bell.');
    say(ME,'...Mugi’s bell. Hinata’s letter said “a red collar with a bell.”');
    sys('Beside it, a bicycle’s tire tracks run straight off down the hill. And big rubber-boot prints.');
    give('bench');
  }else say(ME,'The bench on the hill. ...You can smell the sea. They say Mugi loved to sniff the sea air here.');
}
function f9Clinic(){
  say(ME,'Ashida Animal Hospital. On the glass door: “Emergencies seen at night and early morning.”');
  if(has('clinic')) say(ME,'Mugi is in there.');
}

defCase('file09',{HS:{
  sakura:[
    ...spots([[19,8],[19,9]],f9ToSaka),
    {x:9,y:4,glow:()=>!has('gate'),act:f9Gate},
    {x:7,y:1,act:f9Kennel},
    ...spots([[8,10],[9,10]],f9Board,()=>f9CanRoute()),
    ...spots([[12,1],[13,1]],f9Laundry,()=>findable('chanchanko')),
    {x:18,y:3,glow:()=>findable('treats'),act:f9Toolbox},
    {x:18,y:5,act:f9Bike},
    ...spots([[12,5],[13,5],[14,5]],()=>{
      say(ME,'Mr. Gondo’s bonsai shelf. A pine, a maple, a little plum. Beautifully kept.');
      if(phase()>=3) say(ME,'...Apparently he tends them first thing every morning.');}),
    ...spots([[1,2],[2,2],[3,2],[4,2],[5,2]],()=>{
      say(ME,'The Kasugas’ house. Through the veranda’s glass doors, a family altar.');
      if(phase()>=1) sys('In the photo on the altar, a small old woman in a red padded vest is smiling. At her feet, a young Mugi.');}),
    ...spots([[14,2],[15,2],[16,2],[17,2],[18,2]],()=>{
      say(ME,'The Gondo house. The nameplate says “Tetsuji Gondo.” The veranda shutters are half closed.');
      if(phase()>=2) say(ME,'From the veranda window, you get a clear view of the Kasugas’ yard and the back gate.');}),
    {x:11,y:10,act(){say(ME,'A vending machine. One “sold out” light is on.')}},
    ...spots([[1,10],[2,10],[4,10],[5,10]],()=>say(ME,'The front of Omori Liquor. Beer crates stacked up.')),
    ...spots([[13,10],[14,10],[16,10],[17,10],[18,10]],()=>{
      say(ME,'The front of Matsui Tofu. White blocks of tofu sit in a water tank.');
      if(phase()>=3) say(ME,'Pieces of fried tofu, laid out one by one. ...Kiyo bought one every morning, up to last year.');}),
  ],
  saka:[
    ...spots([[0,12],[0,13]],f9ToSakura),
    ...spots([[2,3],[3,3],[4,3]],f9Hideout,()=>findable('hideout')),
    ...spots([[14,1],[15,1],[16,1]],f9Bench,()=>findable('bench')),
    {x:14,y:13,act:f9Clinic},
    ...spots([[1,3],[5,3]],()=>say(ME,'The offering box in front of the hall. “Sakuragaoka Shrine.”')),
    ...spots([[1,5],[5,5]],()=>say(ME,'Mossy guardian lion-dogs. One has its mouth open; the other, closed.')),
    ...spots([[2,7],[4,7]],()=>{
      say(ME,'A vermilion torii gate.');
      if(phase()>=3) say(ME,'Every morning, someone stops here and bows...');}),
    {x:8,y:8,act(){say(ME,'Segawa’s scooter. Straps for tying down bundles of newspapers hang off the rack.')}},
    ...spots([[7,1],[8,1],[7,2],[8,2],[18,1],[18,2]],()=>say(ME,'Pine trees. The sea wind has bent them all the same way.')),
    ...spots([[6,10],[7,10],[8,10],[9,10],[10,10],[13,10],[14,10],[15,10],[16,10],[17,10],[18,10]],()=>{
      say(ME,'The Miharashi River. Running high after last night’s rain.');
      if(phase()>=2) say(ME,'The only way across is Miharashi Bridge.');}),
  ],
}});

defCase('file09',{PHASE_MSG:{
  1:['Not the gang. And the dog at the station wasn’t Mugi either. ...Mugi walked slowly toward the hill.',
     'Someone who could open the back gate and lead Mugi out. ...For someone in that house, it’d be easy.',
     'Ask Ms. Onodera at the front gate about the foster family. Then talk to the wife, and Mr. Gondo next door.'],
  2:['Mugi wasn’t in Mr. Kasuga’s car. At dawn, he was sitting alone in front of his mother’s grave.',
     '...Then who led Mugi out? Mori’s got something to say about the back gate.',
     'Talk to Mr. Kasuga again — about Hinata. And take a look at the shrine up the hill.'],
  3:['Not Hinata. Mugi went in a bicycle basket — over the bridge, to the other side of the river.',
     '...“Kiyo” in her red padded vest. The whole street has seen her, every morning for a year. So who is she?',
     'Lay out the sightings of “Kiyo” on the notice board again. Then the bench on the hill, and the animal hospital across the river. And the house next door, and Hinata, one more time.'],
}});
// Takizawa's lines while the final deduction is being checked (used by talkTakizawa in common.js)
defCase('file09',{finalOpen:[
  'Back up every claim in Deduction ④ with evidence. Case Board [B].',
  '...Before the sun goes down. Our client is waiting.',
]});

defCase('file09',{EVHINT:{
  letter:'You can reread Hinata’s letter on the Case Board [B]. It says something about Mugi’s legs.',
  theft:'Noguchi on the street got the story on the thefts from community safety.',
  gate:'Look at the yard Mugi vanished from. They say the back gate was open.',
  sighting:'Noguchi’s been asking around about a sighting at the station.',
  arrest:'Get community safety to tell you about the gang. Ask Noguchi.',
  otherDog:'Lay the sightings out on the map on the street’s notice board. Could Mugi get that far on her legs?',
  satooya:'Ask Ms. Onodera at the front gate about the foster family.',
  dadWords:'What did Mr. Kasuga think about Mugi? Ask his wife on the veranda.',
  dawnCar:'Was anything happening at the Kasugas’ that morning? Ask Mr. Gondo next door. He’s on his veranda.',
  dashcam:'Was Mugi in Mr. Kasuga’s car? Mori’s got something to say about it.',
  latch:'Mori is looking into the back gate’s latch.',
  hideout:'Go up to the shrine on Miharashi Hill. Under the floor of the hall.',
  hinataWord:'How did Hinata take the news about the foster family? Ask her father.',
  bike:'On the notice board, follow Mugi’s trail on past the top of the hill.',
  haruWalk:'On the notice board, lay out this past year’s sightings of “Kiyo.”',
  chanchanko:'Where’s that red padded vest? Look at the washing line next door.',
  treats:'Does Mr. Gondo really hate dogs? Look in the toolbox on his veranda.',
  diary:'Who was undoing the back gate’s latch? ...Talk to Hinata again.',
  bench:'The bench at the top of the hill. Take a good look at the ground.',
  clinic:'She was carried across the river. There’s an animal hospital past Miharashi Bridge.',
}});
