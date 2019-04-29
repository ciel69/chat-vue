<template>
  <section>
    <span class="md-display-4">Dev chat</span>
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

    fetch ({ store, redirect }) {
      if (!store.state.user.token) {
        return redirect('/auth')
      }
    }
  }
</script>
