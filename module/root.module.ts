import {Component, Provide, Vue} from 'nuxt-property-decorator';
import {EmojiService} from '~/utils/emoji.service';

@Component
export default class RootModule extends Vue {
  @Provide()
  emojiService: EmojiService = new EmojiService();

  created(): void {
    this.emojiService.initialStore();
  }
}
