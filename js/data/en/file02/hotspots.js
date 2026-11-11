/* Data: FILE.02 places to examine (hotspots) (English) */
'use strict';

/* When one object spans several tiles (the case, shop shelves, staff exit), repeat the same act.
   Only the first tile gets the sparkle (glow) */
function spots(list,act,glow){return list.map(([x,y],i)=>({x,y,act,glow:i===0?glow:undefined}));}

/* ---------- Gallery ---------- */
function actCase(){
  if(!has('fake')){
    say(ME,'Inside the display case is a brooch set with a blue jewel.');
    say(ME,'...So this is the “Azure Drop.” But this morning’s re-appraisal found it was a glass fake.');
    say(ME,'If no one told you, you’d think it was the real thing.');
    give('fake');
  }else if(findable('lock')){
    say(ME,'There’s an electronic lock panel on the front of the case. I bring up its access log.');
    sys('Last unlocked: yesterday 18:00 (Director’s card) — locked 18:10');
    say(ME,'The case hasn’t been opened once since then... on paper, anyway.');
    say(ME,'According to Forensics, the only way to open it without leaving a record is the maintenance key in the security office.');
    give('lock');
  }else{
    say(ME,'The glass fake glitters innocently. Apparently there’s a weight sensor built into the pedestal.');
  }
}
function actShop(){
  if(!has('replica')){
    say(ME,'The museum shop beside the exit. Replicas of the “Azure Drop” are on display.');
    say(ME,'¥18,000 each. Made by a workshop on commission — 20 of them for the shop, I’m told.');
    say(ME,'...They look exactly like the fake in the case.');
    give('replica');
  }else if(findable('real')){
    say(ME,'If I were hiding the real one... Where better to hide a tree than in a forest?');
    say(ME,'I count the replicas on display, one by one.');
    say(ME,'...There are 21. There should only be 20 for the shop.');
    say(ME,'I pick them up and compare them one at a time — and one is noticeably heavier.');
    sys('Forensics weighs it — 38.2 grams.');
    say(ME,'It’s the real Azure Drop!');
    give('real');
  }else if(has('real')){
    say(ME,'The replica display where the real Azure Drop was hidden.');
  }else{
    say(ME,'Rows of replicas. They all look the same.');
  }
}
function actGalleryDoor(){
  if(phase()<2){sys('Forensics is still working in the corridor. Focus on the gallery for now.'); return;}
  ask('','Go out to the corridor?',[
    {label:'Go to the corridor',fn:()=>fade(()=>setMap('hall',9,1,'down'))},
    {label:'Cancel',fn:()=>{}}]);
}

/* ---------- Corridor: security camera footage ---------- */
// Called after a clip finishes (or is skipped). If the player notices something, it becomes evidence
const CLIP_AFTER={
  cam2012(){
    if(findable('camera')){
      say(ME,'The Director goes into the gallery at 20:12 and comes out at 20:18...');
      say(ME,'The swap at 20:14 happened right while the Director was inside the gallery.');
      give('camera');
    }else if(findable('flower')&&S.flags.slip){
      say(ME,'...I knew it.');
      say(ME,'The 20:12 footage. Beside the entrance — there’s no flower stand.');
      say(ME,'The flowers arrived at 19:30 and were set up by 19:32. They’re in the 20:40 footage, too.');
      say(ME,'But in the 20:12 footage alone, there are no flowers. ...This is from before they arrived — from the night before!');
      give('flower');
    }
  },
  cam1932(){
    if(findable('flower')&&S.flags.slip) say(ME,'19:32. Ms. Hayase is setting up the flowers beside the entrance... I should compare this with the 20:12 footage.');
  },
};
function playClip(id){
  fade(()=>startScene(id,false,{after:CLIP_AFTER[id]}));
  return 'hold';
}
function actMonitor(){
  if(!S.flags.monitor){
    S.flags.monitor=1;
    say(ME,'The security office monitor. It can play back the gallery entrance camera’s recording from any time you choose.');
  }
  ask('','Which time do you want to watch?',[
    {label:'18:15',fn:()=>playClip('cam1815')},
    {label:'19:32',fn:()=>playClip('cam1932')},
    {label:'20:12',fn:()=>playClip('cam2012')},
    {label:'20:40',fn:()=>playClip('cam2040')},
    {label:'Cancel',fn:()=>{}}]);
}
function actExit(){
  if(findable('exit')){
    say(ME,'The staff entrance. A sign-in log hangs here.');
    sys('18:30 Kuga out / 19:00 Director out / 21:05 Hayase out (bag checked, nothing found — Iwata)');
    say(ME,'The Director left at 19:00 and didn’t come back. The last one left in the building last night was Mr. Iwata, the guard.');
    say(ME,'And Mr. Iwata checked Ms. Hayase’s bag on her way out...');
    give('exit');
  }else say(ME,'The staff entrance. A sign-in log hangs here.');
}

