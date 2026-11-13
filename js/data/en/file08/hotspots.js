/* Data: FILE.08 places to examine (hotspots) (English) */
'use strict';

/* Every case’s data shares the same globals, so function names get the f8 prefix */

/* ---------- Main building, 2F ---------- */
function f8ToCourt(){
  ask('','Go down the stairs to the courtyard and the nib workshop?',[
    {label:'Go down',fn:()=>fade(()=>setMap('togiba',9,1,'down'))},
    {label:'Not now',fn:()=>{}}]);
}
// The boardroom table: lay the letters beside the minutes and cross-check them (js/ui/compare.js)
const f8NextCompare=()=>CASE.COMPARE.find(p=>findable(p.ev));
const f8CanCompare=()=>has('article')&&has('minutes')&&!!f8NextCompare();
function f8Table(){
  if(!has('article')||!has('minutes')){
    say(ME,'The long boardroom table. Old, black, polished — it seats ten.');
    if(has('article')) say(ME,'Once I have the minutes, I can lay them out here beside the letters and compare.');
    else say(ME,'The papers from today’s meeting have already been cleared away.');
    return;
  }
  const p=f8NextCompare();
  if(!p){
    say(ME,'The three letters and the minutes. I’ve already found where they differ.');
    if(phase()>=3&&!f8Proven()) say(ME,'...The writer wasn’t in this room. And yet they heard what was said in it.');
    return;
  }
  sys('I lay the letter and the minutes side by side on the table.');
  run(()=>{openCompare(p); return;});
}
function f8Fireplace(){
  if(!avail('pipeRoom')){
    say(ME,'A fireplace no one uses anymore. Above it hangs a framed photograph of an old Western-style house.');
    sys('A small plaque below the photo: “1956 — Narumi Pen founded.” Two young men stand laughing in front of the house.');
    return;
  }
  if(!has('pipeRoom')){
    say(ME,'The frame above the fireplace. ...Mori was right. It sits a little off the wall.');
    say(ME,'I lift it off its hook.');
    sys('In the wall behind it: a round brass cap, the size of a palm. Its wing screw has been loosened, and the cap swung aside. It’s open.');
    say(ME,'Behind the cap, a dark tube... running down inside the wall.');
    say(ME,'The rust on the wing screw has been rubbed through to bright metal. As if it had been opened for the first time in thirty years.');
    give('pipeRoom');
  }else{
    say(ME,'The mouth of the speaking tube above the fireplace. I’ve left the frame off.');
    if(has('pipeShop')) sys('I clear my throat softly into the tube. ...Far below, I hear Kuramochi yelp, “Whoa!”');
  }
}
function f8Window(){
  if(!has('window')){
    say(ME,'The boardroom’s west window. Through rain-streaked glass: the office block across the street.');
    say(ME,'About six meters away. The second floor is a café. From its window seats, you could look straight down onto the whole table in this room.');
    give('window');
  }else{
    say(ME,'The café window across the street. A student is reading a book in the window seat.');
    if(has('curtain')) say(ME,'During meetings, these blackout curtains are closed. Nothing can be seen from outside.');
  }
}
function f8PhoneBox(){
  if(!has('phoneBox')){
    say(ME,'A wooden box at the boardroom door, with six little locking drawers. “Please leave your phone here during board meetings.”');
    say(ME,'Everyone attending leaves their phone here. Only paper and pens go into the boardroom.');
    say(ME,'Someone inside recording it and leaking it — that’s hard to believe.');
    give('phoneBox');
  }else say(ME,'The phone box. Ms. Mizuhara, the secretary, keeps the key.');
}
function f8Case(){
  if(!avail('plan')){
    say(ME,'A glass case of company history. Fountain pens from the founding years.');
    sys('A yellowed photo: two young men of about twenty, arms around each other’s shoulders, in front of the storeroom behind the house. “Spring 1956 — Shuzo Narumi & Kihei Tatsumi.”');
    return;
  }
  if(!has('plan')){
    say(ME,'On the bottom shelf of the history case: an old blueprint, folded up.');
    sys('“1956 — Narumi Pen Main Building, Renovation Plan.” From the second-floor “President’s Office” — today’s boardroom — a single line runs to the “Storeroom” out back.');
    sys('Beside the line, in pencil: “Speaking tube.”');
    say(ME,'The storeroom out back... That’s the nib workshop now.');
    give('plan');
  }else say(ME,'The founding floor plan. The president’s office and the workshop, joined by a single tube.');
}
function f8Desk(){
  if(!avail('card')){say(ME,'Ms. Mizuhara’s desk. The papers are neatly stacked. ...Better not touch anything without good reason.'); return;}
  if(!has('card')){
    say(ME,'“Excuse me.” I lift the pen tray on Ms. Mizuhara’s desk.');
    sys('Under the pen tray, a business card. “Sankyo Pen Co., Ltd. — Human Resources.” Handwritten on the back: “Do let’s talk.”');
    say(ME,'Sankyo Pen... Narumi Pen’s rival.');
    give('card');
  }else say(ME,'Ms. Mizuhara’s desk. Her notepads of draft minutes, squared neatly.');
}
function f8Gloves(){
  if(!avail('verdigris')){say(ME,'The low table in the reception room. Teacups, and a pair of white gloves.'); return;}
  if(!has('verdigris')){
    say(ME,'The chairman’s white cotton gloves, left on the reception room table.');
    say(ME,'The fingertips of the right glove are smudged blue-green. ...That isn’t ink.');
    say(ME,'Brass rust. Verdigris.');
    give('verdigris');
  }else say(ME,'The chairman’s gloves. Verdigris on the fingertips.');
}

