// Service Worker - GlicoGabi Alerta Emergência
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'DISPARAR_ALARME') {
        const options = {
            body: event.data.body,
            icon: 'icon-512.png',
            badge: 'icon-512.png',
            vibrate: [500, 200, 500, 200, 800], // Vibração de atenção
            tag: 'alerta-glicogabi',
            renotify: true,
            requireInteraction: true, // A mensagem TRAVA na tela até você clicar
            actions: [
                { action: 'confirmar', title: '✅ SIM, JÁ TOMEI' },
                { action: 'abrir', title: '🔍 ABRIR APP' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(event.data.title, options)
        );
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Se clicar em qualquer parte ou no botão abrir, abre o app
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
