// @ts-ignore
import gql from 'graphql-tag';

import {Process} from 'types'

declare var process: Process;

export default {
  async getChannels(commit, app) {
    const client = app.apolloProvider.defaultClient;

    let result;
    try {
      result = await client.query({
        query: gql`
          query {
            getChannels {
              id
              name
            }
          }
        `,
      });
      commit('loadChannels', result.data.getChannels);
      // commit('chat/loadMessage', result.data.getMessage);
    } catch (e) {
      console.error(e);
    }
    return result;
  },
  async getChannelsFront(context) {
    const client = this.app.apolloProvider.defaultClient;
    const { uid } = context.rootState.user;

    if (!uid) return;

    console.log('getChannelsFront');

    let result;
    try {
      result = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query user($id: ID!){
            user(id: $id) {
              id
              name
              dialogs {
                id
                name
                messages {
                  id
                  text
                  user {
                    id
                    name
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: uid,
        },
      });

      context.commit('loadChannels', result.data.user.dialogs);
      if (process.browser) {
        result.data.user.dialogs.forEach(item => {
          if (!context.state.subscribe.includes(item.id)) {
            context.dispatch('subscribeChannel', item.id);
          }
          // self.subscribeChannel(context, item.id)
        });
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  },
  async getMessage(commit, app) {
    const client = app.apolloProvider.defaultClient;

    let result;
    try {
      result = await client.query({
        query: gql`
          query getChannel($id: ID!) {
            getChannel(id: $id) {
              id
              messages {
                id
                text
                user {
                  id
                  name
                }
              }
            }
          }
        `,
        variables: {
          id: 0,
        },
      });
      // commit('loadMessage', result.data.getChannel.messages);
      // commit('chat/loadMessage', result.data.getMessage);
      commit('channels/loadChannelMessage', {cid: 0, messages: result.data.getChannel.messages});
    } catch (e) {
      console.error(e);
    }
    return result;
  },
  async getMessageFront({ commit }, id) {
    const client = this.app.apolloProvider.defaultClient;
    let result;
    try {
      result = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query getChannel($id: ID!) {
            getChannel(id: $id) {
              id
              users {
                id
                name
              }
              messages {
                id
                text
                user {
                  id
                  name
                }
              }
            }
          }
        `,
        variables: {
          id,
        },
      });
      commit('loadChannelMessage', result.data.getChannel);
      return result.data.getChannel;
    } catch (e) {
      console.error(e);
      return e;
    }
    return result;
  },
  subscribeChannel(context: any, cid) {
    const client = this.app.apolloProvider.defaultClient;
    const self = this;

    if (!process.browser) return;

    context.commit('addSubscribe', cid);
  },
  newChannel(context: any, data: object) {
    context.commit('newChannel', data);
  },

  chatInitial(context: any) {
    const token = this.app.$cookies.get('token');

    if (!token) return;
    console.log('chatInitial');

    const client = this.app.apolloProvider.defaultClient;
    const uid = this.state.user.uid;

    const observerChannel = client.subscribe({
      query: gql`
        subscription subscribeUser($uid: ID!) {
          subscribeUser(uid: $uid) {
            message {
              id
              text
              channel {
                id
                name
              }
              user {
                id
                name
              }
            }
            channel {
              id
              name
              messages {
                id
                text
                user {
                  id
                }
              }
            }
            type
          }
        }
      `,
      variables: {
        uid,
      },
    });

    observerChannel.subscribe({
      next(res) {
        console.log('subscribe', res);
        if (res) {
          const data = res.data.subscribeUser;

          if (data.type === 'message') {
            context.commit('sendMessage', {
              message: data.message,
              cid: data.message.channel.id,
            });
            context.commit('chatChangeInput', '');
          }
          // if (channel) {
          //   context.dispatch('subscribeChannel', channel.id);
          // }
        }
      },
      error(error) {
        console.error('subscribeChannel error', error);
      },
    });
  },
  async chatSendMessage(context: any, data) {
    if (!data) return;

    const { store } = this.app;
    const { user } = store.state;

    const client = this.app.apolloProvider.defaultClient;
    client.mutate({
      mutation: gql`
        mutation createMessage($text: String, $uid: ID, $channelId: ID) {
          createMessage(
            createChatInput: { text: $text, uid: $uid, channelId: $channelId }
          ) {
            id
            text
            user {
              id
              name
            }
          }
        }
      `,
      variables: {
        text: data.text,
        channelId: data.cid,
        uid: user.uid,
      },
    });
  },
  async createChannel(context: any, uid: number) {
    if (!uid) return;

    const { uid: userId } = context.rootState.user;

    const usersId = [uid, +userId];

    const client = this.app.apolloProvider.defaultClient;
    const result = await client.mutate({
      mutation: gql`
        mutation createChannel($usersId: [Int]) {
          createChannel(usersId: $usersId) {
            id
          }
        }
      `,
      variables: {
        usersId
      },
    });

    if (
        result.data.createChannel.id &&
        !this.state.channels.subscribe.includes(result.data.createChannel.id)
    ) {
      context.dispatch(
          'subscribeChannel',
          result.data.createChannel.id
      );
    }

    const isChannel = this.state.channels.list.find(
        item => item.id === result.data.createChannel.id,
    );
    if (!isChannel) {
      context.commit('newChannel', result.data.createChannel);
    }

    this.app.router.push(`/channel/${result.data.createChannel.id}`);
  },
  chatChangeInput(context: any, data: object) {
    context.commit('chatChangeInput', data);
  },
};
