<template>
  <div>
    <virtual-list
      ref="virtualList"
      class="virtual-list"
      :data-key="'uid'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'nuxt-property-decorator';

import Message from './Message.vue';

@Component
export default class ListMessage extends Vue {

  itemComponent = Message;
  items = [{uid: 'unique_1', text: 'abc'}, {uid: 'unique_2', text: 'xyz'}];

  @Ref()
  readonly virtualList!: HTMLTextAreaElement | any;

  created(): void {
    const length = 100000;

    for (let i = 0; i < length; i++) {
      this.items.push({
        uid: `unique_${i}`,
        text: Math.random() + ' text'
      });
    }
  }

}
</script>

<style lang="scss" scoped>
.virtual-list {
  height: 360px;
  overflow-y: auto;
}
</style>
