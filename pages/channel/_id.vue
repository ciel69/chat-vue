<template>
  <section>
    <div class="md-layout md-alignment-top-center">
      <Chat/>
    </div>
  </section>
</template>

<script lang="ts">
  import {
    Component
  } from 'nuxt-property-decorator'

  import {VueNuxt} from '~/types';

  import Chat from '~/components/Chat/Chat.vue';

  @Component({
    components: {
      Chat
    },
  })
  export default class ChannelDetail extends VueNuxt {
    async asyncData(ctx) {
      if (!ctx.store.state.user.token) {
        return ctx.redirect('/auth')
      }
      await ctx.app.store.dispatch('channels/getMessageFront', ctx.route.params.id);
    }

    fetch({store, redirect}) {
      if (!store.state.user.token) {
        return redirect('/auth')
      }
    }
  }
</script>
