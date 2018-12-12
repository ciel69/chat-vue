import gql from 'graphql-tag'


export default {
    async getToken({ commit }) {
        console.log('app', this.app);
        console.log('commit', commit);
        let client = this.app.apolloProvider.defaultClient;

        let result;
        try {
            result = await client.query({
                query: gql`
                query {
                  login(login: "test") {
                    token
                  }
                }
            `
            });
            // localStorage.setItem('token', result.data.login.token);
            commit('loadToken', result.data.login.token);
            // this.app.$apolloHelpers.onLogin(result.data.login.token);
        } catch (e) {
            console.error(e)
        }
        return result;
    },
    chatChangeInput(context: any, data: object) {
        context.commit('chatChangeInput', data);
    },
};
