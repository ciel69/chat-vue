import gql from "graphql-tag"

export default {
  async login(context, data) {
    const client = this.app.apolloProvider.defaultClient

    let result
    try {
      result = await client.query({
        query: gql`
          query login($login: String!, $password: String!) {
            login(login: $login, password: $password) {
              id
              login
              firstName
              firstName
              email
              token
            }
          }
        `,
        variables: data
      })
      // localStorage.setItem('token', result.data.login.token);
      context.commit("user/login", result.data.login, { root: true })
      context.commit("login", result.data.login.token)

      this.app.$cookies.set("token", result.data.login.token)
      this.app.$cookies.set("id", result.data.login.id)
      this.app.$cookies.set("currentUser", result.data.login)

      context.dispatch("channels/getChannelsFront", {}, { root: true })
      context.dispatch("channels/chatInitial", {}, { root: true })

      this.app.router.push("/")
      // this.app.$apolloHelpers.onLogin(result.data.login.token);
    } catch (e) {
      console.error(e)
    }
    return result
  },
  changeField(context: any, data: object) {
    context.commit("changeField", data)
  }
}
