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
import {Component, Prop, Ref, Vue} from 'nuxt-property-decorator';

import Message from './Message.vue';

@Component
export default class ListMessage extends Vue {

  itemComponent = Message;

  @Prop({default: []})
  items!: any[];

  @Ref()
  readonly virtualList!: HTMLTextAreaElement | any;

}
</script>

<style lang="scss" scoped>
.virtual-list {
  height: 360px;
  overflow-y: auto;
}
</style>
