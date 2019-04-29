import _merge from 'lodash/merge';

export default {
  loadChannels(state, data) {
    if (state.list.length > 0) {
      state.list = [
        ...data.filter(item => +item.id !== +state.list[0].id),
        state.list[0],
      ]
    } else {
      state.list = _merge(state.list, data);
    }
  },
  loadChannelMessage(state, data) {
    let channel = state.list.find(item => +item.id === +data.id);
    state.list = [
      ...state.list.filter(item => +item.id !== +data.id),
      {...channel, ...data},
    ]
  },
  newChannel(state, data) {
    state.list.push({ ...data, messages: [] });
  },
  sendMessage(state, data) {
    const channel = state.list.find(item => +item.id === +data.cid);
    channel.messages.push(data.message);
  },
  addSubscribe(state, data) {
    state.subscribe.push(data);
  },
  chatChangeInput(state, data: string) {
    state.inputText = data;
  },
};
