/* Data: FILE.01 evidence, investigation phases, Takizawa's hints (English) */
'use strict';

/* =========================================================
   Evidence
   ========================================================= */
defCase('file01',{EV:{
  key:      {k:'🔑',name:'Study Key',          desc:'The study key, found on the desk. No duplicate exists. The door was locked from the inside.'},
  window:   {k:'🔒',name:'Window Latch',       desc:'The study’s only window. As of this morning, its crescent latch was fastened.'},
  body:     {k:'💀',name:'State of the Body',  desc:'Soichiro Kurosaki (62), master of the manor. Found collapsed in front of the fireplace. Cause of death: a blow to the back of the head. Estimated time of death: 21:00–23:00 last night.'},
  cup:      {k:'☕',name:'Two Teacups',        desc:'Two cups of tea on the coffee table, both half-finished. Last night, the master was with someone.'},
  statue:   {k:'🗿',name:'Bronze Statue',      desc:'Found under the bookcase. Traces of wiped-off blood on its round base (positive luminol reaction). It matches the shape of the head wound.'},
  door:     {k:'🚪',name:'Study Door',         desc:'An officer broke it down this morning. There’s no gap between the door and the floor — no way to slip the key back inside from outside.'},
  ledger:   {k:'📒',name:'Doctored Ledger',    desc:'A ledger from the desk drawer. Altered figures are circled in red, and the margin reads “Question Kashiwagi about this.” Tucked into the last page is an envelope addressed “To Kashiwagi” (still sealed).'},
  thread:   {k:'🧵',name:'Scrap of Fishing Line',desc:'Caught on a shrub branch beneath the study window. One end is tied into a small loop.'},
  scratch:  {k:'🔍',name:'Scratch on the Window Frame',desc:'A fresh mark along the bottom of the frame, as if rubbed by a thin line. Even with the window shut, there’s a gap wide enough for a single line.'},
  footprint:{k:'👣',name:'Footprints in the Garden',desc:'Footprints leading from below the study window to the back door. Size 26 cm leather shoes. None head toward the gate.'},
  button:   {k:'🔘',name:'Cufflink',           desc:'A silver cufflink found in the shrubs below the window, engraved with the initial “K.”'},
  rain:     {k:'☔',name:'Rainfall Record',    desc:'Last night’s rain stopped at exactly 22:00 (Mori, Forensics). Any footprints still visible were made after 22:00.'},
  gate:     {k:'👮',name:'Gate Guard’s Statement',desc:'The main gate was locked all night, and the security camera shows no one coming or going (Officer Noguchi). Only the master and his secretary, Kashiwagi, were in the manor last night.'},
}});

/* =========================================================
   Phases: each refuted deduction advances the phase and unlocks more evidence
   ========================================================= */
defCase('file01',{EV_PHASE:{
  key:0, window:0, body:0, cup:0, statue:0,
  door:1,
  thread:2, scratch:2, footprint:2,
  button:3, ledger:3, rain:3, gate:3,
}});
defCase('file01',{PHASE_MSG:{
  1:['Not an accident... Then “someone” was in this room last night.',
     'But how did they get out of a locked room? Take another look at the door.'],
  2:['If they couldn’t leave by the door, that leaves the window.',
     'Forensics is done in the garden. You can go out there now. Check under the window.'],
  3:['The culprit didn’t escape outside... Someone inside the manor, then.',
     'The master’s desk drawer has been opened. Mori has the rainfall record, and Noguchi’s finished checking the security camera.',
     'And search the shrubs in the garden again — carefully this time.'],
}});

defCase('file01',{EVHINT:{
  key:'Did you check the desk? Where the key was matters.',
  window:'Did you check the window latch?',
  body:'The chalk outline by the fireplace — get the details on the body.',
  cup:'Did you look at the coffee table?',
  statue:'We still haven’t found the weapon. Try looking under the bookcase.',
  door:'Take a good look at the door we broke down, too.',
  thread:'Forensics is done in the garden. Go out through the door and search under the window.',
  scratch:'Keep what you found in the garden in mind, and check the study window again.',
  ledger:'The master’s desk drawer is open now. Go see what’s inside.',
  footprint:'Anything left on the ground out in the garden?',
  button:'Search the shrubs under the window carefully.',
  rain:'Mori from Forensics is in the garden. Ask him about last night’s weather.',
  gate:'Talk to Noguchi, too. He’s guarding the gate.',
}});
