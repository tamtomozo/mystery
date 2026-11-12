/* Data: FILE.08 story (opening, Takizawa's lines, interrogation, confession, ending) (English) */
'use strict';

defCase('file08',{
  saveKey:'hidden-truth-file08-save',
  start:['honkan',5,7,'up'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For everyone who ever hoped that the words they couldn’t say would one day reach someone.',
    catch:'The walls of that boardroom<br>have ears.',
    deck:[
      'Narumi Pen, a fountain-pen maker seventy years old. Behind closed doors, its board is negotiating a partnership with the industry giant Daito Stationery.<br>And every week, the next morning, what they said appears in the trade paper <b>word for word</b>.',
      'No bug can be found. Phones are left at the door; the minutes sit in the president’s safe.<br>If today’s final meeting leaks, the deal is dead.',
    ],
    lead:[
      'As a rookie detective, you stand on the second floor of an old Western-style house, in the rain.',
      'Where are the voices getting out? Who is letting them out, and why?<br>Lay the letters beside the minutes, and break down each deduction that rises before you.',
      'When you open the last cap, you will learn<br>of a promise that lay shut away for thirty years.',
    ],
  },
  intro(){
    sys('— 15:10. Narumi Pen, main building, second floor. The final board meeting has just ended, and the corridor is silent but for the rain.');
    say('Takizawa','Rookie. ...Work on the assumption that today’s meeting is already out there too.');
    say('Takizawa','Three times in three weeks. What was said at the Thursday board meeting showed up in the letters column of the trade paper, the Stationery Herald, the next morning. Word for word.');
    say('Takizawa','Ms. Chihaya from Daito Stationery says: “If today’s meeting is in tomorrow’s paper, the deal is off.”');
    say('Takizawa','A bug, or a person? ...Work out how the voices are getting out, and we’ll know who’s letting them out.');
    say('Takizawa','Start with the boardroom. Mori’s sweeping it for bugs. Noguchi’s borrowing the original letters from the newspaper.');
  },
  // When the minutes become available, show how the cross-check works (js/ui/compare.js)
  phaseGuide:{1:()=>guide('Cross-Check the Letters and the Minutes',[
    ['Boardroom table','Lay a letter beside the minutes'],
    ['Choose','Tap the sentence in the letter that doesn’t match the minutes (or ← → and Enter)'],
  ],'Once you have the minutes, examine the long table in the boardroom.')},
  hint0:'The boardroom first. Check the window and the phone box at the door, too. Noguchi’s bringing the original letters — he’ll be in the stair hall.',
  finalIntro:'The master of the nib workshop... huh. Back up every claim in this deduction with evidence. Before tonight’s letter goes in the box.',
  goTak:'Report to Takizawa. ...There’s no time before seven.',
  // Once the truth is proven, face Tatsumi in the workshop before the interrogation (used by talkTakizawa in common.js)
  provenTalk(){
    say('Takizawa','...The workshop master, then.');
    say('Takizawa','The Stationery Herald’s letter box closes at seven. The letter about today’s meeting should still be in Mr. Tatsumi’s hands.');
    say('Takizawa','Get to the workshop. ...I’ll be right down.');
  },

  suspect:'Tatsumi',
  interroBand:{title:'That Night',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','Okochi, First Investigation Division. Mr. Kihei Tatsumi, we need to talk about Narumi Pen.');
    say('Tatsumi','...Detective. I’ve twenty nibs half ground back at the shop. Make it quick.');
    say('Tatsumi','I did it alone. Nobody else had anything to do with it.');
    say('Okochi','(quietly) He’s covering for someone. ...Answer each question with evidence.');
  },
  interroNg:['...Don’t know.','...So what?','...What’s a nib grinder supposed to do with that?'],
  confession(){
    say('Tatsumi','...');
    say('Tatsumi','...Spring, seventy years ago. Shuzo and I were twenty.');
    say('Tatsumi','We rented that old house cheap — it stood empty. Shuzo dreamed up pen barrels upstairs and went out selling them, and I ground nibs in the storeroom out back.');
    say('Tatsumi','We begrudged even the time it took to run up and down the stairs. So Shuzo joined the upstairs and the storeroom with a length of leftover gas pipe.');
    say('Tatsumi','“No secrets between us.” ...That’s what he said.');
    say('Okochi','...The speaking tube.');
    say('Tatsumi','Thirty years ago, they set up a board. One of the directors, a man from the bank, said: “We can’t have management talk going straight down a pipe to the craftsmen.”');
    say('Tatsumi','Shuzo closed the cap. ...I haven’t crossed the main building’s threshold since.','sad');
    say('Tatsumi','A month ago, on a Thursday. I had the wheel running, and for the first time in thirty years, the tube spoke.');
    say('Tatsumi','“Tatsumi, can you hear me? Thursday, two o’clock. Shut off the wheel and listen to her.” ...It was Shuzo’s voice.');
    say('Tatsumi','So I listened. Daito’s terms. The managing director’s “cost sender.” ...And little miss’s voice.');
    say('Tatsumi','“If it means losing the nib workshop, then this deal never happened.”');
    say('Tatsumi','...I called that girl a traitor, you know. Asked if she meant to sell off the workshop. We haven’t spoken in years.','sad');
    say('Tatsumi','In that boardroom, she hadn’t a single ally. ...So I called in allies from outside. The people who write with Narumi pens.');
    say('Okochi','...Letters have been arriving at Daito’s head office from people who read yours. More than two thousand.');
    say('Okochi','“If Narumi’s hand-ground nibs are gone, I’ll never buy another fountain pen.” ...At today’s final meeting, Daito wrote keeping the workshop into the terms of the deal.');
    say('Tatsumi','...What?','surprise');
    say('Okochi','We spoke with the chairman, too. In writing — his hearing is poor.');
    sys('— The chairman’s note. Shaky fountain-pen handwriting.');
    say('','My ears barely catch half of what Shiho says anymore.','letter');
    say('','But Tatsumi’s ears are sharp. He can tell a good grind from a bad one by the sound of a nib on paper.','letter');
    say('','Shiho is fighting alone at that table, for Tatsumi’s workshop. If I told him so, he would never believe me. I wanted him to hear it in her own voice.','letter');
    say('','After each meeting, when everyone has gone, I say into the tube: “Tatsumi, did you hear?”','letter');
    say('','For the first time in thirty years, an answer came back. “Aye, I heard.”','letter');
    say('Tatsumi','...','sad');
    say('Okochi','...Mr. Tatsumi. What you did was a crime. You leaked the company’s secrets.');
    say('Okochi','But. A message from the president.');
    say('Okochi','“There’s something I want to tell everyone at the workshop, from my own mouth. ...Please wait by the tube, Thursday at three.”');
    say('Tatsumi','...Little miss...','surprise');
    say('Tatsumi','...Thursday at three. That’s hand-grinding day. Best keep the wheels off, then.','happy');
  },
  ending:()=>`
    <h3>The Truth</h3>
    Narumi Pen’s main building and the nib workshop out back were joined by a speaking tube laid in the company’s first days. A month ago, Chairman Shuzo Narumi opened the boardroom end of it, closed for thirty years.<br>
    On Thursday afternoons, during board meetings, Kihei Tatsumi, master of the nib workshop, had the grinding wheels shut off and listened with his ear to the tube. He wrote down what he heard on the workshop’s test-writing paper and dropped it in the mailbox of the trade paper, the Stationery Herald.
    <h3>The Hidden Truth</h3>
    The chairman did not open the cap to wreck the deal. He opened it so that a friend he had not spoken to in thirty years could hear his daughter’s voice — fighting alone at that table for the workshop.<br>
    Tatsumi’s letters never cut a single word the president said. The letters from pen lovers who read them came to more than two thousand, and the workshop was kept, written into the terms of the deal.<br>
    “No secrets between us.” — A promise made seventy years ago had lived on, all those thirty years, under a brass cap.
    <h3>The Next Thursday</h3>
    When the board meeting was over, President Shiho Narumi stayed behind alone in the boardroom. She took down the frame above the fireplace and leaned close to the brass cap.<br>
    “Uncle Tatsumi. ...Can you hear me?”<br>
    From the workshop, where the wheels had gone quiet, after a while, a gravelly voice came up the tube.<br>
    “...Aye. I hear you, little miss.”`,
});
