import gql from 'graphql-tag'

import {Process, IGraphql, Message} from '~/model'

declare let process: Process;

export interface ActionsChannel {
  chatSendMessage: (message: Message) => void;
  chatChangeInput: (text: string) => void;
}

export default {
  async getChannelsFront(context) {
    const client: IGraphql = this.app.apolloProvider.defaultClient
    const {id} = context.rootState.user

    if (!id) return

    let result
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
      })

      context.commit('setListDialog', result.data.user.dialogs)
    } catch (e) {
      console.error(e)
      result = []
      context.commit('setListDialog', result)
    }
    return result
  },
  async getMessageFront({commit}, id) {
    const client: IGraphql = this.app.apolloProvider.defaultClient
    let result
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
      })
      commit('loadChannelMessage', result.data.getChannel)
      return result.data.getChannel
    } catch (e) {
      console.error(e)
      return e
    }
    return result
  },
  subscribeChannel(context: any, cid) {
    const client = this.app.apolloProvider.defaultClient
    const self = this

    if (!process.browser) return

    context.commit('addSubscribe', cid)
  },
  newChannel(context: any, data: object) {
    context.commit('newChannel', data)
  },

  chatInitial(context: any) {
    const token = this.app.$cookies.get('token')
    const self = this

    if (!token || this.state.channels.isSubscribe) return
    context.commit('chatInitialSubscribe', true)

    const client: IGraphql = this.app.apolloProvider.defaultClient
    const id = this.state.user.id

    console.log('chatInitial')
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
    })

    observerChannel.subscribe({
      next(res) {
        console.log('subscribe', res)

        if (res) {
          const data = res.data.subscribeUser
          let title = 'Нет заголовка'

          if (data.message.channel && self.getters['channels/getChannel']) {
            const dialog = self.getters['channels/getChannel'](
              data.message.channel.id
            )
            title = dialog.name
          } else {
            title = data.channel.name
          }

          if (data.type === 'message') {
            context.commit('sendMessage', {
              message: data.message,
              cid: data.message.channel.id
            })
          } else {
            context.commit('newChannel', data.channel)
          }
        }
      },
      error(error) {
        console.error('subscribeChannel error', error)
      }
    })
  },
  async chatSendMessage(context: any, data) {
    if (!data) return

    const {store} = this.app
    const {user} = store.state

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
  },
  async createChannel(context: any, uid: number) {
    if (!uid) return

    const {id: userId} = context.rootState.user

    const usersId = [uid, +userId]

    const client: IGraphql = this.app.apolloProvider.defaultClient
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
    })

    if (
      result.data.createChannel.id &&
      !this.state.channels.subscribe.includes(result.data.createChannel.id)
    ) {
      context.dispatch('subscribeChannel', result.data.createChannel.id)
    }

    const isChannel = this.state.channels.list.find(
      item => item.id === result.data.createChannel.id
    )
    if (!isChannel) {
      context.commit('newChannel', result.data.createChannel)
    }

    this.app.router.push(`/channel/${result.data.createChannel.id}`)
  },
  chatChangeInput(context: any, data: object) {
    context.commit('chatChangeInput', data)
  },
  clearDialogs(context) {
    context.commit('clearListDialog')
  }
}
