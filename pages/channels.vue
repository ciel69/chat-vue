<template>
  <div>
    Channels
    <md-list>
      <md-list-item
        v-for="channel in listChannels"
        v-if="channel"
        :key="channel.id"
        :to="`/channel/${channel.id}`">
        {{channel.name}}
      </md-list-item>
    </md-list>
  </div>
</template>

<script lang="ts">
  import {Component} from 'nuxt-property-decorator';
  import {State} from 'vuex-class';

  import {VueNuxt} from '~/types';

  @Component
  export default class Channels extends VueNuxt {

    fetch({store, params}) {
      return store.dispatch('channels/getChannelsFront');
    }

    @State(state => state.channels.list)
    listChannels!: any[];
  }
</script>
