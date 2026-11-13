/* Data: FILE.09 story (opening, Takizawa's lines, interrogation, confession, ending) (English) */
'use strict';

defCase('file09',{
  saveKey:'hidden-truth-file09-save',
  start:['sakura',12,9,'up'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For everyone who has ever waited for someone who comes running, tail wagging, when you call their name.',
    catch:'The client is ten years old.<br>The fee: one 500-yen coin.',
    deck:[
      'Sakuragaoka, a town of hills. At dawn on Saturday, Mugi, a fourteen-year-old Shiba, vanished from her yard.<br>She is nearly blind, her left back leg is bad, and she cannot run. Tomorrow morning, she was to go to a foster family far away.',
      'At police headquarters, a girl left a letter at the front desk: “Please find Mugi.”<br>The girl says, “Grandma took Mugi — Grandma, who died last year.” And the neighbors agree: <b>Kiyo walks Mugi every morning</b>.',
    ],
    lead:[
      'As a rookie detective, you stand in a town where the sea shows from the top of the hill.',
      'What the family says, what the neighbors saw, prints left in the mud.<br>Lay the sightings on a map, follow Mugi’s trail, and break down each deduction that rises before you.',
      'When you reach the end of the walk, you will learn<br>of a promise kept every morning at half past five.',
    ],
  },
  intro(){
    sys('— Saturday, 13:10. Sakuragaoka 3-chome. Early-afternoon sun on a hillside neighborhood.');
    say('Takizawa','Rookie. ...Today’s client is ten years old.');
    sys('Takizawa holds out a sheet of letter paper and a little gift envelope. Inside the envelope, a single 500-yen coin clinks.');
    say('Takizawa','This morning a girl came to the front desk at HQ, on her own. “Please give this to the detectives in Division One.”');
    say('Takizawa','Okochi read it and said, “Finding dogs isn’t Division One’s job. ...But answering a client is.”');
    give('letter');
    say('Takizawa','A fourteen-year-old Shiba named Mugi. Gone from the yard this morning. ...And tomorrow at ten, she’s due to be collected by a foster family far away.');
    say('Takizawa','There’s been a run of pet thefts around here, apparently. Noguchi brought the files from community safety.');
    say('Takizawa','Go and meet your client first. The Kasugas’ house is just over that hedge.');
  },
  hint0:'Meet your client first. She’s by the doghouse in the Kasugas’ yard. Check the back gate Mugi went out by. And ask Noguchi on the street about the thefts.',
  finalIntro:'Mr. Gondo next door... huh. Back up every claim in this deduction with evidence. Before the sun goes down.',
  goTak:'Report to Takizawa.',
  // Once the truth is proven, face Gondo in front of the animal hospital across the river, then the interrogation (used by talkTakizawa in common.js)
  provenTalk(){
    say('Takizawa','...Mr. Gondo next door, huh.');
    say('Takizawa','He’s not at home. Noguchi saw him ride off toward the hill a little while ago.');
    say('Takizawa','The animal hospital across the river. Go. ...I’ll let our client know.');
  },

  suspect:'Gondo',
  interroBand:{title:'That Evening',sub:'Sakuragaoka Police Box · Back Room'},
  interroIntro(){
    say('Okochi','Okochi, Division One. Mr. Tetsuji Gondo, I’d like to ask you about the Kasugas’ dog.');
    say('Gondo','...A Division One inspector, over one dog. Very good of you.');
    say('Okochi','I owe my client an answer.');
    say('Gondo','I did it on my own. I stole the dog next door. ...Leave it at that.');
    say('Okochi','(quietly) ...He’s covering for someone. Answer each of his claims with evidence.');
  },
  interroNg:['...Don’t know.','...So what?','...We’re done talking about the dog.'],
  confession(){
    say('Gondo','...');
    say('Gondo','...Kiyo and I were neighbors across that hedge for forty years.');
    say('Gondo','I was a sailor. By the time I came ashore for good, my wife was gone. ...The only one who came over the hedge with a pot of stew was Kiyo.');
    say('Gondo','Last spring. The night before she went into hospital, Kiyo handed me this across the hedge.');
    sys('Gondo takes a folded sheet of letter paper from his inside pocket. The creases are worn soft.');
    say('','Mr. Gondo. Would you take Mugi for her morning walks?','letter');
    say('','Even blind, Mugi will walk if she can smell me. Please wear this vest, and come in by the back gate.','letter');
    say('','Up to the bench at the top of the hill. When you can see the sea, turn back. Mugi loves to sniff the sea air there.','letter');
    say('','Please don’t tell Kohei. When he sees Mugi, he remembers me, and it hurts him.','letter');
    say('','Please — let Mugi walk on this hill until the very end.','letter');
    say('Gondo','...The first morning after Kiyo died, I stood at the back gate. And the latch was undone.');
    say('Gondo','There was a little face peering out of the veranda window. ...The little miss.');
    say('Gondo','That child thinks I’m her grandma. Let her think it, and she can go on believing her grandma comes every morning.');
    say('Gondo','So I never spoke. Not one word, in a year.');
    say('Okochi','...And that’s why you kept quiet when Mugi collapsed, too.');
    say('Gondo','The vet said, “Move her far and she won’t make it.” ...And tomorrow morning the foster family was coming. If I told, Mugi’d be off to the next prefecture.','sad');
    say('Gondo','I asked the Kasuga boy once. “Leave her with me,” I said. ...He said, “I can’t give my mother’s dog to a man who does nothing but complain.”');
    say('Okochi','And those complaints...');
    say('Gondo','On the mornings I overslept, Mugi would howl for Kiyo. ...I was embarrassed. I didn’t know what else to call it.');
    say('Okochi','...Mr. Gondo. What you did was lead someone else’s dog away and hide her. If a report had been filed, that’s a crime.');
    say('Okochi','But... you have visitors.');
    sys('The back door of the police box opens quietly. Hinata stands there, holding her father Kohei by the hand.');
    say('Hinata','Grandpa Gondo.');
    say('Gondo','...Missy.','surprise');
    say('Hinata','...I knew. Grandma wasn’t that tall.');
    say('Hinata','But Mugi looked so happy. Her tail went wag-wag-wag. ...So every night, I undid the latch.','happy');
    say('Gondo','...','sad');
    say('Kohei','Mr. Gondo. ...May I read my mother’s letter too?');
    sys('When Kohei finishes reading, he doesn’t look up for a long time.');
    say('Kohei','...I never once walked my mother’s route. Every time I saw Mugi, it reminded me she was gone.','sad');
    say('Kohei','I’ll withdraw the report. And I’ll tell the foster family myself.');
    say('Kohei','Mr. Gondo. ...Would you look after Mugi for us? Here, on this hill.');
    say('Gondo','...Half past five in the morning. I won’t oversleep again.','happy');
  },
  ending:()=>`
    <h3>The Truth</h3>
    For the year since Kiyo Kasuga died, the one walking the old dog Mugi every morning at half past five, in Kiyo’s red padded vest, was her neighbor, Tetsuji Gondo. Every night, Kiyo’s granddaughter Hinata undid the back gate’s latch from inside.<br>
    At dawn on Saturday, at the bench at the top of the hill where the walk turned for home, Mugi had a heart attack and collapsed. Gondo put her in his bicycle basket, took her to the animal hospital across the river, and checked her in under his own name. And he told no one.
    <h3>The Hidden Truth</h3>
    It was Kiyo herself who asked him. The night before she went into hospital, she handed him a letter and her red padded vest across the hedge: “Please — let Mugi walk on this hill until the very end.”<br>
    For the sake of a small face at the window, Gondo spent a year as a “Kiyo” who never said a word. And when Mugi could no longer be moved, he quietly kept her in this town.<br>
    Hinata knew. Even so, because she wanted to see Mugi’s tail wag, she undid the latch every night.
    <h3>The Morning Before the Move</h3>
    A week later, at half past five in the morning, Mugi — home from the hospital — set off slowly from Gondo’s veranda.<br>
    Holding the leash was Hinata, in a red padded vest whose sleeves were far too long. Behind them walked Gondo, and Kohei.<br>
    At the bench at the top of the hill, Mugi lifted her nose and breathed in the smell of the sea.<br>
    “Grandma loved it here, didn’t she,” Hinata said — and Mugi wagged her tail, slowly, just once.`,
});
