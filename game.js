import { firebaseConfig } from './firebase-config.js'

const $ = (id) => document.getElementById(id)
const game = $('game')
const player = $('player')
const dog = $('dog')
const scoreEl = $('score')
const bestEl = $('bestScore')
const livesEl = document.querySelector('.lives')
const state = { running:false, x:50, keys:{}, poops:[], score:0, lives:3, lastDrop:0, lastFrame:0, invincible:false, sound:true }
let db = null

bestEl.textContent = localStorage.getItem('poop-dodge-best') || 0

async function setupFirebase() {
  if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) return showLocalRanking()
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js')
    const { getDatabase, onValue, query, ref, limitToLast, orderByChild, push } = await import('https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js')
    db = { database:getDatabase(initializeApp(firebaseConfig)), onValue, query, ref, limitToLast, orderByChild, push }
    db.onValue(db.query(db.ref(db.database,'scores'),db.orderByChild('score'),db.limitToLast(10)), snap => renderRanking(Object.values(snap.val() || {}).sort((a,b)=>b.score-a.score)))
  } catch { showLocalRanking() }
}

function startGame() {
  state.running=true; state.score=0; state.lives=3; state.x=50; state.poops=[]; state.lastDrop=0; state.lastFrame=performance.now(); state.invincible=false
  document.querySelectorAll('.poop').forEach(el=>el.remove())
  $('startScreen').classList.add('hidden'); $('gameOverScreen').classList.add('hidden')
  updateHud(); game.focus(); requestAnimationFrame(loop)
}

function loop(now) {
  if (!state.running) return
  const dt=Math.min((now-state.lastFrame)/16.67,2); state.lastFrame=now
  if(state.keys.left) state.x-=1.05*dt
  if(state.keys.right) state.x+=1.05*dt
  state.x=Math.max(4,Math.min(96,state.x)); player.style.left=`${state.x}%`
  const level=Math.min(1,state.score/600); const dropDelay=900-level*520
  if(now-state.lastDrop>dropDelay){ dropPoop(); state.lastDrop=now }
  state.poops.forEach(p=>{p.y+=p.speed*dt*(1+level*.75);p.el.style.top=`${p.y}px`;checkHit(p)})
  state.poops=state.poops.filter(p=>{if(p.y>game.clientHeight){p.el.remove();state.score+=5;return false}return true})
  scoreEl.textContent=state.score; $('difficultyMeter').style.width=`${10+level*90}%`; $('difficultyText').textContent=level>.7?'폭풍 주의보':level>.35?'공원 달리기':'산책 수준'
  requestAnimationFrame(loop)
}

function dropPoop() {
  const el=document.createElement('div');el.className='poop';el.textContent='💩'
  const x=8+Math.random()*84; dog.style.left=`${x}%`;el.style.left=`calc(${x}% - 19px)`;game.append(el)
  state.poops.push({el,x,y:73,speed:3.3+Math.random()*1.4,hit:false})
}

function checkHit(p) {
  if(p.hit||state.invincible) return
  const playerY=game.clientHeight-135
  if(p.y>playerY&&p.y<playerY+60&&Math.abs(p.x-state.x)<5.5){
    p.hit=true;p.el.remove();state.lives--;state.invincible=true;player.classList.add('hit');beep()
    setTimeout(()=>{state.invincible=false;player.classList.remove('hit')},700);updateHud()
    if(state.lives<=0) endGame()
  }
}

function endGame() {
  state.running=false;const best=Math.max(Number(bestEl.textContent),state.score);localStorage.setItem('poop-dodge-best',best);bestEl.textContent=best
  $('finalScore').textContent=`${state.score}점`;$('gameOverScreen').classList.remove('hidden')
}

function updateHud(){scoreEl.textContent=state.score;livesEl.innerHTML=Array.from({length:3},(_,i)=>`<span>${i<state.lives?'❤️':'🤍'}</span>`).join('')}
function beep(){if(!state.sound)return;const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=150;g.gain.value=.07;o.start();o.stop(a.currentTime+.12)}
function bindHold(el,key){['pointerdown','touchstart'].forEach(e=>el.addEventListener(e,x=>{x.preventDefault();state.keys[key]=true}));['pointerup','pointercancel','pointerleave','touchend'].forEach(e=>el.addEventListener(e,()=>state.keys[key]=false))}
function showLocalRanking(){renderRanking(JSON.parse(localStorage.getItem('poop-dodge-ranking')||'[]'))}
function renderRanking(scores){$('ranking').innerHTML=scores.length?scores.map(x=>`<li><span>${escapeHtml(x.name)}</span><b>${x.score}</b></li>`).join(''):'<li class="empty-ranking">아직 등록된 점수가 없어요.<br>첫 번째 주인공이 되어보세요!</li>'}
function escapeHtml(v){const d=document.createElement('div');d.textContent=v;return d.innerHTML}

$('startButton').onclick=startGame;$('retryButton').onclick=startGame
$('soundButton').onclick=()=>{state.sound=!state.sound;$('soundButton').textContent=state.sound?'🔊':'🔇'}
document.addEventListener('keydown',e=>{if(['ArrowLeft','a','A'].includes(e.key))state.keys.left=true;if(['ArrowRight','d','D'].includes(e.key))state.keys.right=true})
document.addEventListener('keyup',e=>{if(['ArrowLeft','a','A'].includes(e.key))state.keys.left=false;if(['ArrowRight','d','D'].includes(e.key))state.keys.right=false})
bindHold($('leftButton'),'left');bindHold($('rightButton'),'right')
$('scoreForm').onsubmit=async e=>{e.preventDefault();const name=$('nickname').value.trim()||'익명';const entry={name,score:state.score,createdAt:Date.now()}
  if(db)await db.push(db.ref(db.database,'scores'),entry);else{const scores=JSON.parse(localStorage.getItem('poop-dodge-ranking')||'[]');scores.push(entry);scores.sort((a,b)=>b.score-a.score);localStorage.setItem('poop-dodge-ranking',JSON.stringify(scores.slice(0,10)));showLocalRanking()}
  e.target.querySelector('button').textContent='등록 완료!'
}
setupFirebase()
