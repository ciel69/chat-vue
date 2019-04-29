import { RootState, Person } from "~/types";

import { MutationTree, ActionTree } from "vuex";

import { actions as actionsUser } from './user';

export const state = (): RootState => ({
  people: []
})

export const mutations: MutationTree<RootState> = {
  setPeople(state: RootState, people: Person[]): void {
    state.people = people
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, context) {
    await actionsUser.checkToken(commit, context.app);
  }
}
