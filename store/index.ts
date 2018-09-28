import {actions as actionsChat} from './chat';

export const state = () => ({
  people: [],
});

export const mutations = {
  setPeople(state, people) {
    state.people = people
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    await actionsChat.getMessage(commit, app);
  }
};
