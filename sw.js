const CACHE_NAME='mandir-cache-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./data/aartis.json','./data/bhajans.json','./data/panchang_2025.json'];
for(let i=1;i<=100;i++){ ASSETS.push('./assets/audio/aarti_'+String(i).padStart(3,'0')+'.wav'); ASSETS.push('./assets/audio/bhajan_'+String(i).padStart(3,'0')+'.wav'); }
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{ const req=e.request;
  e.respondWith(caches.match(req).then(cached=>cached || fetch(req).then(resp=>{ const copy=resp.clone(); caches.open(CACHE_NAME).then(c=>{ if(req.method==='GET') c.put(req, copy); }); return resp; }).catch(()=>caches.match('./index.html')))); });
