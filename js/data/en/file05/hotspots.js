/* Data: FILE.05 places to examine (hotspots) (English) */
'use strict';

/* All cases' data share one global scope, so FILE.05's functions are prefixed with f5 */

/* ---------- Schoolyard ---------- */
function f5ToSchool(){
  ask('','Go into the north building through the entrance?',[
    {label:'Go inside',fn:()=>fade(()=>setMap('school',9,13,'up'))},
    {label:'Stay',fn:()=>{}}]);
}
function f5Hole(){
  if(!has('hole')){
    say(ME,'North of the stump, a hole gapes open. About 80 cm deep.');
    say(ME,'At the bottom, the round print of a buried can. Rust has stained the soil.');
    say(ME,'The time capsule the graduates buried twenty-five years ago. ...What was here is gone.');
    give('hole');
  }else{
    say(ME,'The empty hole. A round rust stain at the bottom.');
    if(phase()>=3) say(ME,'Only the soil around the hole is red. ...Red clay, brought in for the cherry tree.');
  }
}

/* ---------- North building ---------- */
function f5ToYard(){
  ask('','Go out to the schoolyard through the entrance?',[
    {label:'Go outside',fn:()=>fade(()=>setMap('schoolyard',9,3,'down'))},
    {label:'Stay',fn:()=>{}}]);
}
function f5Panel(){
  if(!has('security')){
    say(ME,'The security panel on the staff room wall. A row of lamps, and a printer for the log.');
    say(ME,'I print the log for the past two weeks of nights.');
    sys('“20:00 Alarm set ... 20:58 Switched off (caretaker card)” — the same every night.');
    say(ME,'From 20:00 until Gen-san switches it off, not a single door, window, or motion sensor triggered.');
    say(ME,'...There’s no way anyone slipped into the music room at 9 p.m.');
    give('security');
  }else if(findable('sensor')){
    say(ME,'I print a more detailed log for last night.');
    sys('“20:58 Switched off (staff entrance, caretaker card) / 21:02–21:38 Motion sensor (far end of north building, outside music room) / 21:40 Alarm set”');
    say(ME,'From just after nine, Gen-san was outside the music room for nearly forty minutes. ...Searching for where the piano music was coming from.');
    say(ME,'Yota saw the will-o’-the-wisp at 21:10. At that moment, Gen-san wasn’t in the schoolyard.');
    give('sensor');
  }else{
    say(ME,'The security panel. Only the staff room card and Gen-san’s caretaker card can switch it off.');
  }
}

