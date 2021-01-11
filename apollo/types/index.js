import { importSchema } from 'graphql-import';

const typeDefs = importSchema("apollo/types/*.graphql");

// export default importSchema('apollo/types/*.graphql');
// export default importSchema('./*.graphql');

// import { loadSchemaSync } from "@graphql-tools/load";
// import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
// import { join } from 'path';
// const typeDefs = loadSchemaSync("apollo/types/*.graphql", {
// 	loaders: [new GraphQLFileLoader()],
// });
console.log("***typeDefs", typeDefs);
export default typeDefs;
