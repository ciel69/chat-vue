import gql from "graphql-tag"

export default {
  async getUsers(commit, app) {
    const client = app.apolloProvider.defaultClient

    let result
    try {
      result = await client.query({
        query: gql`
          query {
            allUsers {
              id
              firstName
            }
          }
        `
      })
      commit("loadUsers", result.data.allUsers)
      // commit('chat/loadMessage', result.data.getMessage);
    } catch (e) {
      console.error(e)
    }
    return result
  },
  async getUsersFront({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    console.log("getUsersFront")
    let result
    try {
      result = await client.query({
        query: gql`
          query {
            allUsers {
              id
              firstName
              lastName
              email
              login
            }
          }
        `
      })
      console.log("getUsersFront result", result)
      commit("loadUsers", result.data.allUsers)
    } catch (e) {
      console.error(e)
    }
    return result
  }
}
