import gql from 'graphql-tag'


export default {
    async getMessage(commit, app) {
        let client = app.apolloProvider.defaultClient;

        let result;
        try {
            result = await client.query({
                query: gql`
                query {
                    getMessage {
                        id
                        text
                        user {
                            name
                        }
                    }
                }
            `
            });
            commit('chat/loadMessage', result.data.getMessage);
        } catch (e) {
            console.error(e)
        }
        return result;
    },
    async getMessageFront({commit}) {
        let client = this.app.apolloProvider.defaultClient;

        let result;
        try {
            result = await client.query({
                query: gql`
                query {
                    getMessage {
                        id
                        text
                        user {
                            id
                            name
                        }
                    }
                }
            `
            });
            commit('loadMessage', result.data.getMessage);
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
                  chatCreated {
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
                    context.commit('sendMessage', res.data.chatCreated);
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
                mutation createMessage($text: String, $uid: ID) {
                  createMessage(createChatInput: { text: $text, uid: $uid }) {
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
                uid: user.uid
            }
        })
    },
    chatChangeInput(context: any, data: object) {
        context.commit('chatChangeInput', data);
    },
};
