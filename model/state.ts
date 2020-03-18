import {Message, Person, User} from '~/model'

export interface RootState {
  user: User;
  messages: Message[];
}
