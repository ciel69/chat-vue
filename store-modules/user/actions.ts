import gql from 'graphql-tag'


export default {
    async checkToken(commit, app) {
        try {
            const token = app.$cookies.get('token');
            const id = app.$cookies.get('id');

            if (token && id) {
                commit('user/login', {token, id});
            } else {
                commit('user/login', {token: null, id: null});
            }
        } catch (e) {
            console.error(e)
        }
    },
    loginUser({ commit }, data){
        commit('login', data);
    },
    logout({ commit }){
        commit('loadToken', null);
        this.app.$cookies.remove('token');
        this.app.$cookies.remove('id');
        this.app.router.push('/auth');
    },
    chatChangeInput(context: any, data: object) {
        context.commit('chatChangeInput', data);
    },
};
