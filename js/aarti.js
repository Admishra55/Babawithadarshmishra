
function renderAarti(){
  const c = document.getElementById('content');
  const list = App.data.aarti || [];
  const items = list.map(x=>`
    <div class="card">
      <h3>${x.title} <span class="badge">#${x.id}</span></h3>
      <pre>${x.text}</pre>
      ${x.audio ? `<audio class="audio" controls src="${x.audio}"></audio>` : ''}
    </div>`).join('');
  c.innerHTML = `<input class="search" placeholder="आरती खोजें..." oninput="searchAarti(this.value)"/> <div class="list">${items}</div>`;
}
function searchAarti(q){
  q=(q||'').toLowerCase();
  const data=(App.data.aarti||[]).filter(x=> (x.title||'').toLowerCase().includes(q));
  const c = document.getElementById('content');
  const items = data.map(x=>`
    <div class="card">
      <h3>${x.title} <span class="badge">#${x.id}</span></h3>
      <pre>${x.text}</pre>
      ${x.audio ? `<audio class="audio" controls src="${x.audio}"></audio>` : ''}
    </div>`).join('');
  c.innerHTML = `<input class='search' value='${q}' placeholder='आरती खोजें...' oninput='searchAarti(this.value)'/> <div class='list'>${items}</div>`;
}
