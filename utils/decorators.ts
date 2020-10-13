import {Vue} from 'nuxt-property-decorator';
import {createDecorator} from 'vue-class-component';
import {getModule, VuexModule} from 'vuex-module-decorators';

export declare type ConstructorOf<C> = {
  new (...args: any[]): C;
};

export function Store(store: ConstructorOf<VuexModule>) {
  return createDecorator((options, key) => {
    options.computed = options.computed || {};
    options.computed[key] = {
      cache: true,
      get(this: Vue) {
        return getModule(store, this.$store);
      }
    };
  });
}
