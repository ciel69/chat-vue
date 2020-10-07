import Vue from 'vue';
import {EmojiPickerPlugin} from 'vue-emoji-picker';
import {OverlayScrollbarsPlugin, OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
import VueCompositionApi from '@vue/composition-api';
import VirtualList from 'vue-virtual-scroll-list';
import {VueIocPlugin} from '@vue-ioc/core';

Vue.use(EmojiPickerPlugin);
Vue.use(OverlayScrollbarsPlugin);
Vue.use(VueCompositionApi);
Vue.use(VueIocPlugin);

Vue.component('overlay-scrollbars', OverlayScrollbarsComponent);
Vue.component('virtual-list', VirtualList);
