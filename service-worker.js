const CACHE = 'mandir-v9';
const ASSETS = [
  '/', 'index.html','aarti.html','bhajan.html','donation.html','community.html','live.html','panchang.html','about.html','404.html',
  'assets/css/style.css',
  'assets/js/app.js','assets/js/theme.js','assets/js/sw-register.js','assets/js/dataLoader.js','assets/js/audioPlayer.js',
  'assets/js/donation.js','assets/js/community.js','assets/js/panchang.js',
  'assets/data/aarti.json','assets/data/bhajan.json','assets/data/panchang.json'
];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(res=> res || fetch(e.request).then(r=>{
    const copy = r.clone();
    caches.open(CACHE).then(c=>c.put(e.request, copy));
    return r;
  }).catch(()=>caches.match('index.html'))));
});
