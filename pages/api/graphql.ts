import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import { TMDBSource } from "../../data-sources";

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({
    TMDB: new TMDBSource()
  }),
  context: ({ req }) => ({
    cookie: req.cookies,
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });