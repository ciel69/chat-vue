import {actions as actionsChat} from './chat';

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
    await actionsChat.getMessage(commit, app);
    // commit('setToken');
  }
};
