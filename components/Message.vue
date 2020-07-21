<template>
  <div class="item-message">
    <div class="item-message__ava" />
    <div class="item-message__cloud">
      <v-card class="item-message__content">
        <v-row>
          <v-col class="item-message__name">
            {{ source.user && source.user.firstName }}
          </v-col>
          <v-col md="auto" class="item-message__date">
            {{ source.date }}
          </v-col>
        </v-row>
        <div class="item-message__text">
          {{ source.text }}
        </div>
      </v-card>
    </div>
  </div>
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

<style lang="scss" scoped>
  @import 'assets/variables';

  $sizeAva: 40px;
  $sizeArrowCloud: 8px;

  .item-message {
    max-width: 70%;
    display: flex;
    padding-bottom: 20px;

    &__ava {
      display: block;
      min-width: $sizeAva;
      width: $sizeAva;
      min-height: $sizeAva;
      height: $sizeAva;
      border-radius: 100%;
      background-color: #ccc;
      margin-right: 10px;
      margin-top: auto;
      margin-bottom: 0;
    }

    &__cloud {
      position: relative;
      &:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-right: $sizeArrowCloud solid $d50;
        border-left: $sizeArrowCloud solid transparent;
        border-bottom: $sizeArrowCloud solid $d50;
        border-top: $sizeArrowCloud solid transparent;
        left: -11px;
        bottom: 0;
        z-index: 10;
        box-shadow: 0 3px 2px -2px rgba(0, 0, 0, 0.62),
        0px 0px 0px 0px rgba(0, 0, 0, 0),
        0px 0px 0px 0px rgba(0, 0, 0, 0);
      }
    }

    &__content {
      position: relative;
      padding: 10px;

      .col.p10 {

      }
    }
    &__name {
      color: $c;
    }
    &__date {
      color: $c;
      white-space: nowrap;
    }
    &__text {
      color: $b;
    }
  }
</style>
