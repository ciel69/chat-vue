import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

Vue.config.productionTip = false;

store.dispatch('chatInitial');

new Vue({
  router,
  store,
  render: (h: Function) => h(App),
}).$mount('#app');
