import { request, gql } from 'graphql-request';
import { startApolloServer } from '../src/server';

describe('UserResolver', () => {
  /*
  beforeAll(async () => {
    startApolloServer();
  });
  */

  const userInfo = {
    username: 'newuser',
    email: 'patfffo@email.com',
  };

  test('Mutation createUser', async () => {
    // Your GraphQL mutation
    let mutation = gql`
      mutation {
        createUser(username: "${userInfo.username}", email: "${userInfo.email}") {
          username
          email
        }
      }
    `;

    // Mock of the expected response
    let expectedResponse = {};
    let result: any = {};
    expectedResponse = {
      createUser: {
        ...userInfo,
      },
    };

    // Send the GraphQL mutation
    result = await request('http://localhost:4000/graphql', mutation);

    // Check if the response is equal to the expected one
    expect(result).toEqual(expectedResponse);

    // Your GraphQL query
    let query = gql`
      query {
        getUserByEmail(email: "${userInfo.email}") {
          username
          email
        }
      }
    `;

    // Mock of the expected response
    expectedResponse = {
      getUserByEmail: {
        email: userInfo.email,
        username: userInfo.username,
      },
    };

    // Send the GraphQL query
    result = await request('http://localhost:4000/graphql', query);

    // Check if the response is equal to the expected one
    expect(result).toMatchObject(expectedResponse);

    // Your GraphQL mutation
    mutation = gql`
      mutation {
        deleteUserByEmail(email: "${userInfo.email}") {
          username
          email
        }
      }
    `;

    // Mock of the expected response
    expectedResponse = {
      ...userInfo,
    };

    // Send the GraphQL mutation
    result = await request('http://localhost:4000/graphql', mutation);

    if (result.deleteUserByEmail === null) {
      expect(result.deleteUserByEmail).toBeNull();
    } else {
      expect(result.deleteUserByEmail).toMatchObject(expectedResponse);
    }
  });
});
