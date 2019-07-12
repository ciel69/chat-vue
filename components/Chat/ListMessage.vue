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
  import { Component, Vue, Watch } from 'nuxt-property-decorator';
  import { State, Getter } from 'vuex-class';

  import { IDialog } from '~/types';

  @Component
  export default class ListMessage extends Vue {
    @State(state => state.user.uid) userId!: number;
    // @State(state => state.channels.current) currentDialog!: IDialog;

    @Getter('channels/getChannel') currentDialog!: Function;
    @Getter('channels/getNameCurrentUser') getNameCurrentUser;

    mounted() {
      this.listMessageChanged();
    }

    @Watch('listMessage')
    listMessageChanged() {
      console.log('listMessageChanged');
      setTimeout(() => {
        let container = this.$el.querySelector('.list-message .v-card');
        container.scrollTop = container.scrollHeight;
      }, 50)
    }


    get dialog(): IDialog {
      return this.currentDialog(this.$route.params.id);
    }

    get listMessage() {
      return this.dialog ? this.dialog.messages : [];
    }

    uName(message) {
      const channelId = this.$route.params.id;
      return this.getNameCurrentUser(channelId, message.user.id);
    }
  }
</script>

<style lang="scss">
  .list-message {
    .v-card {
      max-height: calc(100vh - 160px);
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
