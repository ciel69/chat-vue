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
    chatInitial(context: any) {

        let client = this.app.apolloProvider.defaultClient;

        const observer = client.subscribe({
            query: gql`
              subscription chatCreated {
                  chatCreated {
                    id 
                    text
                  }
              }
            `
        })

        observer.subscribe({
            next(res) {
                if (res) {
                    context.commit('sendMessage', res.data.chatCreated);
                    context.commit('chatChangeInput', '');
                    console.log('data', res)
                }
            },
            error(error) {
                console.error('error', error)
            },
        });
    },
    chatSendMessage(context: any, data: object) {
        // socket.emit('events', data);
        let client = this.app.apolloProvider.defaultClient
        console.log('chatSendMessage serv');
        client.mutate({
            mutation: gql`
                mutation createMessage($text: String) {
                  createMessage(createChatInput: { text: $text }) {
                    id
                    text
                  }
                }
            `,
            variables: {
                text: data
            }
        })
    },
    chatChangeInput(context: any, data: object) {
        context.commit('chatChangeInput', data);
    },
};
