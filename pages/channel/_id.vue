<template>
  <section>
    <div class="md-layout md-alignment-top-center">
      <Chat :list-message="listMessage || []"/>
    </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import {State, Action, Getter} from 'vuex-class'
import Chat from "~/components/Chat/Chat"

@Component({
  name: 'ChannelDetail',
  components: {
    Chat
  }
})
export default class extends Vue {
  // @Action('chat/getMessageFront') actionsGetMessage: any;
  @Action('channels/getMessageFront') actionsGetMessage: any;
  @Getter('channels/getChannel') getChannel;

  async asyncData(context) {
    const result = await context.app.store.dispatch('channels/getMessageFront', context.route.params.id);
    // return { listMessage: result.messages}
  }

  created() {
    const id = this.$route.params.id;
    console.log('this.getChannel', this.getChannel);
    this.actionsGetMessage(id)
    // this.listMessage = this.getChannel(id);
  }

  get listMessage() {
    const id = this.$route.params.id;
    return this.getChannel(id);
  }

  fetch ({ store, redirect }) {
    if (!store.state.user.token) {
      return redirect('/auth')
    }
  }
}
</script>
