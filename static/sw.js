importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.2768e48d4bcba51122c25a3ea7b935bc.css",
    "revision": "2768e48d4bcba51122c25a3ea7b935bc"
  },
  {
    "url": "/_nuxt/app.9c49551213c9776b9514.js",
    "revision": "55581d1e902a916d35a19a977096b1da"
  },
  {
    "url": "/_nuxt/layouts/default.79ce02833228e86ee967.js",
    "revision": "29cd9ae38611f5dce8828a78d8bf6c8b"
  },
  {
    "url": "/_nuxt/manifest.497f37270203dd11c5c8.js",
    "revision": "b0a7b91c40e054f3e4903e2c43407375"
  },
  {
    "url": "/_nuxt/pages/auth.d0dd3f0692afbf48070d.js",
    "revision": "9a10e2312ad3185b3846a0ef285e8f5a"
  },
  {
    "url": "/_nuxt/pages/index.ef76aaec9a9fff813b17.js",
    "revision": "86d0697c125161ff74e3ae3f226a6157"
  },
  {
    "url": "/_nuxt/vendor.80de24c985ba81e06206.js",
    "revision": "8c71ffc817e6ca56b1a847b695351aeb"
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





