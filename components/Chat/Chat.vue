<template>
    <div class="md-layout-item md-size-45">
        <md-button class="md-raised md-primary" @click="getToken">Login</md-button>
        <md-button class="md-raised md-primary" @click="logout">Logout</md-button>
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
import {State, Action} from 'vuex-class'

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
    @Action('user/getToken') userGetToken: any;
    @Action('user/logout') userLogout: any;

    get textMessage() {
        return this.inputText
    }

    set textMessage(value: string) {
        this.chatChangeInput(value);
    }

    @Emit()
    sendForm() {
        console.log('sendForm', this);
        if (this.textMessage.trim().length > 0) {
            this.chatSendMessage(this.textMessage);
        }
    }

    @Emit()
    getToken() {
        this.userGetToken()
    }

    @Emit()
    logout() {
        this.userLogout()
    }
}
</script>

<style scoped>

</style>
