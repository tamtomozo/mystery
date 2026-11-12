/* Data: FILE.02 story (opening, Takizawa's lines, interrogation, confession, ending) (English) */
'use strict';

defCase('file02',{
  saveKey:'hidden-truth-file02-save',
  start:['gallery',9,11,'left'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For those who can’t look away from the words “impossible crime.”',
    catch:'Inside a case no one had opened,<br>the jewel had turned into a fake.',
    deck:[
      'The Shirasagi Museum of Art, the night before a special exhibition opens. A sapphire valued at ¥200 million: “The Azure Drop.”<br>No alarm ever sounded, and the case’s lock log ends yesterday evening.',
      'When was it swapped, and by whom?<br>And why did they <b>swap it rather than steal it</b>?',
    ],
    lead:[
      'You step into the sealed gallery as a rookie detective.',
      'Time logs, footage, the weight of a jewel. The evidence records the truth down to the second.<br>Miss no discrepancy, however small, and break down each deduction that takes shape.',
      'When you answer the final question, you will understand<br>what this blue jewel meant to someone.',
    ],
  },
  intro(){
    say('Takizawa','There you are, rookie. This is the scene — the gallery at the Shirasagi Museum of Art.');
    say('Takizawa','The special exhibition “The Azure Drop” was supposed to open today. The centerpiece is a sapphire brooch valued at ¥200 million.');
    say('Takizawa','But at 9:30 this morning, a pre-opening re-appraisal found that what’s in the case is a glass fake.');
    say('Takizawa','When was it swapped, and by whom? Search the scene and gather evidence.');
  },
  hint0:'First, figure out what was swapped. Then, when the real one was last confirmed.',
  provenLine:'...Good work. Let’s go talk to Ms. Hayase.',
  finalIntro:'The curator, Hayase... huh. Back up every claim in this deduction with evidence. Do that, and we interrogate.',
  phaseGuide:{2:()=>guideHall()},

  suspect:'Hayase',
  interroBand:{title:'That Evening',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','Okochi, Major Crimes. Ms. Mizuki Hayase, we’d like to hear about the night the Azure Drop was swapped.');
    say('Hayase','.........');
    say('Hayase','...What is it you think I did?');
    say('Hayase','Please show me, step by step. ...I’ll answer each one.');
    say('Okochi','(quietly) She won’t lie. But she won’t volunteer anything either.');
    say('Okochi','(quietly) Answer each of her questions with evidence.');
  },
  interroNg:['...That isn’t an answer to my question.','...And what does that tell you?','...How does that evidence connect to my question?'],
  confession(){
    say('Hayase','.........');
    say('Hayase','...When I was a child, I came here every Sunday. To see the Azure Drop.');
    say('Hayase','Behind the glass, that blue light shimmered... I could have watched it forever. It’s the reason I became a curator.');
    say('Hayase','Last week, I saw a page from the auction house come through the fax in the curators’ office. After the exhibition, the Azure Drop would be sold. ...No one would ever see it again.');
    say('Hayase','If it were “stolen,” it couldn’t be sold. Once things calmed down, I was going to have it “found” somewhere.');
    say('Okochi','...Ms. Hayase. That footage from the night before, the one you fed in. Did you see what the Director was carrying?');
    say('Hayase','...The description panel for the unveiling at the opening. He said he wrote the text himself...');
    say('Okochi','We spoke to the Director. He turned down the auction offer the very day that fax arrived.');
    say('Okochi','He’s selling his house to keep the museum going. ...The man he met at the café last night was the real estate agent.');
    sys('— Inspector Okochi places a photograph on the desk. It’s the panel before its unveiling, taken with the Director’s permission.');
    say('','The Azure Drop','letter');
    say('','Twenty years ago, every Sunday, there was a little girl who would not budge from in front of this jewel.','letter');
    say('','Today, as a curator at this museum, she has created this exhibition for you.','letter');
    say('','The Azure Drop will always be here, waiting for you. — Ryuzo Washio, Director','letter');
    say('Hayase','.........Director...');
    say('Hayase','He... remembered... me...');
    sys('Clutching the photograph to her chest, Hayase wept without a sound.');
  },
  ending:()=>`
    <h3>The Truth</h3>
    Convinced the Azure Drop was about to be sold, the curator Mizuki Hayase swapped the jewel in the case for a spare replica at 20:14 on the night before the opening.<br>
    In the security office, left empty while the guard was on patrol, she fed the previous night’s footage into the entrance camera’s recording, and opened the case with the untracked maintenance key.<br>
    She hid the real jewel among the replicas in the museum shop and slipped past the bag check.
    <h3>The Hidden Truth</h3>
    The “previous night’s footage” Hayase chose to hide herself showed the Director carrying in the panel for the unveiling.<br>
    Written on that panel were words for the little girl who had come, week after week, to stand before the Azure Drop — for Hayase herself.`,
});
