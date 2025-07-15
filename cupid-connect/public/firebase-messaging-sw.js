// // // // public/firebase-messaging-sw.js

// // // importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// // // importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// // // firebase.initializeApp({
// // //   apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
// // //   authDomain: "cupid-connect-d7fce.firebaseapp.com",
// // //   projectId: "cupid-connect-d7fce",
// // //   storageBucket: "cupid-connect-d7fce.appspot.com",
// // //   messagingSenderId: "959322105870",
// // //   appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
// // //   measurementId: "G-Q0GFTYFTHN"
// // // });

// // // const messaging = firebase.messaging();

// // // messaging.onBackgroundMessage((payload) => {
// // //   console.log('Background message received:', payload);

// // //   const notificationTitle = payload.notification?.title || 'Default Title';
// // //   const notificationOptions = {
// // //     body: payload.notification?.body || 'Default Body',
// // //     icon: '/Logo.jpg',
// // //   };

// // //   self.registration.showNotification(notificationTitle, notificationOptions);
// // // });


// // // firebase-messaging-sw.js
// // // This file should be placed in the public directory of your Next.js app

// // importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js');
// // importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js');

// // firebase.initializeApp({
// //   apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
// //   authDomain: "cupid-connect-d7fce.firebaseapp.com",
// //   projectId: "cupid-connect-d7fce",
// //   storageBucket: "cupid-connect-d7fce.appspot.com",
// //   messagingSenderId: "959322105870",
// //   appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
// //   measurementId: "G-Q0GFTYFTHN"
// // });

// // const messaging = firebase.messaging();

// // // Handle background messages
// // messaging.onBackgroundMessage(function(payload) {
// //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
// //   const notificationTitle = payload.notification.title;
// //   const notificationOptions = {
// //     body: payload.notification.body,
// //     icon: '/Logo.jpg'
// //   };

// //   self.registration.showNotification(notificationTitle, notificationOptions);
// // });

// // // Optional: Handle notification clicks
// // self.addEventListener('notificationclick', event => {
// //   console.log('[Service Worker] Notification click received:', event);
// //   event.notification.close();
  
// //   // This will focus on the window or open a new one if it's closed
// //   event.waitUntil(clients.matchAll({
// //     type: "window"
// //   }).then(clientList => {
// //     for (const client of clientList) {
// //       if (client.url === '/' && 'focus' in client) {
// //         return client.focus();
// //       }
// //     }
// //     if (clients.openWindow) {
// //       return clients.openWindow('/');
// //     }
// //   }));
// // });

// // public/firebase-messaging-sw.js

// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// firebase.initializeApp({
//   apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
//   authDomain: "cupid-connect-d7fce.firebaseapp.com",
//   projectId: "cupid-connect-d7fce",
//   storageBucket: "cupid-connect-d7fce.appspot.com",
//   messagingSenderId: "959322105870",
//   appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
//   measurementId: "G-Q0GFTYFTHN"
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('Background message received:', payload);

//   const notificationTitle = payload.notification?.title || 'Default Title';
//   const notificationOptions = {
//     body: payload.notification?.body || 'Default Body',
//     icon: '/Logo.jpg',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
  authDomain: "cupid-connect-d7fce.firebaseapp.com",
  projectId: "cupid-connect-d7fce",
  storageBucket: "cupid-connect-d7fce.appspot.com",
  messagingSenderId: "959322105870",
  appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
  measurementId: "G-Q0GFTYFTHN"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  if (payload?.notification) {
    const notificationTitle = payload.notification.title || "Default Title";
    const notificationOptions = {
      body: payload.notification.body || "Default Body",
      icon: '/Logo1.png',
      badge: '/Logo1.png', // Optional: Shows a badge icon on the app icon
      data: payload.data || {},
      actions: [
        {
          action: 'open_url',
          title: 'Open'
        }
      ]
    };

    // Display the notification
    // self.registration.showNotification(notificationTitle, notificationOptions);
    self.registration.showNotification(notificationTitle, notificationOptions).catch((err) => {
    console.error('Failed to show notification:', err);
  });
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event);

  event.notification.close();

  if (event.action === 'open_url') {
    clients.openWindow('https://www.cupidconnect.love'); // Open the app when clicked
  } else {
    event.waitUntil(clients.openWindow('https://www.cupidconnect.love'));
  }
});
