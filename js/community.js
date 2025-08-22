
const POSTS_KEY='posts_v1'; const ADMIN_PIN='1080';
function posts(){ try{ return JSON.parse(localStorage.getItem(POSTS_KEY))||[]; }catch(e){ return []; } }
function savePosts(a){ localStorage.setItem(POSTS_KEY, JSON.stringify(a)); }
function renderCommunity(){
  const c=document.getElementById('content'); const list=posts().reverse();
  const cards=list.map((p,i)=>`<div class="card"><div><b>${p.name||'अनाम'}</b> <span class="badge">${p.date||''}</span></div><p>${p.text||''}</p>${p.image?`<img src="${p.image}" style="max-width:100%;border-radius:12px"/>`:''}<div class="actions"><button onclick="deletePost(${i})">हटाएँ (एडमिन)</button></div></div>`).join('');
  c.innerHTML=`
    <div class="card"><h2>कम्युनिटी</h2>
      <div class="actions">
        <input id="p_name" class="search" placeholder="नाम (वैकल्पिक)">
        <input id="p_text" class="search" placeholder="संदेश लिखें...">
        <input id="p_image" class="search" placeholder="इमेज URL (वैकल्पिक)">
        <button onclick="addPost()">पोस्ट करें</button>
      </div>
    </div>
    <div class="card">
      <h3>🎥 मंदिर Live (YouTube)</h3>
      <p>एडमिन अपने YouTube चैनल पर लाइव करें; नीचे Channel ID डालें:</p>
      <div class="actions"><input id="yt_channel" class="search" placeholder="YouTube Channel ID" value="${localStorage.getItem('yt_channel')||''}"><button onclick="saveYT()">सेव</button></div>
      <div id="yt_embed" class="card"></div>
    </div>
    ${cards || '<div class="card"><em>अभी कोई पोस्ट नहीं।</em></div>'}`;
  renderYT();
}
function addPost(){ const name=document.getElementById('p_name').value.trim(); const text=document.getElementById('p_text').value.trim(); const image=document.getElementById('p_image').value.trim(); if(!text){ alert('संदेश आवश्यक है'); return; } const a=posts(); a.push({name,text,image,date:new Date().toISOString().slice(0,10)}); savePosts(a); renderCommunity(); }
function deletePost(idx){ const pin=prompt('एडमिन PIN?'); if(pin!==ADMIN_PIN){ alert('गलत PIN'); return; } const a=posts().reverse(); a.splice(idx,1); savePosts(a.reverse()); renderCommunity(); }
function saveYT(){ const id=document.getElementById('yt_channel').value.trim(); localStorage.setItem('yt_channel', id); renderYT(); }
function renderYT(){ const id=localStorage.getItem('yt_channel'); const el=document.getElementById('yt_embed'); if(!id){ el.innerHTML='<em>Channel ID दर्ज करें</em>'; return; } el.innerHTML=`<iframe width="100%" height="315" src="https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(id)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; }
