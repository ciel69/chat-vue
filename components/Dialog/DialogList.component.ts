import {Component, Vue} from 'nuxt-property-decorator';
import {Getter, State} from 'vuex-class';

import {User, Dialog} from '@/model'

@Component
export default class DialogListComponent extends Vue {

  @State(state => state.user)
  currentUser!: User;

  @Getter('dialogs/getChannelList')
  getChannelList!: () => Dialog[];

  @Getter('dialogs/getDialogName')
  getDialogName!: (name: string, user: User) => string;

  nameDialog(name: string): string {
    return this.getDialogName(name, this.currentUser)
  }

}
