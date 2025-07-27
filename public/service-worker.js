// ✅ Push event listener
self.addEventListener('push', (event) => {
  console.log('[Service Worker] 🔔 Push Received');

  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    console.error('[Service Worker] ❌ Invalid push payload:', e);
  }

  const title = data.title || '📢 New Notification';
  const options = {
    body: data.body || 'You have a new message!',
    icon: '/logo192.png',       // App icon (placed in public folder)
    badge: '/logo192.png',      // Small badge icon
    vibrate: [100, 50, 100],    // Vibration pattern
    data: {
      url: data.url || '/',     // URL to open on click
      dateOfArrival: Date.now(),
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ✅ Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] 📬 Notification click');

  event.notification.close();

  const redirectUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === redirectUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(redirectUrl);
      }
    })
  );
});
