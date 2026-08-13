/* ═══════════════════════════════════════════════
   OmniSphere Service Worker v4.0.0
   ═══════════════════════════════════════════════ */

const VERSION = 'v4.0.0';
const CACHE_NAME = `omnisphere-${VERSION}`;
const RUNTIME_CACHE = 'runtime-cache';

// Core assets to cache
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/critical.css',
    '/css/animations.css',
    '/css/responsive.css',
    '/js/core/main.js',
    '/manifest.json',
    '/offline.html',
];

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/assets/images/profile/main.webp',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png',
    '/assets/fonts/SpaceGrotesk-Bold.woff2',
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll([...CORE_ASSETS, ...PRECACHE_ASSETS]))
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map((name) => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip cross-origin requests (except CDN)
    const url = new URL(request.url);
    if (url.origin !== location.origin && !url.hostname.includes('res.cloudinary.com')) {
        return;
    }

    // Network-first for pages
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then((cached) => cached || caches.match('/offline.html'));
                })
        );
        return;
    }

    // Stale-while-revalidate for assets
    event.respondWith(
        caches.match(request).then((cached) => {
            const networkFetch = fetch(request).then((response) => {
                if (response && response.status === 200) {
                    const copy = response.clone();
                    caches.open(RUNTIME_CACHE).then((cache) =>
