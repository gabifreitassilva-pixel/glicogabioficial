// sw.js - Código Completo e Reforçado
self.addEventListener('install', (e) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});

// ESCUTA O COMANDO DO INDEX.HTML
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'DISPARAR_ALARME') {
        const options = {
            body: event.data.body,
            icon: 'icon-512.png', // Usando o nome correto que você já arrumou
            badge: 'icon-512.png',
            vibrate: [500, 110, 500, 110, 450, 110, 200, 110], 
            tag: 'glicogabi-alarme',
            renotify: true,
            requireInteraction: true
        };
        self.registration.showNotification(event.data.title, options);
    }
});
