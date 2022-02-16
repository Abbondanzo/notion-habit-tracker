import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import http from "http";

const port = 4000;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

export const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginLandingPageDisabled(),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );

  const shutdown = () => {
    console.log("Server shutting down...");
    httpServer.close();
    apolloServer.stop();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
