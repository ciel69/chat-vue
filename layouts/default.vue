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
  import { Component, Vue, Emit } from 'nuxt-property-decorator';
  import { Action } from 'vuex-class';

  import DialogList from '~/components/Dialog/DialogList';

  @Component({
    components: {
      DialogList,
    },
  })
  export default class Layout extends Vue {
    menuVisible: boolean = false;
    @Action('channels/chatInitial') chatInitial;
    @Action('user/logout') actionLogout;

    beforeMount() {
      console.log('Layout mounted');
      this.chatInitial();
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
  @import 'vuetify/dist/vuetify.min.css';
  @import '../assets/scss/custom-material';

  .page-container {
    height: 100vh;
    display: flex;

    .md-app {
      width: 100%;
    }
  }
</style>
