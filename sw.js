const C='fit-v12',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={t:'Мой фитнес-помощник',b:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.t||'Мой фитнес-помощник',{body:d.b||'',icon:'icon-192.png',badge:'icon-192.png',vibrate:[200,100,200],tag:d.tag||'fit',renotify:true}))});
