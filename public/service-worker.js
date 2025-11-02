// Service Worker for caching static assets
// IMPORTANT: Increment version number on each deployment to force cache refresh
const CACHE_NAME = 'mohamed-portfolio-cache-v2';

const urlsToCache = [
  '/',
  '/hero-light.webp',
  '/hero-dark.webp',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/sounds/notification.mp3'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and API calls
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/')
  ) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      
      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses or non-cacheable responses
        if (
          !response || 
          response.status !== 200 || 
          response.type !== 'basic' || 
          response.headers.get('Cache-Control')?.includes('no-store')
        ) {
          return response;
        }
        
        // Clone the response - one to return, one to cache
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      });
    })
  );
});