/* ---------- Courtyard & nib workshop ---------- */
function f8ToHonkan(){
  ask('','Go back up to the second floor of the main building?',[
    {label:'Back to the main building',fn:()=>fade(()=>setMap('honkan',9,13,'up'))},
    {label:'Not now',fn:()=>{}}]);
}
function f8Shelf(){
  if(!avail('pipeShop')){
    say(ME,'The workshop’s tool shelf, crammed with whetstones and boxes of nibs.');
    if(phase()>=2) say(ME,'Something like an old pipe seems to stick out of the wall behind it.');
    return;
  }
  if(!has('pipeShop')){
    say(ME,'I squeeze around behind the tool shelf. Between the shelf and the wall, there’s just room for one person to sit.');
    sys('A brass tube juts from the wall. The round cap on its end is open. In front of it: an old floor cushion and a folded apron.');
    say(ME,'Someone sat here, ear to the tube.');
    sys('I lean in. ...Sounds from the boardroom upstairs come drifting down the tube. Mori’s footsteps. The little electronic chirp of the detector.');
    say(ME,'It’s astonishingly clear. With the grinding wheels off, it would be clearer still.');
    give('pipeShop');
  }else{
    say(ME,'The mouth of the speaking tube behind the tool shelf.');
    if(has('pipeRoom')) sys('I put my ear to it. From upstairs, Mori’s voice: “Roooo-kie! Can you hear meee?”');
  }
}
function f8Paper(){
  if(!avail('paper')){say(ME,'The test-writing stand. Stacks of paper covered in little loops from freshly ground nibs.'); return;}
  if(!has('paper')){
    say(ME,'The test-writing stand. Bundles of paper for trying out freshly ground nibs.');
    say(ME,'Ruled white paper... The same as the letters. Right down to the watermark.');
    say(ME,'The ink bottle on the stand is blue-black.');
    give('paper');
  }else say(ME,'The test-writing paper. One sheet has been torn off.');
}
function f8Wheel(){
  say(ME,'An electric grinding wheel. You press the nib to the spinning stone to grind it.');
  if(phase()>=3) say(ME,'Once it’s running, it drowns out any conversation. ...On Thursday afternoons, it was off.');
  else say(ME,'It’s off right now. You can hear the rain clearly.');
}
function f8Guard(){
  say(ME,'The guard’s window. The back door into the main building is right beside it.');
  say(ME,'No one gets into the main building without the guard noticing.');
  if(has('guardLog')) say(ME,'Mr. Tatsumi hasn’t passed this window in ten years.');
}
// Once the truth is proven, face Tatsumi in the workshop, then straight to the interrogation
function f8Arrest(){
  sys('At the back of the workshop, Tatsumi stands before the tool shelf. A sheet of paper folded in four pokes out of his apron pocket.');
  say(ME,'Mr. Tatsumi. ...That’s the letter about today’s meeting, isn’t it.');
  say('Tatsumi','...');
  band('event',{title:'18:58',sub:'— Two minutes before the Stationery Herald’s letter box closes',auto:2600});
  say('Tatsumi','...Didn’t make it, then.','sad');
  sys('Tatsumi lays the folded paper on the test-writing stand.');
  say(L.tak,'Mr. Tatsumi. We’ll hear the rest at the station.');
  say('Tatsumi','...Aye.');
  sys('On his way out of the workshop, Tatsumi looks back, just once, at the tube behind the tool shelf.');
  run(()=>goInterro());
}

