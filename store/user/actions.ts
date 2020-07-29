import {Context} from '@nuxt/types';
import gql from 'graphql-tag';
import {IGraphql} from '~/model';

export async function test(this: Context): Promise<void> {
  const client: IGraphql = this.app.apolloProvider.defaultClient;

  try {
    const result = await client.query({
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

    // eslint-disable-next-line no-console
    console.log('result', result);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export async function login(this: Context): Promise<void> {
  const client: IGraphql = this.app.apolloProvider.defaultClient;

  try {
    const result = await client.query({
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

    this.app.$apolloHelpers.onLogin(result.data.login.token);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

}

export async function createUser(this: Context): Promise<void> {
  const client: IGraphql = this.app.apolloProvider.defaultClient;

  const data = {
    firstName: 'test',
    lastName: 'test',
    password: 'test',
    email: 'test@test'
  };
  const result = await client.mutate({
    mutation: gql`
      mutation createUser(
        $firstName: String!
        $lastName: String
        $login: String
        $email: String!
        $password: String!
      ) {
        createUser(
          createUserInput: {
            firstName: $firstName
            lastName: $lastName
            password: $password
            login: $login
            email: $email
          }
        ) {
          id
          firstName
          lastName
          login
          email
          token
        }
      }
    `,
    variables: data
  });

  // eslint-disable-next-line no-console
  console.log('result', result);
}
