// Load Aarti & Bhajan with search + audio markers
function renderList(containerId, data, searchInputId){
  const el = document.getElementById(containerId);
  const search = document.getElementById(searchInputId);
  function draw(q=''){
    const items = data.filter(x => (x.title+x.text).toLowerCase().includes(q.toLowerCase()));
    el.innerHTML = items.map((x,i)=>`
      <div class="item">
        <h4>${i+1}. ${x.title}</h4>
        ${x.audio ? `<audio controls src="assets/audio/${x.audio}"></audio>`: ""}
        <pre>${x.text}</pre>
      </div>
    `).join('');
  }
  draw('');
  if(search) search.oninput = e => draw(e.target.value);
}

Promise.all([
  fetch('assets/data/aarti.json').then(r=>r.json()).catch(_=>[]),
  fetch('assets/data/bhajan.json').then(r=>r.json()).catch(_=>[]),
]).then(([aarti, bhajan])=>{
  if(document.getElementById('aartiList')) renderList('aartiList', aarti, 'searchAarti');
  if(document.getElementById('bhajanList')) renderList('bhajanList', bhajan, 'searchBhajan');
});
