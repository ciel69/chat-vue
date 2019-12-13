<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      :width="350"
      app
      overflow
    >
      <current-user-info/>
      <v-tabs
        v-model="activeTab"
        dark
        grow
      >
        <v-tab
          ripple
        >
          <v-icon>chat_bubble</v-icon>
        </v-tab>
        <v-tab
          ripple
        >
          <v-icon>account_box</v-icon>
        </v-tab>
        <v-tab-item>
          <dialog-list/>
        </v-tab-item>
        <v-tab-item>
          <all-list-user/>
        </v-tab-item>
      </v-tabs>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
    >
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <nuxt/>
    </v-content>

<!--    <v-footer-->
<!--      :inset="true"-->
<!--      app-->
<!--    >-->
<!--      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>-->
<!--    </v-footer>-->
  </v-app>
</template>

<script lang="ts">
  import {Component, Watch, Vue} from 'nuxt-property-decorator';
  import {Action} from 'vuex-class';

  import CurrentUserInfo from '~/components/User/CurrentUserInfo.vue';
  import DialogList from '~/components/Dialog/DialogList.vue';
  import AllListUser from '~/components/User/AllListUser.vue';

  @Component({
    components: {
      CurrentUserInfo,
      DialogList,
      AllListUser
    },
  })
  export default class Layout extends Vue {

    activeTab: number = 0;
    drawers: Array<string> = ['Default (no property)', 'Permanent', 'Temporary'];
    primaryDrawer: Object = {
      model: true,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
    };
    footer: Object = {
      inset: false,
    };

    @Action('users/getUsersFront') actionUsersGetList;
    @Action('channels/chatInitial') chatInitial;

    beforeMount() {
      this.chatInitial();
    }

    @Watch('activeTab')
    changeTab() {
      if (this.activeTab === 1) {
        this.actionUsersGetList()
      }
    }

  }
</script>

<style lang="scss">
  @import 'material-design-icons/iconfont/material-icons.css';
  @import 'overlayscrollbars/css/OverlayScrollbars.css';
  @import '~/assets/customVuetify.scss';
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    background: #FF0000;
  }

  body {
    overflow: hidden;
  }

  .page-container {
    height: 100vh;
    display: flex;

    .md-app {
      width: 100%;
    }
  }
</style>
