export default function (ctx) {
    const hasToken = !!ctx && !!ctx.app && !!ctx.app.$apolloHelpers && ctx.app.$apolloHelpers.getToken();
    // const hasToken = '123';

    return {
        tokenName: 'apollo-token',
        httpEndpoint: 'http://localhost:3030/graphql',
        httpLinkOptions: {
            credentials: 'same-origin'
        },
        wsEndpoint: 'ws://localhost:3030/graphql',
        persisting: false,
        websocketsOnly: false,
        getAuth: () => `Bearer ${hasToken}`
    }
}
