/* Data: FILE.04 story (opening, Takizawa's lines, interrogation, confession, ending) (English) */
'use strict';

defCase('file04',{
  saveKey:'hidden-truth-file04-save',
  start:['dojo',9,12,'up'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For those who believe handwriting is as good as a fingerprint.',
    catch:'Those threatening letters<br>were written in someone else’s hand.',
    deck:[
      'Bokkokai, a calligraphy school founded fifty years ago. At Sunday’s exhibition, the old master Juho Kiryu will name his successor.<br>For two weeks before it, three threatening letters with no postmark arrived in the mailbox.',
      'A child’s clumsy writing. And a third letter in the very hand of one of his pupils.<br>But in a school of people who know writing inside out, <b>writing cannot lie</b>.',
    ],
    lead:[
      'As a rookie detective, you stand in a practice hall that smells of ink.',
      'Stops, hooks, stroke order. One blotted-out word, one form of address.<br>Gather the “writer’s habits” left in the letters, and break down each deduction that takes shape, one by one.',
      'When you answer the final question, you will learn<br>what was written in one more letter — the one still sealed.',
    ],
  },
  intro(){
    say('Takizawa','There you are, rookie. This is the scene — the practice hall of the Bokkokai calligraphy school.');
    say('Takizawa','In the past two weeks, three threatening letters have reached the master here, Juho Kiryu. No stamps, no postmarks. Someone put them straight into the mailbox out front.');
    say('Takizawa','The third came this morning. Inside was his brush, snapped in two. ...That was enough for his daughter, Ms. Chizuru, to call us.');
    say('Takizawa','The school holds its exhibition on Sunday. The master’s going to name his successor there.');
    say('Takizawa','Who wrote them? Examine the letters and gather evidence. ...Writing has a way of not being able to lie.');
  },
  hint0:'Start with the letters themselves. Ms. Chizuru’s story, and the letters laid out on the desk. Then the paper they were written on.',
  provenLine:'...Good work. Let’s ask Mr. Takanashi to come down to the station.',
  finalIntro:'Senior instructor Takanashi... huh. Back up every claim in this deduction with evidence. Do that, and we interrogate.',
  phaseGuide:{1:()=>guideAlley()},

  suspect:'Takanashi',
  interroBand:{title:'That Day, Evening',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','Okochi, Major Crimes. Mr. Makoto Takanashi, we’d like to talk about the threatening letters.');
    say('Takanashi','.........');
    say('Takanashi','...Is Sensei all right?');
    say('Okochi','He is. Getting ready for the exhibition, I hear.');
    say('Takanashi','I see. ...Then that’s all that matters.');
    say('Takanashi','If you say I wrote them, then show me. When it comes to writing, I’m rather particular.');
    say('Okochi','(quietly) He won’t lie. But he won’t volunteer anything, either.');
    say('Okochi','(quietly) Answer each of his questions with evidence.');
  },
  interroNg:['...That doesn’t answer my question.','...And what does that piece of evidence tell you?','...Read the question as carefully as you would read a character.'],
  confession(){
    say('Takanashi','.........');
    say('Takanashi','...I joined at nineteen. I fell in love with Sensei’s writing.');
    say('Takanashi','I wanted to copy as many of his characters as I could. For thirty-six years, every day, I copied nothing but Sensei’s hand.');
    say('Takanashi','Two years ago, his hand began to shake. Thank-you letters, certificates, rewriting the sign out front — I wrote them all, in Sensei’s hand. So well that no one ever noticed.');
    say('Takanashi','Two weeks ago, after practice, I saw it from behind the sliding door of the master’s room. In front of the alcove, Sensei handing his treasured inkstone to Ms. Miyauchi.');
    say('Takanashi','A master giving his inkstone to a pupil. ...Anyone in our world knows what that means.');
    say('Takanashi','And then I heard Sensei’s voice. “Takanashi’s writing is still my writing.”');
    say('Takanashi','Thirty-six years of copying... and at the end, it felt like I was being told I wasn’t needed.');
    say('Takanashi','If only there were no announcement, I thought. I imitated a child’s writing — and when Sensei still wouldn’t stop, I even copied Ms. Miyauchi’s.');
    say('Takanashi','...In the end, copying is all I know how to do.');
    say('Okochi','...Mr. Takanashi. You only heard half of it.');
    say('Okochi','Ms. Miyauchi is going to Paris for a year, starting next month. The inkstone was a farewell gift. ...I checked with her. She was there.');
    say('Okochi','Your teacher’s words went on. “Takanashi’s writing is still my writing. — Once I hand him the sign, he’ll finally write his own.”');
    say('Takanashi','.........What?');
    sys('— Inspector Okochi places a sealed letter on the table. The naming of the successor, which was to be taken from the letter box in the alcove on the day of the exhibition. Juho has given permission to open it.');
    say('','I hand the sign of Bokkokai to Makoto Takanashi.','letter');
    say('','For thirty-six years you have copied my writing. More faithfully, more beautifully than anyone. And when my hand began to shake, it was you who took up the brush in its place.','letter');
    say('','But what I wanted most to see was your own writing.','letter');
    say('','Rewrite the sign out front — in your own hand. — Juho','letter');
    say('Takanashi','.........Sensei.');
    say('Takanashi','My own... writing. I don’t even... remember what it looked like anymore...');
    say('Okochi','Sign your statement.');
    say('Okochi','...In your own hand.');
    sys('Takanashi stared at the pen for a long while. Then, slowly, he wrote his name.');
    sys('It was a hand found in no one’s model book — rising slightly to the right, and trembling.');
  },
  ending:()=>`
    <h3>The Truth</h3>
    Senior instructor Makoto Takanashi became convinced that Juho had chosen Miyauchi as his successor, and set out to stop the announcement at the exhibition.<br>
    On the children’s practice paper he wrote threats disguised as a child’s writing, and made the third letter by tracing Miyauchi’s characters from the newsletter on the light table in the master’s room.<br>
    Three nights before the exhibition, he snapped Juho’s brush, sealed it in the envelope, slipped out the back door and put it in the mailbox out front.
    <h3>The Hidden Truth</h3>
    The inkstone the master gave his pupil was a farewell gift to Miyauchi as she set out for Paris.<br>
    “Takanashi’s writing is still my writing” — and the words that followed were, “Once I hand him the sign, he’ll write his own.”<br>
    What the sealed letter was waiting for was the true handwriting of a man who had spent thirty-six years copying his teacher’s.`,
});