defCase('file02',{HS:{
  gallery:[
    ...spots([[9,6],[10,6]],actCase,()=>!has('fake')||findable('lock')),
    ...spots([[15,13],[14,13],[16,13]],actShop,()=>!has('replica')||findable('real')),
    {x:12,y:5,act(){
      say(ME,'A panel draped in a white cloth. It’s the Azure Drop’s description panel, to be unveiled at the opening ceremony.');
      say(ME,'On the Director’s orders, no one has looked at it ahead of the unveiling.');}},
    {x:9,y:14,act:actGalleryDoor},
    {x:0,y:6,act(){say(ME,'A fixed window. It can’t be opened. Not a scratch on the glass or the frame.');}},
    {x:3,y:1,act(){say(ME,'A small display case of rings and pendants. Nothing looks disturbed.');}},
    {x:16,y:1,act(){say(ME,'A display case holding an antique tiara. That one’s still the genuine article, apparently.');}},
    {x:9,y:0,act(){say(ME,'A poster for the special exhibition “The Azure Drop.” The words “Opening Today” ring hollow now.');}},
    {x:18,y:12,act(){say(ME,'The shop register. Nothing’s been sold yet — the exhibition hasn’t opened.');}},
  ],
  hall:[
    {x:9,y:0,act(){
      ask('','Go back to the gallery?',[
        {label:'Back to the gallery',fn:()=>fade(()=>setMap('gallery',9,13,'up'))},
        {label:'Cancel',fn:()=>{}}]);}},
    {x:13,y:0,act(){say(ME,'The security camera covering the gallery entrance. Its footage is saved on the recorder in the security office.');}},
    {x:11,y:1,glow:()=>findable('flower')&&!S.flags.slip,act(){
      if(findable('flower')&&!S.flags.slip){
        S.flags.slip=1;
        say(ME,'A congratulatory flower stand for the opening, with a card reading “Congratulations on Your Opening.”');
        say(ME,'The florist’s delivery slip is tucked in. Delivered — yesterday at 19:30.');
        say(ME,'...19:30?');
        say(ME,'The 20:12 footage. When the Director walked in, were these flowers beside the entrance?');
        say(ME,'I should check again on the monitor in the security office.');
      }else if(S.flags.slip) say(ME,'The flower stand delivered yesterday at 19:30.');
      else say(ME,'A congratulatory flower stand for the opening, brightening up the gallery entrance.');}},
    {x:18,y:2,act(){say(ME,'Stairs to the upper floors. Mr. Iwata went up this way for his patrol.');}},
    {x:2,y:7,glow:()=>findable('camera')||(findable('flower')&&S.flags.slip),act:actMonitor},
    {x:3,y:7,act(){
      say(ME,'The recorder. No lock, no password on the control panel. There’s a manual sitting beside it.');
      if(phase()>=3) say(ME,'...There’s a sticky note on the manual’s “Recording from an external input” page.');}},
    {x:0,y:10,act(){
      say(ME,'The key box. A key tagged “Display Case — Maintenance” hangs inside.');
      say(ME,'The box isn’t locked. Anyone who walked into the security office could take it.');}},
    {x:6,y:6,act(){say(ME,'The guards’ locker. A spare uniform and an old flashlight.');}},
    {x:14,y:7,glow:()=>findable('pc'),act(){
      if(!avail('pc')) say(ME,'Ms. Hayase’s computer. Forensics is going through its activity log.');
      else if(!has('pc')){
        say(ME,'Ms. Hayase’s computer. The catalog proofs are still open on it.');
        say(ME,'I look at the save history Forensics pulled.');
        sys('… 19:48 / 19:57 / 20:06 / 20:41 / 20:52 …');
        say(ME,'After 20:06 comes 20:41. For those 36 minutes alone, no one touched the keyboard or mouse.');
        give('pc');
      }else say(ME,'Ms. Hayase’s computer. No activity recorded from 20:06 to 20:41.');}},
    {x:18,y:7,glow:()=>findable('fax'),act(){
      if(!avail('fax')) say(ME,'A fax machine. Forensics is looking into it.');
      else if(!has('fax')){
        say(ME,'A single sheet of paper is left in the fax machine’s tray.');
        say(ME,'From an auction house: “Re: Your consignment of the Azure Drop — We kindly ask for your final confirmation regarding handover after the exhibition closes.”');
        say(ME,'...The Azure Drop is being sold? The following pages are nowhere to be found.');
        give('fax');
      }else say(ME,'The fax from the auction house. Only the first page.');}},
    {x:18,y:11,glow:()=>findable('order'),act(){
      if(!avail('order')) say(ME,'A shelf of documents and files. Forensics is looking into it.');
      else if(!has('order')){
        say(ME,'The document shelf. Copies of orders sent to the workshop are filed here.');
        say(ME,'“Azure Drop Replicas: 21 pieces (20 for the shop, 1 spare). Person in charge: Hayase.”');
        say(ME,'“The spare is to be kept in the curators’ office”... The spare’s box is right here on the shelf.');
        say(ME,'I open it — and it’s empty.');
        give('order');
      }else say(ME,'The spare replica’s box, now empty.');}},
    ...spots([[9,14],[10,14]],actExit,()=>findable('exit')),
  ],
}});
