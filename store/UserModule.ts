import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import {plainToClass} from 'class-transformer';
import gql from 'graphql-tag';

import {IGraphql, Reqest, User} from '~/model';
import {getData} from '~/utils/utils';

@Module({
  name: 'UserModule',
  stateFactory: true,
  namespaced: true
})
export default class UserModule extends VuexModule {

  user: User = plainToClass(User, {
    token: null,
    login: null,
    id: null
  })

  @Action
  async testAction(): Promise<void> {
    const client: IGraphql = this.store.app.apolloProvider.defaultClient;

    try {
      const result: Reqest<User[]> = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            allUsers {
              id
              firstName
            }
          }
        `
      });

      const users = getData(result);
      // eslint-disable-next-line no-console
      console.log('result', users);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  @Action
  async onLogin(): Promise<void> {
    const client: IGraphql = this.store.app.apolloProvider.defaultClient;

    try {
      const result: Reqest<User> = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query login($login: String!, $password: String!) {
            login(login: $login, password: $password) {
              id
              login
              token
            }
          }
        `,
        variables: {
          login: 'newUser1488',
          password: 'password'
        }
      });
      this.store.app.$apolloHelpers.onLogin(getData(result).token);
      this.setUser(getData(result));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

  }

  @Action
  onLogout(): void {
    this.store.app.$apolloHelpers.onLogout();
    this.logout();
  }

  @Mutation
  setUser(user: User): void {
    this.user = user;
  }

  @Mutation
  logout(): void {
    this.user = {
      login: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      id: undefined,
      token: undefined
    };
  }

}
