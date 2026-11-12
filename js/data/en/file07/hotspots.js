/* Data: FILE.07 places to examine (hotspots) (English) */
'use strict';

/* Every case’s data shares the same globals, so function names get the f7 prefix */

/* ---------- Ferris wheel plaza ---------- */
function f7ToOffice(){
  ask('','Go out through the gate to the office building?',[
    {label:'To the office',fn:()=>fade(()=>setMap('parkOffice',9,1,'down'))},
    {label:'Not now',fn:()=>{}}]);
}
function f7Gondola(){
  if(!has('emptyGondola')){
    say(ME,'Gondola 7, held at the boarding platform. I undo the latch on the outside of the door and look in.');
    say(ME,'Two benches facing each other. Under the seat, where Mr. Asakura left the bag... nothing.');
    say(ME,'When it came back down, the latch was still fastened from the outside. The only window that opens is the little one at the top. No adult could ever fit through.');
    give('emptyGondola');
  }else if(findable('seatBox')){
    say(ME,'Gondola 7’s seat. ...The seat cushion is a lid. I lift it.');
    say(ME,'A storage box for lap blankets. Inside, the blankets are pressed into a hollow — as if someone had been wrapped up in them.');
    sys('In the folds of the blankets, three little wrappers. “Shiomi Land Kiosk — Strawberry Drops.”');
    say(ME,'The lid can be pushed open from the inside too. ...A child could hide in here, curled up tight.');
    say(ME,'Haru said it: the young master always has strawberry drops in his pocket.');
    give('seatBox');
  }else if(has('seatBox')){
    say(ME,'The storage box under gondola 7’s seat. The strawberry drop wrappers still smell sweet.');
    if(f7Proven()) say(ME,'...For all twelve minutes Mr. Asakura was riding, Minato was right here.');
  }else{
    say(ME,'Gondola 7. There’s no handle or latch on the inside of the door. It only opens from outside.');
    if(phase()>=2) say(ME,'The little window at the top. The gap might just be wide enough for a child’s arm.');
  }
}
function f7Anemometer(){
  if(!has('anemometer')){
    say(ME,'Through the control booth window I can see the anemometer chart. A needle draws a line on slowly turning paper.');
    say(ME,'A notice on the wall: “Automatic stop at wind speeds of 15 m/s or more.”');
    say(ME,'Around four o’clock the line... crawls along at about 3 meters the whole time. There’s no trace of any strong wind at 16:14.');
    give('anemometer');
  }else say(ME,'The anemometer chart. At 16:14 the needle sits at about 3 meters. A calm afternoon.');
}
function f7Panel(){
  if(!avail('stopLog')){
    say(ME,'The control panel in the booth. A red lamp: HIGH WIND STOP.');
    say(ME,'This is Kaji’s post. ...Better not touch anything for now.');
    return;
  }
  if(!has('stopLog')){
    say(ME,'“It’s an emergency. I need to see this.” I lean past Kaji to read the control panel’s log.');
    sys('Lines printed on a narrow strip of paper. “16:14:05 MANUAL STOP (MAIN PANEL)” “16:17:10 RESTART (MAIN PANEL).”');
    say(ME,'If the wind had stopped it, it would say “HIGH WIND STOP (AUTO).” ...This is a record of someone stopping it by hand.');
    say(ME,'The switch for the red lamp is in the corner of the panel. You can flip it to HIGH WIND STOP by hand.');
    say(ME,'And the main panel exists only here, inside this booth.');
    give('stopLog');
  }else say(ME,'The control panel log. “16:14:05 MANUAL STOP (MAIN PANEL).”');
}
function f7WatchSpot(){
  if(!avail('blindSpot')){
    say(ME,'From four o’clock, Takizawa and I stood right here watching gondola 7.');
    say(ME,'The western sun was so bright, we couldn’t really see inside the gondola.');
    return;
  }
  if(!has('blindSpot')){
    say(ME,'I stand on our lookout spot again. A chalk mark at my feet.');
    say(ME,'Looking up from here... the low part of the wheel, to the right of the platform. The gondolas there disappear behind the big billboard on the machine house roof.');
    say(ME,'Mori said it: when the wheel stopped, gondola 7 was low down, to the right of the platform.');
    say(ME,'For those three minutes, gondola 7 was behind the billboard. We couldn’t see it at all.');
    say(ME,'And that’s exactly where the gondolas pass close enough to touch the machine house roof.');
    give('blindSpot');
  }else say(ME,'Our lookout spot. You can’t see behind the billboard from here.');
}
function f7Ladder(){
  if(!avail('roofPrints')){
    say(ME,'A steel ladder up to the machine house roof.');
    say(ME,'At the top is the back of the big billboard. I took a look, but it’s too gloomy to make anything out.');
    return;
  }
  if(!has('roofPrints')){
    say(ME,'I climb the ladder. The roof, behind the billboard. ...The sun is low now, slanting in under the sign.');
    say(ME,'In the raking light, footprints stand out in the dust. Small sneakers. About 21 centimeters.');
    say(ME,'They run straight from the railing, right where the gondolas pass, to the inspection hatch in the middle of the roof.');
    say(ME,'Blue fibers are caught on the railing. ...The same blue synthetic as the bag.');
    say(ME,'There isn’t a single adult footprint.');
    give('roofPrints');
  }else{
    say(ME,'The machine house roof. The small footprints end at the inspection hatch.');
    if(f7Proven()) say(ME,'Below the hatch is the machine room.');
  }
}
function f7MachineDoor(){
  if(f7Proven()){
    if(S.flags.rescued){say(ME,'The machine room. Only the hum of the motor is left.'); return;}
    if(!S.flags.kajiKey){
      say(ME,'The machine room door. It’s locked.');
      say(ME,'...Kaji should have the key.');
      return;
    }
    f7Rescue();
    return;
  }
  say(ME,'The steel door of the machine room. “AUTHORIZED PERSONNEL ONLY.” It’s locked.');
  say(ME,'Inside, the motor that turns the wheel is humming low.');
}
// Finding Minato in the machine room. Then straight to the interrogation
function f7Rescue(){
  S.flags.rescued=1;
  sys('Click. The machine room door swings open. The hum of the motor, the smell of oil.');
  say(ME,'...Minato?');
  sys('In the shadow of a huge gear, a boy lies asleep, wrapped in a lap blanket, his head on the blue sports bag. Around his shoulders, a Ferris wheel operator’s jacket, far too big for him.');
  band('event',{title:'16:58',sub:'— Minato, found',auto:2600});
  say('Minato','...Mm. ...Mr. Kaji? Is it five already?');
  say(ME,'Police. ...We’ve come to take you home.');
  say('Minato','...Where’s Papa?','uneasy');
  sys('Hearing the radio, Mr. Asakura comes running from the office. Without a word, he takes his son in his arms.');
  sys('Inside the bag: the bundles of cash, untouched, and a bag of strawberry drops.');
  say('Minato','...I’m sorry.','sad');
  say('Asakura','...It’s all right. ...It’s all right.');
  band('event',{title:'17:00',sub:'— The closing chime',auto:2600});
  sys('The closing chime drifts across the park. On its timer, the Ferris wheel’s lights flicker on by themselves.');
  say(L.tak,'Mr. Kaji. ...We’ll hear the rest at the station.');
  say('Kaji','...Yeah.','sad');
  run(()=>goInterro());
}

