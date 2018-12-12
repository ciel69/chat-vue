import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = process.browser ? new WebSocketLink({
    uri: `ws://localhost:3030/graphql`,
    options: {
        reconnect: true
    }
}) : null;


const httpLink = new HttpLink({
    uri: 'http://localhost:3030/graphql',
    // Additional fetch options like `credentials` or `headers`
    credentials: 'same-origin',
    transportBatching: true
});

const apolloLink = process.browser ? split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
) : httpLink;

const middlewareLink = setContext(() => ({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token') || null}`,
    }
}));

const link = middlewareLink.concat(apolloLink);

const client = () => new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
