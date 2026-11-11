/* Data: FILE.02 evidence, investigation phases, Takizawa's hints (English) */
'use strict';

/* =========================================================
   Evidence
   ========================================================= */
defCase('file02',{EV:{
  fake:     {k:'🔹',name:'Glass Fake',          desc:'The brooch in the display case. A re-appraisal at 9:30 this morning revealed it to be an elaborate glass fake. It weighs 31.6 grams.'},
  appraisal:{k:'📜',name:'Yesterday’s Appraisal',desc:'Kuga, the insurance company’s appraiser, confirmed it genuine at 18:05 yesterday (weight: 38.2 grams). The Director opened the case’s electronic lock, and only Kuga held the brooch during the appraisal. The case was locked at 18:10.'},
  alarm:    {k:'🚨',name:'Alarm System Log',    desc:'The security company’s log. From the moment the system was armed at 21:30 last night until it was disarmed at 7:00 this morning, the alarm never went off and was never disarmed. No windows or doors show signs of being forced (Officer Noguchi).'},
  replica:  {k:'🛍️',name:'Gift Shop Replica',   desc:'A replica of the Azure Drop sold in the museum shop (¥18,000). Made to order by a workshop — 20 pieces for the shop. Identical in make to the fake in the case.'},
  weight:   {k:'⚖️',name:'Weight Sensor Log',   desc:'The record from the case’s pedestal (Mori, Forensics). A steady 38.2 grams from 18:10 yesterday. At 20:14:05 it dropped to 0 grams, and at 20:15:40 it came back at 31.6 grams.'},
  lock:     {k:'🔐',name:'Case Access Log',     desc:'The display case’s electronic lock hasn’t been opened since 18:00 yesterday (the Director’s card). The only way to open it without leaving a record is the maintenance key, kept in the key box in the security office.'},
  camera:   {k:'📹',name:'Entrance Camera Footage',desc:'The camera covering the gallery’s only entrance. After the Director and Kuga leave at 18:15, Hayase places a flower stand beside the entrance at 19:32 (without going in). At 20:12 the Director enters the gallery carrying a cloth-covered panel, and comes out at 20:18. No one else goes in or out.'},
  exit:     {k:'🚪',name:'Staff Exit Log',      desc:'The sign-in log for the staff entrance. Kuga left at 18:30 and the Director at 19:00; neither returned. Hayase left at 21:05 (bag checked by Iwata — nothing found). The only person left in the building that night was Iwata, the security guard.'},
  alibi:    {k:'☕',name:'Director’s Alibi',    desc:'Around 20:00 last night, the Director was meeting a real estate agent at a café by the station — to discuss selling his house. The owner confirms the Director stayed until closing at 21:00 (Officer Noguchi).'},
  patrol:   {k:'🔦',name:'Patrol Log',          desc:'Security guard Iwata’s patrol log. He left the security office at 20:00, passed the 3F East checkpoint at 20:13 and 3F West at 20:16, and returned to the office at 20:35. The office was empty the whole time.'},
  flower:   {k:'💐',name:'Flower Stand',        desc:'A congratulatory flower stand for the opening. The delivery slip says it arrived at 19:30, and the 19:32 footage shows Hayase setting it up. It’s also in the 20:40 footage. But in the 20:12 footage alone, there’s no flower stand by the entrance.'},
  pc:       {k:'💻',name:'Curators’ Office PC', desc:'The computer Hayase was using to proofread the exhibition catalog. In the save history, the entry after 20:06 is 20:41. For those 36 minutes, neither keyboard nor mouse was touched.'},
  order:    {k:'📄',name:'Replica Order Form',  desc:'The order form sent to the workshop for the replicas: 21 pieces (20 for the shop, 1 spare). Person in charge: Hayase. “The spare is to be kept in the curators’ office.” The spare’s box on the shelf was empty.'},
  fax:      {k:'📠',name:'Auction House Fax',   desc:'A single page left in the curators’ office fax machine: “Re: Your consignment of the Azure Drop — We kindly ask for your final confirmation regarding handover after the exhibition closes.” The following pages are nowhere to be found.'},
  real:     {k:'💎',name:'The Real Azure Drop', desc:'Found among the museum shop display. There should have been 20 replicas, but there were 21. Just one weighed 38.2 grams — the real Azure Drop.'},
}});

/* =========================================================
   Phases: each refuted deduction advances the phase and unlocks more evidence
   ========================================================= */
defCase('file02',{EV_PHASE:{
  fake:0, appraisal:0, alarm:0, replica:0,
  weight:1, lock:1,
  camera:2, exit:2, alibi:2, patrol:2,
  flower:3, pc:3, order:3, fax:3, real:3,
}});
defCase('file02',{PHASE_MSG:{
  1:['Not during the night... Then the swap happened before the alarm was armed at 21:30.',
     'Mori got the pedestal’s weight sensor data from the case manufacturer. Go hear what he has.',
     'And check the record on the case’s electronic lock, too.'],
  2:['20:14... What matters is who walked into the gallery at that time.',
     'Forensics is done in the corridor. You can go out through the gallery exit now.',
     'The entrance camera footage can be viewed in the security office. Check the staff exit log too. Noguchi’s tracing the Director’s movements.'],
  3:['The Director wasn’t in the building. ...So it’s the footage that’s lying.',
     'They’re done with the curators’ office. Go take a look inside.',
     'Also, nothing turned up in Ms. Hayase’s bag. ...The real one is still somewhere in this building.'],
}});

defCase('file02',{EVHINT:{
  fake:'First, see the brooch in the case with your own eyes.',
  appraisal:'Ask Mr. Kuga, the appraiser, about yesterday’s appraisal.',
  alarm:'Noguchi, at the entrance, was checking with the security company. Ask him.',
  replica:'Have a look at the shop by the exit too.',
  weight:'Mori got the pedestal’s weight sensor data. Go hear what he has.',
  lock:'Did you check the case’s electronic lock record? You can view it right at the case.',
  camera:'There’s entrance camera footage in the security office down the corridor. Watch the 20:00s.',
  exit:'There’s an entry log at the staff exit at the end of the corridor. Check it.',
  alibi:'Noguchi was tracing the Director’s movements last night. Ask him.',
  patrol:'Ask Mr. Iwata in the security office about his patrol last night.',
  flower:'Did you check when the flower stand in the corridor was delivered? Then compare the footage again.',
  pc:'Check Ms. Hayase’s computer in the curators’ office.',
  order:'Look at the document shelf in the curators’ office. Where were those replicas made?',
  fax:'Did anything come in on the fax machine in the curators’ office?',
  real:'Nothing turned up in Ms. Hayase’s bag. ...Where would you hide the real one? Take another good look at the shop display.',
}});
