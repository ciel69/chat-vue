const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000";
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost";

export default {
  env: {
    apolloConfig: {
      wsUrl: process.env.NODE_ENV === 'production' ? 'wss://ciel-chat-api.herokuapp.com/graphql' : 'ws://localhost:3030/graphql',
      optionsLink: {
        uri: process.env.NODE_ENV === 'production' ? 'https://ciel-chat-api.herokuapp.com/graphql' : 'http://localhost:3030/graphql',
        // Additional fetch options like `credentials` or `headers`
        credentials: 'same-origin',
        transportBatching: true
      }
    },
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`
  },
  head: {
    title: "my-project",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js TypeScript project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  loading: { color: "#3B8070" },
  css: ["~/assets/css/main.css"],
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ]
    }
  },
  modules: [
    ['@nuxtjs/axios', {
      baseURL: 'http://localhost:8081/'
    }],
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    ['nuxt-validate', {
      lang: 'ru',
      inject: false,
    }],
    "@nuxtjs/apollo",
    "nuxt-session",
  ],
  apollo: {
    clientConfigs: {
      default: '~/services/apollo/network-interfaces/'
    }
  },
  plugins: ['~plugins/vue-router'],
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
  ],
}
