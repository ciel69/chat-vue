<template>
  <section>
    <span class="md-display-4">Dev chat</span>
  </section>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'nuxt-property-decorator';

  @Component
  export default class Index extends Vue {
    async asyncData(ctx) {
      if (!ctx.store.state.user.token) {
        return ctx.redirect('/auth')
      }
    }
  }
</script>
