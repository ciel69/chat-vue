export interface ChannelsState {
  inputText: string;
  list: any[];
  subscribe: any[];
  isSubscribe: boolean;
  current: object;
}
export default {
  inputText: "",
  list: [],
  subscribe: [],
  isSubscribe: false,
  current: {}
} as ChannelsState
