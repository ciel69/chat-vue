<template>
  <section>
    <span class="md-display-4">Design</span>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  layout() {
    return 'design';
  }
}
</script>
