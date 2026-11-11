/* Data: FILE.02 people at the scene (NPCs) (English) */
'use strict';

defCase('file02',{NPCS:{
  takizawa:{map:'gallery',x:7,y:11,dir:'right',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},

  /* Mori, Forensics: weight sensor log */
  mori:{map:'gallery',x:11,y:6,dir:'left',name:'Mori (Forensics)',look:LOOK.mori,alert:()=>findable('weight'),talk(){
    if(!avail('weight')){
      say('Mori','Mori, Forensics. No signs of forcing on the case glass or the lock.');
      say('Mori','Looks like the pedestal has a weight sensor, so I’m asking the manufacturer for the data now.');
    }else if(!has('weight')){
      say('Mori','The weight sensor data’s in! This pedestal records the weight of whatever’s on it every second.');
      say('Mori','From 18:10 yesterday, a steady 38.2 grams. Then at 20:14:05 it drops to 0 grams... and at 20:15:40 it comes back at 31.6 grams.');
      say('Mori','The fake in the case now weighs exactly 31.6 grams. So the swap happened at 20:14.');
      give('weight');
    }else if(findable('lock')){
      say('Mori','Check the case’s electronic lock record too. You can see it on the panel at the front of the case.');
    }else{
      say('Mori','A 6.6-gram difference between the real one and the fake. Jewels can’t lie.');
    }
  }},

  /* Kuga, the appraiser: yesterday's appraisal */
  kuga:{map:'gallery',x:6,y:5,dir:'right',name:'Kuga (Appraiser)',look:LOOK.kuga,alert:()=>!has('appraisal'),talk(){
    if(!has('appraisal')){
      say('Kuga','Kuga. I do appraisals on behalf of the insurance company.');
      say('Kuga','Yesterday at 18:00, with the Director present, I appraised the Azure Drop. It was genuine, no doubt about it. 38.2 grams.');
      say('Kuga','After the appraisal, I also watched the Director lock the case at 18:10.');
      say('Kuga','But this morning at 9:30, when I put my loupe to it for the pre-opening re-appraisal... plain glass.');
      give('appraisal');
    }else if(S.hyps.h2&&hypStatus(HYPS[1])==='open'){
      say('Kuga','...You suspect me? Understandable. I was the only one who held the brooch during the appraisal.');
      say('Kuga','But what I put back in the case was the real thing. There must be some way to confirm that.');
    }else{
      say('Kuga','Fake or not, it’s well made. At a glance, you’d never know.');
    }
  }},

  /* Officer Noguchi: security company log, Director's alibi */
  noguchi:{map:'gallery',x:10,y:12,dir:'up',name:'Noguchi (Officer)',look:LOOK.noguchi,alert:()=>findable('alarm')||findable('alibi'),talk(){
    if(!has('alarm')){
      say('Noguchi','Officer Noguchi, reporting! I’ve confirmed with the security company!');
      say('Noguchi','Last night the system was armed at 21:30, and until it was disarmed at 7:00 this morning, the alarm never went off! There’s no record of it being disarmed either!');
      say('Noguchi','No windows or doors showed any sign of being forced!');
      give('alarm');
    }else if(!avail('alibi')){
      say('Noguchi','Leave the entrance to me!');
    }else if(!has('alibi')){
      say('Noguchi','I’ve confirmed the Director’s movements last night!');
      say('Noguchi','After leaving the museum at 19:00, around 20:00 the Director met a real estate agent at a café by the station. It was about selling his house!');
      say('Noguchi','The café owner also says the Director stayed until closing at 21:00!');
      give('alibi');
    }else{
      say('Noguchi','The Director’s selling his own house... Is the museum really in that much trouble?');
    }
  }},

  /* Hayase, the curator (doesn't lie, but doesn't say much) */
  hayase:{map:'gallery',x:13,y:5,dir:'left',name:'Hayase (Curator)',look:LOOK.hayase,alert:()=>false,talk(){
    if(!S.flags.metHayase){
      S.flags.metHayase=1;
      say('Hayase','I’m Hayase, a curator. I’m in charge of this exhibition.');
      say('Hayase','...The Azure Drop has always been this museum’s treasure.');
      say('Hayase','Yesterday I stayed in the building until after 21:00, preparing for the opening.');
    }else if(phase()>=3){
      say('Hayase','.........');
    }else{
      say('Hayase','That panel is for the Director to unveil at the opening ceremony. He brought it in himself the night before last.');
      say('Hayase','No one is to look at it until the unveiling, he said...');
    }
  }},

  /* Iwata, security guard: patrol log (security office in the corridor) */
  iwata:{map:'hall',x:4,y:11,dir:'up',name:'Iwata (Security)',look:LOOK.iwata,alert:()=>findable('patrol'),talk(){
    if(!has('patrol')){
      say('Iwata','Iwata, night security. ...What a mess this is.');
      say('Iwata','Last night’s patrol? I left the security office at 20:00 and made my rounds from the third floor down. The checkpoints keep a record.');
      say('Iwata','3F East at 20:13, 3F West at 20:16. I got back to the office at 20:35.');
      say('Iwata','...The office was empty that whole time. I’m ashamed to say it.');
      give('patrol');
    }else if(phase()>=3&&!S.flags.iwataPanel){
      S.flags.iwataPanel=1;
      say('Iwata','The flower stand? It came yesterday evening, around half past seven. Ms. Hayase set it up by the entrance.');
      say('Iwata','And that cloth-covered panel — the Director carried that into the gallery himself, the night before last.');
    }else{
      say('Iwata','The recorder? There’s a manual right next to it. Anyone could work it.');
      say('Iwata','When Ms. Hayase went home, I checked her bag like always. Nothing in it.');
    }
  }},
}});
