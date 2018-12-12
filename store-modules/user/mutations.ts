export default {
    checkToken(state, token) {
        state.token = token;
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
