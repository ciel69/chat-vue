export default {
    checkToken(state, token) {
        state.token = token;
    },
    login(state, data) {
        state.login = data.login;
        state.uid = data.uid;
        state.token = data.token;
    },
    loadToken(state, data) {
        state.token = data;
    },
    sendMessage(state, data) {
        state.list.push(data);
    },
    chatChangeInput(state, data: string) {
        state.inputText = data;
    },
};
