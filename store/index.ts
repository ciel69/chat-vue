import {getModule} from 'vuex-module-decorators';
import {ActionTree} from 'vuex';

import {RootState} from '~/model';

import UserModule from '~/store/UserModule';

export const actions: ActionTree<RootState, RootState> = {

  async nuxtServerInit() {
    const userModuleInstance: UserModule = getModule(UserModule, this);

    await Promise.all([
      userModuleInstance.getUsers()
    ]);
  }
};
