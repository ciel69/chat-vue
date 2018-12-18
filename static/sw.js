importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.b4438e27954b22c8db38.js",
    "revision": "f533a72113819cc8f4b181a6975e33da"
  },
  {
    "url": "/_nuxt/layouts/default.ef420499206c17278de9.js",
    "revision": "c0c07103d99d9ca115cf80877cc2cb23"
  },
  {
    "url": "/_nuxt/manifest.83cf12ecbd6aa174ab07.js",
    "revision": "154b18d371237fbb2a9d2c732cbad9e9"
  },
  {
    "url": "/_nuxt/pages/auth.d0dd3f0692afbf48070d.js",
    "revision": "9a10e2312ad3185b3846a0ef285e8f5a"
  },
  {
    "url": "/_nuxt/pages/index.6e3e774850ec02afaa24.js",
    "revision": "6b59e4c8bc96600d1afbfe1515fb2e1d"
  },
  {
    "url": "/_nuxt/vendor.c38049deef0aa0c9eb42.js",
    "revision": "7bb562ce9dc100a399e6609d29c871d9"
  }
], {
  "cacheId": "chat-nuxt",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





