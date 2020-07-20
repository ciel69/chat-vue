<template>
  <div>{{ index }} - {{ source.text }}</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';

@Component
export default class Message extends Vue {

  @Prop(Number)
  readonly index!: Number;

  @Prop({default: {}})
  source!: Object;

}
</script>
