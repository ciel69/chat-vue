import {Component, Vue} from 'nuxt-property-decorator';
import {State, Action, Getter} from 'vuex-class';

import {Dialog, Message} from '~/model'

import {GetterChannel} from '~/store-modules/channels/getters';
import {chatSendMessage, chatChangeInput} from '~/store-modules/channels/actions';

import ListMessage from '~/components/ListMessage/ListMessage.vue';
import VEmojiPicker from '~/components/EmojiPicker/EmojiPicker.vue';

@Component({
  components: {
    ListMessage,
    VEmojiPicker,
  },
})
export default class Chat extends Vue {

  @State(state => state.channels.inputText)
  inputText!: string;

  @Getter('channels/getChannel')
  currentDialog!: GetterChannel['getChannel'];

  @Action('channels/chatSendMessage')
  chatSendMessage!: chatSendMessage;

  @Action('channels/chatChangeInput')
  chatChangeInput!: chatChangeInput;

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

  get dialog(): Dialog {
    return this.currentDialog(Number(this.$route.params.id));
  }

  get textMessage(): string {
    return this.inputText;
  }

  set textMessage(value: string) {
    this.chatChangeInput(value);
  }

  append(emoji: any): void {
    this.textMessage += emoji
  }

  sendForm(): void {
    if (this.textMessage.trim().length > 0) {
      const cid = this.$route.params.id;
      this.chatSendMessage({text: this.textMessage, channelId: cid} as Message);
      this.chatChangeInput('');
    }
  }

}
