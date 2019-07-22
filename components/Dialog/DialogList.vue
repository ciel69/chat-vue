<template>
  <v-layout row>
    <v-flex xs12>
        <v-list subheader>
          <v-list-tile
            v-for="(channel, key) in listChannels"
            :key="key"
            avatar
            ripple
            :to="`/channel/${channel.id}`"
          >
            <v-list-tile-avatar>
              <img src="https://placeimg.com/40/40/people/1"/>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="nameDialog(channel.name)"></v-list-tile-title>
              <v-list-tile-sub-title
                v-html="channel.messages.length ? channel.messages[channel.messages.length - 1].text : ''"></v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon color="grey">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
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
