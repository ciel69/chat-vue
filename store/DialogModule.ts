import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import {plainToClass} from 'class-transformer';
import gql from 'graphql-tag';

import {Dialog, IGraphql, Reqest} from '~/model';
import {getData} from '~/utils/utils';

@Module({
  name: 'DialogModule',
  stateFactory: true,
  namespaced: true
})
export default class DialogModule extends VuexModule {

  dialogs: Dialog[] = [];

  @Action
  async testAction(): Promise<void> {
    const client: IGraphql = this.store.app.apolloProvider.defaultClient;

    try {
      const result: Reqest<Dialog[]> = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query getCurrentUserChannels($id: ID!){
            getCurrentUserChannels(id: $id) {
              id
              name
              users {
                id
                firstName
                lastName
                login
              }
              messages {
                id
                text
                user {
                  id
                  firstName
                  lastName
                  login
                }
              }
            }
          }
        `,
        variables: {
          id: this.store.state.UserModule.user.id
          // id: 27
        }
      });

      const dialogs = getData(result);
      // eslint-disable-next-line no-console
      this.setUsers(dialogs);
      console.log('result', dialogs);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  @Mutation
  setUsers(dialogs: Dialog[]): void {
    this.dialogs = plainToClass(Dialog, dialogs);
  }

}
