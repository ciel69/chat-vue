import { IState, TMessage } from './interface';

export default {
    loadMessage(state: IState, data: TMessage[]) {
        state.list = data;
    },
    sendMessage(state: IState, data: TMessage) {
        state.list.push(data);
    },
    chatChangeInput(state: IState, data: string) {
        state.inputText = data;
    },

};
