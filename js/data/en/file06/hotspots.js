/* Data: FILE.06 places to examine (hotspots) (English) */
'use strict';

/* Every case’s data shares the same globals, so function names get the f6 prefix */

/* ---------- Auditorium ---------- */
function f6ToLobby(){
  ask('','Go out to the lobby through the back doors?',[
    {label:'To the lobby',fn:()=>fade(()=>setMap('lobby',9,1,'down'))},
    {label:'Not now',fn:()=>{}}]);
}
function f6Breaker(){
  if(!has('breaker')){
    say(ME,'A cramped machine room in the wing of the stage. On the wall, a steel breaker panel.');
    say(ME,'The door is padlocked. I shine my light through the wire mesh.');
    say(ME,'The biggest lever — the main breaker — is all the way down at OFF.');
    say(ME,'If it had tripped from a short or an overload, the lever would stop halfway, between OFF and ON. ...Someone pushed it down by hand.');
    say(ME,'This panel is the only place you can cut power to the whole building. Not from outside. The blackout was caused in here.');
    give('breaker');
  }else{
    say(ME,'The breaker panel. The main breaker is still at OFF. It’s padlocked — no way to switch it back.');
    if(phase()>=3) say(ME,'Only two people have the key. ...Yaeko, and Goda.');
  }
}
function f6Exit(){
  if(f6Proven()){
    if(S.flags.escaped){say(ME,'The open emergency exit. Cold morning air is drifting in.'); return;}
    say(ME,'The combination lock on the exit. A red wire lock with four dials.');
    say(ME,'...What number would Goda use?');
    run(()=>openDial({answer:'0412',onOk:f6Escape,onNg:f6WrongCode}));
    return;
  }
  if(!has('padlock')){
    say(ME,'In the right wall of the auditorium, a green EXIT light.');
    say(ME,'The push bar and the railing beside it are wound round and round with a red wire lock. A four-digit combination.');
    say(ME,'The lock is on the inside of the door — the auditorium side. I push the bar. The door won’t budge.');
    give('padlock');
  }else{
    say(ME,'The combination lock. Four dials. 0000 to 9999 — the night’s too short to try them all.');
    if(phase()>=3) say(ME,'A red wire lock. ...The kind you’d use on a bicycle.');
  }
}
function f6WrongCode(){
  sys('Click, click... The lock doesn’t open.');
  if(!S.flags.codeHint){
    S.flags.codeHint=1;
    say(L.tak,'Goda’s number, huh. ...Yaeko might know something.');
    say(L.tak,'And take another look at page one of the projection log.');
  }
}
// The lock opens: out into the dawn, then straight to the interrogation
function f6Escape(){
  S.flags.escaped=1;
  sys('Click. — The wire lock falls loose.');
  say(ME,'...It’s open.');
  sys('I push the bar. Beyond the heavy door, a concrete fire escape. In the narrow strip of sky above, the dark is starting to pale.');
  band('event',{title:'5:40',sub:'— Dawn',auto:2600});
  say(L.tak,'Well, well... Fresh air, for the first time all night.');
  say(L.tak,'Goda. ...We’ll hear the rest down at the station.');
  say('Goda','.........','sad');
  run(()=>goInterro());
}