/* ---------- Office building ---------- */
function f7ToWheel(){
  ask('','Go back to the Ferris wheel plaza?',[
    {label:'To the plaza',fn:()=>fade(()=>setMap('wheel',9,13,'up'))},
    {label:'Not now',fn:()=>{}}]);
}
function f7Recorder(){
  if(!has('callMemo')){
    say(ME,'The recorder on the meeting room table. Both of the kidnapper’s calls are on it. I press play.');
    sys('14:02. A shrill, machine-twisted voice. “I have Minato. The ransom is 3,120,000 yen. Don’t tell the police.”');
    sys('15:32. “Four o’clock, the Ferris wheel. The father rides gondola 7, alone. Leave the bag under the seat and get off. Then let the gondola go round once more.”');
    sys('“Once I’ve checked the money, at five o’clock, I’ll tell you where Minato is.”');
    say(ME,'3,120,000 yen. ...An oddly specific number for a ransom.');
    give('callMemo');
  }else{
    say(ME,'The recording of the kidnapper’s calls. “At five o’clock, I’ll tell you where Minato is.”');
    if(phase()>=3) say(ME,'Faint, behind the voice: the departure bell of the Ferris wheel.');
  }
}
function f7Ledger(){
  if(!avail('ledger')){
    say(ME,'The reception desk. The Ferris wheel booking ledger, and a file of lost-child reports.');
    return;
  }
  if(!has('ledger')){
    say(ME,'I leaf through the Ferris wheel booking ledger. Private evening rides come up maybe once every couple of months.');
    sys('“Sun., March 12, 17:00. Ferris wheel, private after closing, one turn. Mr. Kyosuke Asakura. *Son’s birthday.*”');
    say(ME,'...That’s today. Mr. Asakura booked it two weeks ago.');
    sys('A single line runs through it. “3/10 Cancelled by Mr. Asakura.” In the “taken by” column: Kaji’s seal.');
    say(ME,'March 10 was a Friday. ...And five o’clock — the time the kidnapper promised to say where Minato is.');
    give('ledger');
  }else say(ME,'The ledger. “March 12, 17:00. Mr. Kyosuke Asakura. Son’s birthday.” Crossed out.');
}
function f7Locker(){
  if(!avail('voiceToy')){say(ME,'Staff lockers. A name tag: “Kaji.” ...Better not open it without good reason.'); return;}
  if(!has('voiceToy')){
    say(ME,'The locker marked “Kaji.” It isn’t locked. I open the door.');
    say(ME,'On top of his work clothes sits something that doesn’t belong: a plastic voice changer, a children’s toy.');
    say(ME,'A sticker on the back: “Shiomi Land Game Corner — Prize.”');
    sys('Taped inside the door, today’s shift sheet. Kaji’s breaks: “13:55–14:10” and “15:25–15:40.”');
    say(ME,'The kidnapper called at 14:02 and 15:32, from the phone beside the platform. ...A perfect match.');
    give('voiceToy');
  }else say(ME,'Kaji’s locker. The breaks on his shift sheet line up with the kidnapper’s calls.');
}

