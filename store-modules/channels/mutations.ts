export default {
  loadChannels(state, data) {
    console.log('loadChannels', data);
    state.list = data;
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
  }
};
