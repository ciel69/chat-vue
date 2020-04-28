import Vue from 'vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
    beforeCreate(): void
    created(): void
    beforeMount(): void
    mounted(): void
    beforeUpdate(): void
    updated(): void
    beforeDestroy(): void
    destroyed(): void

    asyncData(): void
    head(): void
    fetch(): void
  }
}
