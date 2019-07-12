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
} from "nuxt-property-decorator"
import {Action, Getter} from 'vuex-class';

import Chat from '~/components/Chat/Chat';

@Component({
  components: {
    Chat
  }
})
export default class ChannelDetail extends Vue {
  // @Action('chat/getMessageFront') actionsGetMessage: any;
  @Action('channels/getMessageFront') actionsGetMessage: any;
  @Getter('channels/getChannel') getChannel;

  async asyncData(context) {
    console.log('asyncData', context.route.params.id);
    await context.app.store.dispatch('channels/getMessageFront', context.route.params.id);
  }

  fetch ({ store, redirect }) {
    if (!store.state.user.token) {
      return redirect('/auth')
    }
  }
}
</script>
