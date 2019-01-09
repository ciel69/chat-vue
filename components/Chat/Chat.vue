<template>
    <div class="md-layout-item md-size-45">
        <ListMessage/>
        <form @submit.prevent="sendForm">
            <md-field>
                <label>Initial Value</label>
                <md-input v-model="textMessage"></md-input>
                <md-button class="md-raised md-primary" @click="sendForm">send</md-button>
            </md-field>
        </form>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Emit} from 'nuxt-property-decorator';
import {State, Action} from 'vuex-class';

import ListMessage from '~/components/Chat/ListMessage';

@Component({
    components: {
        ListMessage,
    }
})
export default class Chat extends Vue {
    @State(state => state.chat.inputText) inputText!: string;

    @Action('chat/chatSendMessage') chatSendMessage: any;
    @Action('chat/chatChangeInput') chatChangeInput: any;

    head () {
        return {
            title: 'Чат',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    }

    get textMessage() {
        return this.inputText
    }

    set textMessage(value: string) {
        this.chatChangeInput(value);
    }

    @Emit()
    sendForm() {
        if (this.textMessage.trim().length > 0) {
            this.chatSendMessage(this.textMessage);
        }
    }
}
</script>

<style scoped lang="scss">
.custom-input {
    border: 1px solid #ccc;
    height: 40px;
    width: 100%;
}
</style>
