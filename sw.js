// sw.js - Versão Reforçada para GlicoGabi
self.addEventListener('install', (e) => {
    self.skipWaiting(); // Força a atualização imediata do app
});

self.addEventListener('activate', (e) => {
    return self.clients.claim();
});

// Essa função é o que faz o "barulho" e a vibração
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

// O motor que monitora o tempo
self.addEventListener('push', (event) => {
    const options = {
        body: 'GlicoGabi: Hora da sua medicação/insulina!',
        icon: 'icon-512.png',
        badge: 'icon-512.png',
        vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40], // Vibração tipo alarme
        tag: 'glicogabi-alarme',
        renotify: true,
        requireInteraction: true, // A notificação não some até você clicar
        data: { dateOfArrival: Date.now() }
    };

    event.waitUntil(
        self.registration.showNotification('⚠️ HORA DO REMÉDIO', options)
    );
});
