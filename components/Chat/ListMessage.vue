<template>
  <v-layout row class="list-message">
    <v-flex xs12>
      <v-card>
        <v-list two-line  ref="scrollList">
          <template v-for="(message, key) in listMessage">
            <v-list-tile
                :key="`item${key}`"
                avatar
                ripple
                v-if="message"
                :class="{'list-message__item': true, 'my-message': +userId === +message.user.id}"
            >
              <v-list-tile-avatar>
                <img src="https://placeimg.com/40/40/people/1"/>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="uName(message)"></v-list-tile-title>
                <v-list-tile-sub-title v-html="message.text"></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>15 min</v-list-tile-action-text>
                <v-icon
                    color="grey lighten-1"
                >
                  star_border
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
                v-if="key + 1 < listMessage.length"
                :key="key"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Watch, Emit } from 'nuxt-property-decorator';
  import { State, Getter } from 'vuex-class';

  import OverlayScrollbars from 'overlayscrollbars';

  import { IDialog, VueNuxt } from '~/types';

  @Component
  export default class ListMessage extends VueNuxt {
    @State(state => state.user.id) userId!: number;

    @Getter('channels/getChannel') currentDialog!: Function;
    @Getter('channels/getNameCurrentUser') getNameCurrentUser;

    mounted() {
      this.listMessageChanged();
    }

    @Watch('listMessage')
    listMessageChanged() {
      setTimeout(() => {
        OverlayScrollbars(this.$el.querySelector('.list-message .v-card'), {}).scrollStop().scroll({ y : '100%' }, 100);
      }, 50)
    }


    get dialog(): IDialog {
      return this.currentDialog(this.$route.params.id);
    }

    get listMessage() {
      return this.dialog ? this.dialog.messages : [];
    }


    @Emit()
    uName(message) {
      const channelId = this.$route.params.id;
      return this.getNameCurrentUser(channelId, message.user.id);
    }
  }
</script>

<style lang="scss">
  .list-message {
    .v-card {
      height: calc(100vh - 180px);
      overflow: auto;
    }


    &__item {

      &.my-message {
        .v-list__tile {
          flex-direction: row-reverse;

          &__title, &__content {
            text-align: right;
          }

          &__avatar, &__action {
            justify-content: flex-end;
          }
        }
      }
    }
  }
</style>
