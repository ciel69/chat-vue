<template>
  <section>
    <span class="md-display-4">Dev chat</span>
  </section>
</template>

<script lang="ts">
  import {
    Component,
  } from 'nuxt-property-decorator';

  import {VueNuxt} from '~/types';

  @Component
  export default class Index extends VueNuxt {
    async asyncData(ctx) {
      if (!ctx.store.state.user.token) {
        return ctx.redirect('/auth')
      }
    }
  }
</script>
