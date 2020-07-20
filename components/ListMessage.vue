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
    const length = 250;

    for (let i = 0; i < length; i++) {
      this.items.push({
        uid: `unique_${i}`,
        text: Math.random() + ' text'
      });
    }
  }

  mounted(): void {
    // OverlayScrollbars(this.virtualList.$refs.root, {
    //   className: 'os-theme-dark',
    //   scrollbars: {
    //     autoHide: 'move'
    //   },
    //   textarea: {
    //     dynWidth: false,
    //     dynHeight: true
    //   }
    // });
  }

}
</script>

<style lang="scss" scoped>
.virtual-list {
  height: 360px;
  overflow-y: auto;
  /*overflow: hidden;*/
}
</style>
