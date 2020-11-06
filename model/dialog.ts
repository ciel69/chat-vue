import {Expose, Type} from 'class-transformer';

import {User} from '~/model';

export class Dialog {

  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  messages?: Message[];

  @Expose()
  @Type(() => User)
  users?: User[];

}

export interface Message {
  id: number;
  text: string;
  user: User;
  channelId?: number|string;
}
