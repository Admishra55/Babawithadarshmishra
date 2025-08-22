
const DONOR_KEY='donors_v1';
function donors(){ try { return JSON.parse(localStorage.getItem(DONOR_KEY))||[]; } catch(e){ return []; } }
function saveDonors(a){ localStorage.setItem(DONOR_KEY, JSON.stringify(a)); }
function totalAmount(){ return donors().reduce((s,x)=> s + (Number(x.amount)||0), 0); }
function renderDonation(){
  const c=document.getElementById('content'); const list=donors().reverse();
  const rows=list.map(x=> `<tr><td>${x.name}</td><td>${x.amount}</td><td>${x.note||''}</td><td>${x.date||''}</td></tr>`).join('');
  c.innerHTML=`
    <div class="card"><h2>दान फ़ॉर्म</h2>
    <div class="actions">
      <input id="d_name" class="search" placeholder="नाम">
      <input id="d_amount" class="search" placeholder="राशि" type="number">
      <input id="d_note" class="search" placeholder="नोट (वैकल्पिक)">
      <button onclick="addDonation()">जोड़ें</button>
      <button onclick="exportCSV()">CSV निर्यात</button>
    </div>
    <p>कुल राशि: <b>₹ ${totalAmount()}</b></p>
    <div class="card">
      <table class="table"><thead><tr><th>नाम</th><th>राशि</th><th>नोट</th><th>तिथि</th></tr></thead><tbody>${rows}</tbody></table>
    </div></div>`;
}
function addDonation(){
  const name=document.getElementById('d_name').value.trim();
  const amount=Number(document.getElementById('d_amount').value);
  const note=document.getElementById('d_note').value.trim();
  if(!name||!amount){ alert('नाम और राशि आवश्यक हैं'); return; }
  const arr=donors(); arr.push({name,amount,note,date:new Date().toISOString().slice(0,10)}); saveDonors(arr); renderDonation();
}
function exportCSV(){
  const arr=donors();
  const csv=['name,amount,note,date'].concat(arr.map(x=>`${x.name},${x.amount},${(x.note||'').replace(/,/g,';')},${x.date}`)).join('\n');
  const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='donors.csv'; a.click(); URL.revokeObjectURL(url);
}