/* ---------- Lobby ---------- */
function f6ToTheater(){
  ask('','Go into the auditorium?',[
    {label:'Into the auditorium',fn:()=>fade(()=>setMap('theater',9,13,'up'))},
    {label:'Not now',fn:()=>{}}]);
}
function f6Shutter(){
  if(!has('shutter')){
    say(ME,'At the very top of the stairs up to the street, a steel fire shutter has come all the way down to the floor.');
    say(ME,'An old notice taped beside it: “Closes automatically in a power failure.”');
    say(ME,'On the pillar, a socket for a hand crank to wind it up. ...The hook below it, where the crank should hang, is empty.');
    give('shutter');
  }else if(has('handle')){
    say(ME,'I fit the crank I found into the socket and turn. ...It won’t move an inch.');
    say(ME,'A shutter that drops in a power cut won’t wind up by hand until it’s reset at the control panel. Without power, the crank is useless.');
  }else{
    say(ME,'The lowered fire shutter. I bang on it. Nothing answers from the other side.');
    say(ME,'The hook where the crank should hang is still empty.');
  }
}
function f6Phone(){
  if(!avail('phoneCut')){
    say(ME,'A pink payphone in the corner of the lobby. I pick up the receiver. ...Nothing. Not a sound.');
    say(ME,'Pink phones draw their power from the phone line. It should work even in a blackout.');
    return;
  }
  if(!has('phoneCut')){
    say(ME,'I ease the payphone’s stand away from the wall and look behind it.');
    say(ME,'...The line’s been cut. Not at an angle — a clean, perfectly straight cut.');
    say(ME,'There’s black oil on the cut end. I rub it between my fingers: machine oil. ...The kind you use on projectors.');
    give('phoneCut');
  }else say(ME,'The cut phone line. A straight cut, smeared with black oil.');
}
function f6Booth16(){
  if(!avail('projector16')){say(ME,'A small 16mm projector at the back.'); return;}
  if(!has('projector16')){
    say(ME,'A small 16mm projector at the back of the booth. ...There’s film threaded through it.');
    say(ME,'The lamp switch is still ON. The film has stopped on the white leader at its head.');
    say(ME,'Someone was about to start it — and that’s the moment the power died.');
    sys('Beside the projector, a note in round handwriting: “Switch over right after the screening! On Grandma’s signal.”');
    give('projector16');
  }else{
    say(ME,'The 16mm projector. The white leader is waiting for light.');
    if(phase()>=3) say(ME,'There’s a tiny notch scratched into the leader. ...“2/2”?');
  }
}
function f6Shelf(){
  if(!avail('handle')){
    say(ME,'A shelf of film cans. Each lid carries a title and a “SCREENED” tag.');
    return;
  }
  if(!has('handle')){
    say(ME,'I lift the cans one by one. One of the “SCREENED” cans is oddly heavy.');
    say(ME,'I open the lid. ...Instead of film, an iron crank handle has been jammed inside.');
    say(ME,'The crank for the fire shutter.');
    give('handle');
  }else say(ME,'The shelf of film cans. The one that held the crank is empty now.');
}
function f6Desk(){
  if(!avail('logbook')){say(ME,'The projectionist’s workbench. A film splicer, scissors for cutting film, an oil can.'); return;}
  if(!has('logbook')){
    say(ME,'On the workbench, a thick ledger. On the cover: “Projection Log.”');
    sys('Page one: “April 12, 1966. The Ginseiza opens. First projection.”');
    say(ME,'Sixty years of it, without missing a day — every film shown, every time. ...The handwriting grows older, page by page.');
    sys('The last line, dated last night: “Final screening. ...I’ll run it at dawn.”');
    say(ME,'Run it at dawn. ...Run what?');
    give('logbook');
  }else{
    say(ME,'The projection log. Page one: April 12, 1966. The last line: “I’ll run it at dawn.”');
    say(ME,'The film scissors on the workbench. Black oil is caked on the blades.');
  }
}
function f6Drawer(){
  if(!avail('can')){say(ME,'The workbench drawer. ...Better not open it without good reason.'); return;}
  if(!has('can')){
    say(ME,'I open the workbench drawer. Inside, a single old 16mm film can.');
    say(ME,'Faded tape on the lid. Fountain-pen handwriting.');
    sys('“On the day we close, watch this together with Yaeko. — Minoru”');
    say(ME,'Minoru — Yaeko’s late husband. The man who opened the Ginseiza.');
    give('can');
  }else say(ME,'Minoru’s can. “On the day we close, watch this together with Yaeko.”');
}
function f6Locker(){
  if(!avail('bikelock')){say(ME,'The locker at the end. Nameplate: “Goda.” Beside the door, a hook for hanging something.'); return;}
  if(!has('bikelock')){
    say(ME,'The locker marked “Goda.” The hook under the nameplate is empty.');
    say(ME,'Around the hook, the wall is scuffed with flecks of red paint. Something red has hung here every day.');
    say(ME,'...Yaeko said it: Goda always hangs his red combination bike lock right here.');
    say(ME,'The lock on the emergency exit was a red combination wire lock, too.');
    give('bikelock');
  }else say(ME,'Goda’s locker. The empty hook.');
}

