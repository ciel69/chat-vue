<script lang="ts">
import {Component, Emit, Inject, Ref, Vue} from 'nuxt-property-decorator';

import {Emoji} from '~/types/Emoji';
import {EmojiService} from '~/utils/emoji.service';

@Component
export default class VEmojiPickerCore extends Vue {

  timeout?: ReturnType<typeof setTimeout>;
  search: string = '';
  display: boolean = false;
  emojis: Emoji = {};

  @Inject()
  emojiService!: EmojiService;

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

  mounted(): void {
    this.emojis = this.refEmoji.emojis;
    this.emojis['Frequently used'] = null;
    // this.emojis = this.emojis.filret(item => item);
    this.emojiService.getFrequentlyUsed().then((emojis: Emoji) => {
      this.emojis['Frequently used'] = emojis;
    });
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
