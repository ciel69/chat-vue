import {Dialog, User} from '~/model'
import {ChannelsState} from '~/store/dialogs/state';

export interface GetterChannel {
  getChannel: getChannel
  getNameCurrentUser: getNameCurrentUser
}

export type getNameCurrentUser = (channelId: number, uId: number) => string
export type getChannel = (id: number) => Dialog

export const getChannel = (state: ChannelsState) => (id: number) => {
  if (!id || state.list.length === 0) return [];
  const channel = state.list.find(item => item.id === id);
  if (channel) {
    return channel
  }
  return null
};

export const getChannelList = (state: ChannelsState) => () => {
  return state.list.filter(item => item.messages.length)
};

export const getDialogName = () => (name: any, user: User): string => {
  if (!name) return 'Без названия';
  name = name.split('‡');
  if (name.length === 1) {
    return name[0]
  }
  name = name.filter((item: number) => item !== user.firstName);
  return name[0]
};

export const getNameCurrentUser = (state: ChannelsState) => (channelId: number, uId: number) => {
  let user;
  if (!state.current) return '';
  if (!uId || state.list.length === 0) return [];
  const channel = state.list.find(item => item.id === channelId);
  if (channel) {
    user = channel.users ? channel.users.find((user: User) => user.id === uId) : '';
  }
  if (!user) return '';

  return user.firstName
};