defCase('file08',{HS:{
  honkan:[
    ...spots([[9,14],[10,14]],f8ToCourt),
    ...spots([[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4]],f8Table,()=>f8CanCompare()),
    ...spots([[8,1],[9,1]],f8Fireplace,()=>findable('pipeRoom')),
    ...spots([[1,2],[1,3],[1,4]],f8Window,()=>!has('window')),
    {x:4,y:7,glow:()=>!has('phoneBox'),act:f8PhoneBox},
    ...spots([[1,7],[1,8]],f8Case,()=>findable('plan')),
    ...spots([[2,12],[3,12]],f8Desk,()=>findable('card')),
    ...spots([[15,11],[16,11]],f8Gloves,()=>findable('verdigris')),
    ...spots([[10,2],[10,3],[10,4]],()=>{
      say(ME,'A projection screen for slides. They darken the room during meetings, apparently.');}),
    {x:9,y:3,act(){
      say(ME,'The seat at the fireplace end of the table. A lap blanket hangs over the chair back.');
      if(has('seat')) say(ME,'The chairman’s seat, since a month ago. ...Reach up, and you could touch the frame above the fireplace.');}},
    {x:2,y:3,act(){
      say(ME,'The seat at the window end of the table.');
      if(has('seat')) say(ME,'The chairman used to sit here.');}},
    {x:18,y:1,act(){
      say(ME,'The safe in the president’s office.');
      if(has('minutes')) say(ME,'The minutes are kept in here. Only the president and Ms. Mizuhara have the key.');
      else say(ME,'The minutes are kept in here, apparently. I should ask the president.');}},
    ...spots([[12,1],[13,1]],()=>say(ME,'The president’s bookshelf. Fountain-pen magazines and old ledgers.')),
    ...spots([[14,2],[15,2],[16,2]],()=>{
      say(ME,'The president’s desk. A bundle of letters, half read. “When I heard Narumi’s nibs might be lost...”');
      if(phase()>=2) say(ME,'...They all seem to be from pen lovers who read the letters in the paper.');}),
    {x:1,y:10,act(){say(ME,'A filing cabinet. “Board Meetings,” “Shareholders,” “Daito Stationery.”')}},
    ...spots([[19,7],[19,8]],()=>{
      say(ME,'The corridor window. The rain is heavy. Across the courtyard, I can see the workshop roof.');}),
    ...spots([[7,13],[11,13]],()=>say(ME,'A potted plant in the stair hall.')),
  ],
  togiba:[
    ...spots([[9,0],[10,0]],f8ToHonkan),
    ...spots([[2,1],[3,1]],f8Shelf,()=>findable('pipeShop')),
    ...spots([[1,6],[2,6]],f8Paper,()=>findable('paper')),
    ...spots([[2,3],[3,3],[5,3],[6,3]],f8Wheel),
    ...spots([[5,1],[6,1],[7,1]],()=>{
      say(ME,'The workbench. A loupe, and half-ground nibs. In the corner, an old radio.');
      if(phase()>=3) say(ME,'The radio is switched off.');}),
    ...spots([[12,2],[13,2],[14,2]],f8Guard),
    ...spots([[17,1],[18,1]],()=>{
      say(ME,'The bike rack. An old bicycle with a rusty carrier, tagged “Tatsumi.”');
      if(phase()>=3) say(ME,'The Stationery Herald’s office is about ten minutes by bike from the back gate, they say.');}),
    ...spots([[15,6],[16,6],[15,7],[16,7]],()=>say(ME,'The ginkgo in the courtyard. Its yellow leaves, beaten down by the rain, stick to the paving stones.')),
    ...spots([[9,11],[10,11],[11,11]],()=>say(ME,'A wet bench. At lunchtime the craftsmen eat their boxed lunches here, I’m told.')),
    ...spots([[1,12],[2,12],[3,12],[4,12]],()=>say(ME,'A flower bed. The chrysanthemums droop in the rain.')),
    ...spots([[9,14],[10,14]],()=>{
      say(ME,'The back gate. Beyond it, the back street behind the shopping arcade.');
      if(phase()>=2) say(ME,'The Stationery Herald is this way. Its letter box closes at seven every night.');}),
  ],
}});

