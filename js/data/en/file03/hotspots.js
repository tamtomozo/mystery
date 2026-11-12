/* Data: FILE.03 places to examine (hotspots) (English) */
'use strict';

/* ---------- Major Crimes Division ---------- */
function actFridge(){
  if(!has('box')){
    say(ME,'The kitchenette fridge. On the middle shelf sits a box from “Patisserie Miyako.”');
    say(ME,'A sticky note on the lid reads “OKOCHI” in big letters. ...The lid is half open, and the box is empty. Only an ice pack is left.');
    say(ME,'Something seems to be stuck to the bottom of the box—');
    say('Okochi','Don’t touch that! ...The bottom has nothing to do with the case.','angry');
    give('box');
  }else if(phase()>=2){
    say(ME,'The empty Miyako box. Next to it are the rice crackers Ms. Komatsu put away.');
  }else{
    say(ME,'The empty Miyako box. The “OKOCHI” on the sticky note looks rather forlorn now.');
  }
}
function actOfficeDoor(){
  if(phase()<3){sys('For now, focus on investigating inside the division.'); return;}
  ask('','Take the stairs up to the roof?',[
    {label:'Go up to the roof',fn:()=>fade(()=>setMap('roof',9,13,'up'))},
    {label:'Cancel',fn:()=>{}}]);
}

/* ---------- Rooftop ---------- */
function actRoofTrash(){
  if(!avail('cup')){say(ME,'The trash bin next to the vending machine.'); return;}
  if(!has('cup')){
    say(ME,'The trash bin next to the vending machine, split into “Cans & Bottles” and “Other.”');
    say(ME,'In “Other” there’s a crumpled ball of paper. ...Something is wrapped inside.');
    say(ME,'I unfold it — an empty pudding cup and a wooden spoon. The bottom of the cup bears the “Patisserie Miyako” brand.');
    say(ME,'Eaten clean.');
    give('cup');
  }
  if(!has('memo')){
    say(ME,'The paper the cup was wrapped in is a page torn from a notebook. There’s a pencil scrawl on it.');
    sys('“Shirasagi Museum — Iwata patrol 20:00–20:35”');
    say(ME,'A note from the FILE.02 interviews... This blocky handwriting — it’s Takizawa’s.');
    give('memo');
  }else say(ME,'The trash bin where the pudding cup was thrown away.');
}

