import {Message} from '~/model';
import UserModule from '~/store/UserModule';

export interface RootState {
  UserModule: UserModule;
  messages: Message[];
}