defCase('file06',{HS:{
  theater:[
    ...spots([[9,14],[10,14]],f6ToLobby),
    {x:1,y:1,glow:()=>!has('breaker'),act:f6Breaker},
    {x:19,y:3,glow:()=>!has('padlock')||(f6Proven()&&!S.flags.escaped),act:f6Exit},
    ...spots([[5,2],[7,2],[9,2],[10,2],[12,2],[14,2]],()=>{
      say(ME,'The screen. The film cut out just as the hero stepped onto a station platform.');
      if(phase()>=2) say(ME,'...Sixty years of films, all shown on this white curtain.');}),
    {x:18,y:1,act(){say(ME,'The wing of the stage. The rope for the old main curtain is wound around a cleat on the wall.');}},
    {x:5,y:7,act(){
      say(ME,'A front-row seat. A handwritten tag on the back: “Owner’s Seat.”');
      if(phase()>=3) say(ME,'The seat beside it has the mark of an old tag too. ...Peeled off; I can’t read what it said.');}},
    {x:12,y:7,act(){say(ME,'Akari’s seat. Her lap blanket has slipped to the floor.');}},
    {x:14,y:9,act(){say(ME,'Mashiba’s seat. His coat is still draped over the back. Cigarette foil peeks out of a pocket.');}},
    {x:15,y:14,act(){
      say(ME,'High on the back wall of the auditorium, a small projection window. ...Pitch black now.');
      if(phase()>=2) say(ME,'The projection room is on the other side of that window.');}},
    {x:0,y:8,act(){say(ME,'An emergency light on the wall, glowing faintly green on battery. ...It should last till morning.');}},
    {x:19,y:12,act(){say(ME,'A fire extinguisher. The inspection tag carries Goda’s seal for every month.');}},
  ],
  lobby:[
    ...spots([[9,0],[10,0]],f6ToTheater),
    ...spots([[9,14],[10,14]],f6Shutter,()=>!has('shutter')),
    {x:2,y:7,glow:()=>!has('petition'),act(){
      if(!has('petition')){
        say(ME,'A cardboard box on the kiosk counter: “Save the Ginseiza — Petition Box.”');
        sys('The cover sheet of the bundle: “3,012 signatures. Organizer: Akari Hoshino.”');
        say(ME,'There are notes from regulars in here too. “We won’t let it close.” “On the last day, I’ll sit in front of the shutter and refuse to move.”...');
        say(ME,'Plenty of people were against the closing, it seems.');
        give('petition');
      }else say(ME,'The petition box. Over three thousand names.');
    }},
    ...spots([[1,7],[3,7],[4,7]],()=>say(ME,'The kiosk. A popcorn machine and bottles of ramune. The prices all look like they’re from decades ago.')),
    {x:18,y:7,glow:()=>findable('phoneCut'),act:f6Phone},
    {x:14,y:7,act(){say(ME,'The ashtray in the smoking corner. A half-smoked cigarette lies on the floor — dropped in the shock of the blackout, by the look of it.');}},
    ...spots([[6,9],[7,9],[8,9]],()=>say(ME,'A lobby bench. The fabric is worn thin by sixty years of customers.')),
    ...spots([[1,5],[2,5],[4,5],[5,5]],()=>{
      say(ME,'The wall is covered with posters of past features. Faded epics from the sixties, right up to last year’s hits.');
      if(phase()>=3) say(ME,'In the corner of the oldest poster, a pencil note: “Opening day — full house. Minoru, Yaeko, Goda.”');}),
    ...spots([[14,5],[15,5],[17,5],[18,5]],()=>say(ME,'The projection room wall. The sign on the door: “Projection Room — Staff Only.”')),
    /* Office */
    ...spots([[1,1],[2,1]],()=>{
      say(ME,'Yaeko’s desk. A draft of her closing speech, rewritten over and over. “Thank you for sixty years.”');
      if(phase()>=3) say(ME,'A photo frame on the desk: a young man and a crop-haired boy, laughing in front of a projector. ...On the back: “Minoru and young Goda.”');}),
    {x:5,y:1,act(){say(ME,'The office safe. Shut tight, with no sign anyone tried to force it.');}},
    /* Projection room */
    ...spots([[14,1],[15,1]],()=>{
      say(ME,'The big 35mm projector. The screening film is still threaded, stopped.');
      if(phase()>=3) say(ME,'From the film left on the reel, it stopped just short of the end of reel two. ...The power died right before the changeover.');}),
    {x:17,y:1,glow:()=>findable('projector16'),act:f6Booth16},
    ...spots([[18,2],[18,3]],f6Shelf,()=>findable('handle')),
    {x:14,y:3,glow:()=>findable('logbook'),act:f6Desk},
    {x:15,y:3,glow:()=>findable('can'),act:f6Drawer},
    {x:16,y:0,act(){say(ME,'The projection window. The whole auditorium is laid out below. ...For fifty years, Goda has watched the audience from this window.');}},
    /* Ticket booth, stairs */
    ...spots([[3,11],[3,12]],()=>{
      say(ME,'The ticket window. Yaeko has sat here for sixty years.');
      sys('A notice in the window: “Today — Noon: Farewell Show / Evening: Final Screening (private). Thank you for sixty years.”');}),
    ...spots([[8,12],[11,12]],()=>say(ME,'The handrail of the stairs up to the street. At the top, the shutter blocks the way.')),
    /* Staff room */
    ...spots([[15,13],[16,13],[17,13]],()=>say(ME,'Staff lockers. Nameplates: “Yaeko,” “Akari (temp),” and one unused.')),
    {x:18,y:13,glow:()=>findable('bikelock'),act:f6Locker},
  ],
}});
