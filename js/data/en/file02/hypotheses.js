/* Data: FILE.02 deductions (English) */
'use strict';

/* =========================================================
   Deductions (assembled in order as the evidence comes together)
   1 & 2 narrow down "when" (before 21:30 → 20:14); 3 & 4 narrow down "who"
   ========================================================= */
defCase('file02',{HYPS:[
  {id:'h1',no:'1',title:'A Night-Time Break-In',requires:['fake','appraisal'],
   summary:'Last night, someone slipped in from outside through a gap in security, opened the display case, swapped the Azure Drop for a glass fake, and escaped.',
   hint:'If someone broke in from outside, they’d leave a trace somewhere. What was security like overnight?',
   claims:[
     {t:'The real jewel was in the case until just after 18:00 yesterday',truth:true,ev:['appraisal'],why:'Yesterday’s 18:00 appraisal confirmed it was genuine.'},
     {t:'The culprit broke in from outside during the night',truth:false,ev:['alarm'],why:'From 21:30 to 7:00, the alarm never went off and was never disarmed. No one broke in during the night!'},
     {t:'The jewel was swapped for a glass fake',truth:true,ev:['fake'],why:'What remained in the case was an elaborate glass fake.'},
   ]},
  {id:'h2',no:'2',title:'The Appraiser’s Switch',requires:['appraisal','replica'],
   summary:'The appraiser Kuga, pretending to examine the jewel, swapped it for a replica hidden in his jacket. His appraisal saying “genuine” was a lie to cover his own crime.',
   hint:'If the swap happened during the appraisal, the case held a fake from then on. How could you check that?',
   claims:[
     {t:'Kuga held the brooch during the appraisal',truth:true,ev:['appraisal'],why:'Only Kuga held the brooch during the appraisal.'},
     {t:'The fake is identical to the gift shop replicas',truth:true,ev:['replica','fake'],why:'The fake in the case is exactly the same as the replicas sold in the shop.'},
     {t:'The swap happened during the appraisal (around 18:00)',truth:false,ev:['weight'],why:'After the appraisal, the case still weighed 38.2 grams — the same as the real jewel. The contents changed at 20:14!'},
   ]},
  {id:'h3',no:'3',title:'The Director Did It',requires:['weight','lock','camera'],
   summary:'Struggling with the museum’s finances and after the insurance money, the Director went into the gallery at 20:12, opened the case with the untracked maintenance key, and swapped the jewel at 20:14.',
   hint:'The footage shows the Director. But was the Director actually in the building at that time?',
   claims:[
     {t:'The swap took place at 20:14',truth:true,ev:['weight'],why:'The weight sensor clearly recorded the gap at 20:14.'},
     {t:'The case was opened with the untracked maintenance key',truth:true,ev:['lock'],why:'The electronic lock hasn’t opened since 18:00. It was the maintenance key, which leaves no record.'},
     {t:'The entrance camera shows the Director entering the gallery at 20:12',truth:true,ev:['camera'],why:'The footage clearly shows the Director going into the gallery at 20:12.'},
     {t:'The Director was in the building at the time',truth:false,ev:['exit','alibi'],why:'The Director left through the staff exit at 19:00 and never came back. Around 20:00 he was at a café by the station. He wasn’t in the building!'},
   ]},
  {id:'h4',no:'4',title:'The Curator Did It',requires:['flower','pc','order','fax','real'],final:true,
   summary:'While Iwata was out on patrol and the security office sat empty, the curator Hayase fed the previous night’s footage into the entrance camera’s recording. She opened the case with the maintenance key and, at 20:14, swapped the real jewel for the spare replica. She hid the real one among the shop display and slipped past the bag check.',
   claims:[
     {t:'The entrance camera footage from the 20:00s was from the night before',truth:true,ev:['flower'],why:'The flower stand delivered at 19:30 isn’t in the 20:12 footage. That was from before the flowers arrived — the night before.'},
     {t:'The security office was empty during the 20:00s',truth:true,ev:['patrol'],why:'Iwata was on patrol from 20:00 to 20:35. The recorder and the maintenance key were both within reach.'},
     {t:'Hayase was not in the curators’ office from 20:06 to 20:41',truth:true,ev:['pc'],why:'Hayase’s computer wasn’t touched once between 20:06 and 20:41.'},
     {t:'The fake is the spare replica Hayase was keeping',truth:true,ev:['order'],why:'Hayase kept the spare replica in the curators’ office. Its box was empty.'},
     {t:'Hayase had a reason not to let the Azure Drop go',truth:true,ev:['fax'],why:'The auction house fax. After the exhibition, the Azure Drop would be sold — or so Hayase believed.'},
   ]},
]});
