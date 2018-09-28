<template>
    <div>
        <ListMessage />
        <form @submit.prevent="sendForm">
            <input type="text" v-model="textMessage" />
            <button>send</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator';
import { State, Action } from 'vuex-class'

import ListMessage from '~/components/Chat/ListMessage';

@Component({
    components: {
        ListMessage
    }
})
export default class Chat extends Vue {
    @State(state => state.chat.inputText) inputText!: string;

    @Action('chat/chatSendMessage') chatSendMessage: any;
    @Action('chat/chatChangeInput') chatChangeInput: any;

    get textMessage() {
        return this.inputText
    }
    set textMessage(value: string) {
        this.chatChangeInput(value);
    }

    @Emit()
    sendForm () {
        if (this.textMessage.trim().length > 0) {
            this.chatSendMessage(this.textMessage);
        }
    }
}
</script>

<style scoped>

</style>