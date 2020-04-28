<template>
  <div class="textarea-emoji__wrapper">
    <v-textarea
      label="Введите сообщение"
      rows="1"
      auto-grow
      required
      v-model="textMessage">
    </v-textarea>
    <v-emoji-picker @append-e="append"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'nuxt-property-decorator';
  import VEmojiPicker from './EmojiPicker/EmojiPicker.vue';

  @Component({
    components: {
      VEmojiPicker
    }
  })
  export default class TextareaEmoji extends Vue {

    textMessage: string = '';

    append(emoji: any): void {
      this.textMessage += emoji
    }
  }
</script>

<style scoped lang="scss">
  .textarea-emoji {
    &__wrapper {
      position: relative;
    }
  }
</style>
