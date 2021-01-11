import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./types/movie.graphql";
import resolvers from "./resolvers";
// import { addResolversToSchema } from '@graphql-tools/schema';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// export const schema = addResolversToSchema({
//   typeDefs,
//   resolvers,
// });