import Vue from 'vue';
import { EmojiPickerPlugin } from 'vue-emoji-picker';
import { OverlayScrollbarsPlugin, OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

Vue.use(EmojiPickerPlugin)
Vue.use(OverlayScrollbarsPlugin);

Vue.component('overlay-scrollbars', OverlayScrollbarsComponent);
