import * as R from 'ramda';
import {Injectable} from '@vue-ioc/core';
import localforage from 'localforage';

import {Emoji} from '~/types/Emoji';

@Injectable()
export class EmojiService {

  private KEY_EMOJI: string = 'FREQUENT_EMOJI';
  private storeEmoji!: LocalForage;

  constructor() {
    this.initialStore();
  }

  initialStore(): void {
    this.storeEmoji = localforage.createInstance({
      name: this.KEY_EMOJI
    });
  }

  setLocalEmoji(name: string, symbol: string): void {
    this.storeEmoji.getItem<any[]>(name).then((res) => {
      return this.storeEmoji.setItem(name, [R.isNil(res) ? 1 : res[0] + 1, symbol]);
    });
  }

  getFrequentlyUsed(): Promise<Emoji> {
    const localEmojis: any[] = [];
    const emojis: Emoji = {};

    return this.storeEmoji.iterate((value: string, key) => {
      localEmojis.push({[key]: value});
    }).then(() => {
      localEmojis.sort((a, b) => {
        const A: any = Object.values(a)[0];
        const B: any = Object.values(b)[0];

        if (A > B) return -1;
        if (A < B) return 1;
        return 0;
      });
      localEmojis.forEach((item) => {
        const key = Object.keys(item)[0];
        const value: any[] = Object.values(item)[0] as any[];
        emojis[key] = value[1];
      });
      return emojis;
    });
  }

}
