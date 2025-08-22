
const CACHE='mandir-cache-v7';
const ASSETS=[
  './','./index.html','./manifest.webmanifest','./assets/css/style.css',
  './assets/js/theme.js','./assets/js/main.js','./assets/js/aarti.js','./assets/js/bhajan.js',
  './assets/js/donation.js','./assets/js/community.js','./assets/js/panchang.js','./assets/js/sw-register.js',
  './assets/data/aarti.json','./assets/data/bhajan.json','./assets/data/panchang.json'
];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{
  const url = new URL(e.request.url);
  if(url.origin===location.origin){
    e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{
      const copy = resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request, copy));
      return resp;
    }).catch(()=>caches.match('./index.html'))));
  }
});
