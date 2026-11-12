/* Data: FILE.05 story (opening, Takizawa's lines, interrogation, confession, ending) (English) */
'use strict';

defCase('file05',{
  saveKey:'hidden-truth-file05-save',
  start:['schoolyard',10,9,'up'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For every grown-up who stopped believing in ghosts.',
    catch:'Every school mystery<br>has something behind it.',
    deck:[
      'Tsukikagedai Elementary, founded a hundred and two years ago, closes next Saturday.<br>Two weeks ago, its Seven Mysteries began “really” happening, night after night.',
      'A piano that plays at nine. A blue will-o’-the-wisp drifting across the schoolyard.<br>And this morning, the time capsule buried twenty-five years ago was gone. <b>No one knows the seventh mystery</b>.',
    ],
    lead:[
      'As a rookie detective, you stand in a schoolyard with no children in it.',
      'A piano no one plays, raked-over earth, a blue light a child saw.<br>Unmask the Seven Mysteries one by one, and break down each deduction that rises from them.',
      'When you answer the final question, you will learn<br>the seventh mystery — kept from everyone for twenty-five years.',
    ],
  },
  intro(){
    say('Takizawa','There you are, rookie. This is the scene — the schoolyard of Tsukikagedai Elementary.');
    say('Takizawa','This morning, a builder came by to prepare for the closing ceremony and check on the time capsule. The graduates of twenty-five years ago buried it on their graduation day.');
    say('Takizawa','But there was already a hole by the stump. Empty. ...The capsule’s vanished.');
    say('Takizawa','That’s not all. For two weeks now, the school’s “Seven Mysteries” have been happening, night after night. A piano that plays at night, a will-o’-the-wisp in the schoolyard...');
    say('Takizawa','The kids are saying “number seven happened.” ...You can’t cuff a ghost. Find out what’s really behind it, and collect the evidence.');
    say('Takizawa','You can get into the north building through the entrance. The principal is in his office.');
  },
  hint0:'Start with that empty hole. And there’s a kid who knows all about the Seven Mysteries, I hear. Yota, was it.',
  provenLine:'...Good work. Let’s ask Ms. Shirakawa to come down to the station.',
  finalIntro:'Ms. Shirakawa, the homeroom teacher... huh. Back up every claim in this deduction with evidence. Do that, and we interrogate.',

  suspect:'Shirakawa',
  interroBand:{title:'That Day, Evening',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','Okochi, Major Crimes. Ms. Haruka Shirakawa, we’d like to talk to you about the Tsukikagedai Elementary time capsule.');
    say('Shirakawa','...Have the children gone home?');
    say('Okochi','They have. Yota was still grumbling that he wanted to “see what number seven really is.”');
    say('Shirakawa','...That’s just like him.');
    say('Shirakawa','If you say I did it, go ahead. But give me the reasoning behind every answer. That’s what I always teach the children.');
    say('Okochi','(quietly) Cool as anything. ...Answer each of her questions with evidence.');
  },
  interroNg:['...That doesn’t answer the question, I’m afraid.','...Read the problem again, carefully.','...Close. But not that piece of evidence.'],
  confession(){
    say('Shirakawa','.........');
    say('Shirakawa','...It was the winter of sixth grade. The Seven Mysteries were all the rage.');
    say('Shirakawa','“No one knows the seventh.” I wanted to know so badly. The rumor was that it was in the science prep room, at the far end of the old building.');
    say('Shirakawa','I snuck in at night with a candle. I left it on top of an old cabinet, and when I heard a noise I panicked... and ran.');
    say('Shirakawa','The next morning, the science prep room was scorched. Gen-san had put the fire out. And Gen-san said, “It was my cigarette.”');
    say('Shirakawa','He wrote an apology, his pay was cut... and still, every morning, he said “good morning” to me at the gate. I never once told him the truth.');
    say('Shirakawa','I only wrote it in my capsule letter. “In twenty-five years, have I managed to say ‘I’m sorry’ to Gen-san?”');
    say('Shirakawa','Twenty-five years later, I became a teacher and came back to this school. ...And I still hadn’t said it.');
    say('Shirakawa','Then they decided we’d read our letters in front of everyone at the ceremony. TV would be there. Gen-san would be there. ...I wanted it out before anyone could read it.');
    say('Shirakawa','The cherry tree was gone, and I didn’t know the spot. So I dug, little by little, only while Gen-san was in the music room.');
    say('Shirakawa','Last night I finally found it... but the can was rusted shut. I couldn’t open it. The capsule is in the cleaning locker in Class 6-1.');
    say('Okochi','...You couldn’t open it, huh.');
    sys('— Inspector Okochi gives a short order over the radio. An hour later, a rusted can is set on the interrogation room table. The principal has given permission to open it.');
    sys('Inside: five faded envelopes. And, among them, one envelope addressed in a grown-up’s hand.');
    say('Okochi','...“To Haruka, twenty-five years from now.” From — Shigeru Genda, caretaker.');
    say('Shirakawa','.........What?');
    say('','Haruka. Twenty-five years from now, you’re all grown up.','letter');
    say('','That night, I saw a small shadow running from the old building. I said it was my cigarette. I’d been meaning to quit anyway, you see. Thanks to you, I finally did.','letter');
    say('','Let me tell you a secret. Long ago, I made up the Seven Mysteries. The incinerator, the roof stairs, the pond behind the pool, the old building — every place that’s dangerous for children, I gave a ghost to live in.','letter');
    say('','I’ve never told anyone the seventh. I’ll tell only you.','letter');
    say('','“The caretaker never, ever tells a child’s secret.”','letter');
    say('','So you don’t need to worry about it anymore. — Genda','letter');
    say('Shirakawa','..................Gen-san.');
    say('Shirakawa','He knew... For twenty-five years... all along...');
    say('Okochi','Today, Mr. Genda didn’t say one word about you.');
    say('Okochi','The red clay on your boots. Eleven trial holes. A man who’s watched that schoolyard every night couldn’t have missed them.');
    say('Shirakawa','.........');
    say('Shirakawa','Detective. At the closing ceremony... would you let me read my letter?');
    say('Shirakawa','In my own voice. In front of Gen-san. ...Twenty-five years late.');
    sys('Okochi didn’t answer. He only slid the faded envelope gently toward her.');
  },
  ending:()=>`
    <h3>The Truth</h3>
    Haruka Shirakawa, homeroom teacher of Class 6-1, dug in the schoolyard night after night for two weeks, to take back the time capsule letter that would be read aloud at the closing ceremony.<br>
    With a speaker hidden in the music room piano, she lured caretaker Genda on his rounds to the far end of the north building. Meanwhile, with a light covered in blue cellophane, she dug trial holes around the stump.<br>
    Last night she finally struck the capsule, and hid it in Class 6-1’s cleaning locker.
    <h3>The Seven Mysteries, Unmasked</h3>
    1. The 9 p.m. piano — a speaker inside the piano<br>
    2. The blue will-o’-the-wisp — a light covered in blue cellophane<br>
    3. The broadcast room chime — a scheduled booking on the PA system<br>
    4. The anatomy model facing the window — Genda turned it toward the sun every morning<br>
    5. The thirteen steps — the step up to the landing, counted too<br>
    6. The mound of earth before the statue — soil from the trial holes
    <h3>The Hidden Truth</h3>
    The Seven Mysteries were made up forty years ago by a young caretaker named Genda. A gentle lie, to keep children away from dangerous places.<br>
    On the night of the fire twenty-five years ago, Genda saw a small shadow too. And he said nothing. Today, too, he said nothing.<br>
    The seventh mystery: “The caretaker never, ever tells a child’s secret.”`,
});
