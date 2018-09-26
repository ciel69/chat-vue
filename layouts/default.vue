<template>
  <div>
    <nuxt/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Action } from 'vuex-class'

@Component
export default class Chat extends Vue {
    @Action('chat/chatInitial') chatInitial

    created() {
        this.chatInitial()
    }
}
</script>
