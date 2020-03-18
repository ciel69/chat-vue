import gql from 'graphql-tag'

import {Process, IGraphql, Message, User, Dialog} from '~/model'
import {Context, NuxtAppOptions} from '@nuxt/types';

declare let process: Process;

export interface ActionsChannel {
  chatSendMessage: chatSendMessage;
  chatChangeInput: (text: string) => void;
}

export type chatSendMessage = (message: Message) => void;
export type chatChangeInput = (text: string) => void;

export async function getChannelsFront(this: Context, context: NuxtAppOptions): Promise<User|null> {
  const client: IGraphql = this.app.apolloProvider.defaultClient;
  const {id} = context.rootState.user;

  if (!id) return null;

  let result: any;
  try {
    result = await client.query({
      fetchPolicy: 'no-cache',
      query: gql`
        query user($id: ID!) {
          user(id: $id) {
            id
            firstName
            dialogs {
              id
              name
              messages {
                id
                text
                user {
                  id
                  firstName
                }
              }
            }
          }
        }
      `,
      variables: {
        id: id
      }
    });

    context.commit('setListDialog', result.data.user.dialogs)
  } catch (e) {
    console.error(e);
    result = [];
    context.commit('setListDialog', result);
  }
  return result;
}

export async function getMessageFront(this: Context, {commit}: NuxtAppOptions, id: number): Promise<Dialog> {
  const client: IGraphql = this.app.apolloProvider.defaultClient;
  let result;
  try {
    result = await client.query({
      fetchPolicy: 'no-cache',
      query: gql`
        query getChannel($id: ID!) {
          getChannel(id: $id) {
            id
            name
            users {
              id
              firstName
            }
            messages {
              id
              text
              user {
                id
                firstName
              }
            }
          }
        }
      `,
      variables: {
        id
      }
    });
    commit('loadChannelMessage', result.data.getChannel);
    return result.data.getChannel
  } catch (e) {
    console.error(e);
    return e;
  }
  return result;
}

export function subscribeChannel(this: Context, context: NuxtAppOptions, cid: number): void {
  const client = this.app.apolloProvider.defaultClient;
  const self = this;

  if (!process.browser) return;

  context.commit('addSubscribe', cid)
}

export function newChannel(context: NuxtAppOptions, data: object): void {
  context.commit('newChannel', data);
}

export function chatInitial(this: Context|any, context: NuxtAppOptions) {
  const token = this.app.$cookies.get('token');
  const self = this;

  if (!token || this.state.dialogs.isSubscribe) return;
  context.commit('chatInitialSubscribe', true);

  const client: IGraphql = this.app.apolloProvider.defaultClient;
  const id = this.state.user.id;

  console.log('chatInitial');
  const observerChannel = client.subscribe({
    query: gql`
      subscription subscribeUser($id: ID!) {
        subscribeUser(id: $id) {
          message {
            id
            text
            channel {
              id
              name
            }
            user {
              id
              firstName
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
      id
    }
  });

  observerChannel.subscribe({
    next(res: any) {
      console.log('subscribe', res);

      if (res) {
        const data = res.data.subscribeUser;
        let title = 'Нет заголовка';

        if (data.message.channel && self.getters['dialogs/getChannel']) {
          const dialog = self.getters['dialogs/getChannel'](
            data.message.channel.id
          );
          title = dialog.name
        } else {
          title = data.channel.name
        }

        if (data.type === 'message') {
          context.commit('sendMessage', {
            message: data.message,
            cid: data.message.channel.id
          });
        } else {
          context.commit('newChannel', data.channel);
        }
      }
    },
    error(error: any) {
      console.error('subscribeChannel error', error);
    }
  })
}

export async function chatSendMessage(this: Context|any, context: any, data: any): Promise<void> {
  if (!data) return;

  const {store} = this.app;
  const {user} = store.state;

  const client: IGraphql = this.app.apolloProvider.defaultClient
  client.mutate({
    mutation: gql`
      mutation createMessage($text: String, $id: ID, $channelId: ID) {
        createMessage(
          createChatInput: { text: $text, id: $id, channelId: $channelId }
        ) {
          id
          text
          user {
            id
            firstName
          }
        }
      }
    `,
    variables: {
      text: data.text,
      channelId: data.channelId,
      id: user.id
    }
  })
}

export async function createChannel(this: Context|any, context: NuxtAppOptions, uid: number): Promise<void> {
  if (!uid) return;

  const {id: userId} = context.rootState.user;

  const usersId = [uid, +userId];

  const client: IGraphql = this.app.apolloProvider.defaultClient;
  const result = await client.mutate({
    mutation: gql`
      mutation createChannel($usersId: [Int]) {
        createChannel(usersId: $usersId) {
          id
          name
          messages {
            id
            text
            user {
              id
            }
          }
          users {
            firstName
            id
          }
        }
      }
    `,
    variables: {
      usersId
    }
  });

  if (
    result.data.createChannel.id &&
    !this.state.dialogs.subscribe.includes(result.data.createChannel.id)
  ) {
    context.dispatch('subscribeChannel', result.data.createChannel.id);
  }

  const isChannel = this.state.dialogs.list.find(
    (item: Dialog) => item.id === result.data.createChannel.id
  );
  if (!isChannel) {
    context.commit('newChannel', result.data.createChannel);
  }

  this.app.router.push(`/channel/${result.data.createChannel.id}`);
}

export function chatChangeInput(context: NuxtAppOptions, data: object): void {
  context.commit('chatChangeInput', data);
}

export function  clearDialogs(context: NuxtAppOptions): void {
  context.commit('clearListDialog');
}
