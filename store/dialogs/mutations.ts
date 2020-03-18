import _merge from 'lodash/merge';
import _sortBy from 'lodash/sortBy';

import {ChannelsState} from '~/store/dialogs/state';
import {Dialog} from '~/model';

export const loadChannels = (state: ChannelsState, data: any): void => {
  if (state.list.length > 0) {
    state.list = _sortBy(
      [...data.filter((item: Dialog) => +item.id !== +state.list[0].id), state.list[0]],
      ["id"]
    );
  } else {
    state.list = _sortBy(_merge(state.list, data), ["id"]);
  }
};

export const loadChannelMessage = (state: ChannelsState, data: any): void => {
  const channel = state.list.find(item => +item.id === +data.id)
  state.list = _sortBy(
    [
      ...state.list.filter(item => +item.id !== +data.id),
      { ...channel, ...data }
    ],
    ["id"]
  );
};

export const newChannel = (state: ChannelsState, data: any): void => {
  state.list.push({ ...data, messages: [] });
};

export const sendMessage = (state: ChannelsState, data: any): void => {
  console.log("sendMessage");
  const channel = state.list.find(item => +item.id === +data.cid);
  channel.messages.push(data.message);
};

export const addSubscribe = (state: ChannelsState, data: any): void => {
  state.subscribe.push(data);
};

export const chatChangeInput = (state: ChannelsState, data: string): void => {
  state.inputText = data;
};

export const chatInitialSubscribe = (state: ChannelsState, data: any): void =>{
  state.isSubscribe = data;
};

export const setListDialog = (state: ChannelsState, data: any): void =>{
  state.list = data;
};

export const clearListDialog = (state: ChannelsState): void =>{
  state.list = [];
};