// With each deduction broken, night draws nearer (shown as a band by checkPhase in js/game/progress.js)
defCase('file08',{phaseBand:{
  1:{title:'16:05',sub:'— The rain is getting heavier'},
  2:{title:'17:10',sub:'— It’s already dark outside'},
  3:{title:'18:15',sub:'— 45 minutes until the Stationery Herald’s letter box closes'},
}});
defCase('file08',{PHASE_MSG:{
  1:['No bug. Nobody peeking through the window. ...So the voices left this room by human hands.',
     'The one who writes down what’s said is the secretary, Ms. Mizuhara. The minutes are in the safe in the president’s office. Ask the president to show you.',
     'Once you have the minutes, lay them beside the letters on the boardroom table. And take a look at Ms. Mizuhara’s desk.'],
  2:['The letter has words of the president’s that aren’t in the minutes — from the ten minutes Ms. Mizuhara was out. ...Whoever wrote it wasn’t working from the minutes. They heard the meeting itself.',
     'At the table were the chairman, the president, Managing Director Kusumi, and Ms. Chihaya. ...Who gains most if the deal falls through?',
     'Talk to Ms. Chihaya in the reception room, and to the president. Then compare the other letters with the minutes.'],
  3:['Not Kusumi either. The letter writer has never seen the word “Daito” written down. They wrote the sounds just as they heard them.',
     '...Someone who wasn’t in the boardroom was hearing what was said there. Without any signal.',
     'Go over the boardroom again. And find out about this house’s past. Then the nib workshop out back — down the stairs. Talk to the chairman, Ms. Mizuhara, and Noguchi again too.'],
}});
// Takizawa's lines while the final deduction is being checked (used by talkTakizawa in common.js)
defCase('file08',{finalOpen:[
  'Back up every claim in Deduction ④ with evidence. Use the Case Board.',
  '...Before seven. Before tonight’s letter goes in the box.',
]});

defCase('file08',{EVHINT:{
  article:'Noguchi’s borrowing the original letters from the newspaper. He should be in the stair hall.',
  window:'Look out the boardroom window. There’s a building across the street.',
  phoneBox:'There’s a box for phones at the boardroom door.',
  sweep:'Mori’s checking the boardroom for bugs. Go get the result.',
  curtain:'What about the window during meetings? Ask Ms. Mizuhara in the secretary’s office.',
  minutes:'The minutes are in the safe in the president’s office. Ask the president to show you.',
  card:'Ask to see Ms. Mizuhara’s desk, in the secretary’s office.',
  diff1:'Lay the letters beside the minutes on the boardroom table. Something won’t match.',
  oppose:'Ask Ms. Chihaya from Daito about Kusumi’s position. She’s in the reception room.',
  stall:'What happened to the Daito talks after the letters came out? Ask the president.',
  diff2:'Compare the other letters with the minutes, too. Look closely at how the writer spells things.',
  pipeRoom:'The boardroom, once more. Mori’s got something on his mind.',
  pipeShop:'The nib workshop out back — down the stairs. Look around the tool shelf.',
  plan:'I want to know about this house’s past. Check the company-history case in the corridor.',
  wheelStop:'What was the workshop doing on Thursday afternoons, during the meetings? Ask Kuramochi, the young grinder.',
  paper:'Where does the letter paper come from? Look at the test-writing stand in the workshop.',
  shihoJo:'Compare the last letter with the minutes, too. On the boardroom table.',
  guardLog:'Does anyone from the workshop ever come into the main building? Noguchi’s checking the guard room’s log.',
  seat:'Ask Ms. Mizuhara about the seating at the meetings. Has anything changed?',
  verdigris:'Who opened the cap in the boardroom? Take a good look around the chairman in the reception room.',
}});
