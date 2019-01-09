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
import {State, Action} from 'vuex-class'
import Chat from "~/components/Chat/Chat"

@Component({
  name: 'Index',
  components: {
    Chat
  }
})
export default class extends Vue {
  @State people

  @Action('chat/getMessageFront') actionsGetMessage: any;

  created() {
    this.actionsGetMessage();
  }

  fetch ({ store, redirect }) {
    if (!store.state.user.token) {
      return redirect('/auth')
    }
  }
}
</script>
