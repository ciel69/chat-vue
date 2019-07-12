<template>
  <section>
    <div class="md-layout md-alignment-top-center">
      <Chat />
    </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator'

import Chat from '~/components/Chat/Chat.vue';

@Component({
  name: 'ChannelDetail',
  components: {
    Chat
  },
  async asyncData(ctx) {
    if (!ctx.store.state.user.token) {
      return ctx.redirect('/auth')
    }
    await ctx.app.store.dispatch('channels/getMessageFront', ctx.route.params.id);
  },
})
export default class extends Vue {
  fetch({ store, redirect }) {
    console.log('fetch');
    if (!store.state.user.token) {
      return redirect('/auth')
    }
  }
}
</script>
