/* UI text: English (each case's dialogue lives in js/data/en/fileXX/) */
'use strict';

const L={
  // Fixed text in index.html (elements marked with data-l / data-lt)
  html:{
    loc:'Hidden Truth', saved:'✓ Saved', help:'Controls', board:'Case Board', skip:'Skip ▶▶',
    bandHint:'Click / Space to close ▼',
    tseries:'A MYSTERY IN FILES', title:'Hidden Truth', tsub:'— The evidence tells the truth —',
    tpress:'Click / Space to begin',
    fh:'Case Files', fen:'FILE SELECT', fback:'◀ Title', fhint:'↑↓ Select · Space / Enter Confirm · Esc Back',
    btitle:'Case Board', bclose:'Close ✕', hypsec:'Deductions', evsec:'Evidence',
  },
  htmlTitle:{bgm:'Music on/off', se:'Sound effects on/off'},
  gameTitle:'Hidden Truth',
  locale:'en-US',
  langBtn:'日本語', langBtnTitle:'日本語に切り替える',

  /* Names the engine uses directly */
  me:'You', tak:'Takizawa', takRadio:'Takizawa (radio)', okochi:'Okochi',
  // From an NPC's display name "Mori (Forensics)", get the speaker name "Mori"
  speakerOf:name=>name.split(' (')[0],

  /* Maps */
  interroRoom:'Interrogation Room',
  mapShort:name=>name.split(' — ')[0],
  sceneFallback:'Crime scene',

  /* Dialogue & HUD */
  got:name=>`[Evidence] Obtained “${name}.”`,
  guideLabel:'HOW TO PLAY',
  evCount:(n,t)=>`Evidence ${n}/${t}`,

  /* Control guides */
  g:(()=>{
    const MOVE=['Move','Arrow keys / WASD · Tap where to go'];
    const LOOK=['Examine / Talk','Space / Enter · Tap the target'];
    const NEXT=['Advance text','Space / Enter · Click'];
    const BOARD=['Case Board','B key · Button at top right'];
    const GLOW='Sparkling spots are clues you haven’t examined yet.';
    return {
      basic:['Investigate the Scene',[MOVE,LOOK,NEXT],GLOW],
      all:['Controls',[MOVE,LOOK,NEXT,BOARD,['Test a deduction','On the Case Board, pick a Claim → a piece of Evidence → “Cross-check”']],GLOW],
      board:['Testing Deductions — The Case Board',[
        ['Open','B key · “Case Board” at top right'],
        ['1','Pick one Claim in the deduction'],
        ['2','Pick a piece of Evidence'],
        ['3','Press “Cross-check” to test it'],
      ],'Answer a false claim with evidence that contradicts it, and a true claim with evidence that supports it. Find a contradiction and the deduction falls apart.'],
      garden:['To the Garden',[['Study → Garden','Examine the study door'],['Garden → Study','Examine the back door']]],
      hall:['To the Corridor',[['Gallery → Corridor','Examine the gallery exit'],['Corridor → Gallery','Examine the gallery entrance'],['Security footage','Examine the monitor in the security office']]],
      roof:['Up to the Roof',[['Division → Roof','Examine the division’s door'],['Roof → Division','Examine the stairwell door']]],
      final:['Establish the Truth',[['Final deduction','Support every claim with evidence'],['Once proven','You can head to the interrogation room']]],
      interro:['Interrogation',[
        ['Answer','“Answer with evidence” → pick evidence → Present'],
        ['Hear again','“Repeat the question” to hear it once more'],
        ['If you’re wrong','You just return to the same question. Try as often as you like'],
      ]],
    };
  })(),

  /* Title & file select */
  caseFiles:'Case Files',
  unknown:'???',
  fstatus:{locked:'Coming soon',progress:'In progress',solved:'Solved',fresh:'New'},
  actContinue:'Continue', actRestart:'Start over', actReplay:'Investigate again', actStart:'Begin investigation', actReview:'View case board',
  lockedTitle:'— Coming Soon —', lockedLead:'This case file cannot be opened yet.',
  solvedStamp:'SOLVED', statusLabel:'Status: ', lastSave:'Last save: ',
  restartNote:'* Choosing “Start over” will overwrite your save',
  saveEv:(n,t)=>`Evidence ${n}/${t}`,
  hintList:'↑↓ Select · Space / Enter Confirm · Esc Title',
  hintAct:'←→ Select · Space / Enter Confirm · Esc Back',
  files:{
    file01:{title:'The Locked Study',
      lead:'Soichiro Kurosaki, master of the manor, lies dead in his study. The door was locked from inside, the window latched, the key on the desk. — An accident? Or something else?'},
    file02:{title:'The Azure Drop',
      lead:'The night before its grand opening, the Shirasagi Museum of Art discovers its star jewel, the “Azure Drop,” has been swapped for a glass fake. — When? And who?'},
    file03:{title:'The Last Spoonful',
      lead:'Inspector Okochi’s pudding has vanished from the fridge in Prefectural Police HQ’s Major Crimes Division. Limited to 20 a day — he queued from 7 a.m. to get it. — This is a case.'},
  },

  /* Takizawa's hints (common.js) */
  takFinal:no=>`Back up every claim in Deduction ${no} with evidence. Open the Case Board [B].`,
  askInterro:'Head to the interrogation room?', goInterro:'To the interrogation room', stayScene:'Keep looking around',
  takOpen:(no,title)=>`Deduction ${no}: “${title}”...`,
  takReady:'You’ve got the evidence. Open the Case Board [B] and cross-check it against the claims.',
  takBroken:no=>`Deduction ${no} fell apart. But I can’t see the next thread yet.`,

  /* Deduction scenes */
  cctvName:'Footage', sceneName:'Deduction',
  addedToBoard:(no,title)=>`Added Deduction ${no}: “${title}” to the Case Board`,
  firstHyp:[
    '...That was a “deduction” — what we can piece together from the evidence so far.',
    'Check its claims against the evidence, one by one. Find a contradiction, and the deduction falls apart.',
    'Add new evidence to a broken deduction, and the next one gets closer to the truth.',
  ],
  sceneHeader:(no,title)=>`Deduction ${no}: ${title} — Reenactment`,
  click:'Click',

  /* Progress */
  nudge:'New evidence is in. Test the current deduction on the Case Board [B]',
  hypBand:{title:'A Deduction Takes Shape',sub:'— The evidence connects into a single thread'},
  newSpots:'New places to investigate have appeared',

  /* Case board */
  b:{
    pickMsg:suspect=>`Choose the evidence that answers ${suspect}’s question, and present it.`,
    backToScene:'▶ Back to the scene',
    titlePick:'Present Evidence', title:'Case Board',
    titleReview:(no,t)=>`Case Board — ${no} “${t}”`,
    reviewNote:when=>`Your case board as it stood when you solved the case (${when}).`,
    reviewNoteAll:'No record from when you solved this case, so every deduction and piece of evidence is shown.',
    tab:no=>`Deduction ${no}`,
    noHyp:'No deductions yet.<br>Gather evidence at the scene, and a “deduction” about what happened will take shape.',
    refuted:'This deduction has been refuted.',
    proven:'Every claim is supported by evidence.',
    finalLeft:left=>`Support every claim with evidence (${left} left).`,
    howTo:'Pick a claim and “Cross-check” it against a piece of evidence.<br>Counter a false claim with contradicting evidence; back a true claim with supporting evidence.',
    stampNg:'REFUTED', stampOk:'PROVEN', unchecked:'?',
    replay:'▶ Replay scene',
    noEv:'No evidence yet.',
    evHint:'Tap a piece of evidence to see its details.',
    pickEv:'Choose a piece of evidence to cross-check.',
    pickClaim:'Pick a claim to cross-check it with this evidence.',
    present:name=>`Present “${name}”`,
    think:'Cross-check',
    ok:'✔ Supported', ng:'✖ Contradiction!',
    hypRefuted:(no,title)=>`Deduction ${no}: “${title}” has been refuted.`,
    progressed:'The investigation has moved forward. New places to examine will appear at the scene.',
    allProven:'Every claim is supported. — This is the truth.',
    goTak:'Report to Takizawa, and you can head to the interrogation room.',
    miss:['...This evidence neither breaks the claim nor supports it.','That doesn’t seem related. Try another piece of evidence.','They don’t connect. Read the claim again carefully.'],
  },

  /* Interrogation & ending */
  interroQ:(i,n)=>`Interrogation Room — Question ${i}/${n}`,
  answerWithEv:'Answer with evidence', reAsk:'Repeat the question',
  presented:name=>`You presented “${name}.”`,
  whisper:'(quietly) ...Pick the evidence that answers the question head-on.',
  truthBand:{title:'The Truth Comes to Light',sub:'— The evidence answered every question'},
  solvedHead:(no,title)=>`${no} ${title} — Solved`,
  record:'Case Record',
  collected:(n,t)=>`Evidence collected: ${n} / ${t}`,
  endNext:'Click / Space to continue ▼',
  resumeInterro:'— The interrogation resumes.',
  resumed:'Resuming where you left off',
  proNext:'Click / Space to begin the investigation ▼',

  /* Signs drawn on the backgrounds */
  sign:{security:'SECURITY',curator:'CURATORS',staffExit:'EXIT',gallery:'GALLERY',lobby:'← LOBBY',
        kitchen:'KITCHEN',exit:'EXIT',stairs:'STAIRS'},
};
