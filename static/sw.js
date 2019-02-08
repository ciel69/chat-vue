importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0513dad41551cb7fe14c.js",
    "revision": "1b829ba3ef23efc271d05a83e63569ba"
  },
  {
    "url": "/_nuxt/299858907a4165708a40.js",
    "revision": "942b2ed73cad56654c43698a1ee317c1"
  },
  {
    "url": "/_nuxt/6c30fc314435387f6300.js",
    "revision": "8acb464032fc2b6ad3c6b904d66d7029"
  },
  {
    "url": "/_nuxt/7e549e54e536d65a1af2.js",
    "revision": "1b8ce693a1151068cea134c71f7ff1fe"
  },
  {
    "url": "/_nuxt/8d3206d0782ddd1b7e45.js",
    "revision": "1e56bf56c6ca688ad4139f47099fd194"
  },
  {
    "url": "/_nuxt/98b1d65aa3cbcdc6bba8.js",
    "revision": "a8c5fb7ddf03bbf90ea4a0394e8212bc"
  },
  {
    "url": "/_nuxt/9f4f7ecce5f9b76847b6.js",
    "revision": "6f8c2f03907741c0009d61da3ebc392e"
  },
  {
    "url": "/_nuxt/ab49ae6f6bdd5ec4ca91.js",
    "revision": "683a5480d5d1b61baed5d62f85a81f2c"
  },
  {
    "url": "/_nuxt/c52ac5ef79f42044018e.js",
    "revision": "79ccbd4f065dde38eaab35d87080ab98"
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
