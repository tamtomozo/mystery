/* Data: FILE.04 places to examine (hotspots) (English) */
'use strict';

/* ---------- Practice hall ---------- */
function actLetters(){
  if(!has('letter1')){
    say(ME,'The two threatening letters Ms. Chizuru laid out. Neither envelope has a stamp or a postmark.');
    say(ME,'Letter #1. A small children’s practice sheet, in clumsy brush strokes:');
    sys('“Stop the announcement of the successor, or you will surely regret it.”');
    say(ME,'Almost all hiragana. The only kanji is 必 — “surely.”');
    give('letter1');
  }
  if(!has('letter2')){
    say(ME,'Letter #2. The same paper, the same kind of clumsy writing:');
    sys('“Hand over the sign, and I will tell the world the secret of ■■ your brush.”');
    say(ME,'Just before “your,” something has been blacked out with ink. ...About two characters long.');
    give('letter2');
  }else{
    say(ME,'The two letters, side by side. The clumsiness of the writing only makes them creepier.');
    if(phase()>=3) say(ME,'You can disguise the shape, but not the habits in your hand...');
  }
}
function actDojoDoor(){
  if(phase()<1){sys('For now, focus on the practice hall.'); return;}
  ask('','Go out the front entrance to the lane?',[
    {label:'Go to the lane',fn:()=>fade(()=>setMap('alley',9,3,'down'))},
    {label:'Stay',fn:()=>{}}]);
}
function actBackDoor(){
  if(phase()<1){say(ME,'The hall’s back door. It’s locked from the inside.'); return;}
  ask('','Go out the back door to the narrow path?',[
    {label:'Out the back door',fn:()=>fade(()=>setMap('alley',2,3,'down'))},
    {label:'Stay',fn:()=>{}}]);
}

/* ---------- Front lane ---------- */
function actGate(){
  ask('','Go back into the practice hall through the lattice door?',[
    {label:'Back to the hall',fn:()=>fade(()=>setMap('dojo',9,13,'up'))},
    {label:'Stay',fn:()=>{}}]);
}
function actSidePath(){
  say(ME,'A narrow path between Bokkokai and the house next door, barely wide enough for one person.');
  say(ME,'It dead-ends at the practice hall’s back door.');
  ask('','Take the path and enter the hall by the back door?',[
    {label:'Enter by the back door',fn:()=>fade(()=>setMap('dojo',18,12,'left'))},
    {label:'Stay',fn:()=>{}}]);
}

