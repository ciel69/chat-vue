import {Context} from '@nuxt/types';

import {ApolloHelpers} from '../ApolloHelpers';
import {RootState} from '~/model';

declare module 'vue/types/vue' {

  interface Vue {
    readonly $apolloHelpers: ApolloHelpers
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
declare module 'vuex-module-decorators' {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface VuexModule {

    store: any

  }
}
