import { ApolloServer, gql } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from '../src/resolvers/PostResolver';

const GET_POST = gql`
  query GetPost($id: String!) {
    getPost(id: $id) {
      id
      title
      content
    }
  }
`;

describe('PostResolver', () => {
  beforeAll(() => {
    server = new ApolloServer({ typeDefs, resolvers: });
  });

  test('Query getUser returns the correct user', () => {
    const user = resolvers.Query.getUser('1');
    expect(user).toEqual({
      id: '1',
      username: 'user1',
      email: 'user1@example.com',
    });
  });

  test('Query getAllUsers returns all users', () => {
    const allUsers = resolvers.Query.getAllUsers();
    expect(allUsers).toEqual([
      { id: '1', username: 'user1', email: 'user1@example.com' },
      { id: '2', username: 'user2', email: 'user2@example.com' },
      // ...
    ]);
  });
});
