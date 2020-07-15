<template>
  <v-row
    class="popover"
  >
    <v-col class="shrink">
      <v-expand-transition>
        <v-card
          v-show="expand"
          height="100"
          width="100"
          class="popover__content"
        />
      </v-expand-transition>
      <v-btn
        class="ma-2"
        color="primary"
        @click="expand = !expand"
      >
        Expand Transition
      </v-btn>
    </v-col>

    <div class="mx-4 hidden-sm-and-down" />

    <v-col class="shrink">
      <v-btn
        class="ma-2"
        color="secondary"
        @click="expand2 = !expand2"
      >
        Expand X Transition
      </v-btn>

      <v-expand-x-transition>
        <v-card
          v-show="expand2"
          :elevation="10"
          height="100"
          width="100"
          class="mx-auto"
        />
      </v-expand-x-transition>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';

@Component
export default class Animation extends Vue {
  visible = false;
  expand = false;
  expand2 = false;
}
</script>

<style scoped lang="scss">
  @import '~assets/colors';

  .popover {
    position: relative;

    /*.fade-enter-active, .fade-leave-active {*/
    /*  transition: opacity .5s;*/
    /*}*/
    /*.fade-enter, .fade-leave-to !* .fade-leave-active до версии 2.1.8 *! {*/
    /*  opacity: 0;*/
    /*}*/

    .shrink {
      position: relative;
    }

    &__content {
      position: absolute;
      width: 100px;
      height: 100px;
      bottom: 46px;
      left: 0;
    }
  }
</style>
