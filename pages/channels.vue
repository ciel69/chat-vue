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
import { Component, Vue } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

@Component({
    name: 'Channels'
})
export default class extends Vue {

  fetch({ store, params }) {
    return store.dispatch('channels/getChannelsFront');
  }

  @State(state => state.channels.list)
  listChannels!: any[];
}
</script>
