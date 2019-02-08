import gql from 'graphql-tag';

export default {
  async getUsers(commit, app) {
    let client = app.apolloProvider.defaultClient;

    let result;
    try {
      result = await client.query({
        query: gql`
          query {
            allUsers {
              id
              name
            }
          }
        `,
      });
      commit('loadUsers', result.data.allUsers);
      // commit('chat/loadMessage', result.data.getMessage);
    } catch (e) {
      console.error(e);
    }
    return result;
  },
  async getUsersFront({ commit }) {
    const client = this.app.apolloProvider.defaultClient;

    let result;
    try {
      result = await client.query({
        query: gql`
          query {
            allUsers {
              id
              name
            }
          }
        `,
      });
      commit('loadUsers', result.data.allUsers);
    } catch (e) {
      console.error(e);
    }
    return result;
  },
};
