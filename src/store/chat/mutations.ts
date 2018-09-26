import { IState, TMessage } from './interface';

export default {
    loadMessage(state: IState, data: Array<TMessage>) {
        state.list = data;
    },
}