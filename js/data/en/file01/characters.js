/* Data: FILE.01 people at the scene (NPCs) (English) */
'use strict';

defCase('file01',{NPCS:{
  takizawa:{map:'study',x:8,y:2,dir:'right',name:'Takizawa',look:LOOK.takizawa,talk:talkTakizawa,alert:()=>false},
  mori:{map:'garden',x:7,y:6,dir:'down',name:'Mori (Forensics)',look:LOOK.mori,alert:()=>findable('rain'),talk(){
    if(!avail('rain')){
      say('Mori','Mori, Forensics. I’m checking the footprints on the ground right now.');
      say('Mori','Last night’s weather? I’ve asked the weather bureau. I’ll let you know when I hear back.');
    }else if(!has('rain')){
      say('Mori','Mori, Forensics. Boy, are we lucky the footprints held up out here.');
      say('Mori','Last night’s rain stopped at exactly 22:00. Any footprints from before that would’ve been washed away.');
      say('Mori','So every footprint you see now was made after 22:00.');
      give('rain');
    }else if(has('thread')&&!has('scratch')){
      say('Mori','Fishing line? With a loop on the end... Maybe it was rigged to hook onto something.');
      say('Mori','Why not take another look at the study window’s latch?');
    }else if(!has('button')||!has('thread')){
      say('Mori','I haven’t had a proper look at the shrubs under the window yet. Could you check them for me?');
    }else{
      say('Mori','Size 26 cm leather shoes. Nice and clear. Gotta love the rain.');
    }
  }},
  noguchi:{map:'garden',x:10,y:13,dir:'up',name:'Noguchi (Officer)',look:LOOK.noguchi,alert:()=>findable('gate'),talk(){
    if(!avail('gate')){
      say('Noguchi','Officer Noguchi, reporting! I’m guarding the main gate!');
      say('Noguchi','I’m reviewing the security camera footage as we speak!');
    }else if(!has('gate')){
      say('Noguchi','Officer Noguchi, reporting! I’m guarding the main gate!');
      say('Noguchi','The main gate was locked all night. I checked the security camera, and no one came in or out!');
      say('Noguchi','The only people in the manor last night were the master and Mr. Kashiwagi, his live-in secretary.');
      give('gate');
    }else say('Noguchi','No problems at the gate! No one has gotten past me!');
  }},
}});
