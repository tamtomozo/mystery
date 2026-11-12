/* Data: FILE.07 story (opening, Takizawa's lines, rescue, interrogation, confession, ending) (English) */
'use strict';

defCase('file07',{
  saveKey:'hidden-truth-file07-save',
  start:['wheel',10,6,'up'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For everyone who has ever held someone’s hand at the top of a Ferris wheel.',
    catch:'The ransom vanished<br>in midair.',
    deck:[
      'Shiomi Land, a little amusement park in a harbor town. On a Sunday afternoon, Minato Asakura, ten years old today, vanishes from in front of the merry-go-round.<br>On his father’s phone, a machine-twisted voice: “The ransom is 3,120,000 yen.”',
      'The handover: the big Ferris wheel. The father rode gondola 7 alone and got off, leaving the bag under the seat.<br>With detectives watching from below, the gondola went round once more — and when it came back, <b>it was empty</b>.',
    ],
    lead:[
      'As a rookie detective, you stand beneath a Ferris wheel glowing in the western sun.',
      'The kidnapper said: “At five o’clock, I’ll tell you where Minato is.”<br>You have a little over thirty minutes. Expose the trick of the vanishing in the sky, and break down each deduction that rises before you.',
      'When you open the last door, you will learn<br>what was hidden in an oddly specific number: three million, one hundred twenty thousand.',
    ],
  },
  intro(){
    sys('— 16:27. Shiomi Land’s big Ferris wheel. Gondola 7 sways slowly back down to the boarding platform.');
    say('Takizawa','...Open it.');
    sys('Kaji, the wheel operator, undoes the latch on the outside. The door swings open.');
    sys('The blue sports bag that was left under the seat — is gone.');
    say('Takizawa','...That’s impossible. We were watching the whole time.');
    say('Takizawa','The kidnapper said: “Once I’ve checked the money, at five o’clock, I’ll tell you where Minato is.”');
    say('Takizawa','Little over thirty minutes till five. Once the sun’s down, the wind off the sea turns bitter. ...It’s no night for a ten-year-old to be outside.');
    say('Takizawa','Rookie. Three million yen vanished in the sky. Work out how it vanished, and we’ll know who took it. ...And where Minato is.');
    say('Takizawa','Start with gondola 7. And keep an eye on that clock in the top right.');
  },
  hint0:'Gondola 7 first. Then ask Mori, on the platform, about when the wheel stopped. The kidnapper’s calls were recorded in the meeting room of the office building.',
  finalIntro:'Kaji, the wheel operator... huh. Back up every claim in this deduction with evidence. Do that — and we’ll see where Minato is, too.',
  goTak:'Report to Takizawa. ...There’s no time before five.',
  // Once the truth is proven, find Minato before the interrogation (used by talkTakizawa in common.js)
  provenTalk(){
    if(S.flags.rescued){run(()=>goInterro()); return;}
    say('Takizawa','...Kaji, then.');
    say('Takizawa','From behind the billboard, Minato went onto the machine house roof. The only way down from that roof is into the machine room.');
    say('Takizawa','Kaji has the machine room key. ...Hurry. We’re nearly out of time.');
  },

  suspect:'Kaji',
  interroBand:{title:'That Night',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','Okochi, Major Crimes. Mr. Shokichi Kaji, we’d like to talk to you about Shiomi Land.');
    say('Okochi','...Minato’s safe, and back with his father. He’s in another room here at the station.');
    say('Kaji','...That so.','sad');
    say('Kaji','The boy doesn’t know a thing. I did all of it, on my own.');
    say('Okochi','(quietly) He’s covering for someone. ...Answer each of his questions with evidence.');
  },
  interroNg:['...Don’t know.','...So what?','...What’s a wheel operator want with that?'],
  confession(){
    say('Kaji','.........');
    say('Kaji','...Minato came to me yesterday. Saturday. He was crying.');
    say('Kaji','“Papa doesn’t care about me. He’s even working on my birthday.”');
    say('Kaji','...Thing is, two weeks back, his father came to me with a favor. On the boy’s birthday, at five, after closing — would I run the wheel once round, just for them. A surprise. Not a word to Minato.');
    say('Kaji','Then Friday night, he rang to cancel. “He won’t enjoy riding with me anyway.”');
    say('Kaji','Minato didn’t know any of that. ...And he says to me, “If I disappeared, would Papa come looking for me?”');
    say('Kaji','Tell him no, and he’d have done it on his own. Better he do it where I could keep an eye on him... than shiver all night somewhere I’d never find him. That’s what I figured.');
    say('Kaji','At five, I was going to put him in gondola 7 and call his father. Just like the booking. ...I didn’t want a single yen.');
    say('Okochi','...The ransom. 3,120,000.');
    say('Okochi','I hear the boy picked that number.');
    say('Kaji','...Yeah. I asked him, “How much?” and he counted it out on his fingers.');
    say('Okochi','March twelfth. ...Minato’s tenth birthday.');
    say('Okochi','His father noticed. On the very first call.');
    say('Kaji','...He what?','surprise');
    say('Okochi','He thought, maybe. But there was no way to be sure. So he did what the kidnapper said and rode gondola 7 alone.');
    say('Okochi','In case Minato was listening, somewhere — he talked out loud, alone, for twelve minutes.');
    say('Okochi','...Minato was under the seat. He heard every word.');
    sys('— Four o’clock. Gondola 7. Into the dark beneath the seat, his father’s voice drifts down.');
    say('','...Chinatsu. Minato’s gone.','letter');
    say('','Since you left us, I haven’t known how to talk to him. I just hid in my work.','letter');
    say('','I missed his school play. He said being with me was boring... so I cancelled the birthday ride, too.','letter');
    say('','Minato. ...If you can hear me.','letter');
    say('','Happy tenth birthday. When you come home, let’s ride it together. As many times round as you like.','letter');
    say('Kaji','.........');
    say('Okochi','He didn’t open that bag and pull out the tracker because he wanted the money.');
    say('Okochi','He wanted to give it back to his papa himself, at five. Along with “I’m sorry.”');
    say('Kaji','...That so.','sad');
    say('Kaji','...When I went down to the machine room, he was bawling his eyes out. “Papa remembered my birthday,” he said.');
    say('Kaji','Cried himself to sleep. ...I put my jacket over him.');
    say('Okochi','...Mr. Kaji. What you did is a crime. Dozens of officers ran themselves ragged today.');
    say('Okochi','But. I have a message from Mr. Asakura.');
    say('Okochi','“Next Sunday at five, I’d like to book the Ferris wheel again. With Mr. Kaji at the controls.”');
    say('Kaji','.........');
    say('Kaji','...Once round won’t be enough, I reckon.','happy');
  },
  ending:()=>`
    <h3>The Truth</h3>
    Ferris wheel operator Shokichi Kaji gave in to Minato Asakura’s plea and staged the boy’s kidnapping. On his breaks, he demanded the ransom from the park’s public phone with a prize voice changer, and before the handover he hid Minato under the seat of gondola 7.<br>
    At 16:14, as gondola 7 slipped behind the machine house billboard, Kaji stopped the wheel from the control booth. Minato reached out through the gap in the window, undid the latch, and carried the bag onto the roof. Gondola 7 came back down empty.
    <h3>The Hidden Truth</h3>
    Minato chose the ransom: 3,120,000 yen. March twelfth — his own tenth birthday.<br>
    His father saw it on the very first call. With no way to be sure, he rode gondola 7 alone, and for twelve minutes he spoke to his late wife — and to the son who might, somewhere, be listening.<br>
    Beneath the seat, Minato heard every word.<br>
    A birthday ride at five o’clock, booked two weeks before and cancelled on a Friday night. That five o’clock was what Kaji had set out to protect.
    <h3>The Next Sunday</h3>
    After the closing chime had faded, Shiomi Land’s big Ferris wheel began, slowly, to turn.<br>
    In gondola 7, a father and son sat facing each other. In the control booth sat Kaji.<br>
    The promise of “as many times round as you like” lasted until every light in the harbor had come on.`,
});
