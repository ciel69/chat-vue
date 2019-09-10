<template>
  <v-layout row class="dialog-list">
    <v-flex xs12>
        <v-list subheader>
          <v-list-item
            v-for="(channel, key) in listChannels"
            :key="key"
            avatar
            ripple
            :to="`/channel/${channel.id}`"
          >
            <v-list-item-avatar>
              <img src="https://placeimg.com/40/40/people/1"/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="nameDialog(channel.name)"></v-list-item-title>
              <v-list-item-subtitle
                v-html="channel.messages.length ? channel.messages[channel.messages.length - 1].text : ''"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="grey">chat_bubble</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Emit} from 'nuxt-property-decorator';
  import {Getter, State} from 'vuex-class';

  import {VueNuxt, IDialog, IUser} from '~/types'

  @Component
  export default class DialogList extends VueNuxt {

    @State(state => state.user) currentUser: IUser;
    @Getter('channels/getChannelList') getChannelList!: Function;
    @Getter('channels/getDialogName') getDialogName!: Function;

    get listChannels(): IDialog {
      return this.getChannelList();
    }

    @Emit()
    nameDialog(name) {
      return this.getDialogName(name, this.currentUser)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/variables/colors.scss';

  .dialog-list {
    margin: 0;
    overflow: auto;
    max-height: calc(88vh + 4px);
    .v-list {
      background: transparent;
    }
  }
</style>
