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
    const self = this;

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
      console.log('getChannels', result);
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
        if (res) {
          // self.state.channels.list.find(item => item.id ===  res.data.messageAdded.channel.id);
          console.log('messageAdded', res);
          context.commit('sendMessage', {
            message: res.data.messageAdded,
            cid,
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