defCase('file04',{HS:{
  dojo:[
    ...spots([[10,7],[11,7]],actLetters,()=>!has('letter1')||!has('letter2')),
    {x:18,y:2,glow:()=>!has('hanshi'),act(){
      if(!has('hanshi')){
        say(ME,'The children’s class shelf. Bundles of small practice sheets are stacked here.');
        say(ME,'...Same size as the letters. Held up to the light, even the paper grain looks the same.');
        sys('A tag on the shelf: “Children’s Class (Wed & Sat) — Teacher: Miyauchi”');
        give('hanshi');
      }else say(ME,'Bundles of children’s practice paper. Anyone could take some.');}},
    {x:18,y:1,act(){say(ME,'The children’s works are pinned up: “dream,” “flower,” “friends.” ...Free, lively writing.');}},
    {x:18,y:3,act(){say(ME,'Bottles of liquid ink and children’s brushes in a row.');}},
    {x:15,y:1,glow:()=>findable('meeting'),act(){
      if(!avail('meeting')) say(ME,'Ms. Chizuru’s desk. Tuition envelopes, ledgers, and a thick practice journal.');
      else if(!has('meeting')){
        say(ME,'The practice journal. Every day’s practice is recorded in meticulous handwriting.');
        say(ME,'The page from three weeks ago says “Instructors’ Meeting.”');
        sys('“The successor shall be announced at the exhibition. Not a word outside this meeting. Present: Juho, Takanashi, Miyauchi, Chizuru”');
        say(ME,'So only these four knew about the announcement.');
        give('meeting');
      }else say(ME,'The practice journal. “Not a word outside this meeting” is underlined twice.');}},
    {x:16,y:1,act(){say(ME,'A black rotary phone and a stack of exhibition invitations. Every address is handwritten.');}},
    {x:9,y:1,act(){
      say(ME,'The hanging scroll in the alcove: 一字一生 — “one character, one life.” Bold, commanding writing.');
      if(phase()>=3) say(ME,'...A whole life shows in a single character. Is that what it means?');}},
    {x:10,y:1,act(){say(ME,'A brush rack. Many brushes hang here — but one hook is empty. That’s where the broken brush used to hang.');}},
    {x:11,y:1,act(){say(ME,'Juho’s piece for the exhibition, mounted and carefully rolled.');}},
    {x:12,y:1,act(){
      say(ME,'A lacquered letter box sits on the shelf, tied tight with cord and sealed.');
      say('Chizuru','That’s... Father is going to open it on the day of the exhibition.');}},
    {x:14,y:7,glow:()=>findable('paris'),act(){
      if(!avail('paris')) say(ME,'Ms. Miyauchi’s desk. Neat and tidy, with a well-worn paperweight.');
      else if(!has('paris')){
        say(ME,'Ms. Miyauchi’s desk. ...There’s a fine inkstone here. Old, with a purplish tinge.');
        say(ME,'Under the inkstone, a letter with foreign stamps.');
        sys('“From the Paris Institute of Calligraphy — Dear Ms. Akari Miyauchi, we would be honored to welcome you as an instructor for one year, starting next month—”');
        say(ME,'Paris... So Ms. Miyauchi is leaving this school next month.');
        give('paris');
      }else say(ME,'Ms. Miyauchi’s desk. The old purplish inkstone... I feel like I’ve seen it somewhere before.');}},
    {x:15,y:7,act(){say(ME,'One of Ms. Miyauchi’s fair copies. Flowing, graceful writing.');}},
    {x:1,y:12,glow:()=>findable('kaiho'),act(){
      if(!avail('kaiho')) say(ME,'The shelf by the entrance. Issues of the Bokkokai newsletter, lined up in order.');
      else if(!has('kaiho')){
        say(ME,'Back issues of the Bokkokai newsletter. Each one prints photos of pupils’ works.');
        say(ME,'Ms. Miyauchi’s works... four times this year. A Chinese poem, a letter, a waka—');
        say(ME,'The kanji in Letter #3: 社, 中, 展, 日, 前, 筆, 折. ...Every one of them appears in her works.');
        give('kaiho');
      }else say(ME,'Back issues of the newsletter. Mr. Takanashi’s works appear in nearly every issue. ...All of them look just like Master Juho’s writing.');}},
    ...spots([[1,1],[2,1]],()=>{
      if(!avail('tracing')){say(ME,'A light table in the master’s room. Frosted glass on top, lit from below, for tracing models.'); return;}
      if(!has('tracing')){
        say(ME,'I open the light table’s drawer. ...A single newsletter.');
        say(ME,'The page with Ms. Miyauchi’s work. A few characters have thin pencil outlines drawn around them.');
        sys('Outlined: 社, 中, 展, 日, 前, 筆, 折');
        say(ME,'...The same characters as Letter #3.');
        give('tracing');
      }else say(ME,'The light table. Faint traces of ink remain on the frosted glass.');
    },()=>findable('tracing')),
    {x:4,y:1,glow:()=>findable('notebook'),act(){
      if(!avail('notebook')) say(ME,'Mr. Takanashi’s desk. I can’t go touching it without reason.');
      else if(!has('notebook')){
        say(ME,'Mr. Takanashi’s desk. Dozens of practice books are piled up. ...Thirty years of copying his teacher’s hand.');
        say(ME,'Every page is filled with writing that looks exactly like Master Juho’s.');
        say(ME,'I leaf through the newest one. Only the page dated two weeks ago has no copying on it.');
        sys('A single line, in a shaky hand: “The inkstone, to Miyauchi.”');
        give('notebook');
      }else say(ME,'Mr. Takanashi’s practice book. Only that one line — “The inkstone, to Miyauchi” — looks different from every other page.');}},
    {x:5,y:1,act(){say(ME,'A bookshelf in the master’s room. Collections of Master Juho’s old works, worn from use.');}},
    ...spots([[2,7],[3,7],[6,7],[7,7]],()=>say(ME,'A practice desk. A half-finished sheet still lies on the felt pad.')),
    ...spots([[2,10],[3,10],[6,10],[7,10],[10,10],[11,10],[14,10],[15,10]],()=>say(ME,'A practice desk. The ink in the inkstone has dried completely.')),
    ...spots([[5,13],[6,13]],()=>say(ME,'The shoe cabinet. A few pairs of small children’s sneakers have been left behind.')),
    {x:13,y:13,act(){say(ME,'An umbrella stand. Three spare umbrellas belonging to the school.');}},
    ...spots([[9,14],[10,14]],actDojoDoor),
    {x:19,y:12,act:actBackDoor},
    {x:0,y:7,act(){say(ME,'Through the lattice window, a tiny courtyard garden.');}},
  ],
  alley:[
    {x:2,y:2,act:actSidePath},
    ...spots([[9,2],[10,2]],actGate),
    {x:12,y:2,act(){
      say(ME,'Bokkokai’s mailbox. A wooden box with a narrow slot.');
      say(ME,'All three letters were put straight in here.');}},
    {x:8,y:2,act(){
      say(ME,'The Bokkokai sign. Commanding writing — Master Juho’s hand.');
      say(ME,'...Look closely and the ink is still fresh. It was rewritten recently.');}},
    {x:6,y:2,act(){say(ME,'The townhouse’s lattice window. A faint smell of ink drifts out.');}},
    {x:15,y:2,act(){
      say(ME,'A poster on the wall.');
      sys('“The 50th Bokkokai Exhibition — Sunday from 10 a.m. — Community Hall”');}},
    {x:17,y:2,act(){say(ME,'The entrance of the house next door, lined with potted plants.');}},
    ...spots([[3,12],[4,12],[5,12]],()=>{
      say(ME,'The glass door of Kuroda Realty, covered in property listings.');
      sys('“Townhouses Bought & Sold — Kuroda Realty”');}),
    ...spots([[13,12],[14,12],[15,12]],()=>{
      say(ME,'The entrance of a cram school.');
      sys('“Classes Mon–Fri 17:00–21:00”');}),
    {x:15,y:6,act(){say(ME,'A utility pole with a single streetlight. It must be pretty dark here at night.');}},
    {x:7,y:9,act(){say(ME,'Someone’s bicycle. A cram-school bag sits in the front basket.');}},
  ],
}});
