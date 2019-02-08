<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item to="/">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Главная</span>
          </md-list-item>

          <md-list-item  to="/users">
            <md-icon>face</md-icon>
            <span class="md-list-item-text">Люди</span>
          </md-list-item>

          <md-list-item  to="/channels" @click="actionGetChannelsFront">
            <md-icon>mode_comment</md-icon>
            <span class="md-list-item-text">Сообщения</span>
          </md-list-item>

          <md-list-item @click="logout">
            <md-icon>exit_to_app</md-icon>
            <span class="md-list-item-text">Выход</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <nuxt/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class Layout extends Vue {
  menuVisible: boolean = false;
  @Action('channels/chatInitial') chatInitial;
  @Action('channels/getChannelsFront') actionGetChannelsFront;
  @Action('user/logout') actionLogout;

  mounted() {
    console.log('Layout mounted');
    this.chatInitial();
    this.actionGetChannelsFront();
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
@import '../assets/scss/custom-material';

.page-container {
  height: 100vh;
  display: flex;

  .md-app {
    width: 100%;
  }
}
</style>
