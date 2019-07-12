export default {
  getChannel: state => id => {
    if (!id || state.list.length === 0) return [];
    const channel = state.list.find(item => item.id === +id);
    if (channel) {
      return channel;
    }
    return null;
  },
  getNameCurrentUser: state => (channelId, uId) => {
    let user;
    if (!state.current) return '';
    if (!uId || state.list.length === 0) return [];
    const channel = state.list.find(item => item.id === +channelId);
    if (channel) {
      user = channel.users ? channel.users.find(user => user.id === uId) : '';
    }
    if (!user) return '';

    return user.name
  }
};
