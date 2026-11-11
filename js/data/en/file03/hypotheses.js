/* Data: FILE.03 deductions (English) */
'use strict';

/* =========================================================
   Deductions (assembled in order as the evidence comes together)
   1–3 rule people out and narrow the time window (13:30–14:20). 4 names "who"
   ========================================================= */
defCase('file03',{HYPS:[
  {id:'h1',no:'1',title:'Thrown Out in the Clean-Up',requires:['box','photo','rule'],
   summary:'During the usual Friday fridge clean-out, Komatsu from Admin threw away the unlabeled pudding. No one ate it — it simply went out with the trash.',
   hint:'If it was thrown out in a clean-up, the whole box would be gone. And when is the clean-up supposed to happen?',
   claims:[
     {t:'The pudding was in the fridge until early afternoon',truth:true,ev:['photo'],why:'The 12:05 photo clearly shows the pudding in the box.'},
     {t:'Komatsu from Admin clears out the fridge',truth:true,ev:['rule'],why:'As the notice says, Komatsu in Admin is in charge of clearing out the fridge.'},
     {t:'The pudding wasn’t labeled with a name',truth:false,ev:['box'],why:'The lid has a sticky note reading “OKOCHI” in big letters. It was labeled!'},
     {t:'It was thrown out in the Friday fridge clean-out',truth:false,ev:['rule'],why:'The clean-out is every Friday at 17:00. The pudding was found missing at 15:00. The clean-out hadn’t happened yet!'},
   ]},
  {id:'h2',no:'2',title:'Noguchi Did It',requires:['seen','jelly'],
   summary:'In the early afternoon, Officer Noguchi snuck into the kitchenette and polished off Inspector Okochi’s pudding. His second offense, after last month’s “Jelly Incident.”',
   hint:'Noguchi definitely came out of the kitchenette with a spoon in his mouth. But what was he eating?',
   claims:[
     {t:'Just after 13:00, Noguchi came out of the kitchenette with a spoon in his mouth',truth:true,ev:['seen'],why:'Komatsu clearly saw Noguchi looking very pleased with himself.'},
     {t:'Noguchi has eaten things from the fridge before',truth:true,ev:['jelly'],why:'Last month he ate the Section Chief’s jelly and had to write an apology.'},
     {t:'What Noguchi ate was Inspector Okochi’s pudding',truth:false,ev:['conbini','mori'],why:'Noguchi ate a convenience store pudding he bought himself at 12:58. Inspector Okochi’s pudding was still in the fridge at 13:30!'},
   ]},
  {id:'h3',no:'3',title:'Mori Did It',requires:['mori','dispatch','allnight'],
   summary:'Starving after an all-nighter, Mori from Forensics came for his lunch at 13:30 and spotted the pudding. He went back to Forensics once, but gave in to temptation, came back, and polished it off.',
   hint:'Mori was starving, sure. But after 13:30, where was Mori?',
   claims:[
     {t:'The last person to see the pudding was Mori, at 13:30',truth:true,ev:['mori'],why:'When Mori came for his lunch, the pudding was still in the box.'},
     {t:'At that time, Noguchi was outside the building',truth:true,ev:['dispatch'],why:'Noguchi went out at 13:20 to back up the police box and didn’t return until 14:55.'},
     {t:'Mori was hungry after pulling an all-nighter',truth:true,ev:['allnight'],why:'Mori had worked through the night and hadn’t eaten anything since morning.'},
     {t:'Mori came back from Forensics and ate the pudding',truth:false,ev:['lablog'],why:'From 13:35 to 15:10, Mori was operating the analysis equipment in Forensics on 3F without a break. He never left his seat!'},
   ]},
  {id:'h4',no:'4',title:'Takizawa Did It',requires:['guestcard','report','cup','memo','album'],final:true,
   summary:'Back from fieldwork without his ID card, Takizawa borrowed a visitor card at reception and entered the division at 13:42. Spotting a pudding in the fridge with an “OKOCHI” sticky note, he set out to settle a 30-year-old grudge — and ate it while writing his report. He wrapped the cup in a torn notebook page and threw it in the trash on the roof.',
   claims:[
     {t:'The pudding vanished between 13:30 and 14:20',truth:true,ev:['mori','komatsu2'],why:'Mori saw the pudding at 13:30, and Komatsu saw the empty box at 14:20.'},
     {t:'The only person to enter the division in that window was Takizawa, on a visitor card',truth:true,ev:['gate','guestcard'],why:'Visitor Card 07 entered at 13:42. The person who borrowed that card at reception at 13:40 was Takizawa.'},
     {t:'The culprit ate the pudding while writing a report',truth:true,ev:['report'],why:'Takizawa’s report, handed in at 14:10, has a drop of caramel from Miyako’s baked pudding on it.'},
     {t:'The cup was wrapped in a torn notebook page and thrown away on the roof',truth:true,ev:['memo','cup'],why:'The cup in the rooftop trash was wrapped in a notebook page in Takizawa’s handwriting.'},
     {t:'Takizawa had a reason to go after Okochi’s pudding',truth:true,ev:['album'],why:'The yearbook message: “I’ll never forgive you for the dorm pudding. Takizawa.”'},
   ]},
]});
