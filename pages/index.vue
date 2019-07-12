<template>
  <section>
    <span class="md-display-4">Dev chat</span>
  </section>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';

  @Component({
    name: 'Index',
    async asyncData(ctx) {
      if (!ctx.store.state.user.token) {
        return ctx.redirect('/auth')
      }
    },
  })
  export default class Index extends Vue {
  }
</script>
