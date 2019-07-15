<template>
  <v-app dark>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs2>
          <dialog-list/>
        </v-flex>
        <v-flex xs10>
          <nuxt/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
  import { Component, Emit } from 'nuxt-property-decorator';
  import { Action } from 'vuex-class';

  import {VueNuxt} from '~/types'

  import OverlayScrollbars from 'overlayscrollbars';

  import DialogList from '~/components/Dialog/DialogList.vue';

  @Component({
    components: {
      DialogList
    },
  })
  export default class Layout extends VueNuxt {
    menuVisible: boolean = false;
    @Action('channels/chatInitial') chatInitial;
    @Action('user/logout') actionLogout;

    beforeMount() {
      console.log('Layout mounted');
      OverlayScrollbars(document.querySelectorAll('body'), { });
    }

    @Emit()
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }

    @Emit()
    logout() {
      this.actionLogout();
    }
  }
</script>

<style lang="scss">
  @import 'material-design-icons/iconfont/material-icons.css';
  @import 'overlayscrollbars/css/OverlayScrollbars.css';
  @import 'vuetify/dist/vuetify.min.css';

  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    background: #FF0000;
  }

  .page-container {
    height: 100vh;
    display: flex;

    .md-app {
      width: 100%;
    }
  }
</style>
