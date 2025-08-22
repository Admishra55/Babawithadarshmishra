const form = document.getElementById('donationForm');
const list = document.getElementById('donationList');
const sumEl = document.getElementById('totalAmount');
const csvBtn = document.getElementById('exportCSV');
let rows = JSON.parse(localStorage.getItem('donations')||'[]');

function draw(){
  list.innerHTML = rows.map((r,i)=>`<div class="item"><strong>${r.name}</strong> — ₹${r.amount} <em>${r.note||''}</em></div>`).join('');
  const total = rows.reduce((a,b)=>a + Number(b.amount||0),0);
  sumEl.textContent = total.toString();
  localStorage.setItem('donations', JSON.stringify(rows));
}
form && (form.onsubmit = (e)=>{
  e.preventDefault();
  const name = document.getElementById('donorName').value.trim();
  const amount = document.getElementById('donationAmount').value;
  const note = document.getElementById('donationNote').value.trim();
  if(!name || !amount) return;
  rows.unshift({name, amount, note, ts: Date.now()});
  form.reset();
  draw();
});
csvBtn && (csvBtn.onclick = ()=>{
  const header = 'Name,Amount,Note,Timestamp\n';
  const body = rows.map(r=>`${r.name},${r.amount},${(r.note||'').replace(/,/g,';')},${new Date(r.ts).toISOString()}`).join('\n');
  const blob = new Blob([header+body], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'donations.csv';
  a.click();
});
draw();
