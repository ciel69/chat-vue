<script lang="ts">
import {Component, Emit, Ref, Vue} from 'nuxt-property-decorator';
import {Inject} from '@vue-ioc/core';

import {Emoji} from '~/types/Emoji';
import {EmojiService} from '~/services/emoji.service';

@Component
export default class VEmojiPickerCore extends Vue {

  timeout?: ReturnType<typeof setTimeout>;
  search: string = '';
  display: boolean = false;
  emojis: Emoji = {};

  @Inject()
  readonly emojiService!: EmojiService;

  @Ref()
  readonly refEmoji!: any;

  @Emit()
  append(data: string, name: string): string {
    this.emojiService.setLocalEmoji(name, data);
    return data;
  }

  getNameCategory(category: string): string {
    const field: Record<string, string> = {
      'Frequently used': 'Часто используемые',
      Nature: 'Природа',
      Objects: 'Объекты',
      People: 'Эмоции',
      Places: 'Места',
      Symbols: 'Символы'
    };
    return field[category] || category;
  }

  async mounted(): Promise<void> {
    this.emojis = this.refEmoji.emojis;
    this.emojis['Frequently used'] = null;
    this.emojis['Frequently used'] = await this.emojiService.getFrequentlyUsed();
  }

  handleMouseLeave(): void {
    this.timeout = setTimeout(() => {
      this.display = false;
    }, 300);
  }

  handleMouseEnter(): void {
    this.timeout && clearTimeout(this.timeout);
    this.display = true;
  }

}
</script>
