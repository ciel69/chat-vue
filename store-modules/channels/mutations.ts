export default {
  loadChannels(state, data) {
    state.list = data;
  },
  loadChannelMessage(state, data) {
    console.log('loadChannelMessage', data);
    const channel = state.list.find(item => +item.id === +data.id);
    if (!channel) {
      state.list.push(data);
    }
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
};
