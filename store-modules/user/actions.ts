import gql from 'graphql-tag'


export default {
    async checkToken(commit, app) {
        try {
            const token = app.$cookies.get('token');
            const uid = app.$cookies.get('uid');

            console.log('token', token);
            console.log('uid', uid);

            if (token && uid) {
                commit('user/login', {token, uid} || null);
            }
        } catch (e) {
            console.error(e)
        }
    },
    async getToken({ commit }) {
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
            this.app.$cookies.set('token', result.data.login.token);
            // this.app.$apolloHelpers.onLogin(result.data.login.token);
        } catch (e) {
            console.error(e)
        }
        return result;
    },
    loginUser({ commit }, data){
        commit('login', data);
    },
    logout({ commit }){
        commit('loadToken', null);
        this.app.$cookies.remove('token');
        this.app.$cookies.remove('uid');
        this.app.router.push('/auth');
    },
    chatChangeInput(context: any, data: object) {
        context.commit('chatChangeInput', data);
    },
};
