
const App = { page:'home', settings:{theme:'light', color:'default'}, data:{aarti:[], bhajan:[], panchang:[]} };

function saveSettings(){ localStorage.setItem('settings', JSON.stringify(App.settings)); }
function loadSettings(){ try{ App.settings=JSON.parse(localStorage.getItem('settings'))||App.settings; }catch(e){} if(App.settings.theme==='dark') document.body.classList.add('dark-theme'); if(App.settings.color!=='default') document.body.classList.add(App.settings.color); }
function setThemeDark(on){ document.body.classList.toggle('dark-theme', !!on); App.settings.theme = on?'dark':'light'; saveSettings(); }
function setColorTheme(key){ document.body.classList.remove('theme-red','theme-blue','theme-gold'); if(key && key!=='default') document.body.classList.add(key); App.settings.color = key||'default'; saveSettings(); }

function navigate(page){ App.page=page; render(); history.replaceState({page},'', '#'+page); }
function hookNav(){ document.querySelectorAll('nav [data-page]').forEach(btn=> btn.onclick=()=>navigate(btn.dataset.page)); }

function colorPreview(){ const el=document.getElementById('color-preview'); el.innerHTML=''; [{k:'theme-red',e:'🔴'},{k:'theme-blue',e:'🔵'},{k:'theme-gold',e:'🟡'}].forEach(c=>{ const b=document.createElement('button'); b.className='color-dot'; b.textContent=c.e; b.onclick=()=>setColorTheme(c.k); el.appendChild(b); }); }

async function bootstrap(){ loadSettings(); hookNav(); colorPreview();
  try{ const [a,b,p]=await Promise.all([ fetch('data/aarti.json').then(r=>r.json()), fetch('data/bhajan.json').then(r=>r.json()), fetch('data/panchang_2025.json').then(r=>r.json()) ]); App.data.aarti=a; App.data.bhajan=b; App.data.panchang=p; }catch(e){ console.warn('Data load failed',e); }
  const hash = location.hash.replace('#',''); navigate(hash||'home');
}

function render(){
  const c=document.getElementById('content'); const page=App.page;
  if(page==='home'){ c.innerHTML = `<div class="card"><h2>स्वागत है</h2><p>यह ऐप ऑफ़लाइन भी काम करता है। ऊपर से आरती, भजन, पंचांग, कम्युनिटी और दान सेक्शन चुनें।</p><div class="actions"><button onclick="navigate('aarti')">आरती</button><button onclick="navigate('bhajan')">भजन</button><button onclick="navigate('panchang')">पंचांग</button><button onclick="navigate('community')">कम्युनिटी</button><button onclick="navigate('donation')">दान</button><button onclick="navigate('settings')">सेटिंग्स</button></div></div>`; }
  if(page==='settings'){ c.innerHTML = `<div class="card"><h2>सेटिंग्स</h2><div class="actions"><button onclick="setThemeDark(!document.body.classList.contains('dark-theme'))">🌗 डार्क/लाइट</button><button onclick="setColorTheme('default')">रीसेट रंग</button></div><p class="badge">थीम और रंग आपकी डिवाइस में सेव हो जाते हैं।</p></div>`; }
  if(page==='aarti'){ renderAarti(); }
  if(page==='bhajan'){ renderBhajan(); }
  if(page==='donation'){ renderDonation(); }
  if(page==='community'){ renderCommunity(); }
  if(page==='panchang'){ renderPanchang(); }
}

window.addEventListener('DOMContentLoaded', bootstrap);
