import {User} from '~/model';

export interface Dialog {
  id: number;
  name: string;
  messages: Message[];
  users: any[];
}

export interface Message {
  id: number;
  text: string;
  user: User;
  channelId?: number|string;
}
