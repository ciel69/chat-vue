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

  @Component
  export default class Index extends Vue {

    fetch({ store, redirect }) {
      if (!store.state.user.token) {
        // return redirect('/auth')
      }
    }
  }
</script>
