// sw.js - Service Worker para GlicoGabi
self.addEventListener('install', (e) => {
    console.log('GlicoGabi: Service Worker Instalado');
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'icon-512.png',
        badge: 'icon-512.png',
        vibrate: [200, 100, 200]
    });
});

// Lógica para verificar lembretes locais em segundo plano
setInterval(() => {
    // Nota: Navegadores restringem intervalos longos com app fechado por economia de bateria.
    // O ideal para uso profissional é usar uma API de Push, mas para uso pessoal 
    // manter o app em suspensão já ajuda.
}, 60000);