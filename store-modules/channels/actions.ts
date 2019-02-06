import gql from 'graphql-tag';

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
      result.data.getChannels.forEach(item => {
        if (!context.state.subscribe.includes(item.id)) {
          context.dispatch('subscribeChannel', item.id);
        }
        // self.subscribeChannel(context, item.id)
      });
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
    console.log('getMessageFront', commit);
    console.log('getMessageFront', id);

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

    console.log('subscribeChannel', cid);

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
          context.commit('chat/chatChangeInput', '', { root: true });
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
};
