import {Component, Emit, Vue} from 'nuxt-property-decorator';
import {Getter, State} from 'vuex-class';

import {User, Dialog} from '@/model'

@Component
export default class DialogListComponent extends Vue {

  @State(state => state.user)
  private currentUser: User;

  @Getter('channels/getChannelList')
  getChannelList!: () => Dialog;

  @Getter('channels/getDialogName')
  private getDialogName!: (name: string, user: User) => string;

  @Emit()
  nameDialog(name: string): string {
    return this.getDialogName(name, this.currentUser)
  }

}
