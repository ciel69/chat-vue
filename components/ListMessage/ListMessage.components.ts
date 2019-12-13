import {Component, Watch, Vue} from 'nuxt-property-decorator';
import {State, Getter} from 'vuex-class';

import OverlayScrollbars from 'overlayscrollbars';

import {Dialog, Message} from '~/model';
import {GetterChannel} from '~/store-modules/channels/getters';

@Component
export default class ListMessage extends Vue {

  @State(state => state.user.id)
  userId!: number;

  @Getter('channels/getChannel')
  currentDialog!: GetterChannel['getChannel'];

  @Getter('channels/getNameCurrentUser')
  getNameCurrentUser: GetterChannel['getNameCurrentUser'];

  mounted(): void {
    this.listMessageChanged();
  }

  @Watch('listMessage')
  private listMessageChanged() {
    setTimeout(() => {
      OverlayScrollbars(this.$el.querySelector('.list-message .v-card'), {}).scrollStop().scroll({y: '100%'}, 100);
    }, 50)
  }

  private get dialog(): Dialog {
    return this.currentDialog(Number(this.$route.params.id));
  }

  public get listMessage(): Message[] {
    return this.dialog ? this.dialog.messages : [];
  }

  userName(message): string {
    const channelId = this.$route.params.id;
    return this.getNameCurrentUser(Number(channelId), message.user.id);
  }

}
