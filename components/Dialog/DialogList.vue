<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list subheader>
          <v-subheader>Список диалогов</v-subheader>
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
              <v-list-tile-title v-html="channel.name"></v-list-tile-title>
              <v-list-tile-sub-title
                v-html="channel.messages[channel.messages.length - 1].text"></v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon color="grey">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component} from 'nuxt-property-decorator';
  import {State} from 'vuex-class';

  import {VueNuxt} from '~/types'

  @Component
  export default class DialogList extends VueNuxt {

    @State(state => state.channels.list)
    listChannels!: any[];
  }
</script>
