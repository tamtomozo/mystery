/* Data: FILE.01 story (opening, Takizawa's lines, interrogation, confession, ending) (English) */
'use strict';

defCase('file01',{
  saveKey:'hidden-truth-file01-save',
  start:['study',9,2,'left'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For those who are no longer satisfied with just guessing whodunit.',
    catch:'What that locked room was hiding<br>wasn’t the killer.',
    deck:[
      'A study locked from the inside. The window latched. The key on the desk.<br>On the floor lay the master of the manor, Soichiro Kurosaki.',
      'Expose the trick, corner the culprit — and beyond that,<br>you will find <b>another truth</b> that no one knew.',
    ],
    lead:[
      'You step onto the scene as a rookie detective.',
      'People keep silent. Evidence speaks.<br>Test each deduction that takes shape against the evidence you gather, and break down every contradiction.',
      'When you answer the final question, you will hold more than the culprit’s name.<br>You will hold the feelings this locked room had kept shut inside.',
    ],
  },
  intro(){
    say('Takizawa','There you are, rookie. This is the scene — the study of Soichiro Kurosaki, master of this manor.');
    say('Takizawa','This morning his secretary, Kashiwagi, called it in: “The study door won’t open, and the master isn’t answering.” The door was locked from inside. An officer had to break it down.');
    say('Takizawa','The window was latched, too. The key was on the desk. ...In other words, a locked room.');
    say('Takizawa','The body’s already been taken away. Search the scene and gather evidence. Once the evidence connects, a “deduction” about what happened should take shape.');
  },
  hint0:'Start with the basics of a locked room. The key, the window, and the state of the body.',
  provenLine:'...Good work. Now we can bring Kashiwagi in.',
  finalIntro:'An inside job... huh. Back up every claim in this deduction with evidence. Do that, and we interrogate.',
  phaseGuide:{2:()=>guideGarden()},

  suspect:'Kashiwagi',
  interroBand:{title:'The Next Day',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','Okochi, Major Crimes. Mr. Keisuke Kashiwagi, we’d like to hear about the night Soichiro Kurosaki died.');
    say('Kashiwagi','.........');
    say('Kashiwagi','...I have nothing to tell you.');
    say('Kashiwagi','What is it you think I did? ...Would you show me?');
    say('Okochi','(quietly) He’s not the type to lie. But he won’t volunteer a thing.');
    say('Okochi','(quietly) Answer his questions one by one with evidence. Build up the facts.');
  },
  interroNg:['...That doesn’t answer my question.','...And what does that prove?','...How does that evidence connect to my question?'],
  confession(){
    say('Kashiwagi','.........');
    say('Kashiwagi','...My mother is ill. I couldn’t cover her treatment, no matter what I did.');
    say('Kashiwagi','So, little by little, the company’s money... Last night, when the master put the ledger in front of me — I thought it was all over.');
    say('Kashiwagi','Before I knew it, I’d brought the statue down. The trick with the window... I copied it from a mystery novel.');
    say('Okochi','...Mr. Kashiwagi. There was an envelope tucked into the last page of that ledger. It’s addressed to you.');
    sys('— Inspector Okochi breaks the seal.');
    say('','Dear Kashiwagi,','letter');
    say('','I knew you had been taking money from the company. I also looked into why. I know about your mother’s illness.','letter');
    say('','You need not pay it back. I will cover her treatment.','letter');
    say('','Tomorrow, I would like us to talk properly about the ledger. Not to scold you — but because I do not want to lose you. — Kurosaki','letter');
    say('Kashiwagi','.........ah...');
    say('Kashiwagi','The master... all along, for me...');
    sys('Kashiwagi slumped over the desk and wept aloud.');
  },
  ending:()=>`
    <h3>The Truth</h3>
    Confronted by the master over money he had embezzled, the secretary Keisuke Kashiwagi struck him with a bronze statue on impulse.<br>
    He climbed out the window into the garden and fastened the crescent latch with a looped fishing line, creating a locked room.<br>
    He left footprints across the rain-soaked garden and returned to his room through the back door.
    <h3>The Hidden Truth</h3>
    The master had not called Kashiwagi in that night to punish him.<br>
    A single letter, never opened — that was the other truth hidden inside the locked room.`,
});
