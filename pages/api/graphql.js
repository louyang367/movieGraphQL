import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import { IGDBSource } from "../../data-sources";

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({
    IGDB: new IGDBSource()
  }),
  context: ({ req }) => ({
    cookie: req.cookies,
    // token: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjZhZjE3ZjJmMzE0MGUyYjZkMThlOGFhZTM2YTVlNCIsInN1YiI6IjVmZTZkN2NjMWQ2YzVmMDAzZGRlZTVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SsDmSZqLfsdKF2TF3ujkP3tF3zJ0QFDIDTn4BFSpve8"
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });