import NuxtConfiguration from '@nuxt/config'

interface INuxtConfiguration extends NuxtConfiguration {
  env: any
}

const parseArgs = require('minimist');
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


const config: INuxtConfiguration = {
  mode: 'universal',
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
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#353058' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/vuetify'],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/vuetify', {
      theme: {
        dark: true,
        themes: {
          dark: {
            primary: '#9C3CA2',
            accent: '#9C3CA2',
          },
        },
      },
    }],
    '@nuxtjs/onesignal',
    "@nuxtjs/apollo",
    '@nuxtjs/pwa',
    ['nuxt-validate', {
      lang: 'ru',
      inject: false,
    }],
    'nuxt-session',
    'cookie-universal-nuxt',
  ],
  apollo: {
    clientConfigs: {
      default: '~/services/apollo/network-interfaces/'
    }
  },
  /*
  ** Build configuration
  */
  oneSignal: {
    init: {
      appId: 'ceb6ad07-d4ae-46e7-a107-38bc06c96b36',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    }
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}


export default config
