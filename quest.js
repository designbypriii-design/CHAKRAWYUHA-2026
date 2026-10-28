/* EDITABLE THREE-LEVEL MYTHOLOGY GAME. Change the questions below. */
(() => {
 const levels = [
  {icon:'⚡',title:'THE THUNDER OF ZEUS',story:'The king of Olympus guards the first gate. Only the worthy may pass.',question:'Who is the Greek god of thunder and the sky?',options:['Hades','Zeus','Hermes','Ares'],correct:1,success:'The thunder bows to you. The first seal is yours!'},
  {icon:'🔱',title:'THE TRIDENT OF POSEIDON',story:'A mighty wave blocks your path. The sea demands an answer.',question:'Which sacred weapon belongs to Poseidon?',options:['A golden bow','A thunderbolt','A trident','A shield'],correct:2,success:'The waters part. The second seal is yours!'},
  {icon:'🦉',title:'THE WISDOM OF ATHENA',story:'The final gate opens only for a mind as sharp as a blade.',question:'Athena is the Greek goddess of wisdom and…',options:['Strategy in warfare','The underworld','The ocean','Wine'],correct:0,success:'The final seal awakens. You have conquered Olympus!'}
 ];
 const $=id=>document.getElementById(id), key='chakrawyuha-quest-v2';
 // All sounds are generated in the browser; no external audio files required.
 let audioCtx=null, soundOn=true;
 try{soundOn=localStorage.getItem('chakrawyuha-sound')!=='off'}catch(e){}
 const soundButton=$('questSound');
 function updateSound(){soundButton.textContent=soundOn?'🔊 SOUND ON':'🔇 SOUND OFF';soundButton.setAttribute('aria-pressed',String(soundOn))}
 updateSound();
 soundButton.addEventListener('click',()=>{soundOn=!soundOn;try{localStorage.setItem('chakrawyuha-sound',soundOn?'on':'off')}catch(e){};if(!soundOn&&'speechSynthesis'in window)speechSynthesis.cancel();updateSound();if(soundOn)play('click')});
 function tone(freq,start,duration,type='sine',volume=.12,endFreq=null){
  if(!soundOn)return;
  try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;audioCtx=audioCtx||new C();if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain(),t=audioCtx.currentTime+start;o.type=type;o.frequency.setValueAtTime(freq,t);if(endFreq)o.frequency.exponentialRampToValueAtTime(Math.max(20,endFreq),t+duration);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+duration+.02)}catch(e){}
 }
 function play(kind){if(!soundOn)return;
  if(kind==='danger'){tone(175,0,.4,'sawtooth',.11,65);tone(115,.13,.5,'triangle',.16,45);tone(75,.32,.55,'sawtooth',.08,30)}
  if(kind==='victory'){[392,494,587,784].forEach((f,i)=>tone(f,i*.13,.45,'triangle',.10));tone(196,.06,.8,'sine',.07)}
  if(kind==='final'){[262,330,392,523,659,784].forEach((f,i)=>tone(f,i*.17,.8,'triangle',.10));tone(131,.1,1.7,'sine',.09)}
  if(kind==='click')tone(440,0,.09,'sine',.06,660);
 }
 function speak(message){if(!soundOn||!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(message);u.lang='en-US';u.rate=.84;u.pitch=.73;u.volume=1;speechSynthesis.speak(u)}catch(e){}}

 // Cinematic FX: lightning, shake and a glowing Olympus portal.
 let fxTimer;
 function mythEffect(finalGate=false){
  const fx=$('mythFx'),panel=$('trialPanel');if(!fx||!panel)return;
  clearTimeout(fxTimer);fx.classList.remove('fx-active','fx-final');panel.classList.remove('trial-shake');
  void fx.offsetWidth;
  $('mythFxTitle').textContent=finalGate?'WELCOME TO CHAKRAWYUHA':'THE GATE HAS OPENED';
  fx.classList.add('fx-active');if(finalGate)fx.classList.add('fx-final');
  panel.classList.add('trial-shake');
  fxTimer=setTimeout(()=>{fx.classList.remove('fx-active','fx-final');panel.classList.remove('trial-shake')},finalGate?3500:1800);
 }
 let level=0;try{level=Math.min(3,Math.max(0,Number(localStorage.getItem(key))||0))}catch(e){}
 function save(){try{localStorage.setItem(key,String(level))}catch(e){}}
 function render(){
  const nodes=document.querySelectorAll('.trial-node');nodes.forEach((n,i)=>{n.classList.toggle('complete',i<level);n.classList.toggle('active',i===level)});
  $('trialScore').textContent=level+' SACRED SEAL'+(level===1?'':'S');$('trialFeedback').textContent='';$('trialNext').hidden=true;
  if(level===3){$('trialLevel').textContent='QUEST COMPLETE';$('trialIcon').textContent='🏛';$('trialTitle').textContent='CHAMPION OF OLYMPUS';$('trialStory').textContent='You conquered all three trials and broke the barrier. Your legend begins at CHAKRAWYUHA 2026.';$('trialQuestion').textContent='ALL THREE SACRED SEALS UNLOCKED';$('trialAnswers').replaceChildren();return;}
  const q=levels[level];$('trialLevel').textContent='TRIAL 0'+(level+1)+' / 03';$('trialIcon').textContent=q.icon;$('trialTitle').textContent=q.title;$('trialStory').textContent=q.story;$('trialQuestion').textContent=q.question;
  $('trialAnswers').replaceChildren();q.options.forEach((answer,i)=>{const b=document.createElement('button');b.type='button';b.className='trial-answer';b.textContent=String.fromCharCode(65+i)+'  /  '+answer;b.addEventListener('click',()=>{
   if(b.parentElement.dataset.solved==='yes')return;
   if(i===q.correct){b.parentElement.dataset.solved='yes';b.classList.add('correct');b.parentElement.querySelectorAll('button').forEach(x=>x.disabled=true);$('trialFeedback').textContent='✦ '+q.success;play('victory');mythEffect(false);speak(level===0?'The thunder has chosen you. The first gate is open.':level===1?'The oceans bow before you. The second gate is open.':'You have proven your worth. The final gate awaits.');$('trialNext').hidden=false;$('trialNext').textContent=level===2?'CLAIM YOUR VICTORY ↗':'UNLOCK NEXT TRIAL ↗';}
   else{play('danger');speak('Beware, mortal. The gods demand another answer.');b.classList.add('wrong');$('trialFeedback').textContent='The gods are not convinced. Try again.';setTimeout(()=>b.classList.remove('wrong'),650)}
  });$('trialAnswers').append(b)});delete $('trialAnswers').dataset.solved;
 }
 $('trialNext').addEventListener('click',()=>{if($('trialAnswers').dataset.solved!=='yes')return;level++;save();render();if(level===3){play('final');mythEffect(true);speak('Welcome to Chakrawyuha. The world of myths. You have broken the barrier. Your legend begins now.')}else{play('click');speak(level===1?'Poseidon awaits you. Enter the second trial.':'Athena awaits you. Enter the final trial.')}});
 $('questReset').addEventListener('click',()=>{level=0;save();render();play('click');speak('The trials begin again. Prove your worth.')});render();
})();