defCase('file03',{HS:{
  office:[
    ...spots([[18,1],[18,2]],actFridge,()=>!has('box')),
    {x:16,y:0,glow:()=>!has('rule'),act(){
      if(!has('rule')){
        say(ME,'There’s a notice on the wall beside the fridge.');
        sys('“The fridge is cleared out every Friday at 17:00. Unlabeled items will be thrown away. — Komatsu, Admin”');
        say(ME,'Today is Friday.');
        give('rule');
      }else say(ME,'The notice with the fridge rules. Clean-out is every Friday at 17:00.');}},
    {x:14,y:4,glow:()=>findable('conbini'),act(){
      if(!avail('conbini')) say(ME,'The kitchenette trash.');
      else if(!has('conbini')){
        say(ME,'I peer into the kitchenette trash. ...There’s a pudding cup!');
        say(ME,'—Or so I thought. It’s a convenience store “Melty Pudding.” Not from Miyako.');
        say(ME,'There’s a receipt underneath. 12:58, the convenience store in front of HQ. Melty Pudding, 1 item.');
        give('conbini');
      }else say(ME,'The trash where the convenience store pudding cup was. The Miyako cup isn’t here.');}},
    {x:14,y:1,act(){say(ME,'The sink. A teacup with “Okochi” on it sits upside down to dry.');}},
    {x:15,y:1,act(){say(ME,'The coffee maker. There’s a coin jar labeled “¥20 per cup.”');}},
    {x:12,y:0,glow:()=>!has('jelly'),act(){
      if(!has('jelly')){
        say(ME,'The division bulletin board. Among the schedules and memos, a written apology is pinned up.');
        sys('“I ate the jelly the Section Chief was keeping in the fridge, having mistaken it for a gift for everyone. I deeply regret my actions. — Officer Noguchi”');
        say(ME,'...A prior offense, then.');
        give('jelly');
      }else say(ME,'Noguchi’s written apology. “I deeply regret my actions” is written awfully large.');}},
    ...spots([[1,4],[1,5]],()=>{
      say(ME,'The whiteboard with everyone’s schedule.');
      sys('Okochi: Senior staff meeting 13:00–15:00 / Noguchi: Police box backup from 13:20 / Mori: Forensics');
      sys('Takizawa: Fieldwork from 12:30 (the “back at” column is blank)');
      if(phase()>=3) say(ME,'...I wonder what time Takizawa got back.');
    }),
    {x:8,y:2,glow:()=>findable('report'),act(){
      if(!avail('report')) say(ME,'The in-tray on Inspector Okochi’s desk. A few documents are in it.');
      else if(!has('report')){
        say(ME,'Inspector Okochi’s in-tray. On top is the FILE.02 investigation report, written by Takizawa.');
        say(ME,'The received stamp says — 14:10 today. Right in the middle of when the pudding vanished.');
        say(ME,'I turn the pages. ...In the bottom right of page 3, there’s a single brown stain.');
        say(ME,'I lean in. It smells sweet, and a little bitter.');
        say('Mori','Let me see that. ...Burnt caramel with liqueur in it. That smell — it’s Miyako’s baked pudding. No doubt about it.');
        give('report');
      }else say(ME,'The report with the caramel stain.');}},
    {x:9,y:2,act(){say(ME,'Inspector Okochi’s desk. The nameplate reads “Inspector Okochi, Major Crimes.” The desktop is neatly kept.');}},
    {x:10,y:2,glow:()=>findable('album'),act(){
      if(!avail('album')) say(ME,'The drawer of Inspector Okochi’s desk. I can’t just open it without asking.');
      else if(!has('album')){
        say(ME,'The bottom drawer of Inspector Okochi’s desk. There’s an old yearbook inside.');
        say(ME,'The cover reads “Police Academy, Class 48.” From 30 years ago.');
        say(ME,'The messages page. Next to a photo of a young Inspector Okochi, in blocky handwriting—');
        sys('“To Okochi — I’ll never forgive you for the dorm pudding. Takizawa”');
        say(ME,'...A grudge... over pudding?');
        give('album');
      }else say(ME,'The yearbook from 30 years ago. Takizawa’s handwriting on the messages page.');}},
    {x:2,y:7,act(){
      say(ME,'Takizawa’s desk. Three empty cans of coffee are lined up on it.');
      if(phase()>=3) say(ME,'The notebook he always keeps in his breast pocket isn’t on the desk.');}},
    {x:3,y:7,act(){say(ME,'An empty desk. Noguchi is using it for paperwork today.');}},
    {x:5,y:7,act(){say(ME,'Your desk. The FILE.02 files are still piled high.');}},
    {x:9,y:7,act(){say(ME,'A senior detective’s desk. Three teacups in a row.');}},
    {x:14,y:11,act(){say(ME,'Ms. Komatsu’s desk in Admin. A big bag of rice crackers and a guide to visitor cards.');}},
    ...spots([[18,8],[18,9]],()=>say(ME,'The copier. The “Out of Paper” light is on.')),
    {x:9,y:14,act:actOfficeDoor},
    {x:10,y:14,act(){say(ME,'The door’s card reader. You tap your ID card to get in and out. Admin can print out the log, I’m told.');}},
    {x:4,y:0,act(){say(ME,'Through the gaps in the blinds, the city in the afternoon.');}},
    {x:1,y:13,act(){say(ME,'A potted pothos. Someone seems to be overwatering it.');}},
  ],
  roof:[
    {x:4,y:1,glow:()=>findable('cup')||findable('memo'),act:actRoofTrash},
    ...spots([[2,1],[3,1]],()=>{
      say(ME,'A vending machine. Only the “Lightly Sweetened” canned coffee button has its label worn away.');}),
    ...spots([[8,7],[9,7],[10,7]],()=>say(ME,'An old bench. Takizawa often sits here with a canned coffee, lost in thought.')),
    ...spots([[14,3],[15,3],[16,3],[17,3]],()=>say(ME,'The water tower. A rusty ladder runs up its side.')),
    {x:0,y:7,act(){say(ME,'Beyond the fence, the city stretches out in the evening light.');}},
    {x:19,y:7,act(){say(ME,'Beyond the fence you can see the shopping street by the station.');}},
    {x:9,y:14,act(){
      ask('','Go back to the division?',[
        {label:'Back to the division',fn:()=>fade(()=>setMap('office',9,13,'up'))},
        {label:'Cancel',fn:()=>{}}]);}},
  ],
}});
