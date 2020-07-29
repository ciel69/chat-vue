import * as OldVue from 'vue';

declare module 'vue/types/vue' {

  // @ts-ignore
  interface Vue extends OldVue {
    readonly $apolloHelpers: {
      onLogout: () => void
      onLogin: () => void
      getToken: () => void
    }
  }

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
