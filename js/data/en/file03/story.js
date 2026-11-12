/* Data: FILE.03 story (opening, Takizawa's lines, interrogation, confession, ending) (English) */
'use strict';

defCase('file03',{
  saveKey:'hidden-truth-file03-save',
  start:['office',7,5,'up'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For those who believe there’s no such thing as a small case.',
    catch:'All that vanished was one pudding.<br>Every suspect is a police officer.',
    deck:[
      'The kitchenette of the Major Crimes Division, Prefectural Police HQ. A baked pudding — only 20 made a day, bought after queuing from 7 a.m. —<br>vanished from its box in the fridge.',
      'An officer seen with a spoon in his mouth. A forensics tech starving after an all-nighter. There’s no shortage of suspects.<br>But the evidence points to <b>a name you never expected</b>.',
    ],
    lead:[
      'Today, as a rookie detective, you investigate your own workplace.',
      'A name on a sticky note, a photo’s timestamp, a tiny stain on a document. However laughably small the case, the evidence never cuts corners.<br>Break down each deduction that takes shape, one by one.',
      'When you answer the final question, you will learn<br>what was left at the bottom of that empty box.',
    ],
  },
  intro(){
    say('Takizawa','There you are, rookie. ...No, we’re not heading out today. The scene is right here.');
    say('Okochi','Rookie. We have a case.');
    say('Okochi','This morning I put a pudding in the kitchenette fridge. It’s gone.');
    say('Okochi','A baked pudding from “Patisserie Miyako.” Only 20 made a day. I lined up from 7 a.m. to buy it.');
    say('Takizawa','...Pudding, huh.');
    say('Okochi','From 13:00 to 15:00 I was in a senior staff meeting. When I came back and opened the fridge, the box was empty.');
    say('Okochi','Someone pilfered food from the Major Crimes fridge. In a room full of detectives. ...Gather the evidence and find the culprit.');
    say('Takizawa','(quietly) ...Humor him. Once he gets like this, there’s no stopping him.');
    say('Takizawa','When was the pudding last there? What state is the fridge in? Start with that.');
  },
  hint0:'Start with the box in the fridge and the kitchenette rules. Then, when the pudding was last seen.',
  provenLine:'...Good work. ...I suppose I’m the one sitting in the interrogation room, then.',
  finalIntro:'...Me, huh. Back up every claim in this deduction with evidence. Do that, and we interrogate. ...Don’t go easy on me, rookie.',
  phaseGuide:{3:()=>guideRoof()},

  suspect:'Takizawa',
  interroBand:{title:'That Day, 17:00',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','...Never thought I’d see the day I’d be sitting across from you in this room, Takizawa.');
    say('Takizawa','That’s my line. ...The victim running his own interrogation?');
    say('Okochi','I’ll handle the questioning. Rookie, the evidence is yours.');
    say('Takizawa','.........');
    say('Takizawa','All right, rookie. Do it the way I taught you.');
    say('Takizawa','Answer my questions one at a time, with evidence.');
    say('Okochi','(quietly) He won’t lie. But he won’t volunteer anything, either. ...He’s been that way for thirty years.');
  },
  interroNg:['...And that means I ate it?','...Your evidence and my question don’t line up, rookie.','...I taught you this. Answer the question straight.'],
  confession(){
    say('Takizawa','.........');
    say('Takizawa','...Yeah. I’m the one who ate it.');
    say('Takizawa','Thirty years ago, I put a pudding in the fridge in the police academy dorm. My mother brought it when she came to visit — a Miyako pudding.');
    say('Takizawa','The next morning, all that was left was the empty cup. ...There was no evidence. But I always figured it was Okochi, my roommate.');
    say('Takizawa','Today, I come back from fieldwork, open the fridge, and there’s that box. Sticky note: “OKOCHI.”');
    say('Takizawa','I thought, here’s my payback, thirty years late. ...It was good. Tasted just like it did back then.');
    say('Okochi','...Takizawa. Did you look at the bottom of the box?');
    say('Takizawa','The bottom?');
    sys('— Inspector Okochi turns the empty box over. A small envelope is stuck to the bottom.');
    say('','To Takizawa,','letter');
    say('','Thirty years ago, I was the one who ate the pudding in the dorm fridge. They were running us ragged in training, and I was so hungry I couldn’t help myself.','letter');
    say('','Thirty years went by without my ever apologizing. When I heard Miyako was closing this month, I lined up this morning.','letter');
    say('','Happy birthday. — Okochi','letter');
    say('Takizawa','.........');
    say('Okochi','I was going to call you to the kitchenette at 15:00. ...When I found the box empty, I just had to know who ate it.');
    say('Okochi','Never thought it’d be you.');
    say('Takizawa','...The sticky note with your own name on it...');
    say('Okochi','I figured if my name was on it, no one would dare touch it. ...No one but you.');
    say('Takizawa','...Ha. I held a grudge for thirty years. Makes me look like a fool.');
    say('Okochi','That goes for both of us.');
    say('Okochi','Tomorrow is Miyako’s last day. We’re lining up outside the shop at 7 a.m. ...Three of us. Rookie, you’re coming too.');
    sys('Takizawa pulled his hat down low over his eyes. His shoulders were trembling, just a little.');
  },
  ending:()=>`
    <h3>The Truth</h3>
    Back from fieldwork without his ID card, Detective Takizawa borrowed a visitor card at reception and entered the Major Crimes Division at 13:42.<br>
    Finding a pudding in the fridge with an “OKOCHI” sticky note, he ate it while finishing his report — payback for something that happened thirty years ago.<br>
    He wrapped the empty cup in a torn notebook page and threw it in the trash beside the rooftop vending machine.
    <h3>The Hidden Truth</h3>
    The “OKOCHI” on the sticky note wasn’t the owner’s name. It was the name of a guard, posted to keep everyone’s hands off.<br>
    The letter on the bottom of the box held a “sorry” thirty years late, and a “happy birthday.”<br>
    That baked pudding had belonged to Takizawa all along.`,
});
