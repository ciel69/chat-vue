import {User} from '~/model';

export interface Dialog {
  id: number;
  name: string;
  messages: Message[];
  users: User[];
}

export interface Message {
  id: number;
  text: string;
  user: User;
  channelId?: number|string;
}
