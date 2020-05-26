<template>
  <div class="textarea-emoji__wrapper">
    <v-textarea
      ref="refTextarea"
      label="Введите сообщение"
      rows="1"
      auto-grow
      required
      @blur="handleBlur"
      @keydown="handleKeydown"
      v-model="textMessage">
    </v-textarea>
    <v-emoji-picker @append="append"/>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Ref, Vue} from 'nuxt-property-decorator';

  import VEmojiPicker from './EmojiPicker/EmojiPicker.vue';

  @Component({
    components: {
      VEmojiPicker
    }
  })
  export default class TextareaEmoji extends Vue {

    caretPosition: number = 0;
    textMessage: string = '';

    @Ref()
    readonly refTextarea!: HTMLTextAreaElement|any;

    @Emit()
    send(data: string): string {
      return data;
    }

    append(emoji: string): void {
      const value = this.textMessage.split('');
      value.splice(this.caretPosition, 0, emoji);
      this.textMessage = value.join('');
      this.refTextarea.focus();
    }

    handleBlur(): void {
      this.caretPosition = this.refTextarea.$refs.input.selectionStart;
    }

    handleKeydown(event: KeyboardEvent): void {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        this.send(this.textMessage);
      }
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
