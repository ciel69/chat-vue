import {ApolloClient} from 'apollo-client';
import {WebSocketLink} from 'apollo-link-ws'
import {split} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {getMainDefinition} from 'apollo-utilities';
import {from} from 'apollo-link';

export default class ApolloNuxt {
  constructor(props) {
    const apolloConfig = props.env && props.env.apolloConfig;
    this.context = props;
    this.wsUrl = apolloConfig.wsUrl || null;
    this.optionsLink = apolloConfig.optionsLink || {};
    this.middleware = apolloConfig.middleware || [];

    this.wsLink = this.connectWs();
    this.httpLink = this.connectLink();
    this.apolloLink = this.getApolloLink();
  }

  connectWs() {
    if (!this.wsUrl) return;

    return process.browser ? new WebSocketLink({
      uri: this.wsUrl,
      options: {
        reconnect: true
      }
    }) : null;
  }

  connectLink() {
    return new HttpLink(this.optionsLink);
  }

  getApolloLink() {
    return process.browser ? split(
      ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      this.wsLink,
      this.httpLink,
    ) : this.httpLink;
  }

  setMiddleware(middleware) {
    this.middleware = middleware.map(item => item(this.context));
    return this;
  }

  connect() {
    return new ApolloClient({
      link: from([...this.middleware, this.apolloLink]),
      cache: new InMemoryCache(),
    })
  }

}
