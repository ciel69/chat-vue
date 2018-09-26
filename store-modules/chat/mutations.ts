export default {
    loadMessage(state, data) {
        state.list = data;
    },
    sendMessage(state, data) {
        state.list.push(data);
    },
    chatChangeInput(state, data: string) {
        state.inputText = data;
    },
};
