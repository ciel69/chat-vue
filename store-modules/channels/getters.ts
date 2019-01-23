export default {
  getChannel: state => id => {
    const channel = state.list.find(item => item.id === +id);

    if (channel) {
      return channel.messages;
    }
    return [];
  }
};
