<template>
  <div class="textarea-emoji__wrapper">
    <v-row>
      <v-col md="11">
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
      </v-col>
      <v-col md="1">
        <v-emoji-picker @append="append"/>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Ref, Vue} from 'nuxt-property-decorator';
  import OverlayScrollbars from 'overlayscrollbars';

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
    readonly refTextarea!: HTMLTextAreaElement | any;

    @Emit()
    send(data: string): string {
      return data;
    }

    mounted(): void {
      OverlayScrollbars(this.refTextarea.$refs.input, {
        className : 'os-theme-dark',
        scrollbars: {
          autoHide: 'leave'
        },
        textarea: {
          dynWidth  : false,
          dynHeight : true
        },
      })
    }

    append(emoji: string): void {
      const value = this.textMessage.split('');
      value.splice(this.caretPosition, 0, emoji);
      this.textMessage = value.join('');
      this.refTextarea.focus();
      this.caretPosition = this.caretPosition + emoji.length;
      setTimeout(() => this.refTextarea.$refs.input.setSelectionRange(this.caretPosition, this.caretPosition));
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

      ::v-deep .os-host-textarea {
        width: 100%;
        height: 100%;
        max-height: 250px;
      }
    }
  }
</style>
