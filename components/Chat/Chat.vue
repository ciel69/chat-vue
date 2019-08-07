<template>
  <div class="chat">
    <ListMessage/>
    <form @submit.prevent="sendForm">
      <v-layout>
        <v-flex xs12>
          <div class="wrapper">
            <v-textarea
              label="Введите сообщение"
              rows="1"
              auto-grow
              required
              v-model="textMessage">
            </v-textarea>

            <v-emoji-picker @append-e="append"/>
          </div>
        </v-flex>
        <v-flex>
          <v-btn color="primary" small @click="sendForm">
            <v-icon>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </form>
  </div>
</template>

<script lang="ts">
  import {Component, Emit} from 'nuxt-property-decorator';
  import {State, Action, Getter} from 'vuex-class';

  import {VueNuxt, IDialog} from '~/types'

  import ListMessage from '~/components/Chat/ListMessage.vue';
  import VEmojiPicker from '~/components/EmojiPicker/EmojiPicker.vue';

  @Component({
    components: {
      ListMessage,
      VEmojiPicker,
    },
  })
  export default class Chat extends VueNuxt {
    @State(state => state.channels.inputText) inputText!: string;

    @Action('channels/chatSendMessage') chatSendMessage: any;
    @Action('channels/chatChangeInput') chatChangeInput: any;

    @Getter('channels/getChannel') currentDialog!: Function;

    get dialog(): IDialog {
      return this.currentDialog(this.$route.params.id);
    }

    head() {
      return {
        title: `VChate | ${this.dialog.name}`,

        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description',
          },
        ],
      };
    }

    get textMessage() {
      return this.inputText;
    }

    set textMessage(value: string) {
      this.chatChangeInput(value);
    }

    @Emit()
    append(emoji) {
      this.textMessage += emoji
    }

    @Emit()
    sendForm() {
      if (this.textMessage.trim().length > 0) {
        const cid = this.$route.params.id;
        this.chatSendMessage({text: this.textMessage, cid});
        this.chatChangeInput('');
      }
    }
  }
</script>

<style scoped lang="scss">
  .chat {
    height: 100%;
  }
  .custom-input {
    border: 1px solid #ccc;
    height: 40px;
    width: 100%;
  }
  .wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }
</style>
