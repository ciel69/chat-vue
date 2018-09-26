<template>
    <div>
        <div class="list-message" v-for="(message, key) in listMessage" :key="key">
            <div class="list-message__text">{{message}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class'

@Component
export default class ListMessage extends Vue {
    @State(state => state.chat.list) listMessage!: string[];
}
</script>

<style scoped>

</style>