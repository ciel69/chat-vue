<template>
  <v-app dark class="vchat">
    <v-toolbar color="orange" fixed app class="vchat__top-panel">
      <v-container grid-list-md fluid fill-height>
        <v-layout row wrap>
          <v-flex xs12 md4 lg3 xl2>
            <current-user-info/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-toolbar>
    <v-content>
      <v-container class="vchat__container" grid-list-md fluid fill-height>
        <v-layout row wrap>
          <v-flex xs12 md6 lg3 xl2>
            <v-tabs
              v-model="activeTab"
              color="orange"
              dark
              grow
              slider-color="yellow"
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
              <v-tab-item >
                <v-card flat>
                  <v-card-text>
                    <dialog-list/>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card flat>
                  <v-card-text>
                    <all-list-user/>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>
          <v-flex xs12 md6 lg6 xl8>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import {Component, Emit, Watch} from 'nuxt-property-decorator';
  import {Action} from 'vuex-class';

  import {VueNuxt} from '~/types'

  import OverlayScrollbars from 'overlayscrollbars';

  import DialogList from '~/components/Dialog/DialogList.vue';
  import CurrentUserInfo from '~/components/User/CurrentUserInfo.vue';
  import AllListUser from '~/components/User/AllListUser.vue';

  @Component({
    components: {
      DialogList,
      CurrentUserInfo,
      AllListUser
    },
  })
  export default class Layout extends VueNuxt {
    menuVisible: boolean = false;
    activeTab: number = 0;
    @Action('channels/chatInitial') chatInitial;
    @Action('user/logout') actionLogout;
    @Action('users/getUsersFront') actionUsersGetList;

    beforeMount() {
      this.chatInitial();
    }

    @Watch('activeTab')
    changeTab() {
      if (this.activeTab === 1) {
        this.actionUsersGetList()
      }
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

  .vchat {
    &__top-panel {
      /*background-color: #424242 !important;*/
      .container {
        padding: 0;
      }
    }
    &__container {
      overflow: hidden;
      padding-bottom: 0;
    }
  }
</style>
