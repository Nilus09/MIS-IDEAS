// Service Worker para notificaciones push - sube este archivo a la raíz de netnull.org
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD57cIHb-k4bhMwKvoDHp2uOcJw_EDPVxg",
  authDomain: "netnull-a9a18.firebaseapp.com",
  projectId: "netnull-a9a18",
  storageBucket: "netnull-a9a18.firebasestorage.app",
  messagingSenderId: "85420219235",
  appId: "1:85420219335:web:b7a93121caa8519602d156"
});

const messaging = firebase.messaging();

// Mostrar notificación cuando la app está en segundo plano
messaging.onBackgroundMessage(function(payload) {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon.png',
    badge: '/icon.png',
    data: payload.webpush?.fcmOptions?.link
  });
});

// Al hacer clic en la notificación, abrir la idea
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data || 'https://netnull.org';
  event.waitUntil(clients.openWindow(url));
});
