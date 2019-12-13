export interface Dialog {
  id: number;
  name: number;
  messages: Message[];
  users: any[];
}

export interface Message {
  id?: number;
  text?: string;
  channelId?: number|string;
}