defCase('file05',{HS:{
  schoolyard:[
    ...spots([[9,2],[10,2]],f5ToSchool),
    {x:15,y:4,glow:()=>!has('hole'),act:f5Hole},
    {x:15,y:5,act(){
      say(ME,'The cherry tree stump. They say it was cut down ten years ago because it was sick.');
      say(ME,'Only the soil around the stump is red. Everywhere else, the schoolyard is pale sand.');}},
    /* The hedge: blue cellophane */
    ...spots([[18,9],[18,10],[18,11]],()=>{
      if(!avail('cellophane')){say(ME,'The hedge east of the stump. Low branches, thickly grown.'); return;}
      if(!has('cellophane')){
        say(ME,'Deep in the hedge, something blue is caught among the branches.');
        say(ME,'...A circle of blue cellophane. About the size of a flashlight’s head, with tape marks around the edge.');
        say(ME,'Stick it over a light, and the light turns blue. From a distance — a will-o’-the-wisp.');
        give('cellophane');
      }else say(ME,'The hedge. Where the blue cellophane was caught.');
    },()=>findable('cellophane')),
    {x:17,y:7,act(){
      say(ME,'A statue of Ninomiya Kinjiro — the boy reading a book while carrying firewood on his back.');
      say(ME,'In front of the pedestal, the ground has been raked flat. ...So this is mystery number six, the “mound of earth every morning.”');
      if(phase()>=3) say(ME,'The flattened soil is red. Someone carried it here from around the stump and dumped it.');}},
    {x:19,y:6,act(){
      say(ME,'The east fence. Across from it stands a two-story house. Yota’s house.');
      say(ME,'From the second-floor window, you could see the east corner of the schoolyard clearly.');}},
    ...spots([[2,4],[3,4],[2,5],[3,5]],()=>{
      say(ME,'The sports shed. Line markers and shovels are lined up inside.');
      say(ME,'The shovels are all dry, their blades clean. None of them has been used recently.');}),
    ...spots([[5,6],[6,6],[7,6]],()=>{
      say(ME,'Class 6-1’s vegetable patch. Rows of radish leaves in rich black soil.');
      sys('A sign: “Class 6-1 — Our Last Radishes. We’ll eat them together at the closing ceremony.”');}),
    {x:3,y:10,act(){
      say(ME,'The caretaker’s house. Gen-san lives here alone.');
      say(ME,'The window faces right out onto the schoolyard. Any light or noise at night, he’d notice right away.');}},
    ...spots([[6,11],[7,11],[8,11]],()=>say(ME,'Horizontal bars, low to high. Only the lowest bar is worn white where hands grip it.')),
    {x:12,y:12,act(){say(ME,'A weather station box. The white paint is peeling here and there. Gen-san records the thermometer inside every morning, apparently.');}},
    ...spots([[9,14],[10,14]],()=>{
      say(ME,'The school gate. A nameplate on the gatepost: “Tsukikagedai Elementary School.” It’s locked at night.');
      say(ME,'The keys are held by the principal, the teachers, and Gen-san.');}),
    ...spots([[3,2],[6,2],[13,2],[16,2]],()=>say(ME,'A window of the north building. Inside, a banner the children drew: “Thank you, Tsukikagedai Elementary.”')),
  ],
  school:[
    ...spots([[9,14],[10,14]],f5ToYard),
    {x:2,y:14,act(){say(ME,'The staff side door. It can’t be opened from outside without a key.');}},
    /* Staff room */
    {x:1,y:1,glow:()=>findable('security')||findable('sensor'),act:f5Panel},
    {x:2,y:1,act(){say(ME,'The key cabinet. Music room, science room, school gate... every key in the school hangs here. Only the teachers and Gen-san know the code.');}},
    ...spots([[4,1],[5,1]],()=>{
      say(ME,'A whiteboard: “7 days until the closing ceremony.”');
      sys('“Saturday: Closing ceremony (capsule opening, letter reading, words of thanks). TV coverage.”');}),
    {x:7,y:1,act(){say(ME,'The copier. A run of ceremony invitations has stopped halfway through.');}},
    {x:6,y:3,act(){
      say(ME,'Ms. Shirakawa’s desk. A stack of the children’s essays, titled “Thank You, Tsukikagedai Elementary.”');
      if(phase()>=3) say(ME,'In the drawer, an old CD case. On the spine, in a child’s writing: “graduation.” ...It’s empty.');
      else say(ME,'In the corner of the desk, a photo of her with six children.');}},
    ...spots([[2,3],[3,3],[4,3],[5,3]],()=>say(ME,'The teachers’ desks. Stacks of tests and the ceremony guest list.')),
    /* Principal's office */
    ...spots([[9,1],[10,1]],()=>{
      if(!avail('diary')){say(ME,'The archive. A hundred and two years of school logs, shelved year by year.'); return;}
      if(!has('diary')){
        say(ME,'I pull out the school log from twenty-five years ago. December, three months before graduation.');
        sys('“Small fire in the old building’s science prep room. Put out by caretaker Genda. Cause: Genda’s careless cigarette. Genda has submitted a written apology.”');
        say(ME,'In the margin, one more line, in the then-homeroom teacher’s hand.');
        sys('“‘Seven Mysteries’ craze among the sixth graders. Instructed them to stay away from the building at night.”');
        give('diary');
      }else say(ME,'The school log from twenty-five years ago. Only the line “Genda’s careless cigarette” has smudged ink.');
    },()=>findable('diary')),
    {x:11,y:1,act(){say(ME,'Photos of the past principals. Under the newest frame at the end, a nail with nothing hanging on it yet.');}},
    ...spots([[9,3],[10,3]],()=>say(ME,'The principal’s desk. A draft of the ceremony speech, rewritten again and again.')),
    /* Music room */
    ...spots([[14,2],[15,2],[14,3],[15,3]],()=>{
      if(!avail('speaker')){
        say(ME,'The music room’s grand piano. ...At 9 p.m., they say, it plays by itself.');
        say(ME,'I lift the lid a little, but it’s too dark inside to see much.');
        return;
      }
      if(!has('speaker')){
        say(ME,'I open the lid and shine a flashlight deep inside.');
        say(ME,'...On the strings sits a black box the size of a palm. A waterproof speaker.');
        sys('On the back, the timer settings: “Daily 21:00 play / stop after 40 min”');
        say(ME,'So this is the 9 p.m. piano. The music room is at the far end of the north building. Its windows face north — you can’t see the schoolyard.');
        give('speaker');
      }else say(ME,'The grand piano. Mori took the speaker.');
    },()=>findable('speaker')),
    ...spots([[17,1],[18,1]],()=>say(ME,'Portraits of composers. ...In this school’s Seven Mysteries, their eyes apparently don’t move.')),
    /* Corridor */
    {x:0,y:8,glow:()=>findable('program'),act(){
      if(!avail('program')){say(ME,'The bulletin board. In the children’s handwriting: “7 days until our school closes.”'); return;}
      if(!has('program')){
        say(ME,'The program for the closing ceremony is pinned to the board.');
        sys('“1. Opening of the time capsule. 2. Reading of ‘Letters to Myself in Twenty-Five Years’ by the graduates (local TV coverage). 3. Words of thanks — Mr. Shigeru Genda, caretaker (retiring this year).”');
        say(ME,'Each letter is read aloud by the one who wrote it. ...In front of Gen-san. In front of the cameras.');
        give('program');
      }else say(ME,'The ceremony program. “Words of thanks — Mr. Shigeru Genda” is printed especially large.');}},
    {x:19,y:7,act(){say(ME,'A fire extinguisher. The inspection tag carries Gen-san’s stamp, every single month.');}},
    /* Staff entrance: shoe cubbies */
    ...spots([[1,10],[1,11],[1,12]],()=>{
      if(!avail('boots')){say(ME,'The staff shoe cubbies. Indoor shoes, and a few pairs of rain boots.'); return;}
      if(!has('boots')){
        say(ME,'I check the rain boots, pair by pair.');
        say(ME,'The pair labeled “Shirakawa.” ...Dried red clay is caked in the treads.');
        say(ME,'The schoolyard is sand. The only red clay is around the stump. And the vegetable patch soil was black.');
        give('boots');
      }else say(ME,'Ms. Shirakawa’s rain boots. The red clay isn’t completely dry yet.');
    },()=>findable('boots')),
    /* Broadcast room */
    ...spots([[5,12],[6,12]],()=>{
      say(ME,'The broadcast room’s console. A microphone and an old cassette deck.');
      if(phase()>=1){
        say(ME,'The schedule shows a “21:00 chime” booked on several nights.');
        say(ME,'Bookings can only be made from the staff room computer. ...So that’s mystery number three.');
      }}),
    /* West stairs */
    ...spots([[7,10],[8,10]],()=>{
      say(ME,'The west stairs. I count them, one by one. ...Twelve.');
      say(ME,'Count the step up to the landing, and it’s thirteen. That must be mystery number five.');}),
    /* Science room */
    {x:14,y:10,act(){
      say(ME,'The science room’s anatomy model. It’s facing the window. ...Mystery number four.');
      say(ME,'On the floor at its feet, scuff marks — as if it gets nudged a little every morning.');}},
    ...spots([[12,12],[13,12]],()=>say(ME,'A black lab bench lined with alcohol lamps. ...A sign: “Handle fire with care.”')),
    /* Class 6-1 */
    {x:16,y:10,act(){
      say(ME,'The cleaning-supplies locker. ...It’s locked.');
      if(phase()>=3) say(ME,'From the gap under the door comes a faint smell of damp earth.');}},
    ...spots([[18,10],[18,11]],()=>{
      say(ME,'The science materials shelf. A box marked “Properties of Light” holds red, blue, and yellow cellophane.');
      if(phase()>=3) say(ME,'...Only the blue sheet has a circle cut out of it.');}),
    ...spots([[16,12],[17,12],[18,12]],()=>say(ME,'Class 6-1 has only six desks. This year’s graduating class is six children.')),
  ],
}});
