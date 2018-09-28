<template>
  <section>
    <h1 class="md-display-2">Nuxt TypeScript Starter</h1>
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
import { State } from "vuex-class"
import Chat from "~/components/Chat/Chat"

@Component({
  components: {
    Chat
  }
})
export default class extends Vue {
  @State people
}
</script>