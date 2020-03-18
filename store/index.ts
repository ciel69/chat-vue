import {ActionTree} from 'vuex'

import {RootState} from '~/model'

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({dispatch, commit}, context) {
    await Promise.all([
      dispatch('user/checkToken', context.app),
      dispatch('channels/getChannelsFront'),
      dispatch('session/initSession', context)
    ])
  }
};
