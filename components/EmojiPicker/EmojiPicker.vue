<template>
  <div
    class="emoji-block"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
  >
    <emoji-picker ref="refEmoji" @emoji="e => $emit('append-e', e)" :search="search">
      <div
        class="emoji-invoker"
        slot="emoji-invoker"
        @click="handleClick"
      >
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </div>
    </emoji-picker>
    <transition name="fade">
      <div class="emoji-picker__animate" v-show="display">
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
              <h5>{{ getNameCategory(category) }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="append(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </overlay-scrollbars>
          <div class="arrow-down"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Ref, Vue} from 'nuxt-property-decorator';

  @Component
  export default class VEmojiPicker extends Vue {

    search: string = '';
    display: boolean = false;
    emojis: Record<string, string> = {};

    @Ref()
    readonly refEmoji!: any;

    @Emit()
    append(data: string): string {
      return data;
    }

    getNameCategory(category: string): string {
      const field: Record<string, string> = {
        'Frequently used': 'Часто используемые',
        'Nature': 'Природа',
        'Objects': 'Объекты',
        'People': 'Эмоции',
        'Places': 'Места',
        'Symbols': 'Символы',
      };
      return field[category] || category
    }

    mounted(): void {
      this.emojis = this.refEmoji.emojis;
    }

    handleClick(): void {
      this.display = !this.display
    }

    handleMouseLeave(): void {
      this.display = false;
    }

    handleMouseEnter(): void {
      this.display = true;
    }
  }
</script>

<style scoped lang="scss">
  @import '~assets/colors';

  @keyframes circleEnter {
    0% {
      clip-path: circle(0% at 91% 104%);
    }
    100% {
      clip-path: circle(150% at 91% 104%);
    }
  }

  @keyframes circleLeave {
    0% {
      clip-path: circle(150% at 91% 104%);
    }
    100% {
      clip-path: circle(0% at 91% 104%);
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

  .arrow-down {
    width: 50px;
    height: 47px;
    position: absolute;
    bottom: -46px;
    right: 0;
    overflow: hidden;
    transform: rotate(180deg);

    &:after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      background: $d40;
      transform: rotate(45deg);
      top: 37.5px;
      left: 12.5px;
      box-shadow: -1px -1px 10px -2px rgba(0, 0, 0, 0.5);
    }
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
      /*top: 0.5rem;*/
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
      width: 15rem;
      height: 20rem;
      padding: 1rem;
      box-sizing: border-box;
      border-radius: 0.5rem;
      background: $d40;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);

      h5 {
        margin-bottom: 0;
        color: $b;
        font-size: 0.8rem;
        cursor: default;
      }

      &__animate {
        position: absolute;
        z-index: 1;
        bottom: 75px;
        right: 0;
      }


      .emojis {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &:after {
          content: "";
          flex: auto;
        }

        span {
          padding: 0.2rem;
          cursor: pointer;
          border-radius: 5px;

          &:hover {
            background: $c;
            cursor: pointer;
          }
        }
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
