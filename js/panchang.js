
function renderPanchang(){
  const c = document.getElementById('content');
  const list = App.data.panchang || [];
  const rows = list.map(x=> `<tr><td>${x.date}</td><td>${x.tithi}</td><td>${x.nakshatra}</td><td>${x.var}</td><td>${x.festival||''}</td></tr>`).join('');
  c.innerHTML = `<div class="card"><h2>हिन्दी पंचांग (2025)</h2><table class="table"><thead><tr><th>तिथि</th><th>तिथि (चंद्र)</th><th>नक्षत्र</th><th>वार</th><th>पर्व</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
