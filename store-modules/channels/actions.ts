import gql from 'graphql-tag';

interface Process {
  browser: boolean
  client: boolean
}
declare var process: Process

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

    let result;
    try {
      result = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            getChannels {
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
        `,
      });

      context.commit('loadChannels', result.data.getChannels);
      if (process.browser) {
        result.data.getChannels.forEach(item => {
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
        query: gql`
          query getChannel($id: ID!) {
            getChannel(id: $id) {
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
        `,
        variables: {
          id,
        },
      });
      // commit('loadMessage', result.data.getChannel.messages);
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

    const observer = client.subscribe({
      query: gql`
        subscription messageAdded($channelId: ID!) {
          messageAdded(channelId: $channelId) {
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
        }
      `,
      variables: {
        channelId: cid,
      },
    });

    observer.subscribe({
      next(res) {
        if (res && res.data.messageAdded) {
          const isChannel = self.state.channels.list.find(
              item => item.id === res.data.messageAdded.channel.id,
          );
          if (!isChannel) {
            context.commit('channels/newChannel', res.data.messageAdded.channel, {
              root: true,
            });
          }
          context.commit('sendMessage', {
            message: res.data.messageAdded,
            cid: res.data.messageAdded.channel.id,
          });
          context.commit('chatChangeInput', '');
        }
      },
      error(error) {
        console.error('error', error);
      },
    });
  },
  newChannel(context: any, data: object) {
    context.commit('newChannel', data);
  },

  chatInitial(context: any) {
    const token = this.app.$cookies.get('token');

    if (!token) return;

    const client = this.app.apolloProvider.defaultClient;
    const uid = this.state.user.uid;

    const observerChannel = client.subscribe({
      query: gql`
        subscription subscribeChannel($uid: ID!) {
          subscribeChannel(uid: $uid) {
            id
            name
          }
        }
      `,
      variables: {
        uid,
      },
    });

    observerChannel.subscribe({
      next(res) {
        if (res) {
          const channel = res.data.subscribeChannel;
          if (channel) {
            context.dispatch('subscribeChannel', channel.id);
          }
        }
      },
      error(error) {
        console.error('error', error);
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

    const client = this.app.apolloProvider.defaultClient;
    const result = await client.mutate({
      mutation: gql`
        mutation createChannel($uid: ID!) {
          createChannel(uid: $uid) {
            id
          }
        }
      `,
      variables: {
        uid,
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
