import {Message, User} from '~/model';

export interface RootState {
  user: User;
  messages: Message[];
}
