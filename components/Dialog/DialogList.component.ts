import {Component, Vue} from 'nuxt-property-decorator';
import {Getter, State} from 'vuex-class';

import {User, Dialog} from '@/model'

@Component
export default class DialogListComponent extends Vue {

  @State(state => state.user)
  currentUser!: User;

  @Getter('channels/getChannelList')
  getChannelList!: () => Dialog[];

  @Getter('channels/getDialogName')
  getDialogName!: (name: string, user: User) => string;

  nameDialog(name: string): string {
    return this.getDialogName(name, this.currentUser)
  }

}
