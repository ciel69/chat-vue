export default {
  getChannel: state => id => {
    const channel = state.list.find(item => item.id === +id);
    console.log('getters getChannel', channel);
    if (channel) {
      return channel.messages;
    }
    return [];
  }
};
