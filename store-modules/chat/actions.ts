import gql from 'graphql-tag'


export default {
    async getMessage(commit, app) {
        let client = app.apolloProvider.defaultClient;

        console.log('getMessage');

        let result;
        try {
            result = await client.query({
                query: gql`
                    query {
                        getChannel(id: 0) {
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
                `
            });
            commit('loadMessage', result.data.getChannel.messages);
            // commit('chat/loadMessage', result.data.getMessage);
        } catch (e) {
            console.error(e)
        }
        return result;
    },
    async getMessageFront({commit}) {
        let client = this.app.apolloProvider.defaultClient;

        console.log('getMessageFront');

        let result;
        try {
            result = await client.query({
                query: gql`
                query {
                    getChannel(id: 0) {
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
            `
            });
            commit('loadMessage', result.data.getChannel.messages);
        } catch (e) {
            console.error(e)
        }
        return result;
    },
    chatInitial(context: any) {
        const token = this.app.$cookies.get('token');

        if (!token) return;

        let client = this.app.apolloProvider.defaultClient;

        const observer = client.subscribe({
            query: gql`
              subscription chatCreated {
                  messageAdded(channelId: 0) {
                    id 
                    text
                    user {
                      id
                      name
                    }
                  }
              }
            `
        })

        observer.subscribe({
            next(res) {
                if (res) {
                    console.log('subscribe', res);
                    context.commit('sendMessage', res.data.messageAdded);
                    context.commit('chatChangeInput', '');
                }
            },
            error(error) {
                console.error('error', error)
            },
        });
    },
    chatSendMessage(context: any, data: object) {
        // socket.emit('events', data);
        if (!data) return;
        console.log('this.app', this.app);
        const { store } = this.app;
        const { user } = store.state;
        console.log('user', user);
        let client = this.app.apolloProvider.defaultClient;
        client.mutate({
            mutation: gql`
                mutation createMessage($text: String, $uid: ID $channelId: ID) {
                  createMessage(createChatInput: { text: $text, uid: $uid, channelId: $channelId }) {
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
                text: data,
                channelId: 0,
                uid: user.uid
            }
        })
    },
    chatChangeInput(context: any, data: object) {
        context.commit('chatChangeInput', data);
    },
};
