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
import { Component, Action, Emit, Inject, Vue } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

@Component({})
export default class Channels extends Vue {
  @Action('channels/getChannelsFront') actionsGetChannels: any;

  created() {
    this.actionsGetChannels();
  }

  @State(state => state.channels.list)
  listChannels!: any[];
}
</script>
