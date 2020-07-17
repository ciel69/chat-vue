<template>
  <div
    class="emoji-block"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
  >
    <emoji-picker ref="refEmoji" :search="search" @emoji="e => $emit('append-e', e)">
      <div
        slot="emoji-invoker"
        class="emoji-invoker"
      >
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
          />
        </svg>
      </div>
    </emoji-picker>
    <transition name="fade">
      <div v-show="display" class="emoji-picker__animate">
        <div class="emoji-picker">
          <overlay-scrollbars
            :options="{
              scrollbars: {
                autoHide: 'move'
              },
            }"
            class="emoji-scroll"
          >
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <div v-if="emojiGroup">
                <h5>{{ getNameCategory(category) }}</h5>
                <div class="emojis">
                  <span
                    v-for="(emoji, emojiName) in emojiGroup"
                    :key="emojiName"
                    :title="emojiName"
                    @click="append(emoji, emojiName)"
                  >{{ emoji }}</span>
                </div>
              </div>
            </div>
          </overlay-scrollbars>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component} from 'nuxt-property-decorator';

import VEmojiPickerCore from '~/components/EmojiPicker/EmojiPicker.core.vue';

@Component
export default class VEmojiPickerMobile extends VEmojiPickerCore {
}
</script>

<style scoped lang="scss">
  @import 'assets/colors';

  $posA: 0%;
  $posB: 91%;
  $posC: 150%;

  $circleSize: 104%;

  @keyframes circleEnter {
    0% {
      clip-path: circle($posA at $posB $circleSize);
    }
    100% {
      clip-path: circle($posC at $posB $circleSize);
    }
  }

  @keyframes circleLeave {
    0% {
      clip-path: circle($posC at $posB $circleSize);
    }
    100% {
      clip-path: circle($posA at $posB $circleSize);
    }
  }

  .fade-enter-active {
    animation: circleEnter .25s;
  }

  .fade-leave-active {
    animation: circleLeave .25s;
  }

  .emoji-invoker {
    position: relative;
    z-index: 10;
  }

  .wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .regular-input {
    padding: 0.5rem 1rem;
    border-radius: 3px;
    border: 1px solid #ccc;
    width: 20rem;
    height: 12rem;
  }

  .emoji {
    &-invoker {
      position: absolute;
      top: 1.8rem;
      bottom: 30px;
      right: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
    }

    &-invoker:hover {
      transform: scale(1.1);
    }

    &-invoker > svg {
      fill: $c;
    }

    &-picker {
      margin-top: -25px;
      width: 100%;
      height: 15rem;
      padding: 1rem;
      box-sizing: border-box;
      background: $d40;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);

      h5 {
        margin-bottom: 0;
        color: $b;
        font-size: 0.8rem;
        cursor: default;
      }

      &__animate {
        max-height: 300px;
        z-index: 1;
        bottom: 75px;
        right: 0;
      }

      .emojis {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      &__wrapper {
        position: relative;
      }

      &__search {
        display: flex;
      }

      &__search > input {
        flex: 1;
        border-radius: 10rem;
        border: 1px solid #ccc;
        padding: 0.5rem 1rem;
        outline: none;
      }
    }

    &-scroll {
      max-height: 100%;
      padding-right: 13px;
      margin-right: -13px;
    }
  }

  .custom-input {
    border: 1px solid #ccc;
    height: 40px;
    width: 100%;
  }

</style>
