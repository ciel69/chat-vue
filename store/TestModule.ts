import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';

@Module({
  name: 'TestModule',
  stateFactory: true,
  namespaced: true
})
export default class TestModule extends VuexModule {

  wheels = 2

  @Action
  incrWheels(extra: number): void {
    this.setWheels(extra);
  }

  @Mutation
  setWheels(extra: number): void {
    this.wheels += extra;
  }

  get axles(): number {
    return this.wheels / 2;
  }

}
