import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';

@Module({
  name: 'TestModule',
  stateFactory: true,
  namespaced: true
})
export default class TestModule extends VuexModule {

  wheels = 2;
  counter = 0;

  get axles(): number {
    return this.wheels / 2;
  }

  @Action
  async testSSRAction(): Promise<void> {
    await Promise.resolve();
    console.log('testSSRAction');
  }

  @Action
  incrWheels(extra: number): void {
    this.setWheels(extra);
  }

  @Mutation
  setWheels(extra: number): void {
    this.wheels += extra;
  }

  @Mutation
  incrementCounter(): void {
    this.counter++;
  }

}
