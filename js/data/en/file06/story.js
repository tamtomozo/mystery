/* Data: FILE.06 story (opening, Takizawa's lines, escape, interrogation, confession, ending) (English) */
'use strict';

defCase('file06',{
  saveKey:'hidden-truth-file06-save',
  start:['theater',10,5,'up'],
  // Prologue (shown only when starting the case from the beginning. js/ui/prologue.js)
  prologue:{
    prehead:'For everyone who ever loved the dark of a movie theater.',
    catch:'Until the sun comes up,<br>no one gets out.',
    deck:[
      'For sixty years, the Ginseiza has kept its lights burning beneath a seaside shopping street.<br>On the night it said goodbye to its last customers, the owner, the projectionist and a handful of family gathered for one “final screening.”',
      'Midway through the film, the auditorium went dark. The fire shutter out front came down; the emergency exit was chained with a combination lock. The phone is dead, and no signal reaches underground.<br><b>Whoever shut them in is one of them</b>.',
    ],
    lead:[
      'As a rookie detective, you stand in an auditorium lit only by emergency lights.',
      'A breaker thrown by hand, a lock fastened from the inside, a phone line cut clean through.<br>Before dawn, work out what the culprit wanted, and break down each deduction that rises from the dark.',
      'When you open the last door, you will learn<br>what one reel of film has been holding for twenty years.',
    ],
  },
  intro(){
    sys('— 22:25. Midway through the last screening, the Ginseiza’s auditorium suddenly goes dark.');
    say('Takizawa','...Power cut? Rookie, don’t move. ...Never mind. My eyes are adjusting.');
    say('Takizawa','Emergency lights are on, at least. ...Great. My night off, and this happens.');
    say('Takizawa','I’ve been coming to this theater since I was a kid. Mrs. Hoshino — Yaeko, the owner — invited me to the last screening.');
    sys('A man’s voice from the lobby: “The shutter... the shutter’s down! It won’t open!”');
    say('Takizawa','...And we’re underground. No phone signal, then.');
    say('Takizawa','If this is just a blackout, fine. But if it isn’t — then we’ve been shut in.');
    say('Takizawa','Go see what’s happened to the exits. The lobby is through the doors at the back of the auditorium.');
  },
  hint0:'Start with the exits. The fire shutter in the lobby, and the emergency exit on the right of the auditorium. And I’d like to know about those people who were against the closing. Try the kiosk in the lobby.',
  finalIntro:'Goda, the projectionist... huh. Back up every claim in this deduction with evidence. Do that — and we might see a way out of here, too.',
  goTak:'Report to Takizawa. ...First, we have to get out of here.',
  // Once the truth is proven, get out before the interrogation (used by talkTakizawa in common.js)
  provenTalk(){
    if(S.flags.escaped){run(()=>goInterro()); return;}
    say('Takizawa','...Goda, then. He meant to run Minoru’s film once the sun came up.');
    say('Takizawa','We’ll hear him out at the station. ...First, we get out of here.');
    say('Takizawa','The combination lock on the exit. If it’s Goda’s bicycle lock, Goda picked the number. ...Ask Yaeko about him.');
  },

  suspect:'Goda',
  interroBand:{title:'That Morning',sub:'Prefectural Police HQ · Interrogation Room'},
  interroIntro(){
    say('Okochi','Okochi, Major Crimes. Mr. Masaru Goda, we’d like to talk to you about the Ginseiza.');
    say('Okochi','...So. My Takizawa and our rookie spent the whole night locked in an underground movie theater.');
    say('Goda','...How’s Yaeko.');
    say('Okochi','In the waiting room downstairs, with Akari. Holding an old film can in her lap.');
    say('Goda','.........');
    say('Goda','I don’t know anything. Old place. Just a blackout.');
    say('Okochi','(quietly) Stubborn one. ...Answer each of his questions with evidence.');
  },
  interroNg:['...Don’t know.','...So what.','...What would a projectionist want with that.'],
  confession(){
    say('Goda','.........');
    say('Goda','...Minoru died twenty years ago, in winter. From his hospital bed, he handed me a 16mm can.');
    say('Goda','“On the day the Ginseiza closes, watch this with Yaeko. Don’t tell Yaeko.” ...That was all.');
    say('Goda','Last week I said to her. On the day we close, how about we watch something with Minoru in it.');
    say('Goda','“I won’t.” ...That was all. After the screening she’d hand back the keys and never come here again, she said.');
    say('Goda','If she couldn’t leave, she’d watch it by dawn. ...That’s what I thought. An old fool’s idea.');
    say('Goda','Nobody told me there’d be police here. ...I’m sorry for what I put you through.');
    say('Okochi','...Mr. Goda. The film Akari had threaded on the 16mm in the booth. That was Minoru’s too.');
    say('Goda','...What?');
    sys('Okochi sets two cans side by side on the table. The one from Goda’s drawer, and the one Yaeko had been holding in her lap.');
    say('Okochi','Yaeko’s can says: “On the day we close, watch this together with Goda. — Minoru.”');
    say('Okochi','Minoru told her too, it seems. “Don’t tell Goda.”');
    say('Okochi','When she turned you down last week, it was because she meant to surprise you after the screening. She’d asked Akari to run the projector.');
    say('Goda','.........');
    sys('Mori from forensics examined the heads of both films. Tiny notches scratched into the white leader: “1/2” and “2/2.”');
    say('Okochi','One film, split in half. ...With only one reel, you can’t see it through to the end.');
    say('Goda','...Minoru.');
    say('Goda','Did he... know, twenty years ago, that this is how we’d end up?');
    say('Okochi','Who knows. ...All I know is, the two of you kept the same secret, for the same night, for twenty years.');
    sys('— An hour later. In a small meeting room at the station, Akari ran the 16mm projector. In front of the white wall, Yaeko and Goda sat side by side.');
    sys('Reel one. The line outside on opening morning. A young Yaeko laughing in the ticket booth. A crop-haired boy caught by the scruff of the neck as he tries to sneak into the seats.');
    sys('Reel two. The boy being taught to thread film in the booth. Packed houses. Two profiles, growing a little older with every scene.');
    sys('Last of all, from the booth side of the projection window, a thin Minoru begins to speak to the camera.');
    say('','Yaeko. Goda. If you’re watching this, the Ginseiza closes today.','letter');
    say('','For fifty years, the two of you were on the side that watches the audience. For the last one, at least, sit in the seats. Side by side.','letter');
    say('','I’ll run the projector. ...And Goda — your ticket from that first day? Consider it paid.','letter');
    say('Goda','.........');
    say('Goda','...That day, I didn’t have the price of a ticket.');
    say('Goda','He grabbed me by the collar, threw me in the booth... “Can’t pay? Then work it off.”');
    say('Goda','Fifty years, and I thought I still hadn’t paid it back.');
    say('Yaeko','...Goda. I asked Mr. Mashiba to open the old place one more time, tomorrow morning.');
    say('Yaeko','I’ll save two seats.');
    say('Okochi','...Well. Better finish this report by tomorrow morning, then.');
    sys('Okochi stacked the two cans and slid them across to Goda.');
  },
  ending:()=>`
    <h3>The Truth</h3>
    To show Yaeko the 16mm film left by the late founder, Minoru Hoshino, projectionist Masaru Goda shut everyone in the building during the Ginseiza’s final screening on its closing night.<br>
    At 22:10 he left the 35mm running and stepped out of the booth, cut the payphone line, and chained the emergency exit with his own bicycle lock.<br>
    At 22:25, just before the reel change, he threw the main breaker in the machine room and padlocked the panel. The fire shutter dropped in the blackout, and no one could leave the underground theater until dawn.
    <h3>The Hidden Truth</h3>
    Minoru had left two films. To Goda he said, “Don’t tell Yaeko.” To Yaeko he said, “Don’t tell Goda.”<br>
    Yaeko turned Goda down because she meant to surprise him with her own can after the screening.<br>
    One film, split in half. With either reel alone, no one could see it through to the end.<br>
    The last film Minoru left for the two who had watched the audience through the booth window for fifty years: “Sit in the seats. Side by side.”
    <h3>That Morning</h3>
    Mashiba pushed the demolition back one day. “That’s a million yen,” he grumbled.<br>
    On the last morning before the machines rolled in, there were two seats side by side in the middle of the Ginseiza’s auditorium. And in the booth was Akari, with a 16mm reel in her arms.`,
});
