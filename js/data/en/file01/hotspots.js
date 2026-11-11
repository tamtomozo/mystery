/* Data: FILE.01 places to examine (hotspots) (English) */
'use strict';

defCase('file01',{HS:{
  study:[
    {x:5,y:3,glow:()=>!has('key'),act(){
      if(!has('key')){say(ME,'A brass key sits on the desk.');say(ME,'This is the only key to the study. Apparently no duplicate was ever made.');give('key');}
      else say(ME,'The one and only study key. It was found on this desk this morning.');}},
    {x:7,y:4,glow:()=>findable('ledger'),act(){
      if(!avail('ledger')){
        say(ME,'The desk drawer. It’s locked.');
        say(ME,'The key to the drawer hasn’t turned up. I’ll ask Forensics to open it.');
      }else if(!has('ledger')){
        say(ME,'Inside the drawer Forensics opened is a leather-bound ledger.');
        say(ME,'Red circles everywhere... Have the figures been altered?');
        say(ME,'In the margin, in the master’s hand: “Question Kashiwagi about this.”');
        say(ME,'An envelope is tucked into the last page, addressed “To Kashiwagi.” It’s still sealed.');
        give('ledger');
      }else say(ME,'A ledger with signs of tampering. I’ll keep the envelope sealed as evidence.');}},
    {x:17,y:1,glow:()=>findable('statue'),act(){
      if(!avail('statue')) say(ME,'A bookcase. Foreign books and business titles in neat rows.');
      else if(!has('statue')){
        say(ME,'Something’s lying in the shadows under the bookcase.');
        say(ME,'...A bronze statue. The bottom of its round base looks like blood was wiped off it.');
        sys('Forensics’ quick test — positive luminol reaction. It matches the shape of the head wound.');
        give('statue');
      }else say(ME,'The bookcase where the bronze statue turned up. It was a heavy thing.');}},
    {x:12,y:9,glow:()=>!has('cup'),act(){
      if(!has('cup')){say(ME,'Two teacups on the table, both half-finished.');say(ME,'Last night, the master sat across from someone in this room...?');give('cup');}
      else say(ME,'The two teacups. Cold tea is still left in them.');}},
    {x:17,y:7,glow:()=>!has('body'),act(){
      if(!has('body')){say(ME,'A chalk outline marks where the body lay, in front of the fireplace.');say(ME,'Soichiro Kurosaki, 62, master of the manor. Cause of death: a blow to the back of the head. Estimated time of death: 21:00 to 23:00 last night.');give('body');}
      else say(ME,'Where the body was. He fell with his head toward the fireplace.');}},
    {x:9,y:14,glow:()=>!has('window')||(has('thread')&&!has('scratch')),act(){
      if(!has('window')){say(ME,'The study’s only window. The crescent latch is firmly fastened.');say(ME,'Outside is the garden.');give('window');}
      else if(has('thread')&&!has('scratch')){
        say(ME,'Fishing line with a loop at the end... Could it be—');
        say(ME,'I lean in close to the window frame.');
        say(ME,'A fresh scratch along the bottom of the frame, like something thin rubbed against it! Even shut, there’s a gap wide enough for a single line.');
        give('scratch');
      }else say(ME,'The window, latched. Outside is the garden.');}},
    {x:9,y:0,glow:()=>findable('door'),act(){
      if(!has('door')){
        say(ME,'The door an officer broke down this morning. It was locked from the inside.');
        if(avail('door')){
          say(ME,'What if the culprit left by the door and put the key back inside...? I check under the door.');
          say(ME,'No gap between the door and the floor, and the threshold is high. There’s no sliding a key in from outside.');
          give('door');
        }
      }
      if(phase()<2){sys('Forensics is still working in the garden past the hallway. Focus on the study for now.'); return;}
      ask('','Go through the hallway to the garden?',[
        {label:'Go to the garden',fn:()=>fade(()=>setMap('garden',16,3,'down'))},
        {label:'Cancel',fn:()=>{}}]);}},
    {x:19,y:7,act(){say(ME,'The fireplace. The ashes are stone cold. It wasn’t lit last night.');}},
    {x:1,y:7,act(){say(ME,'A glass-fronted cabinet lined with expensive liquor. Nothing looks disturbed.');}},
    {x:2,y:1,act(){say(ME,'A bookcase crammed with business books.');}},
  ],
  garden:[
    {x:16,y:2,act(){
      if(!S.flags.backdoor){S.flags.backdoor=1;say(ME,'The manor’s back door. The window right next to it belongs to Kashiwagi, the live-in secretary.');}
      ask('','Go back to the study?',[
        {label:'Back to the study',fn:()=>fade(()=>setMap('study',9,1,'down'))},
        {label:'Cancel',fn:()=>{}}]);}},
    {x:9,y:2,act(){say(ME,'The study window, seen from outside. The sill is low — an adult could climb over it easily.');}},
    {x:8,y:3,glow:()=>findable('thread'),act(){
      if(!avail('thread')) say(ME,'The shrubs under the window.');
      else if(!has('thread')){
        say(ME,'A clear line is caught on a branch.');
        say(ME,'Fishing line. One end is tied into a small loop.');
        say(ME,'Right below the study window... I should examine the window again, from the inside.');
        give('thread');
      }else say(ME,'The shrubs where the fishing line was caught.');}},
    {x:11,y:3,glow:()=>findable('button'),act(){
      if(!avail('button')) say(ME,'The shrubs under the window. Some branches are broken.');
      else if(!has('button')){
        say(ME,'The culprit is someone inside the manor... I search the shrubs again, carefully.');
        say(ME,'Something glints deep among the roots.');
        say(ME,'A silver cufflink, engraved with the initial “K.”');
        give('button');
      }else say(ME,'The shrubs where the cufflink was lying.');}},
    {x:13,y:4,glow:()=>findable('footprint'),act(){
      if(!avail('footprint')) say(ME,'Muddy ground.');
      else if(!has('footprint')){
        say(ME,'Footprints run from below the window toward the back door.');
        say(ME,'Size 26 cm leather shoes, sharp in the mud. ...Not a single print heads toward the gate.');
        give('footprint');
      }else say(ME,'The footprints leading from the window to the back door.');}},
    {x:15,y:9,act(){say(ME,'A storage shed. It’s locked, and nothing looks disturbed.');}},
    {x:5,y:6,act(){say(ME,'A small pond. A single koi swims slowly around.');}},
  ],
}});
