import {Dialog, User} from '~/model'

export interface GetterChannel {
  getChannel: (id: number) => Dialog
  getNameCurrentUser: (channelId: number, uId: number) => string
}

export default {
  getChannel: state => (id: number) => {
    if (!id || state.list.length === 0) return []
    const channel = state.list.find(item => item.id === id);
    if (channel) {
      return channel
    }
    return null
  },
  getChannelList: state => () => {
    return state.list.filter(item => item.messages.length)
  },
  getDialogName: () => (name, user: User): string => {
    if (!name) return "Без названия";
    name = name.split("‡");
    if (name.length === 1) {
      return name[0]
    }
    name = name.filter(item => item !== user.firstName)
    return name[0]
  },
  getNameCurrentUser: state => (channelId: number, uId: number) => {
    let user;
    if (!state.current) return "";
    if (!uId || state.list.length === 0) return [];
    const channel = state.list.find(item => item.id === channelId);
    if (channel) {
      user = channel.users ? channel.users.find(user => user.id === uId) : "";
    }
    if (!user) return "";

    return user.firstName
  }
}
