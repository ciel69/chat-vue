<template>
  <section>
    <span class="md-display-4">Design</span>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"

@Component({
  name: 'Index'
})
export default class extends Vue {
  layout() {
    return 'design';
  }

  fetch ({ store, redirect }) {
    if (!store.state.user.token) {
      return redirect('/auth')
    }
  }
}
</script>
