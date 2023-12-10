// Altere a importação do Express para incluir o tipo Application
import 'reflect-metadata';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';

export const app: Application = express();

export async function startApolloServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });

  await server.start();

  // Altere o tipo para Application
  server.applyMiddleware({ app } as any);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
