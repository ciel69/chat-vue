<template>
  <section class="page-dialog">
    <Chat/>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'nuxt-property-decorator'

  import Chat from '~/components/Chat/Chat.vue';

  @Component({
    components: {
      Chat
    },
  })
  export default class ChannelDetail extends Vue {
    async asyncData(ctx: any): Promise<void> {
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
<style lang="scss" scoped>
  .page-dialog {
    height: 100%;
  }
</style>
