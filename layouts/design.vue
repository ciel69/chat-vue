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
      <v-container fluid>
        <v-layout
          align-center
          justify-center
        >
          <v-flex xs10>
            <v-card>
              <v-card-text>
                <v-layout
                  wrap
                >
                  <v-flex
                    xs12
                    md6
                  >
                    <span>Scheme</span>
                    <v-switch
                      v-model="$vuetify.theme.dark"
                      primary
                      label="Dark"
                    ></v-switch>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <span>Drawer</span>
                    <v-radio-group
                      v-model="primaryDrawer.type"
                      column
                    >
                      <v-radio
                        v-for="drawer in drawers"
                        :key="drawer"
                        :label="drawer"
                        :value="drawer.toLowerCase()"
                        primary
                      ></v-radio>
                    </v-radio-group>
                    <v-switch
                      v-model="primaryDrawer.clipped"
                      label="Clipped"
                      primary
                    ></v-switch>
                    <v-switch
                      v-model="primaryDrawer.floating"
                      label="Floating"
                      primary
                    ></v-switch>
                    <v-switch
                      v-model="primaryDrawer.mini"
                      label="Mini"
                      primary
                    ></v-switch>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <span>Footer</span>
                    <v-switch
                      v-model="footer.inset"
                      label="Inset"
                      primary
                    ></v-switch>
                  </v-flex>
                  <nuxt/>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text>Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                >Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer
      :inset="true"
      app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import {Component, Watch} from 'nuxt-property-decorator';
  import {Action} from 'vuex-class';

  import {VueNuxt} from '~/types';

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
  export default class Layout extends VueNuxt {

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
  @import '~/assets/customVuetify.scss';

  .page-container {
    height: 100vh;
    display: flex;

    .md-app {
      width: 100%;
    }
  }
</style>
