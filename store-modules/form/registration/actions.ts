import gql from 'graphql-tag'

export default {
  async sendReg(context, data) {

    let client = this.app.apolloProvider.defaultClient;

    console.log('data', data);

    let result;
    try {
      result = await client.mutate({
        mutation: gql`          
          mutation createUser(
            $firstName: String!,
            $lastName: String,
            $login: String,
            $email: String!,
            $password: String!,
          ) {
            createUser(
              createUserInput: {
                firstName: $firstName,
                lastName: $lastName,
                password: $password,
                login: $login,
                email: $email,
              }
            ) {
              id
              firstName
              lastName
              login
              email
              token
            }
          }
        `,
        variables: data
      });
      // localStorage.setItem('token', result.data.login.token);
      context.commit('user/login', result.data.createUser, {root: true});
      context.commit('login', result.data.createUser.token);
      this.app.$cookies.set('token', result.data.createUser.token);
      this.app.$cookies.set('id', result.data.createUser.id);
      context.dispatch('channels/getChannelsFront', {}, {root: true});
      context.dispatch('channels/chatInitial', {}, {root: true});
      this.app.router.push('/');
      // this.app.$apolloHelpers.onLogin(result.data.login.token);
    } catch (e) {
      console.error(e)
    }
    return result;
  },
  changeField(context: any, data: object) {
    context.commit('changeField', data);
  }
};
