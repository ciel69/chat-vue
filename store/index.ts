import {ActionTree} from 'vuex';

import {RootState} from '~/model';

export const actions: ActionTree<RootState, RootState> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async nuxtServerInit({dispatch, commit}, context) {
    // console.log('nuxtServerInit context', context);
    // await Promise.all([
    //   dispatch('user/checkToken', context.app),
    //   dispatch('dialogs/getChannelsFront'),
    //   dispatch('session/initSession', context)
    // ]);
  }
};
