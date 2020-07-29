<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="navigationDrawer.drawer"
      :mini-variant="navigationDrawer.miniVariant"
      :clipped="navigationDrawer.clipped"
      :floating="true"
      :width="350"
      overflow
      app
    >
      <v-list-item two-line :class="navigationDrawer.miniVariant && 'px-2'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="Avatars">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list class="py-0">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          v-ripple="{ class: 'primary--text' }"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="navigationDrawer.clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon
        v-ripple="{ class: 'primary--text' }"
        @click.stop="navigationDrawer.drawer = !navigationDrawer.drawer"
      />
      <v-btn
        v-ripple="{ class: 'primary--text' }"
        icon
        @click.stop="navigationDrawer.miniVariant = !navigationDrawer.miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${navigationDrawer.miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        v-ripple="{ class: 'primary--text' }"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';
import OverlayScrollbars from 'overlayscrollbars';

import RootModule from '~/module/root.module';

@Component({
  mixins: [RootModule]
})
export default class extends Vue {

  navigationDrawer = {
    drawer: true,
    clipped: false,
    miniVariant: true
  };

  items = [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire'
    },
    {
      icon: 'mdi-view-dashboard',
      title: 'List Components',
      to: '/template'
    }
  ];

  right = true;
  rightDrawer = false;
  title = 'Vuetify.js';

  mounted(): void {
    OverlayScrollbars(document.body, {
      className: 'os-theme-dark',
      scrollbars: {
        autoHide: 'move'
      }
    });
  }

}

</script>

<style lang="scss">
  @import 'node_modules/overlayscrollbars/css/OverlayScrollbars.css';

  html, body {
    height: 100%;
    overflow: hidden !important;
  }
</style>
