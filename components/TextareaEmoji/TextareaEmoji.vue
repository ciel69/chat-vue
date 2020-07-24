<template>
  <div class="textarea-emoji__wrapper">
    <v-row v-if="!isMobile">
      <v-col md="10" cols="10">
        <v-textarea
          ref="refTextarea"
          v-model="textMessage"
          label="Введите сообщение"
          rows="1"
          auto-grow
          required
          @blur="handleBlur"
          @keydown="handleKeydown"
        />
      </v-col>
      <v-col md="1" cols="1">
        <v-emoji-picker @append="append" />
      </v-col>
      <v-col md="1" cols="1" class="p0">
        <v-btn
          icon
          large
          color="primary"
          @click="handleSend"
        >
          <v-icon large>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="isMobile">
      <v-col md="11" cols="11">
        <v-textarea
          ref="refTextarea"
          v-model="textMessage"
          label="Введите сообщение"
          rows="1"
          auto-grow
          required
          @blur="handleBlur"
          @keydown="handleKeydown"
        />
      </v-col>
      <v-col md="12" cols="12" class="p0">
        <v-emoji-picker-mobile @append="append" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Ref, Prop, Vue} from 'nuxt-property-decorator';
import {isEmpty} from 'ramda';
import OverlayScrollbars from 'overlayscrollbars';

import VEmojiPicker from '~/components/EmojiPicker/EmojiPicker.vue';
import VEmojiPickerMobile from '~/components/EmojiPicker/EmojiPicker.mobile.vue';

@Component({
  components: {
    VEmojiPicker,
    VEmojiPickerMobile
  }
})
export default class TextareaEmoji extends Vue {

  caretPosition: number = 0;
  textMessage: string = '';

  @Prop(Boolean)
  readonly isMobile?: Boolean;

  @Ref()
  readonly refTextarea!: HTMLTextAreaElement | any;

  @Emit()
  send(data: string): string {
    this.textMessage = '';
    return data;
  }

  mounted(): void {
    OverlayScrollbars(this.refTextarea.$refs.input, {
      className: 'os-theme-dark',
      scrollbars: {
        autoHide: 'move'
      },
      textarea: {
        dynWidth: false,
        dynHeight: true
      }
    });
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
      this.handleSend();
    }
  }

  handleSend(): void {
    if (!isEmpty(this.textMessage)) {
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