defCase('file07',{HS:{
  wheel:[
    ...spots([[9,14],[10,14]],f7ToOffice),
    ...spots([[9,5],[10,5]],f7Gondola,()=>!has('emptyGondola')||findable('seatBox')),
    {x:5,y:6,glow:()=>!has('anemometer'),act:f7Anemometer},
    {x:6,y:6,glow:()=>findable('stopLog'),act:f7Panel},
    {x:9,y:10,glow:()=>findable('blindSpot'),act:f7WatchSpot},
    {x:18,y:5,glow:()=>findable('roofPrints'),act:f7Ladder},
    {x:15,y:6,glow:()=>f7Proven()&&!S.flags.rescued,act:f7MachineDoor},
    {x:12,y:6,act(){
      say(ME,'A green public phone beside the platform.');
      if(has('callLog')) say(ME,'The kidnapper called from here. A stone’s throw from the platform — not ten steps from the control booth.');
      else say(ME,'Does anyone even use these anymore?');}},
    ...spots([[2,4],[2,5]],()=>{
      say(ME,'The plaza clock tower.');
      sys(`The hands point to ${CASE.clock().main}.`);
      say(ME,'At five, the closing chime will ring.');}),
    ...spots([[5,5],[6,5]],()=>say(ME,'The Ferris wheel control booth. Through the little window: the control panel and the anemometer chart.')),
    ...spots([[13,6],[14,6],[16,6],[17,6]],()=>{
      say(ME,'The machine house wall. On the roof stands a huge “Shiomi Land” billboard.');
      if(phase()>=3) say(ME,'The left edge of the billboard almost touches the path the gondolas take.');}),
    ...spots([[7,4],[8,4]],()=>{
      say(ME,'The big Ferris wheel. Twelve gondolas. Twelve minutes a turn.');
      say(ME,'It sits still now, with gondola 7 held at the platform.');}),
    ...spots([[2,10],[3,10],[4,10],[4,11],[4,12],[4,13]],()=>{
      say(ME,'The merry-go-round. At 13:40, Minato vanished in front of it.');
      if(phase()>=3) say(ME,'From here to the Ferris wheel platform is less than a minute’s walk, straight across.');}),
    ...spots([[6,13],[7,13]],()=>say(ME,'The soft serve stand. Haru lost sight of Minato while she was standing in line here.')),
    ...spots([[15,11],[16,11],[17,11]],()=>say(ME,'A plaza bench. Three of Toru’s cigarette butts at its feet.')),
    ...spots([[13,13],[14,13],[17,13],[18,13]],()=>say(ME,'A flower bed. Tulip buds nod in the evening breeze.')),
  ],
  parkOffice:[
    ...spots([[9,0],[10,0]],f7ToWheel),
    ...spots([[15,2],[16,2]],f7Recorder,()=>!has('callMemo')),
    {x:2,y:1,glow:()=>findable('ledger'),act:f7Ledger},
    {x:4,y:13,glow:()=>findable('voiceToy'),act:f7Locker},
    ...spots([[1,13],[2,13],[3,13]],()=>say(ME,'Staff lockers. Name tags: “Soft Serve,” “Merry-Go-Round,” “Cleaning.”')),
    ...spots([[1,7],[3,7]],()=>{
      say(ME,'The lost-child desk. In the report file: “13:50 — Minato Asakura (10) — in front of the merry-go-round.”');
      say(ME,'The announcement went out twice. No answer came.');}),
    {x:3,y:1,act(){say(ME,'The reception desk. A row of park brochures. “Rent the Ferris wheel for a private evening ride.”');}},
    {x:5,y:1,act(){say(ME,'A filing cabinet. “Inspections,” “Lost Property,” “Group Bookings.”');}},
    {x:14,y:1,act(){say(ME,'The meeting room sofa. Mr. Asakura’s coat is still draped over it.');}},
    ...spots([[18,1],[18,2],[18,3]],()=>{
      say(ME,'The window. You can see the wheel, standing still.');
      if(phase()>=2) say(ME,'The sky is slowly turning red.');}),
    {x:18,y:7,act(){say(ME,'A vending machine. Only the HOT drinks row is sold out.');}},
    ...spots([[8,9],[11,9]],()=>say(ME,'A potted plant.')),
    ...spots([[15,11],[16,11]],()=>{
      say(ME,'The broadcast microphone. The script for the closing announcement lies beside it: “Thank you for visiting Shiomi Land today...”');}),
    ...spots([[18,11],[18,12]],()=>{
      say(ME,'The game corner prize shelf. Stuffed toys, water pistols, voice changers.');
      if(has('voiceToy')) say(ME,'One of the voice changer boxes is empty.');}),
    ...spots([[9,14],[10,14]],()=>say(ME,'The front entrance. Outside is the parking lot. Mr. Asakura’s black car is still sitting there, engine idling.')),
  ],
}});
