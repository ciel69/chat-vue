import {IUser} from '~/types'

export default {
  getChannel: state => id => {
    if (!id || state.list.length === 0) return [];
    const channel = state.list.find(item => item.id === +id);
    if (channel) {
      return channel;
    }
    return null;
  },
  getChannelList: state => () => {
    return state.list.filter(item => item.messages.length);
  },
  getDialogName: () => (name, user: IUser) => {
    if (!name) return 'Без названия';
    name = name.split('‡');
    if (name.length === 1) {
      return name[0]
    }
    name = name.filter(item => item !== user.firstName);
    return name[0]
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

    return user.firstName;
  }
};
