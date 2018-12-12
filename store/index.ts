import {actions as actionsChat} from './chat';
import {actions as actionsUser} from './user';

export const state = () => ({
  people: [],
  token: null
});

export const mutations = {
  setPeople(state, people) {
    state.people = people
  },
  setToken(state, people) {
      state.token = 'ABC123'
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    await actionsUser.checkToken(commit, app);
    await actionsChat.getMessage(commit, app);
    // commit('setToken');
  }
};
