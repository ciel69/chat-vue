import gql from 'graphql-tag';

export default {
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
      commit('loadMessage', result.data.getChannel.messages);
      // commit('chat/loadMessage', result.data.getMessage);
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
      commit('loadMessage', result.data.getChannel.messages);
    } catch (e) {
      console.error(e);
    }
    return result;
  },
  chatInitial(context: any) {
    const token = this.app.$cookies.get('token');
    const self = this;

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
            const isChannel = self.state.channels.list.find(
              item => item.id === channel.id,
            );
            if (!isChannel) {
              context.commit('channels/newChannel', channel, {
                root: true,
              });
            }
            context.dispatch('channels/subscribeChannel', channel.id, {
              root: true,
            });
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
        'channels/subscribeChannel',
        result.data.createChannel.id,
        { root: true },
      );
    }

    const isChannel = this.state.channels.list.find(
      item => item.id === result.data.createChannel.id,
    );
    if (!isChannel) {
      context.commit('channels/newChannel', result.data.createChannel, {
        root: true,
      });
    }

    this.app.router.push(`/channel/${result.data.createChannel.id}`);
  },
  chatChangeInput(context: any, data: object) {
    context.commit('chatChangeInput', data);
  },
};
