const wall = document.getElementById('communityWall');
const btn = document.getElementById('postMsg');
const msgInput = document.getElementById('msgInput');
const imgInput = document.getElementById('imgUrl');
const adminPin = document.getElementById('adminPin');
let posts = JSON.parse(localStorage.getItem('community')||'[]');

function draw(){
  wall.innerHTML = posts.map((p,i)=>`
    <div class="item">
      <pre>${p.text}</pre>
      ${p.img?`<img src="${p.img}" style="max-width:100%;border-radius:10px;border:1px solid var(--line)"/>`:''}
      <div style="margin-top:.5rem;">
        <button data-i="${i}" class="del">Delete</button>
      </div>
    </div>
  `).join('');
  wall.querySelectorAll('.del').forEach(b=> b.onclick = ev => {
    const i = +ev.target.getAttribute('data-i');
    const pin = (adminPin && adminPin.value)||'';
    if(pin === '1080'){ posts.splice(i,1); save(); draw(); }
    else alert('Admin PIN गलत है (1080)');
  });
}
function save(){ localStorage.setItem('community', JSON.stringify(posts)); }
btn && (btn.onclick = ()=>{
  const t = msgInput.value.trim();
  const img = (imgInput.value||'').trim();
  if(!t) return;
  posts.unshift({text:t, img, ts: Date.now()});
  msgInput.value=''; imgInput.value='';
  save(); draw();
});
draw();
