<template>
    <div>
        <div v-if="listMessage.length > 0" class="list-message" v-for="(message, key) in listMessage" :key="key">
            <div class="list-message__text">{{message.text}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { State } from 'vuex-class'

@Component
export default class ListMessage extends Vue {
    @State(state => state.chat.list) listMessage!: string[];
}
</script>

<style scoped>

</style>