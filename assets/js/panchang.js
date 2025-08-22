const el = document.getElementById('panchangData');
fetch('assets/data/panchang.json').then(r=>r.json()).then(data=>{
  el.innerHTML = data.map(d=>`<div class="item"><strong>${d.date}</strong> — ${d.war} — ${d.tithi} — ${d.festival||''}</div>`).join('');
});
